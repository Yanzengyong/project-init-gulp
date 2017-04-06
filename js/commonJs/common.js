//add by mzsx 20140327
//-----------------------------------------XSS----------------------------------------------------------
	function htmlEncode (str){
		var s = "";
		if (str.length == 0) return "";
		//s = str.replace(/ /g, " ");
		//s = str.replace(/&/g, "&");
		s = str.replace(/</g, "&lt;");
		s=s.replace(/%3C/g,"&lt;");
		s=s.replace(/%3c/g,"&lt;");
		s = s.replace(/>/g, ">");
		s = s.replace(/%3E/g, ">");
		s = s.replace(/%3e/g, ">");
		//s = s.replace(/\'/g, "'");
		//s = s.replace(/\"/g, """);
		//s = s.replace(/\n/g, "<br>");
		return s;
	}
	function htmlEncode1 (str){
		var s = "";
		if (str.length == 0) return "";
		//s = str.replace(/ /g, " ");
		//s = str.replace(/&/g, "&");
		s = str.replace(/</g, "%26lt%3B");
		s=s.replace(/%3C/g,"%26lt%3B");
		s=s.replace(/%3c/g,"%26lt%3B");
		s = s.replace(/>/g, "%26gt%3B");
		s = s.replace(/%3E/g, "%26gt%3B");
		s = s.replace(/%3e/g, "%26gt%3B");
		//s = s.replace(/\'/g, "'");
		//s = s.replace(/\"/g, """);
		//s = s.replace(/\n/g, "<br>");
		return s;
	}
	
	//$(document).ajaxSend(onSend);
	//ajaxSuccess
	//ajaxComplete
	//$(document).ajaxComplete(onSuccess);
	function onSend(e,xhr,o) {
		alert(JSON.stringify(o));
		o.data=dataEncode(o.data);
	};

	function onSuccess(e,xhr,o){
		alert("onSuccess:"+JSON.stringify(o));
		o.data=dataEncode(o.data);
	};

	function dataEncode(data){
		var rel=data;
		var source="";
		if(typeof(rel) == "object"){
			source=htmlEncode1(JSON.stringify(rel));
			source=JSON.parse(source);
			rel=source;
		}else if(typeof(rel) == "string"){
			source=htmlEncode1(rel);
			rel=source;
		}
		return rel;
	};

	



	

   //add by liyang 20070801
	function KeyDown(value)
    {
        if (event.keyCode == 13)
        {
			var bz = /^\d{1,3}$/.test(value);
			if(!bz){
				alert("输入有误");
				return false;
			}
            event.returnValue=false;
            event.cancel = true;
            go_general_query('resultlist');
        }
		return false;
    }
    function namespace(){
		var a=arguments, o=null, i, j, d, rt;
		for (i=0; i<a.length; ++i) {
			d=a[i].split(".");
			rt=d[0];
			eval('if(typeof '+rt+'=="undefined"){'+rt+'={};}o='+rt+';');
			for(j=1;j<d.length; ++j){
				o[d[j]]=o[d[j]] || {};
				o=o[d[j]];
				}
			}
		}
    function connectWebViewJavascriptBridge(callback) {
		if (window.WebViewJavascriptBridge) {
			callback(WebViewJavascriptBridge)
		} else {
			document.addEventListener('WebViewJavascriptBridgeReady', function() {
				callback(WebViewJavascriptBridge)
			}, false)
		}
	}
function ajaxJsonCall(url, data, callback) {
		data=dataEncode(data);
	
	$.ajax({
    	url:  url,
    	//contentType: "application/x-www-form-urlencoded;charset=utf-8",
    	data: data,
    	type: "POST",
    	dataType: "json",
    	error:function(msg){msg.rtnCode='999999';msg.rtnMsg='发生未知异常';callback(msg)},
    	success:function(data){ var data=dataEncode(data);

    	callback(data)}
    });
    /*data = replacechar(data);	
    $.post(app_path + '/' + url, data, callback, 'json');*/
}
function ajaxJsonCallNew(url, data, callback) {
	data=dataEncode(data);
	$.ajax({
    	url: portal_path + '/' + url,
    	//contentType: "application/x-www-form-urlencoded;charset=utf-8",
    	data: data,
    	type: "POST",
    	dataType: "json",
    	error:function(msg){msg.rtnCode='999999';msg.rtnMsg='发生未知异常';callback(msg)},
    	success: function(data){
    	if(data.rtnCode == "310001"){
    		connectWebViewJavascriptBridge(function(bridge) {
				bridge.callHandler('handleError', {'rtnCode':data.rtnCode,'rtnMsg':data.rtnMsg }, null)
				
			})
		}
    	callback(data)}
    });
    /*data = replacechar(data);
    $.post(portal_path + '/' + url, data, callback, 'json');*/
}	
    
	//删除displaytag的 span标签
	function deletespan(){
        var spanarray = document.getElementsByTagName("span");
        for (var i=0; i<spanarray.length; i++){
	        var spanclass = spanarray[i].getAttributeNode("class").nodeValue;
	        if (spanclass=="pagebanner"||spanclass=="pagelinks"||spanclass=="pagebanner"){
		        spanarray[i].innerText="";
	        }
        }
    }
	//add by liyang 20070801

function ajaxcall(url, data, callback) {
	data=dataEncode(data);
	$.ajax({
    	url: app_path + '/ajax/' + url,
    	//contentType: "application/x-www-form-urlencoded;charset=utf-8",
    	data: data,
    	type: "POST",
    	dataType: "json",
    	error:function(msg){msg.rtnConde='999999';msg.rtnMsg='发生未知异常';callback(msg)},
    	success: callback
    });
    /*$.post(app_path + '/ajax/' + url, data, callback, 'json');*/
/*    $.ajax({
    	url: app_path + '/work/ajax/card/' + url,
    	contentType: "application/x-www-form-urlencoded;charset=utf-8",
    	data: data,
    	type: "POST",
    	dataType: "json",
    	success: callback
    });
*/
}

function ajaxJsonCallCommon(url, data, callback) {
	data=dataEncode(data);
	$.ajax({
    	url: common_path + '/' + url,
    	//contentType: "application/x-www-form-urlencoded;charset=utf-8",
    	data: data,
    	type: "POST",
    	dataType: "json",
    	error:function(msg){msg.rtnCode='999999';msg.rtnMsg='发生未知异常';callback(msg)},
    	success: callback
    });
	
    /*data = replacechar(data);
    $.post(common_path + '/' + url, data, callback, 'json');*/
}



	function formSerializer(form)
	{
		var myform = $(form);
		var val = "";
		var sendData = "";
		for (i=0;i<myform.elements.length;i++)
		{
			element = myform.elements[i]
			if(element.type && (element.type=="radio" || element.type=="checkbox"))
			{
				if(element.checked)
				{
					sendData += element.name + "=" + element.value + "&";
				}
			}
			else
			{
				val = element.value;
				//if (element.type=="textarea"||element.type=="text")
				if (element.type=="textarea"||element.type=="text"||element.type=="hidden")
				{
				    val = encodeURI(val);
					//val = escape(val);
				}

				sendData += element.name + "=" + val + "&";
			}
		}
		return sendData;
	}
//----------------------------------------------------------------------------------------------------//
	function loadXMLDoc2Div(url,div,params){
		if(!params)params="";
		var updater = new Ajax.Request(url, {asynchronous: false,evalScripts:true,method: 'post', parameters: params});
		var text = updater.transport.responseText;
		$(div).innerHTML = text;;
		text.evalScripts();
	}

	function submitXMLDoc2Div(myform,url,div){
		if(undefined==div){
			div = "resultlist";
		}
		var params = formSerializer($(myform));
		var updater = new Ajax.Request(url, {asynchronous: false,evalScripts:true,contentType:'application/x-www-form-urlencoded;charset=utf-8',method: 'post', parameters: params});

		var text = updater.transport.responseText;

		$(div).innerHTML = text;
		text.evalScripts();
		//add by liyang
		deletespan();
		//add by liyang
	}
//----------------------------------------------------------------------------------------------------//
	

	function initRadio(elementID,dictionary,condition,value,styleValue,others){
		var list = queryDictList(elementID,dictionary,condition,value);
		var defaultvalue = value;
		var element = $(elementID);
		if(element.value!=""){
			defaultvalue = element.value;
		}
		if(element.validator){
			op.validator=element.validator;
		}
		p = element.parentNode;
		var sText = "";
		for(var i=0; i<list.length/2; i++){
			var radioValue = list[2*i];
			var radionName = list[2*i+1];
		 	var strOption ="<input type=\"radio\" class='cjb_textfield' style='" + styleValue +"'" + others + " id=\"" + elementID + "\" name=\"" + elementID + "\" value=\"" + radioValue + "\"/>"
		 	var strOption2 = "<label>"+radionName+"</label>";
		 	//alert(strOption+strOption2)
		 	var op=document.createElement(strOption);
		 	//var op2=document.createElement(strOption2);
		 	p.insertBefore(op,element);
		 	op.insertAdjacentText("afterEnd",radionName);
		 	if(defaultvalue==radioValue){
		 		op.checked=true;
		 		sText=radionName;
		 	}
		}
		p.removeChild(element);
		if(page_type=="view" && element.tagName.toLowerCase()=="span"){
			element.innerText = sText;
		}
	}

	
///add 2012-04-28  end
//----------------------------------------------------------------------------------------------------//
	function removeRefreshCookie()
	{
		s = getCookie("token_cookie");
		document.cookie = "token_cookie=temp_" + s;
		pbuttonDisable();
	}

	function getCookie(s)
	{
		var arr=document.cookie.split(/[=;]/);
		for(var i=0;i<arr.length;i+=2)
		{
		      if(s==arr[i])
		      {
		             return arr[++i];
		      }
		 }
		 return "";
	}

	function submit2dialog(url)
	{
		newwin=window.open(url,"window");
		newwin.focus();
	}

	function submitForm(form)
	{
		form = form?$(form):document.forms[0];
		if(valid.validate())
		{
			initBgdiv();
			var frame = document.createElement("<iframe id='openwin' height='100%' width='100%' src='' margin='0' border='0'></iframe>");
			frame.frameBorder = "0";
			$("bgdiv").appendChild(frame);
			//alert(' submit');
			form.submit();
		}

	}

	function getKey4Validate(key)
	{
		return ($F(key) && $F(key).length>0)?$F(key):" ";
	}

	function doSubForm(key,url)
	{
		window.location.href = url + $F(key);
	}

	/* update by liyang 2008-01-29 */
	function go_general_query(position,totalpage){
	    var pageNum = document.all("go").value;

      if(!isNumber(pageNum)){
      	  alert('请输入正整数');
      	  return ;
      }

	    if(pageNum!=null&&pageNum!=""&&pageNum>0){
	        if((parseInt(totalpage))<(parseInt(pageNum))){
	        	general_query(totalpage,position,1);
	        }
	        else{
	        	general_query(pageNum-1,position,1);
	        }
	    }
	}
	/* add by liyang 2007-04-16 */
	 function isNumber(oNum){
       if(!oNum){
           return false;
       }
       var strP=/^\d+(\.\d+)?$/;
       if(!strP.test(oNum)){
           return false;
       }
       try{
           if(parseInt(oNum)!=oNum||parseInt(oNum)==0){
           return false;
       }
       }catch(ex){
           return false;
       }
       return true;
   }
//-->
//----------------------------------------------------------------------------------------------------//
/*
*/
function general_query(pageNum,position,type){
	$("pageNum").value = pageNum;
	if(type){
		if($("total_num") && parseInt($("total_num").innerText)>0){
			$("recordNum").value=$("total_num").innerText;
		}
	}else{
		$("recordNum").value = "";
	}
	if(form_validator(document.forms[0])){
		submitXMLDoc2Div(document.forms[0],app_path+'/common/generalquery_result.domain',position);
	}
}

function general_reset(formName){
	var formObj = document.forms[formName];
	if(!formObj) {
		formObj = document.forms[0]
	}
	var formEl = formObj.elements;
	for (var i=0; i<formEl.length; i++)     {
		var element = formEl[i];
		if (element.type == 'submit') { continue; }
		if (element.type == 'reset') { continue; }
		if (element.type == 'button') { continue; }
		if (element.type == 'hidden') { continue; }
		if (element.type == 'password') { element.value = '';  }
		if (element.type == 'text') { element.value = ''; }
		if (element.type == 'textarea') { element.value = ''; }
		if (element.type == 'checkbox') { element.checked = false; }
		if (element.type == 'radio') { element.checked = false; }
		if (element.type == 'select-multiple') { element.selectedIndex = 0; }
		if (element.type == 'select-one') { element.selectedIndex = 0; }
	}
}


function focusEnterToNextFocus(){
	if(event.keyCode==13){
		event.keyCode=9;
		event.returnValue=true;
		return false;
	}
	return false;
}

/*
*/
function form_validator(form){
	var i;
	for (i=0;i<form.elements.length;i++){//
		if (form.elements[i].type=="text" && form.elements[i].value!="" && form.elements[i].datatype){
			if(form.elements[i].datatype=="number" && isNaN(form.elements[i].value)){
				showMessage(form.elements[i],"???????");
				return false;
			}
		}
	}
	return true;
}

function showMessage(field,message)
{
	field.focus();
	field.select();
	showAlert(getElementTitle(field) + message,field);
}
function getElementTitle(elm)
{
	var s = "";
	try
	{
		if(elm.length && elm.length>0 && elm[0].tagName=="INPUT")elm = elm[0];
		s = elm.parentNode.previousSibling.innerText;
		if(s.charAt(s.length-1)=="*")s = s.substring(0,s.length-1);
	}catch(e){}
	return s;
}
function SelectDMTree(kjmc,inputKey,inputName)
{
	var htmlurl = app_path + "/public/dictionary/dictionaryTreeOrList.domain?method=treeOrList&XT_TYKJ_KJMC="+kjmc+"&inputKey="+inputKey+"&inputName="+inputName;
	newwin=window.open(htmlurl,"homeWin","toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=yes,resizable=yes,width=580,height=480,left=250,top=150");
	newwin.focus();

	return false;
}

function inputDisable(fields)
{
	var arr = fields.split(/[,]/);
	for(var i=0;i<arr.length;i++)
	{
		var element = document.all(arr[i]);
		try
		{
			if(element.type=="hidden")
			{
				element = document.all('c_' + element.name);//checkbox
				if(!element.length)
				{
					message("ALERT",arr[i] + "is hidden, you are crazy");
				}
			}
		}
		catch(e){}
		if(element.tagName && element.tagName.toUpperCase()=="SELECT")  //select
		{
			if(!element.origin)
			{
				element.origin = element.value;
			}
			element.onchange = reValueCheck;
			element.className = "disable";
			element.onselectstart=returnFalse;
			element.onclick=returnFalse;
		}
		else if(element.type && element.type.toLowerCase()=="checkbox")//checkbox
		{
			element.onclick = reValueCheck;
		}
		else if(element.length && element.length>1) //radio and checkbox
		{
			for(var j=0; j<element.length; j++)
			{
				element[j].origin = element[j].checked;
				element[j].onclick = reValueCheck;
			}
		}
		else
		{
			try
			{
				element.readOnly = true;
				element.style.bgcolor="#E3EFF8";
				element.style.color="gray";
				element.onblur = returnFalse;
				element.onselectstart=returnFalse;
				try
				{
					if(element.nextSibling.outerHTML.indexOf("DateInputInner_onclick")>0)
					{
						element.parentNode.removeChild(element.nextSibling);
					}
				}
				catch(e){}
			}
			catch(e){}
		}
	}
}

function returnFalse()
{
	return false;
}

function getSelectText(element)
{
	element = $(element)
	var text = element.options[element.selectedIndex].text;
	if(element.selectedIndex==0 && element.value=="")
	{
		text = "";
	}
	return text;
}

	function elementSpy(element,value)
	{
		try
		{
			$("v_" + element.name).value = value;
		}
		catch(e){}
	}

function input2text(fields)
{
	var arr = fields.split(/[,]/);
	var n = 0;
	var a = new Array();
	for(var i=0;i<arr.length;i++)
	{
		try
		{
			var element = $(arr[i]);
			try
			{
				//try dictcheckbox
				if(element.type=="hidden")
				{
					element = getInputSelector("c_" + element.name);
				}
				else if(!element || element.type.toLowerCase()=="radio")
				{
					element = getInputSelector(element.name);
				}
			}
			catch(e){}
			//text and select
			if(!element.length || element.tagName=="SELECT")
			{
				a[n++] = $(arr[i]);
				try
				{
					if(element.nextSibling.tagName=="IMG" || element.nextSibling.tagName=="A")
					{
						element.parentNode.removeChild(element.nextSibling);
					}
				}
				catch(e){}
			}
			else if(element.length && element.length>1)
			{
				for(var j=0;j<element.length;j++)
				{
					a[n++] = element[j];
				}
			}
		}catch(e){}
	}
	changeInputField(a);
}

function getInputSelector(name)
{
	var list = document.getElementsByTagName("INPUT");
	var arr = new Array();
	var n = 0;
	for(var i=0; i<list.length; i++)
	{
		if(list[i].name == name)
		{
			arr[n++] = list[i];
		}
	}
	return arr;
}

function initViewTable(table,row1,row2)
{
	var list = new Array();
	table = $(table);
	row_list = table.getElementsByTagName("tr");
	for(var i=row1; i<row2; i++)
	{
		appendArray(list,row_list[i].getElementByTagName("input"));
		appendArray(list,row_list[i].getElementByTagName("select"));
		appendArray(list,row_list[i].getElementByTagName("textarea"));
		appendArray(list,row_list[i].getElementByTagName("img"));
		deleteLink(row_list[i]);
	}
	changeInputField(list);
}

function deleteLink(div)
{
	div = $(div)
	list = div.getElementsByTagName("a");
	for(var i=list.length-1;i>=0;i--)
	{
		list[i].outerHTML = "";
	}
}
function appendArray(a,b)
{
	len = a.length;
	for(i=0; i<b.length; i++)
	{
		a[len+i]=b[i];
	}
}
function initViewPage(div)
{
	var p = document.body;
	if(div && document.all(div))
	{
		p = document.all(div)
	}
	initDictCheckView(p);
	//debugger;
	changeInputField(p.getElementsByTagName("input"));
	changeInputField(p.getElementsByTagName("select"));
	changeInputField(p.getElementsByTagName("textarea"));
	changeImageField(p.getElementsByTagName("img"));
	list = p.getElementsByTagName("a");
	for(var i=list.length-1;i>=0;i--)
	{
		if(list[i].innerText != "\u8FD4\u56DE" && !list[i].viewenable)		//return/back
		{
			list[i].outerHTML = "";
		}
	}

}

function initDictCheckView(div)
{
	//dictchec
	var	list = div.getElementsByTagName("checkspan");
	for(var i=list.length-1; i>=0; i--)
	{
		p = list[i].parentNode;
		while(p.tagName.toLowerCase()!="table")
		{
			p = p.parentNode;
		}
		p.outerHTML="<span id=" + list[i].id + ">" + list[i].value + "</span";
	}
}
function changeImageField(list)
{
	for(var i=list.length-1;i>=0;i--)
	{
		if(list[i].viewenable)
		{
			continue;
		}
		if(list[i].outerHTML.indexOf("DateInputInner_onclick")>0 || list[i].outerHTML.indexOf("gfDTPop")>0)
		{
			list[i].outerHTML = "";
		}
	}
}

function changeInputField(list)
{
	if(list.length<1)
	{
		return;
	}

	for(i=list.length-1;i>=0;i--)
	{
		if(list[i].viewenable)
		{
			continue;
		}
		var x=list[i];
		tag = x.tagName.toUpperCase();
		var type = x.type.toUpperCase();

		if(tag=="TEXTAREA" || type=="TEXT")
		{
			x.outerHTML = "<span>" + x.value + "</span>";
		}
		else if(tag=="SELECT")
		{
			var text = getSelectText(x);
			x.outerHTML = "<span>" + text + "</span>";
		}
		else if(type == "CHECKBOX" || type == "RADIO")
		{
			var s = "";
			while(i>0 && list[i].name==x.name)
			{
				if(list[i].checked)
				{
					s = getCheckText(list[i]) + "," + s;
				}
				i--;
			}
			i++;
			if(s.length>0)
			{
				s = s.substring(0,s.length-1);
			}
			var p = x;
/* not gonna happen, we have already handled this situation before using initDictCheckView()
			if(x.name.indexOf("c_")==0)
			{
				p = x.parentNode;
				while(p.parentNode.tagName!="TD")
				{
					p = p.parentNode;
				}
			}
*/
			p.parentNode.innerHTML = s;
		}
		else if(tag=="IMG")
		{
			if(x.outerHTML.indexOf("DateInputInner_onclick")>0)
			{
				x.outerHTML = "";
			}
		}
		removeNextActive(x);
	}
}

	function removeNextActive(x)
	{
		if(x.nextSibling && x.nextSibling.tagName)
		{
			var next = x.nextSibling.tagName.toUpperCase();
			while(next=="IMG" || next=="A")
			{
				if(!x.viewenable)
				x.parentNode.removeChild(x.nextSibling);
				if(x.nextSibling && x.nextSibling.tagName)
				{
					next = x.nextSibling.tagName.toUpperCase();
				}
				else
				{
					return;
				}
			}
		}
	}

function getCheckText(element)
{
	text = "";
	try
	{
		var td = document.createElement("td");
		td.appendChild(element.nextSibling);
		text = td.innerText;
	}catch(e){}
	return text;
}

function formatcheck(obj)
{
	var name = obj.name;
	var element = document.getElementById(name.substring(2));
	list = document.getElementsByTagName("INPUT");
	var val = ",";
	for(var i=0;i<list.length;i++)
	{
		if(list[i].checked && list[i].name==name)
		{
			val += list[i].value + ",";
		}
	}
	if(val == ",")
	{
		val = "";
	}
	element.value = val;
}

	function pbuttonDisable()
	{
		var list = document.getElementsByTagName("A");
		for(var i=list.length-1; i>=0; i--)
		{
			if(list[i].className == "pbutton_href")
			{
				var s = list[i].outerHTML
				var p = list[i].parentNode;
				p.removeChild(list[i]);
				p.innerHTML = s.replace("<A","<DIV").replace("</A>","</DIV>");
			}
		}
	}

	function pbuttonEnable()
	{
		var list = document.getElementsByTagName("DIV");
		document.cookie = "token_cookie=" + getCookie("token_cookie").substring(5);
		for(var i=list.length-1; i>=0; i--)
		{
			if(list[i].className == "pbutton_href")
			{
				var s = list[i].outerHTML
				var p = list[i].parentNode;
				p.removeChild(list[i]);
				p.innerHTML = s.replace("<DIV","<A").replace("</DIV>","</A>");
			}
		}
	}

	function resetForm(form)
	{
		pbuttonDisable();
		form = $(form);
		var value = "";
		var list = document.getElementsByTagName("SELECT");

		for(var i=0; i<list.length; i++)
		{
			if(list[i].origin)
			{
				value += list[i].name + "=" + list[i].origin + ";";
			}
		}

		form.reset();
		if(value.length>0)
		{

			var arr = value.split(/[=;]/);
			for(var i=0; i<arr.length; i+=2)
			{
				$(arr[i]).value = $(arr[i]).origin = arr[i+1];
			}
		}

		for(var i=0; i<form.elements.length; i++)
		{
			if(form.elements[i].type=="hidden" && $("c_" + form.elements[i].name))
			{
				formatcheck($("c_" + form.elements[i].name));
			}
		}
		setMaxLength(form);
		pbuttonEnable();
	}

function reValueSelect()
{

	element = event.srcElement;
	try
	{
	    if(element.tagName.toLowerCase()=="select")
		{
			if(element.originSelect.length>0)
			{
				element.value = element.originSelect;
			}
			else
			{
				element.selectedIndex = 0;
			}
		}
	}catch(e){}
}

/*

//no limit join select menu
//add by liyongsheng 2007-05-05
*/
function initJoinSelect(elements,dictionary,condition,value,upelementvalue){
	//init condition
	if(condition=="") condition = " XT_BDDMZB_JC='1' ";//?1??????????//alert(elements);
	var elementArr = elements.split(",");
	if(document.all(elementArr[0])!=null){
		var jc = parseInt(getNumber(condition))+1;
		var newElements = elements.substring(elements.indexOf(",")+1);
		var newElementArr = newElements.split(",");
		condition = base64encode(condition);
		var list;
		if(dict_list.indexOf("," + dictionary + ",")>=0){
			var s = eval("dict_"+dictionary);
			list = s.split(/[=;]/);
		}else{
			var xmlhttp=new ActiveXObject("Msxml2.XMLHTTP");
			var url = app_path + "/public/dictionary/dictionarySelect.domain?method=getQueryList&XT_TYKJ_KJMC=" + dictionary + "&change=null&CONDITION=" + condition + "&returnList=&returnInputList=&rootName=";
			xmlhttp.Open("POST",url,false);
			xmlhttp.send(null);
			var res=xmlhttp.responseText;
			var doc=new ActiveXObject("MSXML.DOMDocument");
			doc.async=false;
			doc.loadXML(res);
			var root = doc.documentElement;
			list = new Array();
			var oNodeList = root.childNodes;
			for (var i=0; i<oNodeList.length; i++) {
			  	var Item = oNodeList.item(i);
			  	var dc=Item.childNodes;
			  	list[2*i] = dc[0].firstChild.xml;
			  	list[2*i+1] = dc[1].firstChild.xml;
			}
		}
		var defaultvalue = value;
		var f_element_field = elementArr[0];
		var f_elment = $(elementArr[0]);

		if(f_elment.value!=""){
			defaultvalue = f_elment.value;
		}

		if(elementArr.length == 2){
			var strOption="<SELECT style='width:120px' NAME='" + elementArr[0] + "' origin='" + defaultvalue + "' onchange=initPreSelect('"+newElements+"','"+dictionary+"',this.value,"+jc+") />";
		}else{
			var strOption="<SELECT style='width:120px' NAME='" + elementArr[0] + "' origin='" + defaultvalue + "' onchange=initPreJoinSelect('"+newElements+"','"+dictionary+"',this.value,"+jc+") />";
		}
		var op=document.createElement(strOption);
		op.options[0]=new Option("\u8BF7\u9009\u62E9","");
		var selectedText = defaultvalue;
		for(var i=0; i<list.length/2; i++){
		 	op.options[i+1]=new Option(list[2*i+1],list[2*i]);
			if(list[2*i]==defaultvalue||list[2*i+1]==defaultvalue){
		        op.options[i+1].selected=true;
			}
		}
		if(!op.selectedIndex || op.selectedIndex<0){
			op.selectedIndex=0;
			op.origin="";
		}
		if(page_type=="view" && f_elment.tagName.toLowerCase()=="span"){
			var sText = "";
			if(op.selectedIndex && op.selectedIndex>0){
				sText = op[op.selectedIndex].text;
			}
			f_elment.innerText = sText;
		}else{
			p = f_elment.parentNode;
			p.insertBefore(op,f_elment);
			p.removeChild(f_elment);
		}

		if(defaultvalue == ""||defaultvalue == null) defaultvalue = "safdlkjdsafedfdekjioiklklklsasfddsfdsfkilioioioi";

		if(elementArr.length == 2){
			initSelect(newElements,dictionary," XT_BDDMZB_JC='"+jc+"' and xt_bddmzb_bm like '"+defaultvalue+"%' ")
		}else{
			if(document.all(newElementArr[0])!=null){
				initJoinSelect(newElements,dictionary," XT_BDDMZB_JC='"+jc+"' and xt_bddmzb_bm like '"+defaultvalue+"%' ",value,document.all(newElementArr[0]).value)
			}
		}
		}
	}

	function initPreSelect(element,dic,selectValue,jc){
		if(selectValue == null|| selectValue == "") selectValue = "sdfsadfadsfdsafadsfasfasfasdflkjlkjljldfslkj";
		initSelect(element,dic," XT_BDDMZB_JC='"+jc+"' and xt_bddmzb_bm like '"+selectValue+"%' ",'');
	}
	function initPreJoinSelect(elements,dic,selectValue,jc){
		if(selectValue == null|| selectValue == "") selectValue = "sdfsadfadsfdsafadsfasfasfasdflkjlkjljldfslkj";

		initJoinSelect(elements,dic," XT_BDDMZB_JC='"+jc+"' and xt_bddmzb_bm like '"+selectValue+"%' ",'');
		var elementArrInit = elements.split(",");
		for(var m = 0;m<elementArrInit.length;m++){
			document.all(elementArrInit[m]).value="";
		}
	}

	var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
	function base64encode(str) {
	    var out, i, len;
	    var c1, c2, c3;

	    len = str.length;
	    i = 0;
	    out = "";
	    while(i < len) {
	    c1 = str.charCodeAt(i++) & 0xff;
	    if(i == len)
	    {
	        out += base64EncodeChars.charAt(c1 >> 2);
	        out += base64EncodeChars.charAt((c1 & 0x3) << 4);
	        out += "==";
	        break;
	    }
	    c2 = str.charCodeAt(i++);
	    if(i == len)
	    {
	        out += base64EncodeChars.charAt(c1 >> 2);
	        out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
	        out += base64EncodeChars.charAt((c2 & 0xF) << 2);
	        out += "=";
	        break;
	    }
	    c3 = str.charCodeAt(i++);
	    out += base64EncodeChars.charAt(c1 >> 2);
	    out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
	    out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
	    out += base64EncodeChars.charAt(c3 & 0x3F);
	    }
	    return out ;
	}

function getNumber(String){
	var Letters = "1234567890";
	var i;
	var c;
	for( i = 0; i < String.length; i++ ) {
		c = String.charAt( i );
		if (Letters.indexOf(c) !=-1) {
			return c;
		}
	}
}


function viewOnly(elements){
	var elementArr = elements.split(",");

	if(elementArr.length<1)
	{
		return;
	}

	for(i=elementArr.length-1;i>=0;i--)
	{
		var x=$(elementArr[i]);
		tag = x.tagName.toUpperCase();

		var type = x.type;

		if(type != null){
			type = type.toUpperCase();
		}

		if(tag=="TEXTAREA" || type=="TEXT")
		{
			x.outerHTML = "<span>" + x.value + "</span>";
		}
		else if(tag=="SELECT")
		{
			var text = getSelectText(x);
			x.outerHTML = "<span>" + text + "</span>";
		}
		else if(type == "CHECKBOX" || type == "RADIO")
		{
			var s = "";
			while(i>0 && list[i].name==x.name)
			{
				if(list[i].checked)
				{
					s = getCheckText(list[i]) + "," + s;
				}
				i--;
			}
			i++;
			if(s.length>0)
			{
				s = s.substring(0,s.length-1);
			}
			var p = x;

			p.parentNode.innerHTML = s;
		}
		else if(tag=="IMG")
		{
			//alert(x.outerHTML);
			//if(x.outerHTML.indexOf("DateInputInner_onclick")>0)
			//{
				x.outerHTML = "";
			//}
		}
		removeNextActive(x);
	}
}

function addDTSelectAllBox() {
	// 获取displaytag的table元素, displaytag的table标识为class包含"displaytag", 例如class="tab displaytag"
	var tab = $("table.displaytag");
	// 过滤包含noselectall classname的table
	if (tab.length == 0 || tab.hasClass("noselectall")) {
		return false;
	}
	// 如果第一列为checkbox, 在第标题栏放置checkbox
	var chktd = tab.find("thead th:first-child:contains('选择')");
	if (chktd.length == 1) {
		chktd.get(0).innerHTML = "<input type='checkbox' class='checkbox' id='dtSelectAll' title='全选' />";
		// 绑定全选按钮的click事件, 改变table中所有第一列checkbox状态
		var chk = $("#dtSelectAll");
		chk.click(function() {
			var sel = chk.attr("checked");
			tab.find("tbody tr td:first-child :checkbox").each(function() {
				if (this.checked != sel) {
					this.click();
				}
			});
		});
	}
}

function printCert(certno, txcode) {
	var certprinter = new CertPrinter();
	certprinter.printCert(certno, txcode);
}

/**
 * 调用LODDP控件进行凭证打印
 *
 * @param certno
 *            凭证号
 * @param txcode
 *            交易码
 * @param template
 *            打印模板ID, 如果不指定, 默认为交易码
 * @param preview
 *            如果为1则显示打印预览, 否则直接打印, 默认直接打印
 * @return
 */
function printCertDirectPop(certno, txcode, template, preview) {
	var left = (screen.availWidth - 450) / 2;
	var top = (screen.availHeight - 150) / 2;
	if (template == null) {
		template = txcode;
	}
	if (preview != 1) {
		preview = 0;
	}
	url = app_path + "/common/print/certprint2.jsp?CERT_NO=" + certno + "&TRANS_CODE=" + txcode + "&TMPL_ID=" + template + "&PREVIEW=" + preview;
	window.open(url, "_blank", "top=" + top + ",left=" + left + ",width=450,height=150,location=no,status=no,resizable=no,menubar=no,titlebar=no,toolbar=no");
}

/**
 * 调用LODDP控件进行凭证打印
 *
 * @param certno
 *            凭证号
 * @param txcode
 *            交易码
 * @param template
 *            打印模板ID, 如果不指定, 默认为交易码
 * @param preview
 *            如果为1则显示打印预览, 否则直接打印, 默认直接打印
 * @return
 */
function printCertDirect(certno, txcode, template, preview) {
	var errmsg = "";
	LODOP.PRINT_INIT("CERT");
	try {
		// 从缓存中获取打印数据
		var datastr = top.cacheData("CERTDATA-" + certno);
		// 无缓存数据, 从页面从获取
		if (datastr == null) {
			var data = eval("print" + txcode + "('" + certno + "', document)");
			datastr = JSON.stringify(data);
			// 缓存打印数据
			top.cacheData("CERTDATA-" + certno, datastr);
		}
		eval("template" + template + "(JSON.parse('" + datastr + "'))");
	} catch (e) {
		errmsg = e.description;
	}
	// 打印
	if (preview == 1) {
		LODOP.PREVIEW();
	} else {
		LODOP.PRINT();
	}
	// 弹出确认窗口
	url = app_path + "/common/print/certprint.html?CERT_NO=" + certno + "&TRANS_CODE=" + txcode + "&TMPL_ID=" + template + "&PREVIEW=" + preview + "&ERR_MSG=" + errmsg;
	window.open(url, "_blank", "top=" + ((screen.availHeight - 150) / 2) + ",left=" + ((screen.availWidth - 450) / 2) + ",width=450,height=150,location=no,status=no,resizable=no,menubar=no,titlebar=no,toolbar=no");
}

function printCertOCX(certno, txcode) {
	var left = (screen.availWidth - 450) / 2;
	var top = (screen.availHeight - 150) / 2;
	url = app_path + "/certprint/card/print/CertPrintService.print.domain?CERT_NO=" + certno + "&TRANS_CODE=" + txcode;
	window.open(url, "_blank", "top=" + top + ",left=" + left + ",width=450,height=150,location=no,status=no,resizable=no,menubar=no,titlebar=no,toolbar=no");
}

function printCertPDF(certno, txcode) {
	var left = (screen.availWidth - 450) / 2;
	var top = (screen.availHeight - 150) / 2;
	url = app_path + "/common/dialog/dlg_print.jsp?CERT_NO=" + certno + "&TRANS_CODE=" + txcode;
	window.open(url, "_blank", "top=" + top + ",left=" + left + ",width=450,height=150,location=no,status=no,resizable=no,menubar=no,titlebar=no,toolbar=no");
}

function CertPrinter() {
}

CertPrinter.prototype.printCert = function(certno, txcode) {
	printCertDirect(certno, txcode);
};

function blockUI(message){
	if(message==null){
		//message = "正在请求，请耐心等候...";
		//message = "<img src="../../common/js/+app_path+"/work/common/images/wait.gif>";
	}
	$.blockUI({
		css:{
			border:           'none',
			padding:          '5px',
			backgroundColor:  '',
			opacity:          .5,
			cursor: 		  'default',
			color:            '#fff'
		},
		overlayCSS:{
			cursor:           'default'
		},
		message:message
	});
}

function unblockUI(){
	$.unblockUI();
}

function namespace(){
	var a=arguments, o=null, i, j, d, rt;
	for (i=0; i<a.length; ++i) {
		d=a[i].split(".");
		rt=d[0];
		eval('if(typeof '+rt+'=="undefined"){'+rt+'={};}o='+rt+';');
		for(j=1;j<d.length; ++j){
			o[d[j]]=o[d[j]] || {};
			o=o[d[j]];
			}
		}
	}
function cwgInitSelect(elementID,dictionary,condition,value,styleValue,others){
		var list = queryDictList(elementID,dictionary,condition,value);
		var defaultvalue = value;
		var element = $(elementID);
		if(element.value!=""){
			defaultvalue = element.value;
		}
		if(styleValue == null || styleValue == '')
			styleValue = 'width:120px';
		var strOption="<SELECT class='form_field_default' style='" + styleValue +"' ID='" + elementID + "' NAME='" + elementID + "'" + others + " origin='" + defaultvalue + "'/>";
		var op=document.createElement(strOption);
		var j=-1;
		var selectedText = defaultvalue;
		for(var i=0; i<list.length/2; i++){
		 	op.options[j+1]=new Option(list[2*i+1],list[2*i]);
			if(list[2*i]==defaultvalue||list[2*i+1]==defaultvalue)
		    {
		        op.options[j+1].selected=true;
			}
			j++;
		}
		op.selectedIndex=0;
		op.origin=op.options[0].text;
		if(page_type=="view" && element.tagName.toLowerCase()=="span"){
			var sText = "";
			if(op.selectedIndex && op.selectedIndex>0)
			{
				sText = op[op.selectedIndex].text;
			}
			element.innerText = sText;
		}else{
			if(element.validator){
				op.validator=element.validator;
			}
			p = element.parentNode;
			p.insertBefore(op,element);
			p.removeChild(element);
		}
	}

function addCookie_index(url,title){//加入收藏夹
	if(document.all){
	       window.external.addFavorite(url, title);
	}
	else if(window.sidebar){
	      window.sidebar.addPanel(title,url,'');
	}
}

function setHomepage_index(url){//设置首页
   if(document.all){
      document.body.style.behavior='url(#default#homepage)';
      document.body.setHomePage(url);
   }
   else if(window.sidebar){
        if(window.netscape){
             try{
                 netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
             }
             catch(e){
                 alert("您的浏览器未启用[设为首页]功能，开启方法：先在地址栏内输入about:config,然后将项 signed.applets.codebase_principal_support 值该为true即可");
             }
        }
        var prefs=Components.classes['@mozilla.org/preferences-service;1'].getService(Components.interfaces.nsIPrefBranch);
        prefs.setCharPref('browser.startup.homepage',url);
   }
}
	

/**
 * 时间格式转化
 * 使用示例：
 *     var testDate = new Date();
 *     alert(testDate.format("yyyy-MM-dd hh:mm:ss"));
 */
Date.prototype.format = function(format) {
	var o = {
		"M+" :this.getMonth() + 1, // month
		"d+" :this.getDate(), // day
		"h+" :this.getHours(), // hour
		"m+" :this.getMinutes(), // minute
		"s+" :this.getSeconds(), // second
		"q+" :Math.floor((this.getMonth() + 3) / 3), // quarter
		"S" :this.getMilliseconds()
	};
	if (/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear() + "")
				.substr(4 - RegExp.$1.length));
	}
	for ( var k in o) {
		if (new RegExp("(" + k + ")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k]
					: ("00" + o[k]).substr(("" + o[k]).length));
		}
	}
	return format;
}


/**    
 *转换日期对象为日期字符串    
 * @param date 日期对象    
 * @param isFull 是否为完整的日期数据,    
 *               为true时, 格式如"2000-03-05 01:05:04"    
 *               为false时, 格式如 "2000-03-05"    
 * @return 符合要求的日期字符串    
*/     
function getSmpFormatDate(date, isFull) {   
    var pattern = "";   
    if (isFull == true || isFull == undefined) {   
        pattern = "yyyy-MM-dd hh:mm:ss";   
    } else {   
        pattern = "yyyy-MM-dd";   
    }   
    return getFormatDate(date, pattern);   
}   

/**    
 *转换当前日期对象为日期字符串    
 * @param date 日期对象    
 * @param isFull 是否为完整的日期数据,    
 *               为true时, 格式如"2000-03-05 01:05:04"    
 *               为false时, 格式如 "2000-03-05"    
 * @return 符合要求的日期字符串    
*/     
function getSmpFormatNowDate(isFull) {   
    return getSmpFormatDate(new Date(), isFull);   
}  
    
/**    
 *转换long值为日期字符串    
 * @param l long值    
 * @param isFull 是否为完整的日期数据,    
 *               为true时, 格式如"2000-03-05 01:05:04"    
 *               为false时, 格式如 "2000-03-05"    
 * @return 符合要求的日期字符串    
*/     
function getSmpFormatDateByLong(l, isFull) {   
	if(l==null ||  l == undefined) {
		return "";
	}
    return getSmpFormatDate(new Date(l), isFull);   
}   

/**    
 *转换long值为日期字符串    
 * @param l long值    
 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss    
 * @return 符合要求的日期字符串    
*/     
function getFormatDateByLong(l, pattern) {
	if(l==null ||  l == undefined) {
		return "";
	}
    return getFormatDate(new Date(l), pattern);   
}   

/**    
 *转换日期对象为日期字符串    
 * @param l long值    
 * @param pattern 格式字符串,例如：yyyy-MM-dd hh:mm:ss    
 * @return 符合要求的日期字符串    
*/     
function getFormatDate(date, pattern) {   
    if (date == undefined) {   
        date = new Date();   
    }   
    if (pattern == undefined) {   
        pattern = "yyyy-MM-dd hh:mm:ss";   
    }   
    return date.format(pattern);   
}	
	
	
	
	
	/*
var winAlert = window.alert;
window.alert = function(msg) {
	//unblockUI();
	winAlert(msg);
}
*/
