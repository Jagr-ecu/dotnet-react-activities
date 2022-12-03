import { observer } from "mobx-react-lite";
import React, { SyntheticEvent } from "react";
import { Button, Reveal } from "semantic-ui-react";
import { Profile } from "../../../app/models/Profile";
import { useStore } from "../../../app/stores/store";

interface Props {
   profile: Profile;
}

const FollowButton = ({ profile }: Props) => {
   const { profileStore, userStore } = useStore();
   const { updateFollowing, loading } = profileStore;

   if (userStore.user?.username === profile.username) return null;

   function handleFollow(e: SyntheticEvent, username: string) {
      // se lo usara en un Card que ejecuta un Link, para prevenir que la acciones de
      // redireccionar pagina se haga, se haca preventDefault para que solo se cumpla
      // la accion del boton
      e.preventDefault();
      profile.following
         ? updateFollowing(username, false)
         : updateFollowing(username, true);
   }

   return (
      <Reveal animated="move">
         <Reveal.Content visible style={{ width: "100%" }}>
            <Button
               fluid
               color="teal"
               content={profile.following ? "Siguiendo" : "Seguir"}
            />
         </Reveal.Content>
         <Reveal.Content hidden style={{ width: "100%" }}>
            <Button
               fluid
               basic
               color={profile.following ? "red" : "green"}
               content={profile.following ? "Dejar de seguir" : "Seguir"}
               loading={loading}
               onClick={(e) => handleFollow(e, profile.username)}
            />
         </Reveal.Content>
      </Reveal>
   );
};

export default observer(FollowButton);
