import styled from '@emotion/styled';
import AdminHeader from 'componentsAdmin/Header';
import UserTable from 'componentsAdmin/userTable';
import React from 'react';

type Props = {};

const UserDetail = (props: Props) => {
  return (
    <Wrapper>
      <AdminHeader title="회원관리" subTitle="일반회원" type="detail" />
    </Wrapper>
  );
};

export default UserDetail;

const Wrapper = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  margin: 0 18pt;
`;
