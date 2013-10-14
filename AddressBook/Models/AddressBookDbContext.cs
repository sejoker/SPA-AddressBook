using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace AddressBook.Models
{
    public class AddressBookDbContext: DbContext
    {
        public AddressBookDbContext(): base("AddressBook")
        {}

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // Use singular table names
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            Database.SetInitializer<AddressBookDbContext>(new AddressBookContextInitializer());

            modelBuilder.Configurations.Add(new ContactConfiguration());
        }

        public DbSet<Contact> Contacts { get; set; }
        public DbSet<ContactGroup> ContactGroups { get; set; }
    }
}