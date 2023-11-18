from rest_framework import serializers
from backend.core.models import Instancias, Assistentes



class InstanciasSerializer(serializers.ModelSerializer):

    organizacao_sigla = serializers.SerializerMethodField(read_only=True)
    militantes = serializers.SerializerMethodField(read_only=True)
    organizacao_id = serializers.SerializerMethodField(read_only=True)
    organizacao_contribuicao = serializers.SerializerMethodField(read_only=True)
    codigo = serializers.SerializerMethodField(read_only=True)
    assistencias = serializers.SerializerMethodField(read_only=True)

    def get_organizacao_contribuicao(self, obj):
        if obj.organizacao:
            return obj.organizacao.constribuicao
        else:
            return None
    
    def get_assistencias(self, obj):
        assistentes = ''
        busca_assistetentes = Assistentes.objects.filter(instancia=obj)
        for assistente in busca_assistetentes:
            if assistentes != '':
                assistentes += ' / '
            assistentes += assistente.militante.apelido
        return assistentes
    
    def get_militantes(self, obj):
        return obj.militantes.count()
    
    def get_codigo(self, obj):
        return f'{obj.id:06d}'
        

    def get_organizacao_id(self, obj):
        if obj.organizacao:
            return obj.organizacao.id
        else:
            return None
    
    def get_organizacao_sigla(self, obj):
        if obj.organizacao:
            return obj.organizacao.sigla
        else:
            return None
        

    class Meta:
        model = Instancias
        fields = '__all__'
