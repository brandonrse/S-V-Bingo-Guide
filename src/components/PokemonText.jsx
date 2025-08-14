import { usePokemon } from "../hooks/usePokemon";
import { usePokemonBatch } from "../hooks/usePokemonBatch";
import { capitalize } from "../util/capitalize"
import "./PokemonText.css";

export function PokemonText({ name, displayName = undefined }) {
  const entries = usePokemonBatch(name ? [name.toLowerCase()] : []);
  const entry = entries?.length > 0 ? entries[0] : null;
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