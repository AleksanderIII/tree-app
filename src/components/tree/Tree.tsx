import { useEffect, useState } from 'react';
import TreeNode from './TreeNode';
import { ITreeNode } from './types';

const Tree = () => {
  const [treeData, setTreeData] = useState<ITreeNode | null>(null);
  useEffect(() => {
    fetch(
      'https://test.vmarmysh.com/api.user.tree.get?treeName=alex-llewton-tree',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setTreeData(data));
  }, []);

  return <>{treeData ? <TreeNode {...treeData} /> : 'empty tree'}</>;
};

export default Tree;
