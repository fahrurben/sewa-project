from django.db import models

from sewa.models import User, Property, Application


class RenterStatus(models.TextChoices):
    CURRENT = 'CUR', 'Current'
    MOVING_IN = 'MOV', 'Moving In'
    PRIOR = 'PRI', 'Prior'


class Renter(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    renter = models.ForeignKey(User, on_delete=models.CASCADE)
    application = models.ForeignKey(Application, on_delete=models.CASCADE)
    lease_start = models.DateField()
    lease_end = models.DateField()
    duration = models.IntegerField()
    monthly_lease_rent = models.DecimalField(max_digits=10, decimal_places=2)
    deposit_amount = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(max_length=3, choices=RenterStatus.choices, default=RenterStatus.CURRENT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)