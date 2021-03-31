import styled, { css } from 'styled-components';
import { FiTrash2 } from 'react-icons/fi';

export const AppointmentListContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
`;

export const LogOutButton = styled.div(
  ({ theme }) => css`
  display: flex;
  justify-content: center;
  width: 50px
  height: 50px;

  button {
      position: absolute;
      margin-left: 780px;
      top: 100px;

      background-color: transparent;
      outline: none;
      border: 0;
      svg {
        color: "#000";
      }
    }
  `,
);

export const TitleContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    margin-bottom: 88px;

    h3 {
      color: ${theme.color.txtMedium};
      font-size: ${theme.fontSize.sm};
      max-width: 400px;
      text-align: center;
    }
  `,
);

export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const InputWrapper = styled.div(
  ({ theme }) => css`
    position: relative;
    width: 100%;
    max-width: 480px;
    margin-bottom: 64px;

    input {
      background-color: ${theme.color.bgMedium};
      border-radius: 10px;
      border: 0;
      padding: 8.5px;
      max-width: 480px;
      width: 100%;
      color: ${theme.color.txtHigh};

      &:hover,
      &:focus {
        outline: 0;
      }
    }
  `,
);

export const AppointmentsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  max-height: 400px;
  flex-wrap: wrap;
  max-width: 420px;
`;

export const Appointment = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: flex-start;
    min-width: 180px;
    height: 50px;
    position: relative;

    &:hover svg,
    &:hover p {
      color: ${theme.color.txtHigh};
      display: block;
      text-decoration-line: line-through;
    }

    p {
      align-self: center;
      color: ${theme.color.txtLow};
      margin: 0;
      margin-left: 24px;
    }

    svg {
      display: none;
      position: absolute;
      align-self: center;
      left: 0px;
      margin-top: -4.5px;
    }
  `,
);

export const ButtonContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    justify-content: center;
    margin-top: 88px;
    button {
      background-color: ${theme.color.bgMedium};
      width: 240px;
      height: 60px;
      border-radius: 10px;
      outline: 0;
      border: 0;
      color: ${theme.color.txtMedium};
    }
  `,
);
