/**
 * Url
 * @desc: use for build back-end system`s service url
 * @version: 1.0
 */
;(function(W) {

	/************************************************* Define ***************************************************/
	function Path(addr) { // path class
		this.addr = addr;
	}
	Path.prototype = {
		constructor: Path
	};
	
	/**
	 * Service 
	 * @desc: use for define each service
	 * @param {Object} serviceName: service`s name
	 * @param {Object} interfaces : service`s interfaces
	 */
	function Service(serviceName, interfaces) { // service class
		Path.call(this, serviceName);
		var size = interfaces.length;
		for (var i = 0; i < size; i++) {
			this[interfaces[i]] = _join(this.addr, '/service/', interfaces[i]);
		}
	}
	Service.prototype.setEnviroment = function(env){
		for (var pro in this) {
			if (pro !== 'addr') {
				this[pro] = _join(env, '/', this[pro]);
			} else {
				delete this[pro];
			}
		}
		delete this['setEnviroment'];
	};
	
	/************************************************* Util funcation ***************************************************/
	function _join() {
		var r = '';
		for (var a in arguments) {
			r += arguments[a];
		}
		return r;
	}
	
	function _url(env, applications) {
		for (var app in applications) {
			applications[app].setEnviroment(env);
		}
		return applications;
	}
	
	/************************************************* Setting ***************************************************/
	/******sso接口调用*****/
	var 
		env = 'http://dev.zaichengdu.com',
		applications = {
			sso: new Service('sso', [ 'CW9010','CW9011','CW9006'])
		},
		
		Url = _url(env, applications);
	/************************************************* Setting ***************************************************/

	W.Url = Url;
	
	var 
	portal = 'http://dev.zaichengdu.com',
	Portal_applications = {
		portal: new Service('cd_portal', ['CW9006'])
	},
	
	Portal_Url = _url(env, Portal_applications);

	W.Portal_Url = Portal_Url;

})(window);


/**
 * Info
 * @desc: use for setting base info
 * @version: 1.0
 */
;(function(W){
	
	/************************************************* Setting ***************************************************/
	var 

		appid_ = 'BAS5-520100-0001',
	
		appkey_ = '02e45ae192526ce470d8352e7403134a92526ce470d8352e',
		
		siteid_ = '520100',
	/************************************************* Setting ***************************************************/
	
		Info = {
			appid: appid_,
			appkey: appkey_,
			siteid: siteid_
		};
	
	W.Info = Info;
	
})(window)

