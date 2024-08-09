import React, { useEffect, useState } from 'react';
import TreeNode from './TreeNode';
import { ITreeNode } from './types';
import { API_GET_TREE_URL } from '../../api/endpoints';

const Tree: React.FC = () => {
  const [treeData, setTreeData] = useState<ITreeNode | null>(null);

  useEffect(() => {
    fetch(API_GET_TREE_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => setTreeData(data));
  }, []);

  return <>{treeData ? <TreeNode {...treeData} /> : 'empty tree'}</>;
};

export default Tree;
