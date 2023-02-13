import { Button, Stack } from '@mui/material';
import axios from 'axios';
import JSZip from 'jszip';

interface IDownloadProps {
  fileName: string;
  url?: string;
  data?: string | Blob;
}

const download = ({ fileName, data, url }: IDownloadProps) => {
  const aTag = document.createElement('a');
  let url_internal = '';
  if (url) {
    url_internal = url;
  } else if (data) {
    if (!fileName) return;
    if (typeof data === 'string') {
      url_internal = URL.createObjectURL(
        new Blob([data], {
          type: 'image/png',
        }),
      );
    } else {
      url_internal = URL.createObjectURL(data);
    }
  } else return;

  console.log('url_internal==>>', url_internal);
  return;
  // console.log('url_internal==>>', url_internal);
  // return;
  aTag.setAttribute('href', url_internal);
  aTag.setAttribute('download', fileName);
  aTag.click();
  URL.revokeObjectURL(url_internal);
};

const downloadPng = async ({ fileName, url }: IDownloadProps) => {
  await axios({
    url: `${url}`,
    method: 'GET',
    responseType: 'blob',
    withCredentials: false,
  })
    .then(({ data }) => {
      download({ fileName: fileName, data });
    })
    .catch((err) => {
      console.log(err);
    });
};

function App() {
  let zip = new JSZip();
  const data: string[] = [
    'https://test-entizen.s3.ap-northeast-2.amazonaws.com/chatting/1675925576_66785699-e5dc-4207-a577-0e5daac98b66.png',
    'https://test-entizen.s3.ap-northeast-2.amazonaws.com/chatting/1675925576_66785699-e5dc-4207-a577-0e5daac98b66.png',
    'https://test-entizen.s3.ap-northeast-2.amazonaws.com/chatting/1675925576_66785699-e5dc-4207-a577-0e5daac98b66.png',
  ];
  return (
    <Stack direction="row" spacing={2}>
      <Button
        variant="contained"
        onClick={async () => {
          for (const i in data) {
            // await downloadPng({ fileName: `test_${i}.jpg`, url: data[i] });
            await download({
              fileName: `test${[i]}.png`,
              data: data[i],
            });
          }
        }}
      >
        Download Image files
      </Button>
      <Button
        variant="contained"
        onClick={async () => {
          for (const i in data) {
            await axios({
              url: `${data[i]}`,
              method: 'GET',
              responseType: 'arraybuffer',
              withCredentials: false,
            })
              .then(async ({ data }) => {
                const filename = `image_${i}.jpg`;
                zip.file(filename, data, { binary: true });
              })
              .catch((err) => {
                console.log(err);
              });
          }
          zip.generateAsync({ type: 'blob' }).then((content) => {
            console.log(`${content}`);
            download({ fileName: `test_download.zip`, data: content });
          });
        }}
      >
        Download Zip file
      </Button>
    </Stack>
  );
}

export default App;
