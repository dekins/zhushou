package com.yuntao.zhushou.zplugin.action;

import com.intellij.openapi.actionSystem.AnAction;
import com.intellij.openapi.actionSystem.AnActionEvent;

/**
 * Created by shan on 2017/9/7.
 */
public class MainAction extends AnAction {

    @Override
    public void actionPerformed(AnActionEvent e) {
        // TODO: insert action logic here
        if (e.getPresentation().getText().equals("部署测试环境")) {

        }
    }
}
