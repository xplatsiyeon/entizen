import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ImgType {
  preQuotationChargerIdx?: number;
  preQuotationFileIdx?: number;
  finalQuotationChargerFileIdx?: number;
  finalQuotationChargerIdx?: number;
  productFileType?: string;
  url: string;
  size?: number;
  createdAt?: string;
  originalName?: string;
}
interface State {
  file?: ImgType[];
  // setOpenImgModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialState: State = {
  file: [],
};

const slice = createSlice({
  name: 'imgDetailSlice',
  initialState,
  reducers: {
    setFile(state, action: PayloadAction<ImgType[]>) {
      state.file = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const imgDetailAction = slice.actions;
export const imgDetailSlice = slice;
