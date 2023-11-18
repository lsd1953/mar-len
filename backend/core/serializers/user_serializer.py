import re
from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import serializers
from backend.core.models import Militantes, Administradores


UserModel = get_user_model()


class UserSerializer(serializers.ModelSerializer):

    administrador = serializers.SerializerMethodField()
    militante_codigo = serializers.SerializerMethodField()
    militante_id = serializers.SerializerMethodField()

    def get_administrador(self, obj):
        return Administradores.objects.filter(usuario=obj).exists()
    
    def get_militante_codigo(self, obj):
        try:
            militante = Militantes.objects.get(usuario=obj)
            return militante.codigo_unico
        except Militantes.DoesNotExist:
            return ''
        
    def get_militante_id(self, obj):
        try:
            militante = Militantes.objects.get(usuario=obj)
            return militante.id
        except Militantes.DoesNotExist:
            return None
        
    class Meta:
        model = UserModel
        fields = ['id', 'email', 'administrador', 'militante_codigo', 'militante_id']