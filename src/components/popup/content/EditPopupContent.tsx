import React, { useState, useEffect } from 'react';
import { Button, TextField, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { closePopup } from '../../../store/slices/popup/popupSlice';
import { renameNode } from '../../../store/slices/tree/treeThunks';

const EditPopupContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { nodeId, content } = useSelector((state: RootState) => state.popup);
  const [nodeName, setNodeName] = useState<string>('');

  useEffect(() => {
    if (content.nodeName) {
      setNodeName(content.nodeName);
    }
  }, [content]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(event.currentTarget.value);
  };

  const handleRename = () => {
    if (nodeId !== undefined && nodeName.trim()) {
      dispatch(renameNode({ nodeId, newName: nodeName }))
        .unwrap()
        .then(() => {
          dispatch(closePopup());
        })
        .catch((error) => console.error('Failed to rename node:', error));
    }
  };

  return (
    <Box>
      <TextField
        fullWidth
        label='Edit node name'
        value={nodeName}
        onChange={handleInputChange}
        variant='outlined'
      />
      <Box mt={2} display='flex' justifyContent='flex-end' gap={1}>
        <Button onClick={() => dispatch(closePopup())} color='secondary'>
          Cancel
        </Button>
        <Button onClick={handleRename} color='primary' variant='contained'>
          Rename
        </Button>
      </Box>
    </Box>
  );
};

export default EditPopupContent;
