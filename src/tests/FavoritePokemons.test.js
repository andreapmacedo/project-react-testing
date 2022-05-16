import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Testa o componente FavoritePokemons.js', () => {
  test('se é exibida na tela a mensagem No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const noPokemonsFound = screen.getByText(/No favorite pokemon found/i);
    expect(noPokemonsFound).toBeInTheDocument();
  });

  test('São exibidos todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    userEvent.click(details);

    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const favorites = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favorites).toBeInTheDocument();
    userEvent.click(favorites);

    const mkdFavorite = screen.getAllByRole('img', { name: /is marked as favorite/i });
    expect(mkdFavorite[0]).toBeInTheDocument();
  });
});
