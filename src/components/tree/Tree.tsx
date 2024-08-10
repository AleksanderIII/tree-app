import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { toggleNodeExpansion } from '../../store/slices/tree/treeSlice';
import TreeNode from './TreeNode';
import { openPopup } from '../../store/slices/popup/popupSlice';
import { fetchTreeData } from '../../store/slices/tree/treeThunks';
import { IOpenPopupPayload } from '../../store/slices/popup/popupTypes';

const Tree: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { node, loading, error, expandedNodeIds } = useSelector(
    (state: RootState) => state.tree
  );

  useEffect(() => {
    dispatch(fetchTreeData());
  }, [dispatch]);

  const handleOpenPopup = ({
    type,
    nodeName,
    nodeId,
    childrenLength,
  }: IOpenPopupPayload) => {
    dispatch(openPopup({ type, nodeName, nodeId, childrenLength }));
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
        'Empty Tree'
      )}
    </>
  );
};

export default Tree;
