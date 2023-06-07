import { useState, useEffect } from 'react'

function App() {
  const [menuInfo, setMenuInfo] = useState('Loading...')
  const ipcRenderer = window.electron.ipcRenderer

  useEffect(() => {
    window.electron.ipcRenderer.on('menuInfo', (_, message) => {
      setMenuInfo(message)
    })
  }, [])
  return (
    <div className="container">
      <h1>{menuInfo} is clicked...</h1>
    </div>
  )
}

export default App
