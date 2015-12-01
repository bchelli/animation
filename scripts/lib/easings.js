
/*
 * Easing methods
 */
var easings = {
	linear:         function (t) { return t },
	swing:          function (t) { return 0.5 - Math.cos( t * Math.PI ) / 2 },
};

var baseEaseOut = {
	Quad:    function (t) { return t*(2-t) },
	Cubic:   function (t) { return (--t)*t*t+1 },
	Quart:   function (t) { return 1-(--t)*t*t*t },
	Quint:   function (t) { return 1+(--t)*t*t*t*t },
	Expo:    function (t) { return 1 - Math.pow( 2, -10 * t ) },
	Circ:    function (t) { return Math.sqrt(1 - (--t)*t) },
	Sin:     function (t) { return Math.sin(t * (Math.PI/2)) },
	Elastic: function (t) { return 1 - (Math.cos(t * 4.5 * Math.PI) * Math.exp(-t * 6)); },
	Back:    function (t) { return ((--t)*t*((1.70158+1)*t + 1.70158) + 1) },
	Bounce:  function (t) { return 1 - Math.abs(Math.cos(t * 4.5 * Math.PI) * Math.exp(-t * 6)); },
};

Object.keys(baseEaseOut).forEach(function (name) {
	easings['easeOut'+name]   = baseEaseOut[name];
	easings['easeIn'+name]    = makeEaseIn(name);
	easings['easeInOut'+name] = makeEaseInOut(name);
});

function makeEaseIn (name) {
	return function (t) {
		return 1 - baseEaseOut[name](1-t);
	};
}

function makeEaseInOut (name) {
	return function (t) {
		if (t<0.5) {
			return 0.5 * easings['easeIn'+name](t*2);
		}
		return 0.5 + 0.5 * easings['easeOut'+name]((t-0.5)*2);
	};
}
