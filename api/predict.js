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

        // Clean stdout to isolate the JSON part
        try {
            console.log('Python script output:', stdout);

            // Extract valid JSON from stdout using regex to capture the first JSON object
            const jsonMatch = stdout.match(/{.*}/);
            if (jsonMatch) {
                let jsonString = jsonMatch[0]; // Extract the JSON part
                console.log('Extracted JSON:', jsonString);

                // Convert single quotes to double quotes for proper JSON parsing
                jsonString = jsonString.replace(/'/g, '"');

                const result = JSON.parse(jsonString); // Parse the corrected JSON
                res.render('result', { result });
            } else {
                console.error('No valid JSON found in stdout');
                res.status(500).send('Internal Server Error');
            }
        } catch (parseError) {
            console.error(`Error parsing JSON: ${parseError}`);
            res.status(500).send('Internal Server Error');
        }
    });
});

module.exports = router;
