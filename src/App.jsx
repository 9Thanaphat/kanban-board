import { useState } from 'react'
import { Color4Bg } from '@color4bg/react'
import NavBar from './components/NavBar'
import Board from './components/Board'


function App() {
  return (
    <div className='relative'>
      <Color4Bg 
        style="blur-gradient"
        colors={["#11694E","#48BF91","#8FD9A8","#15997A"]}
        loop={true}
        seed={1000}
      />
      <div className='relative z-10'>
        <NavBar />
        <Board />
      </div>
        
    </div>
      
  )
}

export default App
