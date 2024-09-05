import { useState } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import RPGManager from './pages/Homepage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/homepage" element={<RPGManager />} />
      </Routes>
    
    </BrowserRouter>

    </>
  )
}

export default App
