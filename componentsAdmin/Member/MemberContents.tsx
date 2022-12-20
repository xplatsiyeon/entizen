import styled from '@emotion/styled';
import React from 'react';
import FileImg from 'public/adminImages/File.png';
import Image from 'next/image';
import { CompanyResposne, UserRespnse } from './CommonDetail';

type Props = {
  type: 'USER' | 'COMPANY';
  data: UserRespnse | CompanyResposne;
};

const MemberContents = ({ type, data }: Props) => {
  console.log(data);
  return (
    <Contents>
      {type === 'USER' ? (
        <>
          <li>
            <label className="label">아이디</label>
            <InputBox type="text" readOnly value={'subin1'} />
          </li>
          <li>
            <label className="label">이름</label>
            <span>수빈</span>
          </li>
          <li>
            <label className="label">전화번호</label>
            <span>010-4998-8965</span>
          </li>
          <li>
            <label className="label">가입날짜</label>
            <span>2011.11.12</span>
          </li>
        </>
      ) : (
        <Company>
          <li>
            <label className="comapny label">기업명</label>
            <InputBox type="text" value={'엔티즌'} />
          </li>
          <li>
            <label className="comapny label">아이디</label>
            <InputBox type="text" value={'subin1'} />
          </li>
          <li>
            <label className="comapny label">담당자</label>
            <span>홍길동</span>
          </li>
          <li>
            <label className="comapny label">이메일</label>
            <InputBox type="text" value={'whljm1003@naver.com'} />
          </li>
          <li>
            <label className="comapny label">전화번호</label>
            <span>010-4998-8965</span>
          </li>
          <li>
            <label className="comapny label">주소</label>
            <InputBox
              type="text"
              readOnly
              value={'공황대로'}
              className="address"
            />
          </li>
          <li>
            <label className="comapny label">사업자 등록증</label>
            <div className="business">
              <span className="businessName">
                <Image src={FileImg} alt="file-img" width={16} height={16} />
                사입자 등록증.jpg
              </span>
              <button className="businessBtn">삭제</button>
            </div>
          </li>
          <li>
            <label className="comapny label">가입날짜</label>
            <span>2011.11.12</span>
          </li>
          <li>
            <label className="comapny label">가입승인</label>
            <select name="" className="selectBox">
              <option value="">미승인</option>
              <option value="">승인</option>
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
    justify-content: center;
    align-items: center;
    gap: 10px;
  }
  .businessName {
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 400;
    font-size: 16px;
    line-height: 150%;
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
