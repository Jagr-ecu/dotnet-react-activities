import React from "react";
import { ErrorMessage, Form, Formik } from "formik";
import { Button, Header, Label } from "semantic-ui-react";
import * as Yup from 'yup'

import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import ValidationErrors from "../errors/ValidationErrors";

const RegisterForm = () => {
   const { userStore } = useStore();

   return (
      <Formik
         initialValues={{
            displayName: "",
            username: "",
            email: "",
            password: "",
            error: null,
         }}
         onSubmit={(values, { setErrors }) =>
            userStore
               .register(values)
               .catch((error) => setErrors({ error }))
         }
         validationSchema={Yup.object({
            displayName: Yup.string().required(),
            username: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required(),
         })}
      >
         {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
            <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
               <Header as="h2" content="Registrarse" color="teal" textAlign="center" />
               <MyTextInput name="displayName" placeholder="Nombres" />
               <MyTextInput name="username" placeholder="Nombre de usuario" />
               <MyTextInput name="email" placeholder="Email" />
               <MyTextInput name="password" placeholder="Contraseña" type="password" />
               <ErrorMessage
                  name="error"
                  render={() => <ValidationErrors errors={errors.error} />}
               />
               <Button
                  loading={isSubmitting}
                  disabled={isValid || !dirty || isSubmitting}
                  positive
                  content="Registrarse"
                  type="submit"
                  fluid
               />
            </Form>
         )}
      </Formik>
   );
};

export default observer(RegisterForm);
