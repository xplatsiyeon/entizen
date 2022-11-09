
import styled from '@emotion/styled';
import Header from 'components/mypage/request/header';
import Image from 'next/image';
import colors from 'styles/colors';
import FileText from 'public/images/FileText.png';
import AddImg from 'public/images/add-img.svg';
import CloseImg from 'public/images/XCircle.svg';
import { MulterResponse } from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import { multerApi } from 'api';
import { useMutation } from 'react-query';
import { BusinessRegistrationType } from 'components/SignUp';
import { useRef, useState } from 'react';
import { getByteSize } from 'utils/calculatePackage';
import Modal from 'components/Modal/Modal';

const EditCertificate =()=>{

  const imgRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // 이미지
  const [imgArr, setImgArr] = useState<BusinessRegistrationType[]>([]);
  // 파일
  const [fileArr, setFileArr] = useState<BusinessRegistrationType[]>([]);

  const [errorMessage, setErrorMessage] = useState('');
  const [isModal, setIsModal] = useState(false);

  // file s3 multer 저장 API (with useMutation)
  const { mutate: multerFile, isLoading: multerFileLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerApi, {
    onSuccess: (res) => {
      console.log(' 👀 multer onSuccess');
      console.log(res);
      const imgs:BusinessRegistrationType[] = [...imgArr];
      const files:BusinessRegistrationType[] =[...fileArr]; 
      res?.uploadedFiles.forEach((img) => {
        const name = img.originalName.split('.')[1].toUpperCase();
        if(name.toUpperCase() === 'PNG' ||name === 'JPG'||name === 'GIF'){
            imgs.push({
                url: img.url,
                size: img.size,
                originalName: decodeURIComponent(img.originalName),
              });
        }else{
            files.push(
                {
                    url: img.url,
                    size: img.size,
                    originalName: decodeURIComponent(img.originalName),
                  }
            )
        }
      });
        setFileArr(files);
        setImgArr(imgs);
      console.log('files', fileArr )
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


  //파일 온클릭
  const handleFileClick = () => {
    fileRef?.current?.click();
  };
  // 파일 저장
  const saveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    console.log('files', files![0])
    const maxLength = 3;
    // max길이 보다 짧으면 멈춤
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append(
        'chargerProduct',
        files![i],
        encodeURIComponent(files![i].name),
      );
    }
    multerFile(formData);


    /* 파일 올린 후 혹은 삭제 후, 똑같은 파일 올릴 수 있도록,*/
    e.target.value ='';
  };

  // 파일 삭제
  const handleFileDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...fileArr];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setFileArr(copyArr);
      }
    }
  };
  const handlePhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...imgArr];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setImgArr(copyArr);
      }
    }
  };

  // 모달 클릭
  const onClickModal = () => {
      setIsModal(false);
  };

    return(
    <>

    {isModal && <Modal click={onClickModal} text={errorMessage} />}
     <Header back={true} title="사업자 등록증 수정" />

     <RemainderInputBoxs>
          <PhotosBoxs>
            <Form>
              <label>충전기 카탈로그</label>
              <div>
                <File onClick={handleFileClick}>
                  <Image src={AddImg} alt="img" />
                  <div>파일 업로드</div>
                </File>
              </div>
            </Form>
            {/* 파일 input */}
            <input
              style={{ display: 'none' }}
              ref={fileRef}
              className="imageClick"
              type="file"
              accept="xlsx"
              onChange={saveFile}
              multiple
            />

            {/* <File_Preview> */}
            <div className="file-preview">
              {fileArr?.map((item, index) => {
                return(
                <FileBox key={index} data-name={index}>
                  <div className="file">
                    <div className="file-img">
                      <Image src={FileText} alt="file-icon" />
                    </div>
                    <div className="file-data">
                      <span className="file-name">{item.originalName}</span>
                      <span className="file-size">{`용량 ${getByteSize(
                        item.size,
                      )}`}</span>
                    </div>
                    <div
                      className="file-exit"
                      onClick={handleFileDelete}
                      data-name={index}
                    >
                      <Image src={CloseImg} data-name={index} alt="closeBtn" />
                    </div>
                  </div>
                </FileBox>
                )})}
            </div>

            <div className="img-preview">
            {imgArr?.map((img, index) => (
              <ImgSpan key={index} data-name={index}>
                <Image
                  layout="fill"
                  alt="preview"
                  data-name={index}
                  key={index}
                  src={img.url}
                  priority={true}
                  unoptimized={true}
                />
                <Xbox onClick={handlePhotoDelete} data-name={index}>
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
          </PhotosBoxs>
        </RemainderInputBoxs>
    </>
    )
}

export default EditCertificate;


const RemainderInputBoxs = styled.div`
  flex-direction: column;
  position: relative;
  width: 100%;
  display: flex;
  /* height: 100%; */
  padding-bottom: 58.6875pt;
  margin-top: 24pt;
  & .file-preview {
    display: flex;
    width: 100%;
    flex-direction: column;
    padding-bottom: 58.6875pt;
    gap: 9pt;
  }
`;

const PhotosBoxs = styled.div`
  /* width: 100%; */
  height: 56.0625pt;
  margin-top: 9pt;
  display: flex;
  flex-direction: column;
  gap: 9pt;
  align-items: center;
  padding-bottom: 58.6875pt;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  /* margin-top: 24pt; */
  position: relative;
  & > label {
    font-family: Spoqa Han Sans Neo;
    font-size: 10.5pt;
    font-weight: 700;
    line-height: 12pt;
    letter-spacing: -0.02em;
    text-align: left;
  }
  & > div {
    margin-top: 9pt;
    width: 100%;
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


const FileBox = styled.div`
  display: flex;
  align-items: center;
  background: ${colors.lightWhite2}; // 컬러 왜 안나옴?..
  border: 1px solid #e2e5ed;
  border-radius: 6pt;
  position: relative;
  box-sizing: border-box;
  padding: 12pt 15pt;
  & .file {
    display: flex;
    width: 100%;
  }
  & .file > .file-img {
    width: 24pt;
    height: 24pt;
  }
  & .file > .file-data {
    display: flex;
    justify-content: center;
    flex-direction: column;
    gap: 9pt;
    padding-left: 15pt;
  }
  & .file > .file-data > .file-name {
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
    /* display: flex;
    justify-content: center;
    align-items: center; */
    cursor: pointer;
    position: absolute;
    top: 16.5pt;
    right: 15pt;
  }
`;

const ImgSpan = styled.div`
  position: relative;
  width: 56.0625pt;
  height: 56.0625pt;
  border-radius: 6pt;
`;
const Xbox = styled.div`
  position: absolute;
  top: -7pt;
  right: -7pt;
`;
