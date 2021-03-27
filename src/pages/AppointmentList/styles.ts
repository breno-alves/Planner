import styled, { css } from 'styled-components';

export const CustomBody = styled.div(
  ({ theme }) => css`
    background-color: ${theme.color.orange};
  `,
);

export const CustomDiv = styled.div`
  background-color: ${({ theme }) => theme.color.orange};
`;
