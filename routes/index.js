const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { spawn } = require('child_process');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Home route
router.get('/', (req, res) => {
  res.render('index');
});

// Upload route
router.post('/upload', upload.single('image'), (req, res) => {
  const imagePath = req.file.path;

  console.log(`Uploaded image path: ${imagePath}`);

  const pythonProcess = spawn('python', ['utils/preprocess.py', imagePath]);

  pythonProcess.stdout.on('data', (data) => {
    const result = data.toString().split(' ');
    const predictionResult = {
      diseaseName: result[0],
      accuracy: `${(parseFloat(result[1]) * 100).toFixed(2)}%`
    };

    console.log(`Prediction result: ${JSON.stringify(predictionResult)}`);

    res.render('result', { imagePath, predictionResult });
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
});

module.exports = router;