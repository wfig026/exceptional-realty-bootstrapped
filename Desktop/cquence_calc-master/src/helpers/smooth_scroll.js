// Smooth Scroll without jQuery
var timeStart, timeCurrent, timeElapsed, next, start, element, distance, duration, outerElm;

const functionDone = isInner => {
	if (isInner) {
		outerElm.scrollTop = start + distance;
	} else {
		window.scrollTo(0, start + distance);
	}
	timeStart = false;
}

const easeInOutQuad = (t,b,c,d) => {
	if ((t/=d/2) < 1) return c/2*t*t + b;
	return -c/2 * ((--t)*(t-2) - 1) + b;
}

const clientLocation = () => {
	return window.scrollY || window.pageYOffset;
}

const elmTop = dest => {
	return dest.getBoundingClientRect().top + start;
}

const scrollLoop = timeCurrent => {
	if (!timeStart) {
		timeStart = timeCurrent;
	}

	timeElapsed = timeCurrent - timeStart;

	next = easeInOutQuad(timeElapsed, start, distance, duration);

	window.scrollTo(0, next);

	timeElapsed < duration
		? window.requestAnimationFrame(scrollLoop)
		: functionDone()
}

const scrollLoopForInner = timeCurrent => {
	if (!timeStart) {
		timeStart = timeCurrent;
	}

	timeElapsed = timeCurrent - timeStart;

	console.log('timeElapsed: ' + timeElapsed) 
	console.log('start: ' + start) 
	console.log('distance: ' + distance) 
	console.log('duration: ' + duration)

	next = easeInOutQuad(timeElapsed, start, distance, duration);

	console.log(next);

	outerElm.scrollTop = next;

	timeElapsed < duration 
		? window.requestAnimationFrame(scrollLoopForInner)
		: functionDone(true);
}

export const smoothScroll = (target, dur, inElement) => {
	if (inElement) {
		start = inElement.scrollTop;
	} else {
		start = clientLocation();
	}
	duration = dur;

	console.log('start: ' + start);
	console.log('target: ' + target);

	switch (typeof target) {
		case 'number':
			element = undefined;
			stop = target - start;
			break;
		case 'object':
			element = target;
			stop = elmTop(element);
			break;
		case 'string':
			element = document.querySelector(target);
			stop = elmTop(element);
			break;
	}

	distance = stop - start;

	if (inElement) {
		outerElm = inElement;
		window.requestAnimationFrame(scrollLoopForInner)
	} else {
		window.requestAnimationFrame(scrollLoop);
	}
}