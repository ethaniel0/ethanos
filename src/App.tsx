import * as React from 'react'
import './App.css'
import Desktop from './components/Desktop'
import FileSystem from './components/FileSystem'


export default function App() {
  // render desktop and taskbar
  FileSystem.initDirectories();
 
  return (
    <main>
      <Desktop />
    </main>
  )
}