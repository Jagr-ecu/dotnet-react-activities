import React from "react";
import { ErrorMessage, Form, Formik } from "formik";
import MyTextInput from "../../../app/common/form/MyTextInput";
import { Button, Label } from "semantic-ui-react";
import MyTextArea from "../../../app/common/form/MyTextArea";
import { useStore } from "../../../app/stores/store";
import * as Yup from "yup";

interface Props {
   setEditMode: (editMode: boolean) => void;
}

const ProfileEditForm = ({ setEditMode }: Props) => {
   const { profileStore } = useStore();
   const { profile } = profileStore;

   return (
      <Formik
         initialValues={{
            displayName: profile?.displayName,
            bio: profile?.bio,
            error: null,
         }}
         onSubmit={(values, { setErrors }) =>
            profileStore.updateProfile(values).then(() => {
               setEditMode(false);
            })
         }
         validationSchema={Yup.object({
            displayName: Yup.string().required(),
         })}
      >
         {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
            <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
               <MyTextInput name="displayName" placeholder="Nombre de usuario" />
               <MyTextArea name="Bio" placeholder="Biografía" rows={3} />
               <Button
                  loading={isSubmitting}
                  positive
                  content="Editar Perfil"
                  type="submit"
                  disabled={!isValid || !dirty}
                  floated='right'
               />
            </Form>
         )}
      </Formik>
   );
};

export default ProfileEditForm;
