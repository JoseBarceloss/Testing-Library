import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const url = '/pokemon/25';

test('O texto <name> Details deve ser exibido corretamente.', () => {
  renderWithRouter(<App />, { route: url });

  const pokemonDetailsText = screen.getByText('Pikachu Details');
  expect(pokemonDetailsText).toBeInTheDocument();
});

test('O link de navegação para os detalhes do Pokémon não deve estar presente.', () => {
  renderWithRouter(<App />, { route: url });

  const detailsLink = screen.queryByText('Detalhes');
  expect(detailsLink).toBeNull();
});

test('A seção de detalhes deve conter um heading h2 com o texto Summary.', () => {
  renderWithRouter(<App />, { route: url });

  const summaryHeading = screen.getByText('Summary');
  expect(summaryHeading).toBeInTheDocument();
});

test('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico.', () => {
  renderWithRouter(<App />, { route: url });

  const summaryParagraph = screen.getByText(
    'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  );
  expect(summaryParagraph).toBeInTheDocument();
});

test('A seção de detalhes deve conter um heading h2 com o texto "Game Locations of <name>".', () => {
  renderWithRouter(<App />, { route: url });

  const pokemonName = 'Pikachu';

  const gameLocationsHeading = screen.getByText(`Game Locations of ${pokemonName}`);
  expect(gameLocationsHeading).toBeInTheDocument();
});

test('A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico.', () => {
  renderWithRouter(<App />, { route: url });

  const summaryParagraph = screen.getByText(
    'This intelligent Pokémon roasts hard berries with electricity to make them tender enough to eat.',
  );
  expect(summaryParagraph).toBeInTheDocument();
});

test('Teste se existe na página uma seção com os mapas contendo as localizações do Pokémon:', () => {
  renderWithRouter(<App />, { route: url });

  const pokeLocations = screen.getByRole('heading', { name: /game locations of pikachu/i });

  expect(pokeLocations).toBeInTheDocument();

  const pokeLocationsSection = screen.getByText(/kanto viridian forest/i);

  expect(pokeLocationsSection).toBeInTheDocument();

  const img = screen.getAllByAltText('Pikachu location');

  expect(img[0]).toHaveAttribute('src', 'https://archives.bulbagarden.net/media/upload/0/08/Kanto_Route_2_Map.png');
  expect(img[0]).toHaveAttribute('alt', 'Pikachu location');
  expect(img[0]).toBeInTheDocument();
});

test('Usuário pode favoritar um Pokémon através da página de detalhes', async () => {
  renderWithRouter(<App />, { route: '/pokemon/25' });

  const favoriteCheckbox = screen.getByLabelText('Pokémon favoritado?') as HTMLInputElement;
  expect(favoriteCheckbox).toBeInTheDocument();

  expect(favoriteCheckbox.checked).toBe(false);

  await userEvent.click(favoriteCheckbox);

  const favoritedIcon = screen.getByRole('img', { name: /is marked as favorite/i });
  expect(favoritedIcon).toBeInTheDocument();
});
