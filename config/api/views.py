from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet
from .models import *
from .serializers import *

class BulkCreateViewSet(mixins.CreateModelMixin, 
                       mixins.ListModelMixin,
                       GenericViewSet):
    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super().get_serializer(*args, **kwargs)

# Views para modelos simples (bulk create)
class GenreViewSet(BulkCreateViewSet):
    queryset = Genre.objects.all()
    serializer_class = GenreSerializer
    permission_classes = [AllowAny]

class BandMemberViewSet(BulkCreateViewSet):
    queryset = BandMember.objects.all()
    serializer_class = BandMemberSerializer
    permission_classes = [AllowAny]

class SizeViewSet(BulkCreateViewSet):
    queryset = Size.objects.all()
    serializer_class = SizeSerializer
    permission_classes = [AllowAny]

class BandImageViewSet(BulkCreateViewSet):
    queryset = BandImage.objects.all()
    serializer_class = BandImageSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, list):
            created_images = []
            for image_data in request.data:
                data = image_data.copy()
                if 'image_url' in data:
                    data['image'] = data.pop('image_url')
                serializer = self.get_serializer(data=data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                created_images.append(serializer.data)
            return Response(created_images, status=status.HTTP_201_CREATED)
        return super().create(request, *args, **kwargs)

class ProductImageViewSet(BulkCreateViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, list):
            created_images = []
            for image_data in request.data:
                data = image_data.copy()
                if 'image_url' in data:
                    data['image'] = data.pop('image_url')
                serializer = self.get_serializer(data=data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                created_images.append(serializer.data)
            return Response(created_images, status=status.HTTP_201_CREATED)
        return super().create(request, *args, **kwargs)

class ProductSizeStockViewSet(BulkCreateViewSet):
    queryset = ProductSizeStock.objects.all()
    serializer_class = ProductSizeStockSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, list):
            created_stocks = []
            for stock_data in request.data:
                serializer = self.get_serializer(data=stock_data)
                serializer.is_valid(raise_exception=True)
                self.perform_create(serializer)
                created_stocks.append(serializer.data)
            return Response(created_stocks, status=status.HTTP_201_CREATED)
        return super().create(request, *args, **kwargs)

# Views complejas (Band y Product)
class BandViewSet(viewsets.ModelViewSet):
    queryset = Band.objects.all()
    serializer_class = BandSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        # Manejar tanto objeto único como lista
        if isinstance(request.data, list):
            return self._create_many(request, *args, **kwargs)
        return self._create_one(request, *args, **kwargs)

    def _create_one(self, request, *args, **kwargs):
        data = request.data.copy()
        band_serializer = self.get_serializer(data=data)
        band_serializer.is_valid(raise_exception=True)
        band = band_serializer.save()
        
        if 'genres' in data:
            band.genres.set(data.get('genres', []))
        
        if 'members' in data:
            band.members.set(data.get('members', []))
        
        if 'images' in data:
            for image_url in data.get('images', []):
                BandImage.objects.create(band=band, image=image_url)
        
        headers = self.get_success_headers(band_serializer.data)
        return Response(band_serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def _create_many(self, request, *args, **kwargs):
        created_bands = []
        for band_data in request.data:
            serializer = self.get_serializer(data=band_data)
            serializer.is_valid(raise_exception=True)
            band = serializer.save()
            
            if 'genres' in band_data:
                band.genres.set(band_data.get('genres', []))
            
            if 'members' in band_data:
                band.members.set(band_data.get('members', []))
            
            if 'images' in band_data:
                for image_url in band_data.get('images', []):
                    BandImage.objects.create(band=band, image=image_url)
            
            created_bands.append(serializer.data)
        
        return Response(created_bands, status=status.HTTP_201_CREATED)

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        if isinstance(request.data, list):
            return self._create_many(request, *args, **kwargs)
        return self._create_one(request, *args, **kwargs)

    def _create_one(self, request, *args, **kwargs):
        data = request.data.copy()
        product_serializer = self.get_serializer(data=data)
        product_serializer.is_valid(raise_exception=True)
        product = product_serializer.save()
        
        if 'images' in data:
            for image_url in data.get('images', []):
                ProductImage.objects.create(product=product, image=image_url)
        
        if 'sizes_stock' in data:
            for item in data.get('sizes_stock', []):
                ProductSizeStock.objects.create(
                    product=product,
                    size_id=item.get('size'),
                    stock=item.get('stock', 0)
                )
        
        headers = self.get_success_headers(product_serializer.data)
        return Response(product_serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def _create_many(self, request, *args, **kwargs):
        created_products = []
        for product_data in request.data:
            serializer = self.get_serializer(data=product_data)
            serializer.is_valid(raise_exception=True)
            product = serializer.save()
            
            if 'images' in product_data:
                for image_url in product_data.get('images', []):
                    ProductImage.objects.create(product=product, image=image_url)
            
            if 'sizes_stock' in product_data:
                for item in product_data.get('sizes_stock', []):
                    ProductSizeStock.objects.create(
                        product=product,
                        size_id=item.get('size'),
                        stock=item.get('stock', 0)
                    )
            
            created_products.append(serializer.data)
        
        return Response(created_products, status=status.HTTP_201_CREATED)