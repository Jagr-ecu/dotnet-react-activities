using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class UserFollowing
    {
        public string ObserverId { get; set; }
        public AppUser Observer { get; set; }//person how is going to follow another user
        public string TargetId { get; set; }
        public AppUser Target { get; set; }//person how is being followed
    }
}