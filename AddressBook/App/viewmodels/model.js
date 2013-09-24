define(function() {
    var imageSettings = {
        unknownPersonImageSource: '..//content/images/unknown_person.jpg'
    };

    var ContactPartial = function(dto) {
        return addContactPartialComputeds(mapToObservable(dto));
    };

    var model = {
        ContactPartial: ContactPartial
    };

    return model;

    //#region Internal Methods
    function mapToObservable(dto) {
        var mapped = {};
        for (prop in dto) {
            if (dto.hasOwnProperty(prop)) {
                mapped[prop] = ko.observable(dto[prop]);
            }
        }
        return mapped;
    }

    function addContactPartialComputeds(entity) {
        entity.FullName = ko.computed(function() {
            return entity.FirstName() + ' '
                + entity.LastName();
        });
        entity.imageUrl = ko.computed(function() {
            return makeImageName(entity.ImageUrl());
        });
        return entity;
    }

    function makeImageName(source) {
        return (source || imageSettings.unknownPersonImageSource);
    }

    //#endregion
});