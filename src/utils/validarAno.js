
export const validarAnoCarro = (ano) => {
    // Se estiver vazio, não há o que validar ainda
    if (!ano) return true;

    // Transforma a string em número para fazer as comparações matemáticas
    const anoNumero = parseInt(ano);
    
    // O ano não pode ser maior que o ano atual + 1 (ano modelo)
    const anoMaximo = new Date().getFullYear() + 1;
    // Defina o ano mínimo aceito pela sua regra de negócio
    const anoMinimo = 1900; 

    if (anoNumero > anoMaximo || anoNumero < anoMinimo) {
        return false;
    }
    
    return true;
};