import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Component/HomePage';
import ChatPage from './Component/ChatPage';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' exact Component={HomePage} />
      <Route path='/chat' Component={ChatPage}/>
      </Routes>
    </div>
  );
}

export default App;
