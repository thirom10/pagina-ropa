# Generated by Django 5.2 on 2025-04-04 17:27

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Band',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True)),
                ('formation_year', models.IntegerField()),
                ('description', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='BandMember',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('role', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='ProductImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='product_images/')),
            ],
        ),
        migrations.CreateModel(
            name='Size',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=10, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='BandImage',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image', models.ImageField(upload_to='band_images/')),
                ('band', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='images', to='api.band')),
            ],
        ),
        migrations.AddField(
            model_name='band',
            name='members',
            field=models.ManyToManyField(to='api.bandmember'),
        ),
        migrations.AddField(
            model_name='band',
            name='genres',
            field=models.ManyToManyField(to='api.genre'),
        ),
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('price', models.DecimalField(decimal_places=2, max_digits=10, validators=[django.core.validators.MinValueValidator(0)])),
                ('band', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='api.band')),
                ('images', models.ManyToManyField(to='api.productimage')),
            ],
        ),
        migrations.CreateModel(
            name='ProductSizeStock',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('stock', models.IntegerField(validators=[django.core.validators.MinValueValidator(0)])),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sizes_stock', to='api.product')),
                ('size', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.size')),
            ],
            options={
                'unique_together': {('product', 'size')},
            },
        ),
    ]
