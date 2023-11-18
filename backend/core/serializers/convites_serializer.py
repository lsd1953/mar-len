from rest_framework import serializers
from backend.core.models import Convites



class ConvitesSerializer(serializers.ModelSerializer):

    expira = serializers.SerializerMethodField()

    def get_expira(self, obj):
        return obj.expira

    class Meta:
        model = Convites
        fields = '__all__'