import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  origin: null,
  destination: null,
  timeInformations: null,
};
export const rikwestSlice = createSlice({
  name: 'rikwest',
  initialState,
  reducers: {
    setOrigin: (state, action) => {
      state.origin = action.payload;
    },
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
    setTimeInformations: (state, action) => {
      state.timeInformations = action.payload;
    },
  },
});

export default rikwestSlice.reducer;
export const { setDestination, setOrigin, setTimeInformations } =
  rikwestSlice.actions;
export const selectOrigin = (action) => action.rikwest.origin;
export const selectDestination = (action) => action.rikwest.destination;
export const selectTimeInformations = (action) =>
  action.rikwest.timeInformations;
