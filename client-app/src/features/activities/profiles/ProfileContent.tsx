import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { Profile } from '../../../app/models/Profile';
import { observer } from "mobx-react-lite";
import ProfileAbout from './ProfileAbout';

interface Props {
    profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
   const panes = [
      { menuItem: "Sobre", render: () => <ProfileAbout/> },
      { menuItem: "Fotos", render: () => <ProfilePhotos profile={profile}/> },
      { menuItem: "Eventos", render: () => <Tab.Pane>Eventos</Tab.Pane> },
      { menuItem: "Seguidores", render: () => <Tab.Pane>Seguidores</Tab.Pane> },
      { menuItem: "Siguiendo", render: () => <Tab.Pane>Siguiendo</Tab.Pane> },
   ];

   return (
      <Tab menu={{ fluid: true, vertical: true }} menuPosition="right" panes={panes} />
   );
};

export default observer(ProfileContent);
