import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store';
import { closePopup } from '../../../slices/popupSlice';
import { deleteNode } from '../../../slices/treeSlice';
import { Button } from '@mui/material';

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
    <>
      {childrenLength ? (
        <p>You need to delete all children to delete this one</p>
      ) : (
        <>
          <p>Are you sure you want to delete this node?</p>
          <Button onClick={handleDelete} color='primary'>
            Delete
          </Button>
        </>
      )}
    </>
  );
};

export default DeletePopupContent;
