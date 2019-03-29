const { join } = require('path')
const { readdir, readFile } = require('fs')
const { promisify } = require('util')

const readdirAsync = promisify(readdir)
const readFileAsync = promisify(readFile)

class File{
	static async list(dir, extension = []) {
    const files = (await readdirAsync(dir)).map(f => join(dir, f))
    return files.map((file)=>{
    	return file.endsWith(extension) ? file : null;
    });
	}

	static async read(path) {
    return await readFileAsync(path, "utf8");
	}

}

module.exports = File;
