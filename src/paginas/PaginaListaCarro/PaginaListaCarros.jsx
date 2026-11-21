import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/principal/principal";
import { buscarCarrosDoLocalStorage } from "../servicos/carros.servico";
import { salvarNoLocalStorage } from "../servicos/localstorage.servico";
import "./PaginaListaCarros.css";

function PaginaListaCarros() {
  const navigate = useNavigate();
  const [carros, setCarros] = useState(buscarCarrosDoLocalStorage());
  const [filtro, setFiltro] = useState("");

  const excluirCarro = (carro) => {
    const identificacao = `${carro.marca} ${carro.modelo}`.trim() || carro.placa;
    if (window.confirm(`Deseja realmente excluir o carro ${identificacao}?`)) {
      const carrosAtualizados = carros.filter((item) => item.id !== carro.id);
      setCarros(carrosAtualizados);
      salvarNoLocalStorage("carros", carrosAtualizados);
      toast.success("Carro removido com sucesso!");
    }
  };

  const editarCarro = (carro) => {
    navigate(`/cadastro-carro/${carro.id}`);
  };

  const filtroNormalizado = filtro.trim().toLowerCase();
  const carrosFiltrados = carros.filter((carro) =>
    [carro.marca, carro.modelo, carro.ano, carro.cor, carro.placa]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()
      .includes(filtroNormalizado),
  );

  return (
    <Principal titulo="Estoque de Carros" voltarPara="/">
      <CampoCustomizado
        type="search"
        label="Buscar Carro"
        placeholder="Digite marca, modelo ou placa"
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />

      {carrosFiltrados.length > 0 ? (
        carrosFiltrados.map((carro) => (
          <div className="PaginaListaCarros_item" key={carro.id}>
            {carro.foto && (
              <img
                className="PaginaListaCarros_foto"
                src={carro.foto}
                alt={`${carro.marca} ${carro.modelo}`}
              />
            )}
            <div className="PaginaListaCarros_detalhes">
              <h3>{carro.marca} {carro.modelo}</h3>
              <h4>{carro.ano} · {carro.cor}</h4>
              <p>Placa: {carro.placa}</p>
            </div>

            <div className="PaginaListaCarros_acoes">
              <button
                type="button"
                aria-label={`Editar ${carro.marca} ${carro.modelo}`}
                onClick={() => editarCarro(carro)}
              >
                <FaPencilAlt size={17} />
              </button>
              <button
                type="button"
                aria-label={`Excluir ${carro.marca} ${carro.modelo}`}
                onClick={() => excluirCarro(carro)}
              >
                <FaTrashAlt size={17} color="red" />
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="PaginaListaCarros_vazio">
          {filtroNormalizado
            ? "Nenhum carro encontrado para essa busca."
            : "Nenhum carro cadastrado no estoque."}
        </p>
      )}

      <button
        className="PaginaListaCarros_adicionar"
        type="button"
        aria-label="Adicionar carro"
        onClick={() => navigate("/cadastro-carro")}
      >
        <IoMdAddCircle size={32} />
      </button>
    </Principal>
  );
}

export default PaginaListaCarros;
