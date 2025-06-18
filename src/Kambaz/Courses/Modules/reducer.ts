import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  modules: [] as any[],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    // Modules
    setModules: (state, action) => {
      state.modules = action.payload;
    },
    addModule: (state, { payload: module }) => {
      const newModule: any = {
        _id: uuidv4(),
        course: module.course,
        name: module.name,
        lessons: [],
      };
      state.modules = [...state.modules, newModule] as any;
    },
    deleteModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.filter((m: any) => m._id !== moduleId);
    },
    updateModule: (state, { payload: module }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === module._id ? module : m
      ) as any;
    },
    editModule: (state, { payload: moduleId }) => {
      state.modules = state.modules.map((m: any) =>
        m._id === moduleId ? { ...m, editing: true } : m
      ) as any;
    },
    // For local state management (no API call needed)
    editLesson: (state, { payload: { moduleId, lessonId } }) => {
      state.modules = state.modules.map((module: any) =>
        module._id === moduleId
          ? {
              ...module,
              lessons: module.lessons.map((lesson: any) =>
                lesson._id === lessonId ? { ...lesson, editing: true } : lesson
              ),
            }
          : module
      ) as any;
    },
  },
});

export const {
  setModules,
  addModule,
  deleteModule,
  updateModule,
  editModule,
  editLesson,
} = modulesSlice.actions;

export default modulesSlice.reducer;
