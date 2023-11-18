import re
from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import serializers
from backend.core.models import Militantes, Instancias, Secretariados, Funcoes




class InstanciaSecretarioCadastraSerializer(serializers.Serializer):
    instancia = serializers.IntegerField()
    militante = serializers.IntegerField()
    funcao = serializers.CharField()

    def validate_funcao(self, value):
        if not Funcoes.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe a função informada.'
            )

        return value
        
    def validate_instancia(self, value):
        if not Instancias.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe a instancia informada.'
            )

        return value
    
    def validate_militante(self, value):
        if not Militantes.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe o militante informado.'
            )

        return value
    
    def validate(self, data):
        if not Militantes.objects.get(id=data['militante']).instancias.filter(id=data['instancia']).exists():
            raise serializers.ValidationError(
                'Esse militante não pertence a essa instancia.'
            )
        
        if Secretariados.objects.filter(militante=data['militante'],instancia=data['instancia']).exists():
            raise serializers.ValidationError(
                'Esse militante já é secretário dessa instancia.'
            )

        return data

        
    def create(self, validated_data):
        militante = Militantes.objects.get(id=validated_data['militante'])
        instancia = Instancias.objects.get(id=validated_data['instancia'])
        funcao = Funcoes.objects.get(id=validated_data['funcao'])

        secretario = Secretariados()
        secretario.militante = militante
        secretario.funcao = funcao
        secretario.instancia = instancia
        secretario.save()

        return {
                'instancia': validated_data['instancia'],
                'militante': validated_data['militante'],
                'funcao': validated_data['funcao'],
        }
