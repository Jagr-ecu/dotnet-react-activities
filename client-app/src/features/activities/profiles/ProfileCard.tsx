import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Profile } from '../../../app/models/Profile';

interface Props {
    profile: Profile
}

const ProfileCard = ({ profile }: Props) => {
  return (
    <Card as={Link} to={`/perfil/${profile.username}`}>
        <Image src={profile.image || '/assets/user.png'} />
        <Card.Content>
            <Card.Content>{profile.displayName}</Card.Content>
            <Card.Content>Bio va aqui</Card.Content>
        </Card.Content>
        <Card.Content extra>
            <Icon name='user'/>
            20 seguidores
        </Card.Content>
    </Card>
  )
}

export default observer(ProfileCard)