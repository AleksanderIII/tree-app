import React from 'react';
import { Box } from '@mui/material';

import TreeNodeContent from './TreeNodeContent';
import TreeNodeToggle from './TreeNodeToggle';
import {
  IOpenPopupPayload,
  PopupTypes,
} from '../../../store/slices/popup/popupTypes';
import { INode } from '../../../store/slices/tree/treeTypes';

import styles from '../Tree.module.css';

interface ITreeNodeProps {
  isRootNode: boolean;
  node: INode;
  onOpenPopup: (payload: IOpenPopupPayload) => void;
  expandedNodeIds: number[];
  onToggleNode: (nodeId: number) => void;
}

const TreeNode: React.FC<ITreeNodeProps> = ({
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
  const popupPayload = {
    nodeName: node.name,
    nodeId: node.id,
    childrenLength: node.children.length,
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
          onAdd={() => onOpenPopup({ ...popupPayload, type: PopupTypes.Add })}
          onEdit={() => onOpenPopup({ ...popupPayload, type: PopupTypes.Edit })}
          onDelete={() =>
            onOpenPopup({ ...popupPayload, type: PopupTypes.Delete })
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
