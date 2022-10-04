import { createSlice } from '@reduxjs/toolkit';

interface WriteReviewType {
  kind: number;
  speed: number;
  pro: number;
  satisfy: number;
  reviewText: string;
}

interface WriteReviewContentTypes {
  reviewContent: WriteReviewType;
}

const initialState: WriteReviewContentTypes = {
  reviewContent: {
    kind: 0,
    speed: 0,
    pro: 0,
    satisfy: 0,
    reviewText: '',
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
