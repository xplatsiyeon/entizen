import React from 'react';
import AsRequest from './AsRequest';
import AsRequestWriteReview from './AsRequestWriteReview';

type Props = {};

const AsRequestEndReview = (props: Props) => {
  return (
    <>
      <AsRequest />
      <AsRequestWriteReview />
    </>
  );
};

export default AsRequestEndReview;
