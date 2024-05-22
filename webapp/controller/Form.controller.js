sap.ui.define([
    "no/mil/zehs/controller/Base"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("no.mil.zehs.controller.Form", {

            onInit: function () {
                this.getView().addStyleClass(this.getContentDensityClass());
                this.oRouter = this.getRouter().getRoute("Form");
                this.oRouter.attachPatternMatched(this.onRouteMatched, this);
            },

            onRouteMatched: function (evt) {
                this.getOwnerComponent().getModel("layoutModel").setProperty("/layout", "OneColumn");
            },

            handleClose: function () {
                this.getOwnerComponent().getRouter().navTo("RouteMain");

            }
        });
    });
