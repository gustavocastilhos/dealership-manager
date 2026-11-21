import "./BotaoCustomizado.css";

function BotaoCustomizado(props) {
  const classes = ["BotaoCustomizado_root"];

  switch (props.tipo) {
    case "card":
      classes.push("BotaoCustomizado_card");
      break;
    case "submit":
      classes.push("BotaoCustomizado_submit");
      break;
    default:
      break;
  }

  return (
    <button
      type={props.tipo === "submit" ? "submit" : "button"}
      className={classes.join(" ")}
      onClick={props.aoClicar}
    >
      {props.children}
    </button>
  );
}

export default BotaoCustomizado;
