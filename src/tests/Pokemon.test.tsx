import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const poke25 = '/pokemon/25';

test('O nome correto do Pokémon deve ser mostrado na tela.', () => {
  renderWithRouter(<App />);

  expect(screen.getByText('Pikachu')).toBeInTheDocument();
});

test('O tipo correto do Pokémon deve ser mostrado na tela.', () => {
  renderWithRouter(<App />);

  const pokemonTypes = screen.getByTestId('pokemon-type');
  expect(pokemonTypes).toBeInTheDocument();
  expect(pokemonTypes.textContent).toBe('Electric');
});

test('O peso médio do Pokémon deve ser exibido corretamente.', () => {
  renderWithRouter(<App />);

  expect(screen.getByText('Average weight: 6.0 kg')).toBeInTheDocument();
});

test('A imagem do Pokémon deve ser exibida corretamente.', () => {
  renderWithRouter(<App />);

  const pokemonImage = screen.getByAltText('Pikachu sprite');
  expect(pokemonImage).toBeInTheDocument();

  const imageUrl = pokemonImage.getAttribute('src');
  expect(imageUrl).toContain('https://archives.bulbagarden.net/media/upload/b/b2/Spr_5b_025_m.png');
});

test('Ao clicar no link "More details", é feito o redirecionamento para a página de detalhes do Pokémon.', () => {
  renderWithRouter(<App />);

  const moreDetailsLink = screen.getByRole('link', { name: /more details/i });
  expect(moreDetailsLink).toBeInTheDocument();

  fireEvent.click(moreDetailsLink);

  const currentURL = window.location.pathname;
  const expectedURL = poke25;

  expect(currentURL).toBe(expectedURL);
});

test('Existe um ícone de estrela nos Pokémon favoritados.', async () => {
  renderWithRouter(<App />);

  const pokeLinkDetails = screen.getByRole('link', { name: /more details/i });

  expect(pokeLinkDetails).toBeInTheDocument();
  expect(pokeLinkDetails).toHaveAttribute('href', poke25);
});

test('Existe um elemento h2 com o texto "Summary" na página /pokemon/25', () => {
  renderWithRouter(<App />, { route: poke25 });

  const summaryHeading = screen.getByRole('heading', { name: /summary/i });
  expect(summaryHeading).toBeInTheDocument();
});

test('Existe um elemento <p> com a descrição na página /pokemon/4', () => {
  renderWithRouter(<App />, { route: '/pokemon/4' });

  const descriptionText = 'The flame on its tail shows the strength of its life force. If it is weak, the flame also burns weakly.';
  const descriptionElement = screen.getByText(descriptionText);

  expect(descriptionElement).toBeInTheDocument();
});
