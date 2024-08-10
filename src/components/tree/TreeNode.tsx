import React from 'react';
import TreeNodeContent from './TreeNodeContent';
import TreeNodeToggle from './TreeNodeToggle';
import styles from './Tree.module.css';
import { Box } from '@mui/material';
import { PopupTypes } from '../../store/slices/popup/popupTypes';
import { INode } from '../../store/slices/tree/treeTypes';

interface TreeNodeProps {
  isRootNode: boolean;
  node: INode;
  onOpenPopup: (
    type: PopupTypes,
    nodeName: string,
    nodeId?: number,
    childrenLength?: number
  ) => void;
  expandedNodeIds: number[];
  onToggleNode: (nodeId: number) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({
  node,
  isRootNode,
  onOpenPopup,
  expandedNodeIds,
  onToggleNode,
}) => {
  const isExpanded = expandedNodeIds.includes(node.id);

  const handleToggle = () => {
    onToggleNode(node.id);
  };

  return (
    <Box className={styles.treeNode}>
      <Box
        style={{ position: 'relative' }}
        key={node.id}
        className={styles.treeNode__content}
      >
        {node.children.length > 0 && (
          <TreeNodeToggle isExpanded={isExpanded} onClick={handleToggle} />
        )}
        <TreeNodeContent
          name={node.name}
          childrenLength={node.children.length}
          isRootNode={isRootNode}
          onAdd={() => onOpenPopup(PopupTypes.Add, node.name, node.id)}
          onEdit={() => onOpenPopup(PopupTypes.Edit, node.name, node.id)}
          onDelete={() =>
            onOpenPopup(
              PopupTypes.Delete,
              node.name,
              node.id,
              node.children.length
            )
          }
        />
      </Box>
      {node.children.length > 0 && isExpanded && (
        <Box className={styles.treeNode__children}>
          {node.children.map((childNode) => (
            <TreeNode
              key={childNode.id}
              isRootNode={false}
              node={childNode}
              onOpenPopup={onOpenPopup}
              expandedNodeIds={expandedNodeIds}
              onToggleNode={onToggleNode}
            />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TreeNode;
