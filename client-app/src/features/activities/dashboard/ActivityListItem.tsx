import { format } from "date-fns";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Item, Label, Segment } from "semantic-ui-react";

import { Activity } from "../../../app/models/Activity";
import ActivityListItemAttendee from "./ActivityListItemAttendee";

interface Props {
   activity: Activity;
}

const ActivityListItem = ({ activity }: Props) => {
   return (
      <Segment.Group>
         <Segment>
            {activity.isCancelled && (
               <Label
                  attached="top"
                  color="red"
                  content="canceled"
                  style={{ textAlign: "center" }}
               />
            )}
            <Item.Group>
               <Item>
                  <Item.Image
                     style={{ marginBotton: 3 }}
                     size="tiny"
                     circular
                     src="/assets/user.png"
                  />
                  <Item.Content>
                     <Item.Header as={Link} to={`/actividades/${activity.id}`}>
                        {activity.title}
                     </Item.Header>
                     <Item.Description>
                        Hosted By {activity.host?.displayName}
                     </Item.Description>
                     {activity.isHost && (
                        <Item.Description>
                           <Label basic color="orange">
                              Tu eres anfitrión de esta actividad
                           </Label>
                        </Item.Description>
                     )}
                     {activity.isGoing && !activity.isHost && (
                        <Item.Description>
                           <Label basic color="green">
                              Iras a esta actividad
                           </Label>
                        </Item.Description>
                     )}
                  </Item.Content>
               </Item>
            </Item.Group>
         </Segment>
         <Segment>
            <span>
               <Icon name="clock" /> {format(activity.date!, "dd MMM yyyy h:mm aa")}
               <Icon name="marker" /> {activity.venue}
            </span>
         </Segment>
         <Segment secondary>
            <ActivityListItemAttendee attendees={activity.attendees!} />
         </Segment>
         <Segment clearing>
            <span>{activity.description}</span>
            <Button
               as={Link}
               to={`/actividades/${activity.id}`}
               color="teal"
               floated="right"
               content="View"
            />
         </Segment>
      </Segment.Group>
   );
};

export default ActivityListItem;
