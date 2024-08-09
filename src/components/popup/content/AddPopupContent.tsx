import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closePopup } from '../../../slices/popupSlice';

const AddPopupContent: React.FC = () => {
  const dispatch = useDispatch();
  const [nodeName, setNodeName] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(event.currentTarget.value);
  };

  const handleAdd = () => {
    console.log('Add', nodeName);
    dispatch(closePopup());
  };

  return (
    <>
      <TextField
        fullWidth
        label='Enter node name'
        value={nodeName}
        onChange={handleInputChange}
      />
      <Button onClick={handleAdd} color='primary'>
        Add
      </Button>
    </>
  );
};

export default AddPopupContent;
