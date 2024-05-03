# Generated by Django 4.2.11 on 2024-05-02 17:06

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('featurs', '0015_alter_landfillmanager_landfill_alter_stsmanager_sts'),
    ]

    operations = [
        migrations.AlterField(
            model_name='landfillmanager',
            name='landfill',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='featurs.landfill'),
        ),
        migrations.AlterField(
            model_name='stsmanager',
            name='sts',
            field=models.ForeignKey(default=0, on_delete=django.db.models.deletion.CASCADE, to='featurs.secondarytransferstation'),
        ),
    ]
