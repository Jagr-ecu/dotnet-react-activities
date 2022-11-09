import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Segment, Image, Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import { observer } from "mobx-react-lite";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

const Homepage = () => {
   const { userStore, modalStore } = useStore();

   return (
      <Segment inverted textAlign="center" vertical className="masthead">
         <Container text>
            <Header as="h1" inverted>
               <Image
                  size="massive"
                  src="/assets/logo.png"
                  alt="logo"
                  style={{ marginBotton: 12 }}
               />
               .NET Actividades
            </Header>
            {userStore.isLoggedIn ? (
               <>
                  <Header as="h2" inverted content="Bienvenido a .NET Actividades" />
                  <Button as={Link} to="/actividades" size="huge" inverted>
                     Ir a las actividades!
                  </Button>
               </>
            ) : (
               <>
                  <Button
                      as={Link}
                      onClick={() => modalStore.openModal(<LoginForm />)}
                      size="huge"
                      inverted
                  >
                      Entrar
                  </Button>
                  <Button
                      as={Link}
                      onClick={() => modalStore.openModal(<RegisterForm />)}
                      size="huge"
                      inverted
                  >
                      Registrarse
                  </Button>
               </>
            )}
         </Container>
      </Segment>
   );
};

export default observer(Homepage);
