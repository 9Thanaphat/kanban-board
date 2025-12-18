import { Color4Bg } from '@color4bg/react'
import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import Board from './components/Board'
import Footer from './components/Footer'

function App() {
  const [isMounted, setIsMounted] = useState(false);

  const [palettes] = useState([
    ["#11694E", "#48BF91", "#8FD9A8", "#15997A"],
    ["#2C3E50", "#34495E", "#7F8C8D", "#95A5A6"],
    ["#FF5F6D", "#FFC371", "#FF9A8B", "#FF6A88"],
    ["#0F2027", "#203A43", "#2C5364", "#3a6186"],
    ["#833ab4", "#fd1d1d", "#fcb045", "#f5af19"],
    ["#1a2a6c", "#b21f1f", "#fdbb2d", "#12c2e9"],
    ["#2193b0", "#6dd5ed", "#0083B0", "#00B4DB"],
    ["#cc2b5e", "#753a88", "#ee0979", "#ff6a00"],
    ["#134E5E", "#71B280", "#085078", "#85D8CE"],
    ["#42275a", "#734b6d", "#141E30", "#243B55"]
  ]);

  const [animations] = useState([
    "blur-gradient",
    "aesthetic-fluid",
    "abstract-shape",
    "blur-dot",
    "wavy-waves"
  ]);

  const [paletteIndex, setPaletteIndex] = useState(() => {
    const saved = localStorage.getItem('kanban-palette-index');
    return saved ? parseInt(saved, 10) : 0;
  });

  const [animationIndex, setAnimationIndex] = useState(() => {
    const saved = localStorage.getItem('kanban-animation-index');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    localStorage.setItem('kanban-palette-index', paletteIndex);
  }, [paletteIndex]);

  useEffect(() => {
    localStorage.setItem('kanban-animation-index', animationIndex);
  }, [animationIndex]);

  const changePalette = () => {
    setPaletteIndex((prev) => (prev + 1) % palettes.length);
  };

  const changeAnimation = () => {
    setAnimationIndex((prev) => (prev + 1) % animations.length);
  };

  const currentPalette = palettes[paletteIndex];
  const currentAnimation = animations[animationIndex];

  return (
    <div className='relative min-h-screen overflow-hidden'>
      {isMounted && (
        <Color4Bg
          style={currentAnimation}
          colors={currentPalette}
          loop={true}
          seed={1000}
        />
      )}
      
      <div className='relative z-10'>
        <NavBar changePalette={changePalette} changeAnimation={changeAnimation} />
        <Board />
        <Footer />
      </div>
    </div>
  )
}

export default App