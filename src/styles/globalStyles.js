import { createGlobalStyle } from 'styled-components';

export const chartColors = {
  primary: [
    'rgba(147, 176, 255, 0.8)',    // Azul lunar claro
    'rgba(108, 132, 255, 0.8)',    // Azul lunar médio
    'rgba(76, 96, 202, 0.8)',      // Azul lunar escuro
    'rgba(192, 203, 255, 0.8)',    // Lilás lunar claro
    'rgba(162, 171, 255, 0.8)',    // Lilás lunar médio
  ],
  secondary: [
    'rgba(198, 212, 255, 0.8)',    // Prateado lunar
    'rgba(230, 236, 255, 0.8)',    // Branco lunar
    'rgba(169, 182, 255, 0.8)',    // Azul gelo
    'rgba(137, 150, 255, 0.8)',    // Azul noturno
    'rgba(116, 128, 214, 0.8)',    // Azul profundo
  ],
  borders: [
    'rgba(198, 212, 255, 1)',      // Borda prateada
    'rgba(147, 176, 255, 1)',      // Borda azul clara
    'rgba(108, 132, 255, 1)',      // Borda azul média
    'rgba(76, 96, 202, 1)',        // Borda azul escura
    'rgba(162, 171, 255, 1)',      // Borda lilás
  ],
  background: 'rgba(45, 50, 90, 0.3)',
  text: '#c6d4ff',
  grid: 'rgba(198, 212, 255, 0.1)'
};

export const GlobalStyle = createGlobalStyle`
  :root {
    --primary-color: #1a1b2e;
    --secondary-color: #2d325a;
    --text-color: #c6d4ff;
    --accent-color: #8e9dcc;
    --background-color: #0f1123;
    --highlight-color: #4a5490;
    --table-hover: rgba(198, 212, 255, 0.1);
    --table-stripe: rgba(45, 50, 90, 0.3);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body {
    min-height: 100vh;
  }

  body {
    background-color: var(--background-color);
    background-image: 
      radial-gradient(circle at 50% 0, rgba(198, 212, 255, 0.1), transparent 50%),
      radial-gradient(circle at 100% 0, rgba(78, 84, 144, 0.1), transparent 50%);
    color: var(--text-color);
    font-family: 'MedievalSharp', cursive;
  }

  h1, h2, h3, h4, h5, h6 {
    color: var(--text-color);
    margin-bottom: 1rem;
    text-shadow: 0 0 10px rgba(198, 212, 255, 0.3);
  }

  button {
    font-family: 'MedievalSharp', cursive;
  }
`;