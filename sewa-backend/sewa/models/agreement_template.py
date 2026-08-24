from django.db import models
import os
import uuid

from .user import User

def get_unique_file_path(instance, filename):
    # Split the original filename to get its extension
    ext = filename.split(".")[-1]

    # Generate a unique filename using UUID4
    unique_filename = f"{uuid.uuid4().hex}.{ext}"

    # Return the full path relative to your MEDIA_ROOT folder
    return os.path.join("signs/", unique_filename)


class AgreementTemplate(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=500)
    content = models.TextField()
    sign_image =  models.ImageField(upload_to=get_unique_file_path)

    def __str__(self):
        return self.title
