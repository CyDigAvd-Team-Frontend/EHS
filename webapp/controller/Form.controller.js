sap.ui.define([
    "no/mil/zehs/controller/Base"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Base) {
        "use strict";

        return Base.extend("no.mil.zehs.controller.Form", {

            onInit: function () {

                this.getView().addStyleClass(this.getContentDensityClass());
                this.oRouter = this.getRouter().getRoute("Form");
                this.oRouter.attachPatternMatched(this.onRouteMatched, this);
            },

            onRequestWoundLoc: function () {
                // create dialog lazily
                if (!this._diaHumanBody) {
                    this._diaHumanBody = sap.ui.xmlfragment(this.getView().getId(), "no.mil.zehs.view.fragments.dialogs.HumanMap", this);
                    this.getView().addDependent(this._diaHumanBody);
                    // Attach resize event to the dialog
                    this.resizeHandlerId = this.ResizeHandler.register(this._diaHumanBody, this.onDialogResize.bind(this));
                }
                this._diaHumanBody.open();

            },

            onExit: function () {

            },

            onDialogResize: function (oEvent) {
                imageMapResize()
            },

            onAfterCloseHumanMap: function () {
                this._diaHumanBody.destroy();
                this._diaHumanBody = null;
                if (this.resizeHandlerId) {
                    this.ResizeHandler.deregister(this.resizeHandlerId);
                }
            },

            onRouteMatched: function (evt) {

                this.getModel("layoutModel").setProperty("/layout", "OneColumn");

                if (this._diaHumanBody && this._diaHumanBody.isOpen()) {
                    this._diaHumanBody.close();
                    this.byId("inWoundLoc").setValue(evt.getParameter("arguments").injury);
                    console.log(evt.getParameter("arguments").injury);

                    this.getRouter().initialize(true);
                }
            },

            handleClose: function () {
                this.getRouter().navTo("RouteMain", {}, true);

            },

            onPressAbort: function () {
                this.handleClose();
            },

            onSelectionChangeType: function (evt) {
                let sKey = evt.getParameter("changedItem").getText(),
                    bSelected = evt.getParameter("selected");
                if (sKey === "Personskade") {
                    this.getModel("initModel").setProperty("/Personskade", bSelected);
                }
            },

            onChangeCrtical: function (evt) {
                var bState = evt.getSource().getState();
                var oModel = this.getModel("initModel");
                if (!bState) {
                    return;
                }
                oModel.setProperty("/bIsMateriel", false);
                oModel.setProperty("/bIsPersonWound", false);
                oModel.setProperty("/bIsEnvironmentEstate", false)

            },

            onBtnTodayPressed: function (evt) {
                this.byId("inputPeriod").setDateValue(new Date());
                this.byId("inputDate").setDateValue(new Date());
            },

            onSelChangeRegIncident: function (evt) {
                let oSelect = evt.getSource(),
                    oSelItem = evt.getParameter("item"),
                    sKey = oSelItem.getKey(),
                    oInitModel = this.getModel("initModel"),
                    oCategories = oInitModel.getProperty("/regIncidentCat/");

                oInitModel.setProperty("/bIncWithOutDMG", false);
               // oInitModel.setProperty("/bIsCriticalRel", false);
                oInitModel.setProperty("/bIsMateriel", false);
                oInitModel.setProperty("/bIsPersonWound", false);
                oInitModel.setProperty("/bIsEnvironmentEstate", false);

                if (Number(sKey) === oCategories[1].code) {
                    /* oInitModel.setProperty("/bIsMateriel", true);
                    oInitModel.setProperty("/bIsPersonWound", true);
                    oInitModel.setProperty("/bIsEnvironmentEstate", true) */
                } else if (Number(sKey) === oCategories[2].code) {
                    oInitModel.setProperty("/bIncWithOutDMG", true)
                } else if (Number(sKey) === oCategories[3].code) {
                    
                }

            }
        });
    });
