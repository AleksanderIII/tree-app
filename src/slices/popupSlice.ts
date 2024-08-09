import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PopupContent {
  header: string;
  nodeName: string;
}

interface PopupState {
  isOpen: boolean;
  content: PopupContent;
  nodeId?: number;
}

const initialState: PopupState = {
  isOpen: false,
  content: { header: '', nodeName: '' },
  nodeId: undefined,
};

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopup(
      state,
      action: PayloadAction<{
        header: string;
        nodeName: string;
        nodeId?: number;
      }>
    ) {
      state.isOpen = true;
      state.content = {
        header: action.payload.header,
        nodeName: action.payload.nodeName,
      };
      state.nodeId = action.payload.nodeId;
    },
    closePopup(state) {
      state.isOpen = false;
      state.content = { header: '', nodeName: '' };
      state.nodeId = undefined;
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;

export default popupSlice.reducer;
