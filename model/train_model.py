# Import libraries (replace with your chosen framework)
import tensorflow as tf
from tensorflow.keras.applications import VGG16
from tensorflow.keras.layers import Flatten, Dense
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# Define data paths (modify these paths to point to your data directories)
data_dir = "data/dataset/splits"  # Base directory for train, test, validation sets
train_dir = os.path.join(data_dir, "train")
test_dir = os.path.join(data_dir, "test")
validation_dir = os.path.join(data_dir, "validation")

# Define image size for your model (e.g., 224x224 pixels)
img_height, img_width = 224, 224

# Define class labels (modify these based on your specific diseases)
class_names = ['healthy', 'tinea_pedis', 'candidiasis', 'other_disease']  # Replace 'other_disease' with actual disease name(s)
num_classes = len(class_names)

# Load pre-trained VGG16 model (freeze pre-trained weights)
pre_trained_model = VGG16(weights="imagenet", include_top=False, input_shape=(img_height, img_width, 3))

# Add new layers for classification
x = pre_trained_model.output
x = Flatten()(x)
x = Dense(units=1024, activation="relu")(x)
predictions = Dense(units=num_classes, activation="softmax")(x)

model = tf.keras.Model(inputs=pre_trained_model.input, outputs=predictions)

# Freeze pre-trained layers to prevent retraining
for layer in pre_trained_model.layers:
  layer.trainable = False

# Data augmentation (adjust parameters as needed)
train_datagen = ImageDataGenerator(rescale=1./255, shear_range=0.2, zoom_range=0.2, horizontal_flip=True)
validation_datagen = ImageDataGenerator(rescale=1./255)

# Create training and validation data generators (adjust batch size)
train_generator = train_datagen.flow_from_directory(
    train_dir,
    target_size=(img_height, img_width),
    batch_size=32,
    class_mode="categorical",
    classes=class_names,  # Specify class labels
    subset="training"  # Use 'validation' for validation set
)

validation_generator = validation_datagen.flow_from_directory(
    validation_dir,
    target_size=(img_height, img_width),
    batch_size=32,
    class_mode="categorical",
    classes=class_names  # Specify class labels
)

# Compile the model (adjust learning rate and optimizer if needed)
model.compile(loss="categorical_crossentropy", optimizer="adam", metrics=["accuracy"])

# Train the model (adjust number of epochs)
model.fit(train_generator, epochs=10, validation_data=validation_generator)

# Save the trained model (replace with a filename of your choice)
model.save("fungal_skin_model.h5")