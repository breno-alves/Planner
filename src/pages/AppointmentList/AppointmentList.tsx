import React, {
  useEffect, useState, useCallback
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'reactstrap'
import { InputContainer, ButtonContainer, TitleContainer, InputWrapper, AppointmentsContainer, Appointment, AppointmentListContainer } from './styles'
import { FiCornerDownLeft } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa'
import Api from '../../services/api';
import api from '../../services/api';

const AppointmentList = () => {

  const [appointment, setAppointment] = useState<string>('');
  const [appointments, setAppointments] = useState<string[]>([]);
  const history = useHistory();

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (appointment !== '' && appointment !== undefined) {
        setAppointments([...appointments, appointment]);
        setAppointment('');
      }
    }
  }

  const handleBtnOnClick = useCallback(async (e) => {
    e.preventDefault();
    const user = localStorage.getItem('user');

    if (user) {
      const { scheduleId } = JSON.parse(user);

      try {
        await Promise.all(appointments.map(
          async (name) => api.post('/appointments', { scheduleId, name, weekDay: 0, duration: 0 })
        ));
        setAppointments([]);
        history.push('/schedules');
      } catch (err) {
        console.log(err);
      }
    }
  }, [appointments]);

  return (
    <AppointmentListContainer >
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
        <button onClick={handleBtnOnClick} type="button">Prosseguir</button>
      </ButtonContainer>
    </AppointmentListContainer>
  )

}

export default AppointmentList;
