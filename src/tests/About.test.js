import React from 'react';
// import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    render(<About />);

    const aboHeading = screen.getByRole('heading', { level: 2, name: /About Pokédex/i });
    expect(aboHeading).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const paragraphs = document.querySelectorAll('p');
    expect(paragraphs).toHaveLength(2);

    const desParagraph01 = screen.getByText(/This application simulates a Pokédex/i);
    expect(desParagraph01).toBeInTheDocument();

    const desParagraph02 = screen.getByText(/One can filter Pokémons by type/i);
    expect(desParagraph02).toBeInTheDocument();
  });

  test('Verifica se a página contém a imagem de uma Pokédex', () => {
    render(<About />);

    const img = screen.getByRole('img', { name: /Pokédex/i });
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(src);
  });
});
