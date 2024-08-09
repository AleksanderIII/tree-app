import React from 'react';
import { usePopup } from '../../context/PopupContext';

const PopupContent: React.FC = () => {
  const { openPopup } = usePopup();

  const handleAddClick = () => {
    openPopup({
      header: 'Add',
      body: <input type='text' placeholder='Enter node name' />,
      footer: null,
    });
  };

  const handleEditClick = () => {
    openPopup({
      header: 'Edit',
      body: <input type='text' placeholder='Enter new name' />,
      footer: null,
    });
  };

  return (
    <div>
      <button onClick={handleAddClick}>Open Add Popup</button>
      <button onClick={handleEditClick}>Open Edit Popup</button>
    </div>
  );
};

export default PopupContent;
