package com.yuntao.zhushou.common.constant;

/**
 * Created by shengshan.tang on 2015/11/24 at 16:45
 */
public interface AppConstant {

    String TABLE_POSTFIX = "tablePostfix";

    String AUTH_USER = "auth_user";
    String AUTH_PWD = "auth_pwd";

    interface ResponseLevel{
        String INFO = "info";
        String WARN = "warn";
        String ERROR = "error";
    }

    interface ResponseType{
        String NORMAL = "00";  //系统消息

    }

    interface ResponseCode{
        String NORMAL = "00";
        String NOT_LOGIN = "01";
        String NOT_AUTHORITY = "02";
        String SYSTEM_ERROR = "03";
    }

    interface AppLog{
        String APP_LOG_SHOW_ALL = "app_log_show_all";
    }

    interface Aliyun{
        String KEY = "LTAINYZHsqPLGKju";
        String SECRET = "9UMnWw0eXXaZgaJuOiNoJYGXHAwv0y";
    }


}