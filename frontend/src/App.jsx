import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import DataTable from './Components/Table'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1 className="w-full flex items-center justify-center h-screen">
        <div>
        <DataTable />
        </div>
      </h1>
    </>
  )
}

export default App
