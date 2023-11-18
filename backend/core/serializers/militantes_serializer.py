from rest_framework import serializers
from backend.core.models import Militantes



class MilitantesSerializer(serializers.ModelSerializer):

    isUser = serializers.SerializerMethodField(read_only=True)

    def get_isUser(self, obj):
        return obj.usuario != None
    
    class Meta:
        model = Militantes
        fields = '__all__'