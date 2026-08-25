from django.db import models
import os
import uuid

def get_image_file_path(instance, filename):
    # Split the original filename to get its extension
    ext = filename.split(".")[-1]

    # Generate a unique filename using UUID4
    unique_filename = f"{uuid.uuid4().hex}.{ext}"

    # Return the full path relative to your MEDIA_ROOT folder
    return os.path.join("images/", unique_filename)

class UploadImageModel(models.Model):
    image = models.ImageField(upload_to=get_image_file_path)

    def __str__(self):
        return self.image.name

    @property
    def filename(self):
        return os.path.basename(self.image.name)