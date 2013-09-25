define(['services/logger', 'services/datacontext'], function (logger, datacontext) {
    var title = 'Contacts';
    var contacts = ko.observableArray();
    var groups = ko.observableArray();
    var initialized = false;
    var vm = {
        activate: activate,
        contacts: contacts,
        groups: groups,
        title: title
    };

    return vm;

    //#region Internal Methods
    function activate() {
        if (initialized) {
            return;
        }
        initialized = true;
        logger.log(title + ' View Activated', null, title, true);
        return refresh();
    }
    //#endregion
    
    function refresh() {
        return datacontext.getContacts(contacts);
    }
});