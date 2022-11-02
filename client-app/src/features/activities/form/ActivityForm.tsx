import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { v4 as uuid } from "uuid";
import { useNavigate, Link } from 'react-router-dom';

import { useStore } from '../../../app/stores/store';
import { useParams } from 'react-router-dom';
import { Activity } from '../../../app/models/Activity';
import LoadingComponent from "../../../app/layout/LoadingComponent";


const ActivityForm = () => {
  const navigate = useNavigate();
  const { activityStore } = useStore();
  const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore;

  const { id } = useParams<{id: string}>();

  const [activity, setActivity] = useState<Activity>({
    id: '',
    description: '',
    title: '',
    category: '',
    date: '',
    city: '',
    venue: '',
  });

  useEffect(() => {
    if (id) loadActivity(id).then(activity => setActivity(activity!));
  }, [id, loadActivity]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    if (activity.id.length === 0) {
      let newActivity = {
        ...activity,
        id: uuid()
      };
      createActivity(newActivity).then(() => navigate(`/actividades/${newActivity.id}`));
    } else {
      updateActivity(activity).then(() => navigate(`/actividades/${activity.id}`));
    }
  };

  if(loadingInitial) return <LoadingComponent content="Cargando Actividad..."/>

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit} autoComplete="off">
        <Form.Input
          placeholder="Titulo"
          value={activity.title}
          name="title"
          onChange={handleInputChange}
        />
        <Form.TextArea
          placeholder="Descripción"
          value={activity.description}
          name="description"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Categoria"
          value={activity.category}
          name="category"
          onChange={handleInputChange}
        />
        <Form.Input
          type="date"
          placeholder="Fecha"
          value={activity.date}
          name="date"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Ciudad"
          value={activity.city}
          name="city"
          onChange={handleInputChange}
        />
        <Form.Input
          placeholder="Lugar"
          value={activity.venue}
          name="venue"
          onChange={handleInputChange}
        />
        <Button floated="right" positive type="submit" loading={loading} content="Enviar" />
        <Button
          as={Link}
          to='/actividades'
          floated="right"
          type="button"
          content="Cancelar"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
