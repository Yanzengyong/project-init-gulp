/**
 * Storage
 * @desc: storage module
 * @version: 1.0
 */
;
(function(W, $, B) {

	/************************************************* Define ***************************************************/
	/**
	 * Storage
	 * @desc: storage for save some data
	 */
	function Storage() {
		if (W.localStorage) {
			try {
				this.ls = W.localStorage;
				this.ls.setItem('dc.storage.test.key', '');
				this.ls.removeItem('dc.storage.test.key');
				this.isLocalStorage = true;
			} catch (e) {}
		}
	}
	Storage.prototype = {
		constructor: Storage
	};
	Storage.prototype.get = function(key,reset) {
//		if (this.isLocalStorage) {
//			var value = this.ls.getItem(key);
//			if(value){
//				if(reset == true){
//					_findExpireValue(this.ls, key, value,reset);
//				}
//				return value;
//			}else{
//				return undefined;
//			}
//		}
//		return undefined;
		
		if (this.isLocalStorage) {
			var value = this.ls.getItem(key);
			return value ? _findExpireValue(this.ls, key, value,reset) : undefined;
		}
		return undefined;
	};
	Storage.prototype.set = function(key, value, expire) {
		if (this.isLocalStorage) {
			this.remove(key);
			expire && _addExpireValue(this.ls, key, expire);
			return _setValue(this.ls, key, value);
		}
		return false;
	};
	Storage.prototype.pop = function(key) {
		var value;
		if (this.isLocalStorage) {
			value = this.ls.getItem(key);
			value = value ? _findExpireValue(this.ls, key, value) : undefined;
			if (value) {
				_delExpireValue(this.ls, key);
				this.ls.removeItem(key);
			}
		}
		return value;
	}
	Storage.prototype.remove = function(key) {
		if (this.isLocalStorage) {
			_delExpireValue(this.ls, key);
			this.ls.removeItem(key);
			return true;
		}
		return false;
	};
	Storage.prototype.clear = function() {
//		if (this.isLocalStorage) {
//			this.ls.clear();
//			return true;
//		}
//		return false;
		return true;
	}

	/************************************************* Util funcation ***************************************************/

	var expireValueKeySuffix = '__expire';

	function _addExpireValue(ls, key, expire) {
		if (Object.prototype.toString.apply(expire) === '[object Number]') {
			var expireObj = {};
			expireObj.deadline = ((+new Date()) + expire * 1000);
			expireObj.expire = expire;
	
			ls.removeItem(key + expireValueKeySuffix);
			ls.setItem(key + expireValueKeySuffix, B.toJson(expireObj));
		}
	}
	
	function _modExpireValue(ls, key) {
		var expireObj = ls.getItem(key + expireValueKeySuffix);
		if (!expireObj) {
			return;
		}
		
		expireObj = B.fromJson(expireObj);
		expireObj.deadline = ((+new Date()) + expireObj.expire * 1000);
		
		ls.removeItem(key + expireValueKeySuffix);
		ls.setItem(key + expireValueKeySuffix, B.toJson(expireObj));
	}

	function _delExpireValue(ls, key) {
		ls.removeItem(key + expireValueKeySuffix);
	}

	function _isExpire(ls, key) {
		var expireObj = ls.getItem(key + expireValueKeySuffix);
		if (!expireObj) {
			return false;
		}

		expireObj = B.fromJson(expireObj);
		var expired = Number(expireObj.deadline) - (+new Date()) < 0;
		if (expired) { // if expired

			_delExpireValue(ls, key);
		}
		return expired;
	}

	function _findExpireValue(ls, key, value,reset) {
		if (_isExpire(ls, key)) {
			ls.removeItem(key);
			return undefined;
		}
		
		if(reset == true){
			_modExpireValue(ls, key);
		}
			
		if (((value.charAt(0) === '{') && (value.charAt(value.length - 1) === '}')) || ((value.charAt(0) === '[') && (value.charAt(value.length - 1) === ']'))) {
			return B.fromJson(value);
		}
		return value;
	}

	function _setValue(ls, key, value) {
		try {
			var string_ = Object.prototype.toString.apply(value);
			if (string_ === '[object Object]' || string_ === '[object Array]') {
				 value = B.toJson(value);
			}
			
			ls.setItem(key, value);
			return true;
		} catch (e) {
			return false;
		}
	}

	W.Storage = new Storage();
	
})(window, window.jQuery, window.Base)