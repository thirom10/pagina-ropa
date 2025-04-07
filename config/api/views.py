from rest_framework import viewsets, status, mixins
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.viewsets import GenericViewSet
from .models import *
from .serializers import *
from rest_framework.parsers import MultiPartParser, JSONParser

class BulkCreateViewSet(mixins.CreateModelMixin, 
                       mixins.ListModelMixin,
                       GenericViewSet):
    def get_serializer(self, *args, **kwargs):
        if isinstance(kwargs.get('data', {}), list):
            kwargs['many'] = True
        return super().get_serializer(*args, **kwargs)

# Views para modelos simples (bulk create), esto fue para que desde el localhost:8000 pueda mandar json y crear varios objetos a la vez
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

# Views complejas (Band y Product), aca se manejan los objetos que tienen relaciones con otros modelos, por lo que se necesita un poco mas de logica para crear los objetos
# y sus relaciones. Se manejan tanto objetos individuales como listas de objetos, por lo que se hace un chequeo para ver si el request es una lista o no
class BandViewSet(viewsets.ModelViewSet):
    queryset = Band.objects.all()
    serializer_class = BandSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        # Manejar tanto objeto unico como lista
        if isinstance(request.data, list):
            return self._create_many(request, *args, **kwargs)
        return self._create_one(request, *args, **kwargs)

    # quise fantasmear con lo de las imagenes pero pincho fuerte
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
    parser_classes = [MultiPartParser, JSONParser]

    def create(self, request, *args, **kwargs):
        # Procesar datos del formulario
        data = request.data.dict() if hasattr(request.data, 'dict') else request.data.copy()
        
        # Extraer sizes_stock
        sizes_stock = []
        i = 0
        while f'sizes_stock[{i}]size' in data:
            sizes_stock.append({
                'size': data.pop(f'sizes_stock[{i}]size'),
                'stock': data.pop(f'sizes_stock[{i}]stock')
            })
            i += 1
        
        # Crear el producto primero
        product_serializer = self.get_serializer(data=data)
        product_serializer.is_valid(raise_exception=True)
        product = product_serializer.save()
        
        # Procesar imágenes y asociarlas al producto
        images = []
        i = 0
        while f'images[{i}]image' in request.data:
            image_data = {'image': request.data[f'images[{i}]image']}
            image_serializer = ProductImageSerializer(data=image_data)
            image_serializer.is_valid(raise_exception=True)
            image = image_serializer.save()
            images.append(image)
            i += 1
        
        # Asociar las imágenes al producto usando la relación many-to-many
        product.images.add(*images)
        
        # Crear stock por talla
        for stock_data in sizes_stock:
            ProductSizeStock.objects.create(
                product=product,
                size_id=stock_data['size'], 
                stock=stock_data['stock']
            )
        
        # Obtener el producto con todas sus relaciones actualizadas
        product = Product.objects.get(id=product.id)
        serializer = self.get_serializer(product)
        
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)