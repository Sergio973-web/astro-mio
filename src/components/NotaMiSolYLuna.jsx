// src/components/NotaMiSolYLuna.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  contenedor: {
    maxWidth: '800px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
    lineHeight: '1.6',
  },
  titulo: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '1.5rem',
    textAlign: 'center',
    color: '#DAA520', // dorado
  },
  parrafo: {
    fontSize: '1.1rem',
    marginBottom: '1rem',
  },
  botonVolver: {
    backgroundColor: '#DAA520',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease',
    display: 'block',
    margin: '2rem auto 0 auto',
    width: 'fit-content',
  },
};

export default function NotaMiSolYLuna() {
  const navigate = useNavigate();

  return (
    <div style={styles.contenedor}>
      <h1 style={styles.titulo}>¿Qué es tu Sol y tu Luna?</h1>

      <p style={styles.parrafo}>
        🌞 El Sol representa el día de tu cumpleaños y está ubicado en una constelación específica en ese momento. Esta posición indica tu identidad básica, tu esencia y cómo te muestras al mundo, según el calendario astrológico.
      </p>

      <p style={styles.parrafo}>
        🌙 Tu Luna es el día en que el Sol se encuentra en la misma posición en la que estaba la Luna al momento de tu nacimiento.   
      </p>

      <p style={styles.parrafo}>
        Pronto vas a encontrar acá toda la información detallada para descubrir qué energías te componen 🌙☀
      </p>

      <button
        onClick={() => navigate(-1)} // Volver a la página anterior
        style={styles.botonVolver}
      >
        Volver
      </button>
    </div>
  );
}
