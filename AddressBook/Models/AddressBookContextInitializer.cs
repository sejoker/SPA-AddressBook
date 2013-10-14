using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace AddressBook.Models
{
    public class AddressBookContextInitializer: DropCreateDatabaseAlways<AddressBookDbContext>
    {
        protected override void Seed(AddressBookDbContext context)
        {
            var friends = new ContactGroup
                {
                    Name = "Friends",
                    Contacts = new List<Contact>
                        {
                            new Contact
                                {
                                    FirstName = "Andrew",
                                    LastName = "Martinez",
                                    Email = "andrew.martinez65@example.com",
                                    ImageUrl = "http://api.randomuser.me/0.2/portraits/men/10.jpg",
                                    Phone = "050-242-23-21",
                                }
                        }
                };

            var collegues = new ContactGroup
                {
                    Name = "Collegues",
                    Contacts = new List<Contact>
                        {
                            new Contact
                                {
                                    FirstName = "Isobel",
                                    LastName = "Cox",
                                    Email = "isobel.cox70@example.com",
                                    ImageUrl = "http://api.randomuser.me/0.2/portraits/women/33.jpg",
                                    Phone = "050-523-13-64",
                                }
                        }
                };

            context.ContactGroups.Add(new ContactGroup
                {
                    Name = "All Contacts"
                });

            context.ContactGroups.Add(friends);
            context.ContactGroups.Add(collegues);

            //http://api.randomuser.me/?seed=goldenLadybug
            context.Contacts.Add(new Contact
            {
                FirstName = "Walter",
                LastName = "Ramirez",
                Email = "walter.ramirez16@example.com",
                ImageUrl = "http://api.randomuser.me/0.2/portraits/men/14.jpg",
                Phone = "050-642-32-75",
            });
        }
    }
}