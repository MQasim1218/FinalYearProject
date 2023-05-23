function getFilename(filename) {
    let fn = (Date().toString().slice(4, 25) + filename).replace(/ /g, '_')
    fn = fn.replace(/:/g, '_')

    console.log("Filename generated is: ", fn)
    return fn
}

module.exports = getFilename 