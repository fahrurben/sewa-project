from django.db import models
import os
import uuid

from sewa.models import User, Property

def get_unique_file_path(instance, filename):
    # Split the original filename to get its extension
    ext = filename.split(".")[-1]

    # Generate a unique filename using UUID4
    unique_filename = f"{uuid.uuid4().hex}.{ext}"

    # Return the full path relative to your MEDIA_ROOT folder
    return os.path.join("application_files/", unique_filename)

class ApplicationStatus(models.TextChoices):
    REQUESTED = 'REQ', 'Requested'
    ACCEPTED = 'ACC', 'Accepted'
    REJECTED = 'REJ', 'Rejected'
    PAID = 'PAI', 'Paid'

class Application(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    requestor = models.ForeignKey(User, on_delete=models.CASCADE)
    lease_start = models.DateField()
    lease_end = models.DateField()
    duration = models.IntegerField()
    monthly_lease_rent = models.DecimalField(max_digits=10, decimal_places=2)
    deposit_amount = models.DecimalField(max_digits=10, decimal_places=2)
    agreement_file = models.FileField(upload_to=get_unique_file_path)
    id_file = models.FileField(upload_to=get_unique_file_path)
    status = models.CharField(max_length=3, choices=ApplicationStatus.choices, default=ApplicationStatus.REQUESTED)
    reject_reason = models.TextField(null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

