from tensorflow.keras.preprocessing.image import ImageDataGenerator

def preprocess_images(data_dir, target_size=(128, 128)):
    datagen = ImageDataGenerator(rescale=1./255, validation_split=0.2)
    train_generator = datagen.flow_from_directory(
        data_dir,
        target_size=target_size,
        batch_size=32,
        class_mode='categorical',
        subset='training'
    )
    validation_generator = datagen.flow_from_directory(
        data_dir,
        target_size=target_size,
        batch_size=32,
        class_mode='categorical',
        subset='validation'
    )
    return train_generator, validation_generator