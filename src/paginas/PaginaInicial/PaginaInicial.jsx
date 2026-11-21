import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import Principal from "../../componentes/principal/principal";
import { useNavigate } from "react-router-dom";
import { FaCar } from "react-icons/fa";
import { GiHomeGarage } from "react-icons/gi";
import { TbReportSearch } from "react-icons/tb";
import { BsGraphUpArrow } from "react-icons/bs";




// Se criar um ficheiro CSS específico para esta página, importe-o aqui:
// import "./PaginaInicial.css";

function PaginaInicial() {
  const navigate = useNavigate();

  return (
    <Principal titulo="Página Inicial">

      <h3 className="titulo-secao">Ações rapidas</h3>

      <div className="grid-botoes">

        <BotaoCustomizado
          tipo="primario"
          aoClicar={() => navigate("/cadastro-carro")} /* Ajuste esta rota para a correta */
        >
          <FaCar />
          <span>Adicionar Veículo</span>
        </BotaoCustomizado>

        <BotaoCustomizado
          tipo="secundario"
          aoClicar={() => navigate("/lista-carros")}
        >
          <GiHomeGarage />
          <span>Gerenciar estoque</span>
        </BotaoCustomizado>

        <BotaoCustomizado
          tipo="primario"
          aoClicar={() => navigate("/ver-cliente")} /* Ajuste esta rota para a correta */
        >
          <TbReportSearch />
          <span>Historico de vendas</span>
        </BotaoCustomizado>

        <BotaoCustomizado
          tipo="secundario"
          aoClicar={() => navigate("/agendar-servico")} /* Ajuste esta rota para a correta */
        >
          <BsGraphUpArrow />
          <span>Financeiro</span>
        </BotaoCustomizado>

      </div>
    </Principal>
  );
}

export default PaginaInicial;