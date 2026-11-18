import { use, useEffect, useState } from "react";
import BotaoCustomizado from "../../componentes/BotaoCustomizado/BotaoCustomizado";
import CampoCustomizado from "../../componentes/CampoCustomizado/CampoCustomizado";
import Principal from "../../componentes/Principal/Principal";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { cadastrarCarroNoLocalStorage, buscarCarrosDoLocalStorage } from "../servicos/clientes.servico";
import { formatarComMascara, formatarPlaca, MASCARA_ANO } from "../../utils/formatarComMascara";
import { validarAnoCarro } from '../../utils/validarAno';

function PaginaCadastroCarro() {
    const navigate = useNavigate();
    const [formcarros, setFormCarros] = useState({
        id: "",
        marca: "",
        modelo: "",
        ano: "",
        cor: "",
        placa: "",
        foto: "",

    });


    const params = useParams();
    useEffect(() => {
        if (params.id) {
            const carros = buscarCarrosDoLocalStorage().find((carro) => carro.id === +params.id);
            if (carros) {
                setFormCarros(carros);
            }
        }
    }, [params.id]);

    function cadastrarCarro() {
        if (!formcarros.marca.trim() || !formcarros.modelo.trim() ) {
            toast.error("Preencha os campos marca e modelo corretamente!");
            return;
        }
        if (!validarAnoCarro(formcarros.ano)) {
            toast.error("Ano inválido! O ano deve estar entre 1900 e o próximo ano.");
            return;
        }
        if (!formcarros.cor.trim()) {
            toast.error("Preencha o campo cor!");
            return;
        }
        if (!formcarros.placa.trim()) {
            toast.error("Preencha o campo placa!");
            return;
        }
        /* if (!formcarros.foto.trim()) {
            toast.error("Adicione uma foto do carro!");
            return;
        } */

        const carro = {
            ...formcarros,
        };
        cadastrarCarroNoLocalStorage(carro);
        toast.success("Carro cadastrado com sucesso!");
        navigate("/lista-carros");
    }

    const titulo = formcarros.id ? "Editar Carro" : "Cadastro de Carro";

    return <Principal titulo={titulo} voltarPara="/">
        <CampoCustomizado
            label="Marca"
            placeholder="Digite a marca do carro"
            value={formcarros.marca}
            onChange={(e) => setFormCarros({ ...formcarros, marca: e.target.value })}
            maxLength={10}
        />
        <CampoCustomizado
            label="Modelo"
            placeholder="Digite o modelo do carro"
            value={formcarros.modelo}
            onChange={(e) => setFormCarros({ ...formcarros, modelo: e.target.value })}
            maxLength={20}
        />
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
            onChange={(e) => setFormCarros({ ...formcarros, cor: e.target.value })}
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
                    }}
                />
            </div>
        )}

        <BotaoCustomizado tipo="primario" aoClicar={cadastrarCarro}>
            Cadastrar
        </BotaoCustomizado>
    </Principal>
}


export default PaginaCadastroCarro;