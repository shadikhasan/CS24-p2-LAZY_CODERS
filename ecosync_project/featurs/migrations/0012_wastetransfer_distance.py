# Generated by Django 4.2.11 on 2024-03-31 00:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('featurs', '0011_delete_route'),
    ]

    operations = [
        migrations.AddField(
            model_name='wastetransfer',
            name='Distance',
            field=models.DecimalField(decimal_places=2, default=100, max_digits=10),
            preserve_default=False,
        ),
    ]
