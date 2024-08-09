import React from 'react';
import { Node } from '../../slices/treeSlice';
import TreeNodeContent from './TreeNodeContent';
import TreeNodeToggle from './TreeNodeToggle';
import styles from './Tree.module.css';
import { Box } from '@mui/material';

interface TreeNodeProps {
  isRootNode: boolean;
  node: Node;
  onOpenPopup: (
    header: string,
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
          onAdd={() => onOpenPopup('Add', node.name, node.id)}
          onEdit={() => onOpenPopup('Edit', node.name, node.id)}
          onDelete={() =>
            onOpenPopup('Delete', node.name, node.id, node.children.length)
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
