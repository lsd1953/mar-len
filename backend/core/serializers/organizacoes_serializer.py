from rest_framework import serializers
from backend.core.models import Organizacoes



class OrganizacoesSerializer(serializers.ModelSerializer):

    class Meta:
        model = Organizacoes
        fields = '__all__'