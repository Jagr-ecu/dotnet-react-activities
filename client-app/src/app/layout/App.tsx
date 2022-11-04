import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";

import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Homepage from '../../features/home/Homepage';
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from "../../features/errors/TestError";
import { ToastContainer } from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

function App() {
  const location = useLocation();

  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route 
          element={
            <Container style={{ marginTop: '6em' }}>
              <NavBar /><Outlet />
            </Container>
          }
        >
          <Route path='/actividades' element={<ActivityDashboard />} />
          <Route path='/actividades/:id' element={<ActivityDetails />} />
          {["/crear-actividad", "/administrar/:id"].map((path) => {
              return (
                <Route key={location.key} path={path} element={<ActivityForm key={location.key}/>} />
              );
          })}
          <Route path='/errores' element={<TestErrors />} />
          <Route path='/error-servidor' element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default observer(App);//observer solo se usa cuando el componente usa un observable de mobx
