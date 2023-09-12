import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../pages/About/About';

test('a página contém as informações sobre a Pokédex', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const aboutTitle = screen.getByText(/About Pokédex/i);
  expect(aboutTitle).toBeInTheDocument();

  const descriptionParagraph1 = screen.getByText(/This application simulates a Pokédex/i);
  expect(descriptionParagraph1).toBeInTheDocument();

  const descriptionParagraph2 = screen.getByText(/One can filter Pokémon by type/i);
  expect(descriptionParagraph2).toBeInTheDocument();

  const pokedexImage = screen.getByAltText('Pokédex') as HTMLImageElement;
  expect(pokedexImage.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
