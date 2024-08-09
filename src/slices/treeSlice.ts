import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  API_GET_TREE_URL,
  API_RENAME_NODE_URL,
  API_DELETE_NODE_URL,
  API_CREATE_NODE_URL,
} from '../api/endpoints';

export interface Node {
  id: number;
  name: string;
  children: Node[];
}

interface TreeState {
  node: Node | null;
  loading: boolean;
  error: Error | null;
}

const initialState: TreeState = {
  node: null,
  loading: false,
  error: null,
};

export const fetchTreeData = createAsyncThunk<Node>(
  'tree/fetchTreeData',
  async () => {
    const response = await fetch(API_GET_TREE_URL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch tree data');
    }
    return response.json();
  }
);

export const renameNode = createAsyncThunk<
  void,
  { nodeId: number; newName: string }
>('tree/renameNode', async ({ nodeId, newName }, { dispatch }) => {
  const response = await fetch(
    `${API_RENAME_NODE_URL}&nodeId=${nodeId}&newNodeName=${newName}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to rename node');
  }

  dispatch(updateNodeName({ nodeId, newName }));
});

export const deleteNode = createAsyncThunk<void, number>(
  'tree/deleteNode',
  async (nodeId, { dispatch }) => {
    const response = await fetch(`${API_DELETE_NODE_URL}&nodeId=${nodeId}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to delete node');
    }

    dispatch(removeNode({ nodeId }));
  }
);

export const addNode = createAsyncThunk<
  void,
  { parentNodeId: number; nodeName: string }
>('tree/addNode', async ({ parentNodeId, nodeName }, { dispatch }) => {
  const response = await fetch(
    `${API_CREATE_NODE_URL}&parentNodeId=${parentNodeId}&nodeName=${nodeName}`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
    }
  );

  if (!response.ok) {
    throw new Error('Failed to add node');
  }

   dispatch(addNodeToTree({ parentNodeId, nodeName }));
});

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    updateNodeName: (
      state,
      action: PayloadAction<{ nodeId: number; newName: string }>
    ) => {
      const { nodeId, newName } = action.payload;

      const updateNode = (node: Node | null): void => {
        if (!node) return;

        for (const child of node.children) {
          if (child.id === nodeId) {
            child.name = newName;
          }
          if (child.children) {
            updateNode(child);
          }
        }
      };

      updateNode(state.node);
    },
    removeNode: (state, action: PayloadAction<{ nodeId: number }>) => {
      const { nodeId } = action.payload;

      const removeNode = (nodes: Node[]): Node[] => {
        return nodes.filter((node) => {
          if (node.id === nodeId) {
            return false;
          }
          node.children = removeNode(node.children);
          return true;
        });
      };

      if (state.node) {
        state.node.children = removeNode(state.node.children);
      }
    },
    addNodeToTree: (
      state,
      action: PayloadAction<{ parentNodeId: number; nodeName: string }>
    ) => {
      const { parentNodeId, nodeName } = action.payload;

      const addNode = (nodes: Node[]): void => {
        for (const node of nodes) {
          if (node.id === parentNodeId) {
            node.children.push({
              id: Date.now(),
              name: nodeName,
              children: [],
            });
          } else if (node.children.length > 0) {
            addNode(node.children);
          }
        }
      };

      if (state.node) {
        addNode(state.node.children);
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
        (state, action: PayloadAction<Node>) => {
          state.node = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchTreeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as Error;
      })
      .addCase(renameNode.rejected, (state, action) => {
        state.error = action.error as Error;
      });
  },
});

export const { updateNodeName, removeNode, addNodeToTree } = treeSlice.actions;
export default treeSlice.reducer;
