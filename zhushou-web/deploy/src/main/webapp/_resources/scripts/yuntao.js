/**
 * Created by shan on 2016/4/7.
 * 结构 YT 公司名
 * deploy 工程名
 * app    模块名
 */
(function (YT) {
    if (!YT) {
        window.YunTao = YT = {};
    }
    if (!YT.deploy) {
        YT.deploy = {};
    }

    if (!YT.deploy.constant) {
        YT.deploy.constant = {};
    }
    if (!YT.deploy.util) {
        YT.deploy.util = {};
    }

    //定义常量
    var constant = {
        NOT_LOGIN: "01",  //未登录
        
        C_USER_DATA : "c_user_data",   //用户数据cookie key

        BRANCH_MAP : "branch_map",  //分支map

        APPLOG_MOBILE_SEL_MAP : "appLog_mobile_sel_map",  //mobile sel map
        APPLOG_MOBILE_SEL_MAP : "appLog_mobile_sel_map",  //mobile sel map
    }


    $.extend(YT.deploy.constant, constant);


    //工具类
    var util = {

        reqGet: function (url, param, callback) {
            $.get(url, param, function (d) {
                if (d.success) {
                    callback(d);
                    return true;
                } else {
                    alert("rqGet failed! error="+d.message);
                    if (d.code == YT.deploy.constant.NOT_LOGIN) {
                        YT.deploy.goLoginPage();
                    }
                    return false;
                }
            });
        },

        reqPost: function (url, param, callback) {
            $.post(url, param, function (d) {
                if (d.success) {
                    callback(d);
                } else {
                    alert("reqPost failed! error="+d.message);
                    if (d.code == YT.deploy.constant.NOT_LOGIN) {
                        YT.deploy.goLoginPage();
                    }
                }
            });
        },
        getReqUrlParam: function () {
            var url = location.search; //获取url中"?"符后的字串
            var theRequest = new Object();
            if (url.indexOf("?") != -1) {
                var str = url.substr(1);
                strs = str.split("&");
                for (var i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = (strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },
        //获得提交表单数据
        getFormParams: function (id) {
            var sel = id || "form";
            var paramsArray = $(sel).serializeArray();
            var params = {};
            while (paramsArray.length > 0) {
                var data = paramsArray.pop();
                var oldValue = params[data.name];
                if (typeof(oldValue) != "undefined") {  //存在数据
                    if (typeof(oldValue) == "object") {
                        oldValue.push(data.value); //add
                    } else {
                        var arr = [];
                        arr.push(oldValue);
                        arr.push(data.value);
                        oldValue = arr;
                    }
                    params[data.name] = oldValue;
                } else {
                    params[data.name] = data.value;
                }

            }
            return params;
        },

        paramToString : function(param){
            if(!param){
                return "";
            }
            var strArray = [];
            for(var p in param){
                strArray.push("&"+p+"="+param[p]);
            }
            if(strArray.length == 0){
                return "";
            }
            return strArray.join("");

        },

        initSelect:function(dataList,key,val,selectId,initValue){
            var dataArray = [];
            for (var i = 0; i < dataList.length; i++) {
                var data = dataList[i];
                dataArray.push("<option value='" + data[key] + "'");
                if(typeof(initValue) != "undefined" && initValue == data[key]){
                    dataArray.push(" selected='true' ");
                }
                dataArray.push(">");
                dataArray.push(data[val]);
                dataArray.push("</option>");
            }
            if(YT.deploy.formId){
                $("#"+YT.deploy.formId).find("#"+selectId).append(dataArray.join(""));
            }else{
                $("#"+selectId).append(dataArray.join(""));
            }
        },

        initEnumSelect:function(type,selectId,initValue){
            var dataArray = [];
            var enums = YT.deploy.data.enums;
            var dataList = enums[type];
            if(!dataList){
                return;
            }
            for (var i = 0; i < dataList.length; i++) {
                var data = dataList[i];
                dataArray.push("<option value='" + data.code + "'");
                if(typeof(initValue) != "undefined" && initValue !== "" && initValue == data.code){
                    dataArray.push(" selected='true' ");
                }
                dataArray.push(">");
                dataArray.push(data.description);
                dataArray.push("</option>");
            }
            if(YT.deploy.formId){
                $("#"+YT.deploy.formId).find("#"+selectId).append(dataArray.join(""));
            }else{
                $("#"+selectId).append(dataArray.join(""));
            }
        },
        initEnumRadio:function(type,chkBlockId,chkName,initValue){
            initValue = initValue || 0;
            var enums = YT.deploy.data.enums;
            var dataList = enums[type];
            if(!dataList){
                return;
            }
            var dataArray = [];
            for (var i = 0; i < dataList.length; i++) {
                var data = dataList[i];
                dataArray.push('<label>');
                dataArray.push('<input type="radio" id="' + chkName+'" name="'+chkName+'" value='+data.code+' ');
                if(data.code == initValue){
                    dataArray.push('checked="checked" ');
                }
                dataArray.push('/>&nbsp;');
                dataArray.push(data.description);
                dataArray.push('</label>&nbsp;&nbsp;&nbsp;');
            }
            if(YT.deploy.formId){
                $("#"+YT.deploy.formId).find("#"+chkBlockId).append(dataArray.join(""));
            }else{
                $("#"+chkBlockId).append(dataArray.join(""));
            }
        },

        initEnumCheckBox:function(type,chkBlockId,chkId,initValueList){
            initValueList = initValueList || [];
            var enums = YT.deploy.data.enums;
            var dataList = enums[type];
            var dataArray = [];
            for (var i = 0; i < dataList.length; i++) {
                var data = dataList[i];
                dataArray.push('<label>');
                dataArray.push('<input type="checkbox" id="' + chkId+'" value='+data.code+' ');
                var findIndex = $.inArray(data.code,initValueList);
                if(findIndex > -1){
                    dataArray.push('checked="checked" ');
                }
                dataArray.push('/>&nbsp;');
                dataArray.push(data.description);
                dataArray.push('</label>&nbsp;&nbsp;&nbsp;');
            }
            if(YT.deploy.formId){
                $("#"+YT.deploy.formId).find("#"+chkBlockId).append(dataArray.join(""));
            }else{
                $("#"+chkBlockId).append(dataArray.join(""));
            }
        },

        paginationInit: function (data, queryFn) {
            if ($(".totalCount").length == 0 || !data) {
                return;
            }

            $(".totalCount").html(data.totalCount);
            $(".pageCount").html(data.pageCount);
            $(".pageNum").html(data.pageNum);
            $(".startRow").html(data.startRow + 1);
            $(".endRow").html(data.endRow);

            var pageArray = [];
            //pageNum,pageSize 必须定义好！
            pageArray.push('<input type="hidden" id="pageNum" value="' + data.pageNum + '" />');
            pageArray.push('<input type="hidden" id="pageSize" value="' + data.pageSize + '" />');
            pageArray.push('<li class="prev');
            if (data.pageNum == 1) {
                pageArray.push(' disabled');
            }
            pageArray.push('"><a href="javascript:void(0)" id="pageLeft"><i class="icon-double-angle-left"></i></a></li>');

            var pageIndex = data.pageNum;
            var maxShowCount = data.pageCount >= 3 ? 3 : data.pageCount;
            var startShowIndex = pageIndex - 1;
            if (startShowIndex < 1) {
                startShowIndex = 1;
            }
            var endShowIndex = startShowIndex + maxShowCount;
            if (endShowIndex > (data.pageCount + 1)) {
                endShowIndex = data.pageCount + 1;
            }
            var pageShowNumArray = [];
            while (startShowIndex < endShowIndex) {
                pageArray.push("<li");
                if (startShowIndex == data.pageNum) {
                    pageArray.push(' class="active" ');
                }
                pageArray.push(">");
                pageArray.push('<a href="javascript:void(0)" id="pageNum_' + startShowIndex + '">' + startShowIndex + '</a></li>');
                pageShowNumArray.push(startShowIndex);
                startShowIndex++;
            }
            pageArray.push('<li class="next');
            if (data.pageNum == data.pageCount) {
                pageArray.push(' disabled');
            }
            pageArray.push('"><a href="javascript:void(0)" id="pageRight"><i class="icon-double-angle-right"></i></a></li>');

            //append to dom
            $(".pagination").html(pageArray.join(""));

            //bind event
            for (var i = 0; i < pageShowNumArray.length; i++) {
                var pageIndex = pageShowNumArray[i];
                $("#pageNum_" + pageIndex).click(function () {
                    var id = $(this).attr("id");
                    var pageIndex = id.split("_")[1];
                    queryFn(pageIndex, data.pageSize);
                });
            }

            $("#pageLeft").click(function () {
                if (data.pageNum != 1) {
                    queryFn(1, data.pageSize);
                }
            });

            $("#pageRight").click(function () {
                if (data.pageNum != data.pageCount) {
                    queryFn(data.pageCount, data.pageSize);
                }
            });

        }
    };

    $.extend(YT.deploy.util, util);

    //实现路由程序
    YT.deploy.routeStackProcess = {
        currentIndex: -1,

        routeStack: {
            url: null,
            param: null,
            tlp_url: null,
            extData: null, //
        },

        rsArray: [],  //路由桟数组

        doRoute: function (url, param, tpl_url, extData) {
            var rsArray = YT.deploy.routeStackProcess.rsArray;
            var key = url + YT.deploy.util.paramToString(param);
            key += tpl_url + YT.deploy.util.paramToString(extData);
            console.log("key="+key);
            var routeMethod = extData["method"];
            if(routeMethod){
                if(routeMethod == "prevRoute" || routeMethod == "nextRoute"){
                    for(var i = 0; i < rsArray.length; i++){
                        var routeStatck = rsArray[i];
                        var compareKey = routeStatck.url + YT.deploy.util.paramToString(param);
                        compareKey += routeStatck.tpl_url + YT.deploy.util.paramToString(extData);
                        if(key == compareKey){  //exists return
                            YT.deploy.routeStackProcess.currentIndex = i;
                            return;
                        }
                    }

                }else if(routeMethod == "refresh"){
                    return;
                }


            }
            //other route
            var routeStatck = {url: url, param: param, tpl_url: tpl_url, extData: extData};
            rsArray.length = YT.deploy.routeStackProcess.currentIndex + 1;
            rsArray.push(routeStatck);
            if(rsArray.length > 50){
                //remove 10 element
                var index = 10;
                while(index < rsArray.length){
                    rsArray[index-10] = rsArray[index]
                    index++;
                }
                rsArray.length = rsArray.length-10;
            }
            YT.deploy.routeStackProcess.currentIndex = rsArray.length-1;


        },

        //刷新
        refresh: function () {
            var currentIndex = YT.deploy.routeStackProcess.currentIndex;
            var rsArray = YT.deploy.routeStackProcess.rsArray;
            if(rsArray.length == 0){
                return;
            }
            var routeStack = rsArray[currentIndex];
            routeStack.extData["method"] = "refresh";
            YT.deploy.route(routeStack.url,routeStack.param,routeStack.tpl_url,routeStack.extData);

        },

        //主页
        home: function () {
            var rsArray = YT.deploy.routeStackProcess.rsArray;
            if(rsArray.length == 0){
                return;
            }
            var currentIndex = 0
            var routeStack = rsArray[currentIndex];
            routeStack.extData["method"] = "home";
            YT.deploy.route(routeStack.url,routeStack.param,routeStack.tpl_url,routeStack.extData);

        },

        //上一个路由
        prevRoute: function () {
            var currentIndex = YT.deploy.routeStackProcess.currentIndex;
            var rsArray = YT.deploy.routeStackProcess.rsArray;
            if(rsArray.length == 0){
                return;
            }
            currentIndex--;
            var routeStack = rsArray[currentIndex];
            routeStack.extData["method"] = "prevRoute";
            YT.deploy.route(routeStack.url,routeStack.param,routeStack.tpl_url,routeStack.extData);
        },

        //下一个路由
        nextRoute: function () {
            ////debugger;
            var currentIndex = YT.deploy.routeStackProcess.currentIndex;
            var rsArray = YT.deploy.routeStackProcess.rsArray;
            if(rsArray.length == 0){
                return;
            }
            if(currentIndex == (rsArray.length-1)){
                return;
            }
            currentIndex++;
            var routeStack = rsArray[currentIndex];
            routeStack.extData["method"] = "nextRoute";
            YT.deploy.route(routeStack.url,routeStack.param,routeStack.tpl_url,routeStack.extData);
        },
        
        


    };


    //用户数据处理程序
    YT.deploy.userDataProcess = {

        userDataMap : {},   //用户数据
        
        setValue : function(nameSpace,key,value,expire){
            var moduleData = this.userDataMap[nameSpace];  //this == userDataProcess 作用域
            moduleData = moduleData || {};
            moduleData[key] = value;
            this.userDataMap[nameSpace] = moduleData;
            var userDataString = JSON.stringify(this.userDataMap);
            $.cookie(YT.deploy.constant.C_USER_DATA,userDataString,{ expires: expire, path: "/" });
        },
        
        getValue : function(nameSpace,key){
            
        },

        setValueMap : function(nameSpace,dataMap,expire){
            if($.isEmptyObject(dataMap)){
                return;
            }
            var moduleData = this.userDataMap[nameSpace];  //this == userDataProcess 作用域
            moduleData = moduleData || {};
            // //debugger;
            for(var key in dataMap){
               moduleData[key] = dataMap[key]; 
            }
            this.userDataMap[nameSpace] = moduleData;
            var userDataString = JSON.stringify(this.userDataMap);
            $.cookie(YT.deploy.constant.C_USER_DATA,userDataString,{ expires: expire, path: "/" });
        },
        
        getValueMap : function(nameSpace){
            var userDataString = $.cookie(YT.deploy.constant.C_USER_DATA);
            // //debugger;
            if(!userDataString){
                return {};
            }
            var userData = JSON.parse(userDataString);
            return userData[nameSpace];
        },

        clear : function(nameSpace){
            this.userDataMap[nameSpace] = {};
            var userDataString = JSON.stringify(this.userDataMap);
            $.cookie(YT.deploy.constant.C_USER_DATA,userDataString,{ expires: 7, path: "/" });
        },
        
    }



    YT.deploy.eventProcess = {
        listener : [],  //监听器集合
        event : function(_type,_fun){
            this.type = _type;
            this.fun = _fun;
        },
        //使用端添加
        addListener : function(type,fun){
            var listenerList = YT.deploy.eventProcess.listener;
            for(var i = 0; i < listenerList.length; i++){
                var myEvent = listenerList[i];
                if(myEvent.type == type){
                    return;
                }
            }
            var myEvent = new YT.deploy.eventProcess.event(type,fun);
            YT.deploy.eventProcess.listener.push(myEvent);
        },
        //使用端删除
        removeListener : function(type){
            var listenerList = YT.deploy.eventProcess.listener;
            for(var i = 0; i < listenerList.length; i++){
                var myEvent = listenerList[i];
                if(myEvent.type == type){
                    //TODO
                    // YT.deploy.eventProcess.listener
                }
            }
        },
        
        //推送端触发
        notifyEvent : function(message){
            var msgObj = JSON.parse(message);
            var type = msgObj.bizType;
            var listenerList = YT.deploy.eventProcess.listener;
            for(var i = 0; i < listenerList.length; i++){
                var myEvent = listenerList[i];
                var executeFun = myEvent.fun;
                if(myEvent.type != type){
                    continue;
                }
                if(executeFun){
                    executeFun(msgObj);
                }
            }
        }
    };

    YT.deploy.Cache = {

        set:function(key,value){
            //set to local storage
            localStorage.setItem(key,JSON.stringify(value));

            //set to local cache
            $.extend(YT.deploy.data, {key:value});

        },

        get:function(key){
            var value = YT.deploy.data[key];
            if(!value){
                //get from localStorage
                var valueJson = localStorage.getItem(key);
                if(valueJson != null){
                    value = JSON.parse(valueJson);

                    //set to local cache
                    $.extend(YT.deploy.data, {key:value});
                }
            }
            return value;
        }

    };

    var common = {
        checkLogin: function () {
            var isLogin = false;
            //获取用户信息
            $.ajax({
                url: "/user/getLoginUser",
                async: false,
                success: function (d) {
                    if (d.success) {
                        appData["user"] = d.data.user;
                        appData["authResList"] = d.data.authResList;
                        var configData = d.data.configData;
                        if(configData){
                            for(var key in configData){
                                // //debugger;
                                appData[key] = configData[key];
                            }
                        }
                        isLogin = true;
                    } else {
                        //alert(d.message);
                        if (d.code == "01") {
                            YT.deploy.goLoginPage();
                        }
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    alert(textStatus);
                }
            });
            return isLogin;
        },



        route: function (url, param, tpl_url, extData) {
            YT.deploy.util.reqGet(url, param, function (d) {
                var data = d.data;
                data = data || {};
                if (extData) {
                    for (var key in extData) {
                        data[key] = extData[key];
                    }
                }
                $.extend(data,appData);
                $.extend(data,param);

                $.get(tpl_url, function (source) {
                    var render = template.compile(source);
                    var html = render(data);
                    $(".page-content").html(html);
                    // //debugger;
                    YT.deploy.route_callback(d,data);
                    YT.deploy.routeStackProcess.doRoute(url, param, tpl_url, extData);

                });
            });
        },
        routeOpenWin: function (url, param, tpl_url, extData,callback) {
            YT.deploy.util.reqGet(url, param, function (d) {
                var data = d.data;
                data = data || {};
                if (extData) {
                    for (var key in extData) {
                        data[key] = extData[key];
                    }
                }
                $.extend(data,appData);
                $.extend(data,param);

                $.get(tpl_url, function (source) {
                    var render = template.compile(source);
                    var html = render(data);
                    $(".bootbox-body").html(html);
                    if(typeof(callback) == "function"){
                        callback(data);
                    }
                    // //debugger;
                    // YT.deploy.route_callback(d,data);
                    // YT.deploy.routeStackProcess.doRoute(url, param, tpl_url, extData);

                });
            });
        },
        
        //只跳转模板，不请求数据
        routeTpl: function (tpl_url, data) {
            // $this = this;
            data = data || {};
            $.extend(data,appData);
            $.get(tpl_url, function (source) {
                var render = template.compile(source);
                var html = render(data);
                $(".page-content").html(html);
                YT.deploy.route_callback(data,data);
                // YT.deploy.routeStackProcess.doRoute(url, param, tpl_url, data);
            });
            
        },

        //请求 index.html 进行路由 
        routeIndex: function (tpl_url, extData) {
            $.get(tpl_url, function (source) {
                var render = template.compile(source);
                var html = render(extData);
                $("#indexBlock").html(html);
            });
        },

        //跳到登录
        goLoginPage: function () {
            $(document.body).addClass("login-layout");
            YunTao.deploy.routeIndex("/login.html", appData);
        },

        //跳到首页
        goIndexPage: function () {
            $(document.body).removeClass("login-layout");
            YT.deploy.routeIndex("/list.html", appData);
        },
        
        //搜索跳转
        goSearchPage: function (formId,pageNum,pageSize,extData) {
            var queryParams = YT.deploy.util.getFormParams("#"+formId);
            queryParams["pageNum"] = pageNum;
            queryParams["pageSize"] = pageSize;

            var actionId = $("#"+formId).attr("actionId");
            var authRes = appData.authMap[actionId];
            //set userData with queryParams
            YT.deploy.userDataProcess.setValueMap(authRes.tplUrl+"_queryData",queryParams);
            
            if (extData) {
                for (var key in extData) {
                    queryParams[key] = extData[key];
                }
            }
            // //debugger;
            // var extData = $.extend(params, {tp_title:authRes.name});
            var extData = {tp_title:authRes.name};
            extData = $.extend(extData,{authRes:authRes});
            //set userData with extData
            YT.deploy.userDataProcess.setValueMap(authRes.tplUrl+"_extData",extData);
            
            YT.deploy.route(authRes.url, queryParams, authRes.tplUrl, extData);

        },

        route_callback: function () {

        },

    };


    $.extend(YT.deploy, common);
    
    //local data
    YT.deploy.data = {
        
    }


    //事件触发
    var preKeyCode = null;
    $(document).keydown(function (e) {
        console.log("keyCode=" + e.keyCode);
        if ((preKeyCode == 18 || preKeyCode == 91 ) && e.keyCode == 13) {
            $("button[enter='true']").trigger("click");
            return false;
        }

        if ((preKeyCode == 17 || preKeyCode == 91 ) && e.keyCode == 82) { //ctrl + r
            console.log("presskey ctrl + r");
            YT.deploy.routeStackProcess.refresh();
            return false;  //屏蔽系统event
        }
        if ((preKeyCode == 18 || preKeyCode == 91 ) && e.keyCode == 72) { //alt + h
            console.log("presskey alt + h");
            YT.deploy.routeStackProcess.home();
            return false;  //屏蔽系统event
        }
        if ((preKeyCode == 18 || preKeyCode == 91 ) && e.keyCode == 37) { //alt + left
            console.log("presskey alt+left");
            YT.deploy.routeStackProcess.prevRoute();
            return false;
        }
        if ((preKeyCode == 18 || preKeyCode == 91 ) && e.keyCode == 39) { //alt + right
            console.log("presskey alt + right");
            YT.deploy.routeStackProcess.nextRoute();
            return false;
        }
        if (e.keyCode == 27) { //Esc
            console.log("presskey Esc");
            $(".bootbox-close-button").trigger("click");
            return false;
        }
        preKeyCode = e.keyCode;

    });
    //end



    //webSocket
    YT.deploy.WebSocket = {

        webSocket : null,
        errMaxTry : 5,
        init : function(){
            // var webSocket = YT.deploy.WebSocket.webSocket;
            var hostname = location.hostname;
            var websocketProtocol = "ws";
            var port = "";
            if(location.protocol == "https:"){
                websocketProtocol = "wss"
            }else{
                port = ":9003";
            }
            this.webSocket = new WebSocket(websocketProtocol+'://'+hostname+port+'/index.index?platform=user&token='+$.cookie("sid"));
            // var sendJson = {}

            this.webSocket.onerror = function(event) {
                console.error("error,data="+event.data);
            };

            this.webSocket.onopen = function(event) {
                console.log("open,data="+event.data);
                YT.deploy.WebSocket.webSocket.send('{"type":"user","bizType":"init","message":"user client init"}');
            };

            this.webSocket.onmessage = function(event) {
                YT.deploy.eventProcess.notifyEvent(event.data);
                console.log("onmessage data="+event.data);
                // YT.deploy.WebSocket.webSocket.send('{"type":"user","bizType":"init","message":"user client init"}');
            };

            this.webSocket.onclose = function(event) {
                console.error("onclose data="+event.data);
                //重新连接
                setTimeout(YT.deploy.WebSocket.init(), 1000);
            };

            // setInterval(YT.deploy.WebSocket.checkStatus,5000);  //每5秒钟检查一次
        },

        checkStatus : function(){
            var webSocket = YT.deploy.WebSocket.webSocket;
            try{
                if(webSocket.readyState == 0 || webSocket.readyState == 3){
                    YT.deploy.WebSocket.init(); //重连
                }
            }catch(e){
               console.log("ws重连出错 errMsg="+e.message+",lineNum="+e.lineNumber);
            }

        }
    };
    //end


    // window.confirm = function(message){
    //     bootbox.confirm(message, function(result) {
    //         return result;
    //         if(result) {
    //             //
    //             alert(result);
    //         }
    //     });
    // }


})(window.YunTao);