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

interface IAppointment {
  id?: string;
  scheduleId?: string;
  name?: string;
  weekDay?: number;
  duration?: number;
}

const AppointmentList = () => {

  const [appointment, setAppointment] = useState<string>('');
  const [appointments, setAppointments] = useState<IAppointment[]>([]);

  useEffect(() => {
    async function loadAppointments() {
      const user = localStorage.getItem('user');
      const token = getToken();
      Api.defaults.headers['Authorization'] = `Bearer ${token}`;

      if (user) {
        const { scheduleId } = JSON.parse(user);

        try {
          const { data } = await Api.get(`/appointments/list/${scheduleId}`);
          setAppointments(data);
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
            const { data } = await Api.post('/appointments', { name: appointment, scheduleId, weekDay: 0, duration: 0 });
            setAppointments([...appointments, data]);
            setAppointment('');
          } catch (err) {
            console.log(err);
          }
        }
      }
    }
  }, [appointments, appointment]);

  const handleAppointmentDelete = useCallback(async (appointmentId?: string) => {
    if (!appointmentId) return;

    const token = getToken();
    const user = localStorage.getItem('user');
    Api.defaults.headers['Authorization'] = `Bearer ${token}`;

    if (user) {
      try {
        await Api.delete(`/appointments/${appointmentId}`);

        const newAppointments = appointments.reduce((result: IAppointment[], item) => {
          if (item.id !== appointmentId) {
            result.push(item);
          }
          return result;
        }, []);
        setAppointments(newAppointments);
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
          {appointments?.map((item, index) =>
            <Appointment key={item.id} onClick={() => { handleAppointmentDelete(item.id) }} >
              <FaTrashAlt size={15} />
              <p> {index + 1}. {item.name}</p>
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
