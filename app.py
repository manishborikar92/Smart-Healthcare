from flask import Flask, request, jsonify, render_template
from tensorflow.keras.models import load_model
import numpy as np
from PIL import Image
import os

app = Flask(__name__)
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load the trained model
model_path = 'model/fungal_skin_model.h5'
model = load_model(model_path)

# Function to preprocess image
def preprocess_image(image_path):
    img = Image.open(image_path)
    img = img.resize((224, 224))  # Resize image to match model's expected sizing
    img_array = np.asarray(img)
    img_array = img_array / 255.0  # Normalize pixel values
    img_array = np.expand_dims(img_array, axis=0)  # Add batch dimension
    return img_array

# Function to get class labels dynamically from folder names
def get_class_labels():
    train_dir = 'data/dataset/splits/train'
    classes = os.listdir(train_dir)
    return classes

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    try:
        # Save the uploaded file
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
        file.save(file_path)

        # Preprocess the uploaded image
        img_array = preprocess_image(file_path)

        # Predict class probabilities
        predictions = model.predict(img_array)

        # Get class labels dynamically
        class_labels = get_class_labels()

        # Get predicted class label
        predicted_class = np.argmax(predictions)
        class_name = class_labels[predicted_class]

        return jsonify({'class_name': class_name, 'probabilities': predictions.tolist()})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)