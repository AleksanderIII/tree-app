import { IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface TreeNodeToggleProps {
  isExpanded: boolean;
  onClick: () => void;
}

const TreeNodeToggle: React.FC<TreeNodeToggleProps> = ({
  isExpanded,
  onClick,
}) => {
  return (
    <IconButton
      style={{ position: 'absolute', left: '-30px' }}
      onClick={onClick}
      size='small'
    >
      {isExpanded ? <ExpandMoreIcon /> : <ChevronRightIcon />}
    </IconButton>
  );
};

export default TreeNodeToggle;
