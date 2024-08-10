import { ITreeState } from './treeTypes';

export const initialState: ITreeState = {
  node: null,
  expandedNodeIds: [],
  loading: false,
  error: null,
};
