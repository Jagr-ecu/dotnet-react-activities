import React, { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Route } from "react-router-dom";

import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Homepage from '../../features/home/Homepage';
import ActivityForm from "../../features/activities/form/ActivityForm";

function App() {
  return (
    <>
      <NavBar />
      <Container style={{ marginTop: "7em" }}>
        <Route path='/' component={Homepage} />
        <Route path='/activities' component={ActivityDashboard} />
        <Route path='/create-activity' component={ActivityForm} />
      </Container>
    </>
  );
}

export default observer(App);//observer solo se usa cuando el componente usa un observable de mobx
