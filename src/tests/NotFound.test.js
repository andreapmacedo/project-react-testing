import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../RenderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa o componente FavoritePokemons.js', () => {
  test('Se a página contém um h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const text = /page requested not found/i;
    const textNotFound = screen.getByRole('heading', { level: 2, name: text });
    expect(textNotFound).toBeInTheDocument();
  });

  test('Se a página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    renderWithRouter(<NotFound />);
    const imgNotFound = screen.getByRole('img', { name: /Pikachu crying/i });
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(imgNotFound.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
