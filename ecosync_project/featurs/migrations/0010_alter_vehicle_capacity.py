# Generated by Django 4.2.11 on 2024-03-31 00:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('featurs', '0009_alter_landfill_capacity'),
    ]

    operations = [
        migrations.AlterField(
            model_name='vehicle',
            name='Capacity',
            field=models.IntegerField(choices=[(3, '3 ton'), (5, '5 ton'), (7, '7 ton'), (15, '15 ton')]),
        ),
    ]