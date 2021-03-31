import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import { HeaderContainer, Header, MainContainer, AppointmentsList, ScheduleContainer, Appointment, ScheduleColumn, ButtonsContainer } from './styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import Api from '../../services/api';
import { getToken } from '../../services/auth';
import { Link } from 'react-router-dom';

interface IAppointment {
  id?: string;
  name?: string | undefined;
  weekDay?: number | undefined;
  duration?: number | undefined;
  bgColor?: string | undefined;
  textColor?: string | undefined;
}
interface IColumns {
  [id: string]: {
    name: string;
    items: any[];
  }
}


const onDragEnd = (result: any, columns: any, setColumns: any) => {
  if (!result.destination) return;

  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }

}

const Schedule = () => {

  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [appointmentsColumns, setAppointmentsColumns] = useState<IColumns>({
    [uuid()]: {
      name: 'Segunda',
      items: []
    },
    [uuid()]: {
      name: 'Terça',
      items: []
    },
    [uuid()]: {
      name: 'Quarta',
      items: []
    },
    [uuid()]: {
      name: 'Quinta',
      items: []
    },
    [uuid()]: {
      name: 'Sexta',
      items: []
    },
    [uuid()]: {
      name: 'Sabádo',
      items: []
    },
    [uuid()]: {
      name: 'Domingo',
      items: []
    },
  });

  useEffect(() => {
    async function loadAppointments() {
      const user = localStorage.getItem('user');
      const token = getToken();
      Api.defaults.headers['Authorization'] = `Bearer ${token}`;

      if (user) {
        const { scheduleId } = JSON.parse(user);

        try {
          const { data }: { data: IAppointment[] } = await Api.get(`/appointments/list/${scheduleId}`);

          const appoints = data.map(({ id, name, weekDay, duration }) => {
            return { id, name, weekDay, duration, bgColor: '#BD271B' }
          });
          setAppointments(appoints);
          setAppointmentsColumns({ [uuid()]: { name: 'default', items: appoints }, ...appointmentsColumns, });
        } catch (err) {
          console.log(err);
        }
      }
    }
    loadAppointments();
  }, []);

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


        <ScheduleContainer style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
          <DragDropContext onDragEnd={result => onDragEnd(result, appointmentsColumns, setAppointmentsColumns)}>
            {Object.entries(appointmentsColumns).map(([id, column]) => {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <ScheduleColumn style={{ margin: 8 }}>
                    <Droppable droppableId={id} key={id} >
                      {(provided, snapshot) => {
                        return (
                          <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={column.name !== 'default' ? {
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              boxShadow: 'inset 0px 4px 4px #1C1E23',
                              background: '#282A31',
                              padding: '5px',
                              width: 120,
                              borderRadius: '10px',
                              minHeight: 500
                            } : {
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              padding: '5px',
                              width: 120,
                              borderRadius: '10px',
                              minHeight: 500
                            }}
                          >
                            {column.items.map((item, index) => {
                              return (
                                <Appointment key={index}>
                                  <Draggable key={item.id} draggableId={item.id} index={index}>
                                    {(provided, snapshot) => {
                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            userSelect: 'none',
                                            width: 100,
                                            margin: '8px 0 0 0',
                                            minHeight: '50px',
                                            borderRadius: '5px',
                                            backgroundColor: item.bgColor ? item.bgColor : '#456c86',
                                            color: 'white',
                                            ...provided.draggableProps.style,
                                          }}
                                        >
                                          {item.name}
                                        </div>
                                      )
                                    }}
                                  </Draggable>
                                </Appointment>
                              )
                            })}
                            {provided.placeholder}
                          </div>
                        )
                      }}
                    </Droppable>
                  </ScheduleColumn>

                  <h2>{column.name}</h2>
                </div>
              )
            })}
          </DragDropContext>
        </ScheduleContainer>

      </MainContainer>

      <ButtonsContainer>
        <Link to="/appointments">
          <button>Voltar</button>
        </Link>
        <button>Concluir</button>
      </ButtonsContainer>
    </Container >
  )
}

export default Schedule;
