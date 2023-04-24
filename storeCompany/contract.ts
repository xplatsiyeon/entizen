import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  step: number;
  productPrice: string;
  installationCost: string;
  subscriptionFee: string;
  extensionSubscriptionFee: string;
  otherSpecifics: string;
  productExplanation: string;
  invoiceDeliveryDate: string;
  subscriptionPaymentDate: string;
  deadlineDate: string;
  paymentDeadlineDate: string;
  handlingFee: string;
  penalty: string;
  companyRegistrationNumber: string;
  representativeName: string;
};

const initialState: State = {
  step: 0,
  productPrice: '',
  installationCost: '',
  subscriptionFee: '',
  extensionSubscriptionFee: '',
  otherSpecifics: '',
  productExplanation: '',
  invoiceDeliveryDate: '',
  subscriptionPaymentDate: '',
  deadlineDate: '',
  paymentDeadlineDate: '',
  handlingFee: '',
  penalty: '',
  companyRegistrationNumber: '',
  representativeName: '',
};

const slice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<number>) {
      state.step = action.payload;
    },
    // 섹션 1
    setProductPrice(state, action: PayloadAction<string>) {
      state.productPrice = action.payload;
    },
    setInstallationCost(state, action: PayloadAction<string>) {
      state.installationCost = action.payload;
    },
    // 섹션 2
    setSubscribe(state, action: PayloadAction<string>) {
      state.subscriptionFee = action.payload;
    },
    // 섹션 3
    setExtensionSubscriptionFee(state, action: PayloadAction<string>) {
      state.extensionSubscriptionFee = action.payload;
    },
    // 섹션 4
    setOtherSpecifics(state, action: PayloadAction<string>) {
      state.otherSpecifics = action.payload;
    },
    // 섹션 5
    setProductExplanation(state, action: PayloadAction<string>) {
      state.productExplanation = action.payload;
    },
    // 섹션 6
    setInvoiceDeliveryDate(state, action: PayloadAction<string>) {
      state.invoiceDeliveryDate = action.payload;
    },
    setSubscriptionPaymentDate(state, action: PayloadAction<string>) {
      state.subscriptionPaymentDate = action.payload;
    },
    // 섹션 7
    setDeadlineDate(state, action: PayloadAction<string>) {
      state.deadlineDate = action.payload;
    },
    setPaymentDeadlineDate(state, action: PayloadAction<string>) {
      state.paymentDeadlineDate = action.payload;
    },
    setHandlingFee(state, action: PayloadAction<string>) {
      state.handlingFee = action.payload;
    },
    // 섹션 8
    setPenalty(state, action: PayloadAction<string>) {
      state.penalty = action.payload;
    },
    // 섹션 9
    setCompanyRegistrationNumber(state, action: PayloadAction<string>) {
      state.companyRegistrationNumber = action.payload;
    },
    setRepresentativeName(state, action: PayloadAction<string>) {
      state.representativeName = action.payload;
    },
    reset(state) {
      Object.assign(state, initialState);
    },
  },
});

export const contractAction = slice.actions;
export const contractSlice = slice;
