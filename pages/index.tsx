import { NextPage } from 'next';
import React from 'react';
import styled from '@emotion/styled';

type Props = {};

const Home: NextPage = () => {
    return <ItemWrapper>index</ItemWrapper>;
};

export default Home;

const ItemWrapper = styled.div`
    max-width: 90%;
    height: 90%;
    margin: 7.5% auto;
    overflow: auto;
    background-color: #eeeeee;
`;
