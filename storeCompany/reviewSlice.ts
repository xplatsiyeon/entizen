import { createSlice } from '@reduxjs/toolkit';

interface WriteReviewType {
  attentivenessPoint: number;
  quicknessPoint: number;
  professionalismPoint: number;
  satisfactionPoint: number;
  opinion: string;
}

interface WriteReviewContentTypes {
  reviewContent: WriteReviewType;
}

const initialState: WriteReviewContentTypes = {
  reviewContent: {
    attentivenessPoint: 0,
    quicknessPoint: 0,
    professionalismPoint: 0,
    satisfactionPoint: 0,
    opinion: '',
  },
};

const slice = createSlice({
  name: 'reviewContent',
  initialState,
  reducers: {
    write(state, action) {
      state.reviewContent = action.payload;
    },
  },
});

export const reviewAction = slice.actions;
export const reviewContents = slice;
