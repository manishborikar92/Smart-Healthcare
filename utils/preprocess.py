import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import numpy as np
import sys

model_path = 'model/fungal_skin_model.h5'
model = load_model(model_path)

def predict_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array /= 255.0

    prediction = model.predict(img_array)
    predicted_class = np.argmax(prediction, axis=1)
    confidence = np.max(prediction)

    # Dummy disease names for example purposes
    disease_names = ['Healthy', 'Ringworm', 'Athlete\'s foot']
    predicted_disease = disease_names[predicted_class[0]]

    return predicted_disease, confidence

if __name__ == "__main__":
    img_path = sys.argv[1]
    disease, confidence = predict_image(img_path)
    print(disease, confidence)
