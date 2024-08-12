import './App.css';
import { Tabs } from './components/Tabs/Tabs.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Redireccionar desde la raíz a otra ruta */}
          <Route path='/' element={<Navigate to="/colombia_dash" />} />
          {/* Definir las rutas */}
          <Route path='/colombia_dash' element={<div><Tabs /></div>} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
