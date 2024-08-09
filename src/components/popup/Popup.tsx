import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { closePopup, PopupTypes } from '../../store/slices/popupSlice';
import AddPopupContent from './content/AddPopupContent';
import EditPopupContent from './content/EditPopupContent';
import DeletePopupContent from './content/DeletePopupContent';

const Popup: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen, type } = useSelector((state: RootState) => state.popup);

  if (!isOpen) return null;

  let popupContent;

  switch (type) {
    case PopupTypes.Add:
      popupContent = <AddPopupContent />;
      break;
    case PopupTypes.Edit:
      popupContent = <EditPopupContent />;
      break;
    case PopupTypes.Delete:
      popupContent = <DeletePopupContent />;
      break;
    default:
      popupContent = null;
  }

  return (
    <Dialog
      open={isOpen}
      onClose={() => dispatch(closePopup())}
      fullWidth
      maxWidth='sm'
    >
      <DialogTitle>{type}</DialogTitle>
      <DialogContent>{popupContent}</DialogContent>
    </Dialog>
  );
};

export default Popup;
