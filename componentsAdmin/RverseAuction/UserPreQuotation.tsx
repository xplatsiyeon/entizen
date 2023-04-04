import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import colors from 'styles/colors';
import {
  InstallationPurposeType,
  InstallationPurposeTypeEn,
  location,
  locationEn,
  M5_LIST,
  M5_LIST_EN,
  M6_LIST,
  M6_LIST_EN,
  M7_LIST,
  M7_LIST_EN,
  subscribeType,
  subscribeTypeEn,
} from 'assets/selectList';
import { useQuery } from 'react-query';
import {
  useMutation,
  useQuery as reactQuery,
  useQueryClient,
} from 'react-query';
import { isTokenAdminGetApi, isTokenAdminPatchApi } from 'api';
import { dateFomat, hyphenFn, convertKo } from 'utils/calculatePackage';
import { AxiosError } from 'axios';
import AlertModal from 'componentsAdmin/Modal/AlertModal';

export interface QuotationRequest {
  quotationRequestIdx: number;
  expiredAt: string;
  installationAddress: string;
  subscribeProduct: string;
  subscribePeriod: number;
  investRate: string;
  installationLocation: string;
  installationPurpose: string;
  etcRequest: string;
  createdAt: string;
  member: {
    memberIdx: number;
    id: string;
    name: string;
    phone: string;
  };
  quotationRequestChargers: [
    {
      quotationRequestChargerIdx: number;
      kind: string;
      standType: string;
      channel: string;
      count: number;
    },
  ];
}

export interface UserPreQuotationResponse {
  isSuccess: true;
  data: {
    quotationRequest: QuotationRequest;
  };
}

type Props = {
  detatilId: string;
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
};

const UserPreQuotation = ({ detatilId, setIsDetail }: Props) => {
  // --------------------- AS detail API ------------------------------
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const routerId = 330;
  const queryClinet = useQueryClient();
  // const routerId = 329;
  // 수정 등록 버튼 누를때 나오는 모달창
  const [messageModal, setMessageModal] = useState<boolean>(false);
  // 경고창에 보내는 메세지
  const [message, setMessage] = useState('');

  const { data, isLoading, isError, error } = useQuery<
    UserPreQuotationResponse,
    AxiosError,
    QuotationRequest
  >(
    'userPreQuotation',
    () =>
      isTokenAdminGetApi(`/admin/quotations/quotation-requests/${detatilId}`),
    {
      select(data) {
        return data.data.quotationRequest;
      },
    },
  );

  // 기타요청 사항 받는 set 함수
  const [elseText, setElseText] = useState<string>('');
  // 달력 날짜 변경 함수
  const handleDateChange = () => {};

  const expiredAt = dateFomat(data?.expiredAt!).substring(0, 12);

  // 간편견적 삭제
  const {
    mutate: patchCancelMutate,
    isLoading: patchIsCancelLoading,
    isError: patchIsCancelError,
  } = useMutation(isTokenAdminPatchApi, {
    onSuccess: () => {
      queryClinet.invalidateQueries('projectList');
      setMessageModal(true);
      setMessage('간편견적 삭제가 완료됐습니다.');
    },
    onError: () => {
      setMessageModal(true);
      setMessage('간편견적 삭제 요청을 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  console.log('data', detatilId);

  const prequotationCancel = () => {
    patchCancelMutate({
      url: `/admin/quotations/quotation-requests/${detatilId}/cancel`,
    });
  };

  // console.log('data=>', data);

  return (
    <Background>
      {messageModal && (
        <AlertModal
          setIsModal={setMessageModal}
          message={message}
          size={'lg'}
          setIsDetail={setIsDetail}
        />
      )}
      <TitleBox>
        <QuotationTitle>일반회원 간편견적서</QuotationTitle>
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
              prequotationCancel();
            }}
          >
            삭제
          </Btn>
        </TwoBtn>
      </TitleBox>
      <DetailBox>
        <FlexList>
          <DetailText type={'left'}>작성자</DetailText>
          <DetailText type={'right'}>{data?.member?.id}</DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>이름</DetailText>
          <DetailText type={'right'}>{data?.member?.name}</DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>전화번호</DetailText>
          <DetailText type={'right'}>
            {hyphenFn(data?.member?.phone)}
          </DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>견적신청일</DetailText>
          <DetailText type={'right'}>
            {dateFomat(data?.createdAt!).slice(0, 12)}
          </DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>견적마감일</DetailText>
          {/* <DatePicker
            size={'sm'}
            onChange={handleDateChange}
            placeholder={expiredAt}
            readOnly
          /> */}
          <DetailText type={'right'}>
            {dateFomat(data?.expiredAt!).slice(0, 12)}
          </DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>견적제목</DetailText>
          <DetailText type={'right'}>{data?.installationAddress}</DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>구독상품</DetailText>

          <DetailText type={'right'}>
            {convertKo(subscribeType, subscribeTypeEn, data?.subscribeProduct)}
          </DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>구독기간</DetailText>
          <DetailText
            type={'right'}
          >{`${data?.subscribePeriod}개월`}</DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>수익지분</DetailText>
          <DetailText type={'right'}>
            {`${Math.floor(Number(data?.investRate) * 100).toString()}%`}
          </DetailText>
        </FlexList>
        <>
          {data?.quotationRequestChargers?.map((item, index) => (
            <FlexList2 key={index}>
              {index === 0 ? (
                <DetailText type={'left'}>충전기 종류 및 수량</DetailText>
              ) : (
                <DetailText type={'left'} />
              )}
              <ChargeText>
                {convertKo(M5_LIST, M5_LIST_EN, item.kind)}
                {item.standType
                  ? `: ${convertKo(
                      M6_LIST,
                      M6_LIST_EN,
                      item.standType,
                    )}, ${convertKo(M7_LIST, M7_LIST_EN, item.channel)}, ${
                      item.count
                    } 대`
                  : `: ${convertKo(M7_LIST, M7_LIST_EN, item.channel)}, ${
                      item.count
                    } 대`}
              </ChargeText>
            </FlexList2>
          ))}
        </>
        <FlexList>
          <DetailText type={'left'}>충전기설치위치</DetailText>
          <DetailText type={'right'}>
            {convertKo(location, locationEn, data?.installationLocation)}
          </DetailText>
        </FlexList>
        <FlexList>
          <DetailText type={'left'}>충전기설치목적</DetailText>
          <DetailText type={'right'}>
            {convertKo(
              InstallationPurposeType,
              InstallationPurposeTypeEn,
              data?.installationPurpose,
            )}
          </DetailText>
        </FlexList>
        <FlexList3>
          <DetailText type={'left'}>기타요청사항</DetailText>
          {data?.etcRequest?.length === 0 ? (
            <ElseText
              maxLength={500}
              readOnly
              onChange={(e) => {
                setElseText(e.target.value);
              }}
              value={elseText !== '' ? elseText : '없음'}
            />
          ) : (
            <ElseText
              maxLength={500}
              readOnly
              value={elseText !== '' ? elseText : data?.etcRequest}
            />
          )}
        </FlexList3>
      </DetailBox>
    </Background>
  );
};

export default UserPreQuotation;

const DivFlex = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Text = css`
  font-family: 'Spoqa Han Sans Neo';
  color: black;
  font-style: normal;
  font-size: 14px;
`;

const Background = styled.div`
  background-color: ${colors.lightWhite};
`;

const TitleBox = styled.div`
  ${DivFlex}
  padding-bottom: 15px;
  min-width: 964px;
`;

const QuotationTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.dark2};
  text-align: left;
`;

const TwoBtn = styled.div`
  ${DivFlex}
  gap: 11px;
`;

const Btn = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  color: #747780;
  line-height: 150%;
  font-size: 14px;
  font-style: normal;
  text-align: center;
  border: 1px solid #747780;
  background-color: #e2e5ed;
  border-radius: 4px;
  width: 64px;
  height: 26px;
  padding-top: 2px;
  cursor: pointer;
`;

const DetailBox = styled.div`
  border: 2px solid #e7e7e7;
  /* padding: 28px 510px 28px 14px; */
  padding: 28px 0 28px 14px;
  border-radius: 4px;
  min-width: 964px;
`;

const FlexList = styled.div`
  &:not(:last-of-type) {
    padding-bottom: 23px;
  }
  display: flex;
  align-items: center;
`;

const FlexList2 = styled.div`
  display: flex;
  align-items: center;
  padding-bottom: 10px;
  &:last-child {
    border: 1px solid blue;
  }
`;

const FlexList3 = styled.div`
  display: flex;
  align-items: inherit;
  padding-bottom: 23px;
`;

const ElseText = styled.textarea`
  ${Text}
  width: 748px;
  height: 210px;
  border: 1px solid #e2e5ed;
  padding: 5px 10px 5px 10px;
  border-radius: 5px;
  resize: none;
  background: #ffffff;
  overflow-y: scroll;
`;

const ChargeText = styled.div`
  ${Text}
  display: flex;
`;

const ElseTextArea = styled.div`
  ${Text}
  width: 748px;
  height: 196px;
  padding: 5px 10px 5px 10px;
  border: 1px solid #e2e5ed;
  border-radius: 5px;
  overflow-y: scroll;
`;

const DetailText = styled.div<{
  type: string;
  border?: boolean;
}>`
  ${Text}
  width: ${({ type }) => type === 'left' && '150px'};
  border: ${({ border }) => border === true && '1px solid #E2E5ED'};
  padding: ${({ border }) => border === true && '5px 10px 5px 10px'};
  border-radius: ${({ border }) => border === true && '5px'};
`;
