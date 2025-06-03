import { createSlice } from "@reduxjs/toolkit";
import { assignments as initialAssignmentGroups } from "../../Database";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignmentGroups: initialAssignmentGroups,
};

const assignmentsSlice = createSlice({
  name: "assignmentGroups",
  initialState,
  reducers: {
    // Assignment Group Actions
    addAssignmentGroup: (state, { payload }) => {
      state.assignmentGroups.push({
        _id: uuidv4(),
        ...payload, // groupName, courseId, weight
        assignments: [],
      });
    },
    updateAssignmentGroup: (state, { payload }) => {
      state.assignmentGroups = state.assignmentGroups.map((g: any) =>
        g._id === payload._id ? { ...g, ...payload } : g
      );
    },
    deleteAssignmentGroup: (state, { payload: groupId }) => {
      state.assignmentGroups = state.assignmentGroups.filter(
        (g: any) => g._id !== groupId
      );
    },
    // Assignment Item Actions
    addAssignment: (state, { payload }) => {
      const { groupId, assignment } = payload;
      const group = state.assignmentGroups.find((g: any) => g._id === groupId);
      if (group) {
        group.assignments.push({
          ...assignment,
          _id: uuidv4(),
        });
      }
    },
    deleteAssignment: (state, { payload }) => {
      const { groupId, assignmentId } = payload;
      const group = state.assignmentGroups.find((g: any) => g._id === groupId);
      if (group) {
        group.assignments = group.assignments.filter(
          (a: any) => a._id !== assignmentId
        );
      }
    },
    updateAssignment: (state, { payload }) => {
      const { groupId, assignment } = payload;
      const group = state.assignmentGroups.find((g: any) => g._id === groupId);
      if (group) {
        group.assignments = group.assignments.map((a: any) =>
          a._id === assignment._id ? { ...a, ...assignment } : a
        );
      }
    },
  },
});

export const {
  addAssignmentGroup,
  updateAssignmentGroup,
  deleteAssignmentGroup,
  addAssignment,
  deleteAssignment,
  updateAssignment,
} = assignmentsSlice.actions;

export default assignmentsSlice.reducer;
