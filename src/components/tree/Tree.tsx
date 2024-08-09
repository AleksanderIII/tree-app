import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchTreeData, toggleNodeExpansion } from '../../slices/treeSlice';
import TreeNode from './TreeNode';
import { openPopup } from '../../slices/popupSlice';

const Tree: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { node, loading, error, expandedNodeIds } = useSelector(
    (state: RootState) => state.tree
  );

  useEffect(() => {
    dispatch(fetchTreeData());
  }, [dispatch]);

  const handleOpenPopup = (
    header: string,
    nodeName: string,
    nodeId?: number,
    childrenLength?: number
  ) => {
    dispatch(openPopup({ header, nodeName, nodeId, childrenLength }));
  };

  const handleToggleNode = (nodeId: number) => {
    dispatch(toggleNodeExpansion(nodeId));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {node ? (
        <TreeNode
          node={node}
          isRootNode={true}
          onOpenPopup={handleOpenPopup}
          expandedNodeIds={expandedNodeIds}
          onToggleNode={handleToggleNode}
        />
      ) : (
        'empty tree'
      )}
    </>
  );
};

export default Tree;
