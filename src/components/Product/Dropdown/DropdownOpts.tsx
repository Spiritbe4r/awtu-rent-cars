import React, { useState } from 'react'
import { Accordion, Divider, Dropdown, Header, Icon, List, Menu } from 'semantic-ui-react';

const DropdownOpts = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index:any) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const options = [
    {
      key: 'information',
      text: 'INFORMACIÓN Y CUIDADOS',
      value: 'information',
      icon: 'info circle',
      content: (
        <>
          CARACTERISTICAS: EN THE CULT SABEMOS QUE UN SACO DE AJUSTE IMPECABLE NUNCA PASARA DE MODA.<br />

          LA IMPECABLE CONFECCION DE NUESTRA PRENDA COMPLETA UN LOOK ELEGANTE A TRAVEZ DE LA TELA SATINADA
          CON ACABADO MATE, SIN DUDA SU IMAGEN PROYECTARA SEGURIDAD.<br />
          COMPOSICION: 97% ALGODÓN - 3%SPANDEX - TELA SASTRE CON ACABADO MATE, PROCESO ANTIPILLING, TACTO SUAVE,
          TEÑIDO REACTIVO TELA DE ALTA SOLIDEZ.

        </>
      ),
    },
    {
      key: 'shipping',
      text: 'ENVÍO Y DEVOLUCIONES',
      value: 'shipping',
      icon: 'truck',
      content: (


        <List as="ul">
          <List.Item as="li">
            <Header as="h4" size="medium" style={{ fontFamily: 'Arial', fontSize: '16px' }} >
              Si quieres conocer más sobre nuestros<br /> métodos de envío haz click{" "}
              <a href="/metodos-de-envio">aquí</a>.
            </Header>
          </List.Item>
          <List.Item as="li">
            <Header as="h4" size="medium" style={{ fontFamily: 'Arial', fontSize: '16px' }}>
              Para conocer la política de cambios y <br /> devoluciones haz click{" "}
              <a href="/metodos-de-envio">aquí</a>.
            </Header>

          </List.Item>
        </List>
      ),
    },
    {
      key: 'consultation',
      text: 'ASESORÍA EN LÍNEA',
      value: 'consultation',
      icon: 'comment alternate outline',
      content: (
        <>
          <List as="ul">
            <List.Item as="li">
              <Header as="h4" size="medium" style={{ fontFamily: 'Arial', fontSize: '16px' }}>
                Si tienes alguna duda con tu compra <br />online o guía de tallas escríbenos al
                <br />Whatsapp: <a href="https://api.whatsapp.com/send?phone=+51970592265&text=Hola%2C%20quisiera%20m%C3%A1s%20informaci%C3%B3n." target="_blank">
                  931648176
                </a>.
              </Header>
            </List.Item>

          </List>

        </>
      ),
    },
  ];

  return (

    <Dropdown.Menu>
    <Accordion styled fluid>
      {options.map((option, index) => (
        <React.Fragment key={option.key}>
          <Accordion.Title
            active={activeIndex === index}
            index={index}
            onClick={() => handleAccordionClick(index)}
            style={{ display: 'flex', justifyContent: 'space-between', border: 'none' }}
          >
            <Icon style={{ marginLeft: 'start' }} name={option.icon} className="left-icon big" />
            <span>{option.text}</span>
            <Icon style={{ marginLeft: 'auto' }} name="chevron down" className="right-icon big" />
          </Accordion.Title>
          <Divider fitted />
          <Accordion.Content active={activeIndex === index}>
            {option.content}
          </Accordion.Content>
        </React.Fragment>
      ))}
    </Accordion>
  </Dropdown.Menu>
);
};

export default DropdownOpts;
