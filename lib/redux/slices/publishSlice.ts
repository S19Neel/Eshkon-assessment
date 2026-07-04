import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PublishResult {
  version: string;
  changelog: string;
  timestamp: string;
}

interface PublishState {
  isPublishing: boolean;
  publishResult: PublishResult | null;
  error: string | null;
}

const initialState: PublishState = {
  isPublishing: false,
  publishResult: null,
  error: null,
};

export const publishSlice = createSlice({
  name: "publish",
  initialState,
  reducers: {
    setPublishing: (state, action: PayloadAction<boolean>) => {
      state.isPublishing = action.payload;
      if (action.payload) {
        state.error = null;
      }
    },
    setPublishResult: (state, action: PayloadAction<PublishResult>) => {
      state.isPublishing = false;
      state.publishResult = action.payload;
      state.error = null;
    },
    setPublishError: (state, action: PayloadAction<string>) => {
      state.isPublishing = false;
      state.error = action.payload;
    },
    resetPublish: (state) => {
      state.isPublishing = false;
      state.publishResult = null;
      state.error = null;
    },
  },
});

export const { setPublishing, setPublishResult, setPublishError, resetPublish } = publishSlice.actions;

export default publishSlice.reducer;
