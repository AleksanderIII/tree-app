import React from 'react';
import { Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { closePopup } from '../../../slices/popupSlice';

const DeletePopupContent: React.FC = () => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    console.log('Delete node');
    dispatch(closePopup());
  };

  return (
    <>
      <p>Are you sure you want to delete this node?</p>
      <Button onClick={handleDelete} color='primary'>
        Delete
      </Button>
    </>
  );
};

export default DeletePopupContent;
