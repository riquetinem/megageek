import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  /* Reset e estilos básicos */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color: #f8f9fa;
    color: #343a40;
    line-height: 1.6;
    padding: 0;
    margin: 0;
  }

  /* Layout principal */
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* Tipografia */
  h1, h2, h3, h4, h5, h6 {
    margin-bottom: 1rem;
    color: #2c3e50;
    font-weight: 600;
    line-height: 1.2;
  }

  h1 {
    font-size: 2.5rem;
    margin: 1.5rem 0;
    padding-bottom: 0.5rem;
    border-bottom: 2px solid #e9ecef;
  }

  /* Containers */
  .container {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  /* Botões */
  button {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    background-color: #4e73df;
    color: white;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0.25rem;

    &:hover {
      background-color: #3a5bbf;
      transform: translateY(-1px);
    }

    &:active {
      transform: translateY(0);
    }
  }

  /* Listas */
  ul {
    list-style: none;
    padding: 0;
    margin: 1rem 0;
  }

  li {
    background-color: white;
    margin-bottom: 1rem;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
    }
  }

  /* Cards de comanda */
  .comanda-card {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  /* Formulários e inputs */
  input, select, textarea {
    width: 100%;
    padding: 0.75rem;
    margin: 0.5rem 0;
    border: 1px solid #ced4da;
    border-radius: 4px;
    font-size: 1rem;
    transition: border-color 0.3s;

    &:focus {
      outline: none;
      border-color: #4e73df;
      box-shadow: 0 0 0 0.2rem rgba(78, 115, 223, 0.25);
    }
  }

  /* Responsividade */
  @media (max-width: 768px) {
    h1 {
      font-size: 2rem;
    }

    .container {
      padding: 0 0.5rem;
    }

    .comanda-card {
      grid-template-columns: 1fr;
    }
  }
`;