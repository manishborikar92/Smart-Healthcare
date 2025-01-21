import os
from PIL import Image

def check_images(directory):
    """
    Checks all images in the specified directory for validity.
    
    Parameters:
        directory (str): Path to the directory containing images.
    
    Returns:
        valid_images (list): List of valid image paths.
        invalid_images (list): List of invalid/corrupt image paths.
    """
    valid_images = []
    invalid_images = []

    # Walk through all files in the directory
    for root, _, files in os.walk(directory):
        for file in files:
            file_path = os.path.join(root, file)
            try:
                with Image.open(file_path) as img:
                    img.verify()  # Verify the integrity of the image
                    valid_images.append(file_path)  # Image is valid
            except (IOError, SyntaxError, Image.UnidentifiedImageError) as e:
                print(f"Invalid image file detected: {file_path} - Error: {e}")
                invalid_images.append(file_path)  # Image is invalid/corrupt
    
    return valid_images, invalid_images

# Example usage:
directory_path = 'data/dataset/splits/test/Malignant'
valid_images, invalid_images = check_images(directory_path)

print(f"Valid images: {len(valid_images)}")
print(f"Invalid images: {len(invalid_images)}")

if invalid_images:
    print("\nList of invalid images:")
    for invalid_image in invalid_images:
        print(invalid_image)
