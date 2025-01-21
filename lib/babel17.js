'use strict';
/**
 * Class Babel17 (translator)
 * cf https://github.com/i18next/i18next-browser-languageDetector/blob/master/src/browserLookups/navigator.js
 * cf https://airbnb.io/polyglot.js/polyglot.html
 * cf https://jsfiddle.net/6bpxsgd4 (pluriels)
 * à améliorer (pluriel breton ...)
 */

function Babel17(options) {
	const opts = options == null ? {} : options;
	const rtl = opts.rtl || ['ar', 'ur', 'fa', 'he', 'az', 'dv'];
	const defPluralRules = {
		a: function(n) {
      if (n < 3) { return ['zero','one','two'][n]; }
      if (n === 100) return 'other';
      const lastTwo = n % 100;
      if (lastTwo >= 3 && lastTwo <= 10) return 'few';
      return 'many';
		},
		c: function() {
      return 'other';
		},
		cz: function(n) {
			if (n === 1) { return 'one'; }
			if (n >= 2 && n<=4) { return 'few'; }
			return 'other';
		},
		f: function(n) {
			if (n < 2) { return 'one'; }
			return 'other';
		},
		g: function(n) {
			if (n === 1) { return 'one'; }
			return 'other';
		},
		i: function(n) {
			if (n % 10 === 1) { return 'one'; }
			return 'other';
		},
		l: function(n) {
			if (n % 10 === 1 && n % 100 !== 11) { return 'one'; }
			return n % 10 >= 2 && n % 10 <= 9 && (n % 100 < 11 || n % 100 > 19) ? 'few' : 'other';
		},
		p: function(n) {
			if (n === 1) { return 'one'; }
			const end = n % 10;
			return 2 <= end && end <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 'few' : 'many';
		},
		r: function(n) {
		  const last2 = n % 100;
		  const end = last2 % 10;
		  if (last2 !== 11 && end === 1) {
		    return 'one';
		  }
		  if (2 <= end && end <= 4 && !(last2 >= 12 && last2 <= 14)) {
		    return 'few';
		  }
		  return 'other';
		},
		s: function(n) {
			const lastTwo = n % 100;
			if (lastTwo === 1) { return 'one'; }
			if (lastTwo === 2) { return 'two'; }
			if (lastTwo === 3 || lastTwo === 4) { return 'few'; }
			return 'other';
		},
		rulesOf : {
			'ar': 'a',
			'bm': 'c',
			'id': 'c',
			'ja': 'c',
			'ko': 'c',
			'lo': 'c',
			'ms': 'c',
			'th': 'c',
			'zh': 'c',
			'cs': 'cz',
			'sk': 'cz',
			'aa': 'f',
			'cu': 'f',
			'dv': 'f',
			'fr': 'f',
			'hy': 'f',
			'tl': 'f',
			'pt-br': 'f',
			'fa': 'g',
			'da': 'g',
			'de': 'g',
			'en': 'g',
			'es': 'g',
			'eu': 'g',
			'fi': 'g',
			'el': 'g',
			'he': 'g',
			'hi-IN': 'g',
			'hu': 'g',
			'it': 'g',
			'nl': 'g',
			'no': 'g',
			'pt': 'g',
			'sv': 'g',
			'tr': 'g',
			'is': 'i',
			'lt': 'l',
			'pl': 'p',
			'ru': 'r',
			'bs-Latn-BA': 'r',
			'bs-Cyrl-BA': 'r',
			'srl-RS': 'r',
			'sr-RS': 'r',
			'hr': 'r',
			'sl': 's'
		},
	};	
	const bab = this;
	bab.translations = opts.translations || {};
	bab.langVarname = opts.langVarname || 'Babel17Lang';
	bab.defaultLang = opts.defaultLang || 'en';
	bab.countKeyword = opts.countKeyword || 'count';
	bab.debug = (opts.debug !== undefined ? opts.debug : true);
	bab.pluralRules = opts.pluralRules || defPluralRules;
	bab.langs = Object.keys(bab.translations);

	// locale come from localStorage, options.locale, navigator.language, prefix of navigator.language, options.defaultLang, or 'en'
	let locale = function() {
		let l = bab.defaultLang;
		if (window.localStorage && localStorage.getItem(bab.langVarname)) {
				l = localStorage.getItem(bab.langVarname);
		} else {
				if (opts.locale && (typeof bab.translations[opts.locale] == 'object')) {
				l = opts.locale;
			}
			else {
				const nl = navigator.language.toLowerCase();
				if (typeof bab.translations[nl] == 'object') {
					l = nl;
				} else {
					const navLngPrefix = nl.split('-')[0];
					if (typeof bab.translations[navLngPrefix] == 'object') {
						l = navLngPrefix;
					}
				}
			}
		}
		return l;
	}
	bab.locale = locale();
	bab.direction = rtl.includes(this.locale) ? 'rtl' : 'ltr';
	if (!bab.translations[bab.locale])	bab.translations[bab.locale] = {};
	if (!bab.translations[bab.defaultLang])	bab.translations[bab.defaultLang] = {};

/**
 * Return the plural form for n items.
 */
	this.plural = function(n, locale) {
		if (typeof bab.pluralRules[bab.pluralRules.rulesOf[locale]] == 'function') {
			return bab.pluralRules[bab.pluralRules.rulesOf[locale]](n);
		} else {
			if (typeof bab.pluralRules[bab.pluralRules.rulesOf[locale.split('-')[0]]] == 'function') {
				return bab.pluralRules[bab.pluralRules.rulesOf[locale.split('-')[0]]](n); // fallback fr instead of fr-FR
			}
			bab.warn('Babel17.plural(' + n + ', "' + locale + '"): no plural rule.');
		}
		return 'other'; // falllback
	}

/**
 * Translate
 */
	this.t = function(txt, options) {
		if (txt === '') return '';
		let opts = (options == null ? {} : (Number.isInteger(options) ? {'count': options} : options));
		let tr = bab.translations[bab.locale][txt] || bab.translations[bab.defaultLang][txt] || txt;
		 if (tr === txt) {
			bab.warn('"' + txt + '": no translation found in ' + bab.locale + ' or ' + bab.defaultLang);
			return txt;
		}
		if (typeof tr == 'object') {
			if (Number.isInteger(opts[bab.countKeyword])) {
				tr = tr[bab.plural(opts[bab.countKeyword], bab.locale)];
				if (typeof tr === 'undefined') {
					bab.warn('Babel17.t(): no translation for ' + bab.plural(opts[bab.countKeyword], bab.locale) + ' ('+ opts[bab.countKeyword] + ') "' + txt + '" in ' + bab.locale);
					if (bab.translations[bab.defaultLang][txt]) {
						tr = bab.translations[bab.defaultLang][txt][bab.plural(opts[bab.countKeyword], bab.defaultLang)]; // fallback
					} else {
						bab.warn('Babel17.t(): no fallback translation for ' + bab.plural(opts[bab.countKeyword], bab.defaultLang) + ' ('+ opts[bab.countKeyword] + ') "' + txt + '" in ' + bab.defaultLang);
						tr = txt; // ultimate fallback
					}
				}
			}
		}
		for (const opt in opts) {
			tr = tr.replaceAll('#' + opt, opts[opt]);
		}
		return tr;
	}

	this.warn = function(msg) {
		if (bab.debug) console.warn((typeof bab.debug == 'string' ? bab.debug + ' ' : '') + msg);
	}
}
