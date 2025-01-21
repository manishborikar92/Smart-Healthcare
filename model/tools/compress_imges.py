import os
from PIL import Image

# Function to compress images
def compress_images(input_folder, output_folder, quality=85):
    # Check if the output folder exists, if not, create it
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Iterate over all files in the input folder
    for filename in os.listdir(input_folder):
        if filename.endswith((".jpg", ".jpeg", ".png")):  # Specify file types you want to compress
            try:
                # Open an image file
                img = Image.open(os.path.join(input_folder, filename))
                
                # Save it to the output folder with reduced quality
                img.save(os.path.join(output_folder, filename), optimize=True, quality=quality)
                
                print(f"Compressed: {filename}")
            except Exception as e:
                print(f"Error compressing {filename}: {e}")

# Provide paths
input_folder = "path/to/your/input/folder"  # Replace with your input folder path
output_folder = "path/to/your/output/folder"  # Replace with your output folder path

# Call the function
compress_images(input_folder, output_folder, quality=85)  # You can adjust the quality level