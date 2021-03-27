import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap'
import { InputContainer, ButtonContainer, TitleContainer, InputWrapper, AppointmentsContainer, Appointment } from './styles'
import { FiCornerDownLeft } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa'


const AppointmentList = () => {
  const containerStyle = {
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    height: '100vh'
  }

  const [appointment, setAppointment] = useState<string>();
  const [appointments, setAppointments] = useState<string[]>([]);

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (appointment !== '' && appointment !== undefined) {
        setAppointments([...appointments, appointment]);
        setAppointment('');
      }
    }
  }

  return (
    <Container style={containerStyle}>
      <TitleContainer>
        <h3>Adicione até dez compromissos que você deseja monitorar em sua rotina:</h3>
      </TitleContainer>
      <InputContainer>
        <InputWrapper>
          <input type="text" name="appointment" placeholder="ex: Fazer exercícios" value={appointment} onChange={(e) => setAppointment(e.currentTarget.value)} onKeyPress={handleKeyPress} />
          <FiCornerDownLeft style={{ position: 'absolute', right: 10, top: 10, color: '#434343' }} size={19} />
        </InputWrapper>
      </InputContainer>

      <Container style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <AppointmentsContainer>
          {appointments.map((item, index) =>
            <Appointment key={index} >
              <FaTrashAlt size={15} />
              <p> {index + 1}. {item}</p>
            </Appointment>
          )}
        </AppointmentsContainer>
      </Container>

      <ButtonContainer>
        <button>Prosseguir</button>
      </ButtonContainer>
    </Container>
  )

}



export default AppointmentList;
