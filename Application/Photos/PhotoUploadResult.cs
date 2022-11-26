using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Photos
{
    //Se crea esta clase debido a que la logica va a estar en la carpeta o proyecto de infrastructure
    //y el proyecto application no va a tener a acceso debido a que no tiene una REFERENCIA con 
    //infrastructure
    public class PhotoUploadResult
    {
        public string PublicId { get; set; }
        public string Url { get; set; }
    }
}