import React, { useEffect, useState } from 'react'
import { Container, Row } from 'reactstrap'
import { HeaderContainer, Header, MainContainer, AppointmentsList, ScheduleContainer, Appointment, ScheduleColumn, ButtonsContainer } from './styles';

interface IAppointment {
  name: string;
  bgColor: string;
  textColor?: string;
}

const Schedule = () => {
  const example = [
    { name: 'teste', bgColor: '#BD271B' },
    { name: 'teste', bgColor: '#92D655' },
    { name: 'teste', bgColor: '#245BC8', textColor: '#D0D0D0' },
  ]

  const [appointmentsList, setAppointmentsList] = useState<IAppointment[]>([...example]);


  const containerStyle = {
    display: 'flex',
    'flex-direction': 'column',
    'align-itens': 'center',
    height: '100vh',
    'margin-top': '50px',
  }

  return (
    <Container style={containerStyle}>
      <HeaderContainer>
        <Header>
          <h2>Arraste os compromissos até os dias da semana nos quais você irá executar-los. Máximo de dez¹ compromissos por dia.</h2>
          <p>¹Você pode adicionar o mesmo compromisso mais de uma vez em um mesmo dia.</p>
        </Header>
      </HeaderContainer>

      <MainContainer>
        <div>
          {appointmentsList.map((appointment, index) => (
            <Appointment key={index} color={appointment.bgColor}>
              <p style={appointment.textColor ? { color: appointment.textColor } : {}} >{index + 1}. {appointment.name}</p>
            </Appointment>
          ))}
        </div>

        <ScheduleContainer>
          <ScheduleColumn className="sunday">
            <p>Domingo</p>
          </ScheduleColumn>

          <ScheduleColumn className="monday">
            <p>Segunda</p>
          </ScheduleColumn>

          <ScheduleColumn className="tuesday">
            <p>Terça</p>
          </ScheduleColumn>

          <ScheduleColumn className="wednesday">
            <p>Quarta</p>
          </ScheduleColumn>

          <ScheduleColumn className="thursday">
            <p>Quinta</p>
          </ScheduleColumn>

          <ScheduleColumn className="friday">
            <p>Sexta</p>
          </ScheduleColumn>

          <ScheduleColumn className="saturday">
            <p>Sábado</p>
          </ScheduleColumn>
        </ScheduleContainer>
      </MainContainer>

      <ButtonsContainer>
        <button>Voltar</button>
        <button>Concluir</button>
      </ButtonsContainer>
    </Container >
  )
}

export default Schedule
