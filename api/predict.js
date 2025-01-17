const express = require('express');
const router = express.Router();
const { exec } = require('child_process');
const path = require('path');

router.post('/predict', (req, res) => {
    const imagePath = path.join(__dirname, '../uploads/', req.file.filename);
    const command = `set PYTHONIOENCODING=utf-8 && python utils/preprocess.py "${imagePath}"`;

    exec(command, { encoding: 'utf8' }, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error executing script: ${error}`);
            return res.status(500).send('Internal Server Error');
        }
        // Trim any extra lines and parse the JSON
        console.log('Python script output:', stdout);
        try {
            const jsonString = stdout.trim();
            const result = JSON.parse(jsonString);
            if (result.error) {
                console.error(`Prediction error: ${result.error}`);
                res.status(500).send('Internal Server Error');
            } else {
                res.render('result', { result });
            }
        } catch (parseError) {
            console.error(`Error parsing JSON: ${parseError}`);
            res.status(500).send('Internal Server Error');
        }
    });
});

module.exports = router;