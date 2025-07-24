import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { db } from '../firebase';
import { ref, push } from 'firebase/database';

const styles = {
  contenedor: {
    width: '95%',
    maxWidth: '900px',
    margin: '1rem auto',
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
    color: '#DAA520',
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
  const [likeDado, setLikeDado] = useState(false); // Nuevo estado para el like

  const consultarLuna = async () => {
    if (!fecha) {
      alert('Por favor selecciona una fecha y hora.');
      return;
    }

    setLoading(true);
    setResultado('');
    setLikeDado(false); // Reiniciar el like en nueva consulta

    try {
      const response = await fetch('https://astro-mio-backend.onrender.com/api/luna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fecha: fecha,
          tolerancia: '10',
        }),
      });

      const data = await response.json();

      if (data.error) {
        setResultado(`Error: ${data.error}`);
      } else if (data.orbitas && data.orbitas.length > 0) {
        const orbita = data.orbitas[0];

        const baseDate = new Date(orbita.sol_equivalente);

        const desde = new Date(baseDate);
        desde.setDate(baseDate.getDate() - 8);

        const hasta = new Date(baseDate);
        hasta.setDate(baseDate.getDate() + 8);

        const opciones = { day: 'numeric', month: 'long' };
        const fechaDesde = desde.toLocaleDateString('es-AR', opciones);
        const fechaHasta = hasta.toLocaleDateString('es-AR', opciones);

        const resultadoTexto = `🌙 Tu Luna: entre el ${fechaDesde} y el ${fechaHasta}`;

        setResultado(resultadoTexto);

        push(ref(db, 'consultas_luna'), {
          fechaNacimiento: fecha,
          fechaConsulta: new Date().toISOString(),
          resultado: resultadoTexto,
        });
      } else {
        setResultado('No se encontraron órbitas para esa fecha.');
      }
    } catch (error) {
      setResultado(`Error en la consulta: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const darLike = () => {
    if (likeDado) return;

    push(ref(db, 'likes_luna'), {
      fechaNacimiento: fecha,
      fechaConsulta: new Date().toISOString(),
      like: true,
    });

    setLikeDado(true);
  };

  return (
    <div style={styles.contenedor}>
      <h1 style={styles.titulo}>¿Qué es tu Sol y tu Luna?</h1>

      <p style={styles.parrafo}>
        🌞 <strong>Tu Sol</strong> representa el día de tu cumpleaños y está ubicado en una constelación específica en ese momento. Esta posición indica tu identidad básica, tu esencia y cómo te mostrás al mundo, según el calendario astrológico.
      </p>

      <p style={styles.parrafo}>
        🌙 <strong>Tu Luna</strong> representa la posición en el cielo donde estaba la Luna en el momento exacto de tu nacimiento. Esta energía lunar influye en tu mundo emocional, tu sensibilidad, tus reacciones más íntimas y cómo te conectás con los demás a nivel afectivo.
      </p>

      <p style={styles.parrafo}>
        🌙 ¿Querés descubrir tu Luna? Ingresá tu fecha y hora de nacimiento y encontrá tu energía complementaria. ¡Te vas a sorprender!
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
        {loading ? 'Consultando tu Luna... esperá un momento ✨' : 'Descubrí tu Luna'}
      </button>

      {resultado && (
        <>
          <pre style={styles.resultado}>{resultado}</pre>

          {!likeDado && (
            <button
              onClick={darLike}
              style={{
                ...styles.botonConsultar,
                backgroundColor: '#e91e63',
              }}
            >
              ✨ ¡Coincide con alguien cercano! Regalá un like 💖
            </button>
          )}

          {likeDado && (
            <p style={{ textAlign: 'center', color: '#e91e63', fontWeight: 'bold' }}>
              ¡Gracias por tu like! 💖
            </p>
          )}

          <p style={styles.parrafo}>
            🌟 Si te gustó descubrir tu Luna y querés saber más sobre tu energía complementaria,
            te invitamos a completar el siguiente formulario.
          </p>

          <button
            onClick={() => navigate('/formulario')}
            style={{
              ...styles.botonConsultar,
              backgroundColor: '#007BFF',
              marginTop: '1rem',
            }}
          >
            Ir al formulario
          </button>
        </>
      )}

      <button
        onClick={() => navigate(-1)}
        style={styles.botonVolver}
      >
        Volver
      </button>
    </div>
  );
}
