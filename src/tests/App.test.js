import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Testa o componente App.js', () => {
  test('Se há um conjunto de links de navegação', () => {
    renderWithRouter(<App />);
    const links = ['Home', 'About', 'Favorite Pokémons'];
    links.forEach((link) => {
      const currentLink = screen.getByRole('link', { name: link });
      expect(currentLink).toBeInTheDocument();
    });
  });

  test('Se há redirecionamento para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    userEvent.click(linkHome);
    expect(history.location.pathname).toBe('/');
  });

  test('Se há redirecionamento para a página About', () => {
    const { history } = renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    expect(history.location.pathname).toBe('/about');
  });

  test('Se há redirecionamento para a página de Pokemons favoritos.', () => {
    const { history } = renderWithRouter(<App />);
    const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavorites);
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Se há redirecionamento para a página Not Found - URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/qualquercoisa/');
    const notFound = screen.getByRole(
      'img', { name: /the page requested was not found/i },
    );
    expect(notFound).toBeInTheDocument();
  });
});
