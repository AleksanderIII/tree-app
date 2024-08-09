import { Box, IconButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

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
      <Box className={styles.controlsPanel}>
        <IconButton
          style={{ marginRight: '5px' }}
          color='success'
          size='small'
          title='Add Child Node'
          onClick={onAdd}
        >
          <AddIcon />
        </IconButton>
        {isRootNode ? null : (
          <>
            <IconButton
              style={{ marginRight: '5px' }}
              color='info'
              size='small'
              title='Edit Node'
              onClick={onEdit}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              title='Delete Node'
              color='error'
              size='small'
              onClick={onDelete}
            >
              <DeleteIcon />
            </IconButton>
          </>
        )}
      </Box>
    </Box>
  );
};

export default TreeNodeContent;
