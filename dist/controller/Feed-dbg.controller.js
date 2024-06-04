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
                this.getModel("initModel").setProperty("/UrlID", iId);
                var oObject = this.getModel("ListModel").getData().find((object) => object.ID === iId)
                this.getModel("FeedModel").setData(oObject.Personer);
                this.getModel("FeedModel").refresh();
                this.getModel("layoutModel").setProperty("/layout", "TwoColumnsBeginExpanded");
                if(oObject.Personer.length === 1){
                    var oComents = this.getModel("FeedModel").getProperty("/0");
                    this.getModel("initModel").setProperty("/Path", oComents.ID);
                    this.getModel("TimelineModel").setData(oComents);
                    this.getModel("TimelineModel").refresh();
                    this.byId("navCon").to(this.byId("page"))

                } else{
                    this.byId("navCon").to(this.byId("page2"))
                }
            },

            onPostFeed: function (evt) {
                var aTimeline = this.getModel("TimelineModel").getProperty("/Kommentar");
                aTimeline.unshift({ text: evt.getSource().getValue(), Author: "Lars", icon: "sap-icon://employee" , Title: "Varsler", Date: new Date()});
                this.getModel("TimelineModel").refresh();
                var iIdCom = this.getModel("initModel").getProperty("/Path")
                var oFeed = this.getModel("FeedModel").getData().find((object) => object.ID === iIdCom);
                oFeed.Kommentar = aTimeline;

                var iId = this.getModel("initModel").getProperty("/UrlID");
                var oObject = this.getModel("ListModel").getData().find((object) => object.ID === iId);
                var oCom = oObject.Personer.find((object) => object.ID === iIdCom);
                oCom.Kommentar = aTimeline
                //this.getModel("ListModel").setProperty("/Kommentar", aFeed)
            },

            navPage: function(evt){
                var sID = evt.getSource().getCustomData()[0].getValue();
                var oComents = this.getModel("FeedModel").getData().find((object) => object.ID === sID)
                this.getModel("TimelineModel").setData(oComents);
                this.getModel("TimelineModel").refresh();
                this.getModel("initModel").setProperty("/Path", oComents.ID);
                this.byId("navCon").to(this.byId("page"))
            },

            navToList:function(evt){
                this.byId("navCon").to(this.byId("page2"), "fade")
            },

            handleClose: function () {
                this.getRouter().navTo("RouteMain");
            },            
        });
    });
