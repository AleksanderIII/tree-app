import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export enum PopupTypes {
  Add = 'Add',
  Edit = 'Edit',
  Delete = 'Delete',
}

interface PopupContent {
  nodeName: string;
}

interface PopupState {
  type: PopupTypes | null;
  isOpen: boolean;
  content: PopupContent;
  nodeId?: number;
  childrenLength?: number;
}

const initialState: PopupState = {
  type: null,
  isOpen: false,
  content: { nodeName: '' },
  nodeId: undefined,
  childrenLength: undefined,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopup(
      state,
      action: PayloadAction<{
        type: PopupTypes;
        nodeName: string;
        nodeId?: number;
        childrenLength?: number;
      }>
    ) {
      state.isOpen = true;
      state.type = action.payload.type;
      state.content = {
        nodeName: action.payload.nodeName,
      };
      state.nodeId = action.payload.nodeId;
      state.childrenLength = action.payload.childrenLength;
    },
    closePopup(state) {
      state.isOpen = false;
      state.type = null;
      state.content = { nodeName: '' };
      state.nodeId = undefined;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;

export default popupSlice.reducer;
