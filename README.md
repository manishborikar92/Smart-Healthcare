# Skin Diseases Detection

This project is a web application that uses a Convolutional Neural Network (CNN) to detect skin cancer diseases from uploaded images. The backend is built with Express.js, and the frontend uses EJS templating with HTML and CSS. The application allows users to upload an image and receive a prediction of the skin cancer disease along with the accuracy of the prediction.

## Project Structure

```
smart-healthcare/
├── api/
│   └── predict.js
├── data/
│   ├── dataset/
│   │   ├── splits/
│   │   │   ├── test/
│   │   │   │   ├── [disease folder 1]/
│   │   │   │   ├── [disease folder 2]/
│   │   │   │   └── ...
│   │   │   ├── train/
│   │   │   │   ├── [disease folder 1]/
│   │   │   │   ├── [disease folder 2]/
│   │   │   │   └── ...
│   │   │   └── validation/
│   │   │       ├── [disease folder 1]/
│   │   │       ├── [disease folder 2]/
│   │   │       └── ...
│   └── labels.csv (Optional)
├── model/
│   └── fungal_skin_model.keras
├── node_modules/
├── public/
│   ├── css/
│   │   └── styles.css
│   └── uploads/
├── routes/
│   └── index.js
├── utils/
│   ├── preprocess.py
│   └── train_model.py
├── views/
│   ├── index.ejs
│   └── result.ejs
├── app.js
├── package.json
└── vercel.json
```

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/VirtualVanguards/Smart-Healthcare.git
   cd smart-healthcare
   ```

2. Install dependencies:

   ```
   npm install
   npm install express multer body-parser ejs
   ```

3. Train the model:

   Ensure you have the dataset in the `data/dataset/splits/` directory.

   ```
   # Create a virtual environment
   python -m venv venv

   # Activate the virtual environment
   # On Windows
   venv\Scripts\activate

   # On macOS/Linux
   source venv/bin/activate

   pip install -r requirements.txt
   
   python utils/train_model.py
   ```

4. Run the server:

   ```
   node app.js
   ```

5. Deploy on Vercel:

   Ensure you have the Vercel CLI installed.

   ```
   vercel --prod
   ```

## Usage

1. Upload Image:

   Visit the homepage, upload an image of the skin, and submit.

2. View Prediction:

   After submission, the result page will display the predicted skin cancer disease and the accuracy of the prediction.

## Files Description

- api/predict.js: Handles the image upload and calls the Python script to make a prediction.
- routes/index.js: Defines the routes for the homepage and result page.
- utils/preprocess.py: Preprocesses the image and makes predictions using the trained model.
- views/index.ejs: The homepage where users can upload images.
- views/result.ejs: Displays the prediction result.
- app.js: Main server file that sets up the Express server and routes.
- package.json: Lists the project dependencies.
- vercel.json: Configuration file for deploying on Vercel.

## Model Training

The model is trained using a dataset of skin cancer disease images categorized into different classes. The training script `train_model.py` uses ResNet152V2 as the base model with additional layers for better accuracy.

## Contributing

Feel free to fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the LICENSE file for details.