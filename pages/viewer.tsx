
import { useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// workerSrc 정의 하지 않으면 pdf 보여지지 않습니다.
/*
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
const embeddedUrl =
  'https://app.modusign.co.kr/embedded-document/65e281f0-66f4-11ed-9749-d58038aac652?at=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNTZjMGFkMjAtMjUwNy0xMWVkLThhOGUtZmI5ZGE1NThjYWNjIiwicHJvZmlsZSI6eyJuYW1lIjoi7JeU7Yuw7KaMIiwiZW1haWwiOiJlbnRpemVuQGVudGl6ZW4ua3IifSwiYXV0aEJ5IjoiTE9DQUw6QVBJX0tFWSJ9LCJhdXRoQnkiOiJMT0NBTDpBUElfS0VZIiwicm9sZSI6IlVTRVIiLCJ1cmxQYXRocyI6WyIqKiJdLCJpYXQiOjE2Njg3NjExOTIsImV4cCI6MTY2ODc3NTU5MiwiYXVkIjoiYXBpLm1vZHVzaWduLmNvLmtyIiwiaXNzIjoiYXBpLm1vZHVzaWduLmNvLmtyIn0.LKr4rCwcxpuz9dfy6VdfUPIhqFWwEgmTmK1G2bicqlA';
*/
const Index = () => {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // var targetIframe = document.getElementById('target-iframe');
  // targetIframe.src =
  //   'https://app.modusign.co.kr/embedded-template/65e281f0-66f4-11ed-9749-d58038aac652?at=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNTZjMGFkMjAtMjUwNy0xMWVkLThhOGUtZmI5ZGE1NThjYWNjIiwicHJvZmlsZSI6eyJuYW1lIjoi7JeU7Yuw7KaMIiwiZW1haWwiOiJlbnRpemVuQGVudGl6ZW4ua3IifSwiYXV0aEJ5IjoiTE9DQUw6QVBJX0tFWSJ9LCJhdXRoQnkiOiJMT0NBTDpBUElfS0VZIiwicm9sZSI6IlVTRVIiLCJ1cmxQYXRocyI6WyIqKiJdLCJpYXQiOjE2Njg3NjMwNjAsImV4cCI6MTY2ODc3NzQ2MCwiYXVkIjoiYXBpLm1vZHVzaWduLmNvLmtyIiwiaXNzIjoiYXBpLm1vZHVzaWduLmNvLmtyIn0.vjXLz0CPgMM5tttbwXUXSpw08l2qAQK66nC5XJ48PMw';

  useEffect(() => {
    window.open(
      'https://app.modusign.co.kr/embedded-template/65e281f0-66f4-11ed-9749-d58038aac652?at=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNTZjMGFkMjAtMjUwNy0xMWVkLThhOGUtZmI5ZGE1NThjYWNjIiwicHJvZmlsZSI6eyJuYW1lIjoi7JeU7Yuw7KaMIiwiZW1haWwiOiJlbnRpemVuQGVudGl6ZW4ua3IifSwiYXV0aEJ5IjoiTE9DQUw6QVBJX0tFWSJ9LCJhdXRoQnkiOiJMT0NBTDpBUElfS0VZIiwicm9sZSI6IlVTRVIiLCJ1cmxQYXRocyI6WyIqKiJdLCJpYXQiOjE2Njg3NjMwNjAsImV4cCI6MTY2ODc3NzQ2MCwiYXVkIjoiYXBpLm1vZHVzaWduLmNvLmtyIiwiaXNzIjoiYXBpLm1vZHVzaWduLmNvLmtyIn0.vjXLz0CPgMM5tttbwXUXSpw08l2qAQK66nC5XJ48PMw',
      '_blank',
      'top=10, left=10, width=1440, height=900',
    );
  }, []);


  return (
    <>{/* <iframe id='target-iframe' src="" frameborder="0"></iframe> */}</>
  );
};

export default Index;
