import { useState } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import RPGManager from './pages/Homepage.jsx';
import SignIn from './pages/SignIn.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RPGManager />} />
        <Route path="/signin" element={<SignIn />} />
      </Routes>
    
    </BrowserRouter>

    </>
  )
}

export default App
