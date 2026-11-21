
export const validarAnoCarro = (ano) => {
    if (!/^\d{4}$/.test(ano)) return false;

    const anoNumero = Number(ano);
    const anoMaximo = new Date().getFullYear() + 1;
    const anoMinimo = 1900;

    return anoNumero >= anoMinimo && anoNumero <= anoMaximo;
};