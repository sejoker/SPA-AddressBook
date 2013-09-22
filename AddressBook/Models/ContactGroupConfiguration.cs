using System;
using System.Collections.Generic;
using System.Data.Entity.ModelConfiguration;
using System.Linq;
using System.Web;

namespace AddressBook.Models
{
    public class ContactGroupConfiguration: EntityTypeConfiguration<ContactGroup>
    {
        public ContactGroupConfiguration()
        {
            HasRequired(x => x.Name);
        }
    }
}