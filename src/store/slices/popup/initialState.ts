import { IPopupState } from './popupTypes';

export const initialState: IPopupState = {
  type: null,
  isOpen: false,
  content: { nodeName: '' },
  nodeId: undefined,
  childrenLength: undefined,
};
