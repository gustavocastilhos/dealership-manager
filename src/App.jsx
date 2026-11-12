import Roteador from "../Roteador";
import "./App.css";
import Cabecalho from "./componentes/Cabecalho/Cabecalho";
import Rodape from "./componentes/Rodape/Rodape";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Cabecalho />
      <Roteador />
      <Rodape />
      <ToastContainer />

    </>
  );
}

export default App;
