import { useState } from 'react';

export default function FormularioDeLectura({ onVolver }) {
  const [formData, setFormData] = useState({
    nombre: '',
    lugarNacimiento: '',
    fechaNacimiento: '',
    horaNacimiento: '',
    relacionConPersona: '',
    lugarNacimientoPersona: '',
    fechaNacimientoPersona: '',
    horaNacimientoPersona: '',
    comentarioAdicional: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const mensaje = `
  Hola, quiero mi Armonización personalizada con estos datos:

  - Nombre: ${formData.nombre}
  - Lugar de Nacimiento: ${formData.lugarNacimiento}
  - Fecha de Nacimiento: ${formData.fechaNacimiento}
  - Hora de Nacimiento: ${formData.horaNacimiento}
  - Relación con la persona a armonizar: ${formData.relacionConPersona}
  - Lugar de nacimiento persona: ${formData.lugarNacimientoPersona}
  - Fecha de nacimiento persona: ${formData.fechaNacimientoPersona}
  - Hora de nacimiento persona: ${formData.horaNacimientoPersona}
  - Comentarios adicionales: ${formData.comentarioAdicional}
    `;

    // Convertir el mensaje a URL amigable
    const url = `https://wa.me/5492302419786?text=${encodeURIComponent(mensaje)}`;

    // Abrir WhatsApp con mensaje prellenado
    window.open(url, '_blank');
  };


  return (
    <section style={styles.section}>
      <h2 style={styles.titulo}>Formulario de Lectura</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label>¿Cuál es tu nombre?</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>Lugar de Nacimiento (ciudad, provincia, país)</label>
          <input
            type="text"
            name="lugarNacimiento"
            value={formData.lugarNacimiento}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>¿Cuál es tu fecha de nacimiento?</label>
          <input
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>Hora de Nacimiento</label>
          <input
            type="time"
            name="horaNacimiento"
            value={formData.horaNacimiento}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>¿Qué relación tenés con la persona a armonizar?</label>
          <input
            type="text"
            name="relacionConPersona"
            value={formData.relacionConPersona}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>Lugar de Nacimiento de la persona (ciudad, provincia, país)</label>
          <input
            type="text"
            name="lugarNacimientoPersona"
            value={formData.lugarNacimientoPersona}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>¿Cuál es la fecha de nacimiento de esa persona?</label>
          <input
            type="date"
            name="fechaNacimientoPersona"
            value={formData.fechaNacimientoPersona}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>Hora de Nacimiento de esa persona</label>
          <input
            type="time"
            name="horaNacimientoPersona"
            value={formData.horaNacimientoPersona}
            onChange={handleChange}
            required
          />
        </div>
        <div style={styles.formGroup}>
          <label>¿Querés agregar algún comentario adicional?</label>
          <textarea
            name="comentarioAdicional"
            value={formData.comentarioAdicional}
            onChange={handleChange}
            rows="4"
          ></textarea>
        </div>
        <div style={styles.botonesForm}>
          <button type="submit" style={styles.botonEnviar}>Enviar</button>
          <button
            type="button"
            onClick={onVolver}
            style={styles.botonVolver}
          >
            Volver
          </button>
        </div>
      </form>
    </section>
  );
}

const styles = {
  section: {
    maxWidth: '640px',
    margin: '2rem auto',
    padding: '1.5rem 2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  },
  titulo: {
    fontSize: '1.75rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1rem',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'left',
  },
  botonEnviar: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#8b5cf6',
    color: 'white',
    fontWeight: '700',
    borderRadius: '6px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '1rem',
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease',
    marginRight: '1rem',
  },
  botonVolver: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#6b7280',
    color: 'white',
    fontWeight: '700',
    borderRadius: '6px',
    cursor: 'pointer',
    border: 'none',
    fontSize: '1rem',
    boxShadow: '0 3px 6px rgba(0,0,0,0.1)',
    transition: 'background-color 0.3s ease',
  },
  botonesForm: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1rem',
  },
};
