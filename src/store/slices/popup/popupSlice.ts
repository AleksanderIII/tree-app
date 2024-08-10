import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { IOpenPopupPayload } from './popupTypes';
import { initialState } from './initialState';

const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopup(state, action: PayloadAction<IOpenPopupPayload>) {
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
