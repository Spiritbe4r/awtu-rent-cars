import Link from 'next/link';
import React from 'react';
import { Container, Grid, Icon, Segment } from 'semantic-ui-react';

const Footer: React.FC = () => {


  return (
    <Segment inverted vertical style={{ padding: '1.5em 0', backgroundColor: '#fff', color: '#333', borderTop: '1px solid #ccc' }}>
    <Container>
      <Grid divided inverted stackable>
        <Grid.Row>
          <Grid.Column width={16} textAlign="center">
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1em' }}>
              <Link href="https://www.facebook.com" passHref>
                <Icon.Group size="big" style={{ marginRight: '1em', cursor: 'pointer' }}>
                  <Icon name="facebook" style={{ color: '#3b5998' }} />
                </Icon.Group>
              </Link>
              <Link href="https://www.instagram.com" passHref>
                <Icon.Group size="big" style={{ marginRight: '1em', cursor: 'pointer' }}>
                  <Icon name="instagram" style={{ color: '#E1306C' }} />
                </Icon.Group>
              </Link>
              <Link href="https://web.whatsapp.com" passHref>
                <Icon.Group size="big" style={{ cursor: 'pointer' }}>
                  <Icon name="whatsapp" style={{ color: '#25D366' }} />
                </Icon.Group>
              </Link>
            </div>
            <h4 style={{ fontSize: '16px', marginTop: '0.5em' }}>¡Síguenos en las redes!</h4>
            <p style={{ color: '#aaa', fontSize: '14px', marginTop: '0.5em' }}>
                © {new Date().getFullYear()} Williams Jeans. Todos los derechos reservados.
              </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Container>
  </Segment>
  );
};

export default Footer;
