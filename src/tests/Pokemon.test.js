import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Teste o componente Pokemon.js', () => {
  test('Se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);

    const title = screen.getByText(/pikachu/i);
    expect(title).toBeInTheDocument();

    const type = screen.getAllByText(/electric/i);
    expect(type[0]).toBeInTheDocument();

    const weight = screen.getByText(/Average weight: 6.0 kg/i);
    expect(weight).toBeInTheDocument();

    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('alt', 'Pikachu sprite');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');

    const pokemonTestId = screen.getByTestId('pokemon-type');
    expect(pokemonTestId).toHaveTextContent(/electric/i);
  });

  test('Se contém um link de navegação para exibir detalhes', () => {
    renderWithRouter(<App />);

    const title = screen.getByText(/pikachu/i);
    expect(title).toBeInTheDocument();

    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    expect(details).toHaveAttribute('href', '/pokemons/25');
  });

  test(`Se ao clicar no link de navegação do pokémon,
    é feito o redirecionamento da aplicação para 
    a página de detalhes de pokémon.`, () => {
    const { history } = renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Se existe um ícone de estrela nos pokémons favoritados.', () => {
    renderWithRouter(<App />);

    const images = screen.getAllByRole('img');
    expect(images).toHaveLength(1);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);

    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);

    const favoriteIcon = screen.getAllByRole('img');
    expect(favoriteIcon).toHaveLength(2);
    expect(favoriteIcon[1]).toHaveAttribute('src', '/star-icon.svg');
    expect(favoriteIcon[1]).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
