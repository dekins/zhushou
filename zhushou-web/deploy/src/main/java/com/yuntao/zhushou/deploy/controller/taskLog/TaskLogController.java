package com.yuntao.zhushou.deploy.controller.taskLog;

import com.yuntao.zhushou.common.utils.ResponseObjectUtils;
import com.yuntao.zhushou.dal.annotation.NeedLogin;
import com.yuntao.zhushou.deploy.controller.BaseController;
import com.yuntao.zhushou.model.domain.Company;
import com.yuntao.zhushou.model.domain.User;
import com.yuntao.zhushou.model.query.TaskLogQuery;
import com.yuntao.zhushou.model.vo.TaskLogVo;
import com.yuntao.zhushou.common.web.Pagination;
import com.yuntao.zhushou.common.web.ResponseObject;
import com.yuntao.zhushou.service.inter.CompanyService;
import com.yuntao.zhushou.service.inter.TaskLogService;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by shan on 2016/5/5.
 */
@RestController
@RequestMapping("taskLog")
public class TaskLogController extends BaseController {


    @Autowired
    private TaskLogService taskLogService;

    @Autowired
    private CompanyService companyService;

    @RequestMapping("list")
    @NeedLogin
    public ResponseObject dataList(TaskLogQuery query) {
        User user = userService.getCurrentUser();
        Company company = companyService.findById(user.getCompanyId());
        query.setKey(company.getKey());
        ResponseObject responseObject = ResponseObjectUtils.buildResObject();

        if (StringUtils.isEmpty(query.getModel())) {
            query.setModel("test");
        }
        Pagination<TaskLogVo> pagination = taskLogService.selectByPage(query);
        responseObject.setData(pagination);
        return responseObject;
    }

    @RequestMapping("selectListByBatchNo")
    @NeedLogin
    public ResponseObject selectListByBatchNo(TaskLogQuery query) {
        ResponseObject responseObject = ResponseObjectUtils.buildResObject();
        Pagination<TaskLogVo> pagination = taskLogService.selectListByBatchNo(query);
        responseObject.setData(pagination);
        return responseObject;
    }


}
