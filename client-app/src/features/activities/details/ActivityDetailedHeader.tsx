import { format } from "date-fns";
import { observer } from "mobx-react-lite";
import React from "react";
import { Link } from "react-router-dom";
import { Button, Header, Item, Segment, Image, Label } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";
import { useStore } from "../../../app/stores/store";

const activityImageStyle = {
   filter: "brightness(30%)",
};

const activityImageTextStyle = {
   position: "absolute",
   bottom: "5%",
   left: "5%",
   width: "100%",
   height: "auto",
   color: "white",
};

interface Props {
   activity: Activity;
}

const ActivityDetailedHeader = ({ activity }: Props) => {
   const { activityStore } = useStore();

   return (
      <Segment.Group>
         <Segment basic attached="top" style={{ padding: "0" }}>
            {activity.isCancelled && (
               <Label
                  style={{ position: "absolute", zIndex: 1000, left: -14, top: 20 }}
                  ribbon
                  color="red"
                  content="Cancelled"
               />
            )}
            <Image
               src={`/assets/categoryImages/${activity.category}.jpg`}
               fluid
               style={activityImageStyle}
            />
            <Segment style={activityImageTextStyle} basic>
               <Item.Group>
                  <Item>
                     <Item.Content>
                        <Header
                           size="huge"
                           content={activity.title}
                           style={{ color: "white" }}
                        />
                        <p>{format(activity.date!, "dd MM yyyy")}</p>
                        <p>
                           Organizado por {activity.hostUsername}
                           <strong>
                              <Link to={`/perfil/${activity.host?.username}`}>
                                 {activity.host?.username}
                              </Link>
                           </strong>
                        </p>
                     </Item.Content>
                  </Item>
               </Item.Group>
            </Segment>
         </Segment>
         <Segment clearing attached="bottom">
            {activity.isHost ? (
               <>
                  <Button
                     color={activity.isCancelled ? "green" : "red"}
                     floated="left"
                     basic
                     content={
                        activity.isCancelled
                           ? "Reaactivar Actividad"
                           : "Cancelar Actividad"
                     }
                     onClick={activityStore.cancelActivityToggle}
                     loading={activityStore.loading}
                  />
                  <Button
                     disabled={activity.isCancelled}
                     as={Link}
                     to={`/administrar/${activity.id}`}
                     color="orange"
                     floated="right"
                  >
                     Administrar Evento
                  </Button>
               </>
            ) : activity.isGoing ? (
               <Button
                  loading={activityStore.loading}
                  onClick={activityStore.updateAttendance}
               >
                  Cancelar Asistencia
               </Button>
            ) : (
               <Button
                  disabled={activity.isCancelled}
                  loading={activityStore.loading}
                  onClick={activityStore.updateAttendance}
                  color="teal"
               >
                  Unirse a Actividad
               </Button>
            )}
         </Segment>
      </Segment.Group>
   );
};

export default observer(ActivityDetailedHeader);
