# Generated by Django 4.0.5 on 2022-07-12 06:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0006_rename_countinstock_product_countinstock'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='image',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
