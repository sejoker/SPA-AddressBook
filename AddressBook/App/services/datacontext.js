define(['services/logger','durandal/system', 'viewmodels/model', 'config'], function (logger, system, model, config) {
    var entityQuery = breeze.EntityQuery,
        manager = configureBreezeManager();
    var getContacts = function(contactsObservable) {
        // reset the observable
        contactsObservable([]);
        var query = entityQuery.from('Contacts')
            .orderBy('lastName', 'firstName');

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

    var primeData = function () {
        return Q.all([getLookups(), getContacts]);
    };
    
    var datacontext = {
        getContacts: getContacts,
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