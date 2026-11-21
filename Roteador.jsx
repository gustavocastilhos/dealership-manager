import PaginaInicial from "./src/paginas/PaginaInicial/PaginaInicial";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PaginaCadastroCarro from "./src/paginas/PaginaCadastroCarro/PaginaCadastroCarro";
import PaginaListaCarros from "./src/paginas/PaginaListaCarro/PaginaListaCarros";



const roteador = createBrowserRouter([
  {
    path: "",
    element: <PaginaInicial />,
  },
  {
    path: "cadastro-carro/:id?",
    element: <PaginaCadastroCarro />,
  },
  {
    path: "lista-carros",
    element: <PaginaListaCarros />,
  },
]);

function Roteador() {
  return <RouterProvider router={roteador} />;
}

export default Roteador;