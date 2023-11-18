import re
from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import serializers
from backend.core.models import Militantes, Organizacoes, Instancias, Funcoes, Secretariados




class FuncoesVinculaSerializer(serializers.Serializer):
    organizacao = serializers.IntegerField()
    instancia = serializers.IntegerField()
    militante = serializers.IntegerField()
    funcao = serializers.CharField()

    def validate_funcao(self, value):
        if not Funcoes.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe a função informada.'
            )

        return value
    
    def validate_organizacao(self, value):
        if not Organizacoes.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe a organização informada.'
            )

        return value
    
    def validate_militante(self, value):
        if not Militantes.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe o militante informado.'
            )

        return value
    
    def validate(self, data):

        if not Instancias.objects.filter(id=data['instancia'], organizacao__id=data['organizacao']).exists():
            raise serializers.ValidationError(
                'Não existe a instancia informada.'
            )
        
        if not Funcoes.objects.filter(id=data['funcao'], organizacao__id=data['organizacao']).exists():
            raise serializers.ValidationError(
                'Não existe a função informada.'
            )
        
        if Secretariados.objects.filter(militante__id=data['militante'], funcao__id=data['funcao'], instancia__id=data['instancia']).exists():
            raise serializers.ValidationError(
                'Este Militante já tem essa função nesta instancia.'
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
                'organizacao': validated_data['organizacao'],
                'instancia': validated_data['instancia'],
                'militante': validated_data['militante'],
                'funcao': validated_data['funcao'],
        }

