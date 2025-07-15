import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  contenedor: {
    width: '95%',
    maxWidth: '900px',
    margin: '2rem auto',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
    lineHeight: '1.6',
    transform: 'translateX(-25px)',
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
  input: {
    display: 'block',
    margin: '1rem auto',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    width: '200px',
  },
  botonConsultar: {
    backgroundColor: '#4CAF50',
    color: '#fff',
    padding: '0.5rem 1.2rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '1rem',
    margin: '1rem auto',
    display: 'block',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease',
  },
  resultado: {
    marginTop: '1rem',
    backgroundColor: '#f9f9f9',
    padding: '1rem',
    borderRadius: '8px',
    border: '1px solid #ddd',
    maxWidth: '400px',
    marginLeft: 'auto',
    marginRight: 'auto',
    whiteSpace: 'pre-wrap',
    fontFamily: 'monospace',
    fontSize: '1rem',
  },
};

export default function NotaMiSolYLuna() {
  const navigate = useNavigate();

  const [fecha, setFecha] = useState('');
  const [resultado, setResultado] = useState('');
  const [loading, setLoading] = useState(false);

  const consultarLuna = async () => {
    if (!fecha) {
      alert('Por favor selecciona una fecha y hora.');
      return;
    }

    setLoading(true);
    setResultado('');

    try {
      const response = await fetch('https://astro-mio-backend.onrender.com/api/luna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fecha: fecha,
          tolerancia: '10',
          sexo: '', // Puedes agregar un selector si quieres enviar esto
        }),
      });

      const data = await response.json();

      if (data.error) {
        setResultado(`Error: ${data.error}`);
      } else if (data.orbitas && data.orbitas.length > 0) {
        const orbita = data.orbitas[0];
        setResultado(
          `Fecha Luna: ${orbita.fecha}\n` +
          `Ascensión Recta: ${orbita.luna.ascension_recta}\n` +
          `Declinación: ${orbita.luna.declinacion}\n` +
          `Fecha equivalente del Sol: ${orbita.sol_equivalente}\n` +
          `Interpretación: ${orbita.interpretacion || 'N/A'}`
        );
      } else {
        setResultado('No se encontraron órbitas para esa fecha.');
      }
    } catch (error) {
      setResultado(`Error en la consulta: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.contenedor}>
      <h1 style={styles.titulo}>¿Qué es tu Sol y tu Luna?</h1>

      <p style={styles.parrafo}>
        🌞 <strong>Tu Sol</strong> representa el día de tu cumpleaños y está ubicado en una constelación específica en ese momento. Esta posición indica tu identidad básica, tu esencia y cómo te muestras al mundo, según el calendario astrológico.
      </p>

      <p style={styles.parrafo}>
        🌙 <strong>Tu Luna</strong> es el día en que el Sol se encuentra en la misma posición en la que estaba la Luna al momento de tu nacimiento.
      </p>

      <p style={styles.parrafo}>
        🎯 <strong>Objetivo:</strong> encontrar el complemento a tu energía y lograr que las relaciones con los demás perduren en el tiempo.
      </p>

      <input
        type="datetime-local"
        value={fecha}
        onChange={(e) => setFecha(e.target.value)}
        style={styles.input}
        aria-label="Fecha y hora de nacimiento"
      />

      <button
        onClick={consultarLuna}
        style={styles.botonConsultar}
        disabled={loading}
      >
        {loading ? 'Consultando...' : 'Consultar Fecha de Tu Luna equivalente al calendario Solar'}
      </button>

      {resultado && <pre style={styles.resultado}>{resultado}</pre>}

      <button
        onClick={() => navigate(-1)} // Volver a la página anterior
        style={styles.botonVolver}
      >
        Volver
      </button>
    </div>
  );
}
