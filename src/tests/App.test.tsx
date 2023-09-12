import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

test('verifica os nomes dos links de navegação', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeLink = screen.getByText(/Home/i);
  const aboutLink = screen.getByText(/About/i);
  const favoriteLink = screen.getByText(/Favorite Pokémon/i);

  expect(homeLink).toBeInTheDocument();
  expect(aboutLink).toBeInTheDocument();
  expect(favoriteLink).toBeInTheDocument();
});

test('redireciona para a página inicial ao clicar no link Home', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeLink = screen.getByText(/Home/i);
  fireEvent.click(homeLink);

  expect(window.location.pathname).toBe('/');
});

test('redireciona para a página de About ao clicar no link About', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const aboutLink = screen.getByText(/About/i);
  fireEvent.click(aboutLink);

  const aboutTitle = screen.getByText(/About Pokédex/i);
  expect(aboutTitle).toBeInTheDocument();
});

test('redireciona para a página de favorites ao clicar no link "Favorite Pokémon"', () => {
  render(
    <MemoryRouter initialEntries={ ['/'] }>
      <App />
    </MemoryRouter>,
  );

  const favoriteLink = screen.getByText(/Favorite Pokémon/i);
  fireEvent.click(favoriteLink);

  const favoriteTitle = screen.getByRole('heading', { name: /Favorite Pokémon/i });
  expect(favoriteTitle).toBeInTheDocument();
});

test('redireciona para a página Not Found ao entrar em uma URL desconhecida', () => {
  render(
    <MemoryRouter initialEntries={ ['/unknown-url'] }>
      <App />
    </MemoryRouter>,
  );

  const notFoundText = screen.getByText(/Page requested not found/i);
  expect(notFoundText).toBeInTheDocument();
});
