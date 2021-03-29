import styled, { css } from 'styled-components';

export const SignUpContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export const Header = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: ${theme.color.txtHigh};

    p {
      align-self: center;
      color: ${theme.color.txtLow};
      a {
        color: ${theme.color.txtHigh};
      }
    }
  `,
);

export const HeaderTitle = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
  `,
);

export const InputContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;

    label {
      color: ${theme.color.txtMedium};
      font-size: ${theme.fontSize.sm};
    }

    input {
      border-radius: 8px;
      background-color: ${theme.color.bgMedium};
      border: 0;
      outline: 0;
      padding: 8px 8px 8px 14px;
      width: 360px;
      color: ${theme.color.txtMedium};
      margin-bottom: 15px;
    }
  `,
);

export const ButtonContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: center;

    button {
      width: 240px;
      height: 50px;
      border-radius: 10px;
      border: 0;
      outline: 0;
      background-color: ${theme.color.bgMedium};
      color: ${theme.color.txtMedium};
    }
  `,
);
