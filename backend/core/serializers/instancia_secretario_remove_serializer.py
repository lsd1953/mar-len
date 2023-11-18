import re
from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import serializers
from backend.core.models import Militantes, Instancias, Secretariados




class InstanciaSecretarioRemoveSerializer(serializers.Serializer):
    instancia = serializers.IntegerField()
    secretario = serializers.IntegerField()


        
    def validate_instancia(self, value):
        if not Instancias.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe a instancia informada.'
            )

        return value
    
    def validate_secretario(self, value):
        if not Militantes.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe o militante informado.'
            )

        return value
    
    def validate(self, data):
        if not Secretariados.objects.filter(militante=data['secretario'],instancia=data['instancia']).exists():
            raise serializers.ValidationError(
                'Esse militante não é secretário nessa instancia.'
            )

        return data
        
    def create(self, validated_data):
        secretaio = Secretariados.objects.get(militante=validated_data['secretario'],instancia=validated_data['instancia'])
        secretaio.delete()

        return {
                'secretario': validated_data['secretario'],
                'instancia': validated_data['instancia'],
        }

