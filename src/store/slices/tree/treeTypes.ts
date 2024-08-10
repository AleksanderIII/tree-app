import { Nullable } from '../../../models';

export interface INode {
  id: number;
  name: string;
  children: INode[];
}

export interface ITreeState {
  node: Nullable<INode>;
  expandedNodeIds: number[];
  loading: boolean;
  error: Nullable<Error>;
}

export interface IUpdateNodePayload {
  nodeId: number;
  updates: Partial<INode>;
}
