import re
from django.contrib.auth import get_user_model  # If used custom user model
from rest_framework import serializers
from backend.core.models import Militantes


UserModel = get_user_model()


class UserRegisterSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    email = serializers.EmailField()
    senha = serializers.CharField(write_only=True)
    senha2 = serializers.CharField(write_only=True)


    def validate_email(self, value):
        
        if  UserModel.objects.filter(email=value).exists():
            raise serializers.ValidationError(
                'Já existe um usuario com esse e-mail.'
            )

        return value

    def validate_senha(self, value):
        validate = True

        if len(value) < 8:
            validate = False
        elif not re.search(r'[a-zA-Z]', value):
            validate = False
        elif not re.search(r'[0-9]', value):
            validate = False

        if not validate:
            raise serializers.ValidationError(
                'A senha é muito fraca. A senha precisa ter 8 caracteres ou mais, letras e numeros.'
            )

        return value

    def validate(self, data):
        """
        Check that start is before finish.
        """
        if data['senha'] != data['senha2']:
            raise serializers.ValidationError("As senhas não conferem")
        return data
    
    def create(self, validated_data):

        user = UserModel.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=validated_data['senha'],
        )
       
        user.save()
        militante = Militantes()
        militante.apelido = validated_data['email']
        militante.codigo_unico = '-'
        militante.usuario = user
        militante.save()

        return {
                'id': user.id,
                'email':user.email
        }

