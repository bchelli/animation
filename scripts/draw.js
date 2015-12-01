
setTimeout(function () {
	draw('linear');
	draw('swing');
	draw('easeInQuad');
	draw('easeOutQuad');
	draw('easeInOutQuad');
	draw('easeInCubic');
	draw('easeOutCubic');
	draw('easeInOutCubic');
	draw('easeInQuart');
	draw('easeOutQuart');
	draw('easeInOutQuart');
	draw('easeInQuint');
	draw('easeOutQuint');
	draw('easeInOutQuint');
	draw('easeInExpo');
	draw('easeOutExpo');
	draw('easeInOutExpo');
	draw('easeInCirc');
	draw('easeOutCirc');
	draw('easeInOutCirc');
	draw('easeInSin');
	draw('easeOutSin');
	draw('easeInOutSin');
	draw('easeInElastic');
	draw('easeOutElastic');
	draw('easeInOutElastic');
	draw('easeInBack');
	draw('easeOutBack');
	draw('easeInOutBack');
	draw('easeInBounce');
	draw('easeOutBounce');
	draw('easeInOutBounce');
}, 1000)

function draw(name) {
	var h2 = document.createElement('h2');
	h2.innerHTML = name;
	document.body.appendChild(h2);

	var canvas = document.createElement('canvas');
	canvas.width  = 400;
	canvas.height = 400;
	document.body.appendChild(canvas);

	var axes={}, ctx=canvas.getContext("2d");
	axes.x0 = canvas.width/4;  // x0 pixels from left to x=0
	axes.y0 = 3*canvas.height/4; // y0 pixels from top to y=0
	axes.scale = 200;                 // 40 pixels from x=0 to x=1

	showAxes(ctx,axes);
	funGraph(ctx,axes,easings[name],"rgb(11,153,11)",1);
}

function funGraph (ctx,axes,func,color,thick) {
	var xx, yy, x0=axes.x0, y0=axes.y0, scale=axes.scale;
	var iMax = axes.scale;
	var iMin = 0;
	ctx.beginPath();
	ctx.lineWidth = thick;
	ctx.strokeStyle = color;

	for (var i=iMin;i<=iMax;i++) {
		xx = i; yy = scale*func(xx/scale);
		if (i==iMin) ctx.moveTo(x0+xx,y0-yy);
		else         ctx.lineTo(x0+xx,y0-yy);
	}
	ctx.stroke();
}

function showAxes(ctx,axes) {
	var x0=axes.x0, x1=axes.x0 + axes.scale, w=ctx.canvas.width;
	var y0=axes.y0, y1=axes.y0 - axes.scale, h=ctx.canvas.height;
	var xmin = 0;
	ctx.beginPath();
	ctx.strokeStyle = "rgb(128,128,128)"; 
	ctx.moveTo(xmin,y0); ctx.lineTo(w,y0);  // X0 axis
	ctx.moveTo(x0,0);    ctx.lineTo(x0,h);  // Y0 axis
	ctx.moveTo(xmin,y1); ctx.lineTo(w,y1);  // X1 axis
	ctx.moveTo(x1,0);    ctx.lineTo(x1,h);  // Y1 axis
	ctx.stroke();
}
