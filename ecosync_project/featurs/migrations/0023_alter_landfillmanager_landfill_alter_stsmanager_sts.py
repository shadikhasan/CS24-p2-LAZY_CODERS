# Generated by Django 4.2.11 on 2024-05-03 16:22

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('featurs', '0022_alter_wastetransfer_distance'),
    ]

    operations = [
        migrations.AlterField(
            model_name='landfillmanager',
            name='landfill',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='featurs.landfill'),
        ),
        migrations.AlterField(
            model_name='stsmanager',
            name='sts',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='featurs.secondarytransferstation'),
        ),
    ]
