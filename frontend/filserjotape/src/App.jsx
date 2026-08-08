import { useState } from 'react'
import ListaCatalogo from './pages/ListaCatalogo';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <ListaCatalogo/>
    </div>
  )
}

export default App
