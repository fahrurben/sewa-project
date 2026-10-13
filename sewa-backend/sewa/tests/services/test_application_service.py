import datetime

from django.test import TestCase

from sewa.models import Province, Regency, Property, AgreementTemplate, Application, ApplicationStatus
from sewa.models.property import PropertyType, FurnishingType, RentalCostType, PropertyStatus
from sewa.models.user import User, IdType, GenderType, UserRole
from sewa.services.application_service import create_application, update_status


class ApplicationServiceTests(TestCase):

    @classmethod
    def setUpTestData(cls):
        province = Province.objects.get(id="11")
        city = Regency.objects.get(id="1101")

        landlord_user = User.objects.create_user("landlord@test.com", "Tom", "Doe", IdType.ID_CARD, "123",
                                                 GenderType.MALE, datetime.date(1990, 1, 1), province.id, city.id, "abc123",
                                                 UserRole.LANDLORD, True, True, False, "secret123")
        renter_user = User.objects.create_user("renter@test.com", "John", "Doe", IdType.ID_CARD, "123",
                                               GenderType.MALE, datetime.date(1990, 1, 1), province.id, city.id, "abc123",
                                               UserRole.LANDLORD, True, True, False, "secret123")
        agreement_template = AgreementTemplate.objects.create(author=landlord_user, title="Test", content="Test",
                                                              sign_image="signimage.jpg")
        property = Property()
        property.owner = landlord_user
        property.name = "Property 1"
        property.description = "Lorem ipsum"
        property.address = "First Avenue"
        property.province = province
        property.city = city
        property.postal_code = "123"
        property.longitude = 1.0
        property.latitude = 1.0
        property.type = PropertyType.ROOM
        property.furnishing_type = FurnishingType.FULLY_FURNISHED
        property.land_area = 10
        property.building_area = 10
        property.total_rooms = 1
        property.total_bathrooms = 1
        property.rental_cost_type = RentalCostType.MONTHLY
        property.rental_cost = 1000000
        property.is_deposit_required = False
        property.deposit_amount = 0
        property.thumbnail = "thumbnail.jpg"
        property.agreement_template = agreement_template
        property.status = PropertyStatus.AVAILABLE
        property.save()

        cls.landlord = landlord_user
        cls.property = property
        cls.current_user = renter_user

    def test_create_application(self):
        data = {
            "property_id": self.property.id,
            "lease_start": datetime.date(2027,1,1),
            "duration": 365
        }
        application = create_application(self.current_user, data)
        self.assertIsNotNone(application)
        self.assertIsNotNone(application.id)

    def test_update_status(self):
        data = {
            "property_id": self.property.id,
            "lease_start": datetime.date(2027, 1, 1),
            "duration": 365
        }
        application = create_application(self.current_user, data)

        is_updated = update_status(self.landlord, application, ApplicationStatus.PENDING_PAYMENT, "")
        self.assertEqual(is_updated, True)
        self.assertEqual(application.status, ApplicationStatus.PENDING_PAYMENT)

