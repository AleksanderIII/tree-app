import React, { useState } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { closePopup } from '../../../store/slices/popupSlice';
import { addNode } from '../../../store/slices/treeSlice';

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
    <Box>
      <TextField
        fullWidth
        label='Enter node name'
        value={nodeName}
        onChange={handleInputChange}
        variant='outlined'
      />
      <Box mt={2} display='flex' justifyContent='flex-end' gap={1}>
        <Button onClick={() => dispatch(closePopup())} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleAdd} color='primary' variant='contained'>
          Add
        </Button>
      </Box>
    </Box>
  );
};

export default AddPopupContent;
