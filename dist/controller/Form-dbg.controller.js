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
                this.getModel("layoutModel").setProperty("/layout", "OneColumn");
            },

            handleClose: function () {
                this.getRouter().navTo("RouteMain");

            },

            onPressAbort:function(){
                this.handleClose();
            },

            onSelectionChangeType:function(evt){
                let sKey = evt.getParameter("changedItem").getText(),
                    bSelected = evt.getParameter("selected");
                if(sKey === "Personskade"){
                    this.getModel("initModel").setProperty("/Personskade", bSelected);
                }
            },

            onBtnTodayPressed:function(evt){
                this.byId("inputPeriod").setDateValue(new Date());
                this.byId("inputDate").setDateValue(new Date());
            }
        });
    });