import { useState } from "preact/hooks";
import { usePokemonBatch } from "../hooks/usePokemonBatch";
import { areCompatible } from "../util/areCompatible";
import { capitalize } from "../util/capitalize";
import { useDebouncedValue } from "../hooks/debounce";

const NUM_POKEMON = 9;

export default function BreedingChecker() {
  const [names, setNames] = useState(Array(NUM_POKEMON).fill(""));
  
  const debouncedNames = useDebouncedValue(names, 300);
  const filteredNames = debouncedNames.map(name => name.toLowerCase().trim());

  const pokemon = usePokemonBatch(filteredNames);
  
  const onNameChange = (idx, val) => {
    const newNames = [...names];
    newNames[idx] = val;
    setNames(newNames);
  };

  const displayName = (mon, idx) => mon ? capitalize(mon.name) : `#${idx + 1}`;

  return (
    <div>
      <br />
      <div>
        {names.map((name, i) => (
          <input key={i} 
          placeholder={`Pokemon ${i + 1}`}
          value={names[i]}
          onInput={e => onNameChange(i, e.target.value)}
          />
        ))}
      </div>
      
      <h3>Compatibility Table</h3>
      <table>
        <thead>
          <tr>
            <th></th>
            {pokemon.map((p, i) => (
              <th key={`head-${i}`}>{displayName(p, i)}<img src={p?.img} alt={p?.name} width="50"></img></th>
            ))}
          </tr>
        </thead>
        <tbody>
          {pokemon.map((p1, i) => (
            <tr key={`row-${i}`}>
              <th>{displayName(p1, i)}<img src={p1?.img} alt={p1?.name} width="50"></img></th>
              {pokemon.map((p2, j) => {
                if (!p1 || !p2) {
                  return <td key={`cell-${i}-${j}`}>—</td>;
                }
                const compatible = areCompatible(p1, p2);
                return (
                  <td key={`cell-${i}-${j}`} style={{ textAlign: "center" }}>
                    {compatible ? "✅" : "❌"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
