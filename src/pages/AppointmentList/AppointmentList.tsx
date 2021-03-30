import React, {
  useEffect, useState, useCallback
} from 'react';
import { Link } from 'react-router-dom';
import { Container } from 'reactstrap'
import { InputContainer, ButtonContainer, TitleContainer, InputWrapper, AppointmentsContainer, Appointment, AppointmentListContainer } from './styles'
import { FiCornerDownLeft } from 'react-icons/fi';
import { FaTrashAlt } from 'react-icons/fa'
import Api from '../../services/api';

import { getToken } from '../../services/auth';

const AppointmentList = () => {

  const [appointment, setAppointment] = useState<string>('');
  const [appointments, setAppointments] = useState<string[]>([]);

  useEffect(() => {
    async function loadAppointments() {
      const user = localStorage.getItem('user');
      const token = getToken();
      Api.defaults.headers['Authorization'] = `Bearer ${token}`;

      if (user) {
        const { scheduleId } = JSON.parse(user);

        try {
          const { data }: { data: any[] } = await Api.get(`/appointments/list/${scheduleId}`);
          const appointsName = data.map(({ name }) => name);
          setAppointments(appointsName);
        } catch (err) {
          console.log(err);
        }
      }
    }

    loadAppointments();
  }, []);

  const handleKeyPress = useCallback(async (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (appointment !== '' && appointment !== undefined) {
        const token = getToken();
        const user = localStorage.getItem('user');
        Api.defaults.headers['Authorization'] = `Bearer ${token}`;

        if (user) {
          const { scheduleId } = JSON.parse(user);

          try {
            await Api.post('/appointments', { name: appointment, scheduleId, weekDay: 0, duration: 0 });
            setAppointments([...appointments, appointment]);
            setAppointment('');
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  }, [appointments, appointment]);

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
        <Link to="/schedules">
          <button type="button">Prosseguir</button>
        </Link>
      </ButtonContainer>
    </AppointmentListContainer>
  )

}

export default AppointmentList;
