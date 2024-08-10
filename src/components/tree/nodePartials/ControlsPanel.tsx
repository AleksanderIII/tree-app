import React from 'react';
import { Box, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import styles from '../Tree.module.css';

interface ControlsPanelProps {
  isRootNode: boolean;
  onAdd: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  isRootNode,
  onAdd,
  onEdit,
  onDelete,
}) => {
  return (
    <Box className={styles.controlsPanel}>
      <IconButton
        className={styles.controlButton}
        color='success'
        size='small'
        title='Add Child Node'
        onClick={onAdd}
      >
        <AddIcon />
      </IconButton>
      {!isRootNode && (
        <>
          <IconButton
            className={styles.controlButton}
            color='info'
            size='small'
            title='Edit Node'
            onClick={onEdit}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            className={styles.controlButton}
            color='error'
            size='small'
            title='Delete Node'
            onClick={onDelete}
          >
            <DeleteIcon />
          </IconButton>
        </>
      )}
    </Box>
  );
};

export default ControlsPanel;
