from rest_framework import serializers
from backend.core.models import Recrutamentos



class RecrutamentosSerializer(serializers.ModelSerializer):

    status_texto  = serializers.SerializerMethodField(read_only=True)

    def get_status_texto(self, obj):
        return obj.get_status_display()
    
    class Meta:
        model = Recrutamentos
        fields = '__all__'