import './App.css';
import Header from './layout/Header';
import { Routes, Route } from 'react-router-dom';
import ErrorCheckerPage from './pages/ErrorCheckerPage';
import SpellingCheckerPage from './pages/SpellingCheckerPage';



function App() {
  
  

  return (
    <div className="App">
      <Header />
        <Routes>
          <Route path="/" exact element={<ErrorCheckerPage />} />
          <Route path="/spellingcheck" exact element={<SpellingCheckerPage />} />
        </Routes>
    </div>
  );
}

export default App;
