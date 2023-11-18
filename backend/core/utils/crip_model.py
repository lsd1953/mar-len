import base64
import hashlib
import random
import string
from cryptography.fernet import Fernet
from django.conf import settings
from django.utils.translation import gettext_lazy as _


class CripModel:

    @property
    def chave(self):
        if '__chave' in dir(self):
            return self.__chave
        else:
            #Todo: Desecriptar a chave privada dele com a senha de usuario e usar a chave privada pede para desecriptar a chave padrão dele.
            # chave privada e publica já é criada em marlen.core.utils.criptografia é necessario implementar
            # no militante
            # também é necessario adicionar dados 
            self.__chave = self.decrypt(self.c_chave, chave=settings.SECRET_KEY)
            return self.__chave


    def decrypt(self, texto, chave=''):
        if chave != '':
            c = self._key_generator(chave)
            decrypt = Fernet(c).decrypt
        else:
            minha_chave = self.chave
            c = self._key_generator(minha_chave)
            decrypt = Fernet(c).decrypt

        if texto:
            return decrypt(texto.encode('utf-8')).decode() if texto else ''

    def _cript(self, texto, chave=''):
        if chave != '':
            c = self._key_generator(chave)
            encrypt = Fernet(c).encrypt
        else:
            minha_chave = self.chave
            c = self._key_generator(minha_chave)
            encrypt = Fernet(c).encrypt

        return encrypt(texto.encode('utf-8')).decode()

    def _key_generator(self, key):
        has = hashlib.md5(key.encode('utf-8')).hexdigest().encode('utf-8')
        return base64.urlsafe_b64encode(has)

    def _string_aleatoria(self, tamanho:int=20):
        letras = string.hexdigits
        return ''.join(random.choice(letras) for i in range(tamanho))
