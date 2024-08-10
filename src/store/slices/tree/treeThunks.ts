import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  API_GET_TREE_URL,
  API_RENAME_NODE_URL,
  API_DELETE_NODE_URL,
  API_CREATE_NODE_URL,
} from '../../../api/endpoints';
import { removeNodeLocally, updateNodeLocally } from './treeSlice';
import { INode } from './treeTypes';

export const fetchTreeData = createAsyncThunk<INode>(
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

export const fetchTreeDataWithoutLoading = createAsyncThunk<INode>(
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

  dispatch(updateNodeLocally({ nodeId, updates: { name: newName } }));
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

    dispatch(removeNodeLocally(nodeId));
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

  dispatch(fetchTreeDataWithoutLoading());
});
