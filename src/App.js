import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Component/HomePage';
import ChatPage from './Component/ChatPage';
import AuthGuard from './guards/AuthGaurd';
function App() {
  return (
    <div className="App">
      <AuthGuard >
        <Routes>
          <Route path='/'  Component={HomePage} />
          <Route path='/chat' Component={ChatPage}
          />
        </Routes>
      </AuthGuard>
    </div>
  );
}

export default App;
