import { useEffect } from "react";
import { Container } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import Homepage from '../../features/home/Homepage';
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from '../../features/activities/details/ActivityDetails';
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import { useStore } from '../stores/store';
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";

function App() {
  const location = useLocation();
  const { commonStore, userStore } = useStore();

  useEffect(() => {
    if (commonStore.token) {
      userStore.getUser().finally(() => commonStore.setAppLoaded());
    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if (!commonStore.appLoaded) return <LoadingComponent content="Cargando página..."/>
  
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar />
      <ModalContainer />
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
          <Route path='/login' element={<LoginForm />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default observer(App);//observer solo se usa cuando el componente usa un observable de mobx
