import Image from 'next/image';
import arrowR from 'public/images/grayRightArrow20.png';
import EntizenContractIcon from 'public/images/EntizenContractIcon.png';
import AnyContracIcon from 'public/images/AnyContracIcon.png';
import styled from '@emotion/styled';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { modusign } from 'api/sign';
import {
  GET_InProgressProjectsDetail,
  InProgressProjectsDetailResponse,
} from 'QueryComponents/CompanyQuery';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import Loader from 'components/Loader';
import Modal from 'components/Modal/Modal';
import { api, isTokenPostApi, multerApi } from 'api';
import { modusignCancel } from 'api/cancelSign';
import FileSelectModal from 'components/Modal/FileSelectModal';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { requestPermissionCheck } from 'bridge/appToWeb';
import {
  GET_ModuSignResponse,
  ModuSignResponse,
} from 'QueryComponents/ModuSignQuery';

type Props = {};
type ImageType = 'IMAGE' | 'FILE';
const TAG = 'componentsCompany/Mypage/CompContract.tsx';
const ComContranct = ({}: Props) => {
  const { userAgent } = useSelector((state: RootState) => state.userAgent);

  const router = useRouter();
  const routerId = router.query.projectIdx!;
  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const [isModal, setIsModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  // 자체 계약서 파일 모달
  const [openSelfContract, setOpenSelfContract] = useState(false);
  const [tpye, setType] = useState<ImageType>();

  // -----진행중인 프로젝트 상세 리스트 api-----
  const accessToken = JSON.parse(sessionStorage.getItem('ACCESS_TOKEN')!);
  const {
    loading,
    error,
    data: inProgressData,
    refetch: inProgressRefetch,
  } = useQuery<InProgressProjectsDetailResponse>(GET_InProgressProjectsDetail, {
    variables: {
      projectIdx: router?.query?.projectIdx!,
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  // -------모두싸인 GET API-------

  const {
    loading: inModuSignLoading,
    error: inModuSignErroe,
    data: inModuSignData,
    refetch: inModuSignRefetch,
  } = useQuery<ModuSignResponse>(GET_ModuSignResponse, {
    variables: {
      projectIdx: router?.query?.projectIdx!,
    },
    context: {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ContentType: 'application/json',
      },
    },
  });

  // -------모두싸인 POST API------
  const {
    mutate: modusignMutate,
    isError: modusignIsError,
    isLoading: modusignIsLoading,
    data: modusignData,
  } = useMutation(modusign, {
    onSuccess: (modusignData: any) => {
      console.log('data 확인');
      console.log(modusignData, '💔');
      // 백엔드에 보내줄 API 연결
      const apiData: any = {
        ...modusignData,
        projectIdx: router?.query?.projectIdx,
      };
      contractsMutate({
        url: '/contracts',
        data: {
          contract: JSON.stringify(apiData),
        },
      });
    },
    onError: (error) => {
      console.log('data 확인');
      console.log(error);
      setIsModal(true);
      setModalMessage('계약서 전송이 실패했습니다. 다시 시도해주세요.');
    },
  });
  // ------------모두싸인 POST 후 백엔드에 데이터 전송 --------------
  const {
    mutate: contractsMutate,
    isError: contractsIsError,
    isLoading: contractsIsLoading,
  } = useMutation(isTokenPostApi, {
    onSuccess: () => {
      setIsModal(true);
      setModalMessage('계약서가 전송되었습니다');
    },
    onError: (error) => {
      destroyMutate(modusignData?.id);
      console.log('🔥 모두싸인 POST 에러 ~line 87');
      console.log(error);
    },
  });
  // ------------모두싸인 POST 후 백엔드에 데이터 전송 실패 시 모두싸인에게 계약서 해지 POST --------------
  const {
    mutate: destroyMutate,
    isError: destroyIsError,
    isLoading: destroyIsLoading,
  } = useMutation(modusignCancel, {
    onSuccess: () => {
      setIsModal(true);
      setModalMessage('계약서 전송을 실패했습니다. 다시 시도해주세요.');
    },
    onError: (error: any) => {
      console.log('-----------서명 취소 요청 에러----------');
      console.log(error);
    },
  });
  // /contracts/self
  const { mutate: selfMutate, isLoading: selftLoading } = useMutation(
    isTokenPostApi,
    {
      onSuccess: (res) => {
        console.log(res);
        setIsModal(true);
        setModalMessage('자체 계약서를 전송하였습니다.');
      },
      onError: (error) => {
        setIsModal(true);
        setModalMessage('계약서 전송을 실패했습니다. 다시 시도해주세요.');
      },
    },
  );
  // image s3 multer 저장 API (with useMutation)
  const { mutate: multerImage, isLoading: multerImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: async (res) => {
      const newArr: any = [];
      await res?.uploadedFiles.forEach((img) => {
        newArr.push({
          type: tpye,
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
      });
      selfMutate({
        url: '/contracts/self',
        data: {
          selfContracts: newArr,
          projectIdx: routerId,
        },
      });
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setModalMessage(error.response.data.message);
        setIsModal(true);
      } else if (error.response.status === 413) {
        setModalMessage('용량이 너무 큽니다.');
        setIsModal(true);
      } else {
        setModalMessage('다시 시도해주세요');
        setIsModal(true);
      }
    },
  });

  console.log(TAG + '🔥 ~line 68 ~내프로젝트 진행중인 프로젝트 리스트');
  console.log(modusignData);
  const handleContr = () => modusignMutate(inModuSignData!);

  // 사진 || 파일 저장
  const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 3;
    // max길이 보다 짧으면 멈춤
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append(
        'chatting',
        files![i],
        encodeURIComponent(files![i].name),
      );
    }
    // setType(() => type);
    multerImage(formData);

    /* 파일 올린 후 혹은 삭제 후, 똑같은 파일 올릴 수 있도록,*/
    e.target.value = '';
  };

  const onClickModal = () => {
    if (modalMessage === '자체 계약서를 전송하였습니다.') {
      inProgressRefetch();
      setIsModal(false);
    } else {
      router.push('/company/mypage?id=0');
    }
  };

  // 사진 온클릭
  const imgHandler = () => {
    setType('IMAGE');
    if (userAgent === '') {
      imgRef?.current?.click();
    } else {
      requestPermissionCheck(userAgent, 'photo');
    }
  };
  //파일 온클릭
  const handleFileClick = () => {
    setType('FILE');
    if (userAgent === '') {
      fileRef?.current?.click();
    } else {
      requestPermissionCheck(userAgent, 'file');
    }
  };

  // 앱에서 이미지 or 파일 온클릭 (앱->웹)
  useEffect(() => {
    if (userAgent === 'Android_App') {
      window.openGallery = () => {
        imgRef?.current?.click();
      };
      window.openFileUpload = () => {
        fileRef?.current?.click();
      };
    } else if (userAgent === 'iOS_App') {
      window.openGallery = () => {
        imgRef?.current?.click();
      };
      window.openFileUpload = () => {
        fileRef?.current?.click();
      };
    }
  }, []);

  if (modusignIsLoading || contractsIsLoading || multerImageLoading) {
    return <Loader />;
  }

  return (
    <Wrapper>
      {openSelfContract && (
        <FileSelectModal
          fileText="앨범에서 가져오기"
          photoText="파일에서 가져오기"
          cencleBtn={() => setOpenSelfContract(false)}
          onClickFile={handleFileClick}
          onClickPhoto={imgHandler}
        />
      )}
      {isModal && <Modal click={onClickModal} text={modalMessage} />}
      {/* 이미지 input */}
      <input
        style={{ display: 'none' }}
        ref={imgRef}
        className="imageClick"
        type="file"
        accept="image/*"
        onChange={saveFileImage}
        multiple
        capture={userAgent === 'Android_App' && true}
      />
      {/* 파일 input */}
      <input
        style={{ display: 'none' }}
        ref={fileRef}
        className="imageClick"
        type="file"
        accept=".xlsx,.pdf,.pptx,.ppt,.ppt,.xls,.doc,.docm,.docx,.txt,.hwp"
        onChange={saveFileImage}
        multiple
      />
      <TitleP>계약서를 작성해 주세요</TitleP>
      <P>계약 후 프로젝트가 진행됩니다.</P>
      <FlexBox>
        {/* onclick 함수로 계약서 모달 띄우기 */}
        <EntizenContractBox onClick={handleContr}>
          <TextBox>
            <TitleBox>
              <Title>엔티즌 전자 계약서</Title>
              <TitleIcon>
                <Image src={arrowR} alt=">" />
              </TitleIcon>
            </TitleBox>
            <ExplainText>
              간편하고 안전하게
              <br />
              전자계약 하세요
            </ExplainText>
          </TextBox>
          <BigIconBox>
            <Image src={EntizenContractIcon} alt="큰아이콘" />
          </BigIconBox>
        </EntizenContractBox>

        {/* onclick 함수로 계약서 모달 띄우기 */}
        <EntizenContractBox
          className="forMargin"
          onClick={() => setOpenSelfContract((prev) => !prev)}
        >
          <TextBox>
            <TitleBox>
              <Title>자체 계약서</Title>
              <TitleIcon>
                <Image src={arrowR} alt=">" />
              </TitleIcon>
            </TitleBox>
            <ExplainText>
              날인 완료된 계약서
              <br />
              스캔본을 첨부해 주세요
            </ExplainText>
          </TextBox>
          <BigIconBox>
            <Image src={AnyContracIcon} alt="큰아이콘" />
          </BigIconBox>
        </EntizenContractBox>
      </FlexBox>
    </Wrapper>
  );
};

export default ComContranct;

const Wrapper = styled.div`
  margin-top: 34.5pt;
  background: white;

  @media (min-width: 900pt) {
    margin-top: 0;
  }
`;

const TitleP = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 500;
  font-size: 18pt;
  line-height: 24pt;
  /* identical to box height, or 133% */
  letter-spacing: -0.02em;
  color: #222222;
  text-align: center;
  margin-bottom: 6pt;
`;

const P = styled(TitleP)`
  font-size: 10.5pt;
  line-height: 15pt;
  color: #747780;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 50pt;
  gap: 22.5pt;
  margin-top: 33pt;

  @media (max-width: 899.25pt) {
    flex-direction: column;
    justify-content: flex-start;
    margin-top: 24pt;
    gap: 15pt;
  }
`;

const EntizenContractBox = styled.div`
  padding: 13pt;
  flex: 1;
  height: 105pt;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0px 0px 7.5pt 0px #89a3c933;
  border-radius: 6pt;
  cursor: pointer;

  @media (max-width: 899.25pt) {
    width: auto;
    margin: 0 15pt;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7.5pt;
`;

const TitleBox = styled.div`
  display: flex;
  position: relative;
  align-items: center;
  gap: 3pt;
`;

const Title = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 15pt;
  font-weight: 700;
  line-height: 21pt;
  letter-spacing: -0.02em;
  text-align: left;
`;

const TitleIcon = styled.div`
  position: relative;
  top: -1.2pt;
  width: 15pt;
  height: 15pt;
`;

const ExplainText = styled.div`
  font-family: Spoqa Han Sans Neo;
  font-size: 12pt;
  font-weight: 400;
  line-height: 16.5pt;
  letter-spacing: -0.02em;
  text-align: left;
  color: #a6a9b0;
`;

const BigIconBox = styled.div`
  width: 45pt;
  height: 45pt;
`;
