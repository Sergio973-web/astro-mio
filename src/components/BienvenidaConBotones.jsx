import { Link } from 'react-router-dom';

export default function BienvenidaConBotones() {
  return (
    <section style={styles.section}>
      <p style={styles.parrafoDestacado}>
        ✨ <strong>¡Hola! Me alegra que estés acá.</strong> ✨
      </p>
      <p style={styles.parrafo}>
        Cada persona nace con una energía única...
      </p>
      <p style={styles.parrafo}>
        Esa alineación forma tu <strong>mapa energético</strong>...
      </p>
      <p style={styles.parrafo}>
        A veces esa energía no está presente...
      </p>
      <p style={styles.parrafoImportante}>
        📝 Descubrí Astro Mío completando el formulario.
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
        <Link
          to="/formulario"
          style={{ ...styles.boton, backgroundColor: '#3b82f6' }}
        >
          Formulario
        </Link>
      </div>
    </section>
  );
}


const styles = {
  section: {
  width: '95%',
  maxWidth: '900px',
  margin: '1rem auto 0 auto',
  padding: '2rem',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '12px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
  textAlign: 'center',
  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  color: '#333',
  transform: 'translateX(-25px)', // más confiable visualmente
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
