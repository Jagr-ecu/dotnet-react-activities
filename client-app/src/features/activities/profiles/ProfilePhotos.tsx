import React, { SyntheticEvent, useState } from "react";
import { observer } from "mobx-react-lite";
import { Card, Header, Tab, Image, Grid, Button } from "semantic-ui-react";
import { Profile, Photo } from "../../../app/models/Profile";
import { useStore } from "../../../app/stores/store";
import PhotoUploadWidget from "../../../app/common/imageUpload/PhotoUploadWidget";

interface Props {
   profile: Profile;
}

const ProfilePhotos = ({ profile }: Props) => {
   const {
      profileStore: {
         isCurrentUser,
         uploadPhoto,
         uploading,
         loading,
         setMainPhoto,
         deletePhoto,
      },
   } = useStore();
   const [addPhotoMode, setAddPhotoMode] = useState(false);
   const [target, setTarget] = useState("");

   function handlePhotoUpload(file: Blob) {
      uploadPhoto(file).then(() => setAddPhotoMode(false));
   }

   function handleSetMainPhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
      setTarget(e.currentTarget.name);
      setMainPhoto(photo);
   }

   function handleDeletePhoto(photo: Photo, e: SyntheticEvent<HTMLButtonElement>) {
      setTarget(e.currentTarget.name);
      deletePhoto(photo);
   }

   return (
      <Tab.Pane>
         <Grid>
            <Grid.Column width={16}>
               <Header floated="left" icon="image" content="Fotos" />
               {isCurrentUser && (
                  <Button
                     floated="right"
                     basic
                     content={addPhotoMode ? "Cancelar" : "Añadir Foto"}
                     onClick={() => setAddPhotoMode(!addPhotoMode)}
                  />
               )}
            </Grid.Column>
            <Grid.Column width={16}>
               {addPhotoMode ? (
                  <PhotoUploadWidget
                     uploadPhoto={handlePhotoUpload}
                     loading={uploading}
                  />
               ) : (
                  <Card.Group itemsPerRow={4}>
                     {profile.photos?.map((photo) => (
                        <Card key={photo.id}>
                           <Image src={photo.url} />
                           {isCurrentUser && (
                              <Button.Group fluid widths={2}>
                                 <Button
                                    basic
                                    color="green"
                                    content="Perfil"
                                    name={'main'+photo.id}
                                    disabled={photo.isMain}
                                    loading={target === 'main'+photo.id && loading}
                                    onClick={(e) => handleSetMainPhoto(photo, e)}
                                 />
                                 <Button
                                    basic
                                    color="red"
                                    icon="trash"
                                    name={photo.id}
                                    loading={target === photo.id && loading}
                                    onClick={(e) => handleDeletePhoto(photo, e)}
                                    disabled={photo.isMain}
                                 />
                              </Button.Group>
                           )}
                        </Card>
                     ))}
                  </Card.Group>
               )}
            </Grid.Column>
         </Grid>
      </Tab.Pane>
   );
};

export default observer(ProfilePhotos);
