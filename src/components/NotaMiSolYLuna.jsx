// src/components/NotaMiSolYLuna.jsx
import React from 'react';

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
};

export default function NotaMiSolYLuna() {
  return (
    <div style={styles.contenedor}>
      <h1 style={styles.titulo}>¿Qué es tu Sol y tu Luna?</h1>

      <p style={styles.parrafo}>
        [Acá podés agregar la descripción de qué representa el Sol en astrología...]
      </p>

      <p style={styles.parrafo}>
        [Y acá podés poner la explicación sobre la Luna y cómo influye en lo emocional...]
      </p>

      <p style={styles.parrafo}>
        Pronto vas a encontrar acá toda la información detallada para descubrir qué energías te componen 🌙☀
      </p>
    </div>
  );
}
