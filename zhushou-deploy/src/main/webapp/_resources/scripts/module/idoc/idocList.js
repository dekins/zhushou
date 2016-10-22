/**
 *
 * Created by shan on 2016/4/7.
 */
(function (YT) {
    if (!YT.deploy.idocList) {
        YT.deploy.idocList = {};
    }

    var common = {

        route_callback: function (d, data) {
            console.log("app list after render call");
            //组件初始化之后
            var appList = YT.deploy.data.appList;
            YT.deploy.util.initSelect(appList, "name", "name", "appName", data.appName);

            var enums = YT.deploy.data.enums;

            //moduleType
            YT.deploy.util.initEnumSelect(enums.moduleType, "module", data.module);

            //tab
            $( "div[id='tabs']" ).tabs();

            //注册事件
            $("#btnQuery").click(function () {
                var pageNum = 1;  //查询触发从第一页开始
                $(this).html("查询中...");
                $(this).attr("disabled", "true");
                YT.deploy.idocList.query(pageNum);
            });

            $("#btnQueryEnums").click(function () {
                //debugger;
                var pageNum = 1; 
                // $(this).html("查询中...");
                // $(this).attr("disabled", "true");
                YT.deploy.idocList.queryEnums(pageNum);
            });
            
            $("#btnListAll").click(function () {
                var pageNum = 1;  //查询触发从第一页开始
                $(this).html("查询中...");
                $(this).attr("disabled", "true");
                YT.deploy.idocList.queryExport(pageNum);
            });

            //分页信息init
            YT.deploy.util.paginationInit(d.data, YT.deploy.idocList.query);
            
            //创建接口
            $("#btnNewTemplate").click(function () {
                YT.deploy.routeTpl("/idoc/bind.html",{title:"接口新建"});
            });

            //tab
            $( "div[id='tabs']" ).tabs();

            //调出详情
            $("a[name='enterView']").click(function () {
                var dataId = $(this).attr("data");
                var item = $("tr[data='trChildItem_" + dataId + "']").first();
                var state = ($(item).css("display") == "none");
                //所有的hide
                $("tr[name='trChildItem']").hide();
                if (state) {
                    $(item).show();
                } else {
                    $(item).hide();
                }
            });

            $("a[name='btnEnterEdit']").click(function () {
                var id = $(this).attr("data");
                YT.deploy.route("/idocUrl/getIdocUrlVoById",{id:id},"/idoc/bind.html",{title:"修改文档接口"});
            });

            $("a[name='btnHttpReq']").click(function () {
                var id = $(this).attr("data");

                var params = {id:id};
                YT.deploy.util.reqGet("/idocUrl/getIdocUrlVoById", params, function (d) {
                    var data = d.data;
                    data = data || {};

                    //渲染左侧栏
                    debugger;
                    var paramList = data.paramList;
                    var paramObj = {};
                    if(paramList){
                        for(var key in paramList){
                            var param = paramList[key];
                            var key = param.code;
                            var value = param.memo;
                            paramObj[""+key] = value;
                        }
                    }
                    var reqHeaderObj = {Cookie:document.cookie};
                    var newData = {url:data.url,appName:data.appName,model:"test",reqHeader:JSON.stringify(reqHeaderObj),
                        reqData:JSON.stringify(paramObj),
                        resHeader:null,resData:data.resultData};
                    $.extend(YT.deploy.data,{reqContentInitData:newData});

                    $(".nav-list").find("li > a[id='enterReqContent']").first().trigger("click");

                    // YT.deploy.reqContent.initLeftPanel(newData);
                });

                // YT.deploy.route("/idocUrl/getIdocUrlVoById",{id:id},"/idoc/bind.html",{title:"修改文档接口"});
            });

            $("a[name='btnDel']").click(function () {
                if (!confirm("您确认需要删除吗？")) {
                    return;
                }

                var id = $(this).attr("data");
                YT.deploy.util.reqPost("/idocUrl/deleteById", {id:id}, function (d) {
                    if (d.success) {
                        alert("删除成功");
                        YT.deploy.route("/idocUrl/list", {}, "/log/idoc.html", {});
                    } else {
                        alert("删除失败,err=" + d.message);
                    }
                });
            });

            //枚举同步创建
            $("#btnSyncNew").click(function () {
                if (!confirm("您确认需要同步创建吗？")) {
                    return;
                }
                YT.deploy.util.reqPost("/idocUrl/syncNew", {appName:"user"}, function (d) {
                    if (d.success) {
                        alert("同步创建成功");
                    } else {
                        alert("同步创建失败,err=" + d.message);
                    }
                });
            });
            
            //枚举同步更新
            $("#btnSyncUpdate").click(function () {
                if (!confirm("您确认需要同步更新吗？")) {
                    return;
                }
                YT.deploy.util.reqPost("/idocUrl/syncUpdate", {appName:"user"}, function (d) {
                    if (d.success) {
                        alert("同步修改成功");
                    } else {
                        alert("同步修改失败,err=" + d.message);
                    }
                });
            });
            
        },
    }
    
    $.extend(YT.deploy, common);


    YT.deploy.idocList = {
        query: function (pageNum) {
            var params = YT.deploy.util.getFormParams("#idocListForm");
            params["pageNum"] = pageNum;
            var pageSize = $("#pageSize").val();
            var ext_data = $.extend(params, {title: "接口文档"});
            YT.deploy.route("/idocUrl/list", params, "/idoc/list.html", ext_data);
        },

        queryExport: function (pageNum) {
            var params = YT.deploy.util.getFormParams("#idocListForm");
            params["pageNum"] = pageNum;
            var pageSize = $("#pageSize").val();
            var ext_data = $.extend(params, {title: "导出接口文档"});
            YT.deploy.route("/idocUrl/list", params, "/idoc/listAll.html", ext_data);
        },
        
        queryEnums: function (pageNum) {
            var params = YT.deploy.util.getFormParams("#idocListForm");
            params["pageNum"] = pageNum;
            var pageSize = $("#pageSize").val();
            params["type"] = 1;
            var ext_data = $.extend(params, {title: "枚举接口文档"});
            YT.deploy.route("/idocUrl/list", params, "/idoc/enums.html", ext_data);
        },


    }

})(window.YunTao);
