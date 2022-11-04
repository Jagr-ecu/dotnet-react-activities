import React from 'react'
import { Button, Header, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <Segment placeholder>
        <Header icon>
            <Icon name='search'/>
            Oops - hemos buscados por todos lados y no encontramos la página
        </Header>
        <Segment.Inline>
            <Button as={Link} to='/actividades' primary>
                Regresar a la página de actividades
            </Button>
        </Segment.Inline>
    </Segment>
  )
}

export default NotFound