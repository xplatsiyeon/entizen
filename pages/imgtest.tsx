import { Button, Stack } from '@mui/material';
import axios from 'axios';
import JSZip from 'jszip';

interface IDownloadProps {
  fileName: string;
  url?: string;
  data?: string | Blob;
}

interface MultiFile {
  data?: string[];
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
// ------------------------------------------------------------
const downloadAll = (data: string[]) => {
  console.log('데이터 들어옴');
  data?.map((item, idx) => {
    getFile(item);
    fnSleep(100);
  });
};

async function getFile(url: string) {
  const fileUrl = url;
  const {
    data: { type, arrayBuffer },
  } = await axios.get('/api/file', {
    params: { url: fileUrl },
  });

  const blob = await new Blob([Uint8Array.from(arrayBuffer)], { type });
  // <a> 태그의 href 속성값으로 들어갈 다운로드 URL
  // const downloadUrl = window.URL.createObjectURL(blob);
  var a = document.createElement('a');
  a.href = window.URL.createObjectURL(blob);
  document.body.appendChild(a);
  a.setAttribute('download', `다운로드 제발`);
  a.click();
}

//파일 간 시간 지연
const fnSleep = (dTime: any) => {
  const start = new Date().getTime();
  while (start + dTime > new Date().getTime());
};

// ------------------------------------------------------------

const allPlease = (data: string[]) => {
  data?.map((item, idx) => {
    var a = document.createElement('a');
    a.href = item;
    document.body.appendChild(a);
    a.setAttribute('download', `다운로드 제발`);
    a.click();
  });
};

const handleDownload = (data: string[]) => {
  data?.map((item, index) => {
    fetch(item, { method: 'GET' })
      .then((res) => {
        return res.blob(); // raw 데이터를 받아온다
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob); // 받아온 날 상태의 data를 현재 window에서만 사용하는 url로 바꾼다
        const a = document.createElement('a');
        a.href = `/api/file${url}`;
        // a.href = url;
        a.download = String(index); // 원하는 이름으로 파일명 지정
        document.body.appendChild(a);
        a.click(); // 자동으로 눌러버리기
      });
    // .catch((err) => {
    //   console.error('err: ', err);
    // });
  });
};

// ------------------------------------------------------------

function App() {
  let zip = new JSZip();
  const data = [
    'https://test-entizen.s3.ap-northeast-2.amazonaws.com/chatting/1675925576_66785699-e5dc-4207-a577-0e5daac98b66.png',
    'https://test-entizen.s3.ap-northeast-2.amazonaws.com/chatting/1675925576_66785699-e5dc-4207-a577-0e5daac98b66.png',
    'https://test-entizen.s3.ap-northeast-2.amazonaws.com/chatting/1675925576_66785699-e5dc-4207-a577-0e5daac98b66.png',
    'https://test-entizen.s3.ap-northeast-2.amazonaws.com/chatting/1675925576_66785699-e5dc-4207-a577-0e5daac98b66.png',
    'https://test-entizen.s3.ap-northeast-2.amazonaws.com/chatting/1675925576_66785699-e5dc-4207-a577-0e5daac98b66.png',
    'https://test-entizen.s3.ap-northeast-2.amazonaws.com/chatting/1675925576_66785699-e5dc-4207-a577-0e5daac98b66.png',
  ];
  return (
    <Stack direction="row" spacing={2}>
      {/* <Button
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
      </Button> */}
      <Button
        onClick={() => {
          allPlease(data);
        }}
      >
        Download Image files
      </Button>
      {/* <Button
        onClick={() => {
          handleDownload(data);
        }}
      >
        Download Image files
      </Button> */}

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
