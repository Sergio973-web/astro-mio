import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function FormularioDeLectura() {
  const navigate = useNavigate();

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

  const [formEnviado, setFormEnviado] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    for (const key in formData) {
      if (key !== 'comentarioAdicional' && formData[key].trim() === '') {
        alert('Por favor completá todos los campos obligatorios.');
        return;
      }
    }

    const mensaje = `
📄 *Formulario de Lectura Astro Mío*

👤 Nombre: ${formData.nombre}
📍 Lugar de nacimiento: ${formData.lugarNacimiento}
📅 Fecha de nacimiento: ${formData.fechaNacimiento}
⏰ Hora de nacimiento: ${formData.horaNacimiento}

🤝 Relación con la persona: ${formData.relacionConPersona}
📍 Lugar de nacimiento de la otra persona: ${formData.lugarNacimientoPersona}
📅 Fecha de nacimiento de la otra persona: ${formData.fechaNacimientoPersona}
⏰ Hora de nacimiento de la otra persona: ${formData.horaNacimientoPersona}

📝 Comentario adicional: ${formData.comentarioAdicional || "Ninguno"}
💰 Costo: $25.000
`;

    const whatsappURL = `https://wa.me/5492302419786?text=${encodeURIComponent(mensaje)}`;
    window.open(whatsappURL, '_blank');

    setFormEnviado(true);
  };

  return (
    <section style={styles.section}>
      <h2 style={styles.titulo}>Formulario de Lectura</h2>

      {!formEnviado ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <Campo label="¿Cuál es tu nombre?" name="nombre" value={formData.nombre} onChange={handleChange} />
          <Campo label="Lugar de Nacimiento (ciudad, provincia, país)" name="lugarNacimiento" value={formData.lugarNacimiento} onChange={handleChange} />
          <Campo type="date" label="¿Cuál es tu fecha de nacimiento?" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
          <Campo type="time" label="Hora de Nacimiento" name="horaNacimiento" value={formData.horaNacimiento} onChange={handleChange} />
          <Campo label="¿Qué relación tenés con la persona a armonizar?" name="relacionConPersona" value={formData.relacionConPersona} onChange={handleChange} />
          <Campo label="Lugar de nacimiento de la persona" name="lugarNacimientoPersona" value={formData.lugarNacimientoPersona} onChange={handleChange} />
          <Campo type="date" label="Fecha de nacimiento de la persona" name="fechaNacimientoPersona" value={formData.fechaNacimientoPersona} onChange={handleChange} />
          <Campo type="time" label="Hora de nacimiento de la persona" name="horaNacimientoPersona" value={formData.horaNacimientoPersona} onChange={handleChange} />
          
          <div style={styles.formGroup}>
            <label>¿Querés agregar algún comentario adicional?</label>
            <textarea name="comentarioAdicional" value={formData.comentarioAdicional} onChange={handleChange} rows="4" />
          </div>

          <p style={styles.costo}>
            💰 El valor es de <strong>$25.000</strong><br />
            Al enviar los datos se genera el link de pago.
          </p>

          <div style={styles.botonesForm}>
            <button type="submit" style={styles.botonEnviar}>Enviar por WhatsApp</button>
            <button
              type="button"
              onClick={() => {
                if (window.history.length > 2) {
                  navigate(-1);
                } else {
                  navigate('/');
                }
              }}
              style={styles.botonVolver}
            >
              Volver
            </button>
          </div>
        </form>
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h3 style={{ color: '#10b981' }}>¡Gracias por enviar tu formulario!</h3>
          <p style={{ margin: '1rem 0' }}>Podés completar el pago ahora para continuar con tu proceso:</p>
          <a
            href="https://mpago.la/1AMQeoy"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              ...styles.botonEnviar,
              backgroundColor: '#3483fa',
              display: 'inline-block',
              textDecoration: 'none',
            }}
          >
            Pagar $25.000 con Mercado Pago.
          </a>
        </div>
      )}
    </section>
  );
}

// COMPONENTE CAMPO REUTILIZABLE
function Campo({ label, name, value, onChange, type = "text" }) {
  return (
    <div style={styles.formGroup}>
      <label>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} required />
    </div>
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
  costo: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: '#a855f7',
    marginBottom: '1rem',
    textAlign: 'center',
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
    flexWrap: 'wrap',
  },
};
