import React from 'react';
import styled, { css } from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-bottom: 65px;
`;

export const Header = styled.div(
  ({ theme }) => css`
    width: 590px;

    h2 {
      text-align: center;
      font-size: ${theme.fontSize.sm};
      color: ${theme.color.txtMedium};
    }

    p {
      text-align: center;
      font-size: ${theme.fontSize.xs};
      color: ${theme.color.txtLow};
    }
  `,
);

export const MainContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const AppointmentsList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

export const ScheduleContainer = styled.div`
  display: flex;
`;

export const Appointment = styled.div(
  ({ theme, color }) => css`
    // width: 100%;
    // display: flex;
    // padding-left: 16px;
    // margin-bottom: 8px;
    // min-width: 160px;
    // min-height: 32px;
    // background-color: ${color ? color : '#c0c0c0'};
    // border-radius: 5px;
    // align-items: center;

    // p {
    //   font-size: ${theme.fontSize.sm};
    //   margin: 0;
    // }
  `,
);

export const ScheduleColumn = styled.div(
  ({ theme }) => `
  color: ${theme.color.txtLow};

    // display: flex;
    // justify-content: center;
    // background-color: ${theme.color.bgMedium};
    // height: 424px;
    // min-width: 180px;
    // margin-left: 16px;
    // border-radius: 10px;
    // box-shadow: inset 0px 4px 4px #1C1E23;
    // position: relative;

    // p {
    //   position: absolute;
    //   bottom: -55px;
    //   font-size: ${theme.fontSize.md};
    // }
  `,
);

export const ButtonsContainer = styled.div(
  ({ theme }) => `
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 130px;

    button {
      outline: 0;
      border: 0;
      width: 240px;
      height: 60px;
      border-radius: 10px;
      background-color: ${theme.color.bgLow};
      margin-right: 15px;
      color: ${theme.color.txtMedium};

      &:hover {
        background-color: ${theme.color.bgMedium};
        transition: 0.2s;
      }
    }

  `,
);

export const scheduleColumnStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  boxShadow: 'inset 0px 4px 4px #1C1E23',
  background: '#282A31',
  padding: '5px',
  width: 120,
  borderRadius: '10px',
  minHeight: 500,
};

export const scheduleColumnDefaultStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '5px',
  width: 120,
  borderRadius: '10px',
  minHeight: 500,
};

export const appointmentItemStyle = (
  column: string,
  rest: React.CSSProperties,
): React.CSSProperties => {
  return column === 'default'
    ? {
        ...rest,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        margin: '8px 80px 0 0',
        minHeight: '50px',
        borderRadius: '5px',
        color: 'white',
      }
    : {
        ...rest,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        userSelect: 'none',
        width: 100,
        margin: '8px 0 0 0',
        minHeight: '50px',
        borderRadius: '5px',
        color: 'white',
      };
};
