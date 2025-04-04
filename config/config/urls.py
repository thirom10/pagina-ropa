from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import *
from api.views import *

# este es un router que viene de la libreria de rest framework y sirve para directamente ver todo lo que haya en views en /api/
router = DefaultRouter()
router.register(r'genres', GenreViewSet)
router.register(r'band-members', BandMemberViewSet)
router.register(r'sizes', SizeViewSet)
router.register(r'band-images', BandImageViewSet)
router.register(r'product-images', ProductImageViewSet)
router.register(r'product-size-stocks', ProductSizeStockViewSet)
router.register(r'bands', BandViewSet)
router.register(r'products', ProductViewSet)

# el token no funciona :v
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/', include(router.urls)),
]