define(['services/logger','durandal/system', 'viewmodels/model', 'config'], function (logger, system, model, config) {
    var entityQuery = breeze.EntityQuery,
        manager = configureBreezeManager();
    var getContacts = function (contactsObservable) {
        
        var query = entityQuery.from('Contacts')
            .orderBy('firstName', 'lastName');
        
        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed);

        function querySucceeded(data) {
            if (contactsObservable) {
                contactsObservable(data.results);
            }
            
            logger.log('Retrieved contacts from remote service', data, true);
        }
    };
    
    var getGroupContacts = function (contactsObservable, groupId) {

        var query = entityQuery.from('Contacts')
            .orderBy('firstName', 'lastName');

        if (groupId && groupId != '3') {
            query = query.where('groupId', '==', groupId);
        }
        
        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed);

        function querySucceeded(data) {
            if (contactsObservable) {
                contactsObservable(data.results);
            }

            logger.log('Retrieved contacts from remote service', data, true);
        }
    };

    var getContactsByName = function (contactsObservable, name) {
        var query = entityQuery.from('Contacts');
        if (name && name != '') {
            var op = breeze.FilterQueryOp;
            var firstName = new breeze.Predicate('firstName', op.Contains, name);
            var lastName = new breeze.Predicate('lastName', op.Contains, name);
            var predicate = firstName.or(lastName);
            query = query.where(predicate);
        }
      
        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed);

        function querySucceeded(data) {
            if (contactsObservable) {
                contactsObservable(data.results);
            }

            logger.log('Retrieved contacts by name from remote service', data, true);
        }
    };
    
    var getGroups = function (groupsObservable) {
        var query = entityQuery.from('Groups')
            .orderBy('name');

        return manager.executeQuery(query)
            .then(querySucceeded)
            .fail(queryFailed);

        function querySucceeded(data) {
            if (groupsObservable) {
                groupsObservable(data.results);
            }

            logger.log('Retrieved groups from remote service', data, true);
        }
    };

    var primeData = function () {
        return Q.all([getGroups(), getContacts()]);
    };
     
    var datacontext = {
        getContacts: getContacts,
        getGroupContacts: getGroupContacts,
        getGroups: getGroups,
        getContactsByName: getContactsByName,
        primeData: primeData
    };

    return datacontext;
    //#region Internal methods
    function queryFailed(error) {
        var msg = 'Error getting data. ' + error.message;
        logger.log(msg, system.getModuleId(datacontext), true);

    }
    
    function configureBreezeManager() {
        breeze.NamingConvention.camelCase.setAsDefault();
        var mgr = new breeze.EntityManager(config.remoteServiceName);
        model.configureMetadataStore(mgr.metadataStore);
        return mgr;
    }
    
    function getLookups() {
        return entityQuery.from('Lookups')
            .using(manager)
            .execute()
            .fail(queryFailed);
    }
    //#endregion

});