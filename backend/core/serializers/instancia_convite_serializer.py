import re
from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import serializers
from backend.core.models import Militantes, Convites


UserModel = get_user_model()


class InstanciaConviteSerializer(serializers.Serializer):
    convite = serializers.CharField()
    militante = serializers.IntegerField()

    def validate_convite(self, value):
        
        try: 
            convite = Convites.objects.get(codigo=value)
            if not convite.valido:
                convite.delete()
                raise serializers.ValidationError(
                        'O convite informado não existe'
                    )
        except Convites.DoesNotExist:
            raise serializers.ValidationError(
                    'O convite informado não existe'
                )
        return value

    def validate_militante(self, value):

        if not Militantes.objects.filter(id=value).exists():
            raise serializers.ValidationError(
                'O militante informado não existe'
            )

        return value
    
    def create(self, validated_data):

        convite = Convites.objects.get(codigo=validated_data['convite'])
        militante = Militantes.objects.get(id=validated_data['militante'])
        if not militante.instancias.filter(id=convite.instancia.id):
            militante.instancias.add(convite.instancia)

        return {
                'militante': validated_data['militante'],
                'convite': validated_data['convite']
        }

