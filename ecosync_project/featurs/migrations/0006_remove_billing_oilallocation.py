# Generated by Django 4.2.11 on 2024-03-30 12:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('featurs', '0005_billing_distance'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='billing',
            name='OilAllocation',
        ),
    ]
