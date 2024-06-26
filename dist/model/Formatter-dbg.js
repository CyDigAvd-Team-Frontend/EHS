sap.ui.define([], function () {
	"use strict";
	return {
		status: function (sStatus) {
			if (sStatus === "Avsluttet") {
				return "Success"
			} 
		},

		getI18Txt: function (sValue) {
			let oI18nModel = this.getOwnerComponent().getModel("i18n"),
				oI18Bundle = oI18nModel.getResourceBundle();

			return oI18Bundle.getText(sValue);
		}
	};
});