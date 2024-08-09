import { Box, Typography } from '@mui/material';

import styles from './Tree.module.css';
import ControlsPanel from './ControlsPanel';

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
