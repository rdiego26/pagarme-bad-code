"use strict";

module.exports = {

	formatSeconds: function(secs) {
		function pad(s) {
			return (s < 10 ? "0" : "") + s;
		}
		const hours = Math.floor(secs / (60*60));
		const minutes = Math.floor(secs % (60*60) / 60);
		const seconds = Math.floor(secs % 60);

		return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
	}

};