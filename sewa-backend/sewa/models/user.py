from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.models import BaseUserManager as BUM
from django.db import models


class UserRole(models.TextChoices):
    ADMIN = 'AD', 'Admin'
    TENANT = 'TE', 'Tenant'
    LANDLORD = 'LA', 'Landlord'


class IdType(models.TextChoices):
    ID_CARD = 'ID', 'ID Card'
    PASSPORT = 'PA', 'Passport'


class GenderType(models.TextChoices):
    MALE = 'M', 'Male'
    FEMAIL = 'F', 'Female'


class BaseUserManager(BUM):
    def create_user(
        self,
        email,
        first_name,
        last_name,
        id_type,
        id_number,
        gender,
        birthday,
        province,
        city,
        verification_code,
        role=UserRole.TENANT,
        is_verified=True,
        is_active=True,
        is_admin=False,
        password=None,
    ):
        if not email or not first_name or not last_name:
            raise ValueError("User email, first_name, and last_name is cannot empty")

        user = self.model(
            email=self.normalize_email(email.lower()),
            first_name=first_name,
            last_name=last_name,
            id_type=id_type,
            id_number=id_number,
            gender=gender,
            birthday=birthday,
            province=province,
            verification_code=verification_code,
            city=city,
            role=role,
            is_verified=is_verified,
            is_active=is_active,
            is_admin=is_admin,
        )

        if password is not None:
            user.set_password(password)
        else:
            user.set_unusable_password()

        user.full_clean()
        user.save()

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        if not extra_fields.get("first_name"):
            raise ValueError("Superuser first name should not empty")
        if not extra_fields.get("last_name"):
            raise ValueError("Superuser last name should not empty.")
        if not extra_fields.get("id_type"):
            raise ValueError("Superuser ID Type should not empty.")
        if not extra_fields.get("id_number"):
            raise ValueError("Superuser ID number should not empty.")
        if not extra_fields.get("gender"):
            raise ValueError("Superuser gender should not empty.")
        if not extra_fields.get("birthday"):
            raise ValueError("Superuser birthday should not empty.")
        if not extra_fields.get("province"):
            raise ValueError("Superuser province should not empty.")
        if not extra_fields.get("city"):
            raise ValueError("Superuser city should not empty.")

        first_name = extra_fields.get("first_name")
        last_name = extra_fields.get("last_name")
        id_type = extra_fields.get("id_type")
        id_number = extra_fields.get("id_number")
        gender = extra_fields.get("gender")
        birthday = extra_fields.get("birthday")
        province = extra_fields.get("province")
        city = extra_fields.get("city")

        user = self.create_user(
            email=email,
            first_name=first_name,
            last_name=last_name,
            id_type=id_type,
            id_number=id_number,
            gender=gender,
            birthday=birthday,
            province=province,
            city=city,
            role=UserRole.ADMIN,
            is_verified=True,
            is_active=True,
            is_admin=True,
            password=password,
        )

        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    objects = BaseUserManager()

    email = models.EmailField(
        verbose_name="email address",
        max_length=255,
        unique=True
    )

    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)

    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    role = models.CharField(
        max_length=2, choices=UserRole.choices, default=UserRole.TENANT
    )
    id_type = models.CharField(
        max_length=2, choices=IdType.choices, default=IdType.ID_CARD
    )
    id_number = models.CharField(max_length=16)
    gender = models.CharField(
        max_length=1, choices=GenderType.choices, default=GenderType.MALE
    )
    birthday = models.DateField()
    province = models.CharField(max_length=5)
    city = models.CharField(max_length=5)
    is_verified = models.BooleanField()
    verification_code = models.CharField(max_length=10, null=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
        "role",
        "id_type",
        "id_number",
        "gender",
        "birthday",
        "province",
        "city",
        "is_verified",
        "is_active",
        "is_admin",
    ]

    def __str__(self):
        return self.email

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"

    def is_staff(self):
        return self.is_admin
