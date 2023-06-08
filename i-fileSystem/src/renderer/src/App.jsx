import { useState, useEffect } from 'react'

function App() {
  const [menuInfo, setMenuInfo] = useState('Loading')
  const { ipcRenderer } = window.electron

  const onSaveToFile = async () => {
    const data = `menuInfo: ${menuInfo}`
    await window._fs.writeFile({ fileName: `${menuInfo}.txt`, data })
  }

  useEffect(() => {
    ipcRenderer.on('menuInfo', (_, message) => {
      setMenuInfo(message)
    })
  }, [])
  return (
    <div className="container">
      <h1>{menuInfo} is clicked...</h1>
      <div
        style={{
          marginTop: '20px',
          border: '1px solid lightgray',
          fontSize: '40px',
          padding: '10px',
          cursor: 'pointer',
          textAlign: 'center'
        }}
        onClick={onSaveToFile}
      >
        save to file
      </div>
    </div>
  )
}

export default App
