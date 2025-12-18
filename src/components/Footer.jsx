import React from 'react'
import { Github, Heart } from 'lucide-react'

const Footer = () => {
  return (
    <footer className='w-full h-8 flex items-center justify-between bg-black/50 backdrop-blur-md text-white/50 px-6 fixed bottom-0 z-20'>
      <div className='flex items-center gap-1 text-xs font-light'>
        <span>Made with</span>
        <Heart size={12} className="text-red-500 fill-red-500" />
        <span>by <span className='text-white/80 font-medium'>9Thanaphat</span></span>
      </div>

      <div className='flex items-center gap-4 text-xs'>
        <div className='hidden md:flex gap-2 items-center border-r border-white/10 pr-4'>
          <span className='bg-white/10 px-2 py-0.5 rounded'>React</span>
          <span className='bg-white/10 px-2 py-0.5 rounded'>Tailwind</span>
          <a href="https://github.com/hello-pangea/dnd" target="_blank" className='bg-white/10 px-2 py-0.5 rounded'>DND</a>
          <a href="https://github.com/winterx/color4bg.js" target="_blank" className='bg-white/10 px-2 py-0.5 rounded'>color4bg</a>
        </div>
        
        <a 
          href="https://github.com/9Thanaphat" 
          target="_blank" 
          rel="noreferrer"
          className='flex items-center gap-1 hover:text-white transition-colors'
        >
          <Github size={14} />
          <span>GitHub</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer