import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Toast {
  message: string;
  type: "success" | "error" | "info";
}

interface UiState {
  activeTab: "edit" | "preview" | "json";
  selectedSectionId: string | null;
  toast: Toast | null;
}

const initialState: UiState = {
  activeTab: "edit",
  selectedSectionId: null,
  toast: null,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveTab: (
      state,
      action: PayloadAction<"edit" | "preview" | "json">
    ) => {
      state.activeTab = action.payload;
    },
    setSelectedSectionId: (state, action: PayloadAction<string | null>) => {
      state.selectedSectionId = action.payload;
    },
    showToast: (state, action: PayloadAction<Toast>) => {
      state.toast = action.payload;
    },
    clearToast: (state) => {
      state.toast = null;
    },
  },
});

export const { setActiveTab, setSelectedSectionId, showToast, clearToast } =
  uiSlice.actions;

export default uiSlice.reducer;
