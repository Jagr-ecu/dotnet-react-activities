import React from "react";
import { Tab } from "semantic-ui-react";
import ProfilePhotos from "./ProfilePhotos";
import { Profile } from "../../../app/models/Profile";
import { observer } from "mobx-react-lite";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";
import { useStore } from "../../../app/stores/store";

interface Props {
   profile: Profile;
}

const ProfileContent = ({ profile }: Props) => {
   const { profileStore } = useStore();

   const panes = [
      { menuItem: "Sobre", render: () => <ProfileAbout /> },
      { menuItem: "Fotos", render: () => <ProfilePhotos profile={profile} /> },
      { menuItem: "Eventos", render: () => <Tab.Pane>Eventos</Tab.Pane> },
      { menuItem: "Seguidores", render: () => <ProfileFollowings /> },
      { menuItem: "Siguiendo", render: () => <ProfileFollowings /> },
   ];

   return (
      <Tab
         menu={{ fluid: true, vertical: true }}
         menuPosition="right"
         panes={panes}
         onTabChange={(e, data) => profileStore.setActiveTab(data.activeIndex)}
      />
   );
};

export default observer(ProfileContent);
