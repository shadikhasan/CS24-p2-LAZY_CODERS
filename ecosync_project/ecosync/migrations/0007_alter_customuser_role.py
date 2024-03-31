# Generated by Django 4.2.11 on 2024-03-31 22:49

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('featurs', '0012_wastetransfer_distance'),
        ('ecosync', '0006_alter_customuser_role'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customuser',
            name='role',
            field=models.ForeignKey(default=4, on_delete=django.db.models.deletion.SET_DEFAULT, to='featurs.role'),
        ),
    ]
