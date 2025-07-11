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
            ✨ <strong>¡Hola!</strong>✨
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
    width: '60%',
    maxWidth: '750px', // un pelito más ancho
    margin: '1rem auto 0 auto',
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // más suave sobre el fondo
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  },

  parrafoDestacado: {
    fontSize: '1.25rem', // más legible
    marginBottom: '1rem',
    fontWeight: '600',
    color: '#DAA520', // dorado para destacar
  },

  parrafo: {
    fontSize: '1.05rem',
    marginBottom: '1rem',
    lineHeight: '1.7',
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
    padding: '0.75rem 1.5rem',
    color: '#fff',
    fontWeight: '700',
    borderRadius: '8px',
    textDecoration: 'none',
    fontSize: '1rem',
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease',
    cursor: 'pointer',
    minWidth: '140px',
    textAlign: 'center',
    backgroundColor: '#DAA520', // botón dorado
  },
};
