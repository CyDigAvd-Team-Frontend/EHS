sap.ui.define([
    "no/mil/zehs/controller/Base"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller) {
        "use strict";

        return Controller.extend("no.mil.zehs.controller.Feed", {
            onInit: function (evt) {
                this.getView().addStyleClass(this.getContentDensityClass());
                this.oRouter = this.getRouter().getRoute("Feed");
                this.oRouter.attachPatternMatched(this.onRouteMatched, this);
                //this.getOwnerComponent().getModel("layoutModel").setProperty("/layout", "TwoColumnsBeginExpanded"); 
            },

            onRouteMatched: function (evt) {
                var iId = Number(evt.getParameter("arguments").ID);
                var oObject = this.getModel("ListModel").getData().find((object) => object.ID === iId)
                this.getModel("FeedModel").setData(oObject.Kommentar);
                this.getModel("FeedModel").refresh();
                this.getModel("layoutModel").setProperty("/layout", "TwoColumnsBeginExpanded");
            },

            onPostFeed: function (evt) {
                var aFeed = this.getModel("FeedModel").getData();
                aFeed.unshift({ text: evt.getSource().getValue(), Author: "Lars", icon: "sap-icon://employee" });
                this.getModel("FeedModel").refresh();
                this.getModel("ListModel").setProperty("/Kommentar", aFeed)
            },

            handleClose: function () {
                this.getRouter().navTo("RouteMain");
            }
        });
    });
