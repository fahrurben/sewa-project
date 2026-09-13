from django.db import models

class Province(models.Model):
    id = models.CharField(max_length=2, primary_key=True)
    name = models.CharField(max_length=255)
    alt_name = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=10, decimal_places=8)
    longitude = models.DecimalField(max_digits=11, decimal_places=8)

    def __str__(self):
        return self.name