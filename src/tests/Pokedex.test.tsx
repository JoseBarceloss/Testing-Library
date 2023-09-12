import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const poNa = 'pokemon-name';
const pokeTypebutton = 'pokemon-type-button';

test('A página contém um título h2 com o texto Encountered Pokémon', () => {
  renderWithRouter(<App />);

  const titleElement = screen.getByRole('heading', { name: /Encountered Pokémon/i });

  expect(titleElement).toBeInTheDocument();
});

test('Teste se é exibido o próximo Pokémon da lista ao clicar no botão', async () => {
  renderWithRouter(<App />);

  const initialPokemon = screen.getByText('Pikachu');
  const nextPokemonButton = screen.getByRole('button', { name: /Próximo Pokémon/ });

  expect(initialPokemon).toBeInTheDocument();
  expect(nextPokemonButton).toHaveTextContent('Próximo Pokémon');

  fireEvent.click(nextPokemonButton);

  const nextPokemon = screen.queryByText('Pikachu');

  expect(nextPokemon).not.toBeInTheDocument();
});

test('Teste se os próximos Pokémon da lista são exibidos ao clicar no botão', async () => {
  renderWithRouter(<App />);
  const pokemonOnScreen = screen.getByTestId(poNa);
  const pokemonTextButton = screen.getAllByTestId(pokeTypebutton);

  const expectedTexts = [
    'Electric',
    'Fire',
    'Bug',
    'Poison',
    'Psychic',
    'Normal',
    'Dragon',
  ];

  pokemonTextButton.forEach((button, index) => {
    expect(button).toHaveTextContent(expectedTexts[index]);
  });

  await userEvent.click(pokemonTextButton[1]);

  expect(pokemonOnScreen).toHaveTextContent('Charmander');
});

test('O primeiro Pokémon da lista deve ser mostrado ao clicar no botão se estiver no último Pokémon da lista', () => {
  renderWithRouter(<App />);
  const nextButton = screen.getByTestId('next-pokemon');
  const pokemonOnScreen = screen.getByTestId(poNa);

  expect(pokemonOnScreen).toHaveTextContent('Pikachu');

  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);
  fireEvent.click(nextButton);

  expect(pokemonOnScreen).toHaveTextContent('Dragonair');

  fireEvent.click(nextButton);

  expect(pokemonOnScreen).toHaveTextContent('Pikachu');
});

test('Teste se é mostrado apenas um Pokémon por vez', () => {
  renderWithRouter(<App />);

  const nextButton = screen.getByTestId('next-pokemon');

  const clickNextButton = () => {
    fireEvent.click(nextButton);
  };

  expect(screen.queryAllByTestId(poNa)).toHaveLength(1);

  for (let i = 0; i < 10; i++) {
    clickNextButton();
    expect(screen.queryAllByTestId(poNa)).toHaveLength(1);
  }
});

test('Teste se a Pokédex tem os botões de filtro', () => {
  renderWithRouter(<App />);

  const pokeTypesBtn = screen.getAllByTestId(pokeTypebutton);
  const allBtn = screen.getByText('All');

  const uniqueTypes = [...new Set(pokeTypesBtn.map((btn) => btn.textContent))];
  expect(pokeTypesBtn).toHaveLength(uniqueTypes.length);

  expect(allBtn).toBeVisible();

  userEvent.click(pokeTypesBtn[0]);
  const pokemonType = pokeTypesBtn[0].textContent;
  const pokemonNames = screen.getAllByTestId(poNa).map((pokemon) => pokemon.textContent);
  expect(pokemonNames.some((name) => name === pokemonType)).toBe(false);

  userEvent.click(allBtn);
  const allPokemonNames = screen.getAllByTestId('pokemon-name').map((pokemon) => pokemon.textContent);
  expect(allPokemonNames.length).toBeGreaterThan(0);
  expect(allPokemonNames).toEqual(pokemonNames);
});

test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
  renderWithRouter(<App />);
  const resetButton = screen.getByText('All');
  expect(resetButton).toBeInTheDocument();
});

test('Ao carregar a página, o filtro selecionado deve ser All', () => {
  renderWithRouter(<App />);
  const allButton = screen.getByText('All');
  expect(allButton).toHaveClass('button-text', 'filter-button');
});

test('Teste se a Pokédex contém um botão para resetar o filtro', async () => {
  renderWithRouter(<App />);
  const allButton = screen.getByRole('button', { name: /all/i });
  const pokeTypesBtn = screen.getAllByTestId(pokeTypebutton);
  const pokeOnScreen = screen.getByTestId(poNa);

  expect(allButton).toHaveTextContent('All');

  await userEvent.click(pokeTypesBtn[1]);
  expect(pokeOnScreen).toHaveTextContent('Charmander');

  await userEvent.click(allButton);
  expect(pokeOnScreen).toHaveTextContent('Pikachu');
});
