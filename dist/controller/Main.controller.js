sap.ui.define(["no/mil/zehs/controller/Base","sap/ui/core/routing/History","sap/ui/core/Fragment"],function(e,t,o){"use strict";return e.extend("no.mil.zehs.controller.Main",{onInit:function(){this.getView().addStyleClass(this.getContentDensityClass());this.oRouter=this.getRouter().getRoute("RouteMain");this.oRouter.attachPatternMatched(this.onRouteMatched,this)},onRouteMatched:function(e){this.getModel("layoutModel").setProperty("/layout","OneColumn")},onPressNavToForm:function(e){this.getRouter().navTo("Form")},onPressNavToFeed:function(e){var t=e.getSource().getBindingContext("ListModel").getObject();this.getRouter().navTo("Feed",{ID:t.ID})},onPressNavToVarsel:function(e){this.getRouter().navTo("Varsel")},onPressNavToHome:function(e){var o=t.getInstance();var i=o.getPreviousHash();if(i!==undefined){window.history.go(-1)}else{window.location.href="https://cydigavd-team-frontend.github.io/FLP/"}},onSearch:function(e){var t=this.getView().byId("_IDGenTable1").getBinding("items");var o=e.getParameter("selectionSet")[1].getSelectedItem().getText();var i=[];if(o!=="Alle"){i.push(new sap.ui.model.Filter("Status",sap.ui.model.FilterOperator.EQ,o))}var n=e.getParameter("selectionSet")[2].getSelectedItem().getText();i.push(new sap.ui.model.Filter("Type",sap.ui.model.FilterOperator.EQ,n));t.filter(i)},onPressOpenInfo:function(e){var t=e.getSource();var i=e.getSource().getBindingContext("ListModel");if(!this._oPopover){o.load({name:"no.mil.zehs.view.fragments.InfoPopover",controller:this}).then(function(e){this._oPopover=e;this.getView().addDependent(this._oPopover);this._oPopover.setBindingContext(i);this._oPopover.openBy(t);this._oPopover.setModel(this.getModel("ListModel"))}.bind(this))}else{this._oPopover.setBindingContext(i);this._oPopover.openBy(t);this._oPopover.setModel(this.getModel("ListModel"))}}})});
//# sourceMappingURL=Main.controller.js.map