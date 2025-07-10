import { useState } from 'react';
import FormularioDeLectura from './FormularioDeLectura';

export default function BienvenidaConBotones() {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const handleFormularioClick = () => {
    setMostrarFormulario(true);
  };

  const handleVolver = () => {
    setMostrarFormulario(false);
  };

  return (
    <section style={styles.section}>
      {!mostrarFormulario ? (
        <>
          <p style={styles.parrafoDestacado}>
            ✨ <strong>¡Hola!</strong> Qué lindo que te interese <strong>Astro Mío.</strong>✨
          </p>
          <p style={styles.parrafo}>
            Cada persona nace con una energía única, y quiero ayudar a descubrirla y armonizarla <span role="img" aria-label="luna y sol">🌙☀</span>
          </p>
          <p style={styles.parrafo}>
            A partir de tu mapa energético se encuentra la energía que te complementa, clave para lograr equilibrio emocional y armonía en tus vínculos. <span role="img" aria-label="estrella fugaz">💫</span>
          </p>
          <p style={styles.parrafo}>
            A veces esa energía no está en tu entorno, pero te damos herramientas para reconocerla, atraerla o canalizarla — en vínculos, espacios o prácticas personales. <span role="img" aria-label="meditación">🧘🏻‍♀</span>
          </p>
          <p style={styles.parrafoImportante}>
            📝 Descubre Astro Mío para Armonizar tu energía en el entorno que vives completando el formulario.</p>
          <p style={styles.parrafo}>¡Estamos para acompañarte! ✨</p>

          <div style={styles.botonesContainer}>
            <a
              href="https://wa.me/542302419786"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.boton, backgroundColor: '#25d366' }}
            >
              WhatsApp
            </a>
            <a
              href="https://www.instagram.com/astro_mio/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...styles.boton, backgroundColor: '#E1306C' }}
            >
              Instagram
            </a>
            <button
              onClick={handleFormularioClick}
              style={{ ...styles.boton, backgroundColor: '#3b82f6' }}
            >
              Formulario de Lectura
            </button>
          </div>
        </>
      ) : (
        <FormularioDeLectura onVolver={handleVolver} />
      )}
    </section>
  );
}

const styles = {
  section: {
    width: '100%',
    maxWidth: '700px',
    margin: '1rem auto 0 auto',
    padding: '1.5rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  },

  parrafoDestacado: {
    fontSize: '1.125rem', // ≈ 18px
    marginBottom: '1rem',
  },

  parrafo: {
    fontSize: '1rem',
    marginBottom: '1rem',
    lineHeight: '1.6',
  },

  parrafoImportante: {
    fontSize: '1.1rem',
    marginBottom: '1.5rem',
    fontWeight: '600',
  },

  botonesContainer: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    flexWrap: 'wrap',
  },

  boton: {
    padding: '0.75rem 1.25rem',
    color: '#fff',
    fontWeight: '700',
    borderRadius: '6px',
    textDecoration: 'none',
    fontSize: '1rem',
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    minWidth: '140px', // buen tamaño para móvil
    textAlign: 'center',
  },
};
