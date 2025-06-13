import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  assignmentGroups: [] as any[],
};

const assignmentsSlice = createSlice({
  name: "assignmentGroups",
  initialState,
  reducers: {
    setAssignmentGroups: (state, action) => {
      state.assignmentGroups = action.payload;
    },
    updateAssignmentGroup: (state, { payload }) => {
      const groupId = payload._id;
      state.assignmentGroups = state.assignmentGroups.map((g: any) =>
        g._id === groupId ? { ...g, ...payload } : g
      );
    },
    deleteAssignmentGroup: (state, { payload: groupId }) => {
      state.assignmentGroups = state.assignmentGroups.filter(
        (g: any) => g._id !== groupId
      );
    },
    addAssignment: (state, { payload }) => {
      const { groupId, assignment } = payload;
      const group = state.assignmentGroups.find((g: any) => g._id === groupId);
      if (group) {
        group.assignments.push(assignment);
      }
    },
  },
});

export const {
  setAssignmentGroups,
  updateAssignmentGroup,
  deleteAssignmentGroup,
  addAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
