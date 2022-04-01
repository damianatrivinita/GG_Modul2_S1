import React from 'react';
import { useState } from 'react';

function Button({statusSelect, removeFromList, addToList, id}) {

    const [isSelected, setSelected] = useState(statusSelect);

    const showMessage = () => {
        setSelected(!isSelected);
        console.log(!isSelected);
        if (isSelected) {
            removeFromList(id);
        } else {
            addToList(id);
        }
    }

    return (
        <>
            <div className='button'>
                <button className="btn-1" onClick={showMessage}>{!isSelected ? "Select" : "Deselect"}</button>
            </div>
        </>
    )
}

export default Button;