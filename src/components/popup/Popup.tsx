import React from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { closePopup } from '../../slices/popupSlice';
import AddPopupContent from './content/AddPopupContent';
import EditPopupContent from './content/EditPopupContent';
import DeletePopupContent from './content/DeletePopupContent';

const Popup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, content } = useSelector((state: RootState) => state.popup);

  if (!isOpen) return null;

  let popupContent;

  switch (content.header) {
    case 'Add':
      popupContent = <AddPopupContent />;
      break;
    case 'Edit':
      popupContent = <EditPopupContent />;
      break;
    case 'Delete':
      popupContent = <DeletePopupContent />;
      break;
    default:
      popupContent = null;
  }

  return (
    <Dialog open={isOpen} onClose={() => dispatch(closePopup())}>
      <DialogTitle>{content.header}</DialogTitle>
      <DialogContent>{popupContent}</DialogContent>
      <DialogActions>
        <Button onClick={() => dispatch(closePopup())} color='primary'>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
