/**
 * User
 * @desc: user 
 * @version: 1.0
 */
;(function(W, S){
	
	/************************************************* Define ***************************************************/
	function User(){}
	User.prototype = {
		constructor: User
	};
	User.prototype.getUserInfo = function(key){
		if (!this.userInfo) {
			var storageKey = key ? key : userInfoStorageKey;
			this.userInfo = S.get(storageKey);
		}
		return this.userInfo;
	};
	User.prototype.getAccessTicket = function(key){
//		if (!this.accessTicket) {
//			var storageKey = key ? key : accessTicketStorageKey;
//			this.accessTicket = S.get(storageKey);
//		}
		var storageKey = key ? key : accessTicketStorageKey;
		this.accessTicket = S.get(storageKey);
		return this.accessTicket;
	};
	User.prototype.getUserId = function(key) {
//		if (!this.userId) {
//			var storageKey = key ? key : userIdStorageKey;
//			this.userId = S.get(storageKey);
//		}
		var storageKey = key ? key : userIdStorageKey;
		this.userId = S.get(storageKey);
		return this.userId;
	};
	User.prototype.setUserInfo = function(userInfo, key, expire) {
		this.userInfo = userInfo;
		var storageKey = key ? key : userInfoStorageKey;
		var storageExpire = expire ? expire : defaultSystemStorageExpire;
		S.set(storageKey, userInfo, storageExpire);
	};
	User.prototype.setAccessTicket = function(accessTicket, key, expire) {
		this.accessTicket = accessTicket;
		var storageKey = key ? key : accessTicketStorageKey;
		var storageExpire = expire ? expire : defaultSystemStorageExpire;
		S.set(storageKey, accessTicket, storageExpire);
	};
	User.prototype.setUserId = function(userId, key, expire) {
		this.userId= userId;
		var storageKey = key ? key : userIdStorageKey;
		var storageExpire = expire ? expire : defaultSystemStorageExpire;
		S.set(storageKey, userId, storageExpire);
	};
	User.prototype.logout = function() {
		this.userInfo = undefined;
		this.accessTicket = undefined;
		this.userId = undefined;
		S.remove(userInfoStorageKey);
		S.remove(accessTicketStorageKey);
		S.remove(userIdStorageKey);
	};
	
	/************************************************* Setting ***************************************************/
	var userInfoStorageKey = 'dc.storage.userifno.key';
	var accessTicketStorageKey = 'dc.storage.accessticket.key';
	var userIdStorageKey = 'dc.storage.userid.key';
	var defaultSystemStorageExpire = 30*60; // 30min
	/************************************************* Setting ***************************************************/
	
	W.User = new User();
	
})(window, window.Storage)