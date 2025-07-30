import { useEffect, useState } from "preact/hooks";

export const usePokemon = (pokemon) => {
  const [pokedex, setPokedex] = useState({});

  useEffect(async () => {
    const storedPokedex = localStorage.getItem("pokedex");
    if (!storedPokedex) {
      localStorage.setItem("pokedex", "{}");
    }

    const parsedPokedex = JSON.parse(storedPokedex);

    if (!(pokemon in parsedPokedex)) {
      const mon = await fetchPokemon(pokemon);
      if (mon.error) {
        setPokedex(parsedPokedex);
        return;
      }
      parsedPokedex[pokemon] = {
        img: mon.sprites.other.home.front_default,
        types: mon.types.map(type => type.type.name),
      };
    }

    setPokedex(parsedPokedex);
    localStorage.setItem("pokedex", JSON.stringify(parsedPokedex))
  });

  return pokedex[pokemon];
};

const fetchPokemon = async (pokemon) => {
  return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((res) => res.json())
    .catch(() => ({ error: ":(" }));
};
