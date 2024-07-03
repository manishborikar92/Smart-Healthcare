from flask import Flask, request, render_template, redirect, url_for, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
import numpy as np
import os

app = Flask(__name__)
model = load_model('model/fungal_skin_model.h5')
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        file = request.files['file']
        if file:
            filename = file.filename
            filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(filepath)
            img = load_img(filepath, target_size=(128, 128))
            img_array = img_to_array(img) / 255.0
            img_array = np.expand_dims(img_array, axis=0)
            prediction = model.predict(img_array)
            predicted_class = np.argmax(prediction, axis=1)
            return render_template('result.html', prediction=predicted_class[0])
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)