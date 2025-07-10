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
      <div
        style={{
          width: '100%',
          maxWidth: '800px', // 🔸 Controla el ancho máximo del contenido
          margin: '0 auto',  // 🔸 Centra el contenido
          padding: '1rem',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#DAA520' }}>
          Astro Mío
        </h1>
        <p
          style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#DAA520',
            marginTop: '1rem',
          }}
        >
          Bienvenido. Te ayudamos a descubrir qué energía complementa la tuya para lograr equilibrio emocional.
        </p>

        <BienvenidaConBotones />
      </div>
    </div>

    </>
  );
}

export default App;
