
import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { Plus ,X } from "lucide-react";
import Card from './Card';
import { Droppable, Draggable } from '@hello-pangea/dnd';

const List = ({ removeList, id, name, cards, setCards, index }) => {

  const [isAdding, setIsAdding] = useState(false);
  const [newText, setNewText] = useState("");

  const handleRemove = () => {
    Swal.fire({
      title: 'Are you sure you want to delete this list?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        removeList(id);
        Swal.fire('Deleted!', '', 'success');
      }
    });
  }

  const addCard = (text) => {
    const cardId = String(Date.now());
  const content = text;
  setCards([...cards, { 
    id: cardId, 
    data: content, 
    listId: id 
  }]); 
  setIsAdding(false);
  setNewText("");
  }

  return (
    <Draggable draggableId={String(id)} index={index}>
      {(provided) => (
    <div ref={provided.innerRef} 
      {...provided.draggableProps}
    className='bg-black/80 self-start h-auto text-white rounded-xl overflow-hidden flex flex-col min-w-70 m-2'>
      <div 
      {...provided.dragHandleProps}
       className='bg-white/10 w-full h-8 flex items-center justify-center px-3 relative'>
        <span className=''>{name}</span>
        <button onClick={()=>handleRemove(id)} className='absolute right-2 bg-red-500 rounded-full hover:bg-red-400'>
          <X size={16} strokeWidth={3}/>
        </button>
      </div>
      <div className='flex flex-col items-center justify-center w-full'>
      <Droppable droppableId={String(id)} type='card'> 
  {(provided) => (
    <div 
      className='flex flex-col items-center justify-center min-h-2 w-full'
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      {cards.filter(c => c.listId === id).map((card, index) => (
        <Card 
          key={card.id} 
          id={card.id} 
          index={index} 
          data={card.data} 
          setCards={setCards}
        />
      ))}
      
      {provided.placeholder}
      {/* 1. จองพื้นที่: ป้องกัน List หดตัวหรือกระตุกเวลาลากการ์ดออก 
      2. แสดงช่องว่าง: สร้างเงาหรือช่องว่างให้ผู้ใช้รู้ว่าจะวางการ์ดลงตรงไหนได้
      3. บังคับใส่: เป็นกฎของ Library เพื่อให้คำนวณตำแหน่งได้อย่างถูกต้อง */}

    </div>
  )}
</Droppable>
      {!isAdding && <div className='p-2 w-full hover:bg-black/30 flex items-center gap-x-2 cursor-pointer transition-colors pb-5'>
        <button onClick={()=>setIsAdding(true)} className='flex items-center gap-x-2 w-full'>
          <Plus size={16} strokeWidth={3}/>
          <span className='text-sm'>Add another card</span>
        </button>
      </div>}

      {isAdding && <div className='pt-2 pl-4 pr-4 w-full m-2  rounded-md flex flex-col'>
        <textarea onChange={(e) => setNewText(e.target.value)} className='bg-white w-full text-black rounded-md'></textarea>
        <div className='grid grid-cols-2'>
          <button onClick={()=>addCard(newText)} className='mt-1bg-black rounded-md hover:bg-gray-800 text-white w-full'>Add Card</button>
          <button onClick={()=>setIsAdding(false)} className='mt-1 bg-black rounded-md hover:bg-gray-800 text-white w-full'>Cancel</button>
        </div>
      </div>}
    
      </div>
    </div>
  )}
  </Draggable>)
}

export default List