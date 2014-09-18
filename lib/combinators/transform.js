/** @license MIT License (c) copyright 2010-2014 original author or authors */
/** @author Brian Cavalier */
/** @author John Hann */
/** @module */

var promise = require('../promises');
var step = require('../step');

var when = promise.when;
var Yield = step.Yield;
var Pair = step.Pair;

exports.map = map;
exports.ap = ap;
exports.flatMap = flatMap;
exports.scan = scan;
exports.tap = tap;

/**
 * Transform each value in the stream by applying f to each
 * @param {function(*):*} f mapping function
 * @param {Stream} stream stream to map
 * @returns {Stream} stream containing items transformed by f
 */
function map(f, stream) {
	var stepper = stream.step;
	return stream.beget(function (state) {
		return mapNext(f, stepper, state);
	}, stream.state);
}

function mapNext (f, stepper, state) {
	return when(function (i) {
		return i.map(f);
	}, when(stepper, state));
}

/**
 * Perform a side effect for each item in the stream
 * @param {function(x:*):*} f side effect to execute for each item. The
 *  return value will be discarded.
 * @param {Stream} stream stream to tap
 * @returns {Stream} new stream containing the same items as this stream
 */
function tap(f, stream) {
	var stepper = stream.step;
	return stream.beget(function (state) {
		return tapNext(f, stepper, state);
	}, stream.state);
}

function tapNext (f, stepper, state) {
	return when(function (i) {
		return i.done ? i : when(function() {
			return i;
		}, i.map(f));
	}, when(stepper, state));
}

/**
 * Assume this stream contains functions, and apply each function to each item
 * in the provided stream.  This generates, in effect, a cross product.
 * @param {Stream} fs stream of functions to apply to the xs
 * @param {Stream} xs stream of items to which to apply all the fs
 * @returns {Stream} stream containing the cross product of items
 */
function ap(fs, xs) {
	return flatMap(function(f) {
		return map(f, xs);
	}, fs);
}

/**
 * Create a stream containing successive reduce results of applying f to
 * the previous reduce result and the current stream item.
 * @param {function(result:*, x:*):*} f reducer function
 * @param {*} initial initial value
 * @param {Stream} stream stream to scan
 * @returns {Stream} new stream containing successive reduce results
 */
function scan(f, initial, stream) {
	var stepper = stream.step;
	return stream.beget(function(s) {
		return stepScan(f, stepper, s);
	}, new Pair(initial, stream.state));
}

function stepScan (f, stepper, s) {
	return when(function (i) {
		if (i.done) {
			return i.withState(s.state);
		}

		var value = f(s.value, i.value);
		return new Yield(i.time, value, new Pair(value, i.state));
	}, when(stepper, s.state));
}

/**
 * Map each value in the stream to a new stream, and emit its values
 * into the returned stream.
 * @param {function(x:*):Stream} f chaining function, must return a Stream
 * @param {Stream} stream
 * @returns {Stream} new stream containing all items from each stream returned by f
 */
function flatMap(f, stream) {
	return stream.begetWithDispose(stepChain, new Outer(f, stream), disposeInnerThenOuter);

	function stepChain(s) {
		return s.step(stepChain);
	}
}

function disposeInnerThenOuter(t, x, s) {
	if(s === void 0) {
		return x;
	}
	return when(function disposeOuter() {
		return disposeStream(t, x, s.outer);
	}, disposeStream(t, x, s.inner));
}

function disposeStream(t, x, stream) {
	return stream !== void 0 ? stream.dispose(t, x, stream.state) : x;
}

// flatMap outer/inner "loop" helpers

function Outer(f, outer) {
	this.f = f; this.outer = outer; this.inner = void 0;
}

Outer.prototype.step = function(stepNext) {
	return stepOuter(stepNext, this.f, this.outer);
};

function stepOuter(stepNext, f, outer) {
	return when(function(i) {
		return i.done ? i
			: stepInner(stepNext, f, outer.beget(outer.step, i.state), f(i.value));
	}, Promise.resolve(streamNext(outer)));
}

function Inner(f, outer, inner) {
	this.f = f; this.outer = outer; this.inner = inner;
}

Inner.prototype.step = function(stepNext) {
	return stepInner(stepNext, this.f, this.outer, this.inner);
};

function stepInner(stepNext, f, outer, inner) {
	return when(function(ii) {
		if(ii.done) {
			return when(function() {
				return stepOuter(stepNext, f, outer);
			}, inner.dispose(ii.time, ii.value, ii.state));
		}
		return ii.withState(new Inner(f, outer, inner.beget(inner.step, ii.state)));
	}, Promise.resolve(streamNext(inner)));
}

function streamNext(s) {
	return when(s.step, s.state);
}