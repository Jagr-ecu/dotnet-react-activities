using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context)
        {
            if (context.Activities.Any()) return;
            
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
                },
                new Activity
                {
                    Title = "Actividad Pasada 2",
                    Date = DateTime.Now.AddMonths(-1),
                    Description = "Activity 1 month ago",
                    Category = "cultura",
                    City = "Paris",
                    Venue = "Louvre",
                },
                new Activity
                {
                    Title = "Actividad Futura 1",
                    Date = DateTime.Now.AddMonths(1),
                    Description = "Actividad 1 month in future",
                    Category = "cultura",
                    City = "London",
                    Venue = "Natural History Museum",
                },
                new Activity
                {
                    Title = "Actividad Futura 2",
                    Date = DateTime.Now.AddMonths(2),
                    Description = "Actividad 2 meses en el futuro",
                    Category = "musica",
                    City = "London",
                    Venue = "O2 Arena",
                },
                new Activity
                {
                    Title = "Actividad Futura 3",
                    Date = DateTime.Now.AddMonths(3),
                    Description = "Actividad 3 meses en el futuro",
                    Category = "bebidas",
                    City = "London",
                    Venue = "Another pub",
                },
                new Activity
                {
                    Title = "Actividad Futura 4",
                    Date = DateTime.Now.AddMonths(4),
                    Description = "Actividad 4 meses en el futuro",
                    Category = "bebidas",
                    City = "London",
                    Venue = "Yet another pub",
                },
                new Activity
                {
                    Title = "Actividad Futura 5",
                    Date = DateTime.Now.AddMonths(5),
                    Description = "Actividad 5 meses en el futuro",
                    Category = "bebidas",
                    City = "London",
                    Venue = "Just another pub",
                },
                new Activity
                {
                    Title = "Actividad Futura 6",
                    Date = DateTime.Now.AddMonths(6),
                    Description = "Actividad 6 meses en el futuro",
                    Category = "musica",
                    City = "London",
                    Venue = "Roundhouse Camden",
                },
                new Activity
                {
                    Title = "Actividad Futura 7",
                    Date = DateTime.Now.AddMonths(7),
                    Description = "Actividad 7 meses en el futuro",
                    Category = "viaje",
                    City = "London",
                    Venue = "Somewhere on the Thames",
                },
                new Activity
                {
                    Title = "Actividad Futura 8",
                    Date = DateTime.Now.AddMonths(8),
                    Description = "Actividad 8 meses en el futuro",
                    Category = "pelicula",
                    City = "London",
                    Venue = "Cinema",
                }
            };

            await context.Activities.AddRangeAsync(activities);
            await context.SaveChangesAsync();
        }
    }
}