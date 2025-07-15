import { useState } from 'react';
import FormularioDeLectura from './FormularioDeLectura';
import { Link } from 'react-router-dom';

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
            ✨ <strong>¡Hola! Me alegra que estés acá.</strong> ✨
          </p>
          <p style={styles.parrafo}>
            Cada persona nace con una energía única. Al momento de nacer, el <strong>Sol y la Luna</strong> estaban ubicados en constelaciones específicas, tal como se veían desde el lugar exacto donde comenzaste tu camino. <span role="img" aria-label="luna y sol">🌙☀</span>
          </p>
          <p style={styles.parrafo}>
            Esa alineación forma tu <strong>mapa energético</strong>, desde el cual identificamos la energía que te complementa. Este conocimiento es clave para encontrar equilibrio emocional y armonía en tus vínculos. <span role="img" aria-label="estrella fugaz">💫</span>
          </p>
          <p style={styles.parrafo}>
            A veces esa energía no está presente en tu entorno, pero con Astro Mío podés <strong>reconocerla, atraerla o canalizarla</strong> a través de vínculos, espacios o prácticas personales. <span role="img" aria-label="meditación">🧘🏻‍♀</span>
          </p>
          <p style={styles.parrafoImportante}>
            📝 Descubrí Astro Mío y armonizá tu energía en el entorno que habitás completando el formulario.
          </p>

          <div style={styles.botonSaberMasContainer}>
            <Link to="/nota-mi-sol-y-mi-luna" style={styles.botonSaberMas}>
              Saber más
            </Link>
          </div>

          <p style={styles.parrafo}>¡Estoy para acompañarte en este camino! ✨</p>

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
              Formulario
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
    width: '85%',
    maxWidth: '800px',
    margin: '1rem auto 0 auto',
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '12px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
    position: 'relative',
    left: '-40px' // mueve hacia la izquierda
  }


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

  botonSaberMasContainer: {
    margin: '1.5rem 0',
    display: 'flex',
    justifyContent: 'center',
  },

  botonSaberMas: {
    backgroundColor: '#DAA520', // dorado
    color: '#fff',
    padding: '0.75rem 1.5rem',
    borderRadius: '8px',
    fontWeight: '600',
    textDecoration: 'none',
    fontSize: '1rem',
    boxShadow: '0 3px 8px rgba(0, 0, 0, 0.15)',
    transition: 'background-color 0.3s ease',
  },

};
