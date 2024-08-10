import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

import styles from '../Tree.module.css';

interface ITreeNodeToggleProps {
  isExpanded: boolean;
  onClick: () => void;
}

const TreeNodeToggle: React.FC<ITreeNodeToggleProps> = ({
  isExpanded,
  onClick,
}) => {
  return (
    <IconButton className={styles.toggleIcon} onClick={onClick} size='small'>
      {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
    </IconButton>
  );
};

export default TreeNodeToggle;
