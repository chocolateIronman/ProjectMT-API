//Thanks to the Open-Source community
var glob = require('glob')
var path = require('path')
var fs = require('fs')

var read = function (filePath) {
    var contents = fs.readFileSync(filePath, 'utf8')
    var name = path.basename(filePath, '.sql')
    return {
        name: name,
        contents: contents
    }
}

var readAll = function (path) {
    var files = glob.sync(path + '/**/*.sql')
    return files.map(read)
}

var Gen = function (path) {
    var queries = this.queries = {}
    readAll(path).forEach(function (q) {
        queries[q.name] = q
    })
}

Gen.prototype.get = function (name) {
    return (this.queries[name] || 0).contents || false
}

Gen.prototype.gen = function (name, qValues, filters, sort, pagination, returning) {
    qValues.forEach(function(element, index, array) {
        if ( !element ) {
            if (!(element === 0)) {
                array[index] = "";
            }
        }
    });

    var result = null;
    var qText = this.get(name);
    if (qText) {

        if (filters) {
            if (filters.filtersMap) {
                var paramRef = 1;
                var param = "";
                for (i = 0; i < filters.filtersMap.length; i++) {
                    // first filter param needs WHERE prefix, subsequent need AND
                    if (i == 0) { qText = qText + " WHERE "; }
                    else { qText = qText + " AND "; }

                    var columnName = filters.filtersMap[i];
                    var cellValue = filters[columnName];
                    switch (typeof(cellValue)) {
                        case "number":
                        case "boolean":
                            param = columnName + " = $" + paramRef;
                            paramRef += 1;
                            qValues.push(cellValue);
                            break;
                        case "object":
                            if (cellValue instanceof Array) {

                                param += cellValue.reduce((accumulator, currVal, index) => {
                                    var txt = "";

                                    if (index === cellValue.length - 1) {
                                        txt += accumulator + `${columnName} = ${currVal})`;
                                    } else {
                                        txt += accumulator + `${columnName} = ${currVal} OR `; // Assuming that when an array is passed, the filter only needs to match one of them.
                                    }

                                    return txt;
                                }, "(");

                            }
                            break;
                        default:
                            if (cellValue == 'null') {
                                param = columnName + " is null "
                            } else {
                                param = columnName + " ~* $" + paramRef;
                                paramRef +=1;
                                qValues.push(cellValue);
                            }
                            break;
                    }

                    // push filter param to qValues & then reference in qText
                    qText = qText + param;
                }
            }
        }

        if (sort) {
            // unable to parameterise sort, as the param goes in as a string and not SQL,
            // therefore the string will not read as a column name
            // thus not sorting the response.
            qText = qText + " ORDER BY " + sort;
        }

        if (pagination) {

            if (isNaN(pagination.page) || isNaN(pagination.size)) {
                throw new Error("pagination error. Size and page must be a Number.");
            } else if (pagination.page < 1 || pagination.size < 1) {
                throw new Error("pagination error. Size and page are 1-based.");
            }

            var limit = parseInt(pagination.size,10);
            qValues.push(limit);
            qText = qText+" LIMIT $"+qValues.length;

            var page = parseInt(pagination.page,10);
            var offset = limit * (page - 1);
            qValues.push(offset);
            qText = qText+" OFFSET $"+qValues.length;

        }

        if (returning) {
            qText = qText +" "+returning;
        }

        result = {
            name: name,
            text: qText,
            values: qValues
        };

        return result;

    }
}

module.exports = function (path) {
    return new Gen(path)
}