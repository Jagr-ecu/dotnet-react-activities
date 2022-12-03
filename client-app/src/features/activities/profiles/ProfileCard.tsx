import { observer } from 'mobx-react-lite';
import React from 'react'
import { Link } from 'react-router-dom';
import { Card, Icon, Image } from 'semantic-ui-react';
import { Profile } from '../../../app/models/Profile';
import FollowButton from './FollowButton';

interface Props {
    profile: Profile
}

const ProfileCard = ({ profile }: Props) => {
  function truncate(str: string | undefined) {
    if (str) {
      return str.length > 40 ? str.substring(0, 37) + '...' : str;
    }
  }

  return (
    <Card as={Link} to={`/perfil/${profile.username}`}>
        <Image src={profile.image || '/assets/user.png'} />
        <Card.Content>
            <Card.Content>{profile.displayName}</Card.Content>
            <Card.Content>{truncate(profile.bio)}</Card.Content>
        </Card.Content>
        <Card.Content extra>
            <Icon name='user'/>
            {profile.followersCount} seguidores
        </Card.Content>
        <FollowButton profile={profile} />
    </Card>
  )
}

export default observer(ProfileCard)