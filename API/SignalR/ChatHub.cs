using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    //our client will make a connection to this hub and then it will be able to invoke methods
    //that we create inside this hub
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;

        public ChatHub(IMediator mediator)
        {
            this._mediator = mediator;
        }

        //crea un comentario
        public async Task SendComment(Create.Command command)
        {
            var comment = await _mediator.Send(command);

            //in this case the group is what matches the activity id so each activity is going 
            // to have its own group
            await Clients.Group(command.ActivityId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }

        //when a client connects to our hub, we want them to join a group
        //and we override OnConnectedAsync to do that
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            var activityId = httpContext.Request.Query["activityId"];//gets query from request
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);//assigns a group for the activity
            var result = await _mediator.Send(new List.Query{ActivityId = Guid.Parse(activityId)});//use the list handler
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}