# README

## simple-map

simple-map is a super small utility function to map one object to another based on a key-value-pair map or a function.

## Examples

### mapping with key-value pairs

	var map = require('simple-map');

	var person = { 
		firstName: "John",
		lastName: "Doe"
	};

	var m = {
		"firstName": "first_name",
		"lastName": "last_name"
	};

	map(person, m); // { "first_name": "John", "last_name": "Doe" }

### mapping with a function

	function convertKey(k) {
		var m = { "x": "a", "y": "b", "z": "c" };
		return m[k];
	}

	map({"x": 1, "y": 2, "z": 3}, convertKey); // { "a": 1, "b": 2, "c": 3 }

### only mapping certain keys

In some cases, its useful to map with a function, but restrict to only specific
properties. You can pass an array of keys to include for this.

    var person = {
        first_name: "John",
        last_name: "Doe",
        password: "a"
    }

    function convertKey(k) {
        return k.toUpperCase().replace("_", "");
    }

    map(person, convertKey, ["first_name", "last_name"]); // { "FIRSTNAME":
    "John", "LASTNAME": "Doe" }

