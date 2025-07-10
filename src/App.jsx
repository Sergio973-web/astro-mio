// src/App.jsx
import fondo from './assets/fondo.jpg';
import BienvenidaConBotones from './components/BienvenidaConBotones';

function App() {
  return (
    <div
      style={{
        backgroundImage: `url(${fondo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem',
        color: '#333',
        backdropFilter: 'brightness(0.95)',
      }}
    >
      <BienvenidaConBotones />
    </div>
  );
}

export default App;
