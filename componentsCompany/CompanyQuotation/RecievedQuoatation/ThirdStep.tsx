import React, { Dispatch, SetStateAction } from 'react';

type Props = {
  tabNumber: number;
  setTabNumber: Dispatch<SetStateAction<number>>;
  canNext: boolean;
  SetCanNext: Dispatch<SetStateAction<boolean>>;
};

const ThirdStep = ({ tabNumber, setTabNumber, canNext, SetCanNext }: Props) => {
  return <div>ThirdStep</div>;
};

export default ThirdStep;
