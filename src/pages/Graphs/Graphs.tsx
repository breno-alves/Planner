import React, { useEffect, useState } from 'react';

import { GraphContainer } from './styles';
import { Bar } from 'react-chartjs-2'

const config = {
  label: 'Dias da semana',
  backgroundColor: 'rgba(255,99,132,0.2)',
  borderColor: 'rgba(255,99,132,1)',
  borderWidth: 1,
  hoverBackgroundColor: 'rgba(255,99,132,0.4)',
  hoverBorderColor: 'rgba(255,99,132,1)',
}

const Graphs = () => {

  const [data, setData] = useState({
    labels: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
    datasets: [
      {
        ...config,
        data: []
      }
    ]
  });

  useEffect(() => {
    const info = localStorage.getItem('itens');

    if (info) {
      const info2 = JSON.parse(info);

      const keys = Object.entries(info2);
      const segunda = keys.find((item: any) => item[1].name === 'Segunda');
      const terca = keys.find((item: any) => item[1].name === 'Terça');
      const quarta = keys.find((item: any) => item[1].name === 'Quarta');
      const quinta = keys.find((item: any) => item[1].name === 'Quinta');
      const sexta = keys.find((item: any) => item[1].name === 'Sexta');
      const sabado = keys.find((item: any) => item[1].name === 'Sábado');
      const domingo = keys.find((item: any) => item[1].name === 'Domingo');

      const novatabela = [
        // @ts-ignore
        segunda ? segunda[1]?.items?.length : 0,
        // @ts-ignore
        terca ? terca[1]?.items?.length : 0,
        // @ts-ignore
        quarta ? quarta[1]?.items?.length : 0,
        // @ts-ignore
        quinta ? quinta[1]?.items?.length : 0,
        // @ts-ignore
        sexta ? sexta[1]?.items?.length : 0,
        // @ts-ignore
        sabado ? sabado[1]?.items?.length : 0,
        // @ts-ignore
        domingo ? domingo[1]?.items?.length : 0,
      ];

      setData({
        ...data,
        // @ts-ignore
        datasets: [{ ...data.datasets[0], data: novatabela }]
      });
    }
  }, []);

  return (
    <GraphContainer>
      <Bar
        data={data}
        width={100}
        height={50}
        options={{ maintainAspectRatio: false }}
      />
    </GraphContainer>
  )
}

export default Graphs;
