import React, { useEffect, useState } from 'react'
import { Container, Row } from 'reactstrap'
import { HeaderContainer, Header, MainContainer, AppointmentsList, ScheduleContainer, Appointment, ScheduleColumn, ButtonsContainer } from './styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';
import { setSyntheticTrailingComments } from 'typescript';


interface IAppointment {
  id: string;
  name: string;
  bgColor: string;
  textColor?: string;
}

const example = [
  { id: uuid(), name: 'teste1', bgColor: '#BD271B' },
  { id: uuid(), name: 'teste2', bgColor: '#92D655' },
  { id: uuid(), name: 'teste3', bgColor: '#245BC8', textColor: '#D0D0D0' },
]

const example2 = [
  { id: uuid(), name: 'teste1', bgColor: '#BD271B' },
  { id: uuid(), name: 'teste2', bgColor: '#92D655' },
  { id: uuid(), name: 'teste3', bgColor: '#245BC8', textColor: '#D0D0D0' },
]

const columnsFromBackend = {
  [uuid()]: {
    name: 'default',
    items: [...example2]
  },
  [uuid()]: {
    name: 'Segunda',
    items: [...example]
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
  const [appointmentsList, setAppointmentsList] = useState<IAppointment[]>([...example]);
  const [columns, setColumns] = useState(columnsFromBackend);


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
          <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            {Object.entries(columns).map(([id, column]) => {
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
        <button>Voltar</button>
        <button>Concluir</button>
      </ButtonsContainer>
    </Container >
  )
}

export default Schedule
