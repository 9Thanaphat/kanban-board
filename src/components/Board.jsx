import React, { useState, useEffect } from 'react'
import List from './List'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

const Board = () => {

  const [Lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem('kanban-lists');
    return savedLists ? JSON.parse(savedLists) : [
      { id: '1', title: 'To Do' },
      { id: '2', title: 'In Progress' },
      { id: '3', title: 'Done' }
    ];
  });
  const [cards, setCards] = useState(() => {
    const savedCards = localStorage.getItem('kanban-cards');
    return savedCards ? JSON.parse(savedCards) : [
      { id: '101', data: 'Task 1', listId: '1' },
      { id: '201', data: 'Task 3', listId: '2' }
    ];
  });

  useEffect(() => {
    localStorage.setItem('kanban-lists', JSON.stringify(Lists));
  }, [Lists]);

  useEffect(() => {
    localStorage.setItem('kanban-cards', JSON.stringify(cards));
  }, [cards]);

  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const renameList = (id, newTitle) => {
    if (!newTitle.trim()) return setIsRenaming(false);
    setLists(Lists.map(list =>
      list.id === id ? { ...list, title: newTitle } : list
    ));
  }

  const handleOnDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination)
      return;
    if (destination.index === source.index && destination.droppableId === source.droppableId) return;
    if (type === 'list') {
      const newLists = Array.from(Lists);
      const [movedList] = newLists.splice(source.index, 1);
      newLists.splice(destination.index, 0, movedList);
      setLists(newLists);
      return;
    }
    const newCards = Array.from(cards);
    const sourceListCards = newCards.filter(c => c.listId === source.droppableId);
    const movedCard = sourceListCards[source.index];

    if (!movedCard)
      return;
    const filteredCards = newCards.filter(c => c.id !== movedCard.id);
    const updatedCard = { ...movedCard, listId: destination.droppableId };
    const destListCards = filteredCards.filter(c => c.listId === destination.droppableId);
    const otherListCards = filteredCards.filter(c => c.listId !== destination.droppableId);
    destListCards.splice(destination.index, 0, updatedCard);
    setCards([...otherListCards, ...destListCards]);
  };

  const addList = (name) => {
    let newList = { id: String(Date.now()), title: name };
    setLists([...Lists, newList]);
    setIsAdding(false);
  }

  const removeList = (id) => {
    console.log("Removing list with id:", id);
    setLists(Lists.filter(list => list.id !== id));
  }


  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="all-lists" direction="horizontal" type="list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className='bg-black/10 w-full h-screen p-5 flex overflow-x-auto gap-4'>
            {Lists.map((list, index) => (
              <List
                key={list.id}
                id={list.id}
                index={index}
                name={list.title}
                removeList={removeList}
                cards={cards}
                setCards={setCards}
                renameList={renameList}
              />
            ))}
            {provided.placeholder}

            {!isAdding && <button onClick={() => setIsAdding(true)} className='p-5 mt-2 bg-white/40 h-10 rounded-xl flex items-center min-w-250px shrink-0 hover:bg-white/50'>
              Add another list
            </button>}

            {isAdding && <div className='pt-2 pb-2 pl-2 pr-2 bg-white/40 h-auto self-start rounded-xl flex flex-col'>

              <input onChange={(e) => setNewTitle(e.target.value)} placeholder='Enter list name' className='bg-white w-full rounded-md'></input>
              <div className='grid grid-cols-2 gap-2'>
                <button onClick={() => addList(newTitle)} className='mt-2 bg-black rounded-md hover:bg-gray-800 text-white'>Add List</button>
                <button onClick={() => setIsAdding(false)} className='mt-2 bg-black rounded-md hover:bg-gray-800 text-white'>Cancel</button>
              </div>
            </div>}

          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default Board