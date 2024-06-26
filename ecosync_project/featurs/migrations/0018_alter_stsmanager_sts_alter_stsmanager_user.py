# Generated by Django 4.2.11 on 2024-05-03 08:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('featurs', '0017_alter_landfillmanager_landfill_alter_stsmanager_sts'),
    ]

    operations = [
        migrations.AlterField(
            model_name='stsmanager',
            name='sts',
            field=models.OneToOneField(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='featurs.secondarytransferstation'),
        ),
        migrations.AlterField(
            model_name='stsmanager',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL),
        ),
    ]
