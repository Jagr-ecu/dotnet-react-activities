import React, { useEffect } from "react";
import { Grid } from "semantic-ui-react";
import { observer } from "mobx-react-lite";

import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";
import { useStore } from '../../../app/stores/store';
import LoadingComponent from "../../../app/layout/LoadingComponent";


const ActivityDashboard = () => {
  const { activityStore } = useStore();
  const { selectedActivity, editMode } = activityStore;

  useEffect(() => {
    activityStore.loadActivities();
  }, [activityStore]);

  if (activityStore.loadingInitial) return <LoadingComponent content="Cargando Página..." />

  return (
    <Grid>
      <Grid.Column width="10">
        <ActivityList />
      </Grid.Column>
      <Grid.Column width="6">
        {selectedActivity && !editMode && (
          <ActivityDetails />
        )}
        {editMode && (
          <ActivityForm />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
