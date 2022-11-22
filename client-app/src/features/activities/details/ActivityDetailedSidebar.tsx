import React from "react";
import { Segment, List, Label, Item, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Activity } from '../../../app/models/Activity';

interface Props {
   activity: Activity;
}

const ActivityDetailedSidebar = ({ activity: { attendees, host } }: Props) => {
   if(!attendees) return null;

   return (
      <>
         <Segment
            textAlign="center"
            style={{ border: "none" }}
            attached="top"
            secondary
            inverted
            color="teal"
         >
            {attendees.length} {attendees.length === 1 ? "Persona" : "Personas"} irán
         </Segment>
         <Segment attached>
            <List relaxed divided>
               {attendees.map((attendee) => (
                  <Item style={{ position: "relative" }} key={attendee.username}>
                     {
                        attendee.username === host?.username && 
                        <Label
                           style={{ position: "absolute" }}
                           color="orange"
                           ribbon="right"
                        >
                           Anfitrión
                        </Label>
                     }
                     <Image size="tiny" src={attendee.image || "/assets/user.png"} />
                     <Item.Content verticalAlign="middle">
                        <Item.Header as="h3">
                           <Link to={`/perfil/${attendee.username}`}>
                              {attendee.displayName}
                           </Link>
                        </Item.Header>
                        <Item.Extra style={{ color: "orange" }}>Following</Item.Extra>
                     </Item.Content>
                  </Item>
               ))}
            </List>
         </Segment>
      </>
   );
};

export default observer(ActivityDetailedSidebar);
