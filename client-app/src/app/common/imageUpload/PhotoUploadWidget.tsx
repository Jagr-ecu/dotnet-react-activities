import React, { useEffect, useState } from "react";
import { Button, Grid, Header } from "semantic-ui-react";
import { Cropper } from "react-cropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";

interface Props{
    loading: boolean;
    uploadPhoto: (file: Blob) => void
} 

const PhotoUploadWidget = ({ loading, uploadPhoto }: Props) => {
   const [files, setFiles] = useState<any>([]);
   const [cropper, setCropper] = useState<Cropper>();

   function onCrop() {
      if (cropper) {
         cropper.getCroppedCanvas().toBlob((blob) => uploadPhoto(blob!));
      }
   }

   useEffect(() => {
      return () => {
         files.forEach((file: any) => URL.revokeObjectURL(file.preview));
      };
   }, [files]);

   return (
      <Grid>
         <Grid.Column width={4}>
            <Header color="teal" content="Paso 1 - Añadir Foto" />
            <PhotoWidgetDropzone setFiles={setFiles} />
         </Grid.Column>
         <Grid.Column width={1} />
         <Grid.Column width={5}>
            <Header color="teal" content="Paso 2 - Establecer tamaño de la foto" />
            {files && files.length > 0 && (
               <PhotoWidgetCropper
                  setCropper={setCropper}
                  imagePreview={files[0].preview}
               />
            )}
         </Grid.Column>
         <Grid.Column width={1} />
         <Grid.Column width={4}>
            <Header color="teal" content="Paso 3 - Subir Foto" />
            {files && files.length > 0 && (
               <>
                  <div
                     className="img-preview"
                     style={{ minHeight: 200, overflow: "hidden" }}
                  />
                  <Button.Group widths={2}>
                     <Button loading={loading} onClick={onCrop} positive icon="check" />
                     <Button disabled={loading} onClick={() => setFiles([])} icon="close" />
                  </Button.Group>
               </>
            )}
         </Grid.Column>
      </Grid>
   );
};

export default PhotoUploadWidget;
