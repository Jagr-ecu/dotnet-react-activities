using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context, UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Activities.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser{DisplayName = "Eddard", UserName = "ned_stark", Email="start@test.com"},
                    new AppUser{DisplayName = "Mary", UserName = "mj1234", Email="maryjane@test.com"},
                    new AppUser{DisplayName = "Peter", UserName = "Spiderman", Email="parker02@test.com"},
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Contraseña_1");
                }

                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Actividad Pasada 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "Actividad hace 2 meses",
                        Category = "bebidas",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Actividad Pasada 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Activity 1 month ago",
                        Category = "cultura",
                        City = "Paris",
                        Venue = "Louvre",
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                },
                                new ActivityAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                },
                            }
                    },
                    new Activity
                    {
                        Title = "Actividad Futura 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "Actividad 1 month in future",
                        Category = "cultura",
                        City = "London",
                        Venue = "Natural History Museum",
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[2],
                                    IsHost = true
                                },
                                new ActivityAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                },
                            }
                    },
                    new Activity
                    {
                        Title = "Actividad Futura 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "Actividad 2 meses en el futuro",
                        Category = "musica",
                        City = "London",
                        Venue = "O2 Arena",
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                },
                                new ActivityAttendee
                                {
                                    AppUser = users[2],
                                    IsHost = false
                                },
                            }
                    },
                    new Activity
                    {
                        Title = "Actividad Futura 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Actividad 3 meses en el futuro",
                        Category = "bebidas",
                        City = "London",
                        Venue = "Another pub",
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = true
                                },
                                new ActivityAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = false
                                },
                            }
                    },
                    new Activity
                    {
                        Title = "Actividad Futura 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "Actividad 4 meses en el futuro",
                        Category = "bebidas",
                        City = "London",
                        Venue = "Yet another pub",
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = true
                                }
                            }
                    },
                    new Activity
                    {
                        Title = "Actividad Futura 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Actividad 5 meses en el futuro",
                        Category = "bebidas",
                        City = "London",
                        Venue = "Just another pub",
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                },
                                new ActivityAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                },
                            }
                    },
                    new Activity
                    {
                        Title = "Actividad Futura 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "Actividad 6 meses en el futuro",
                        Category = "musica",
                        City = "London",
                        Venue = "Roundhouse Camden",
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[2],
                                    IsHost = true
                                },
                                new ActivityAttendee
                                {
                                    AppUser = users[1],
                                    IsHost = false
                                },
                            }
                    },
                    new Activity
                    {
                        Title = "Actividad Futura 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Actividad 7 meses en el futuro",
                        Category = "viaje",
                        City = "London",
                        Venue = "Somewhere on the Thames",
                        Attendees = new List<ActivityAttendee>
                            {
                                new ActivityAttendee
                                {
                                    AppUser = users[0],
                                    IsHost = true
                                },
                                new ActivityAttendee
                                {
                                    AppUser = users[2],
                                    IsHost = false
                                },
                            }
                    },
                    new Activity
                {
                    Title = "Actividad Futura 8",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "Actividad 8 meses en el futuro",
                    Category = "pelicula",
                    City = "London",
                    Venue = "Cinema",
                    Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}