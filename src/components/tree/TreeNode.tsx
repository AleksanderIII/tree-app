import { useState } from 'react';
import { ITreeNode } from './types';
import TreeNodeToggle from './TreeNodeToggle';
import TreeNodeContent from './TreeNodeContent';
import { usePopup } from '../../context/PopupContext';
import styles from './Tree.module.css';

const TreeNode: React.FC<ITreeNode> = ({ name, children, id }) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const { openPopup } = usePopup();

  const handleAddClick = () => {
    openPopup({
      header: 'Add',
      body: <input type='text' placeholder='Enter node name' />,
      footer: null,
      nodeId: null,
      nodeName: '',
    });
  };

  const handleEditClick = () => {
    openPopup({
      header: 'Edit',
      body: (
        <input type='text' defaultValue={name} placeholder='Edit node name' />
      ),
      footer: null,
      nodeId: id,
      nodeName: name,
    });
  };

  const handleDeleteClick = () => {
    console.log('Delete', name);
  };

  return (
    <div className={styles.treeNode}>
      <div className={styles.treeNode__content}>
        {children.length > 0 && (
          <TreeNodeToggle
            isExpanded={isExpanded}
            onClick={() => setIsExpanded((prev) => !prev)}
          />
        )}
        <TreeNodeContent
          name={name}
          childrenLength={children.length}
          onAdd={handleAddClick}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </div>
      {isExpanded && children.length > 0 && (
        <div className={styles.treeNode__children}>
          {children.map((child) => (
            <TreeNode key={child.id} {...child} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
