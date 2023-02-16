import { createSlice } from '@reduxjs/toolkit';

interface GraphBoolean {
  unavailableGraph: boolean;
}

const initialState: GraphBoolean = {
  unavailableGraph: false,
};

const slice = createSlice({
  name: 'unavailableGraphBoolean',
  initialState,
  reducers: {
    setUnavailableGraph(state, action) {
      state.unavailableGraph = action.payload;
    },
  },
});

export const unavailableGraphAction = slice.actions;
export const unavailableGraphSlice = slice;
