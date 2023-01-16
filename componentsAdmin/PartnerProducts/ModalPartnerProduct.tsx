import styled from '@emotion/styled';
import CancleModal from 'componentsAdmin/Modal/CancleModal';
import AdminHeader from 'componentsAdmin/Header';
import { GrayBtn } from 'componentsAdmin/Layout';
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from 'react';
import colors from 'styles/colors';
import { css } from '@emotion/react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  isTokenAdminDeleteApi,
  isTokenAdminGetApi,
  isTokenAdminPatchApi,
  isTokenAdminPutApi,
  isTokenDeleteApi,
} from 'api';
import { chargers } from 'storeCompany/finalQuotation';
import Image from 'next/image';
import ExitBtn from 'public/adminImages/Group.png';
import { CHARGING_METHOD } from 'companyAssets/selectList';
import { api, getApi } from 'api';
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
import AlertModal from 'componentsAdmin/Modal/AlertModal';
import { PartnerProductData } from 'types/tableDataType';

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
  const queryClinet = useQueryClient();

  // 모달상세 불러오는 부분
  const {
    data: partnerProductList,
    isLoading: partnerProductIsLoading,
    isError: partnerProductIsError,
    refetch: partnerProductListRefetch,
  } = useQuery<AdminProductListDetail>('ProductListDetail', () =>
    isTokenAdminGetApi(`/admin/products/${detatilId}`),
  );

  // 등록된 파트너 제품 리스트 조회
  const { data, refetch } = useQuery<PartnerProductData>('PPData', () =>
    isTokenAdminGetApi(
      `/admin/products?page=1&limit=10&searchKeyword=&chargerKind=&chargerMethods[]=&chargerChannel=`,
    ),
  );
  const [modal, setModal] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<chargers[]>([]);
  const [selectedOptionEn, setSelectedOptionEn] = useState<chargers[]>([]);
  const [selectValue, setSelectValue] = useState<string>('');
  const [selectChannelValue, setSelectChannelValue] = useState<string>('');

  // 특장점 수정 set
  const [features, setFeatures] = useState<string>('');

  console.log('💔 features 💔', features);

  const chargeMethod = partnerProductList?.data?.method;

  // 삭제 하고 싶은 파일 id 값 업데이트
  const [fileIdx, setFileIdx] = useState<number | undefined>();

  // 삭제 하고 싶은  이미지 id 값 업데이트
  const [chargerImgIdx, setChargerImgIdx] = useState<number | undefined>();

  // 수정 등록 버튼 누를때 나오는 모달창
  const [messageModal, setMessageModal] = useState<boolean>(false);
  // 경고창에 보내는 메세지
  const [message, setMessage] = useState('');

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

  // 특장점 수정 api
  // admin/products/:chargerProductIdx/feature
  const { mutate: featureMutate, isLoading: featureIsLoading } = useMutation(
    isTokenAdminPatchApi,
    {
      onSuccess: () => {
        queryClinet.invalidateQueries('PPData');
        refetch();
        setMessageModal(true);
        setMessage('수정이 완료됐습니다!');
      },
      onError: (error: any) => {
        setMessageModal(true);
        setMessage('수정 요청을 실패했습니다.\n다시 시도해주세요.');
        // router.back();
      },
    },
  );

  // 수정 onClick
  const onClickFeatureBtn = () => {
    featureMutate({
      url: `/admin/products/${detatilId}/feature`,
      data: {
        feature: features,
      },
    });
  };

  const handle = () => {
    setModal(true);
  };

  const rightBtn = () => {
    setIsDetail(false);
  };

  const {
    mutate: delelteMutate,
    isLoading: delelteLoading,
    isError: delelteError,
  } = useMutation(isTokenAdminDeleteApi, {
    onSuccess: () => {
      partnerProductListRefetch();
      setMessageModal(true);
      setMessage('삭제가 완료 됐습니다.');
    },
    onError: () => {
      setMessageModal(true);
      setMessage('삭제 요청을 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  //  파트너 등록 제품 첨부파일 삭제
  const modalDeleteFileBtnControll = () => {
    delelteMutate({
      url: `/admin/products/${detatilId}/files/${fileIdx}`,
    });
  };

  // 파트너 등록 제품 충전기 이미지 삭제
  const modalDeleteChargerImgBtnControll = () => {
    delelteMutate({
      url: `/admin/products/${detatilId}/files/${chargerImgIdx}`,
    });
  };

  useEffect(() => {
    if (fileIdx) {
      modalDeleteFileBtnControll();
    }
    if (chargerImgIdx) {
      modalDeleteChargerImgBtnControll();
    }
  }, [fileIdx, chargerImgIdx]);

  useEffect(() => {
    setFeatures(partnerProductList?.data?.feature!);
  }, [partnerProductList]);

  return (
    <Body>
      <Wrap>
        {modal && <CancleModal setModal={setModal} rightBtn={rightBtn} />}
        {messageModal && (
          <AlertModal
            setIsModal={setMessageModal}
            message={message}
            setIsDetail={setIsDetail}
          />
        )}
        <Box>
          <AdminHeader
            title="파트너 등록 제품"
            type="detail"
            backBtn={handle}
          />
          <FlexBox>
            <GrayBtn>삭제</GrayBtn>
            <GrayBtn onClick={onClickFeatureBtn}>수정</GrayBtn>
          </FlexBox>
        </Box>
        <Inner>
          {/* <Inner onClick={() => setModal(!modal)}> */}
          <InnerFlexBox>
            <List>
              <Label>업체명</Label>
              <Contents>
                {
                  partnerProductList?.data?.member?.companyMemberAdditionalInfo
                    ?.companyName
                }
              </Contents>
            </List>
            <List>
              <Label>담당자</Label>
              <Contents>{partnerProductList?.data?.member?.name}</Contents>
            </List>
            <List>
              <Label>담당자 연락처</Label>
              <Contents>
                {hyphenFn(partnerProductList?.data?.member?.phone!)}
              </Contents>
            </List>
            <List>
              <Label>담당자 이메일</Label>
              <Contents>
                {
                  partnerProductList?.data?.member?.companyMemberAdditionalInfo
                    ?.managerEmail
                }
              </Contents>
            </List>
            <List>
              <Label>제조사</Label>
              <RequestContents height={33} maxLength={50} readOnly>
                {partnerProductList?.data?.manufacturer}
              </RequestContents>
            </List>
            <List>
              <Label>충전모달</Label>
              <Contents>
                <DropDownBtn
                  currentStep={convertKo(
                    M5_LIST,
                    M5_LIST_EN,
                    partnerProductList?.data?.kind!,
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
                {chargeMethod &&
                  chargeMethod?.map((item, index) => (
                    <Fragment key={index}>
                      <DropDownBtn
                        currentStep={item}
                        width={'300px'}
                        setSelectValue={setSelectValue}
                        selectValue={selectValue}
                        dropDownValue={CHARGING_METHOD}
                      />
                    </Fragment>
                  ))}
              </Contents>
            </List>
            <List>
              <Label>채널</Label>
              <Contents>
                <DropDownBtn
                  currentStep={convertKo(
                    M7_LIST,
                    M7_LIST_EN,
                    partnerProductList?.data?.channel!,
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
              <RequestContents
                height={200}
                maxLength={500}
                value={features}
                onChange={(e) => {
                  setFeatures(e.target.value);
                }}
              >
                {features === '' ? '없음' : features}
              </RequestContents>
            </List>
            <ImgList>
              <label className="label">제품 이미지</label>
              <div className="container">
                {partnerProductList?.data?.chargerProductFiles?.map(
                  (img, index) =>
                    img.productFileType === 'IMAGE' && (
                      <div className="imgBox" key={index}>
                        <Image
                          src={img?.url}
                          alt="charge-img"
                          priority={true}
                          unoptimized={true}
                          layout="fill"
                        />
                        <div className="imgExit">
                          <Image
                            src={ExitBtn}
                            alt="exit"
                            layout="fill"
                            onClick={() => {
                              setChargerImgIdx(img?.chargerProductFileIdx);
                            }}
                          />
                        </div>
                      </div>
                    ),
                )}
              </div>
            </ImgList>
            <BusinessList>
              <label className="label">첨부파일</label>
              <div className="fileContainer">
                {partnerProductList?.data?.chargerProductFiles?.map(
                  (file, index) =>
                    file.productFileType === 'CATALOG' && (
                      <div className="fileBox" key={index}>
                        <p className="businessName">{file.originalName}</p>
                        <button
                          className="businessBtn"
                          onClick={() => {
                            setFileIdx(file?.chargerProductFileIdx);
                          }}
                        >
                          삭제
                        </button>
                      </div>
                    ),
                )}
              </div>
            </BusinessList>
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

const BusinessList = styled.div`
  padding-top: 14px;
  padding-bottom: 24px;
  display: flex;
  align-items: initial;
  margin-top: 10px;
  .label {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${colors.dark2};
  }
  .fileBox {
    display: flex;
    align-items: center;
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
    margin-right: 10px;
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
  .fileContainer {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-left: 105px;
  }
`;

const ImgList = styled.div`
  padding-top: 14px;
  padding-bottom: 14px;
  display: flex;
  align-items: unset;
  margin-top: 10px;
  .label {
    font-weight: 500;
    font-size: 16px;
    line-height: 150%;
    color: ${colors.dark2};
  }
  .imgBox {
    position: relative;
    width: 173px;
    height: 130px;
    background-color: gray;
    border-radius: 4px;
    :not(:nth-last-of-type(1)) {
      margin-right: 10px;
    }
  }
  .imgExit {
    position: absolute;
    top: 4px;
    right: 4px;
    border: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    z-index: 10;
    border-radius: 50%;
    background-color: ${colors.lightGray2};
  }
  .container {
    display: flex;
    gap: 10px;
    margin-left: 90px;
  }
`;
