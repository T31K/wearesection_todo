from rest_framework import viewsets

from .serializers import ListSerializer
from .models import List


class ListViewSet(viewsets.ModelViewSet):
    queryset = List.objects.all().order_by('list')
    serializer_class = ListSerializer