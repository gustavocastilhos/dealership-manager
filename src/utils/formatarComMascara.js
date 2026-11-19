export const formatarComMascara = (value, mask) => {
    if (!value) return "";
    let numericValue = value.replace(/[\D]/g, "");
    let maskedValue = "";
    let valueIndex = 0;
    for (let i = 0; i < mask.length; i++) {
        if (mask[i] === "#") {
            maskedValue += numericValue[valueIndex] || "";
            valueIndex++;
        } else {
            maskedValue += mask[i];
        }
        if (valueIndex >= numericValue.length) break;
    }
    return maskedValue;
};

export const formatarPlaca = (value) => {
    if (!value) return "";

    // 1. Converte para maiúscula e remove tudo que não for alfanumérico
    let formatado = value.toUpperCase().replace(/[^A-Z0-9]/g, "");

    // 2. Separa e força os 3 primeiros caracteres a serem APENAS LETRAS
    let letras = formatado.substring(0, 3).replace(/[^A-Z]/g, "");

    // 3. Pega o restante (até 4 caracteres) que podem ser números ou letras (Mercosul)
    let resto = formatado.substring(3).slice(0, 4);

    // 4. Se já tiver digitado as 3 letras e começar o restante, adiciona o hífen
    if (formatado.length > 3) {
        return `${letras}-${resto}`;
    }

    // Retorna só as letras se o usuário ainda estiver no começo da placa
    return letras;
};

export const validarPlaca = (placa) => {
    if (!placa) return false;
    // Exige exatamente 3 letras, um hífen e 4 caracteres alfanuméricos
    const regexPlaca = /^[A-Z]{3}-[A-Z0-9]{4}$/;
    return regexPlaca.test(placa);
};

export const formatarCor = (value) => {
    if (!value) return "";

    // 1. Remove tudo o que não for letra (incluindo acentos) ou espaço
    let formatado = value.replace(/[^a-zA-ZÀ-ÿ\s]/g, "");

    // 2. Padroniza colocando a primeira letra em maiúscula e o resto em minúscula (ex: "azul" -> "Azul")
    if (formatado.length > 0) {
        formatado = formatado.charAt(0).toUpperCase() + formatado.slice(1).toLowerCase();
    }

    return formatado;
};

export const MASCARA_ANO = "####";


