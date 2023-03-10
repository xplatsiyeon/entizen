import React, { useRef, useMemo, useState } from 'react';
import styled from '@emotion/styled';
import 'react-quill/dist/quill.snow.css';
import dynamic from 'next/dynamic';
import ReactQuill from 'react-quill';
import {
  ImgFile,
  MulterResponse,
} from 'componentsCompany/MyProductList/ProductAddComponent';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { multerAdminApi } from 'api';
import Quill from 'quill';

type Props = {
  setBodyText: React.Dispatch<React.SetStateAction<string>>;
  bodyText: string;
  firstContent: string;
};

type IMG = {
  originalName: string;
  size: number;
  url: string;
  createdAt?: string | undefined;
  bannerImageIdx?: number | undefined;
};

type NEWIMG = {
  originalName: string;
  size: number;
  url: string;
};

const AdminTermsQuill = ({ setBodyText, bodyText, firstContent }: Props) => {
  // const ReactQuill = dynamic(() => import('react-quill'), {
  //   ssr: false,
  // });
  // const ReactQuill = useMemo(
  //   () => dynamic(() => import('react-quill'), { ssr: false }),
  //   [],
  // );

  // const ReactQuill = dynamic(
  //   async () => {
  //     const { default: RQ } = await import('react-quill');
  //     return function comp({ forwardedRef, ...props }) {
  //       return <RQ ref={forwardedRef} {...props} />;
  //     };
  //   },
  //   { ssr: false },
  // );

  const [insideImgArr, setInsideImgArr] = useState<IMG[]>([]);
  // 경고창에 보내는 메세지
  const [message, setMessage] = useState('');
  // 수정 등록 버튼 누를때 나오는 모달창
  const [messageModal, setMessageModal] = useState<boolean>(false);
  const QuillRef = React.useRef<ReactQuill>(null);

  const { mutate: inImage, isLoading: multerInImageLoading } = useMutation<
    MulterResponse,
    AxiosError,
    FormData
  >(multerAdminApi, {
    onSuccess: (res) => {
      // console.log(TAG + ' 👀 ~ line 84 multer onSuccess');

      let newFile: NEWIMG[] = [];
      if (insideImgArr !== undefined) {
        newFile = insideImgArr?.map((e) => {
          const { createdAt, bannerImageIdx, ...rest } = e;
          // console.log('rest', { ...rest });
          return { ...rest };
        });
      } else {
        newFile = [];
      }

      res?.uploadedFiles.forEach((img) => {
        newFile.push({
          url: img.url,
          size: img.size,
          originalName: decodeURIComponent(img.originalName),
        });
      });
      setInsideImgArr(newFile);
    },
    onError: (error: any) => {
      if (error.response.data.message) {
        setMessage(error.response.data.message);
        setMessageModal(true);
      } else if (error.response.status === 413) {
        setMessage('용량이 너무 큽니다.');
        setMessageModal(true);
      } else {
        setMessage('다시 시도해주세요');
        setMessageModal(true);
      }
    },
  });

  const range = QuillRef.current?.getEditor().getSelection()?.index;

  const saveFileInsideImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const maxLength = 3;
    const formData = new FormData();
    for (let i = 0; i < maxLength; i += 1) {
      if (files![i] === undefined) {
        break;
      }
      formData.append('banner', files![i], encodeURIComponent(files![i].name));
    }
    inImage(formData);
    e.target.value = '';
  };

  const handleInPhotoDelete = (e: React.MouseEvent<HTMLDivElement>) => {
    const name = Number(e.currentTarget.dataset.name);
    const copyArr = [...insideImgArr];
    for (let i = 0; i < copyArr.length; i++) {
      if (i === name) {
        copyArr.splice(i, 1);
        return setInsideImgArr(copyArr);
      }
    }
  };

  const imgInHandler = () => {
    const input = document.createElement('input');
    const formData = new FormData();
    let url = '';
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    QuillRef.current?.getEditor();
  };

  const Font = Quill.import('formats/font');
  Font.whitelist = ['Spoqa Han Sans Neo'];
  Quill.register(Font, true);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: '1' }, { header: '2' }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ size: ['small', false, 'large', 'huge'] }],
          [{ font: [] }],
          [
            { list: 'ordered' },
            { list: 'bullet' },
            { indent: '-1' },
            { indent: '+1' },
            { align: [] },
          ],
          ['link', 'image'],
        ],
        handlers: {
          image: imgInHandler,
        },
      },
    }),
    [],
  );

  const formats = [
    'header',
    'size',
    'font',
    'bold',
    'italic',
    'underline',
    'strike',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'align',
    'image',
  ];

  // function handleChangeInput(index:any, targetName:any, targetValue:any) {
  //   const values = [...formFields];
  //   values[index][targetName] = targetValue
  //   setFormFields(values); }

  const onChange = (content: string) => {
    setBodyText(content);

    // if (props.onChange) {
    //   props.onChange({
    //     html: content,
    //     markdown: htmlToMarkdown(content)
    //   });
    // }
  };

  return (
    <>
      <ReactQuill
        // ref={(element: any) => {
        //   if (element !== null) {
        //     QuillRef.current = element;
        //   }
        // }}
        ref={QuillRef}
        theme="snow"
        modules={modules}
        formats={formats}
        // value={bodyText !== undefined ? bodyText : firstContent}
        value={bodyText}
        placeholder={'약관을 입력해주세요'}
        // onChange={setBodyText}
        // onChange={value => handleChangeInput(index, 'reactQuill', value)}
        // onChange={(event) => setBodyText(event)}
        onChange={onChange}
        style={{ height: '416px' }}
      />
    </>
  );
};

export default AdminTermsQuill;
