from django.db import models

from sewa.models import User, AgreementTemplate
from sewa.models.province import Province
from sewa.models.regency import Regency

class PropertyType(models.TextChoices):
    HOUSE = 'HOUSE', 'House'
    ROOM = 'ROOM', 'Room'

class FurnishingType(models.TextChoices):
    FULLY_FURNISHED = 'FULLY', 'Fully Furnished'
    SEMI_FURNISHED = 'SEMI', 'Semi Furnished'
    UN_FURNISHED = 'NO', 'Unfurnished'

class RentalCostType(models.TextChoices):
    MONTHLY = 'MONTHLY', 'Monthly'
    YEARLY = 'YEARLY', 'Yearly'

class PropertyStatus(models.TextChoices):
    DRAFT = 'DRAFT', 'Draft'
    AVAILABLE = 'AVAILABLE', 'Available'
    UN_AVAILABLE = 'UN_AVAILABLE', 'Unavailable'

class Property(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField()
    address = models.CharField(max_length=500, default='')
    province = models.ForeignKey(Province, on_delete=models.RESTRICT)
    city = models.ForeignKey(Regency, on_delete=models.RESTRICT)
    postal_code = models.CharField(max_length=5)
    longitude = models.DecimalField(max_digits=11, decimal_places=8)
    latitude = models.DecimalField(max_digits=10, decimal_places=8)
    type = models.CharField(max_length=5, choices=PropertyType.choices, default=PropertyType.HOUSE)
    furnishing_type = models.CharField(max_length=5, choices=FurnishingType.choices, default=PropertyType.HOUSE)
    land_area = models.IntegerField()
    building_area = models.IntegerField()
    total_rooms = models.IntegerField()
    total_bathrooms = models.IntegerField()
    rental_cost_type = models.CharField(max_length=10, choices=RentalCostType.choices, default=RentalCostType.MONTHLY)
    rental_cost = models.DecimalField(max_digits=10, decimal_places=2)
    is_deposit_required = models.BooleanField()
    deposit_amount = models.DecimalField(max_digits=10, decimal_places=2)
    thumbnail = models.CharField(max_length=255, null=True)

    agreement_template = models.ForeignKey(AgreementTemplate, on_delete=models.CASCADE)
    status = models.CharField(max_length=12, choices=PropertyStatus.choices, default=PropertyStatus.DRAFT)

    def __str__(self):
        return self.name

    @property
    def province_name(self):
        return self.province.name

    @property
    def city_name(self):
        return self.city.name

class PropertyImage(models.Model):
    property = models.ForeignKey(
        Property, on_delete=models.CASCADE, related_name="images"
    )
    filename = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.property.name} {self.filename}"