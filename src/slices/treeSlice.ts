import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { API_GET_TREE_URL } from '../api/endpoints';

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

// Async thunk for fetching tree data
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
      });
  },
});

export const { updateNodeName } = treeSlice.actions;
export default treeSlice.reducer;