import { Nullable } from '../../../models';

export enum PopupTypes {
  Add = 'Add',
  Edit = 'Edit',
  Delete = 'Delete',
}

export interface IPopupContent {
  nodeName: string;
}

export interface IPopupState {
  type: Nullable<PopupTypes>;
  isOpen: boolean;
  content: IPopupContent;
  nodeId?: number;
  childrenLength?: number;
}

export interface IOpenPopupPayload {
  type: PopupTypes;
  nodeName: string;
  nodeId?: number;
  childrenLength?: number;
}
