import React, { useState, useEffect } from 'react'
import { PaintBucket, Sparkles } from "lucide-react";

const NavBar = ({ changePalette, changeAnimation }) => {

  const [boardName, setBoardName] = useState(() => {
    const savedName = localStorage.getItem('kanban-board-name');
    return savedName ? savedName : "カンバンボード";
  });

  const [isRenaming, setIsRenaming] = useState(false);

  useEffect(() => {
    localStorage.setItem('kanban-board-name', boardName);
  }, [boardName]);

  return (
    <div className='w-full h-10 flex items-center justify-between bg-black/70 text-white shadow-sm text-2xl'>
      <div></div>
      {!isRenaming && <div onClick={() => setIsRenaming(true)} className='hover:cursor-pointer hover:bg-white/10'>
        {boardName}
      </div>}
      {isRenaming && <input
        autoFocus
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
        onBlur={() => setIsRenaming(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setIsRenaming(false);
        }}
        className='bg-white/50 text-black w-1/3 rounded-md px-1 outline-none'
      >
      </input>}

      <div className='flex gap-1'>
        <button onClick={changePalette} className=' right-4 hover:bg-white/10 text-white text-sm px-2 py-1 rounded-md'>
          <PaintBucket className="w-4 h-4" />
        </button>
        <button onClick={changeAnimation} className=' right-32 hover:bg-white/10 text-white text-sm px-2 py-1 rounded-md'>
          <Sparkles className="w-4 h-4" />
        </button>
      </div>

    </div>
  )
}

export default NavBar