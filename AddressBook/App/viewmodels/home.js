define(['services/logger', 'services/datacontext'], function (logger, datacontext) {
    var title = 'Groups';
    var contacts = ko.observableArray();
    var groups = ko.observableArray();
    var initialized = false;
    

    
    var vm = {
        activate: activate,
        contacts: contacts,
        groups: groups,
        title: title,
        attached: attached,
        contactsByGroup: contactsByGroup
    };

    return vm;

    function contactsByGroup(group) {
        return datacontext.getGroupContacts(contacts, group);
    }

    //#region Internal Methods
    function activate() {
        if (initialized) {
            return;
        }
        initialized = true;
        logger.log(title + ' View Activated', null, title, true);
        return refresh();
    }
    
    function attached(view, parent) {
        $('#groups').val('3');
        
        $('#groups').on('change', function () {
            var that = this;
            var groupId = that.options[that.selectedIndex].value;
            contactsByGroup(groupId);
        });
    }
    
    function refresh() {
        return Q.all([datacontext.getContacts(contacts, 'Friends'),
                      datacontext.getGroups(groups)]);
    }
    
    //#endregion
});