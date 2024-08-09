import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { closePopup } from '../../../slices/popupSlice';
import { renameNode } from '../../../slices/treeSlice';

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
    <>
      <TextField
        fullWidth
        label='Edit node name'
        value={nodeName}
        onChange={handleInputChange}
      />
      <Button onClick={handleRename} color='primary'>
        Rename
      </Button>
    </>
  );
};

export default EditPopupContent;
