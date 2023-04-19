import styled from '@emotion/styled';
import React from 'react';
import colors from 'styles/colors';
import Back from 'public/adminImages/Back.png';
import Image from 'next/image';
import jwt_decode from 'jwt-decode';
import { AdminJwtTokenType } from 'pages/signin';

type Props = {
  type: 'main' | 'detail' | 'text' | 'admin';
  title: string;
  subTitle?: string;
  backBtn?: () => void;
  exelHide?: boolean;
  deleteBtn?: boolean;
  deleteFn?: () => void;
  WriteModalHandle?: () => void;
  detailApprove?: boolean;
  detailModify?: () => void;
  excelData?: any;
  etcModify?: () => void;
};

const AdminHeader = ({
  type,
  title,
  subTitle,
  backBtn,
  exelHide,
  deleteBtn,
  deleteFn,
  WriteModalHandle,
  detailApprove,
  detailModify,
  excelData,
  etcModify,
}: Props) => {
  const accessToken = JSON.parse(sessionStorage.getItem('ADMIN_ACCESS_TOKEN')!);

  const token: AdminJwtTokenType | undefined = accessToken
    ? jwt_decode(accessToken!)
    : undefined;

  // isRepresentativeAdmin true면 슈퍼관리자 false면 일반관리자

  return (
    <>
      {type === 'main' && (
        <Wrapper onClick={() => {}}>
          <h1>{title}</h1>
          <p>{subTitle}</p>
        </Wrapper>
      )}
      {type === 'detail' && (
        <DetailWrapper>
          <button className="backBtn" onClick={backBtn}>
            <div className="imgBox">
              <Image src={Back} alt={'back'} layout="fill" />
            </div>
            이전 페이지
          </button>

          <div className="sencondLine">
            <span className="title">
              <h1>{title}</h1>
              <p>{subTitle}</p>
            </span>
            {exelHide && (
              <ButtonBox>
                <button
                  className="btn"
                  onClick={() => {
                    if (detailApprove !== undefined) {
                      detailModify!();
                    }
                    if (etcModify) {
                      etcModify();
                    }
                  }}
                >
                  수정
                </button>
              </ButtonBox>
            )}
          </div>
        </DetailWrapper>
      )}
      {type === 'admin' && (
        <DetailWrapper>
          <button className="backBtn" onClick={backBtn}>
            <div className="imgBox">
              <Image src={Back} alt={'back'} layout="fill" />
            </div>
            이전 페이지
          </button>
          {token && token?.isRepresentativeAdmin === true && (
            <div className="sencondLine">
              <span className="title">
                <h1>{title}</h1>
                <p>{subTitle}</p>
              </span>
              {deleteBtn && (
                <button className="deleteBtn" onClick={deleteFn}>
                  아이디 삭제
                </button>
              )}
            </div>
          )}
        </DetailWrapper>
      )}
      {type === 'text' && (
        <DetailWrapper>
          <button className="backBtn" onClick={WriteModalHandle}>
            <div className="imgBox">
              <Image src={Back} alt={'back'} layout="fill" />
            </div>
            이전 페이지
          </button>

          <div className="sencondLine">
            <span className="title">
              <h1>{title}</h1>
              <p>{subTitle}</p>
            </span>
          </div>
        </DetailWrapper>
      )}
    </>
  );
};

export default AdminHeader;

const Wrapper = styled.div`
  margin-top: 60pt;
  /* margin-left: 18pt; */
  margin-bottom: 12pt;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 6pt;

  h1 {
    font-weight: 500;
    font-size: 18pt;
    line-height: 150%;
    color: ${colors.dark2};
  }
  p {
    font-weight: 500;
    font-size: 12pt;
    line-height: 150%;
    color: ${colors.dark2};
  }
`;

const DetailWrapper = styled.div`
  margin-top: 60pt;
  /* margin-left: 18pt; */
  margin-bottom: 12pt;

  width: 100%;
  .backBtn {
    display: flex;
    align-items: center;
    gap: 3px;
    margin-bottom: 25px;
    padding: 4px 6px;
    color: ${colors.lightWhite};
    background-color: #464646;
    border-radius: 4px;
    font-weight: 500;
    font-size: 14px;
    height: 29px;
    cursor: pointer;
  }
  .sencondLine {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  h1 {
    font-weight: 500;
    font-size: 18pt;
    line-height: 150%;
    color: ${colors.dark2};
  }
  p {
    font-weight: 500;
    font-size: 12pt;
    line-height: 150%;
    color: ${colors.dark2};
  }
  .excelBtn {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    background: ${colors.gray2};
    color: ${colors.lightWhite};
    padding: 3px 6px;
    cursor: pointer;
  }
  .deleteBtn {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    padding: 3px 6px;
    cursor: pointer;
    border: 1px solid ${colors.gray5};
    border-radius: 4px;
    color: ${colors.lightWhite};
    background: ${colors.gray2};
  }
  .title {
    display: flex;
    gap: 6pt;
    align-items: center;
  }
  .imgBox {
    position: relative;
    top: -2px;
    display: flex;
    width: 12px;
    height: 12px;
  }
`;
const ButtonBox = styled.div`
  display: flex;
  justify-content: flex-end;
  /* width: 100%; */
  gap: 12px;
  margin-top: 16px;
  .btn {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    text-align: center;
    color: ${colors.lightWhite};
    min-width: 64px;
    height: 26px;
    background: #747780;
    border: 1px solid #464646;
    border-radius: 2px;
    cursor: pointer;
  }
  .excelBtn {
    font-weight: 400;
    font-size: 14px;
    line-height: 150%;
    color: ${colors.gray2};
    padding: 3px 6px;
    cursor: pointer;
  }
`;
