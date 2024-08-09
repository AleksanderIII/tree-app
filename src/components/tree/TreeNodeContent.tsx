import { Box, Button, Typography } from '@mui/material';

import styles from './Tree.module.css';

interface ITreeNodeContentProps {
  name: string;
  childrenLength: number;
  isRootNode: boolean;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const TreeNodeContent: React.FC<ITreeNodeContentProps> = ({
  name,
  childrenLength,
  isRootNode,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <Box className={styles.treeNode__content}>
      <Typography style={{ marginRight: '5px' }}>
        {isRootNode ? 'ROOT' : name}
      </Typography>
      {childrenLength ? (
        <Typography style={{ marginRight: '5px' }}>
          ({childrenLength})
        </Typography>
      ) : null}
      <Button
        style={{ marginRight: '5px' }}
        variant='contained'
        color='success'
        size='small'
        onClick={onAdd}
      >
        Add
      </Button>
      {isRootNode ? null : (
        <>
          <Button
            style={{ marginRight: '5px' }}
            variant='contained'
            color='info'
            size='small'
            onClick={onEdit}
          >
            Edit
          </Button>
          <Button
            variant='contained'
            color='error'
            size='small'
            onClick={onDelete}
          >
            Delete
          </Button>
        </>
      )}
    </Box>
  );
};

export default TreeNodeContent;
