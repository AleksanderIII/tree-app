import { Box, Typography } from '@mui/material';
import ControlsPanel from './ControlsPanel';

import styles from '../Tree.module.css';

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
      <Typography className={styles.treeNode__content__item}>
        {isRootNode ? 'ROOT' : name}
      </Typography>
      {childrenLength ? (
        <Typography className={styles.treeNode__content__item}>
          ({childrenLength})
        </Typography>
      ) : null}
      <ControlsPanel
        isRootNode={isRootNode}
        onAdd={onAdd}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    </Box>
  );
};

export default TreeNodeContent;
