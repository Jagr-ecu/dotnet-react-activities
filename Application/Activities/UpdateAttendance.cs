using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                this._context = context;
                this._userAccessor = userAccessor;
            }

            //sirve para eliminar asistencia o agregar una
            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                //busca actividad
                var activity = await _context.Activities
                    .Include(a => a.Attendees).ThenInclude(u => u.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null) return null;

                //busca segun usuario que hizo la busqueda por eso es el getusername
                var user = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                
                if (user == null) return null;

                var hostUsername = activity.Attendees
                    .FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees
                    .FirstOrDefault(x => x.AppUser.UserName == user.UserName);
            
                //verifica si el usuario que hizo la peticion es el host
                //si lo es, cancela la actividad
                if (attendance != null && hostUsername == user.UserName)
                    activity.IsCancelled = !activity.IsCancelled;

                //si no es el host, se lo quita de la asistencia
                if (attendance != null && hostUsername != user.UserName)
                    activity.Attendees.Remove(attendance);


                if (attendance == null)
                {
                    attendance = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };

                    activity.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? Result<Unit>.Success(Unit.Value) : Result<Unit>.Failure("Problemas para actualizar la asistencia");
            }
        }
    }
}