using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterDto
    {
        //Se pone las anotaciones solo si se maneja los datos en el controlador
        [Required(ErrorMessage = "El nombre es requerido")]
        public string DisplayName { get; set; }
        [Required(ErrorMessage = "El email es requerido")]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*[!@#$&*-_])(?=.*[a-z])(?=.*[A-Z]).{4,50}$$", ErrorMessage = "La contraseña es debil")]
        public string Password { get; set; }
        [Required(ErrorMessage = "El nombre de usuario es requerido")]
        public string Username { get; set; }
    }
}