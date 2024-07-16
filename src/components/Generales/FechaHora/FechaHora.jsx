import React, { useEffect, useState } from 'react';
import { Space } from 'antd';

function FechaHora() {
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const obtenerFechaHora = () => {
    const opcionesFecha = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      //  timeZone: 'UTC',
      locale: 'es'
    };

    const opcionesHora = {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    };

    const fechaActual = new Date().toLocaleString('es', opcionesFecha);
    const horaActual = new Date().toLocaleString('es', opcionesHora);

    setFecha(fechaActual);
    setHora(horaActual);
  };

  useEffect(() => {
    obtenerFechaHora();
  }, []);

  return (
    <small>
      <Space>
        <b>Fecha:</b>
        {fecha}
        <b>Hora:</b>
        {hora}
      </Space>
    </small>
  );
}

export default FechaHora;
