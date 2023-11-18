from cryptography.hazmat.backends import default_backend
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.asymmetric import rsa
from cryptography.hazmat.primitives import serialization


def gerar_chave_privada():
    return rsa.generate_private_key(
        public_exponent=65537,
        key_size=2048,
        backend=default_backend()
    )

def gerar_chave_publica(chave_privada):
    return chave_privada.public_key()

def criptografar(chave_publica, texto):
    return chave_publica.encrypt(
                texto.encode('utf-8'),
                padding.OAEP(
                    mgf=padding.MGF1(algorithm=hashes.SHA1()),
                    algorithm=hashes.SHA1(),
                    label=None
                )
            )

def descriptografar(chave_privada, texto_cifrado):

    return chave_privada.decrypt(
                texto_cifrado,
                padding.OAEP(
                    mgf=padding.MGF1(algorithm=hashes.SHA1()),
                    algorithm=hashes.SHA1(),
                    label=None
                )
            )

def gerar_binario_de_chave(chave, tipo):

    if tipo == 'privada':
        return chave.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption(),
    )
    else:
        return chave.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PublicFormat.PKCS8,
        encryption_algorithm=serialization.NoEncryption(),
    )
def gerar_chave_de_binario(binario, tipo):
    if tipo == 'privada':
        return serialization.load_pem_private_key(
            binario, password=None, backend=default_backend())
    else:
        return serialization.load_der_public_key(
            binario, password=None, backend=default_backend())