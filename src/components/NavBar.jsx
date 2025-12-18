import React, { useState } from 'react'



const NavBar = () => {

  const [boardName, setBoardName] = React.useState("カンバンボード");
  const [isRenaming, setIsRenaming] = React.useState(false);

  return (
    <div className='w-full h-10 flex items-center justify-center bg-black/70 text-white shadow-sm text-2xl'>
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
    </div>
  )
}

export default NavBar