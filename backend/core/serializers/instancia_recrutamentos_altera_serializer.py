import re
from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import serializers
from backend.core.models import Recrutamentos, Instancias




class InstanciaRecrutamentosAlteraSerializer(serializers.Serializer):
    instancia = serializers.IntegerField()
    recrutamento = serializers.IntegerField()
    status = serializers.IntegerField()
    nome = serializers.CharField()
    telefone = serializers.CharField()
    sindicalizado = serializers.BooleanField()
    email = serializers.CharField(allow_blank=True)
    uf_mora = serializers.CharField(allow_blank=True)
    cidade_mora = serializers.CharField(allow_blank=True)
    categoria = serializers.CharField(allow_blank=True)
    sindicato = serializers.CharField(allow_blank=True)
    atuacao = serializers.CharField(allow_blank=True)
    vinculo_trabalhista = serializers.CharField(allow_blank=True)
    tipo_trabalho = serializers.CharField(allow_blank=True)

       
    def validate_instancia(self, value):
        if not Instancias.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe a instancia informada.'
            )

        return value
    
    def validate_recrutamento(self, value):
        if not Recrutamentos.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe o recrutamento informada.'
            )

        return value
    
    def validate_telefone(self, value):
        telefone = self.formata_telefone(value)
        try:
            int(telefone)
            return value
        except:
            raise serializers.ValidationError(
                'Telefone invalido digite apenas numeros sem espaços e caracteres especiais. Ex: 5521987654321.'
            )

    
    def formata_telefone(self, telefone:str):
        remover = ['(',')','-',' ','+','.']
        telefone_formatado = telefone
        for caracter in remover:
            telefone_formatado = telefone_formatado.replace(caracter,'')
        return telefone_formatado
    
    def create(self, validated_data):
        recrutamento = Recrutamentos.objects.get(id=validated_data['recrutamento'], instancia_recrutando_id=validated_data['instancia'])
        recrutamento.status = validated_data['status']
        recrutamento.nome = validated_data['nome']
        recrutamento.telefone = validated_data['telefone']
        recrutamento.sindicalizado = validated_data['sindicalizado']
        recrutamento.email = validated_data['email']
        recrutamento.uf_mora = validated_data['uf_mora']
        recrutamento.cidade_mora = validated_data['cidade_mora']
        recrutamento.categoria = validated_data['categoria']
        recrutamento.sindicato = validated_data['sindicato']
        recrutamento.atuacao = validated_data['atuacao']
        recrutamento.vinculo_trabalhista = validated_data['vinculo_trabalhista']
        recrutamento.tipo_trabalho = validated_data['tipo_trabalho']
        recrutamento.save()
        
        return {
                'instancia': validated_data['instancia'],
                'recrutamento': validated_data['recrutamento'],
                'nome': validated_data['nome'],
                'telefone': validated_data['telefone'],
                'sindicalizado': validated_data['sindicalizado'],
                'email': validated_data['email'],
                'uf_mora': validated_data['uf_mora'],
                'cidade_mora': validated_data['cidade_mora'],
                'categoria': validated_data['categoria'],
                'sindicato': validated_data['sindicato'],
                'atuacao': validated_data['atuacao'],
                'vinculo_trabalhista': validated_data['vinculo_trabalhista'],
                'tipo_trabalho': validated_data['tipo_trabalho'],

        }
