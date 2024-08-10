import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import {
  addNode,
  deleteNode,
  fetchTreeData,
  fetchTreeDataWithoutLoading,
  renameNode,
} from './treeThunks';
import { INode, IUpdateNodePayload } from './treeTypes';
import { Nullable } from '../../../models';

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    updateNodeLocally(state, action: PayloadAction<IUpdateNodePayload>) {
      const { nodeId, updates } = action.payload;
      const updateNode = (node: Nullable<INode>): Nullable<INode> => {
        if (!node) return null;
        if (node.id === nodeId) {
          return { ...node, ...updates };
        }
        return {
          ...node,
          children: node.children.map(updateNode).filter(Boolean) as INode[],
        };
      };
      state.node = updateNode(state.node);
    },
    removeNodeLocally(state, action: PayloadAction<number>) {
      const nodeId = action.payload;
      const removeNode = (nodes: INode[], idToRemove: number): INode[] => {
        return nodes.filter((node) => {
          if (node.id === idToRemove) return false;
          node.children = removeNode(node.children, idToRemove);
          return true;
        });
      };
      if (state.node) {
        state.node.children = removeNode(state.node.children, nodeId);
      }
    },
    toggleNodeExpansion(state, action: PayloadAction<number>) {
      const nodeId = action.payload;
      const index = state.expandedNodeIds.indexOf(nodeId);
      if (index > -1) {
        state.expandedNodeIds.splice(index, 1);
      } else {
        state.expandedNodeIds.push(nodeId);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchTreeData.fulfilled,
        (state, action: PayloadAction<INode>) => {
          state.node = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchTreeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as Error;
      })
      .addCase(
        fetchTreeDataWithoutLoading.fulfilled,
        (state, action: PayloadAction<INode>) => {
          state.node = action.payload;
        }
      )
      .addCase(renameNode.rejected, (state, action) => {
        state.error = action.error as Error;
      })
      .addCase(deleteNode.rejected, (state, action) => {
        state.error = action.error as Error;
      })
      .addCase(addNode.rejected, (state, action) => {
        state.error = action.error as Error;
      });
  },
});

export const { updateNodeLocally, removeNodeLocally, toggleNodeExpansion } =
  treeSlice.actions;
export default treeSlice.reducer;
