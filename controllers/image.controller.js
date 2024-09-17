function upload(req, res) {
    if(req.file.filename) {
        res.status(201).json({
            status: true,
            message: "Image Was Uploaded Successfully!",
            url: req.file.filename
        })
    }
    else
    {
        res.status(500).json({
            status: false,
            message: "Something Went Wrong!"
        })
    }
}

module.exports = {
    upload: upload
}

