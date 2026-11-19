import { useEffect, useState } from "react";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/principal/principal";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { cadastrarCarroNoLocalStorage, buscarCarrosDoLocalStorage } from "../servicos/clientes.servico";
import { formatarComMascara, formatarPlaca, MASCARA_ANO, validarPlaca, formatarCor } from "../../utils/formatarComMascara";
import { validarAnoCarro } from '../../utils/validarAno';
import { buscarMarcas, buscarModelos } from '../servicos/apiCarros';

function PaginaCadastroCarro() {
    const navigate = useNavigate();
    const params = useParams();

    const [formcarros, setFormCarros] = useState({
        id: "",
        marca: "",
        modelo: "",
        ano: "",
        cor: "",
        placa: "",
        foto: "",
    });

    const [listaMarcas, setListaMarcas] = useState([]);
    const [listaModelos, setListaModelos] = useState([]);
    const [marcaSelecionada, setMarcaSelecionada] = useState("");

    useEffect(() => {
        if (params.id) {
            const carros = buscarCarrosDoLocalStorage().find((carro) => carro.id === +params.id);
            if (carros) {
                setFormCarros(carros);
            }
        }
    }, [params.id]);

    useEffect(() => {
        const carregarMarcas = async () => {
            const marcas = await buscarMarcas();
            setListaMarcas(marcas);
        };
        carregarMarcas();
    }, []);

    useEffect(() => {
        const carregarModelos = async () => {
            if (marcaSelecionada) {
                const modelos = await buscarModelos(marcaSelecionada);
                setListaModelos(modelos);
            } else {
                setListaModelos([]);
            }
        };
        carregarModelos();
    }, [marcaSelecionada]);


    function cadastrarCarro() {
        if (!formcarros.marca.trim() || !formcarros.modelo.trim()) {
            toast.error("Preencha os campos marca e modelo corretamente!");
            return;
        }
        if (!validarAnoCarro(formcarros.ano)) {
            toast.error("Ano inválido! Digite um ano válido.");
            return;
        }
        if (!formcarros.cor.trim()) {
            toast.error("Preencha o campo cor!");
            return;
        }
        if (!formcarros.placa.trim()) {
            toast.error("Preencha o campo placa corretamente!");
            return;
        }
        // NOVA TRAVA COM A FUNÇÃO IMPORTADA
        if (!validarPlaca(formcarros.placa)) {
            toast.error("Digite a placa completa (ex: ABC-1234 ou ABC-1D23)!");
            return;
        }

        const carro = {
            ...formcarros,
        };
        cadastrarCarroNoLocalStorage(carro);
        toast.success("Carro cadastrado com sucesso!");
        navigate("/lista-carros");
    }

    const titulo = formcarros.id ? "Editar Carro" : "Cadastro de Carro";

    return (
        <Principal titulo={titulo} voltarPara="/">

            {/* CAMPO MARCA COM DATALIST */}
            <div style={{ position: 'relative' }}>
                <CampoCustomizado
                    label="Marca"
                    placeholder="Digite a marca do carro"
                    value={formcarros.marca}
                    list="lista-marcas" // Conecta o input com o datalist abaixo
                    onChange={(e) => {
                        const nomeDigitado = e.target.value;
                        setFormCarros({ ...formcarros, marca: nomeDigitado, modelo: "" }); // Reseta o modelo ao trocar a marca

                        // Descobre o código da marca digitada para buscar os modelos na API
                        const marcaEncontrada = listaMarcas.find(m => m.nome === nomeDigitado);
                        if (marcaEncontrada) {
                            setMarcaSelecionada(marcaEncontrada.codigo);
                        } else {
                            setMarcaSelecionada("");
                        }
                    }}
                    maxLength={30}
                />
                <datalist id="lista-marcas">
                    {listaMarcas.map((marca) => (
                        <option key={marca.codigo} value={marca.nome} />
                    ))}
                </datalist>
            </div>

            {/* CAMPO MODELO COM DATALIST */}
            <div style={{ position: 'relative' }}>
                <CampoCustomizado
                    label="Modelo"
                    placeholder="Digite o modelo do carro"
                    value={formcarros.modelo}
                    list="lista-modelos" // Conecta o input com o datalist de modelos
                    onChange={(e) => setFormCarros({ ...formcarros, modelo: e.target.value })}
                    maxLength={40}
                />
                <datalist id="lista-modelos">
                    {listaModelos.map((modelo) => (
                        <option key={modelo.codigo} value={modelo.nome} />
                    ))}
                </datalist>
            </div>

            <CampoCustomizado
                label="Ano"
                placeholder="Digite o ano do carro"
                value={formcarros.ano}
                onChange={(e) => setFormCarros({ ...formcarros, ano: formatarComMascara(e.target.value, MASCARA_ANO) })}
                maxLength={4}
            />
            <CampoCustomizado
                label="Cor"
                placeholder="Digite a cor do carro"
                value={formcarros.cor}
                onChange={(e) => setFormCarros({ ...formcarros, cor: formatarCor(e.target.value) })}
                maxLength={15}
            />
            <CampoCustomizado
                label="Placa"
                placeholder="Digite a placa do carro"
                value={formcarros.placa}
                onChange={(e) => setFormCarros({ ...formcarros, placa: formatarPlaca(e.target.value) })}
                maxLength={8}
            />
            <CampoCustomizado
                type="file"
                accept="image/*"
                label="Foto"
                onChange={(e) => {
                    const imagem = e.target.files[0];
                    if (imagem) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            setFormCarros({ ...formcarros, foto: event.target.result });
                        };
                        reader.readAsDataURL(imagem);
                    }
                }}
            />

            {formcarros.foto && (
                <div>
                    <img
                        src={formcarros.foto}
                        alt="Foto do Carro"
                        style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            marginTop: "10px"
                        }}
                    />
                </div>
            )}

            <BotaoCustomizado tipo="primario" aoClicar={cadastrarCarro}>
                Cadastrar
            </BotaoCustomizado>
        </Principal>
    );
}

export default PaginaCadastroCarro;