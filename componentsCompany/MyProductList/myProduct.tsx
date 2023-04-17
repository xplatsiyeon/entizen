import styled from '@emotion/styled';
import { Button, TextareaAutosize, TextField } from '@mui/material';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import colors from 'styles/colors';
import CompanyHeader from './Header';
import tempCar from 'public/images/temp-car.jpg';
import fileImg from 'public/mypage/file-icon.svg';
import TwoBtn from './TwoBtn';
import TwoBtnModal from 'components/Modal/TwoBtnModal';
import { useRouter } from 'next/router';
import { isTokenDeleteApi, isTokenGetApi } from 'api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Loader from 'components/Loader';
import {
  M5_LIST,
  M5_LIST_EN,
  M6_LIST,
  M6_LIST_EN,
  M7_LIST,
  M7_LIST_EN,
} from 'assets/selectList';
import { convertKo } from 'utils/calculatePackage';
import WebBuyerHeader from 'componentsWeb/WebBuyerHeader';
import WebFooter from 'componentsWeb/WebFooter';
import CompanyRightMenu from 'componentsWeb/CompanyRightMenu';
import { fileDownload } from 'bridge/appToWeb';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export interface ImgFile {
  createdAt: string;
  chargerProductFileIdx: number;
  productFileType: string;
  originalName: string;
  url: string;
  size: number;
  chargerProductIdx: number;
}
export interface ChargerProduct {
  createdAt: string;
  chargerProductIdx: number;
  modelName: string;
  kind: string;
  standType: string;
  channel: string;
  method: string[];
  manufacturer: string;
  feature: string;
  memberIdx: number;
  chargerProductFiles: ImgFile[];
  chargerImageFiles: ImgFile[];
  chargerCatalogFiles: ImgFile[];
}

export interface ProductDetailResponse {
  isSuccess: true;
  chargerProduct: ChargerProduct;
}

type Props = {};
const TAG = 'componentsCompany/MyProductList/myProduct';
const MyProduct = (props: Props) => {
  const queryclient = useQueryClient();
  const router = useRouter();
  const routerId = router?.query?.chargerProductIdx!;
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);

  const [openSubLink, setOpenSubLink] = useState<boolean>(false);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data, isLoading, isError, error } = useQuery<ProductDetailResponse>(
    'productDetail',
    () => isTokenGetApi(`/products/${routerId}`),
    {
      enabled: router.isReady,
    },
  );

  const {
    mutate: deleteMutate,
    isLoading: deleteLoading,
    isError: deleteError,
  } = useMutation(isTokenDeleteApi, {
    onSuccess: () => {
      queryclient.invalidateQueries('productList');
    },
    onError: () => {},
    onSettled: () => {},
  });
  const exitHandle = () => {
    setModalOpen(false);
  };

  // 내 제품 리스트 삭제하기
  const deleteHandle = () => {};

  const modalRightBtnControll = () => {
    router.push('/company/myProductList');
    if (routerId) {
      deleteMutate({
        url: `/products/${routerId}`,
      });
    }
  };
  const clickDelete = () => {
    setModalOpen(true);
  };
  const clickEdit = () => {
    // router.push('/company/addProduct'); // 페이지 타이틀, 버튼 내용만 틀린 페이지로 가야함.
    router.push({
      pathname: '/company/addProduct',
      query: {
        chargerProductIdx: routerId,
      },
    });
  };
  // console.log(TAG + '🔥 ~line 79 데이터 확인');
  // console.log(data);

  useEffect(() => {
    return () => {
      queryclient.removeQueries('productDetail');
    };
  }, []);

  if (isError) {
    // console.log(TAG + '🔥 ~line 82 에러 발생');
    // console.log(error);
  }
  if (isLoading) {
    return <Loader />;
  }

  return (
    <WebBody>
      <WebBuyerHeader setOpenSubLink={setOpenSubLink} />
      <CompanyRightMenu />
      <Inner>
        {modalOpen && (
          <TwoBtnModal
            text={'삭제하시겠습니까?'}
            leftBtnText={'취소'}
            rightBtnText={'확인'}
            leftBtnColor={'#222222'}
            rightBtnColor={'#F75015'}
            exit={exitHandle}
            leftBtnControl={exitHandle}
            rightBtnControl={modalRightBtnControll}
          />
        )}
        {/* 헤더 */}
        <CompanyHeader back={true} title={data?.chargerProduct?.modelName} />
        {/* 바디 */}
        <Wrapper>
          <WebChargeTitle>{data?.chargerProduct?.modelName}</WebChargeTitle>
          <List>
            <Item>
              <span className="name">모델명</span>
              <span className="value">{data?.chargerProduct?.modelName}</span>
            </Item>
            <Item>
              <span className="name">충전기 종류</span>
              <span className="value">
                {convertKo(M5_LIST, M5_LIST_EN, data?.chargerProduct?.kind)}
              </span>
            </Item>
            <Item>
              <span className="name">충전 타입</span>
              <span className="value">
                {convertKo(
                  M6_LIST,
                  M6_LIST_EN,
                  data?.chargerProduct?.standType,
                )}
              </span>
            </Item>
            <Item>
              <span className="name">충전 채널</span>
              <span className="value">
                {convertKo(M7_LIST, M7_LIST_EN, data?.chargerProduct?.channel)}
              </span>
            </Item>
            <Item>
              <span className="name">충전 방식</span>
              <span className="value">
                {data?.chargerProduct?.method?.map((method, index) => (
                  <React.Fragment key={index}>
                    {method}
                    <br />
                  </React.Fragment>
                ))}
              </span>
            </Item>
            <Item>
              <span className="name">제조사</span>
              <span className="value">
                {data?.chargerProduct?.manufacturer}
              </span>
            </Item>

            {data?.chargerProduct?.feature?.length! >= 1 ? (
              <>
                <Item>
                  <span className="name">특장점</span>
                </Item>
                <FeatureBox
                  aria-label="chargerProduct feature"
                  value={data?.chargerProduct?.feature}
                  readOnly={true}
                />
              </>
            ) : (
              <Item>
                <span className="name">특장점</span>
                <span className="value">-</span>
              </Item>
            )}
            <Section grid={true}>
              <Subtitle>충전기 이미지</Subtitle>
              <GridImg>
                {data?.chargerProduct?.chargerImageFiles?.map((img, index) => (
                  <GridItem key={index}>
                    <Image
                      src={img.url}
                      alt={img.originalName}
                      layout="fill"
                      priority={true}
                      unoptimized={true}
                      objectFit="cover"
                      style={{ borderRadius: '6pt' }}
                    />
                  </GridItem>
                ))}
              </GridImg>
            </Section>
            <Section>
              <Subtitle>충전기 카탈로그</Subtitle>
              <FileWrap>
                {data?.chargerProduct?.chargerCatalogFiles?.map(
                  (file, index) => (
                    <FileDownload
                      key={index}
                      // href={file.url}
                      download={file.originalName}
                      onClick={() => {
                        fileDownload(userAgent, file.originalName, file.url);
                      }}
                    >
                      <FileBtn>
                        <Image src={fileImg} alt="file-icon" />
                        <FileName> {file.originalName}</FileName>
                      </FileBtn>
                    </FileDownload>
                  ),
                )}
              </FileWrap>
            </Section>
          </List>
          {/* 버튼 태그 */}
          <TwoBtn handleRightBtn={clickDelete} handleLeftBtn={clickEdit} />
        </Wrapper>
      </Inner>
      <WebFooter />
    </WebBody>
  );
};

const WebBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  /* height: 100vh; */
  margin: 0 auto;
  background: #fcfcfc;
  @media (max-height: 809pt) {
    display: block;
    height: 100%;
  }
  @media (max-width: 899.25pt) {
    background: ${colors.lightWhite};
  }
`;

const Inner = styled.div`
  display: block;
  position: relative;
  margin: 100pt auto;
  width: 900pt;
  border-radius: 12pt;
  @media (max-width: 899.25pt) {
    width: 100%;
    height: 100vh;
    position: relative;
    padding: 0;
    box-shadow: none;
    background: none;
    margin: 0;
  }

  @media (min-width: 900pt) {
    margin: 54pt auto 100pt;
    background-color: #ffffff;
    width: 580.5pt;
    border-radius: 12pt;
    box-shadow: 0px 0px 7.5pt rgba(137, 163, 201, 0.2);
    height: auto;
    padding: 0 17.25pt 0 20.25pt;
  }
`;

const Wrapper = styled.div`
  padding-bottom: 100pt;
  @media (max-width: 899.25pt) {
    padding-top: 21pt;
  }
  @media (min-width: 900pt) {
    padding-bottom: 40.5pt;
  }
`;
const WebChargeTitle = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 15pt;
  font-weight: 700;
  line-height: 12pt;
  letter-spacing: -0.02em;
  text-align: center;
  padding-top: 32.25pt;
  padding-bottom: 72pt;
  color: #222222;
  @media (max-width: 899.25pt) {
    display: none;
  }
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  flex: 1;

  @media (max-width: 899.25pt) {
    margin-top: 0pt;
    padding: 0 15pt;
  }
`;

const Section = styled.section<{ grid?: boolean; pb?: number }>`
  padding-top: 12pt;

  @media (max-width: 899.25pt) {
    /* padding: 18pt 15pt; */
  }
  @media (min-width: 900pt) {
    padding-top: 15pt;
    display: flex;
    justify-content: space-between;
  }
`;
const List = styled.ul`
  /* padding: 30pt 0 51pt; */
  gap: 12pt;
  @media (max-width: 899.25pt) {
    padding-left: 15pt;
    padding-right: 15pt;
  }

  @media (min-width: 900pt) {
    gap: 15pt;
  }
`;
const Item = styled.li`
  display: flex;

  :not(:nth-of-type(1)) {
    padding-top: 12pt;
  }
  @media (min-width: 900pt) {
    padding-top: 15pt;
    :not(:nth-of-type(1)) {
      padding-top: 15pt;
    }
  }

  .name {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    letter-spacing: -0.02em;
    color: ${colors.gray2};
    flex: 1;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }
  .value {
    font-weight: 500;
    font-size: 10.5pt;
    line-height: 12pt;
    text-align: left;
    letter-spacing: -0.02em;
    color: ${colors.main2};
    flex: 2;
    @media (min-width: 900pt) {
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }

  @media (max-width: 899.25pt) {
    justify-content: space-between;
    .name {
      flex: none;
    }
    .value {
      flex: none;
      text-align: right;
    }
  }
  @media (min-width: 900pt) {
    justify-content: space-between;
    .name {
      flex: none;
    }
    .value {
      flex: none;
      text-align: right;
    }
  }
`;
const FeatureBox = styled(TextareaAutosize)`
  box-sizing: border-box;
  resize: none;
  padding: 12pt;
  gap: 7.5pt;
  width: 100%;
  border: 1px solid ${colors.gray};
  margin-top: 9pt;
  border-radius: 6pt;
  font-weight: 400;
  font-size: 10.5pt;
  line-height: 15pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Subtitle = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 10.5pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.gray2};
  /* flex: 1; */
  @media (min-width: 900pt) {
    font-size: 12pt;
    font-weight: 500;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
    width: 90pt;
  }
`;
const GridImg = styled.div`
  display: grid;
  padding-top: 9pt;
  grid-template-columns: repeat(3, 81pt);
  gap: 3.75pt;
  width: 100%;

  @media (min-width: 900pt) {
    padding-top: 0;
    justify-content: flex-end;
    width: 500pt;
  }
`;
const GridItem = styled.div`
  text-align: center;
  position: relative;
  border-radius: 6pt;
  height: 97.5pt;
  @media (min-width: 900pt) {
    border-radius: 6pt;
  }
`;
const FileDownload = styled.a`
  text-decoration: none;
`;
const FileBtn = styled(Button)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  max-width: 100%;
  gap: 3pt;
  margin-top: 9pt;
  padding: 7.5pt 6pt;
  border: 0.75pt solid ${colors.lightGray3};
  color: ${colors.gray2};
  border-radius: 6pt;

  @media (min-width: 900pt) {
    margin-top: 0;
    margin-bottom: 9pt;
  }
`;

const FileName = styled.div`
  display: block;
  width: 150pt;
  font-weight: 400;
  padding-top: 2pt;
  white-space: nowrap;
  font-size: 10.5pt;
  line-height: 9pt;
  letter-spacing: -0.02em;
  color: ${colors.dark2};
  text-overflow: ellipsis;
  overflow: hidden;
`;

const FileWrap = styled.div`
  @media (min-width: 900pt) {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    width: 500pt;
  }
`;
export default MyProduct;
