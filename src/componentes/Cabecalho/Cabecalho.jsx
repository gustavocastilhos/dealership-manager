import Avatar from "../Avatar/Avatar";
import "./Cabecalho.css";

function Cabecalho() {
  return (
    <header className="Cabecalho_root">
      <img
        src="carro-icon.png"
        style={{
          width: "37px",
          height: "37px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      />

      <Avatar nome="Gustavo" />
    </header>
  );
}

export default Cabecalho;
