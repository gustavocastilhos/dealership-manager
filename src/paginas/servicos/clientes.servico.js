import { buscarNoLocalStorage, salvarNoLocalStorage } from "./localstorage.servico"

export const cadastrarCarroNoLocalStorage = (carro) => {
 const carros = buscarNoLocalStorage("carros") || [];
if (!carro.id) {
    carro.id = Date.now();
    carros.push(carro);
}else {
    const index = carros.findIndex((c) => c.id === carro.id);
      carros[index] = carro;
    
}
salvarNoLocalStorage("carros", carros);
}

export const buscarCarrosDoLocalStorage = () => {
  return buscarNoLocalStorage("carros") || [];
}