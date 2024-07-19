const { spawn } = require('child_process');
const path = require('path');

module.exports = (req, res) => {
  const { imagePath } = req.body;

  console.log(`Received image path: ${imagePath}`);

  const pythonProcess = spawn('python3', [path.resolve(__dirname, '../utils/preprocess.py'), imagePath]);

  pythonProcess.stdout.on('data', (data) => {
    const result = data.toString().split(' ');
    const predictionResult = {
      diseaseName: result[0],
      accuracy: `${(parseFloat(result[1]) * 100).toFixed(2)}%`
    };

    console.log(`Prediction result: ${JSON.stringify(predictionResult)}`);
    res.status(200).json(predictionResult);
  });

  pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
    res.status(500).send('Internal Server Error');
  });

  pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
};
