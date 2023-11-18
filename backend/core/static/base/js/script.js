function copiarTexto(text) {
    var textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    textArea.setSelectionRange(0, 99999)
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("Texto Copiado");
}