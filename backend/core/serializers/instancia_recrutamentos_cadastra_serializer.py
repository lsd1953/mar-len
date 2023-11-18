import re
from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import serializers
from backend.core.models import Recrutamentos, Instancias




class InstanciaRecrutamentosCadastraSerializer(serializers.Serializer):
    instancia = serializers.IntegerField()
    nome = serializers.CharField()
    telefone = serializers.CharField()
    data = serializers.DateField()
    email = serializers.CharField(allow_blank=True)
    ufMora = serializers.CharField(allow_blank=True)
    cidadeMora = serializers.CharField(allow_blank=True)
    origemRecrutamento = serializers.CharField(allow_blank=True)
    
       
    def validate_instancia(self, value):
        if not Instancias.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'Não existe a instancia informada.'
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
        instancia = Instancias.objects.get(id=validated_data['instancia'])
        recrutamento = Recrutamentos()

        recrutamento.instancia_cadastro = instancia
        recrutamento.instancia_recrutando = instancia
        recrutamento.nome = validated_data['nome']
        recrutamento.telefone = self.formata_telefone(validated_data['telefone'])
        recrutamento.data = validated_data['data']
        recrutamento.email = validated_data['email']
        recrutamento.uf_mora = validated_data['ufMora'].upper()
        recrutamento.cidade_mora = validated_data['cidadeMora'].upper()
        recrutamento.origem = validated_data['origemRecrutamento']
        recrutamento.save()

        return {
                'instancia': validated_data['instancia'],
                'nome': validated_data['nome'],
                'telefone': validated_data['telefone'],
                'data': validated_data['data'],
                'email': validated_data['email'],
                'ufMora': validated_data['ufMora'],
                'cidadeMora': validated_data['cidadeMora'],
                'origemRecrutamento': validated_data['origemRecrutamento'],

        }
