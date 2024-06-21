sap.ui.define(
  [
    "no/mil/zehs/controller/Base"
  ],
  function (Controller) {
    "use strict";

    return Controller.extend("no.mil.zehs.controller.App", {


      onInit: function () {

        this.getModel("initModel").dataLoaded().then(function () {

          this.getModel("initModel").setProperty("/ModulePath", sap.ui.require.toUrl("no/mil/zehs"));
          this.getModel("initModel").setProperty("/AppUrl", window.location.href);
        }.bind(this))
      }
    });
  }
);
