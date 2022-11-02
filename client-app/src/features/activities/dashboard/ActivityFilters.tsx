import React from 'react'
import { Calendar } from 'react-calendar'
import { Header, Menu } from 'semantic-ui-react'

const ActivityFilters = () => {
  return (
    <>
        <Menu vertical size='large' style={{width: '100%', marginTop: 25}}>
            <Header icon='filter' attached color='teal' content='Filtros' />
            <Menu.Item content='Todas las Actividades' />
            <Menu.Item content='Voy a asistir' />
            <Menu.Item content='Creadas por mi' />
        </Menu>
        <Header />
        <Calendar />
    </>
  )
}

export default ActivityFilters