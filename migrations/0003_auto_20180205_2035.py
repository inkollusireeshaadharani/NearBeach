# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2018-02-05 09:35
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('NearBeach', '0002_initialise_data'),
    ]

    operations = [
        migrations.AddField(
            model_name='list_of_taxes',
            name='tax_description',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='list_of_taxes',
            name='tax_amount',
            field=models.DecimalField(decimal_places=4, max_digits=6),
        ),
    ]
