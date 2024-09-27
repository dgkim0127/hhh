const express = require('express');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();

// 파일 업로드 미들웨어 설정
app.use(fileUpload());
app.use(express.static('uploads')); // 업로드된 파일을 제공할 폴더

// 파일 업로드 처리
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    let uploadedFile = req.files.file;
    const uploadPath = path.join(__dirname, 'uploads', uploadedFile.name);

    uploadedFile.mv(uploadPath, (err) => {
        if (err) return res.status(500).send(err);
        res.send(`File uploaded! <a href="/uploads/${uploadedFile.name}">View File</a>`);
    });
});

// 서버 시작
app.listen(process.env.PORT || 3000, () => {
    console.log('Server started on port 3000');
});
