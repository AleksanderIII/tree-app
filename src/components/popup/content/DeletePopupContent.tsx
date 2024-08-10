import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { closePopup } from '../../../store/slices/popup/popupSlice';
import { deleteNode } from '../../../store/slices/tree/treeThunks';

const DeletePopupContent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { nodeId, childrenLength } = useSelector(
    (state: RootState) => state.popup
  );

  const handleDelete = () => {
    dispatch(deleteNode(nodeId!))
      .unwrap()
      .then(() => {
        dispatch(closePopup());
      })
      .catch((error) => console.error('Failed to delete node:', error));
  };

  return (
    <Box>
      <Typography variant='body1'>
        {childrenLength
          ? 'You need to delete all children to delete this one'
          : 'Are you sure you want to delete this node?'}
      </Typography>
      <Box mt={2} display='flex' justifyContent='flex-end' gap={1}>
        <Button
          onClick={() => dispatch(closePopup())}
          color='secondary'
          variant='contained'
        >
          Cancel
        </Button>
        <Button
          onClick={handleDelete}
          disabled={!!childrenLength}
          color='primary'
          variant='contained'
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default DeletePopupContent;
