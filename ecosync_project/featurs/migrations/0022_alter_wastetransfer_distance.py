# Generated by Django 4.2.11 on 2024-05-03 15:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('featurs', '0021_alter_secondarytransferstation_location'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wastetransfer',
            name='Distance',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=10, null=True),
        ),
    ]