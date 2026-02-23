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

  console.log('🗓 Fecha original ingresada:', fechaStr);
  console.log('📅 Fecha convertida a objeto:', fecha);

  const fechaNumerica = fecha.toISOString().slice(0, 10).replace(/-/g, '');
  console.log('🔢 Fecha numérica (YYYYMMDD):', fechaNumerica);

  const digitos = [...fechaNumerica].map(Number);
  console.log('🔢 Dígitos individuales:', digitos);

  let suma = digitos.reduce((acc, val) => acc + val, 0);
  console.log('➕ Suma inicial de dígitos:', suma);

  while (suma > 22) {
    suma = suma.toString().split('').reduce((acc, val) => acc + Number(val), 0);
    console.log('🔁 Suma reducida:', suma);
  }

  const indexMayor = Math.min(suma, arcanosMayores.length - 1); // no restamos 1
  console.log('🃏 Índice de Arcano Mayor:', indexMayor);
  console.log('🃏 Arcano Mayor:', arcanosMayores[indexMayor]);

  const año = fecha.getUTCFullYear();
  const indexMenor = (año % 100) % arcanosMenores.length;
  console.log('📅 Año:', año);
  console.log('🃏 Índice de Arcano Menor:', indexMenor);
  console.log('🃏 Arcano Menor:', arcanosMenores[indexMenor]);

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

// 🌀 Calendario Mexica (Tonalpohualli – 260 días)
const signosMexica = [
  { clave: 'Cipactli', texto: 'Cipactli (Caimán)' },
  { clave: 'Ehecatl', texto: 'Ehecatl (Viento)' },
  { clave: 'Calli', texto: 'Calli (Casa)' },
  { clave: 'Cuetzpalin', texto: 'Cuetzpalin (Lagartija)' },
  { clave: 'Coatl', texto: 'Coatl (Serpiente)' },
  { clave: 'Miquiztli', texto: 'Miquiztli (Muerte)' },
  { clave: 'Mazatl', texto: 'Mazatl (Venado)' },
  { clave: 'Tochtli', texto: 'Tochtli (Conejo)' },
  { clave: 'Atl', texto: 'Atl (Agua)' },
  { clave: 'Itzcuintli', texto: 'Itzcuintli (Perro)' },
  { clave: 'Ozomatli', texto: 'Ozomatli (Mono)' },
  { clave: 'Malinalli', texto: 'Malinalli (Hierba)' },
  { clave: 'Acatl', texto: 'Acatl (Caña)' },
  { clave: 'Ocelotl', texto: 'Ocelotl (Jaguar)' },
  { clave: 'Cuauhtli', texto: 'Cuauhtli (Águila)' },
  { clave: 'Cozcacuauhtli', texto: 'Cozcacuauhtli (Buitre)' },
  { clave: 'Ollin', texto: 'Ollin (Movimiento)' },
  { clave: 'Tecpatl', texto: 'Tecpatl (Pedernal)' },
  { clave: 'Quiahuitl', texto: 'Quiahuitl (Lluvia)' },
  { clave: 'Xochitl', texto: 'Xochitl (Flor)' }
];

const mod = (n, m) => ((n % m) + m) % m;

const fechaAJDN = (fechaStr) => {
  let [año, mes, dia] = fechaStr.split('T')[0].split('-').map(Number);

  // Ajuste para meses enero/febrero
  if (mes <= 2) {
    año -= 1;
    mes += 12;
  }

  const A = Math.floor(año / 100);
  const B = 2 - A + Math.floor(A / 4);

  const jdn = Math.floor(365.25 * (año + 4716)) +
              Math.floor(30.6001 * (mes + 1)) +
              dia + B - 1524.5;

  return Math.floor(jdn);
};

const TONAL_BASE_JDN = 584283; // 13/08/3114 a.C. = 1 Cipactli

const obtenerTonalpohualli = (fechaStr) => {
  const jdn = fechaAJDN(fechaStr);
  const delta = jdn - TONAL_BASE_JDN;

  const numeroIndex = mod(delta, 13);
  const signoIndex = mod(delta, 20);

  const numero = numeroIndex + 1;
  const signo = signosMexica[signoIndex];

  if (!signo) throw new Error('Signo mexica no encontrado');

  console.log('🌀 TONAL DEBUG');
  console.log('Fecha:', fechaStr);
  console.log('JDN:', jdn);
  console.log('Delta:', delta);
  console.log('Número:', numero);
  console.log('Signo:', signo);

  return {
    numero,
    signoClave: signo.clave,
    signoTexto: signo.texto
  };
};

// 🌀 Energía de los signos mexica
const energiaSignoMexica = {
  Cipactli: { tipo: 'inicio', rasgo: 'origen y creación' },
  Ehecatl: { tipo: 'movimiento', rasgo: 'cambio y comunicación' },
  Calli: { tipo: 'estructura', rasgo: 'hogar y contención' },
  Cuetzpalin: { tipo: 'impulso', rasgo: 'acción y vitalidad' },
  Coatl: { tipo: 'transformacion', rasgo: 'sabiduría y renovación' },
  Miquiztli: { tipo: 'profundidad', rasgo: 'cierre y trascendencia' },
  Mazatl: { tipo: 'sensibilidad', rasgo: 'intuición y conexión natural' },
  Tochtli: { tipo: 'exceso', rasgo: 'placer y desborde' },
  Atl: { tipo: 'emocion', rasgo: 'fluidez y adaptación' },
  Itzcuintli: { tipo: 'lealtad', rasgo: 'acompañamiento y servicio' },
  Ozomatli: { tipo: 'juego', rasgo: 'creatividad y disfrute' },
  Malinalli: { tipo: 'resiliencia', rasgo: 'crecimiento en la dificultad' },
  Acatl: { tipo: 'direccion', rasgo: 'orden y propósito' },
  Ocelotl: { tipo: 'poder', rasgo: 'protección y profundidad' },
  Cuauhtli: { tipo: 'vision', rasgo: 'claridad y liderazgo' },
  Cozcacuauhtli: { tipo: 'limpieza', rasgo: 'desapego y purificación' },
  Ollin: { tipo: 'cambio', rasgo: 'movimiento radical' },
  Tecpatl: { tipo: 'corte', rasgo: 'verdad y decisión' },
  Quiahuitl: { tipo: 'liberacion', rasgo: 'descarga y renovación' },
  Xochitl: { tipo: 'expresion', rasgo: 'belleza y manifestación' }
};

// 🔢 Energía de los números mexica
const energiaNumeroMexica = {
  1: 'inicio y semilla',
  2: 'dualidad y vínculo',
  3: 'expresión y movimiento',
  4: 'estructura y base',
  5: 'tensión y prueba',
  6: 'equilibrio y armonía',
  7: 'búsqueda interior',
  8: 'poder y responsabilidad',
  9: 'culminación y visión',
 10: 'manifestación completa',
 11: 'liberación de lo viejo',
 12: 'comprensión colectiva',
 13: 'trascendencia y cierre'
};

// 🔗 Unión mexica
const obtenerUnionMexica = (a, b) => {
  if (!a?.signoClave || !b?.signoClave) {
    return {
      titulo: 'Unión indeterminada',
      texto: 'Faltan datos de signo para interpretar la unión.'
    };
  }

  const sA = energiaSignoMexica[a.signoClave];
  const sB = energiaSignoMexica[b.signoClave];

  if (!sA || !sB) {
    return {
      titulo: 'Unión no interpretable',
      texto: `Signos no reconocidos: ${a.signo} / ${b.signo}`
    };
  }

  let dinamica = 'complementaria';
  if (sA.tipo === sB.tipo) dinamica = 'espejo';
  if (a.numero === b.numero) dinamica = 'intensificada';
  if (Math.abs(a.numero - b.numero) >= 8) dinamica = 'desafiante';

  return {
    titulo: `Unión ${dinamica}`,
    texto: `Conecta ${sA.rasgo} con ${sB.rasgo}. Relación ${dinamica} que exige conciencia.`
  };
};

export default function NotaMiSolYLuna() {
  const navigate = useNavigate();
  const [fecha, setFecha] = useState('');
  const [resultado, setResultado] = useState('');
  const [resultadoSolar, setResultadoSolar] = useState('');
  const [loading, setLoading] = useState(false);
  const [likeDado, setLikeDado] = useState(false);
  const [fechaPareja, setFechaPareja] = useState('');

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

        // 🌀 Obtener calendario mexica  
        const mexicaNatal = obtenerTonalpohualli(fecha);

        const unionMexica = obtenerUnionMexica(mexicaNatal);

        const textoArcanos = `
        🃏 Tu Arcano Mayor: ${arcanos.mayor.nombre}
        📖 ${arcanos.mayor.descripcion}

        🃏 Tu Arcano Menor: ${arcanos.menor.nombre}
        📖 ${arcanos.menor.descripcion}

        🌀 Calendario Mexica (Tonalpohualli)

        👤 Tú:
        🔢 ${mexicaNatal.numero} ${mexicaNatal.signoTexto}
        📖 ${energiaNumeroMexica[mexicaNatal.numero]} · ${energiaSignoMexica[mexicaNatal.signoClave].rasgo}
        `;
                
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

  const calcularMexicaPareja = () => {
  if (!fecha || !fechaPareja) {
    alert('Por favor selecciona tu fecha y la de la pareja.');
    return;
  }

  try {
    // 🔹 Crear fechas UTC correctamente
    const toUTCDate = (f) => {
      const date = new Date(f);
      return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    };

    const fechaUTC = toUTCDate(fecha);
    const fechaParejaUTC = toUTCDate(fechaPareja);

    // 🔹 Calcular Tonalpohualli
    const mexicaNatal = obtenerTonalpohualli(fechaUTC);
    const mexicaPareja = obtenerTonalpohualli(fechaParejaUTC);

    // 🔹 Interpretación de la unión
    const union = obtenerUnionMexica(mexicaNatal, mexicaPareja);

    // 🔹 Texto final estilo sacerdote azteca
    const textoPareja = `
🗓️ Calendario Mexica (Tonalpohualli – Pareja)

👤 Tú:
🔢 ${mexicaNatal.numero} ${mexicaNatal.signoTexto}
📖 ${energiaNumeroMexica[mexicaNatal.numero]} · ${energiaSignoMexica[mexicaNatal.signoClave].rasgo}

☀️ Pareja:
🔢 ${mexicaPareja.numero} ${mexicaPareja.signoTexto}
📖 ${energiaNumeroMexica[mexicaPareja.numero]} · ${energiaSignoMexica[mexicaPareja.signoClave].rasgo}

🔗 Unión Mexica:
${union.titulo}
📖 ${union.texto}
    `;

    setResultado(textoPareja);

  } catch (error) {
    console.error(error);
    setResultado(`Error al calcular Tonalpohualli de la pareja: ${error.message}`);
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

      {/* Input y botón de tu fecha de nacimiento */}
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
        {loading ? 'Consultando tu Luna... ✨' : 'Descubrí tu Luna y tus Arcanos'}
      </button>

      {/* ───────── Input y botón para la pareja ───────── */}
      <input
        type="date"
        value={fechaPareja}
        onChange={(e) => setFechaPareja(e.target.value)}
        style={styles.input}
        aria-label="Fecha de la pareja"
      />

      <button
        onClick={calcularMexicaPareja}
        style={{ ...styles.botonConsultar, backgroundColor: '#FF9800' }}
      >
        🗓️ Calcular Tonalpohualli de la pareja (Calendario Azteca)
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
