import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Conv2D, MaxPooling2D, Flatten, Dense, Dropout
from utils.preprocess import preprocess_images

def build_model(input_shape):
    model = Sequential([
        Conv2D(32, (3, 3), activation='relu', input_shape=input_shape),
        MaxPooling2D((2, 2)),
        Conv2D(64, (3, 3), activation='relu'),
        MaxPooling2D((2, 2)),
        Conv2D(128, (3, 3), activation='relu'),
        MaxPooling2D((2, 2)),
        Flatten(),
        Dense(128, activation='relu'),
        Dropout(0.5),
        Dense(3, activation='softmax')  # Adjust the number of classes accordingly
    ])
    model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
    return model

if __name__ == '__main__':
    data_dir = 'data/dataset'
    target_size = (128, 128)
    train_gen, val_gen = preprocess_images(data_dir, target_size)
    model = build_model((128, 128, 3))
    model.fit(train_gen, epochs=20, validation_data=val_gen)
    model.save('backend/model/fungal_skin_model.h5')