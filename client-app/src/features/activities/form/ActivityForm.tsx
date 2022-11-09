import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Button, Header, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useStore } from "../../../app/stores/store";
import { useParams } from "react-router-dom";
import { Activity } from "../../../app/models/Activity";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { categoryOptions } from "../../../app/common/options/CategoryOptions";
import MyDateInput from "../../../app/common/form/MyDateInput";

const ActivityForm = () => {
   const navigate = useNavigate();
   const { activityStore } = useStore();
   const { createActivity, updateActivity, loading, loadActivity, loadingInitial } =
      activityStore;

   const { id } = useParams<{ id: string }>();

   const [activity, setActivity] = useState<Activity>({
      id: "",
      title: "",
      description: "",
      category: "",
      date: null,
      city: "",
      venue: "",
   });

   const validationSchema = Yup.object({
      title: Yup.string().required("El titulo de la actividad es requerida"),
      description: Yup.string().required("La descripción de la actividad es requerida"),
      category: Yup.string().required("La categoría de la actividad es requerida"),
      date: Yup.string().required("La fecha de la actividad es requerida").nullable(),
      city: Yup.string().required("La ciudad de la actividad es requerida"),
      venue: Yup.string().required("El lugar de la actividad es requerida"),
   });

   useEffect(() => {
      if (id) loadActivity(id).then((activity) => setActivity(activity!));
   }, [id, loadActivity]);

   // const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
   //   const { name, value } = event.target;
   //   setActivity({ ...activity, [name]: value });
   // };

   const handleFormSubmit = (activity: Activity) => {
      if (activity.id.length === 0) {
         let newActivity = {
            ...activity,
            id: uuid(),
         };
         createActivity(newActivity).then(() =>
            navigate(`/actividades/${newActivity.id}`)
         );
      } else {
         updateActivity(activity).then(() => navigate(`/actividades/${activity.id}`));
      }
   };

   if (loadingInitial) return <LoadingComponent content="Cargando Actividad..." />;

   return (
      <Segment clearing>
         <Header content="Detalles de la Actividad" sub color="teal" />
         <Formik
            validationSchema={validationSchema}
            enableReinitialize
            initialValues={activity}
            onSubmit={(values) => handleFormSubmit(values)}
         >
            {({ handleSubmit, isValid, isSubmitting, dirty }) => (
               <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                  <MyTextInput placeholder="Titulo" name="title" />
                  <MyTextArea placeholder="Descripción" name="description" rows={3} />
                  <MySelectInput
                     placeholder="Categoria"
                     name="category"
                     options={categoryOptions}
                  />
                  <MyDateInput
                     placeholderText="Fecha"
                     name="date"
                     showTimeSelect
                     timeCaption="time"
                     dateFormat="MMMM d, yyyy h:mm aa"
                  />
                  <Header content="Detalles de ubicación" sub color="teal" />
                  <MyTextInput placeholder="Ciudad" name="city" />
                  <MyTextInput placeholder="Lugar" name="venue" />
                  <Button
                     floated="right"
                     positive
                     type="submit"
                     loading={loading}
                     content="Enviar"
                     disabled={isSubmitting || !dirty || !isValid}
                  />
                  <Button
                     as={Link}
                     to="/actividades"
                     floated="right"
                     type="button"
                     content="Cancelar"
                  />
               </Form>
            )}
         </Formik>
      </Segment>
   );
};

export default observer(ActivityForm);
