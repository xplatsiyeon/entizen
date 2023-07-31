import { useEditor, EditorContent } from '@tiptap/react';
import Image from '@tiptap/extension-image';
import { useMutation } from 'react-query';
import StarterKit from '@tiptap/starter-kit';
import styled from '@emotion/styled';
import TextAlign from '@tiptap/extension-text-align';
import { BulletList } from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import { Color } from '@tiptap/extension-color';
import { FontSize } from 'tiptap-extension-font-size';
import TextStyle from '@tiptap/extension-text-style';
import Text from '@tiptap/extension-text';
import HardBreak from '@tiptap/extension-hard-break';
import { useEffect, useRef, useState } from 'react';
import { multerAdminApi } from 'api';
import {
  ImgFile,
  MulterResponse,
} from 'componentsCompany/MyProductList/ProductAddComponent';
import { AxiosError } from 'axios';
import GuideTipTapMenu from './GuideTipTapMenu';

type Props = {
  setBodyText: React.Dispatch<React.SetStateAction<string>>;
  bodyText: string;
  firstContent?: string;
  setEditorImg: React.Dispatch<any>;
  editorImg: any;
  detatilId?: string;
};

const GuideTiptapEditor = ({
  setBodyText,
  bodyText,
  firstContent,
  setEditorImg,
  editorImg,
  detatilId,
}: Props) => {
  const [start, setStart] = useState(false);
  const { mutate: termsImage, isLoading: multerMobileImageLoading } =
    useMutation<MulterResponse, AxiosError, FormData>(multerAdminApi, {
      onSuccess: (res) => {
        console.log(' 👀 ~ line 44 multer onSuccess');
        const newFile = editorImg;
        res?.uploadedFiles.forEach((img) => {
          if (editor) {
            editor
              .chain()
              .focus()
              .setImage({ src: img.url, alt: img.originalName })
              .run();
          }
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
  const addImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files) {
      if (files[0]) {
        const file = files[0];
        const reader = new FileReader();
        let a = [];
        a.push(file);
        setEditorImg(file);
        reader.onloadend = (e) => {
          const data = e.target?.result;
          if (typeof data == 'string' && editor) {
            console.log(typeof data);
            editor.chain().focus().setImage({ src: data, alt: '111' }).run();
          }
        };
        reader.readAsDataURL(file);
        const formData = new FormData();
        for (let i = 0; i < files?.length!; i += 1) {
          if (files![i] === undefined) {
            break;
          }
          formData.append(
            'term',
            files![i],
            encodeURIComponent(files![i].name),
          );
        }
        termsImage(formData);
      }
    }
  };

  const editor = useEditor({
    extensions: [
      HardBreak.extend({
        addKeyboardShortcuts() {
          return {
            Enter: () => this.editor.commands.setHardBreak(),
          };
        },
      }),
      StarterKit,
      Image,
      BulletList,
      ListItem,
      Underline,
      TextStyle,
      Text,
      FontSize,
      Link.configure({
        openOnClick: false,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Color,
    ],
    onUpdate: ({ editor }) => {
      setBodyText(editor?.getHTML());
      addImage;
    },

    content: bodyText,
  });

  useEffect(() => {
    setTimeout(() => {
      setStart(true);
    }, 1000);
  }, [detatilId]);

  useEffect(() => {
    if (bodyText) {
      editor?.commands.insertContent(bodyText);
    }
  }, [start]);

  return (
    <Wrapper>
      <GuideTipTapMenu
        editor={editor}
        setEditorImg={setEditorImg}
        editorImg={editorImg}
        addImage={addImage}
      />
      <EditorContent
        editor={editor}
        // ddKeyboardShortcuts
        // onKeyUp={(event) => {
        //   if (event.key === 'Enter') {
        //     editor?.chain().focus().setHardBreak().run();
        //   }
        // }}
      />
    </Wrapper>
  );
};

export default GuideTiptapEditor;

const Wrapper = styled.div`
  margin-top: 20px;
  .ProseMirror {
    font-family: 'Spoqa Han Sans Neo';
    width: 100%;
    overflow: scroll;
    height: 500px;
    padding: 10px;
    border: 2px solid #e2e5ed;
    border-radius: 3px;
    ul {
      list-style: circle !important;
      padding: 10px;
    }
    ol {
      list-style-type: decimal !important;
      padding: 10px;
    }
    /* :focus {
        border: none;
      } */
    em {
      font-style: italic;
    }
    img {
      width: 70%;
    }
  }

  .ProseMirror .ProseMirror-focused {
    border: none;
  }
`;
