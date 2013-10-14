using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace AddressBook.Models
{
    public class ContactConfiguration : EntityTypeConfiguration<Contact>
    {
        public ContactConfiguration()
        {
            HasOptional(x => x.Group);
        }
    }
}