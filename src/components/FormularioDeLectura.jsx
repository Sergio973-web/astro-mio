// src/components/FormularioDeLectura.jsx
import { useState } from 'react';

export default function FormularioDeLectura() {
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes manejar el envío del formulario (ej. enviarlo a un servidor)
    console.log(formData);
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
        <div style={styles.formGroup}>
          <button type="submit" style={styles.boton}>Enviar</button>
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
    textAlign: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
  },
  titulo: {
    fontSize: '1.75rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  formGroup: {
    marginBottom: '1rem',
  },
  boton: {
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
  },
};
