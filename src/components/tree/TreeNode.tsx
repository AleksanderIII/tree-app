import { useState } from 'react';
import { ITreeNode } from './types';

const TreeNode = ({ name, children }: ITreeNode) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div onClick={() => setIsExpanded((expanded) => !expanded)}>
        {children.length ? (
          <span>{isExpanded ? <span>{'|'}</span> : <span>{'>'}</span>}</span>
        ) : null}
        <span>{name}</span>
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
