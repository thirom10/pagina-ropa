from django.db import models
from django.core.validators import MinValueValidator

class Genre(models.Model):
    name = models.CharField(max_length=50, unique=True)
    
    def __str__(self):
        return self.name

class BandMember(models.Model):
    name = models.CharField(max_length=100)
    role = models.CharField(max_length=100)
    
    def __str__(self):
        return f"{self.name} ({self.role})"

class Band(models.Model):
    name = models.CharField(max_length=100, unique=True)
    formation_year = models.IntegerField()
    description = models.TextField()
    genres = models.ManyToManyField(Genre)
    members = models.ManyToManyField(BandMember)
    
    def __str__(self):
        return self.name

class Size(models.Model):
    name = models.CharField(max_length=10, unique=True)
    
    def __str__(self):
        return self.name

class ProductImage(models.Model):
    image = models.ImageField(upload_to='product_images/')
    
    def __str__(self):
        return f"Image {self.id}"

class BandImage(models.Model):
    image = models.ImageField(upload_to='band_images/')
    band = models.ForeignKey(Band, on_delete=models.CASCADE, related_name='images')
    
    def __str__(self):
        return f"Image for {self.band.name}"

class Product(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2, validators=[MinValueValidator(0)])
    band = models.ForeignKey(Band, on_delete=models.CASCADE, related_name='products')
    images = models.ManyToManyField(ProductImage)
    
    def __str__(self):
        return self.name

class ProductSizeStock(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='sizes_stock')
    size = models.ForeignKey(Size, on_delete=models.CASCADE)
    stock = models.IntegerField(validators=[MinValueValidator(0)])
    
    class Meta:
        unique_together = ('product', 'size')
    
    def __str__(self):
        return f"{self.product.name} - {self.size.name}: {self.stock}"