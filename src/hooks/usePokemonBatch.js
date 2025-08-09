import { useEffect, useRef, useState } from "preact/hooks";

export const usePokemonBatch = (pokemonList) => {
  const [pokedex, setPokedex] = useState({});
  const failedCache = useRef(new Set());

  useEffect(() => {
    if (!pokemonList || pokemonList.length === 0) { return; }

    const loadData = async () => {
      const storedPokedexRaw = localStorage.getItem("pokedex") || "{}";
      const storedPokedex = JSON.parse(storedPokedexRaw);

      let updated = false;

      for (const pokemon of pokemonList) {
        if (!pokemon) { continue; }
        
        if (failedCache.current.has(pokemon)) { continue; }

        const existingPokemon = storedPokedex[pokemon];

        const needsUpdate = !existingPokemon || !existingPokemon.eggGroups || existingPokemon.eggGroups.length === 0 || existingPokemon.genderRate === undefined;

        try {
          if (needsUpdate) {
            const mon = await fetchPokemon(pokemon);
            if (mon.error) { 
              failedCache.current.add(pokemon);
              continue; 
            }
            const speciesData = await fetchSpecies(pokemon);
            if (speciesData.error) { 
              failedCache.current.add(pokemon);
              continue; 
            }
            storedPokedex[pokemon] = {
              name: pokemon,
              img: mon.sprites.other.home.front_default,
              types: mon.types.map(t => t.type.name),
              eggGroups: speciesData.egg_groups.map(g => g.name),
              genderRate: speciesData.gender_rate,
            }
            updated = true;
          }
        } catch (e) {
          failedCache.current.add(pokemon);
        }
      }

      if (updated) {
        localStorage.setItem("pokedex", JSON.stringify(storedPokedex));
      }
      setPokedex(storedPokedex);
    };
    loadData();
  }, [pokemonList]);

  return pokemonList.map(name => (name ? pokedex[name] || null : null));
};

const fetchPokemon = async (pokemon) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!res.ok) throw new Error("Fetch failed");
    return await res.json();
  } catch {
    return { error: "Unable to fetch Pokémon data" };
  }
};

const fetchSpecies = async (pokemon) => {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemon}`);
    if (!res.ok) throw new Error("Fetch failed");
    return await res.json();
  } catch {
    return { error: "Unable to fetch species data" }
  }
};