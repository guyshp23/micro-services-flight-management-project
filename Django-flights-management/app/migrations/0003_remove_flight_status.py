# Generated by Django 4.1.7 on 2023-03-20 17:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_canceledtickets'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='flight',
            name='status',
        ),
    ]
