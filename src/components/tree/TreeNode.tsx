import { useState } from 'react';

import Button from '../button/Button';
import { usePopup } from '../../context/PopupContext';

import { ITreeNode } from './types';

import styles from './Tree.module.css';

const TreeNode = ({ name, children }: ITreeNode) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const { openPopup } = usePopup();

  const handleAddClick = () => {
    openPopup({
      header: 'Add',
      body: <input type='text' placeholder='Enter node name' />,
      footer: null,
    });
  };

  const handleEditClick = () => {
    openPopup({
      header: 'Edit',
      body: (
        <input type='text' defaultValue={name} placeholder='Enter new name' />
      ),
      footer: null,
    });
  };
  const handleDeleteClick = () => {
    console.log('Delete', name);
  };

  return (
    <div className={styles.treeNode}>
      <div
        className={styles.treeNode__content}
        onClick={() => setIsExpanded((expanded) => !expanded)}
      >
        {children.length ? (
          <span>
            {isExpanded ? <span>&#9660;</span> : <span>&#9658;</span>}
          </span>
        ) : null}
        <div>{name}</div>
        <Button color='green' handleClick={handleAddClick}>
          &#43;
        </Button>
        <Button color='blue' handleClick={handleEditClick}>
          &#9998;
        </Button>
        <Button color='red' handleClick={handleDeleteClick}>
          &#10006;
        </Button>
      </div>
      {isExpanded ? (
        <div style={{ marginLeft: '15px' }}>
          {children.length ? (
            <>
              {children.map((child) => (
                <TreeNode key={child.id} {...child} />
              ))}
            </>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default TreeNode;
