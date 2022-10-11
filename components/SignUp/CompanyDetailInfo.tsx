import styled from '@emotion/styled';
import React, { Dispatch, SetStateAction } from 'react';
import colors from 'styles/colors';

type Props = {
  companyName: string;
  setCompanyName: Dispatch<SetStateAction<string>>;
  postNumber: string;
  setPostNumber: Dispatch<SetStateAction<string>>;
  companyAddress: string;
  setCompanyAddress: Dispatch<SetStateAction<string>>;
  companyDetailAddress: string;
  setCompanyDetailAddress: Dispatch<SetStateAction<string>>;
};

const CompanyDetailInfo = ({
  companyName,
  setCompanyName,
  postNumber,
  setPostNumber,
  companyAddress,
  setCompanyAddress,
  companyDetailAddress,
  setCompanyDetailAddress,
}: Props) => {
  return (
    <>
      <Info>
        가입하실 아이디와
        <br />
        비밀번호를 설정해주세요
      </Info>
      <div>CompanyDetailInfo</div>
    </>
  );
};

const Info = styled.p`
  padding-top: 6pt;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  color: ${colors.main2};
`;

export default CompanyDetailInfo;
