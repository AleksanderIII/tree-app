import React, { useState, useEffect } from 'react';
import { Button, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

import { AppDispatch, RootState } from '../../../store';
import { API_RENAME_NODE_URL } from '../../../api/endpoints';
import { closePopup } from '../../../slices/popupSlice';

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
    if (nodeId !== undefined) {
      fetch(`${API_RENAME_NODE_URL}&nodeId=${nodeId}&newNodeName=${nodeName}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log('Node renamed successfully');
            dispatch(closePopup());
          } else {
            console.error('Failed to rename node');
          }
        })
        .catch((error) => console.error('Error:', error));
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
