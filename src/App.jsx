import { useState } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import RPGManager from './pages/Homepage.jsx';
import SignIn from './pages/SignIn.jsx';
import AuthContext from './functions/context.jsx';
import SignUpPage from './pages/SignUp.jsx';
import NPCPage from './pages/Npcs.jsx';
import LorePage from './pages/Lore.jsx';
import ClassesPage from './pages/Classes.jsx';
import PlayerProfilePage from './pages/Profile.jsx';

function App() {
  const [user, setUser] = useState(0);

  return (
    <>
      <AuthContext.Provider value={{user, setUser}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RPGManager />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/npcs" element={<NPCPage />} />
            <Route path="/lore" element={<LorePage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/profile" element={<PlayerProfilePage />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
};

export default App;
