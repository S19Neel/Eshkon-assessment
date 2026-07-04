import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Page, Section } from "@/lib/schema/page";

interface DraftPageState {
  page: Page | null;
  isDirty: boolean;
  isSaving: boolean;
  lastSaved: string | null;
}

const initialState: DraftPageState = {
  page: null,
  isDirty: false,
  isSaving: false,
  lastSaved: null,
};

export const draftPageSlice = createSlice({
  name: "draftPage",
  initialState,
  reducers: {
    setDraftPage: (state, action: PayloadAction<Page>) => {
      state.page = action.payload;
      state.isDirty = false;
    },
    addSection: (state, action: PayloadAction<Section>) => {
      if (state.page) {
        state.page.sections.push(action.payload);
        state.isDirty = true;
      }
    },
    removeSection: (state, action: PayloadAction<string>) => {
      if (state.page) {
        state.page.sections = state.page.sections.filter((s) => s.id !== action.payload);
        state.isDirty = true;
      }
    },
    reorderSections: (state, action: PayloadAction<{ startIndex: number; endIndex: number }>) => {
      if (state.page) {
        const result = Array.from(state.page.sections);
        const [removed] = result.splice(action.payload.startIndex, 1);
        result.splice(action.payload.endIndex, 0, removed);
        state.page.sections = result;
        state.isDirty = true;
      }
    },
    updateSectionProps: (
      state,
      action: PayloadAction<{ id: string; props: Record<string, unknown> }>
    ) => {
      if (state.page) {
        const section = state.page.sections.find((s) => s.id === action.payload.id);
        if (section) {
          section.props = { ...section.props, ...action.payload.props };
          state.isDirty = true;
        }
      }
    },
    setSaving: (state, action: PayloadAction<boolean>) => {
      state.isSaving = action.payload;
    },
    setSaved: (state, action: PayloadAction<string>) => {
      state.isSaving = false;
      state.isDirty = false;
      state.lastSaved = action.payload;
    },
  },
});

export const {
  setDraftPage,
  addSection,
  removeSection,
  reorderSections,
  updateSectionProps,
  setSaving,
  setSaved,
} = draftPageSlice.actions;

export default draftPageSlice.reducer;
