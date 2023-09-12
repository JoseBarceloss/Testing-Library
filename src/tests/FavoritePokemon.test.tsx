import { render, screen } from '@testing-library/react';
import FavoritePokemon from '../pages/FavoritePokemon/FavoritePokemon';
import pokemonList from '../data';
import renderWithRouter from '../renderWithRouter';

test('exibe a mensagem "No favorite Pokémon found" quando não há Pokémon favorito', () => {
  render(<FavoritePokemon pokemonList={ [] } />);

  const noFavoritePokemonText = screen.getByText(/No favorite Pokémon found/i);

  expect(noFavoritePokemonText).toBeInTheDocument();
});

test('apenas são exibidos os Pokémon favoritados', () => {
  const favoritesPokemons = [pokemonList[0], pokemonList[1]];

  renderWithRouter(<FavoritePokemon pokemonList={ favoritesPokemons } />);

  pokemonList.forEach((pokemon) => {
    const pokemonName = screen.queryByText(pokemon.name);
    if (favoritesPokemons.includes(pokemon)) {
      expect(pokemonName).toBeInTheDocument();
    } else {
      expect(pokemonName).not.toBeInTheDocument();
    }
  });
});
