function map(obj, kmap) {
	var ret = {};
	if ( typeof(kmap) === 'function' ) {
		for( var p in obj ) {
			var k = kmap(p);
			if (k === null) {
				ret[p] = null;
			} else if(k !== undefined) {
				ret[k] = obj[p];	
			}
		}
	} else {
		for ( var k in kmap ) {
			ret[kmap[k]] = obj[k] || null;
		}
	}
	return ret;
}

module.exports = map;