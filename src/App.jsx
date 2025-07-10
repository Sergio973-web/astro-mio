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
          content="Conectate con tu universo con Astro Mío."
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
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#DAA520' }}>
          Astro Mío
        </h1>
        <p style={{ maxWidth: '600px', margin: '1rem 0', fontSize: '1.5rem', fontWeight: 'bold', color: '#DAA520' }}>
          Bienvenido. Aquí descubrirás qué persona se conecta con vos para equilibrar energías.
        </p>

        <BienvenidaConBotones />
      </div>
    </>
  );
}

export default App;
