import os
import django
from decimal import Decimal

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'buyer_portal.settings')
django.setup()

from property.models import Property  

# Clear existing properties
Property.objects.all().delete()

# Sample properties
sample_properties = [
    {'title': 'Modern 3BR Apartment', 'price': Decimal('350000.00'), 'location': 'Downtown'},
    {'title': 'Luxury Villa', 'price': Decimal('1250000.00'), 'location': 'Suburbs'},
    {'title': 'Cozy 2BR Condo', 'price': Decimal('280000.00'), 'location': 'City Center'},
    {'title': 'Family Home', 'price': Decimal('450000.00'), 'location': 'Green Hills'},
    {'title': 'Penthouse Suite', 'price': Decimal('850000.00'), 'location': 'Skyline View'},
]

# Create properties
for prop in sample_properties:
    Property.objects.create(**prop)

print("Added 5 sample properties!")