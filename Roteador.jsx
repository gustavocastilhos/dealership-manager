import PaginaInicial from "./src/paginas/PaginaInicial/PaginaInicial";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PaginaCadastroCarro from "./src/paginas/PaginaCadastroCarro/PaginaCadastroCarro";



const roteador = createBrowserRouter([
  {
    path: "",
    element: <PaginaInicial />,
  },
  {
    path: "cadastro-carro/:id?",
    element: <PaginaCadastroCarro />,
  },
 
  
]);

function Roteador() {
  return <RouterProvider router={roteador} />;
}

export default Roteador;