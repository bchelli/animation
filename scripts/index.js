
var count = 0;
function addBouncingBalls (number, isJquery) {
	count += number;
	document.getElementById('count').innerHTML = count;
	for(var i=0; i<number; i++) {
		addBouncingBall(isJquery);
	}
}

function addBouncingBall (isJquery) {
	var animationObj = {
		properties: {
			top: {
				from:   0,
				to:     window.innerHeight - 20,
				easing: 'easeOutBounce'
			},
			left: {
				from:   Math.floor(Math.random()*(window.innerWidth - 20)),
				to:     Math.floor(Math.random()*(window.innerWidth - 20)),
				easing: 'easeOutExpo'
			},
			borderRadius: {
				from:   50,
				to:     20,
				easing: 'easeOutBounce'
			},
			width: {
				from:   50,
				to:     20,
				easing: 'easeOutBounce'
			},
			height: {
				from:   50,
				to:     20,
				easing: 'easeOutBounce'
			},
		},
		duration: 200+Math.random()*4800,
		el:       document.createElement('div'),
		success:  function () {
			document.body.removeChild(animationObj.el);
			addBouncingBall(isJquery);
		}
	};

	animationObj.el.className = 'ball';
	Object.keys(animationObj.properties).forEach(function (prop) {
		animationObj.el.style[prop] = animationObj.properties[prop].from + 'px';
	});
	document.body.appendChild(animationObj.el);

	(isJquery?animateJQuery:animateVanilla)(animationObj);
}

function animateJQuery (obj) {
	Object.keys(obj.properties).forEach(function (prop, i, props) {
		var animation = {};
		var options = {
			duration: obj.duration,
			queue: false,
			easing: obj.properties[prop].easing
		};
		animation[prop] = obj.properties[prop].to;
		if (i === props.length - 1) {
			options.complete = obj.success
		}
		$(obj.el).animate(animation, options);
	});
}

function animateVanilla (obj) {
	var props = Object.keys(obj.properties);

	function animate (t) {
		for (var i=0; i<props.length; i++) {
			var prop  = props[i];
			var opt   = obj.properties[prop];
			var value = opt.from + easings[opt.easing](t) * (opt.to - opt.from);
			obj.el.style[prop] = Math.floor(value) + 'px';
		}
	}

	animation({
		animation: animate,
		duration:  obj.duration,
		callback:  obj.success
	});
}
