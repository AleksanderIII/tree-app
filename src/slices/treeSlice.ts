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
  expandedNodeIds: number[];
  loading: boolean;
  error: Error | null;
}

const initialState: TreeState = {
  node: null,
  expandedNodeIds: [],
  loading: false,
  error: null,
};

// Fetch the entire tree data
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

// Fetch the entire tree data without affecting loading state
export const fetchTreeDataWithoutLoading = createAsyncThunk<Node>(
  'tree/fetchTreeDataWithoutLoading',
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

// Rename a node
export const renameNode = createAsyncThunk<void, { nodeId: number; newName: string }>(
  'tree/renameNode',
  async ({ nodeId, newName }, { dispatch }) => {
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

    dispatch(updateNodeLocally({ nodeId, updates: { name: newName } }));
  }
);

// Delete a node
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

    dispatch(removeNodeLocally(nodeId));
  }
);

// Add a node
export const addNode = createAsyncThunk<void, { parentNodeId: number; nodeName: string }>(
  'tree/addNode',
  async ({ parentNodeId, nodeName }, { dispatch }) => {
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

    // Запрашиваем обновленное дерево после добавления нового узла
    dispatch(fetchTreeDataWithoutLoading()); // Обновляем данные без изменения состояния loading
  }
);

const treeSlice = createSlice({
  name: 'tree',
  initialState,
  reducers: {
    updateNodeLocally(state, action: PayloadAction<{ nodeId: number; updates: Partial<Node> }>) {
      const { nodeId, updates } = action.payload;
      const updateNode = (node: Node | null): Node | null => {
        if (!node) return null;
        if (node.id === nodeId) {
          return { ...node, ...updates };
        }
        return {
          ...node,
          children: node.children.map(updateNode).filter(Boolean) as Node[],
        };
      };
      state.node = updateNode(state.node);
    },
    removeNodeLocally(state, action: PayloadAction<number>) {
      const nodeId = action.payload;
      const removeNode = (nodes: Node[], idToRemove: number): Node[] => {
        return nodes.filter(node => {
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
        state.expandedNodeIds.splice(index, 1); // Удаление элемента
      } else {
        state.expandedNodeIds.push(nodeId); // Добавление элемента
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTreeData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTreeData.fulfilled, (state, action: PayloadAction<Node>) => {
        state.node = action.payload;
        state.loading = false;
      })
      .addCase(fetchTreeData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error as Error;
      })
      .addCase(fetchTreeDataWithoutLoading.fulfilled, (state, action: PayloadAction<Node>) => {
        state.node = action.payload;
      })
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

export const { updateNodeLocally, removeNodeLocally, toggleNodeExpansion } = treeSlice.actions;
export default treeSlice.reducer;