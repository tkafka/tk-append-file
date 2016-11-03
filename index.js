var fs = require('fs');
const promisify = require('es6-promisify');
const writeFileAsync = promisify(fs.writeFile);
const appendFileAsync = promisify(fs.appendFile);

function AppendFile(path) {
    this._path = path;
    this._promise = Promise.resolve()
	.then(function() {
	    return writeFileAsync(path, '');
	})
	.catch(console.error);
}

AppendFile.prototype.clear = function() {
    var filePath = this._path;
    var done = this._promise
		.then(function() {
		    return writeFileAsync(filePath, '');
		})
		.catch(console.error);
	this._promise = done;
	return done;
};

AppendFile.prototype.append = function() {
    var str =
	Array.prototype.slice.call(arguments)
	    .map(function(arg) {
		if (typeof arg == 'object') {
		    return JSON.stringify(arg, null, 2);
		} else {
		    return arg.toString();
		}
	    })
	    .join(' ');

    var filePath = this._path;
    var done = this._promise
		.then(function() {
			return appendFileAsync(filePath, str + '\n');
		})
		.catch(console.error);
	this._promise = done;
	return done;
};

module.exports = AppendFile;
