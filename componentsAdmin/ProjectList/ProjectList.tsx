import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import colors from 'styles/colors';
import ExitBtn from 'public/adminImages/Group.png';
import { useQuery } from 'react-query';
import { isTokenGetApi } from 'api';
import Loader from 'components/Loader';

const ProjectList = () => {
  const handleBackBtn = () => {};

  return (
    <Wrapper>
      <AdminHeader title="프로젝트" type="detail" backBtn={handleBackBtn} />
      <div>달력모달 자리</div>
    </Wrapper>
  );
};

export default ProjectList;

const Wrapper = styled.div`
  /* width: 100%; */
  background-color: ${colors.lightWhite};
  width: 100%;
  padding: 0 18pt;
  position: absolute;
  left: 154.5pt;
  z-index: 999;
`;
