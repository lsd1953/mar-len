import re
from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import serializers
from backend.core.models import Militantes, Instancias




class InstanciaMilitanteCadastraSerializer(serializers.Serializer):
    instancia = serializers.IntegerField()
    apelido = serializers.CharField()


        
    def validate_instancia(self, value):
        if not Instancias.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe a instancia informada.'
            )

        return value
    
    def create(self, validated_data):
        instancia = Instancias.objects.get(id=validated_data['instancia'])
        militante = Militantes()
        militante.apelido = validated_data['apelido']
        militante.save()
        militante.instancias.add(instancia)

        return {
                'apelido': validated_data['apelido'],
                'instancia': validated_data['instancia'],
        }

