import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
} from '@mui/material';
import { usePopup } from '../../context/PopupContext';
import { API_RENAME_NODE_URL } from '../../api/endpoints';

const Popup: React.FC = () => {
  const { isOpen, content, closePopup } = usePopup();
  const [nodeName, setNodeName] = useState<string>('');

  useEffect(() => {
    if (isOpen && content.header === 'Edit') {
      setNodeName(content.nodeName || '');
    }
  }, [isOpen, content]);

  const handleAdd = () => {
    console.log('Add', nodeName);
    closePopup();
  };

  const handleRename = () => {
    const nodeId = content.nodeId;
    const newName = nodeName;

    fetch(`${API_RENAME_NODE_URL}?nodeId=${nodeId}&newNodeName=${newName}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          console.log('Node renamed successfully');
          closePopup();
        } else {
          console.error('Failed to rename node');
        }
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNodeName(event.currentTarget.value);
  };

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onClose={closePopup}>
      <DialogTitle>{content.header}</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label={
            content.header === 'Add' ? 'Enter node name' : 'Edit node name'
          }
          value={nodeName}
          onChange={handleInputChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={closePopup} color='primary'>
          Cancel
        </Button>
        {content.header === 'Add' && (
          <Button onClick={handleAdd} color='primary'>
            Add
          </Button>
        )}
        {content.header === 'Edit' && (
          <Button onClick={handleRename} color='primary'>
            Rename
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
