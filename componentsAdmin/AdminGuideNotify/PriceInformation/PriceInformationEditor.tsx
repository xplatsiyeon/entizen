import React, { useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import colors from 'styles/colors';

import AdminHeader from 'componentsAdmin/Header';
import { AdminBtn } from 'componentsAdmin/Layout';
import { isTokenAdminPatchApi } from 'api';
import {
  isTokenAdminGetApi,
  isTokenAdminPostApi,
  isTokenAdminPutApi,
  isTokenAdminDeleteApi,
} from 'api';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import WriteModal from 'componentsAdmin/Modal/WriteModal';
import AlertModal from 'componentsAdmin/Modal/AlertModal';
import DropDownBtn from 'componentsAdmin/DropDownBtn';
import { AdminGuideListResponse } from 'types/tableDataType';
import { EditorState } from 'draft-js';
import { multerAdminApi } from 'api';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import GuideTiptapEditor from '../GuideTiptapEditor';
import AdminGuideBanner from '../AdminGuideBanner';
import { GuideImage } from '../PlatformGuide/PlatformGuideEditor';

type IMG = {
  originalName: string;
  size: number;
  url: string;
  createdAt?: string | undefined;
  bannerImageIdx?: number | undefined;
};

type Props = {
  setIsDetail: React.Dispatch<React.SetStateAction<boolean>>;
  detatilId?: string;
  setChangeNumber: React.Dispatch<React.SetStateAction<boolean>>;
};

// export const dropDownValueEn = ['LOCATION', 'PERSONAL_INFO', 'SERVICE'];

export const dropDownValue = [
  '충전전력요금',
  '일반사항-선택요금제도',
  '일반사항-전압구분',
  '일반사항-계절별 시간대별 구분',
];

// PLATFORM: 플랫폼 가이드, SUBSCRIPTION: 구독 가이드, CHARGER: 충전기 가이드, FEE: 요금 정보

export interface GuideUpdate {
  isSuccess: true;
  data: {
    guide: {
      createdAt: string;
      updatedAt: string;
      deletedAt: string;
      guideIdx: number;
      guideKind: string;
      title: string;
      content: string;
      guideImages: GuideImage[];
    };
  };
}

const PriceInformationEditor = ({
  setIsDetail,
  detatilId,
  setChangeNumber,
}: Props) => {
  const queryClinet = useQueryClient();
  // 공지사항 등록, 수정시 refetch
  // 리스트 페이지 데이터 불러오는 api 임
  const { data: guideList, refetch: guideListRefetch } =
    useQuery<AdminGuideListResponse>('guideList', () =>
      isTokenAdminGetApi(`/admin/guides`),
    );

  const secondArray = guideList?.data?.guides
    ?.filter((item) => item.guideKind === 'FEE')
    .map((el) => el.title);

  const newDropDown = (firstArray: string[], secondArray: string[]) => {
    return firstArray.filter((item) => !secondArray.includes(item));
  };

  // 이전페이지 누르면 나오는 경고 모달창 열고 닫고
  const [isModal, setIsModal] = useState<boolean>(false);
  // 수정 등록 버튼 누를때 나오는 모달창
  const [messageModal, setMessageModal] = useState<boolean>(false);
  // 경고창에 보내는 메세지
  const [message, setMessage] = useState('');
  // 배너 이미지
  const [pcImgArr, setPcImgArr] = useState<IMG[]>([]);
  const [tabletImgArr, setTabletImgArr] = useState<IMG[]>([]);
  const [mobileImgArr, setMobileImgArr] = useState<IMG[]>([]);

  // 페이지 전체 렌더링
  const [open, setOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useQuery<GuideUpdate>(
    'adminGuideDetail',
    () => isTokenAdminGetApi(`/admin/guides/${detatilId}`),
    {
      onSuccess: async (res) => {
        // setBodyText(res?.data?.guide?.content!);
        // const { guideImages } = res?.data?.guide;
        // const PC = await guideImages.find((e) => e.imageSizeType === 'PC');
        // const TABLET = await guideImages.find(
        //   (e) => e.imageSizeType === 'TABLET',
        // );
        // const MOBILE = await guideImages.find(
        //   (e) => e.imageSizeType === 'MOBILE',
        // );
        // if (PC) setPcImgArr([PC]);
        // if (TABLET) setTabletImgArr([TABLET]);
        // if (MOBILE) setMobileImgArr([MOBILE]);
      },
      onSettled: (res) => {
        res?.data?.guide?.guideKind === 'FEE';
      },
    },
  );

  const editorImgRef = useRef<any>(null);

  // 이미지 set
  const [editorImg, setEditorImg] = useState<any>();

  // 본문 초기값
  const firstContent = data?.data?.guide?.content!;

  // 본문
  const [bodyText, setBodyText] = useState<string>('');

  // 약관 타입
  const [selectValue, setSelectValue] = useState<string>('');
  const [selctValueEn, setSelctValueEn] = useState<number>(0);
  const [selctValueKr, setSelctValueKr] = useState<number>(0);

  // Draft 값 state
  // useState로 상태관리하기 초기값은 EditorState.createEmpty()
  // EditorState의 비어있는 ContentState 기본 구성으로 새 개체를 반환 => 이렇게 안하면 상태 값을 나중에 변경할 수 없음.
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (editorState: EditorState) => {
    // editorState에 값 설정
    setEditorState(editorState);
  };

  const rendered = useRef(false);

  const WriteModalHandle = () => {
    setIsModal(true);
  };

  const leftBtnHandle = () => {
    setIsModal(false);
    setIsDetail(false);
  };
  const rightBtnHandle = () => {
    setIsModal(false);
  };

  // id값 없으면 등록 버튼만 나오게 하고 id값 있으면 수정 및 취소 버튼 나오도록

  // 등록 api
  const {
    mutate: postMutate,
    isLoading: postLoading,
    isError: postError,
  } = useMutation(isTokenAdminPostApi, {
    onSuccess: () => {
      guideListRefetch();
      setMessageModal(true);
      setMessage('추가가 완료 됐습니다.');
    },
    onError: () => {
      setMessageModal(true);
      setMessage('추가 요청을 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  // 수정 api

  const { mutate: modifiedMutate, isLoading: modifiedIsLoading } = useMutation(
    isTokenAdminPatchApi,
    {
      onSuccess: () => {
        setMessageModal(true);
        guideListRefetch();
        setMessage('수정이 완료됐습니다!');
      },
      onError: (error: any) => {
        setMessageModal(true);
        setMessage('수정 요청을 실패했습니다.\n다시 시도해주세요.');
        // router.back();
      },
    },
  );

  // 이미지 데이터 추출
  const getImges = () => {
    const images = [];
    if (pcImgArr.length > 0) {
      images.push({
        type: 'PC',
        url: pcImgArr[0].url,
        size: pcImgArr[0].size,
        originalName: pcImgArr[0].originalName,
      });
    }

    if (tabletImgArr.length > 0) {
      images.push({
        type: 'TABLET',
        url: tabletImgArr[0].url,
        size: tabletImgArr[0].size,
        originalName: tabletImgArr[0].originalName,
      });
    }

    if (mobileImgArr.length > 0) {
      images.push({
        type: 'MOBILE',
        url: mobileImgArr[0].url,
        size: mobileImgArr[0].size,
        originalName: mobileImgArr[0].originalName,
      });
    }

    return images;
  };

  // 등록 버튼 클릭
  const modalPostBtnControll = () => {
    if (detatilId === '') {
      postMutate({
        url: `/admin/guides`,
        data: {
          guideKind: 'FEE',
          // title: newDropDown(dropDownValue, secondArray!)[selctValueKr],
          title: selectValue,
          content: bodyText ? bodyText : '',
          images: getImges(),
        },
      });
    }
  };

  // 수정 버튼 클릭
  const onClickModifiedBtn = () => {
    // 수정 API
    modifiedMutate({
      url: `/admin/guides/${detatilId}`,
      data: {
        content: bodyText ? bodyText : '',
        images: getImges(),
      },
    });
  };

  // 삭제 api
  const {
    mutate: patchMutate,
    isLoading: patchLoading,
    isError: patchError,
  } = useMutation(isTokenAdminDeleteApi, {
    onSuccess: () => {
      queryClinet.invalidateQueries('user-mypage');
      setMessageModal(true);
      setMessage('삭제가 완료 됐습니다.');
    },
    onError: () => {
      setMessageModal(true);
      setMessage('삭제 요청을 실패했습니다.\n다시 시도해주세요.');
    },
    onSettled: () => {},
  });

  const modalDeleteBtnControll = () => {
    patchMutate({
      url: `/admin/guides/${detatilId}`,
    });
  };

  const { mutate: guidesImage, isLoading: multerMobileImageLoading } =
    useMutation<MulterResponse, AxiosError, FormData>(multerAdminApi, {
      onSuccess: (res) => {
        const newFile = editorImg;
        res?.uploadedFiles.forEach((img) => {
          newFile.push({
            url: img.url,
            size: img.size,
            originalName: decodeURIComponent(img.originalName),
          });
        });
        setEditorImg(newFile);
      },
      onError: (error: any) => {
        if (error.response.data.message) {
          console.log(`첫번째 에러:${error.response.data.message}`);
        } else if (error.response.status === 413) {
          console.log('용량이 너무 큽니다.');
        } else {
          console.log('다시 시도해주세요');
        }
      },
    });

  const saveFileTermsImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 1;
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append('guide', files![i], encodeURIComponent(files![i].name));
    }
    guidesImage(formData);
    e.target.value = '';
  };

  useEffect(() => {
    setSelctValueKr(
      newDropDown(dropDownValue, secondArray!).indexOf(selectValue),
    );
    if (data?.data?.guide?.title !== undefined) {
      setSelctValueKr(
        newDropDown(dropDownValue, secondArray!).indexOf(
          data?.data?.guide?.title,
        ),
      );
    } else {
      setSelctValueKr(0);
    }
  }, [data, selctValueKr, selectValue]);

  // 초기 이미지 설정
  useEffect(() => {
    console.log('초기 이미지 렌더링');
    setBodyText(data?.data?.guide?.content!);
    const guideImages = data?.data?.guide?.guideImages!;
    if (guideImages) {
      const PC = guideImages.find((e) => e.imageSizeType === 'PC');
      const TABLET = guideImages.find((e) => e.imageSizeType === 'TABLET');
      const MOBILE = guideImages.find((e) => e.imageSizeType === 'MOBILE');
      if (PC) setPcImgArr([PC]);
      if (TABLET) setTabletImgArr([TABLET]);
      if (MOBILE) setMobileImgArr([MOBILE]);
    }
  }, [data]);

  return (
    <>
      <Background>
        <Wrapper>
          {messageModal && (
            <AlertModal
              setIsModal={setIsModal}
              message={message}
              setIsDetail={setIsDetail}
              setChangeNumber={setChangeNumber}
            />
          )}
          {isModal && (
            <WriteModal
              message={'작성 내용이 등록되지 않았습니다.'}
              subMessage={'페이지를 나가시겠습니까?'}
              leftBtn={'예'}
              rightBtn={'아니오'}
              leftBtnHandle={leftBtnHandle}
              rightBtnHandle={rightBtnHandle}
              setWriteModal={setIsModal}
            />
          )}
          <AdminHeader
            title=""
            type="text"
            exelHide={false}
            WriteModalHandle={WriteModalHandle}
          />
          <TitleWrapper>
            <MainText>가이드 수정</MainText>
            <SubText>요금 정보</SubText>
          </TitleWrapper>
          <SubText>요금 정보 등록</SubText>
          <TitleContainer>
            {data?.data?.guide?.title === undefined ? (
              <DropDownBtn
                dropDownValue={newDropDown(dropDownValue, secondArray!)}
                setSelectValue={setSelectValue}
                selectValue={selectValue}
                currentStep={
                  newDropDown(dropDownValue, secondArray!)[selctValueKr]
                }
                width={'230px'}
                background={'#E2E5ED'}
                border={'#747780'}
              />
            ) : (
              <SecondText>{data?.data?.guide?.title}</SecondText>
            )}
          </TitleContainer>
          {/* ============================= 사이즈 별 사진 추가 =========================== */}
          <AdminGuideBanner
            pcImgArr={pcImgArr}
            setPcImgArr={setPcImgArr}
            tabletImgArr={tabletImgArr}
            setTabletImgArr={setTabletImgArr}
            mobileImgArr={mobileImgArr}
            setMobileImgArr={setMobileImgArr}
            setMessage={setMessage}
            setMessageModal={setMessageModal}
          />
          {/* ============================= 텍스트 에디터 =============================== */}
          <GuideTiptapEditor
            setBodyText={setBodyText}
            bodyText={bodyText}
            firstContent={firstContent!}
            setEditorImg={setEditorImg}
            editorImg={editorImg}
            detatilId={detatilId}
          />

          <BtnBox>
            {detatilId !== '' ? (
              <>
                <AdminBtn
                  onClick={() => {
                    modalDeleteBtnControll();
                  }}
                >
                  삭제
                </AdminBtn>
                <>
                  <input
                    style={{ display: 'none' }}
                    ref={editorImgRef}
                    type="file"
                    accept="image/*"
                    onChange={saveFileTermsImage}
                    multiple
                  />
                  <AdminBtn
                    onClick={() => {
                      onClickModifiedBtn();
                    }}
                  >
                    수정
                  </AdminBtn>
                </>
              </>
            ) : (
              <>
                <AdminBtn
                  onClick={() => {
                    modalPostBtnControll();
                  }}
                >
                  등록
                </AdminBtn>
              </>
            )}
          </BtnBox>
        </Wrapper>
      </Background>
    </>
  );
};

export default PriceInformationEditor;

const Background = styled.div`
  width: 100%;
  height: 100vh;
  background-color: ${colors.lightWhite};
  padding: 0 18pt;
  position: absolute;
  left: 154.5pt;
  z-index: 10;
  overflow-y: scroll;
  padding-bottom: 75px;
`;

const Wrapper = styled.div`
  width: 964px;
  display: flex;
  flex-direction: column;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: baseline;
  width: 964px;
`;

const MainText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 24px;
  color: #000000;
  font-weight: 500;
  margin-right: 11px;
`;
const SubText = styled.div`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 16px;
  color: #000000;
  font-weight: 500;
  margin-top: 20px;
  height: 32px;
`;
const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`;

const TitleBox = styled.div`
  width: 778px;
  height: 32px;
  display: flex;
  align-items: center;
  border: 1px solid #e2e5ed;
  border-radius: 3px;
  padding: 0 6px;
`;

const TitleText = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-size: 14px;
  color: #000000;
  font-weight: 500;
  margin-right: 10px;
  padding-right: 8px;
  border-right: 2px solid #e2e5ed;
`;

const TitleArea = styled.input`
  border: none;
  outline: none;
  resize: none;
  background: none;
`;

const MainTextArea = styled.textarea`
  width: 964px;
  height: 416px;
  border: 1px solid #e2e5ed;
  outline: none;
  resize: none;
  background: none;
  padding: 8px;
  border-radius: 3px;
  margin-bottom: 8px;
`;

const BtnBox = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
  margin-top: 60px;
`;

const SecondText = styled.span`
  font-family: 'Spoqa Han Sans Neo';
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  /* color: ${colors.main2}; */
  color: #5221cb;
  text-align: left;
  cursor: pointer;
`;
