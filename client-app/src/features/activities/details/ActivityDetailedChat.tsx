import { observer } from "mobx-react-lite";
import { Segment, Header, Comment, Loader } from "semantic-ui-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";

import { es } from 'date-fns/locale';
import { formatDistanceToNow } from "date-fns";
import { useStore } from "../../../app/stores/store";

interface Props {
   activityId: string;
}

const ActivityDetailedChat = ({ activityId }: Props) => {
   const { commentStore } = useStore();

   useEffect(() => {
      if (activityId) {
         commentStore.createHubConnection(activityId);
      }

      return () => {
         commentStore.clearComments();
      };
   }, [commentStore, activityId]);

   return (
      <>
         <Segment
            textAlign="center"
            attached="top"
            inverted
            color="teal"
            style={{ border: "none" }}
         >
            <Header>Conversa sobre este evento</Header>
         </Segment>
         <Segment attached clearing>
            <Formik
               onSubmit={(values, { resetForm }) =>
                  commentStore.addComment(values).then(() => resetForm())
               }
               initialValues={{ body: "" }}
               validationSchema={Yup.object({
                  body: Yup.string().required(),
               })}
            >
               {({ isSubmitting, isValid, handleSubmit }) => (
                  <Form className="ui-form">
                     <Field name="body">
                        {(props: FieldProps) => (
                           <div style={{ position: "relative" }}>
                              <Loader active={isSubmitting} />
                              <textarea
                                 placeholder="Escribe tu comentario (Enter para enviar, SHIFT + enter para nueva linea)"
                                 style={{ width: '100%', height: '70px' }}
                                 rows={2}
                                 {...props.field}
                                 onKeyPress={(e) => {
                                    if (e.key === "Enter" && e.shiftKey) {
                                       return;
                                    }
                                    if (e.key === "Enter" && !e.shiftKey) {
                                       e.preventDefault();
                                       isValid && handleSubmit();
                                    }
                                 }}
                              />
                           </div>
                        )}
                     </Field>
                  </Form>
               )}
            </Formik>
            <Comment.Group>
               {commentStore.comments.map(comment => (
                  <Comment key={comment.id}>
                     <Comment.Avatar src={comment.image || "/assets/user.png"} />
                     <Comment.Content>
                        <Comment.Author as={Link} to={`/perfil/${comment.username}`}>
                           {comment.displayName}
                        </Comment.Author>
                        <Comment.Metadata>
                           <div>{formatDistanceToNow(comment.createdAt, { locale: es })}</div>
                        </Comment.Metadata>
                        <Comment.Text style={{ whiteSpace: "pre-wrap" }}>
                           {comment.body}
                        </Comment.Text>
                     </Comment.Content>
                  </Comment>
               ))}
            </Comment.Group>
         </Segment>
      </>
   );
};

export default observer(ActivityDetailedChat);
