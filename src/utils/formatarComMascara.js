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
    // Remove tudo o que não for letra de A a Z ou número, e transforma em maiúscula
    let valorFormatado = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    
    return valorFormatado.slice(0, 7); 
};

export const MASCARA_ANO = "####";


