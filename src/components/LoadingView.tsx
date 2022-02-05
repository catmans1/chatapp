import React from 'react';
import styled from 'styled-components/native';

interface ILoadingView {
  isShow: boolean;
}

export default function LoadingView({isShow}: ILoadingView) {
  if (isShow) {
    return (
      <Container visible={true}>
        <IndicatorView size="large" color="#1e3799" />
      </Container>
    );
  }
  return null;
}

const Container = styled.Modal`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 240px;
`;

const IndicatorView = styled.ActivityIndicator``;
