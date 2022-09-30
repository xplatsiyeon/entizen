import React, { useState } from 'react';
import Header from 'components/mypage/request/header';
import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import mapPin from 'public/images/MapPin.png';
import Image from 'next/image';
import colors from 'styles/colors';

import SliderSizes from 'components/quotation/request/slider';
import QuotationModal from 'components/Modal/QuotationModal';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

type Props = {};

const Request1_7 = (props: Props) => {
  const router = useRouter();
  const [textValue, setTextValue] = useState('');
  const [buttonActivate, setButtonActivate] = useState<boolean>(false);
  const [isModal, setIsModal] = useState<boolean>(false);
  const [value, setValue] = useState(50);
  const [disabled, setDisabled] = useState(true);

  const { requestData } = useSelector(
    (state: RootState) => state.quotationData,
  );

  const HandleTextValue = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setTextValue(value);
  };
  const handleButton = () => {
    setIsModal(!isModal);
    console.log('버튼 컨트롤');
  };
  return (
    <Wrapper>
      {isModal && <QuotationModal isModal={isModal} setIsModal={setIsModal} />}
      <Header
        title="간편견적"
        exitBtn={true}
        handleOnClick={() => router.push('/')}
      />
      <Body>
        <AddressBox>
          <div className="mapPin-icon">
            <Image src={mapPin} alt="mapPin-icon" layout="fill" />
          </div>
          <AddressName>LS 카페 신림점</AddressName>
        </AddressBox>
        <SubTitle>수익지분</SubTitle>
        <NameBox>
          <span className="name">내 수익/투자</span>
          <span className="name">판매자</span>
        </NameBox>
        <SliderSizes
          value={parseInt(requestData?.investRate!)}
          setValue={setValue}
          disabled={disabled}
          setDisabled={setDisabled}
        />
        <ContentsWrapper>
          <div className="contents-box">
            <span className="name">
              운영서비스 <span className="accent">월</span> 구독료
            </span>
            <span>
              <span className="price">
                {`${requestData?.minSubscribePricePerMonth
                  .toString()
                  .substring(0, 3)} ~ ${requestData?.maxSubscribePricePerMonth
                  .toString()
                  .substring(0, 3)}`}
              </span>
            </span>
          </div>
          <div className="line" />
          <div className="contents-box">
            <span className="name">
              EV충전소 설치비용 <span className="accent">월</span> 구독료
            </span>
            <span>
              <span className="price">
                {`${requestData?.minTotalSubscribePrice
                  .toString()
                  .substring(0, 3)} ~ ${requestData?.maxTotalSubscribePrice
                  .toString()
                  .substring(0, 3)}`}
              </span>
            </span>
          </div>
        </ContentsWrapper>
        <RequestForm>
          <div className="name">
            <span>기타 요청사항 (선택)</span>
            <span>{textValue.length}/500</span>
          </div>
          <textarea
            className="text"
            value={textValue}
            onChange={HandleTextValue}
            placeholder={`예시1) 광고 LCD가 설치된 충전기로 견적주세요.\n예시2) 7kW는 실내, 50kW는 실외에 설치하려 합니다.\n예시3) 충전요금은 제가 정하고 싶어요.`}
            maxLength={500}
            rows={3}
          ></textarea>
        </RequestForm>
      </Body>
      <Btn buttonActivate={buttonActivate} onClick={handleButton}>
        구독상품 견적요청
      </Btn>
    </Wrapper>
  );
};

export default Request1_7;

const Wrapper = styled.div``;
const Body = styled.div`
  padding: 27pt 15pt 111pt 15pt;
`;
const AddressBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  gap: 6pt;
  padding-bottom: 15pt;
  border-bottom: 0.75pt solid ${colors.gray};
  .mapPin-icon {
    position: relative;
    width: 15pt;
    height: 15pt;
  }
`;
const AddressName = styled.h1`
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const SubTitle = styled.h2`
  padding-top: 30pt;
  font-weight: 700;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const NameBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 18pt;
  .name {
    font-weight: 700;
    font-size: 9pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
`;
const ContentsWrapper = styled.div`
  padding-top: 35pt;
  .contents-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .line {
    border-bottom: 0.75pt dashed #e2e5ed;
    margin: 18pt 0;
  }
  .name {
    font-weight: 700;
    font-size: 10.5pt;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .price {
    font-weight: 700;
    font-size: 15pt;
    line-height: 15pt;
    text-align: right;
    letter-spacing: -0.02em;
    color: ${colors.main};
    ::after {
      content: ' 만원';
      font-weight: 700;
      font-size: 10.5pt;
      line-height: 15pt;
      letter-spacing: -0.02em;
      color: ${colors.main2};
    }
  }
  .accent {
    color: ${colors.main};
  }
`;
const RequestForm = styled.form`
  padding-top: 60pt;
  .name {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 700;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .text {
    box-sizing: border-box;
    outline: none;
    width: 100%;
    margin-top: 9pt;
    padding: 12pt 12pt 24pt 12pt;
    border: 0.75pt solid ${colors.gray};
    border-radius: 6pt;
    font-weight: 400;
    font-size: 10.4pt;
    line-height: 18pt;
    letter-spacing: -0.02em;
    ::placeholder {
      color: ${colors.lightGray3};
    }
  }
`;
const Btn = styled.div<{ buttonActivate: boolean }>`
  white-space: pre-wrap;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 15pt 0 39pt 0;
  text-align: center;
  font-weight: 700;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.lightWhite};
  background-color: ${colors.main};
`;
