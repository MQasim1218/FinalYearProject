const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage').GridFsStorage

// Create a storage Engine
const storageEngine = new GridFsStorage({
    // Give the database url!
    url: 'mongodb://localhost:27017/explore',
    options: { useNewUrlParser: true, useUnifiedTopology: true },

    // The file callback specifies the filename and the destination for the stored files...
    file: (req, file) => {
        const match = ['image/jgp', 'image/png', 'image/jpeg']
        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}--${file.orignalName}`
            return filename
        }

        return {
            bucketName: 'photos',
            filename: `${Date.now()}--${file.orignalName}`
        }
    }
})

module.exports = multer({ storage: storageEngine })