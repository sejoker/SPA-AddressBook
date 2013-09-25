define(['durandal/system', 'plugins/router', 'services/logger', 'services/datacontext'],
    function (system, router, logger, datacontext) {
        var shell = {
            activate: activate,
            router: router
        };
        
        return shell;

        //#region Internal Methods
        function activate() {
            return datacontext.primeData()
                .then(boot)
                .fail(failedInitialization);
        }

        function boot() {
            log('Address Book Loaded!', null, true);

            router.on('router:route:not-found', function (fragment) {
                logError('No Route Found', fragment, true);
            });            

            var routes = [
                { route: '', moduleId: 'home', title: 'AddressBook', nav: 1 },
                { route: 'details', moduleId: 'details', title: 'Details', nav: 2 }];

            return router.makeRelative({ moduleId: 'viewmodels' }) // router will look here for viewmodels by convention
                .map(routes)            // Map the routes
                .buildNavigationModel() // Finds all nav routes and readies them
                .activate();            // Activate the router
        }

        function log(msg, data, showToast) {
            logger.log(msg, data, system.getModuleId(shell), showToast);
        }

        function logError(msg, data, showToast) {
            logger.logError(msg, data, system.getModuleId(shell), showToast);
        }
        
        function failedInitialization(error) {
            var msg = 'App initialization failed: ' + error.message;
            logger.log(msg, error, system.getModuleId(shell), true);
        }
        //#endregion
    });