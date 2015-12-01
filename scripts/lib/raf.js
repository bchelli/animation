
/*
 * Request Animation Frame Polyfill
 */
var raf = (function () {
	var requestAnimationFrame = window.requestAnimationFrame;
	var cancelAnimationFrame  = window.cancelAnimationFrame;

	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !requestAnimationFrame; ++x) {
		requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		cancelAnimationFrame  = window[vendors[x]+'CancelAnimationFrame'] 
		                     || window[vendors[x]+'CancelRequestAnimationFrame'];
	}

	if (!requestAnimationFrame) {
		requestAnimationFrame = function(callback) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
	}

	if (!cancelAnimationFrame) {
		cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
	}

	return function (callback) {
		var id = requestAnimationFrame(callback);
		return function () {
			cancelAnimationFrame(id);
		};
	};
})();
