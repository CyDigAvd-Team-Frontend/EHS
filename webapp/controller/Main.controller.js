sap.ui.define([
    "no/mil/zehs/controller/Base"    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("no.mil.zehs.controller.Main", {

            onInit: function () {
                this.getView().addStyleClass(this.getContentDensityClass());
                this.oRouter = this.getRouter().getRoute("RouteMain");
                this.oRouter.attachPatternMatched(this.onRouteMatched, this);
            },

            onRouteMatched: function (evt) {
                this.getOwnerComponent().getModel("layoutModel").setProperty("/layout", "OneColumn");
            },
            onPressNavToForm: function (oEvent) {
                this.getRouter().navTo("Form");
            },
            onPressNavToFeed: function (oEvent) {
                var oObject = oEvent.getSource().getBindingContext("ListModel").getObject();
                this.getRouter().navTo("Feed", { ID: oObject.ID });
            },
            onPressNavToVarsel: function (oEvent) {
                this.getRouter().navTo("Varsel");
            },
            onPressNavToHome: function (oEvent) {
                window.location.href = "https://cydigavd-team-frontend.github.io/FLP/";
            },
            onSearch: function (oEvent) {
                var items = this.getView().byId("_IDGenTable1").getBinding("items");
                var sStatus = oEvent.getParameter("selectionSet")[1].getSelectedItem().getText();
                if (sStatus === "Alle") {
                    items.filter();
                    return
                }
                items.filter(new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, sStatus));
            }

        });
    });
