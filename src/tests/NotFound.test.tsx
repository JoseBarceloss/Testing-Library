import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound/NotFound';

test('A página contém um título h2 com o texto "Page requested not found"', () => {
  render(<NotFound />);

  const titleElement = screen.getByRole('heading', { name: /Page requested not found/i });

  expect(titleElement).toBeInTheDocument();
});

test('A página mostra a imagem correta', () => {
  render(<NotFound />);

  const imageElement = screen.getByAltText("Clefairy pushing buttons randomly with text I have no idea what i'm doing");

  expect(imageElement).toBeInTheDocument();
  expect(imageElement).toHaveAttribute('src', '/404.gif');
});
