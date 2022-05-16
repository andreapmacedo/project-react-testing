import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('Testes do componente PokemonDetails.js', () => {
  test('Se as informações detalhadas do pokémon selecionado são mostradas na tela',
    () => {
      renderWithRouter(<App />);

      const pokemonDetailsLink = screen.getByRole('link', { name: /more details/i });
      userEvent.click(pokemonDetailsLink);
      expect(pokemonDetailsLink).not.toBeInTheDocument();

      const detailsTitle = screen.getByRole('heading', { level: 2, name: /Details/i });
      expect(detailsTitle).toBeInTheDocument();

      const summary = screen.getByRole('heading', { level: 2, name: /summary/i });
      expect(summary).toBeInTheDocument();

      const paragraph = screen.getByText(/hard berries with electricity to make/i);
      expect(paragraph).toBeInTheDocument();
    });

  test('Se existe na página uma seção com os mapas contendo as localizações.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    expect(moreDetails).not.toBeInTheDocument();

    const mapsTitle = screen.getByRole('heading', { level: 2, name: /Game Locations/i });
    expect(mapsTitle).toBeInTheDocument();

    const images = screen.getAllByRole('img', { name: /location/i });
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(images[0]).toBeInTheDocument();
    expect(images[1]).toBeInTheDocument();
    expect(images[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    const firstLocationName = screen.getByText(/Kanto Viridian Forest/i);
    expect(firstLocationName).toBeInTheDocument();

    const secondLocationName = screen.getByText(/Kanto Power Plant/i);
    expect(secondLocationName).toBeInTheDocument();
  });

  test('Se pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);

    const favorite = screen.getByLabelText(/Pokémon favoritado?/i);
    expect(favorite).toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    expect(favorite).toBe(checkbox);
  });
});
