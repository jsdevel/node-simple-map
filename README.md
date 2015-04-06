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

**FYI** - *[repattern](https://github.com/wilcosprey/repattern)* is a nice complement to *simple-map*

	var map = require('simple-map');
	var repattern = require('repattern');

	var columnCase = repattern.make('cam$_');
	map({'firstName': 'John', 'lastName': 'Doe'}, columnCase); // {'first_name': 'John', 'last_name': 'Doe'}	

### only mapping certain keys

In some cases, its useful to map with a function, but restrict to only specific properties. You can pass an array of keys to include for this.

    var person = {
        first_name: "John",
        last_name: "Doe",
        password: "a"
    }

    function convertKey(k) {
        return k.toUpperCase().replace("_", "");
    }

    map(person, convertKey, ["first_name", "last_name"]); // { "FIRSTNAME": "John", "LASTNAME": "Doe" }

### map.make

`map.make` is super useful. It creates a curried function with an enclosed map and include list. You can use this with array#map to map objects within a collection.

	var peopleRecords = [{"first_name": "John", "last_name": "Doe", "password", "a"}];
	var personMapper = map.make(convertKey, ['first_name', 'last_name']);
	var dtos = peopleRecords.map(personMapper);

### install

	npm install simple-map

### use

	var map = require('simple-map');



