
/*
 * Animation function
 */
var DEFAULT_DURATION = 300; // ms
function animation (opt) {
	var start = Date.now();

	var animation = opt.animation || function () {};
	var callback  = opt.callback  || function () {};
	var duration  = opt.duration  || DEFAULT_DURATION;

	function animate () {
		var position = Math.min(1, (Date.now() - start) / duration);
		animation(position);
		if (position < 1) {
			raf(animate);
		} else {
			callback();
		}
	}

	raf(animate);
}
