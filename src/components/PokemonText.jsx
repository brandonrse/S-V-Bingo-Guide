import { usePokemon } from "../hooks/usePokemon";
import { capitalize } from "../util/capitalize"
import "./PokemonText.css";

export function PokemonText({ name, displayName = undefined }) {
  const entry = usePokemon(name);

  return (
    <span className="PokemonText">
      {displayName ?? name}
      <div className="PokemonHint">
        <img src={entry?.img} />
        <div className="Types">
          {entry?.types.map((type) => (
            <Type type={type} />
          ))}
        </div>
      </div>
    </span>
  );
}

function Type({ type }) {
  return (
    <div className={`Type ${type}`}>{capitalize(type)}</div>
  )  
}