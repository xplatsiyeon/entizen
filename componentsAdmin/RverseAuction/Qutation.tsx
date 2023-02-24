import styled from '@emotion/styled';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import colors from 'styles/colors';
import ExitBtn from 'public/adminImages/Group.png';
import FinalQuotaion from './FinalQuotation';
import Prequotion from './PreQuotation';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useDispatch } from 'react-redux';
import { adminReverseAction } from 'storeAdmin/adminReverseSlice';
import AdminHeader from 'componentsAdmin/Header';

type Props = {
  showSubMenu?: boolean;
  setNowHeight?: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const Qutation = ({ showSubMenu, setNowHeight }: Props) => {
  const [optionValue, setOptionValue] = useState<string>('가견적서');
  const dispatch = useDispatch();
  const { quotationRequestIdx, isCompanyDetail } = useSelector(
    (state: RootState) => state.adminReverseData,
  );
  const onChangeSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    event.preventDefault();
    // console.log(event);
    setOptionValue(event?.target?.value);
  };

  const backBtn = () => {
    dispatch(adminReverseAction.setIsCompanyDetail(false));
  };

  const now = window.document.documentElement.scrollHeight;

  useEffect(() => {
    if (setNowHeight && quotationRequestIdx) {
      setNowHeight(now);
    }
  }, [quotationRequestIdx]);

  return (
    <Background now={now}>
      <Wrapper>
        <AdminHeader
          title=""
          type="text"
          exelHide={false}
          WriteModalHandle={backBtn}
        />
        <Menu showSubMenu={showSubMenu}>
          {/* <select className="selectBox" onChange={onChangeSelect}>
           //  <option value="가견적서">가견적서</option>
            {quotationRequestIdx?.finalQuotationIdx !== undefined ? (
              <option value="최종견적서">최종견적서</option>
            ) : (
              <option value="가견적서">가견적서</option>
            )}
          </select> */}
          {quotationRequestIdx?.finalQuotationIdx !== undefined ? (
            <QutationText>최종견적서</QutationText>
          ) : (
            <QutationText>가견적서</QutationText>
          )}
          <TwoBtn>
            <Btn
              onClick={() => {
                alert('개발중입니다.');
              }}
            >
              수정
            </Btn>
            <Btn
              onClick={() => {
                alert('개발중입니다.');
              }}
            >
              삭제
            </Btn>
          </TwoBtn>
        </Menu>
        {/* 가견적 */}
        {/* {optionValue === '가견적서' && (
          <Prequotion preQuotationIdx={quotationRequestIdx?.preQuotationIdx} />
        )} */}
        {/* 최종견적 */}
        {/* {optionValue === '최종견적서' && (
          <FinalQuotaion
            finalQuotationIdx={quotationRequestIdx?.finalQuotationIdx}
          />
        )} */}
        {quotationRequestIdx?.finalQuotationIdx !== undefined ? (
          <FinalQuotaion
            finalQuotationIdx={quotationRequestIdx?.finalQuotationIdx}
          />
        ) : (
          <Prequotion preQuotationIdx={quotationRequestIdx?.preQuotationIdx} />
        )}
      </Wrapper>
    </Background>
  );
};

export default Qutation;

const Background = styled.div<{ now?: number }>`
  width: 100%;
  /* height: 100%; */
  height: ${({ now }) => (now ? `${now}px` : `100%`)};
  background-color: ${colors.lightWhite};
  padding: 0 18pt;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  overflow-y: scroll;
  padding-bottom: 75px;
`;

const Wrapper = styled.div`
  width: 964px;
  min-height: 100vh;
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Menu = styled.div<{ showSubMenu?: boolean }>`
  display: ${({ showSubMenu }) => showSubMenu && 'none'};
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  width: 946px;
  .selectBox {
    width: 134px;
    height: 36px;
    padding-left: 6px;
    cursor: pointer;
  }
`;
const Btn = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  color: #747780;
  line-height: 150%;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  border: 1px solid #747780;
  background-color: #e2e5ed;
  border-radius: 4px;
  width: 64px;
  height: 26px;
  padding-top: 2px;
  cursor: pointer;
`;

const TwoBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 11px;
`;

const QutationText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 18px;
  font-weight: bold;
  line-height: 150%;
  color: #222222;
`;
