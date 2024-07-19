import sys
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.vgg16 import preprocess_input

def load_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array

def predict(image_path):
    model = load_model('model/fungal_skin_model.h5')
    img_array = load_image(image_path)
    predictions = model.predict(img_array)
    decoded_predictions = np.argmax(predictions, axis=1)
    disease_names = ['disease1', 'disease2']  # Replace with actual disease names
    disease_name = disease_names[decoded_predictions[0]]
    accuracy = predictions[0][decoded_predictions[0]]
    return f"{disease_name} {accuracy}"

if __name__ == "__main__":
    image_path = sys.argv[1]
    result = predict(image_path)
    print(result)
