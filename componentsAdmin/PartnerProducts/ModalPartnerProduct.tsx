import styled from '@emotion/styled';
import CancleModal from 'componentsAdmin/CancleModal';
import AdminHeader from 'componentsAdmin/Header';
import { GrayBtn } from 'componentsAdmin/Layout';
import { Dispatch, SetStateAction, useState } from 'react';
import colors from 'styles/colors';
import { css } from '@emotion/react';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import { chargers } from 'storeCompany/finalQuotation';
import {
  adminDateFomat,
  dateFomat,
  hyphenFn,
  convertKo,
  convertEn,
} from 'utils/calculatePackage';
import {
  M5_LIST,
  M5_LIST_EN,
  M6_LIST,
  M6_LIST_EN,
  M7_LIST,
  M7_LIST_EN,
  M8_LIST,
  M8_LIST_EN,
  M5_CHANNEL_SET,
  M5_TYPE_SET,
} from 'assets/selectList';
import DropDownBtn from 'componentsAdmin/DropDownBtn';

type Props = {
  setIsDetail: Dispatch<SetStateAction<boolean>>;
  detatilId: number;
};

type AdminProductListDetail = {
  isSuccess: boolean;
  data: {
    createdAt: string;
    chargerProductIdx: number;
    modelName: string;
    kind: string;
    channel: string;
    method: [];
    manufacturer: string;
    feature: string;
    member: {
      memberIdx: number;
      name: string;
      phone: string;
      companyMemberAdditionalInfo: {
        companyMemberAdditionalInfoIdx: number;
        companyName: string;
        managerEmail: string;
      };
    };
    chargerProductFiles: {
      chargerProductFileIdx: number;
      productFileType: string;
      originalName: string;
      url: string;
      size: number;
    }[];
  };
};
const ModalPartnerProduct = ({ setIsDetail, detatilId }: Props) => {
  const { data, isLoading, isError } = useQuery<AdminProductListDetail>(
    'ProductListDetail',
    () => isTokenGetApi(`/admin/products/${detatilId}`),
  );
  const [modal, setModal] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<chargers[]>([]);
  const [selectedOptionEn, setSelectedOptionEn] = useState<chargers[]>([]);
  const [selectValue, setSelectValue] = useState<string>('');
  const [selectChannelValue, setSelectChannelValue] = useState<string>('');

  // 셀렉터 옵션 체인지
  const handleSelectBox = (value: string, name: string, index: number) => {
    let copy: chargers[] = [...selectedOption];
    let copyEn: chargers[] = [...selectedOptionEn];

    // 영어 값 추출
    let valueEn: string;

    // 충전기 종류
    if (name === 'kind') {
      const idx = M5_LIST.indexOf(value);
      valueEn = M5_LIST_EN[idx];
      copy[index] = {
        idx: idx,
        kind: '',
        standType: '',
        channel: '',
        count: '',
        chargePriceType: '',
        chargePrice: '',
        installationLocation: '',
        modelName: '',
        manufacturer: '',
        productFeature: '',
        chargerImageFiles: [],
        catalogFiles: [],
      };
      copy[index] = {
        ...copy[index],
        kind: value,
      };
      copyEn[index] = {
        ...copyEn[index],
        kind: valueEn,
      };
      // 타입
    } else if (copy[index].kind.length > 1 && name === 'standType') {
      const idx = M6_LIST.indexOf(value);
      if (value === '-') {
        valueEn = '';
      } else {
        valueEn = M6_LIST_EN[idx];
      }
      copy[index] = {
        ...copy[index],
        standType: value,
      };
      copyEn[index] = {
        ...copyEn[index],
        standType: valueEn,
      };
    } else if (copy[index].kind.length > 1 && name === 'channel') {
      const idx = M7_LIST.indexOf(value);
      valueEn = M7_LIST_EN[idx];
      copy[index] = {
        ...copy[index],
        channel: value,
      };
      copyEn[index] = {
        ...copyEn[index],
        channel: valueEn,
      };
      // 개수
    } else if (copy[index].kind.length > 1 && name === 'count') {
      const idx = M8_LIST.indexOf(value);
      valueEn = M8_LIST_EN[idx];
      copy[index] = {
        ...copy[index],
        count: value,
      };
      copyEn[index] = {
        ...copyEn[index],
        count: valueEn,
      };
    }

    setSelectedOption(copy);
    setSelectedOptionEn(copyEn);
  };

  const handle = () => {
    setModal(true);
  };

  const rightBtn = () => {
    setIsDetail(false);
  };

  console.log('🌸 충전기 방식은 뭐나옵니까? 🌸', data?.data?.channel);

  return (
    <Body>
      <Wrap>
        {modal && <CancleModal setModal={setModal} rightBtn={rightBtn} />}
        <Box>
          <AdminHeader
            title="파트너 등록 제품"
            type="detail"
            backBtn={handle}
          />
          <FlexBox>
            <GrayBtn>삭제</GrayBtn>
            <GrayBtn>수정</GrayBtn>
          </FlexBox>
        </Box>
        <Inner>
          {/* <Inner onClick={() => setModal(!modal)}> */}
          <InnerFlexBox>
            <List>
              <Label>업체명</Label>
              <Contents>
                {data?.data?.member?.companyMemberAdditionalInfo?.companyName}
              </Contents>
            </List>
            <List>
              <Label>담당자</Label>
              <Contents>{data?.data?.member?.name}</Contents>
            </List>
            <List>
              <Label>담당자 연락처</Label>
              <Contents>{hyphenFn(data?.data?.member?.phone!)}</Contents>
            </List>
            <List>
              <Label>담당자 이메일</Label>
              <Contents>
                {data?.data?.member?.companyMemberAdditionalInfo?.managerEmail}
              </Contents>
            </List>
            <List>
              <Label>제조사</Label>
              <RequestContents height={33} maxLength={50}>
                {data?.data?.manufacturer}
              </RequestContents>
            </List>
            <List>
              <Label>충전모달</Label>
              <Contents>
                <DropDownBtn
                  currentStep={convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    data?.data?.kind!,
                  )}
                  dropDownValue={M5_LIST}
                  setSelectValue={setSelectValue}
                  selectValue={selectValue}
                  width={'300px'}
                  handleSelectBox={handleSelectBox}
                />
              </Contents>
            </List>
            <List>
              <Label>충전방식</Label>
              <Contents>
                {/* <DropDownBtn currentStep={data?.data?.method} width={'300px'} /> */}
              </Contents>
            </List>
            <List>
              <Label>채널</Label>
              <Contents>
                <DropDownBtn
                  currentStep={convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    data?.data?.channel!,
                  )}
                  dropDownValue={M7_LIST}
                  width={'300px'}
                  handleSelectBox={handleSelectBox}
                  setSelectValue={setSelectChannelValue}
                  selectValue={selectChannelValue}
                />
              </Contents>
            </List>
            <List>
              <Label>특장점</Label>
              <RequestContents height={200} maxLength={500}>
                {data?.data?.feature}
              </RequestContents>
            </List>
            <List>
              <Label>제품이미지</Label>
              <Contents>이미지 자리</Contents>
            </List>
            <List>
              <Label>카탈로그 첨부파일</Label>
              <Contents>카탈로그 첨부 자리</Contents>
            </List>
          </InnerFlexBox>
        </Inner>
      </Wrap>
    </Body>
  );
};

export default ModalPartnerProduct;

const Text = css`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
`;

const Body = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100vh;
  height: 100%;
  position: absolute;
  background: white;
  z-index: 2;
`;
const Wrap = styled.div`
  width: 946px;
  position: relative;
`;

const Box = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
`;
const FlexBox = styled.div`
  gap: 8px;
  display: flex;
  margin-top: 130px;
`;
const Inner = styled.div`
  padding: 24px 16px;
  border: 2px solid #e7e7e7;
  border-radius: 4px;
`;

const InnerFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  color: #000000;
`;

const Label = styled.label`
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  color: ${colors.main2};
  width: 129px;
  margin-right: 37px;
`;
const Contents = styled.span`
  ${Text};
  color: ${colors.main2};
`;

const List = styled.li`
  display: flex;
  :not(:nth-last-of-type(1)) {
    margin-bottom: 14px;
  }
`;

const RequestContents = styled.textarea<{ height?: number }>`
  ${Text};
  color: ${colors.main2};
  border: 1px solid #e2e5ed;
  padding: 5px 8px;
  border-radius: 6px;
  width: 748px;
  outline: none;
  resize: none;
  background: none;
  height: ${({ height }) => `${height}px`};
`;
