from django.db import models

from sewa.models.province import Province

class Regency(models.Model):
    id = models.CharField(max_length=4, primary_key=True)
    province = models.ForeignKey(Province, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    alt_name = models.CharField(max_length=255)
    latitude = models.DecimalField(max_digits=10, decimal_places=8)
    longitude = models.DecimalField(max_digits=11, decimal_places=8)

    def __str__(self):
        return self.name