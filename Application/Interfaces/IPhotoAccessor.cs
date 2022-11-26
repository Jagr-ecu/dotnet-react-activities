using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Photos;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    //Se crea esta interfaz debido a que la logica va a estar en la carpeta o proyecto de infrastructure
    //y el proyecto application no va a tener a acceso debido a que no tiene una REFERENCIA con 
    //infrastructure
    public interface IPhotoAccessor
    {
        //con Formfile se sube el archivo de la foto
        Task<PhotoUploadResult> AddPhoto(IFormFile file);
        Task<string> DeletePhoto(string publicId);
    }
    //estos metodos solo sirven para comunicarse con cloudinary, no con la base de datos
}