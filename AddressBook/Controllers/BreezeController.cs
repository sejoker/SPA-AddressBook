using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using AddressBook.Models;
using Breeze.WebApi;
using Breeze.WebApi.EF;

namespace AddressBook.Controllers
{
    [BreezeController]
    public class BreezeController : ApiController
    {
        private readonly EFContextProvider<AddressBookDbContext> _contextProvider = new EFContextProvider<AddressBookDbContext>();

        [HttpGet]
        public string Metadata()
        {
            return _contextProvider.Metadata();
        }

        [HttpGet]
        public object Lookups()
        {
            var contacts = _contextProvider.Context.Contacts;
            var contactGroups = _contextProvider.Context.ContactGroups;
            return new {contacts, contactGroups};
        }

        [HttpGet]
        public IQueryable<Contact> Contacts()
        {
            return _contextProvider.Context.Contacts;
        }

        [HttpGet]
        public IQueryable<ContactGroup> Groups()
        {
            return _contextProvider.Context.ContactGroups;
        }

        [HttpGet]
        public IQueryable<ContactGroup> GroupContacts()
        {
            return _contextProvider.Context.ContactGroups;
        }
    }
}