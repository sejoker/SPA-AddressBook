define(function() {
    var imageSettings = {
        unknownPersonImageSource: '..//content/images/unknown_person.jpg'
    };

   
    var model = {
        configureMetadataStore: configureMetadataStore
    };

    return model;

    //#region Internal Methods
    function configureMetadataStore(metadataStore) {
        metadataStore.registerEntityTypeCtor(
            'Contact', null, contactInitializer);
    }

    function contactInitializer(contact) {
        contact.fullName = ko.computed(function () {
            return contact.firstName() + ' '
                + contact.lastName();
        });
        contact.imageSource = ko.computed(function () {
            return makeImageName(contact.imageUrl());
        });
    }

    function makeImageName(source) {
        return (source || imageSettings.unknownPersonImageSource);
    }

    //#endregion
});