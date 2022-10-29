import React, { ChangeEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../../../app/models/Activity";

interface Props {
  activity?: Activity;
  closeForm: () => void;
  createOrEdit: (activity: Activity) => void;
}

const ActivityForm = ({ activity: selectedActivity, closeForm, createOrEdit }: Props) => {
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
    createOrEdit(activity);
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
        <Button floated="right" positive type="submit" content="Enviar" />
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

export default ActivityForm;
