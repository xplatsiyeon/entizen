import styled from '@emotion/styled';
import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import { useDispatch } from 'react-redux';
import colors from 'styles/colors';
import CheckIcon from 'public/images/check-small.png';
// import CheckCircleOn from 'public/images/CheckCircle-on.png';
import CheckCircleOn from 'public/images/checkRoundSvg.svg';
import Image from 'next/image';
import { useMutation, useQueryClient } from 'react-query';
import { isTokenPostApi } from 'api';
import { SpotDataResponse } from 'componentsCompany/CompanyQuotation/SentQuotation/SentProvisionalQuoatation';

type Props = {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  spotData: SpotDataResponse;
};

const ReplacePhotoModal = ({ spotData, isModal, setIsModal }: Props) => {
  const router = useRouter();
  const preQuotationIdx = router?.query?.preQuotationIdx;
  const dispatch = useDispatch();
  const outside = useRef();
  const clinetQuery = useQueryClient();

  // api/quotations/pre/:preQuotationIdx/spot-inspection

  const { mutate: isReplacedMutate, isLoading: isReplacedLoading } =
    useMutation(isTokenPostApi, {
      onSuccess: (data) => {
        // console.log(data);
        clinetQuery.invalidateQueries('spot-inspection');
        clinetQuery.invalidateQueries('company');
        setIsModal(false);
      },
      onError: (error) => {
        // console.log('에러 발생');
        // console.log(error);
      },
    });

  const handleModalClose = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (outside.current === e.target) {
      setIsModal((prev) => !prev);
    }
  };

  const HandleButton = () => {
    // console.log('온클릭');
    isReplacedMutate({
      url: `/quotations/pre/${preQuotationIdx}/spot-inspection`,
      data: {
        // 현장 실사 받은 날짜 그대로
        spotInspectionDates:
          spotData?.data?.spotInspection?.spotInspectionDate!,
        isReplacedPicture: true,
        isNewPropose: false,
        isConfirmed: true,
      },
    });
  };

  return (
    <ModalWrapper ref={outside} onClick={(e) => handleModalClose(e)}>
      <ModalBox>
        <ImageBox>
          <div className="checkCicleOn-icon">
            <Image src={CheckCircleOn} alt="checkCicleOn-icon" />
          </div>
        </ImageBox>
        <ContentText>
          <DisplayBox>
            <h2 className="title">
              <div className="check-icon">
                <Image src={CheckIcon} alt="check-icon" />
              </div>
              고객님의 동의를 받으셨나요?
            </h2>
            <h2 className="title">
              <div className="check-icon">
                <Image src={CheckIcon} alt="check-icon" />
              </div>
              현장사진을 전달 받으셨나요?
            </h2>
          </DisplayBox>
          <h2 className="subText">
            * 사전 동의없이 진행할 경우 견적이 취소될 수 있습니다.
          </h2>
        </ContentText>
        <BtnBox>
          <BtnLeft onClick={() => setIsModal(!isModal)}>
            <BtnText>취소</BtnText>
          </BtnLeft>
          <BtnRight onClick={HandleButton}>
            <BtnText>사진으로 대체하기</BtnText>
          </BtnRight>
        </BtnBox>
      </ModalBox>
    </ModalWrapper>
  );
};

const ModalWrapper = styled(Box)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 100;
`;
const ModalBox = styled(Box)`
  display: flex;
  flex-direction: column;
  position: fixed;
  justify-content: center;
  align-items: center;
  border-radius: 20pt 20pt 0 0;
  padding-left: 15pt;
  padding-right: 15pt;
  background-color: ${colors.lightWhite};
  box-shadow: 3pt 0 7.5pt rgba(137, 163, 201, 0.2);
  @media (min-width: 900pt) {
    /* width: 420pt; */
    width: 517.5pt;
    padding: 0 37.5pt;
    border-radius: 12pt;
    bottom: 170pt;
  }
`;
const ImageBox = styled.div`
  padding-top: 21.9975pt;
  @media (min-width: 900pt) {
    padding-top: 23.4975pt;
  }
`;

const ContentText = styled.div`
  white-space: pre-wrap;
  font-size: 12pt;
  font-weight: 500;
  line-height: 18pt;
  letter-spacing: -2%;
  padding-bottom: 24pt;
  padding-top: 4pt;
  @media (min-width: 900pt) {
    padding-top: 9.75pt;
    padding-bottom: 30pt;
  }
  .title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 6pt;
    font-weight: 700;
    font-size: 15pt;
    line-height: 21pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    padding-top: 6pt;
    padding-bottom: 12pt;
    @media (max-width: 899.25pt) {
      padding-bottom: 0;
    }
  }
  .subText {
    font-family: 'Spoqa Han Sans Neo';
    font-size: 10.5pt;
    font-weight: 500;
    line-height: 15pt;
    letter-spacing: -0.02em;
    color: #747780;
    text-align: center;
    @media (min-width: 900pt) {
      font-size: 12pt;
      font-weight: 500;
      line-height: 15pt;
      letter-spacing: -0.02em;
    }
  }
  .text-box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 6pt;
  }
  .text {
    font-weight: 400;
    font-size: 12pt;
    line-height: 18pt;
    text-align: center;
    letter-spacing: -0.02em;
    color: ${colors.main2};
  }
  .check-icon {
    /* width: 10.3125pt; */
    width: 11.25pt;
  }
`;
const BtnBox = styled(Box)`
  width: 100%;
  position: relative;
  display: flex;
  gap: 9pt;
  padding-bottom: 30pt;
  @media (min-width: 900pt) {
    justify-content: center;
  }
`;
const BtnLeft = styled(Box)`
  width: 100%;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  color: ${colors.darkGray};
  background: ${colors.gray};
  border-radius: 6pt;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    width: 100px;
  }
`;
const BtnRight = styled(Box)`
  width: 100%;
  display: flex;
  flex: 3;
  justify-content: center;
  align-items: center;
  background-color: ${colors.main};
  color: ${colors.lightWhite};
  border-radius: 6pt;
  cursor: pointer;
  @media (max-width: 899.25pt) {
    width: 223px;
  }
`;
const BtnText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  padding: 15pt 0;
  font-size: 12pt;
  font-weight: 400;
  line-height: 12pt;
  letter-spacing: -2%;
  color: ${(props) => props.color};
  @media (min-width: 900pt) {
    font-size: 12pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;

const DisplayBox = styled.div`
  padding-bottom: 12pt;
  @media (min-width: 900pt) {
    display: flex;
    align-items: center;
    gap: 17.8125pt;
    padding-bottom: 0;
  }
`;

export default ReplacePhotoModal;
