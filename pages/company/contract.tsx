import styled from '@emotion/styled';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

type Props = {};

const contract = (props: Props) => {
  const router = useRouter();
  const documentId = router?.query?.documentId!;

  useEffect(() => {
    let targetIframe = document.getElementById(
      'target-iframe',
    ) as HTMLImageElement | null;
    if (targetIframe !== null) {
      targetIframe.src = documentId as string;
    }
  }, [documentId]);
  return (
    <div>
      <View id="target-iframe"></View>
    </div>
  );
};

export default contract;

const View = styled.iframe`
  height: 100vh;
  width: 100vw;
  position: fixed;
  top: 0;
  left: 0;
`;
