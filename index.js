function noop(k) {
	return k;
}

function map(obj, kmap, include) {
	kmap = kmap || noop;
	var ret = {};
	var including = !!include && include.constructor === Array;
	if ( typeof(kmap) === 'function' ) {
		for( var p in obj ) {
			if(!including || include.indexOf(p) > -1) {
				var k = kmap(p);
				if (k === null) {
					ret[p] = null;
				} else if(k !== undefined) {
					ret[k] = obj[p];	
				}				
			}
		}
	} else {
		for ( var k in kmap ) {
			if(!including || include.indexOf(k) > -1) {
				ret[kmap[k]] = obj[k] || null;	
			}			
		}
	}
	return ret;
}

map.make = function(converter, include) {
	return function(target) {
		return map(target, converter, include);
	};
};

module.exports = map;