/**
 * Message
 * @desc: for dynamic use some message view ctrl
 * @version: 1.0
 */
;(function(W, $, B){
	
	B.addCssLink('https://a.alipayobjects.com/amui/dpl/8.5/??icon/message.css,widget/message.css,widget/toast.css,widget/dialog.css,widget/top-notice.css');
	
	/************************************************* Define ***************************************************/
	function MsgCtrl(mark, duration) { // msgCtrl class
		this.id = mark + new Date().getTime();
		this.duration = duration || 2000;
	}
	MsgCtrl.prototype = {
		constructor: MsgCtrl
	};
	MsgCtrl.prototype.appear = function(){ // appear means auto disappear
		$('body').append(this.html);
		var this_ = $('#'+this.id);
		W.setTimeout(function(){
			this_.fadeOut(function(){
				this_.remove();
			});
		}, this.duration);
	};
	
	/**
	 * Tip
	 * use for tip message
	 * @param {Number} duration
	 * @param {String} type: success | error | warn | info | question | wait
	 * @param {String} msg
	 * @param {String} subMsg
	 */
	function Tip(obj) { // tip class
		MsgCtrl.call(this, 'tip_', obj.duration);
		this.html = '<div class="am-message" id="'+ this.id +'">'
			+'<div class="am-message-icon am-icon" am-mode="message-' + (obj.type || 'success') + '"></div>'
			+'<div class="am-message-main">'+ obj.msg +'</div>'
			+ (obj.subMsg ? ('<div class="am-message-sub">' + obj.subMsg + '</div>') : '')
			+'</div>';
	}
	Tip.prototype = new MsgCtrl();
	
	/**
	 * Toast
	 * use for toast message
	 * @param {Number} duration
	 * @param {String} type: loading | success | fail
	 * @param {String} msg:
	 */
	function Toast(obj) { // toast class
		MsgCtrl.call(this, 'toast_', obj.duration);
		this.html = '<div class="am-toast" id="'+ this.id +'">'
				+'<div class="am-toast-text">'
				+ (obj.type ? ('<span class="am-toast-icon am-icon" am-mode="toast-'+ obj.type +'"></span>') : '')
				+ obj.msg 
				+'</div>';
		if (obj.type === 'loading') {
			delete this['appear'];
		} else {
			delete this['show'];
			delete this['hideForSuccess'];
			delete this['hideForFail'];
		}
	}
	Toast.prototype = new MsgCtrl();
	Toast.prototype.show = function() {
		$('body').append(this.html);
		return this;
	};
	Toast.prototype.hide = function(callbackFn) {
		$('#'+this.id).remove();
		callbackFn && callbackFn();
	};
	Toast.prototype.hideForSuccess = function(msg) {
		var this_ = $('#'+this.id),
			callbackFn,
			duration;
		if (typeof arguments[1] === 'function'){
			callbackFn = arguments[1];
		} else {
			duration = arguments[1];
		}
		this_.html('<div class="am-toast-text"><span class="am-toast-icon am-icon" am-mode="toast-success"></span>'+ msg +'</div>');
		W.setTimeout(function(){
			this_.fadeOut(function(){
				this_.remove();
				callbackFn && callbackFn();
			});
		}, duration || 1000);
	};
	Toast.prototype.hideForFail = function(msg) {
		var this_ = $('#'+this.id),
			callbackFn,
			duration;
		if (typeof arguments[1] === 'function'){
			callbackFn = arguments[1];
		} else {
			duration = arguments[1];
		}
		this_.html('<div class="am-toast-text"><span class="am-toast-icon am-icon" am-mode="toast-fail"></span>'+ msg +'</div>');
		W.setTimeout(function(){
			this_.fadeOut(function(){
				this_.remove();
				callbackFn && callbackFn();
			});
		}, duration || 2000);
	};
	
	/**
	 * Dialog
	 * use for tip message
	 * @param {String} title
	 * @param {String} content
	 * @param {Boolean} oneBtn: if set only on button, must be confirm button
	 * @param {Function} confirmFn: confirm function
	 * @param {Function} cancelFn: cancel function
	 */
	function Dialog(obj){
		MsgCtrl.call(this, 'dialog_');
		this.html = '<div style="width:100%;height:100%;position: absolute;left: 0;top: 0;background:gray;opacity:0.80;"><div class="am-dialog" id="'+ this.id +'" am-mode="show"><div class="am-dialog-wrap">'
		+ (obj.title ? ('<div class="am-dialog-header"><h3>'+ obj.title +'</h3></div>') : '')
		+ (obj.content ? ('<div class="am-dialog-body"><p class="am-dialog-brief">'+ obj.content +'</p></div>') : '')
		+ (obj.oneBtn ? ('<div class="am-dialog-footer"><button type="button" class="am-dialog-button" id="confirm_'+ this.id +'">确定</button></div>') : ('<div class="am-dialog-footer"><button type="button" class="am-dialog-button" id="cancel_'+ this.id +'">取消</button><button type="button" class="am-dialog-button" id="confirm_'+ this.id +'">确定</button></div>'))
		+ '</div></div></div>';
		this.oneBtn = obj.oneBtn;
		this.confirmFn = obj.confirmFn;
		this.cancelFn = obj.cancelFn
	}
	Dialog.prototype = {
		constructor: Dialog
	};
	Dialog.prototype.hide = function(){
		$('#'+this.id).remove();
	};
	Dialog.prototype.show = function(){
		$('body').append(this.html);
		var this_ = this;
		$('#confirm_' + this_.id).on('click', function(){
			this_.confirmFn && this_.confirmFn();
			this_.hide();
		});
		if (!this_.oneBtn) {
			$('#cancel_' + this_.id).on('click', function(){
				this_.cancelFn && this_.cancelFn();
				this_.hide();
			});
		}
		
		return this;
	};
	
	/**
	 * Notice
	 * use for notice message
	 * @param {String} content
	 * @param {Boolean} isCloseOperation
	 * @param {Boolean} isGoOperation
	 * @param {Function} closeFn
	 * @param {Function} goFn
	 */
	function Notice(obj){
		MsgCtrl.call(this, 'notice_');
		this.html = '<div class="am-top-notice" id="'+ this.id +'" '+ (!obj.isCloseOperation && 'am-mode="normal"') +'>' 
		+ '<div class="am-top-notice-content">'+ obj.content +'</div>';
		if (obj.isCloseOperation) {
			this.html += ('<div id="notice_close_'+ this.id +'" class="am-top-notice-operation"><a class="am-top-notice-close" href="#">&times;</a></div>');
		} else if(obj.isGoOperation) {
			this.html += ('<div id="notice_go_'+ this.id +'" class="am-top-notice-operation"><a class="am-top-notice-go" href="#"></a></div>');
		}
		this.html += '</div>';
		this.isCloseOperation = obj.isCloseOperation;
		this.isGoOperation = obj.isGoOperation;
		this.closeFn = obj.closeFn;
		this.goFn = obj.goFn;
	}
	Notice.prototype = new MsgCtrl();
	Notice.prototype.hide = function(callbackFn){
		var this_ = $('#'+this.id);
		this_.fadeOut(function(){
			this_.remove();
			callbackFn && callbackFn();
		});
	};
	Notice.prototype.show = function(holder) {
		var this_ = this;
		$(holder ? holder : 'body').append(this_.html);
		if (this_.isCloseOperation) {
			$('#notice_close_' + this_.id).on('click', function(){
				this_.hide(this_.closeFn);
			});
		} else if (this_.isGoOperation) {
			$('#notice_go_' + this_.id).on('click', function(){
				this_.goFn && this_.goFn();
			});
		}
		
		return this;
	};
	
	var Message = {
		tip: function(obj){
			return new Tip(obj);
		},
		dialog: function(obj){
			return new Dialog(obj);
		},
		toast: {
			appear : function(msg){
				return new Toast({msg: msg}).appear();
			},
			loading: function(){ // loading only have show, hideForSuccess, hideForFail
				return new Toast({type: 'loading', msg: '加载中'});
			},
			success: function(msg, duration) { // success only have appear
				return new Toast({type: 'success', msg: msg, duration: duration});
			},
			fail: function(msg, duration) {  // fail only have appear
				return new Toast({type: 'fail', msg: msg, duration: duration});
			}
		},
		notice: function(obj){
			return new Notice(obj);
		}
	};
	
	W.Message = Message;
	
})(window, window.jQuery, window.Base)