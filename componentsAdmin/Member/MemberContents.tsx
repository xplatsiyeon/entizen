import styled from '@emotion/styled';
import React, { useState } from 'react';
import FileImg from 'public/adminImages/File.png';
import Image from 'next/image';
import { CompanyResposne, UserRespnse } from './CommonDetail';
import {
  adminDateFomat,
  hyphenFn,
  isAdminJoinApprovedBoolean,
} from 'utils/calculatePackage';

type Props = {
  type: 'USER' | 'COMPANY';
  userData: UserRespnse;
  CompanyData: CompanyResposne;
  setApprove: React.Dispatch<React.SetStateAction<boolean>>;
  approve: boolean;
  currentApprove?: string;
  setSelectValue: React.Dispatch<React.SetStateAction<string | undefined>>;
  selectValue?: string;
};

const MemberContents = ({
  type,
  userData,
  CompanyData,
  setApprove,
  approve,
  currentApprove,
  setSelectValue,
  selectValue,
}: Props) => {
  return (
    <Contents>
      {type === 'USER' ? (
        <>
          <li>
            <label className="label">아이디</label>
            <span>{userData?.data?.member?.id}</span>
          </li>
          <li>
            <label className="label">이름</label>
            <span>{userData?.data?.member?.name}</span>
          </li>
          <li>
            <label className="label">전화번호</label>
            <span>{hyphenFn(userData?.data?.member?.phone)}</span>
          </li>
          <li>
            <label className="label">가입날짜</label>
            <span>{adminDateFomat(userData?.data?.member?.createdAt)}</span>
          </li>
        </>
      ) : (
        <Company>
          <li>
            <label className="comapny label">기업명</label>
            {/* <InputBox
              type="text"
              readOnly
              value={
                CompanyData?.data?.member?.companyMemberAdditionalInfo
                  ?.companyName
              }
              /> */}
            <span>
              {
                CompanyData?.data?.member?.companyMemberAdditionalInfo
                  ?.companyName
              }
            </span>
          </li>
          <li>
            <label className="comapny label">아이디</label>
            <span>{CompanyData?.data?.member?.id}</span>
          </li>
          <li>
            <label className="comapny label">담당자</label>
            <span>{CompanyData?.data?.member?.name}</span>
          </li>
          <li>
            <label className="comapny label">이메일</label>
            <span>
              {
                CompanyData?.data?.member?.companyMemberAdditionalInfo
                  ?.managerEmail
              }
            </span>
          </li>
          <li>
            <label className="comapny label">전화번호</label>
            <span>{hyphenFn(CompanyData?.data?.member?.phone)}</span>
          </li>
          <li>
            <label className="comapny label">주소</label>
            {/* <InputBox
              type="text"
              readOnly
              value={
                CompanyData?.data?.member?.companyMemberAdditionalInfo
                  ?.companyDetailAddress
              }
              className="address"
              /> */}
            <span>
              {
                CompanyData?.data?.member?.companyMemberAdditionalInfo
                  ?.companyDetailAddress
              }
            </span>
          </li>
          <li>
            <label className="comapny label">사업자 등록증</label>
            <div className="business">
              {CompanyData?.data?.member?.businessRegistrationFiles?.map(
                (item, index) => (
                  <span className="businessName" key={index}>
                    <Atag href={item?.url} download={item?.originalName}>
                      <Image
                        src={FileImg}
                        alt="file-img"
                        width={16}
                        height={16}
                      />

                      <BusinessName>{item.originalName}</BusinessName>
                    </Atag>
                    <button
                      className="businessBtn"
                      onClick={() => {
                        alert('개발중입니다.');
                      }}
                    >
                      삭제
                    </button>
                  </span>
                ),
              )}
            </div>
          </li>
          <li>
            <label className="comapny label">가입날짜</label>
            <span>{adminDateFomat(CompanyData?.data?.member?.createdAt)}</span>
          </li>
          <li>
            <label className="comapny label">가입승인</label>
            <select
              name=""
              style={{ cursor: 'pointer' }}
              value={selectValue}
              className="selectBox"
              onChange={(e) => {
                const { value } = e.target;
                if (value !== undefined) {
                  const approveBoolean = isAdminJoinApprovedBoolean(value);
                  setSelectValue(value);
                  if (approveBoolean !== undefined) {
                    setApprove(approveBoolean);
                  }
                }
              }}
            >
              <option value="미승인">미승인</option>
              <option value="승인">승인</option>
            </select>
          </li>
        </Company>
      )}
    </Contents>
  );
};

export default MemberContents;

const Contents = styled.ul`
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #000000;
  list-style: none;
  padding-left: 0px;

  li {
    display: flex;
    gap: 34px;
    :not(:last-child) {
      margin-bottom: 14px;
    }
  }
  .label {
    width: 59px;
  }
  .comapny {
    width: 92px;
  }
`;
const InputBox = styled.input`
  width: 169px;
  height: 28px;
  left: 512px;
  top: 246px;

  background: #ffffff;
  border: 1px solid #e2e5ed;
  border-radius: 2px;
  padding-top: 4px;
  padding-left: 8px;
  font-weight: 400;
  font-size: 14px;
  line-height: 150%;
  /* identical to box height, or 21px */

  color: #000000;
  &.address {
    width: 354px;
  }
`;
const Company = styled.div`
  .business {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .businessName {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    /* identical to box height, or 24px */
    color: #747780;
    border: 1px solid #a6a9b0;
    border-radius: 2px;
    padding: 4px 14px 4px 10px;
    gap: 8px;
  }
  .businessBtn {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    /* identical to box height, or 21px */
    background: none;
    text-decoration-line: underline;

    color: #747780;
  }
  .selectBox {
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
    /* identical to box height, or 24px */

    text-align: center;

    color: #000000;
  }
`;

const BusinessName = styled.p`
  width: 200px;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Atag = styled.a`
  display: flex;
  align-items: center;
  color: #222222;
  gap: 10px;
  cursor: pointer;
  :hover {
    color: #5a2dc9;
  }
`;
