sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("no.mil.zehs.controller.Feed", {
            onInit: function (evt) {
                this.oOwnerComponent = this.getOwnerComponent();
			    this.oRouter = this.oOwnerComponent.getRouter().getRoute("Feed");
			    this.oRouter.attachPatternMatched(this.onRouteMatched, this);  
                //this.getOwnerComponent().getModel("layoutModel").setProperty("/layout", "TwoColumnsBeginExpanded"); 
            },

            onRouteMatched: function(evt) {
                var iId = Number(evt.getParameter("arguments").ID);
                var oObject = this.getOwnerComponent().getModel("ListModel").getData().find((object) => object.ID === iId)
                this.getOwnerComponent().getModel("FeedModel").setData(oObject.Kommentar);
                this.getOwnerComponent().getModel("FeedModel").refresh();
                this.getOwnerComponent().getModel("layoutModel").setProperty("/layout", "TwoColumnsBeginExpanded"); 
            },

            onPostFeed: function(evt) {
                var aFeed = this.getOwnerComponent().getModel("FeedModel").getData();
                aFeed.unshift({text: evt.getSource().getValue(), Author: "Lars", icon: "sap-icon://employee"});
                this.getOwnerComponent().getModel("FeedModel").refresh();
                this.getOwnerComponent().getModel("ListModel").setProperty("/Kommentar", aFeed)
            },

            handleClose: function(){
                this.getOwnerComponent().getRouter().navTo("RouteMain");
                this.getOwnerComponent().getModel("layoutModel").setProperty("/layout", "OneColumn");
                
            }
        });
    });
