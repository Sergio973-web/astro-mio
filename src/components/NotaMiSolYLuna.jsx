import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { ref, push } from 'firebase/database';

// 🔮 Arcanos Mayores (22)
const arcanosMayores = [
  { nombre: 'El Loco', descripcion: 'Nuevos comienzos, libertad, espontaneidad.' },
  { nombre: 'El Mago', descripcion: 'Iniciativa, habilidades y poder personal.' },
  { nombre: 'La Sacerdotisa', descripcion: 'Intuición, sabiduría oculta y misterio.' },
  { nombre: 'La Emperatriz', descripcion: 'Fertilidad, creatividad y abundancia.' },
  { nombre: 'El Emperador', descripcion: 'Autoridad, estructura y protección.' },
  { nombre: 'El Hierofante', descripcion: 'Tradición, valores espirituales y enseñanza.' },
  { nombre: 'Los Enamorados', descripcion: 'Amor, decisiones importantes y conexión.' },
  { nombre: 'El Carro', descripcion: 'Determinación, éxito y control emocional.' },
  { nombre: 'La Justicia', descripcion: 'Verdad, equidad y consecuencias kármicas.' },
  { nombre: 'El Ermitaño', descripcion: 'Introspección, sabiduría interior y soledad.' },
  { nombre: 'La Rueda de la Fortuna', descripcion: 'Cambios, ciclos y destino.' },
  { nombre: 'La Fuerza', descripcion: 'Valor, compasión y autocontrol.' },
  { nombre: 'El Colgado', descripcion: 'Pausa, cambio de perspectiva y entrega.' },
  { nombre: 'La Muerte', descripcion: 'Transformación, renacimiento y evolución.' },
  { nombre: 'La Templanza', descripcion: 'Equilibrio, paciencia y sanación.' },
  { nombre: 'El Diablo', descripcion: 'Ataduras, deseos materiales y sombra interna.' },
  { nombre: 'La Torre', descripcion: 'Revelaciones, cambios súbitos y liberación.' },
  { nombre: 'La Estrella', descripcion: 'Esperanza, inspiración y renovación.' },
  { nombre: 'La Luna', descripcion: 'Emociones profundas, intuición e ilusiones.' },
  { nombre: 'El Sol', descripcion: 'Éxito, vitalidad y alegría pura.' },
  { nombre: 'El Juicio', descripcion: 'Renacimiento, decisiones y llamado interno.' },
  { nombre: 'El Mundo', descripcion: 'Realización, plenitud y cierre de ciclos.' }
];

// 🃏 Arcanos Menores (selección de 16)
const arcanosMenores = [
  { nombre: 'As de Bastos', descripcion: 'Inicio de proyectos, pasión y energía creativa.' },
  { nombre: 'Dos de Copas', descripcion: 'Unión emocional, relaciones armoniosas.' },
  { nombre: 'Tres de Espadas', descripcion: 'Dolor emocional, separación y claridad difícil.' },
  { nombre: 'Cuatro de Oros', descripcion: 'Seguridad material, resistencia al cambio.' },
  { nombre: 'Cinco de Bastos', descripcion: 'Conflictos, competencia y crecimiento personal.' },
  { nombre: 'Seis de Copas', descripcion: 'Recuerdos felices, inocencia y nostalgia.' },
  { nombre: 'Siete de Espadas', descripcion: 'Estrategia, discreción y actuar con cautela.' },
  { nombre: 'Ocho de Oros', descripcion: 'Esfuerzo, dedicación y maestría.' },
  { nombre: 'Nueve de Bastos', descripcion: 'Persistencia, pruebas finales y resiliencia.' },
  { nombre: 'Diez de Copas', descripcion: 'Felicidad familiar, armonía emocional.' },
  { nombre: 'Paje de Espadas', descripcion: 'Curiosidad, aprendizaje y vigilancia.' },
  { nombre: 'Caballero de Oros', descripcion: 'Disciplina, constancia y avance seguro.' },
  { nombre: 'Reina de Bastos', descripcion: 'Confianza, liderazgo y creatividad femenina.' },
  { nombre: 'Rey de Copas', descripcion: 'Madurez emocional, comprensión y equilibrio.' },
  { nombre: 'Tres de Bastos', descripcion: 'Visión a futuro, expansión y preparación.' },
  { nombre: 'Siete de Copas', descripcion: 'Opciones, ilusiones y decisiones emocionales.' }
];

// 🎯 Función para calcular los Arcanos según la fecha
const obtenerArcanos = (fechaStr) => {
  const fecha = new Date(fechaStr);
  const dia = fecha.getUTCDate();
  const mes = fecha.getUTCMonth() + 1;
  const año = fecha.getUTCFullYear();

  // 🔢 Convertimos todos los dígitos de la fecha en un array de números
  const digitos = [...`${dia}${mes}${año}`].map(Number);
  let suma = digitos.reduce((acc, val) => acc + val, 0);

  // 🔁 Reducimos la suma hasta obtener un número entre 1 y 22
  while (suma > 22) {
    suma = suma.toString().split('').reduce((acc, val) => acc + Number(val), 0);
  }

  const indexMayor = suma - 1; // arcanosMayores[0] es El Loco (número 0)
  const indexMenor = (año % 100) % arcanosMenores.length;

  return {
    mayor: arcanosMayores[indexMayor],
    menor: arcanosMenores[indexMenor],
  };
};

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
  titulo: { fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', textAlign: 'center', color: '#DAA520' },
  parrafo: { fontSize: '1.1rem', marginBottom: '1rem' },
  botonVolver: { backgroundColor: '#DAA520', color: '#fff', padding: '0.75rem 1.5rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', display: 'block', margin: '2rem auto 0 auto', width: 'fit-content' },
  input: { display: 'block', margin: '1rem auto', padding: '0.5rem', fontSize: '1rem', borderRadius: '6px', border: '1px solid #ccc', width: '250px' },
  botonConsultar: { backgroundColor: '#4CAF50', color: '#fff', padding: '0.5rem 1.2rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '1rem', margin: '1rem auto', display: 'block', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', transition: 'background-color 0.3s ease' },
  resultado: { marginTop: '1rem', backgroundColor: '#f9f9f9', padding: '1rem', borderRadius: '8px', border: '1px solid #ddd', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto', whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: '1rem' },
};

export default function NotaMiSolYLuna() {
  const navigate = useNavigate();
  const [fecha, setFecha] = useState('');
  const [resultado, setResultado] = useState('');
  const [resultadoSolar, setResultadoSolar] = useState('');
  const [loading, setLoading] = useState(false);
  const [likeDado, setLikeDado] = useState(false);

  const consultarLuna = async () => {
    if (!fecha) {
      alert('Por favor selecciona una fecha y hora.');
      return;
    }

    setLoading(true);
    setResultado('');
    setResultadoSolar('');
    setLikeDado(false);

    try {
      const response = await fetch(`https://astro-mio-backend.onrender.com/api/luna?nocache=${Date.now()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fecha, tolerancia: '10' }),
      });

      const data = await response.json();
      if (data.error) {
        setResultado(`Error: ${data.error}`);
      } else if (data.orbitas && data.orbitas.length > 0) {
        const orbita = data.orbitas[0];
        let fechaBase = orbita.sol_equivalente ? new Date(orbita.sol_equivalente + 'T00:00:00Z') : new Date();

        const desde = new Date(fechaBase);
        desde.setUTCDate(fechaBase.getUTCDate() - 4);
        const hasta = new Date(fechaBase);
        hasta.setUTCDate(fechaBase.getUTCDate() + 4);

        const opciones = { day: 'numeric', month: 'long' };
        const fechaDesde = desde.toLocaleDateString('es-AR', opciones);
        const fechaHasta = hasta.toLocaleDateString('es-AR', opciones);

        const resultadoTextoLuna = `🌙 Tu Luna: entre el ${fechaDesde} y el ${fechaHasta}`;

        // 🔮 Obtener arcanos
        const arcanos = obtenerArcanos(fecha);
        const textoArcanos = `\n\n🃏 Tu Arcano Mayor: ${arcanos.mayor.nombre}\n📖 ${arcanos.mayor.descripcion}\n\n🃏 Tu Arcano Menor: ${arcanos.menor.nombre}\n📖 ${arcanos.menor.descripcion}`;

        setResultado(`${resultadoTextoLuna}${textoArcanos}`);

        push(ref(db, 'consultas_luna'), {
          fechaNacimiento: fecha,
          fechaConsulta: new Date().toISOString(),
          resultado: `${resultadoTextoLuna} | ${arcanos.mayor.nombre} / ${arcanos.menor.nombre}`,
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

  const consultarLunaSolar = async () => {
    setResultadoSolar('Buscando coincidencias con tu Sol natal...');
    try {
      const response = await fetch(`https://astro-mio-backend.onrender.com/api/luna-solar?nocache=${Date.now()}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fecha, tolerancia: '7' }),
      });

      const data = await response.json();
      if (data.error) {
        setResultadoSolar(`Error: ${data.error}`);
      } else if (data.coincidencias && data.coincidencias.length > 0) {
        const coincidencias = data.coincidencias.map(item => `🌕 ${item.fecha}`).join('\n');
        setResultadoSolar(`✨ La Luna volverá a alinearse con tu Sol natal (±7°):\n\n${coincidencias}`);
      } else {
        setResultadoSolar('No se encontraron coincidencias con tu Sol natal.');
      }
    } catch (error) {
      setResultadoSolar(`Error al consultar coincidencias solares: ${error.message}`);
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

      <p style={styles.parrafo}>🌞 <strong>Tu Sol</strong> representa tu esencia y cómo te mostrás al mundo.</p>
      <p style={styles.parrafo}>🌙 <strong>Tu Luna</strong> representa tu mundo emocional y cómo te conectás con los demás.</p>
      <p style={styles.parrafo}>🌙 Descubrí tu Luna, tus Arcanos y mucho más ingresando tu fecha y hora de nacimiento.</p>

      <input type="datetime-local" value={fecha} onChange={(e) => setFecha(e.target.value)} style={styles.input} aria-label="Fecha y hora de nacimiento" />

      <button onClick={consultarLuna} style={styles.botonConsultar} disabled={loading}>
        {loading ? 'Consultando tu Luna... ✨' : 'Descubrí tu Luna y tus Arcanos'}
      </button>

      {resultado && (
        <>
          <pre style={styles.resultado}>{resultado}</pre>

          {!likeDado && (
            <button onClick={darLike} style={{ ...styles.botonConsultar, backgroundColor: '#e91e63' }}>
              ✨ ¡Coincide con alguien cercano! Regalá un like 💖
            </button>
          )}

          {likeDado && (
            <p style={{ textAlign: 'center', color: '#e91e63', fontWeight: 'bold' }}>¡Gracias por tu like! 💖</p>
          )}

          <button onClick={consultarLunaSolar} style={{ ...styles.botonConsultar, backgroundColor: '#8e44ad' }}>
            🌙☀️ ¿Cuándo la Luna se alinea con tu Sol?
          </button>
        </>
      )}

      {resultadoSolar && <pre style={styles.resultado}>{resultadoSolar}</pre>}

      {resultado && (
        <>
          <p style={styles.parrafo}>🌟 Si te gustó descubrir tu Luna y querés saber más sobre tu energía complementaria, te invitamos a completar el siguiente formulario.</p>
          <button onClick={() => navigate('/formulario')} style={{ ...styles.botonConsultar, backgroundColor: '#007BFF', marginTop: '1rem' }}>
            Ir al formulario
          </button>
        </>
      )}

      <button onClick={() => navigate(-1)} style={styles.botonVolver}>
        Volver
      </button>
    </div>
  );
}
