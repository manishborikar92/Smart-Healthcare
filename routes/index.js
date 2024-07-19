const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { spawn } = require('child_process');

// Set up storage for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = path.join('public', 'uploads', req.file.filename);
  console.log(`Image uploaded to: ${imagePath}`);
  res.redirect('/result?imagePath=' + encodeURIComponent(imagePath));
});

router.post('/predict', (req, res) => {
  const { imagePath } = req.body;

  const pythonProcess = spawn('python3', [path.resolve(__dirname, '../api/predict.js'), imagePath]);

  pythonProcess.stdout.on('data', (data) => {
    const result = data.toString().split(' ');
    const predictionResult = {
      diseaseName: result[0],
      accuracy: `${(parseFloat(result[1]) * 100).toFixed(2)}%`
    };

    res.status(200).json(predictionResult);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).send('Internal Server Error');
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

module.exports = router;
