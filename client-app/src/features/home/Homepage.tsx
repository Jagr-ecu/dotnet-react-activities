import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from 'semantic-ui-react'

const Homepage = () => {
  return (
    <Container style={{marginTop: '7em'}}>
        <h1>Home</h1>
        <h3>Ir a <Link to='/actividades'>Actividades</Link></h3>
    </Container>
  )
}

export default Homepage