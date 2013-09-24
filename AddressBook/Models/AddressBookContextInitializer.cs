using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AddressBook.Models
{
    public class AddressBookContextInitializer: DropCreateDatabaseIfModelChanges<AddressBookDbContext>
    {
        protected override void Seed(AddressBookDbContext context)
        {
            context.Contacts.Add(new Contact
                {
                    FirstName = "Andrew",
                    LastName = "Martinez",
                    Email = "andrew.martinez65@example.com",
                    ImageUrl = "http://api.randomuser.me/0.2/portraits/men/10.jpg",
                    Phone = "050-242-23-21"
                });

            context.Contacts.Add(new Contact
            {
                FirstName = "Isobel",
                LastName = "Cox",
                Email = "isobel.cox70@example.com",
                ImageUrl = "http://api.randomuser.me/0.2/portraits/women/33.jpg",
                Phone = "050-523-13-64"
            });

            //http://api.randomuser.me/?seed=goldenLadybug
            context.Contacts.Add(new Contact
            {
                FirstName = "Walter",
                LastName = "Ramirez",
                Email = "walter.ramirez16@example.com",
                ImageUrl = "http://api.randomuser.me/0.2/portraits/men/14.jpg",
                Phone = "050-642-32-75"
            });

            context.ContactGroups.Add(new ContactGroup
                {
                    Name = "Friends"
                });

            context.ContactGroups.Add(new ContactGroup
            {
                Name = "Collegues"
            });

            context.ContactGroups.Add(new ContactGroup
            {
                Name = "All"
            });
        }
    }
}