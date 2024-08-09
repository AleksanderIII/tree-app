import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { closePopup } from '../../../slices/popupSlice';
import { addNode } from '../../../slices/treeSlice';

const AddPopupContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { nodeId } = useSelector((state: RootState) => state.popup);
  const [nodeName, setNodeName] = useState<string>('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(event.currentTarget.value);
  };

  const handleAdd = () => {
    if (nodeId !== undefined && nodeName.trim()) {
      dispatch(addNode({ parentNodeId: nodeId, nodeName }))
        .unwrap()
        .then(() => {
          dispatch(closePopup());
        })
        .catch((error) => {
          console.error('Error adding node:', error);
        });
    }
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
