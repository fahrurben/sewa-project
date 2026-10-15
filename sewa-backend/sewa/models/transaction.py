from django.db import models

class TransactionType(models.TextChoices):
    DP = 'DP', 'Down Payment'
    RENT = 'RE', 'Rent'