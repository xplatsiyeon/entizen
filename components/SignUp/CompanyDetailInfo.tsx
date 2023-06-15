import styled from '@emotion/styled';
import { Box, InputAdornment, TextField, Typography } from '@mui/material';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import colors from 'styles/colors';
import Btn from './button';
import CloseImg from 'public/images/XCircle.svg';
import Image from 'next/image';
import AddImg from 'public/images/add-img.svg';
import CompanyAddress from './CompanyAddress';
import FileSelectModal from 'components/Modal/FileSelectModal';
import { BusinessRegistrationType } from '.';
import FileText from 'public/images/FileText.png';
import { getByteSize } from 'utils/calculatePackage';
import { useMutation } from 'react-query';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import { multerApi } from 'api';
import Modal from 'components/Modal/Modal';
import { requestPermissionCheck } from 'bridge/appToWeb';
import Loader from 'components/Loader';
import { useMediaQuery } from 'react-responsive';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { selectAction } from 'store/loginTypeSlice';

type Props = {
  businessRegistration: BusinessRegistrationType[];
  setBusinessRegistration: Dispatch<SetStateAction<BusinessRegistrationType[]>>;
  companyName: string;
  setCompanyName: Dispatch<SetStateAction<string>>;
  postNumber: string;
  setPostNumber: Dispatch<SetStateAction<string>>;
  companyAddress: string;
  setCompanyAddress: Dispatch<SetStateAction<string>>;
  companyDetailAddress: string;
  setCompanyDetailAddress: Dispatch<SetStateAction<string>>;
  addressOn: boolean;
  setAddressOn: Dispatch<SetStateAction<boolean>>;
};
const CompanyDetailInfo = ({
  businessRegistration,
  setBusinessRegistration,
  companyName,
  setCompanyName,
  postNumber,
  setPostNumber,
  companyAddress,
  setCompanyAddress,
  companyDetailAddress,
  setCompanyDetailAddress,
  addressOn,
  setAddressOn,
}: Props) => {
  const mobile = useMediaQuery({
    query: '(max-width:899.25pt)',
  });

  console.log('⭐️ businessRegistration : ', businessRegistration);
  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<string>('');
  // const { userAgent } = useSelector((state: RootState) => state.userAgent);
  const userAgent = JSON.parse(sessionStorage.getItem('userAgent')!);

  const [nextPageOn, setNextPageOn] = useState<boolean>(false);
  const [fileModal, setFileModal] = useState<boolean>(false);
  const [isModal, setIsModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const dispatch = useDispatch();
  const { signUpLevel } = useSelector((state: RootState) => state.LoginType);

  // image s3 multer 저장 API (with useMutation)
  const { mutate: multerImage, isLoading: multerImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      // console.log(TAG + ' 👀 ~ line 77 multer onSuccess');
      // console.log(res);
      const newArr = [...businessRegistration];
      res?.uploadedFiles.forEach((img) => {
        newArr.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
          typeName: typeRef.current,
        });
      });
      setBusinessRegistration(newArr);
      typeRef.current = '';
      // imgRef.current?.remove.
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setErrorMessage(error.response.data.message);
        setIsModal(true);
      } else if (error.response.status === 413) {
        setErrorMessage('용량이 너무 큽니다.');
        setIsModal(true);
      } else {
        setErrorMessage('다시 시도해주세요');
        setIsModal(true);
      }
    },
  });
  // 모달 클릭
  const onClickModal = () => {
    setIsModal(false);
  };

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyName(e.target.value);
  };
  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // setLevel(level + 1);
    dispatch(selectAction.setSignUpLevel(signUpLevel + 1));
  };

  // 파일 클릭
  const onClickFile = () => {
    setFileModal(false);
    if (!userAgent) {
      fileRef?.current?.click();
    } else {
      requestPermissionCheck(userAgent, 'file');
    }
  };
  // 이미지 클릭
  const onClickPhoto = () => {
    setFileModal(false);
    if (!userAgent) {
      imgRef?.current?.click();
    } else {
      requestPermissionCheck(userAgent, 'photo');
    }
  };
  // 이미지 or 파일 클릭
  const handleOnClick = () => {
    const isImage =
      businessRegistration.filter((e) => e.typeName === 'image').length > 0;
    const isFile =
      businessRegistration.filter((e) => e.typeName === 'file').length > 0;
    setFileModal(true);
    if (!isImage && !isFile) setFileModal(true);
    if (isImage) onClickPhoto();
    if (isFile) onClickFile();
  };
  // 사진 || 파일 저장
  const saveFileImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files, name } = e.target;
    console.log('⭐️ files : ', files);

    if (files !== undefined && files?.length! > 0) {
      const maxLength = 3;
      // max길이 보다 짧으면 멈춤
      const formData = new FormData();
      for (let i = 0; i < maxLength; i += 1) {
        if (files![i] === undefined) {
          break;
        }
        formData.append(
          'businessRegistration',
          files![i],
          encodeURIComponent(files![i].name),
        );
      }
      typeRef.current = name;
      multerImage(formData);
    }
  };
  // 사진 || 파일 삭제
  const deleteFileImage = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...businessRegistration];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setBusinessRegistration(copyArr);
      }
    }
  };

  const closeButton = () => setFileModal(false);

  // 버튼 유효성 검사
  useEffect(() => {
    if (
      companyName &&
      postNumber &&
      companyAddress &&
      companyDetailAddress &&
      businessRegistration.length >= 1
    ) {
      setNextPageOn(true);
    } else {
      setNextPageOn(false);
    }
  }, [
    companyName,
    postNumber,
    companyAddress,
    companyDetailAddress,
    businessRegistration,
  ]);

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

  // 주소검색
  if (addressOn) {
    return (
      <CompanyAddress
        setPostNumber={setPostNumber}
        setCompanyAddress={setCompanyAddress}
        setAddressOn={setAddressOn}
        setCompanyDetailAddress={setCompanyDetailAddress}
      />
    );
  }
  return (
    <Wrap>
      {/* 에러 모달 */}
      {isModal && <Modal click={onClickModal} text={errorMessage} />}
      {fileModal && (
        <FileSelectModal
          onClickFile={onClickFile}
          onClickPhoto={onClickPhoto}
          cencleBtn={closeButton}
        />
      )}
      {mobile && (
        <Info>
          상세 내용을
          <br />
          입력해주세요
        </Info>
      )}
      {!mobile && <Info>상세 내용을 입력해주세요</Info>}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: mobile ? '24pt' : '49.5pt',
          width: '100%',
          position: 'relative',
        }}
      >
        <Label>회사명</Label>
        <Input
          type="text"
          autoComplete="new-password"
          placeholder="기업명 입력"
          onChange={handleCompanyNameChange}
          value={companyName}
          name="companyName"
        />
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          marginTop: '30pt',
          width: '100%',
        }}
      >
        <Label>주소</Label>
        <Input
          type="text"
          autoComplete="new-password"
          placeholder="회사 우편번호 입력"
          value={postNumber}
          name="id"
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment position="end">
                <OverlapBtn
                  className="overlap"
                  onClick={() => setAddressOn(true)}
                >
                  <span className="checkOverlap">주소 찾기</span>
                </OverlapBtn>
              </InputAdornment>
            ),
          }}
        />
        <Input
          type="text"
          autoComplete="new-password"
          placeholder="회사 주소 입력"
          value={companyAddress}
          name="checkPw"
          InputProps={{
            readOnly: true,
          }}
        />
        <Input
          type="text"
          autoComplete="new-password"
          placeholder="회사 상세주소 입력"
          value={companyDetailAddress}
          onChange={(e) => setCompanyDetailAddress(e.target.value)}
          name="checkPw"
        />
      </Box>
      <RemainderInputBox>
        <PhotosBox>
          <Form>
            <label>사업자 등록증</label>
            <div>
              <File onClick={handleOnClick}>
                <Image src={AddImg} alt="img" />
                <div>이미지 또는 파일 업로드</div>
              </File>
            </div>
          </Form>
          {/* 이미지 input */}
          <input
            style={{ display: 'none' }}
            ref={imgRef}
            className="imageClick"
            type="file"
            name="image"
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
            name="file"
            accept=".xlsx,.pdf,.pptx,.ppt,.ppt,.xls,.doc,.docm,.docx,.txt,.hwp"
            onChange={saveFileImage}
            multiple
          />
          {/* <Img_Preview> */}
          {multerImageLoading ? (
            <Loader type="images" />
          ) : (
            <>
              <div className="img-preview">
                {/* {imgPreview */}
                {businessRegistration
                  ?.filter((e) => e.typeName === 'image')
                  ?.map((item, index) => (
                    <ImgSpan key={index} data-name={index}>
                      <Image
                        layout="fill"
                        alt="preview"
                        data-name={index}
                        key={index}
                        src={item.url}
                        priority={true}
                        unoptimized={true}
                      />
                      <Xbox onClick={deleteFileImage} data-name={index}>
                        <Image
                          src={CloseImg}
                          data-name={index}
                          layout="intrinsic"
                          alt="closeBtn"
                          width={24}
                          height={24}
                        />
                      </Xbox>
                    </ImgSpan>
                  ))}
              </div>
              {/* {filePreview */}
              <div className="file-preview">
                {businessRegistration
                  ?.filter((e) => e.typeName === 'file')
                  ?.map((item, index) => (
                    <FileBox key={index} data-name={index}>
                      <div className="file">
                        <div className="file-img">
                          <Image src={FileText} alt="file-icon" />
                        </div>
                        <div className="file-data">
                          <FileName>{item.originalName}</FileName>
                          <span className="file-size">{`용량 ${getByteSize(
                            item.size,
                          )}`}</span>
                        </div>
                      </div>
                      <div
                        className="file-exit"
                        onClick={deleteFileImage}
                        data-name={index}
                      >
                        <Image
                          src={CloseImg}
                          data-name={index}
                          alt="closeBtn"
                        />
                      </div>
                    </FileBox>
                  ))}
              </div>
            </>
          )}
        </PhotosBox>
      </RemainderInputBox>
      <Btn
        isClick={nextPageOn}
        text={'다음'}
        marginTop={15}
        bottom={30}
        handleClick={handleNextClick}
      />
    </Wrap>
  );
};
const Wrap = styled.div`
  padding-left: 15px;
  padding-right: 15px;
`;
const Info = styled.p`
  font-family: 'Spoqa Han Sans Neo';
  padding-top: 6pt;
  font-weight: 700;
  font-size: 18pt;
  line-height: 24pt;
  color: ${colors.main2};
  @media (min-width: 900pt) {
    padding-top: 45.75pt;
    font-family: 'Spoqa Han Sans Neo';
    font-size: 15pt;
    font-weight: 700;
    line-height: 22.5pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
`;
const Label = styled.label`
  font-weight: 500;
  font-size: 12pt;
  line-height: 12pt;
  letter-spacing: -0.02em;
  color: ${colors.main2};
`;
const Input = styled(TextField)`
  /* border: 0.75pt solid ${colors.gray}; */

  border-radius: 6pt;
  margin-top: 9pt;
  outline: none;
  .MuiOutlinedInput-notchedOutline {
    border: 1px solid #e2e5ed;
  }
  & input {
    padding: 10.875pt 0 10.875pt 12pt;
    font-size: 12pt;
    line-height: 12pt;
    ::placeholder {
      /* color: ${colors.gray}; */
      color: #caccd1;
      font-family: 'Spoqa Han Sans Neo';
      font-size: 12pt;
      font-weight: 500;
      line-height: 12pt;
      letter-spacing: -0.02em;
      text-align: left;
    }
  }

  & .MuiInputBase-root {
    padding-right: 9pt;
    border-radius: 6pt;
  }

  .MuiOutlinedInput-root {
    /* &:hover fieldset {
      border-color: #5221cb;
    } */

    &.Mui-focused fieldset {
      border: 0.75pt solid #5221cb;
    }
  }
  & .remove {
    display: none;
  }
  :focus > .remove {
    display: block;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  position: relative;
  & > label {
    font-weight: 500;
    font-size: 16px;
    line-height: 16px;
    letter-spacing: -0.02em;
  }
  & > div {
    margin-top: 12pt;
    border: 0.75pt dashed ${colors.lightGray};
    border-radius: 6pt;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const File = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 9pt;
  padding: 15pt 0;
  cursor: pointer;
  & > input {
    position: absolute;
    width: 0;
    height: 0;
    padding: 0;
    overflow: hidden;
    border: 0;
  }
  & > div {
    font-size: 12pt;
    line-height: 12pt;
    color: #caccd1;
  }
`;
const OverlapBtn = styled.button`
  display: flex;
  .checkOverlap {
    padding: 7.5pt 9pt;
  }
  margin-right: 0;
  font-family: 'Spoqa Han Sans Neo';
  font-style: normal;
  font-weight: 400;
  max-width: 78px;
  width: 78px;
  height: 36px;
  background-color: ${colors.main1};
  color: #ffffff;
  border-radius: 6pt;
  font-size: 10.5pt;

  line-height: 12pt;
  text-align: center;
  cursor: pointer;
`;
const RemainderInputBox = styled.div`
  flex-direction: column;
  display: flex;
  margin-top: 30pt;
`;
const PhotosBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  .img-preview {
    display: flex;
    margin-top: 15pt;
    gap: 6pt;
  }
  .file-preivew {
    background-color: red;
  }
`;
const ImgSpan = styled.div`
  position: relative;
  width: 60pt;
  height: 60pt;
  border-radius: 6pt;
  /* height: 100pt;

  background-color: red; */
`;
const Xbox = styled.div`
  position: absolute;
  cursor: pointer;
  top: 3.75pt;
  right: 3.75pt;
`;
const FileBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${colors.lightWhite2}; // 컬러 왜 안나옴?..
  border-radius: 6pt;
  padding: 12pt 15pt;
  .file {
    display: flex;
  }
  .file-img {
    width: 24pt;
    height: 24pt;
  }
  .file-data {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 9pt;
    padding-left: 15pt;
  }
  .file-name {
    font-weight: 400;
    font-size: 10.5pt;
    line-height: 9pt;
    letter-spacing: -0.02em;
    color: ${colors.dark2};
  }
  .file-size {
    font-weight: 400;
    font-size: 9pt;
    line-height: 9pt;
    letter-spacing: -0.02em;
    color: ${colors.lightGray2};
  }
  .file-exit {
    cursor: pointer;
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

export default CompanyDetailInfo;
