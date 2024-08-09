import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { openPopup } from '../../slices/popupSlice';
import { fetchTreeData } from '../../slices/treeSlice';
import TreeNode from './TreeNode';

const Tree: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { node, loading, error } = useSelector(
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      {node ? (
        <TreeNode node={node} isRootNode={true} onOpenPopup={handleOpenPopup} />
      ) : (
        'empty tree'
      )}
    </>
  );
};

export default Tree;
