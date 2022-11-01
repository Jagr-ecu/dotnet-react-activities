import { observer } from "mobx-react-lite";
import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";

import { useStore } from '../../../app/stores/store';


const ActivityForm = () => {
  const { activityStore } = useStore();
  const { selectedActivity, closeForm, createActivity, updateActivity, loading } = activityStore;

  const initialState = selectedActivity ?? {
    id: "",
    description: '',
    title: '',
    category: "",
    date: "",
    city: "",
    venue: "",
  };

  const [activity, setActivity] = useState(initialState);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setActivity({ ...activity, [name]: value });
  };

  const handleSubmit = () => {
    activity.id ? updateActivity(activity) : createActivity(activity);
  };

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
          onClick={closeForm}
          floated="right"
          type="button"
          content="Cancelar"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivityForm);
