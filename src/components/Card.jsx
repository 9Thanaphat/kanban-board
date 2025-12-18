import React from 'react'
import { Square, SquareCheck } from "lucide-react";
import { Draggable } from '@hello-pangea/dnd';

const Card = ({ data, setCards, id, index }) => {
    const [checked, setChecked] = React.useState(false);

    const removeCard = () => {
        setCards(prevCards => prevCards.filter(card => card.id !== id));
    }

    const toggleCheck = () => {
        setChecked(!checked);
    }

    return (
        <Draggable draggableId={String(id)} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className='bg-gray-800/40 text-white w-11/12 p-2 m-2 rounded-md shadow-md relative flex items-center gap-x-2 group'
                >
                    <button onClick={toggleCheck} className='focus:outline-none'>
                        {checked ?
                            <SquareCheck className="w-4 h-4 text-green-400" /> :
                            <Square className="w-4 h-4 text-gray-400 hover:text-white" />
                        }
                    </button>
                    <span className={`text-sm warps-break-words flex-1 ${checked ? 'line-through text-gray-500' : ''}`}>
                        {data}
                    </span>
                    <button
                        onClick={removeCard}
                        className='opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/10 p-0.5 rounded text-[10px]'
                    >
                        X
                    </button>
                </div>
            )}
        </Draggable>
    )
}

export default Card