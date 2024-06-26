sap.ui.define([
    "no/mil/zehs/controller/Base",
    "sap/ui/core/routing/History",
    'sap/ui/core/Fragment',    
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, History, Fragment) {
        "use strict";

        return Controller.extend("no.mil.zehs.controller.Main", {

            onInit: function () {
                this.getView().addStyleClass(this.getContentDensityClass());
                this.oRouter = this.getRouter().getRoute("RouteMain");
                this.oRouter.attachPatternMatched(this.onRouteMatched, this);
            },

            onRouteMatched: function (evt) {
                this.getModel("layoutModel").setProperty("/layout", "OneColumn");
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
                    var oHistory = History.getInstance();
                    var sPreviousHash = oHistory.getPreviousHash();
        
                    if (sPreviousHash !== undefined) {
                        window.history.go(-1);
                    } else {
                        window.location.href = "https://cydigavd-team-frontend.github.io/FLP/";
                    }
            },

            onPressOpenDocument: function(oEvent){
                var oObject = oEvent.getSource().getBindingContext("ListModel").getObject();
                this.getRouter().navTo("Doc", { ID: oObject.ID });
            },
            // onSearch: function (oEvent) {
            //     var items = this.getView().byId("_IDGenTable1").getBinding("items");
            //     var sStatus = oEvent.getParameter("selectionSet")[1].getSelectedItem().getText();
            //     var aFilter = [];
            //     if (sStatus !== "Alle") {
            //     aFilter.push(new sap.ui.model.Filter("Status", sap.ui.model.FilterOperator.EQ, sStatus))
            //     }
            //     var sType =  oEvent.getParameter("selectionSet")[2].getSelectedItem().getText();
            //     aFilter.push(new sap.ui.model.Filter("Type", sap.ui.model.FilterOperator.EQ, sType))
            //     // var aTokens = oEvent.getParameter("selectionSet")[3].getSelectedItems();
            //     // aTokens.forEach(function(token){
            //     //     aFilter.push(new sap.ui.model.Filter("Rolle", sap.ui.model.FilterOperator.Contains, token.getText()));
            //     // });
            //     items.filter(aFilter);
            // },

            onPressOpenInfo: function(oEvent){
                var oButton = oEvent.getSource();
                var oContext = oEvent.getSource().getBindingContext("ListModel");
                
                // create popover
                if (!this._oPopover) {
                    Fragment.load({
                        name: "no.mil.zehs.view.fragments.popovers.InfoPopover",
                        controller: this
                    }).then(function(pPopover) {
                        this._oPopover = pPopover;
                        this.getView().addDependent(this._oPopover);
                        this._oPopover.setBindingContext(oContext)
                        this._oPopover.openBy(oButton);
                        this._oPopover.setModel(this.getModel("ListModel"))
                    }.bind(this));
                } else {
                    this._oPopover.setBindingContext(oContext)
                    this._oPopover.openBy(oButton);
                    this._oPopover.setModel(this.getModel("ListModel"))
                }
                
            }

        });
    });
