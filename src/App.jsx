// src/App.jsx
import fondo from './assets/fondo.png';
import BienvenidaConBotones from './components/BienvenidaConBotones';
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
      <Helmet>
        <title>Astro Mío</title>
        <meta
          name="description"
          content="Consultas astrológicas, cartas natales, revolución solar y más. Conectate con tu universo interior con Astro Mío."
        />
      </Helmet>

      <div
        style={{
          backgroundImage: `url(${fondo})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '2rem',
          color: '#333',
          backdropFilter: 'brightness(0.95)',
          flexDirection: 'column',
          textAlign: 'center',
          maxWidth: '700px',      // nuevo
          width: '80%',          // nuevo
          margin: '0 auto',       // nuevo
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
          Astro Mío: Tu astrología personalizada
        </h1>
        <p style={{ maxWidth: '600px', margin: '1rem 0' }}>
          Bienvenido a Astro Mío. Con Astro Mío encontrarás qué persona se liga
          a vos para equilibrar energías.
        </p>

        <BienvenidaConBotones />
      </div>

    </>
  );
}

export default App;
