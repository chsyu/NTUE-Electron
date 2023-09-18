import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectFileName, selectHasInit } from '../redux/fileSlice'
import { setFileName } from '../redux/fileSlice'

function Home() {
  const [menuInfo, setMenuInfo] = useState('Loading')
  const [filePathInfo, setFilePathInfo] = useState('')
  // const [fileContent, setFileContent] = useState('')
  const dispatch = useDispatch();

  const fileContent = useSelector(selectFileName)
  const hasInit = useSelector(selectHasInit)
  const { ipcRenderer } = window.electron

  const onSaveToFile = async () => {
    const data = JSON.stringify({ menuInfo: menuInfo })
    await window._fs.writeFile({ fileName: `${menuInfo}.txt`, data })
  }

  const onReadFile = async () => {
    const data = (await window._fs.readFile({ fileName: `${menuInfo}.txt` })) || {
      menuInfo: 'no data'
    }
    const content = JSON.parse(data)
    // setFileContent(content.menuInfo)
    dispatch(setFileName(content.menuInfo))
  }

  const onInitState = async () => {
   const data = (await window._fs.readFile({ fileName: `Loading.txt` })) || {
     menuInfo: 'no data'
   }
   const content = JSON.parse(data)
   // setFileContent(content.menuInfo)
   dispatch(setFileName(content.menuInfo))
 }

  useEffect(() => {
      if (!hasInit) {
         console.log('init state')
         onInitState()
      }
   }, [])

  useEffect(() => {
    ipcRenderer.on('menuInfo', (_, message) => {
      setMenuInfo(message)
    })
    ipcRenderer.on('filePathInfo', (_, filePath) => {
      setFilePathInfo(filePath)
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
        <h2>file write to {filePathInfo} </h2>
        <div
          style={{
            marginTop: '20px',
            border: '1px solid lightgray',
            fontSize: '40px',
            padding: '10px',
            cursor: 'pointer',
            textAlign: 'center'
          }}
          onClick={onReadFile}
        >
          read from file
        </div>
        <h2>file content = {fileContent} </h2>
      </div>
  )
}

export default Home
