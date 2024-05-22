sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("no.mil.zehs.controller.Form", {


            handleClose: function(){
                this.getOwnerComponent().getRouter().navTo("RouteMain");
                this.getOwnerComponent().getModel("layoutModel").setProperty("/layout", "OneColumn");
                
            }
        });
    });
