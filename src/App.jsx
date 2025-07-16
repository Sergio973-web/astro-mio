// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import fondo from './assets/fondo.png';
import BienvenidaConBotones from './components/BienvenidaConBotones';
import NotaMiSolYLuna from './components/NotaMiSolYLuna';
import FormularioDeLectura from './components/FormularioDeLectura'; 

function App() {
  return (
    <BrowserRouter>
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
            maxWidth: '900px',
            backgroundColor: 'rgba(255, 255, 255, 0.35)',
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
            Conectá con tu energía interior ✨
          </p>

          <Routes>
            <Route path="/" element={<BienvenidaConBotones />} />
            <Route path="/nota-mi-sol-y-mi-luna" element={<NotaMiSolYLuna />} />
            <Route path="/formulario" element={<FormularioDeLectura />} /> {/* NUEVA RUTA */}
          </Routes>

        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
