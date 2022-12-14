import React from 'react';

type Props = {
  setComponent?: React.Dispatch<React.SetStateAction<number>>;
};

const EditAddress = ({ setComponent }: Props) => {
  // 원버튼 모달 온클릭
  //setComponent(4)
  //   const handleModalYes = () => {
  //     sessionStorage.removeItem('key');

  //     if () setComponent!(1);
  //     /*router.push('/signin'); */
  //   };
  return <div>editAddress</div>;
};

export default EditAddress;
