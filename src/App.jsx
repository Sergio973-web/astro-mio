import React from 'react';
import fondo from './assets/fondo.png'; // tu imagen de fondo
import BienvenidaConBotones from './components/BienvenidaConBotones';

function App() {
  return (
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
        padding: '1.5rem',
        color: '#333',
        backdropFilter: 'brightness(0.95)',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '900px', // ancho máximo del contenido
          backgroundColor: 'rgba(255, 255, 255, 0.85)', // fondo blanco semitransparente para mejor lectura
          borderRadius: '12px',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#DAA520' }}>
          Astro Mío
        </h1>
        <p
          style={{
            fontSize: '1.3rem',
            fontWeight: '600',
            color: '#DAA520',
            marginTop: '1rem',
            marginBottom: '2rem',
          }}
        >
          
        </p>

        <BienvenidaConBotones />
      </div>
    </div>
  );
}

export default App;
