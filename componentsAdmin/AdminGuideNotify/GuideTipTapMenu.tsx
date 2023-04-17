import { BubbleMenu, FloatingMenu } from '@tiptap/react';
import { Code, FormatBold } from '@mui/icons-material';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import FormatBoldOutlinedIcon from '@mui/icons-material/FormatBoldOutlined';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import { Editor } from '@tiptap/react';
import styled from '@emotion/styled';
import StrikethroughSOutlinedIcon from '@mui/icons-material/StrikethroughSOutlined';
import FormatListNumberedOutlinedIcon from '@mui/icons-material/FormatListNumberedOutlined';
import FormatUnderlinedOutlinedIcon from '@mui/icons-material/FormatUnderlinedOutlined';
import { useCallback, useState } from 'react';
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined';
import LinkOffOutlinedIcon from '@mui/icons-material/LinkOffOutlined';
import FormatAlignCenterOutlinedIcon from '@mui/icons-material/FormatAlignCenterOutlined';
import FormatAlignLeftOutlinedIcon from '@mui/icons-material/FormatAlignLeftOutlined';
import FormatAlignRightOutlinedIcon from '@mui/icons-material/FormatAlignRightOutlined';
import FormatAlignJustifyOutlinedIcon from '@mui/icons-material/FormatAlignJustifyOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import FormatItalicOutlinedIcon from '@mui/icons-material/FormatItalicOutlined';
import ArrowDropUpOutlinedIcon from '@mui/icons-material/ArrowDropUpOutlined';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';

type Props = {
  setEditorImg: React.Dispatch<any>;
  editorImg: any;
  editor: Editor | null;
  addImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

function GuideTipTapMenu({ editor, setEditorImg, editorImg, addImage }: Props) {
  if (!editor) return <></>;

  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  if (!editor) {
    return null;
  }

  const [onColorDropDown, setOnColorDropDown] = useState(false);
  const [onFontDropDown, setOnFontDropDown] = useState(false);
  const [fontSize, setFontSize] = useState('10pt');

  return (
    <Wrapper>
      <div className="editor-menu">
        {/* <button
          type="button"
          aria-label="줄바꿈"
          style={{ border: 'none' }}
          onClick={() => editor.chain().focus().setHardBreak().run()}
        >
          줄바꿈
        </button> */}
        <button
          type="button"
          aria-label="굵은글씨"
          style={{ border: 'none' }}
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <FormatBoldOutlinedIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <FormatItalicOutlinedIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <StrikethroughSOutlinedIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={editor.isActive('underline') ? 'is-active' : ''}
        >
          <FormatUnderlinedOutlinedIcon />
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
          }
        >
          H1
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
        >
          H2
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
          }
        >
          H3
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive('heading', { level: 4 }) ? 'is-active' : ''
          }
        >
          H4
        </button>
        <OnFontDrop
          onClick={() => {
            setOnFontDropDown(!onFontDropDown);
          }}
        >
          <OnFontDropText>{fontSize}</OnFontDropText>
          {onFontDropDown ? (
            <ArrowDropUpOutlinedIcon />
          ) : (
            <ArrowDropDownOutlinedIcon />
          )}
        </OnFontDrop>
        {onFontDropDown && (
          <FontSizeWrapper>
            <SelectFont
              className={
                editor.isActive('textStyle', { fontSize: '10pt' })
                  ? 'is-active'
                  : ''
              }
              onClick={() => {
                editor.chain().focus().setFontSize('10pt').run();
                setFontSize('10pt');
                setOnFontDropDown(!onFontDropDown);
              }}
            >
              10pt
            </SelectFont>
            <SelectFont
              className={
                editor.isActive('textStyle', { fontSize: '12pt' })
                  ? 'is-active'
                  : ''
              }
              onClick={() => {
                editor.chain().focus().setFontSize('12pt').run();
                setFontSize('12pt');
                setOnFontDropDown(!onFontDropDown);
              }}
            >
              12pt
            </SelectFont>
            <SelectFont
              className={
                editor.isActive('textStyle', { fontSize: '14pt' })
                  ? 'is-active'
                  : ''
              }
              onClick={() => {
                editor.chain().focus().setFontSize('14pt').run();
                setFontSize('14pt');
                setOnFontDropDown(!onFontDropDown);
              }}
            >
              14pt
            </SelectFont>
            <SelectFont
              className={
                editor.isActive('textStyle', { fontSize: '16pt' })
                  ? 'is-active'
                  : ''
              }
              onClick={() => {
                editor.chain().focus().setFontSize('16pt').run();
                setFontSize('16pt');
                setOnFontDropDown(!onFontDropDown);
              }}
            >
              16pt
            </SelectFont>
          </FontSizeWrapper>
        )}

        {/* <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
        >
          Bullet List
        </button> */}
        {/* <input
          type="color"
          onInput={(event) =>
            editor.chain().focus().setColor(event.target.value).run()
          }
          value={editor.getAttributes('textStyle').color}
        /> */}
        <ColorDropDown
          onClick={() => {
            setOnColorDropDown(!onColorDropDown);
          }}
        >
          <ColorLensOutlinedIcon />
        </ColorDropDown>
        {onColorDropDown && (
          <ColorAlign>
            <SampleColorWrapper
              onClick={() => {
                editor.chain().focus().setColor('#000000').run();
                setOnColorDropDown(!onColorDropDown);
              }}
              className={
                editor.isActive('textStyle', { color: '#000000' })
                  ? 'is-active'
                  : ''
              }
            >
              <SampleColor color={'#000000'}></SampleColor>
              <ColorSpan>Black</ColorSpan>
            </SampleColorWrapper>
            <SampleColorWrapper
              onClick={() => {
                editor.chain().focus().setColor('#222222').run();
                setOnColorDropDown(!onColorDropDown);
              }}
              className={
                editor.isActive('textStyle', { color: '#222222' })
                  ? 'is-active'
                  : ''
              }
            >
              <SampleColor color={'#222222'}></SampleColor>
              <ColorSpan>Gray</ColorSpan>
            </SampleColorWrapper>
            <SampleColorWrapper
              onClick={() => {
                editor.chain().focus().setColor('#F75015').run();
                setOnColorDropDown(!onColorDropDown);
              }}
              className={
                editor.isActive('textStyle', { color: '#F75015' })
                  ? 'is-active'
                  : ''
              }
            >
              <SampleColor color={'#F75015'}></SampleColor>
              <ColorSpan>Red</ColorSpan>
            </SampleColorWrapper>
            <SampleColorWrapper
              onClick={() => {
                editor.chain().focus().setColor('#FFC043').run();
                setOnColorDropDown(!onColorDropDown);
              }}
              className={
                editor.isActive('textStyle', { color: '#FFC043' })
                  ? 'is-active'
                  : ''
              }
            >
              <SampleColor color={'#FFC043'}></SampleColor>
              <ColorSpan>Yellow</ColorSpan>
            </SampleColorWrapper>
            <SampleColorWrapper
              onClick={() => {
                editor.chain().focus().setColor('#0057FF').run();
                setOnColorDropDown(!onColorDropDown);
              }}
              className={
                editor.isActive('textStyle', { color: '#0057FF' })
                  ? 'is-active'
                  : ''
              }
            >
              <SampleColor color={'#0057FF'}></SampleColor>
              <ColorSpan>Blue</ColorSpan>
            </SampleColorWrapper>
            <SampleColorWrapper
              onClick={() => {
                editor.chain().focus().setColor('#5221CB').run();
                setOnColorDropDown(!onColorDropDown);
              }}
              className={
                editor.isActive('textStyle', { color: '#5221CB' })
                  ? 'is-active'
                  : ''
              }
            >
              <SampleColor color={'#5221CB'}></SampleColor>
              <ColorSpan
              // onClick={() => editor.chain().focus().setColor('#958DF1').run()}
              // className={
              //   editor.isActive('textStyle', { color: '#958DF1' })
              //     ? 'is-active'
              //     : ''
              // }
              >
                Purple
              </ColorSpan>
            </SampleColorWrapper>
          </ColorAlign>
        )}
        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}
          aria-label="bulletList"
          style={{ border: 'none' }}
        >
          <FormatListBulletedOutlinedIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'is-active' : ''}
        >
          <FormatListNumberedOutlinedIcon />
        </button>
        {/* <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive('codeBlock') ? 'is-active' : ''}
        >
          <Code />
        </button> */}
        <button
          onClick={setLink}
          className={editor.isActive('link') ? 'is-active' : ''}
        >
          <InsertLinkOutlinedIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          disabled={!editor.isActive('link')}
        >
          <LinkOffOutlinedIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'is-active' : ''}
        >
          <FormatAlignLeftOutlinedIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={
            editor.isActive({ textAlign: 'center' }) ? 'is-active' : ''
          }
        >
          <FormatAlignCenterOutlinedIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'is-active' : ''}
        >
          <FormatAlignRightOutlinedIcon />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={
            editor.isActive({ textAlign: 'justify' }) ? 'is-active' : ''
          }
        >
          <FormatAlignJustifyOutlinedIcon />
        </button>
        <input
          type="file"
          accept="image/*"
          id="addImage"
          onChange={addImage}
          style={{ display: 'none' }}
          className="imgIcon"
        />
        {/* <label
          htmlFor="addImage"
          onClick={() => editor.chain().focus()}
          className="imgIcon"
        >
          <PhotoSizeSelectActualOutlinedIcon />
        </label> */}
      </div>
    </Wrapper>
  );
}
export default GuideTipTapMenu;

const Wrapper = styled.div`
  .editor-menu {
    position: relative;
    border-top: 2px solid #e2e5ed;
    border-right: 2px solid #e2e5ed;
    border-left: 2px solid #e2e5ed;
    padding: 5px;
    display: flex;
    align-items: center;
    background-color: white;
    gap: 10px;
    background-color: #efefef;
  }
  .imgIcon {
    cursor: pointer;
    background-color: #efefef;
  }
  /* .is-active {
    border: 1px solid red;
  } */
`;

const ColorDropDown = styled.div`
  cursor: pointer;
`;
const ColorAlign = styled.div`
  width: 10%;
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 2px solid #e2e5ed;
  z-index: 100;
  left: 35%;
  top: 0;
  padding: 5px 0;
  border-radius: 5px;
  gap: 5px;
`;

const SampleColorWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: white;
  cursor: pointer;
`;
const SampleColor = styled.div<{ color?: string }>`
  width: 15px;
  height: 15px;
  background-color: ${({ color }) => color};
`;
const ColorSpan = styled.span`
  text-align: center;
  background-color: white;
  width: 50px;
`;
const OnFontDrop = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: 1px solid #e2e5ed;
  background-color: white;
  width: 100px;
  height: 30px;
  border-radius: 5px;
`;

const OnFontDropText = styled.span`
  display: flex;
  justify-content: center;
  text-align: center;
  padding-top: 3px;
  width: 50px;
  margin-left: 22px;
`;
const FontSizeWrapper = styled.div`
  width: 10.5%;
  position: absolute;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 1px solid #e2e5ed;
  z-index: 100;
  left: 20.5%;
  top: 80%;
  padding: 5px 0;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  gap: 5px;
`;

const SelectFont = styled.div`
  background-color: white;
  text-align: center;
  cursor: pointer;
`;
