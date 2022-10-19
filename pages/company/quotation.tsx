import CompanyQuotations from 'componentsCompany/CompanyQuotation';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { myEstimateAction } from 'storeCompany/myQuotation';

type Props = {};

const Quotation = (props: Props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(myEstimateAction.reset());
  }, []);
  return (
    <>
      <CompanyQuotations />
    </>
  );
};

export default Quotation;
