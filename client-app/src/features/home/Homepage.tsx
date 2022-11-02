import React from 'react'
import { Link } from 'react-router-dom'
import { Container, Header, Segment, Image, Button } from 'semantic-ui-react';

const Homepage = () => {
  return (
    <Segment inverted textAlign='center' vertical className='masthead'>
      <Container text>
        <Header as='h1' inverted>
          <Image size='massive' src='/assets/logo.png' alt='logo' style={{marginBotton: 12}} />
          .NET Actividades
        </Header>
        <Header as='h2' inverted content='Bienvenido a .NET Actividades' />
        <Button as={Link} to='/actividades' size='huge' inverted>
          Llevame a las actividades!
        </Button>
      </Container>
    </Segment>
  )
}

export default Homepage