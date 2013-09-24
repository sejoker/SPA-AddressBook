define(['services/logger','durandal/system', 'viewmodels/model'], function (logger, system, model) {

    var getContactsPartials = function(contactsObservable) {
        // reset the observable
        contactsObservable([]);
        // set ajax call
        var options = {
            url: '/api/breeze/contacts',
            type: 'GET',
            dataType: 'json'
        };
        // make call
        $.ajax(options)
            .then(querySucceeded)
            .fail(queryFailed);
        // handle the ajax callback

        function querySucceeded(data) {
            var contacts = [];
            data.sort(sortContacts);
            data.forEach(function (item) {
                var c = new model.ContactPartial(item);
                contacts.push(c);
            });
            contactsObservable(contacts);
            logger.log('Retrieved contacts from remote service', contacts, system.getModuleId(dataservice), true);
        }
    };
    
    var dataservice = {
        getContactsPartials: getContactsPartials
    };

    return dataservice;
    //#region Internal methods
    function queryFailed(jqXHR, textStatus) {
        var msg = 'Error getting data. ' + textStatus;
        logger.log(msg,
            jqXHR,
            system.getModuleId(dataservice),
            true);

    }

    function sortContacts(c1, c2) {
        return (c1.firstName + c1.lastName > c2.firstName + c2.lastName)
            ? 1 : -1;
    }
    //#endregion

});