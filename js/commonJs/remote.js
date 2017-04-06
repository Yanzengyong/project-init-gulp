/**
 * Remote
 * @desc: use for send http request
 * @version: 1.0
 */
;(function(W, $, B, M, U) {
	
	/************************************************* Define ***************************************************/
	/**
	 * Remote
	 * @desc: use for call http
	 * @param {Object} isLoginUser: is this interface must use login-user
	 * @param {Object} closeLoading: to close the Loading
	 */
	function Remote(isLoginUser, closeLoading) {
		this.isLoginUser = isLoginUser;
		this.closeLoading = closeLoading;
	}
	Remote.prototype = {
		constructor: Remote
	};
	Remote.prototype.url = function(arguments) {
		if(typeof arguments[0] == 'string') {
			this.requestUrl = arguments[0];
		} else {
			throw new Error('wrong Remote#url call, please check your pass param. Only can pass string!');
		}
		
		return this;
	};
	Remote.prototype.map = function() {
		if(arguments.length === 1 && arguments[0] && (typeof arguments[0] === 'object')) {
			this.param = $.extend(true, this.param || {}, arguments[0]);
		} else if (arguments.length === 2 && (typeof arguments[0] === 'string')) {
			var tempObj = this.param || {};
			tempObj[arguments[0]] = arguments[1];
			this.param = tempObj;
		} else {
			throw new Error('wrong Remote#map call, please check your pass param. Only can pass map object or key, value!');
		}
		
		return this;
	};
	Remote.prototype.done = function(successFn, failFn) {
		var this_ = this,
			loading = this_.closeLoading ;
		
		if (!W.navigator.onLine) {
			return (!this.closeLoading && loading.hideForFail('您当前网络离线'));
		}
		$.ajax({
			type: 'POST',
			url: this.requestUrl,
			data: _packageParam(this),
			contentType: 'application/json; charset=UTF-8',
			dataType: 'json',
			success: function(returnData) {
				if (returnData.head.rtnCode === '000000') {
					!this_.closeLoading && loading.hide();
				} else {
					!this_.closeLoading && loading.hideForFail(returnData.head.rtnMsg);
				}
				successFn && successFn.call(this_, returnData);
			},
			error: function(xhr, status, e) {
				alert('您当前网络不稳定，请稍后再试');
			}
		});
		
		return this;
	};
	Remote.prototype.doneSuccess = function(successFn, failFn) {
		var this_ = this,
			loading = this_.closeLoading || M.toast.loading().show();
		
		if (!W.navigator.onLine) {
			return (!this.closeLoading && loading.hideForFail('您当前网络离线'));
		}
		
		$.ajax({
			type: 'POST',
			url: this.requestUrl,
			data: _packageParam(this),
			contentType: 'application/json; charset=UTF-8',
			dataType: 'json',
			success: function(returnData) {
				successFn && successFn.call(this_, returnData, loading);
			},
			error: function(xhr, status, e) {
				!this_.closeLoading && loading.hideForFail('您当前网络不稳定，请稍后再试', function(){
					failFn && failFn.call(this_, xhr, status, e);
				});
			}
		});
		
		return this;
	};
	
	/************************************************* Util funcation ***************************************************/
	function _packageParam(remote) {
		remote.param = remote.param || {};
		var package_ = {
			head: {
				siteid: Info.siteid,
				appid: Info.appid,
				sign: B.encrypt(Info.appkey, B.toMd5(B.toBase64(Info.appid + B.toJson(remote.param)))),
				version: "2.0"
			},
			body: remote.param
		}
		if (remote.isLoginUser) {
			package_.head.accessTicket = _getAccessTicket();
		}
		return B.toJson(package_);
	}
	Remote.prototype.packageParamBase = function _packageParamBase(param) {

		var package_ = {
			head: {
				siteid: Info.siteid,
				appid: Info.appid,
				sign: B.encrypt(Info.appkey, B.toMd5(B.toBase64(Info.appid + B.toJson(param)))),
				version: "2.0"
			},
			body: param
		}

		return B.toJson(package_);
	};
	function _getAccessTicket() {
		var accesssTicket_ = U.getAccessTicket();
		return accesssTicket_;
	}

	W.Remote = Remote;

})(window, window.jQuery, window.Base, window.Message, window.User);