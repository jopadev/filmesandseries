import { useState } from 'react'
import CatalogList from './pages/CatalogList';
function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <CatalogList/>
    </div>
  )
}

export default App
