import { useEditor, EditorContent } from '@tiptap/react';
import Image from '@tiptap/extension-image';
import StarterKit from '@tiptap/starter-kit';
import TipTapMenu from './TipTapMenu';
import styled from '@emotion/styled';

type Props = {
  setBodyText: React.Dispatch<React.SetStateAction<string>>;
  bodyText: string;
  firstContent?: string;
};

const AdminTibtapEditor = ({ setBodyText, bodyText, firstContent }: Props) => {
  const editor = useEditor({
    extensions: [StarterKit, Image],
  });

  return (
    <Wrapper>
      <TipTapMenu editor={editor} />
      <EditorContent
        editor={editor}
        onChange={() => {
          setBodyText(editor?.getHTML()!);
        }}
      />
    </Wrapper>
  );
};

export default AdminTibtapEditor;

const Wrapper = styled.div`
  .ProseMirror {
    width: 100%;
    height: 500px;
    border: 1px solid red;
    padding: 10px;
  }
`;
