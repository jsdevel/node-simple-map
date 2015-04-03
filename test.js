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

	it('should return { "a": 1, "b": "2, "c": 3 } when given ({"x": 1, "y": 2, "z": 3}, { "x": "a", "y": "b", "z": "c" }) ' , function() {
		validateMapped(map({"x": 1, "y": 2, "z": 3}, { "x": "a", "y": "b", "z": "c" }));
	});

	it('should return { "a": 1, "b": "2, "c": 3 } when given ({"x": 1, "y": 2, "z": 3}, convertKey)', function() {
		function convertKey(k) {
			var m = { "x": "a", "y": "b", "z": "c" };
			return m[k];
		}
		validateMapped(map({"x": 1, "y": 2, "z": 3}, convertKey));
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
		mapped.should.have.property("b").and.to.be.null;
	});

	it('should return {"a": 1, "b": null} when given ({ "x": 1 }, { "x": "a", "y": "b" })', function(){
		var mapped = map({"x": 1}, { "x": "a", "y": "b" });
		mapped.should.have.property("b").and.to.be.null;
	});


	it('should return {"a": 1, "b": null} when given ({ "x": 1, "y": undefined }, { "x": "a", "y": "b" })', function(){
		var mapped = map({"x": 1}, { "x": "a", "y": "b" });
		mapped.should.have.property("b").and.to.be.null;
	});

	it('should return {"a": 1, "b": null} when given ({"x": 1, "y": 2}, function(k) { return k === "x" ? "a" : null; })', function() {
		var mapped = map({"x": 1, "y": 2}, function(k) { return k === "x" ? "a" : null; });
		mapped.should.have.property("y").and.to.be.null;
	});
});