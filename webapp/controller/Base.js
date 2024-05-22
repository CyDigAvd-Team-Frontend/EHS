sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/Device",
        "no/mil/zehs/model/Formatter"
    ],
    function (Base, Device, Formatter) {
        "use strict";

        return Base.extend("no.mil.zehs.controller.Base", {

            formatter: Formatter,

            getContentDensityClass: function () {
                if (!this._sContentDensityClass) {
                    if (Device.support.touch) {
                        this._sContentDensityClass = "sapUiSizeCozy";
                    } else {
                        this._sContentDensityClass = "sapUiSizeCompact";
                    }
                }
                return this._sContentDensityClass;
            },

            getRouter: function() {
                return this.getOwnerComponent().getRouter();
            }
        });
    }
);
