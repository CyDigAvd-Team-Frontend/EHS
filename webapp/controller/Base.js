sap.ui.define(
    [
        "sap/ui/core/mvc/Controller",
        "sap/ui/Device",
        "no/mil/zehs/model/Formatter",
        "sap/ui/core/ResizeHandler",
        "no/mil/zehs/utils/imageMapResizer.min"
    ],
    function (Base, Device, Formatter, ResizeHandler, ImageMapResizer) {
        "use strict";

        return Base.extend("no.mil.zehs.controller.Base", {

            formatter: Formatter,

            ResizeHandler:ResizeHandler,

            imageMapResizer: ImageMapResizer,

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
            },

            getModel: function(sName){
                return this.getOwnerComponent().getModel(sName);
            }
        });
    }
);
