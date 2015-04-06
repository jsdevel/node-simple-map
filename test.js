var should = require('chai').should();
var map = require('../simple-map');

describe("map", function() {
	function validateMapped(mapped) {
		mapped.should.have.property("a");
		mapped.a.should.equal(1);
		mapped.should.not.have.property("x");
		mapped.should.have.property("b");
		mapped.b.should.equal(2);
		mapped.should.not.have.property("y");
		mapped.should.have.property("c");
		mapped.c.should.equal(3);
		mapped.should.not.have.property("z");
	}

	function convertKey(k) {
		var m = { "x": "a", "y": "b", "z": "c" };
		return m[k];
	}

	it('should return { "a": 1, "b": "2, "c": 3 } when given ({"x": 1, "y": 2, "z": 3}, { "x": "a", "y": "b", "z": "c" }) ' , function() {
		validateMapped(map({"x": 1, "y": 2, "z": 3}, { "x": "a", "y": "b", "z": "c" }));
	});

	it('should return { "a": 1, "b": "2, "c": 3 } when given ({"x": 1, "y": 2, "z": 3}, convertKey)', function() {

		validateMapped(map({"x": 1, "y": 2, "z": 3}, convertKey));
	});

	it('should return { "a": 1, "b": "2, "c": 3 } when given ({"x": 1, "y": 2, "z": 3}, { "x": "a", "y": "b", "z": "c" }, ["x", "y"]) ' , function() {
		var mapped = map({"x": 1, "y": 2, "z": 3}, { "x": "a", "y": "b", "z": "c" }, ["x", "y"]);
		mapped.should.have.property("a");
		mapped.a.should.equal(1);
		mapped.should.not.have.property("c");
	});

	it('should return {"a": 1, "b": 2} when given ({"x": 1, "y": 2, "z": 3}, convertKey, ["x", "y"])', function() {
		var mapped = map({"x": 1, "y": 2, "z": 3}, convertKey, ["x", "y"]);
		mapped.should.have.property("a");
		mapped.a.should.equal(1);
		mapped.should.not.have.property("c");
	});

	it('should return { "a": 1 } when given ({"x": 1, "y", 2}, { "x": "a" })', function() {
		var mapped = map({"x": 1, "y": 2}, { "x": "a" });
		mapped.should.not.have.property("b");
	});

	it('should return {"a": 1} when given ({"x", 1, "y": 2}, function(k) { return k === "x" ? "a" : undefined; })', function() {
		var mapped = map({"x": 1, "y": 2}, function(k) { return k === "x" ? "a" : undefined; });
		mapped.should.not.have.property("b");
	});

	it('should return {"a": 1, "b": null} when given ({"x": 1, "y": null}, { "x": "a", "y": "b" })', function(){
		var mapped = map({"x": 1, "y": null}, { "x": "a", "y": "b" });
		mapped.should.have.property("b");
		should.equal(mapped.b, null);
	});

	it('should return {"a": 1, "b": null} when given ({ "x": 1 }, { "x": "a", "y": "b" })', function(){
		var mapped = map({"x": 1}, { "x": "a", "y": "b" });
		mapped.should.have.property("b");
		should.equal(mapped.b, null);
	});


	it('should return {"a": 1, "b": null} when given ({ "x": 1, "y": undefined }, { "x": "a", "y": "b" })', function(){
		var mapped = map({"x": 1}, { "x": "a", "y": "b" });
		mapped.should.have.property("b");
		should.equal(mapped.b, null);
	});

	it('should return {"a": 1, "b": null} when given ({"x": 1, "y": 2}, function(k) { return k === "x" ? "a" : null; })', function() {
		var mapped = map({"x": 1, "y": 2}, function(k) { return k === "x" ? "a" : null; });
		mapped.should.have.property("y");
		should.equal(mapped.y, null);
	});

	describe('#make', function() {
		it('should close around the given map object and return a curried function that returns the same value as the map function when invoked', function() {
			var m = { 'x': 'a' };
			var made = map.make(m);
			var testObject = {'x': 1};
			var madeMapped = made(testObject);
			var mapMapped = map(testObject, m);
			made.should.be.a('function');
			madeMapped.should.have.property('a');
			madeMapped.a.should.equal(testObject.x);
			madeMapped.a.should.equal(mapMapped.a);
		});

		it('should close around the given map function and return a curried function that returns the same value as the map function when invoked', function() {
			var m = function(v) { return v === 'x' ? 'a' : undefined; };
			var made = map.make(m);
			var testObject = {'x': 1};
			var madeMapped = made(testObject);
			var mapMapped = map(testObject, m);
			made.should.be.a('function');
			madeMapped.should.have.property('a');
			madeMapped.a.should.equal(testObject.x);
			madeMapped.a.should.equal(mapMapped.a);
		});

		it('should close around the given map object and include array and return a curried function that returns the same value as the map function when invoked', function() {
			var m = { 'x': 'a', 'y': 'b', 'z': 'c' };
			var inc = ['x', 'y'];
			var made = map.make(m, inc);
			var testObject = {'x': 1, 'y': 2, 'z': 3};
			var madeMapped = made(testObject);
			var mapMapped = map(testObject, m, inc);
			made.should.be.a('function');
			madeMapped.should.have.property('b');
			madeMapped.b.should.equal(testObject.y);
			madeMapped.b.should.equal(mapMapped.b);
			madeMapped.should.not.have.property('c');
		});		
	});
});
