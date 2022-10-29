import React from 'react'
import { Button, Container, Menu } from 'semantic-ui-react'

interface Props {
    openForm: () => void
} 

const NavBar = ({ openForm }: Props) => {
  return (
    <Menu inverted fixed='top'>
        <Container>
            <Menu.Item header>
                <img src="/assets/logo.png" alt="logo" style={{ marginRight: '30px' }} />
                .NET Actividades
            </Menu.Item>
            <Menu.Item name="Actividades" />
            <Menu.Item>
                <Button onClick={openForm} positive content='Crear Actividad' />
            </Menu.Item>
        </Container>
    </Menu>
  )
}

export default NavBar