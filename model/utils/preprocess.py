import os
import shutil
import sys
import json
from gradio_client import Client, handle_file
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet_v2 import preprocess_input
import contextlib
import io
from PIL import Image

disease_names = ['Burn_Skin', 'Healthy_Skin', 'Malignant', 'Non_Cancerous', 'Non_Skin']

def load_image(img_path):
    img = image.load_img(img_path, target_size=(224, 224))
    img_array = image.img_to_array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = preprocess_input(img_array)
    return img_array

def predict(image_path):
    try:
        model = None #load_model('model/skin_cancer_model_resnet50v2.keras')
        
        if not model:
            client = Client("theodinproject/skin_cancer_model_resnet50v2")
            result = client.predict(
                    image=handle_file(f'{image_path}'),
                    api_name="/predict"
            )

        else:
            img_array = load_image(image_path)

            # Suppress TensorFlow progress bar
            with contextlib.redirect_stdout(io.StringIO()):
                predictions = model.predict(img_array)
            
            decoded_predictions = np.argmax(predictions, axis=1)

            if decoded_predictions[0] < len(disease_names):
                disease_name = disease_names[decoded_predictions[0]]
            else:
                disease_name = "Unknown"

            # Convert accuracy from float32 to float
            accuracy = float(predictions[0][decoded_predictions[0]] * 100)  # Convert to float to be JSON serializable
            
            result = {"Disease": disease_name, "Accuracy": f"{accuracy:.2f}%"}

        folder = 'uploads'
        if os.path.exists(folder):
            if os.listdir(folder):  # Check if the folder is empty
                for item in os.listdir(folder):
                    item_path = os.path.join(folder, item)
                    if os.path.isdir(item_path):
                        shutil.rmtree(item_path)
                    else:
                        os.remove(item_path)

        return result
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    image_path = sys.argv[1]
    result = predict(image_path)
    print(json.dumps(result, ensure_ascii=False))