const BASE_URL = 'https://parallelum.com.br/fipe/api/v1/carros';

// Função para buscar todas as marcas de carros
export const buscarMarcas = async () => {
    try {
        const response = await fetch(`${BASE_URL}/marcas`);
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Erro ao buscar marcas:", error);
        return [];
    }
};

// Função para buscar os modelos de uma marca específica
export const buscarModelos = async (codigoMarca) => {
    try {
        const response = await fetch(`${BASE_URL}/marcas/${codigoMarca}/modelos`);
        const data = await response.json();
        return data.modelos; 
    } catch (error) {
        console.error("Erro ao buscar modelos:", error);
        return [];
    }
};