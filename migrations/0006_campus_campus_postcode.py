# Generated by Django 2.1 on 2018-09-19 11:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('NearBeach', '0005_auto_20180908_1342'),
    ]

    operations = [
        migrations.AddField(
            model_name='campus',
            name='campus_postcode',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
    ]
