import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Box from './Box';
import NewBoxForm from './NewBoxForm';
import "./BoxList.css";

const BoxList = () => {

    const [boxes, setBoxes] = useState({});

    const handleDelete = (id) => {
        setBoxes(oldBoxes => {
            const { [id]: remove, ...newBoxes } = oldBoxes;

            return newBoxes;
        });
    }

    const addBox = (newBox) => {
        const newId = uuidv4();

        setBoxes(oldBoxes => ({ ...oldBoxes, [newId]: { ...newBox, id: newId } }));
    }

    return (<div className="BoxList">
        <NewBoxForm addBox={addBox} />
        <div className="BoxList-list">
            {Object.entries(boxes).map(([id, box]) => {
                return <Box
                    key={id}
                    width={box.width}
                    height={box.height}
                    color={box.color}
                    id={id}
                    handlDelete={handleDelete} />
            })}
        </div>
    </div>);
};

export default BoxList;