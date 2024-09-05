import { useState } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import RPGManager from './pages/Homepage.jsx';
import SignIn from './pages/SignIn.jsx';
import AuthContext from './functions/context.js';

function App() {
  const [user, setUser] = useState(0);

  return (
    <>
      <AuthContext.Provider value={{user, setUser}}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RPGManager />} />
            <Route path="/signin" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
};

export default App;
