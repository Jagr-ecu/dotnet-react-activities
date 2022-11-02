import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Homepage from '../../features/home/Homepage';
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from '../../features/activities/details/ActivityDetails';

function App() {
  const location = useLocation();

  return (
    <>
      <Container style={{ marginTop: "7em" }}>
        <Routes>
          <Route path='/' element={<Homepage />} />
          <Route element={<><NavBar /><Outlet /></>}>
            <Route path='/actividades' element={<ActivityDashboard />} />
            <Route path='/actividades/:id' element={<ActivityDetails />} />
            {["/crear-actividad", "/administrar/:id"].map((path) => {
                return (
                  <Route key={location.key} path={path} element={<ActivityForm key={location.key}/>} />
                );
            })}
          </Route>
        </Routes>
      </Container>
    </>
  );
}

export default observer(App);//observer solo se usa cuando el componente usa un observable de mobx
