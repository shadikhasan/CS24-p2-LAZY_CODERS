# Generated by Django 4.2.11 on 2024-03-29 12:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('featurs', '0003_billing_oilallocation'),
    ]

    operations = [
        migrations.AddField(
            model_name='landfill',
            name='Capacity',
            field=models.DecimalField(decimal_places=2, default=100, max_digits=10),
        ),
        migrations.AddField(
            model_name='landfill',
            name='Latitude',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='landfill',
            name='Longitude',
            field=models.FloatField(default=0.0),
        ),
        migrations.AddField(
            model_name='landfill',
            name='OperationalTimespan',
            field=models.CharField(default='24/7', max_length=100),
        ),
    ]
