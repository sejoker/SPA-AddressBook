using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace AddressBook.Models
{
    public class ContactGroup
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Contact> Contacts { get; set; } 
    }
}