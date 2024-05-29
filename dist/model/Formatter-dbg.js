sap.ui.define([], function () {
	"use strict";
	return {
		status: function (sStatus) {
			if(sStatus === "Ferdig"){
                return "Success"
            }else if(sStatus === "Mottatt"){
                return "Error"
            }
            return "Warning"
		}
	};
});