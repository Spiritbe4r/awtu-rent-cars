import React from 'react';
import { Segment, Header } from 'semantic-ui-react';
//import './RenterInfo.scss'; // Importa los estilos SCSS

const RenterInfo = ({renter}:any) => {
  return (
    <Segment className="renter-info">
      <Header as="h2">Información del Arrendatario</Header>
      <div className="info">
        <p><strong>Nombre:</strong>
         {renter.name}</p>
        <p><strong>Email:</strong> {renter.email}</p>
        <p><strong>Teléfono:</strong> {renter.phone}</p>
      </div>
    </Segment>
  );
};

export default RenterInfo;
