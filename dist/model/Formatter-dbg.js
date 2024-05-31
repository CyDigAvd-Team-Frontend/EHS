sap.ui.define([], function () {
	"use strict";
	return {
		status: function (sStatus) {
			if(sStatus === "Avsluttet"){
                return "Success"
            }else if(sStatus === "Ny"){
                return "Error"
            }
            return "Warning"
		}
	};
});