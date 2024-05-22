sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../model/Formatter"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, formatter) {
        "use strict";

        return Controller.extend("no.mil.zehs.controller.Main", {
            formatter: formatter,
            onInit: function () {

            },

            onPressNavToForm: function(oEvent){
                this.getOwnerComponent().getModel("layoutModel").setProperty("/layout", "OneColumn");
                this.getOwnerComponent().getRouter().navTo("Form");
            },
            onPressNavToFeed: function(oEvent) {
                var oObject = oEvent.getSource().getBindingContext("ListModel").getObject();
                this.getOwnerComponent().getRouter().navTo("Feed", {ID: oObject.ID});
            },
            onPressNavToVarsel: function(oEvent) {
                this.getOwnerComponent().getModel("layoutModel").setProperty("/layout", "OneColumn");
                this.getOwnerComponent().getRouter().navTo("Varsel");
            },
            onPressNavToHome: function(oEvent){
                window.location.href = "https://cydigavd-team-frontend.github.io/FLP/";
            },
            onSearch: function(oEvent){
                var items = this.getView().byId("_IDGenTable1").getBinding("items");
                var sStatus = oEvent.getParameter("selectionSet")[1].getSelectedItem().getText();
                if(sStatus === "Alle"){
                    items.filter();
                    return
                }
                items.filter(new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, sStatus));
            }
            
        });
    });
