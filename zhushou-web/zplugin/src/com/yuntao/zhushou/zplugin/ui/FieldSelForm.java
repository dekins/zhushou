package com.yuntao.zhushou.zplugin.ui;

import com.intellij.openapi.actionSystem.AnActionEvent;
import com.intellij.uiDesigner.core.GridConstraints;
import com.intellij.uiDesigner.core.GridLayoutManager;
import com.yuntao.zhushou.common.utils.ExceptionUtils;
import com.yuntao.zhushou.model.domain.codeBuild.Property;
import com.yuntao.zhushou.model.param.codeBuild.EntityParam;
import com.yuntao.zhushou.zplugin.ActionManager;
import com.yuntao.zhushou.zplugin.AnalyseModelUtils;
import org.apache.commons.lang3.StringUtils;

import javax.swing.*;
import javax.swing.border.TitledBorder;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.List;

//import java.awt.event.ActionEvent;

//import java.awt.event.ActionEvent;

//import java.awt.event.import com.intellij.openapi.actionSystem.AnActionEvent;ActionEvent;

//import java.awt.event.ActionEvent;


/**
 * Created by shan on 2017/9/7.
 */
public class FieldSelForm {
    private JFrame frame = new JFrame();
    private JPanel mainPanel;
    private JList listMethod;
    private JButton btnExecute;
    private JButton btnCancel;
    private JPanel jplButton;

    private AnActionEvent event;

    private EntityParam entityParam;


    public FieldSelForm(final AnActionEvent event) {
        this.event = event;
        final String actionText = event.getPresentation().getText();
        final String projectFilePath = event.getProject().getBasePath();
        btnExecute.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
//                AnalyseModelUtils.analyseProperty(event);
//                ListSelectionModel selectionModel = listMethod.getSelectionModel();
                int result = JOptionPane.showConfirmDialog(mainPanel, "您确认要" + actionText + "？", "提示", JOptionPane.YES_NO_OPTION);
                if (result == 1) {  //1 取消，0 确认
                    return;
                }
                //loading层
//                JXFrame loadFrame = new JXFrame("操作执行中...");
//                loadFrame.setUndecorated(true);
//                loadFrame.getRootPane().setWindowDecorationStyle(JRootPane.NONE);
//                JXBusyLabel label = new JXBusyLabel();
//                label.setBusy(true);
//                loadFrame.add(label);
//                label.setSize(270, 100);
//                loadFrame.setLocationRelativeTo(null);
//                loadFrame.setLocationByPlatform(true);
//                loadFrame.setVisible(true);

//                jplButton = label;
//                jplButton.remove(0);
//                jplButton.add(label, new GridConstraints(0, 0, 1, 1, GridConstraints.ANCHOR_CENTER, GridConstraints.FILL_HORIZONTAL, GridConstraints.SIZEPOLICY_CAN_SHRINK | GridConstraints.SIZEPOLICY_CAN_GROW, GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));

                btnExecute.setEnabled(false);


                try {
                    List<Property> selectedValuesList = listMethod.getSelectedValuesList();

                    if (selectedValuesList == null) {
                        throw new RuntimeException("请选择要您要操作的项");
                    }
                    entityParam.setPropertyList(selectedValuesList);
                    ActionManager actionManager = new ActionManager();
                    if (actionText.equals("新建实体")) {
                        actionManager.newEntity(projectFilePath, entityParam);
                    } else if (actionText.equals("添加属性")) {
                        actionManager.addProperty(projectFilePath, entityParam);

                    } else if (actionText.equals("删除属性")) {
                        JOptionPane.showMessageDialog(mainPanel, actionText + "暂未实现！");

                    } else if (actionText.equals("删除实体")) {
                        JOptionPane.showMessageDialog(mainPanel, actionText + "暂未实现！");

                    }
                    JOptionPane.showMessageDialog(mainPanel, actionText + "执行完成！");
                    frame.setVisible(false);
                } catch (Exception ex) {
                    String message = ex.getMessage();
                    if (StringUtils.isEmpty(message)) {
                        message = ExceptionUtils.getPrintStackTrace(ex);
                    }
                    JOptionPane.showMessageDialog(mainPanel, message, "错误", JOptionPane.ERROR_MESSAGE);
                    btnExecute.setEnabled(true);
                }


            }

        });
        btnCancel.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                //close hide
                frame.setVisible(false);

            }
        });
    }

    public void start(String title) {
        frame.setTitle(title);
        frame.setContentPane(this.mainPanel);
//        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
//        frame.setLocationByPlatform(true);
        frame.pack();

        frame.setLocationRelativeTo(null);
        frame.setSize(270, 450);
//        frame.setSize(600,500);
//        frame.setExtendedState(Frame.MAXIMIZED_BOTH);
        frame.setLocationByPlatform(true);
        frame.setVisible(true);

//        Vector<Object> objects = new Vector<>();
        DefaultListModel listModel = new DefaultListModel();

        try {
            entityParam = AnalyseModelUtils.analyseProperty(this.event);
            if (entityParam != null && entityParam.getPropertyList() != null) {
                for (Property property : entityParam.getPropertyList()) {
//                StringBuilder sb = new StringBuilder();
//                sb.append(property.getEnName());
//                sb.append(":");
//                sb.append(property.getCnName());
//                sb.append(" [" + property.getDataType() + ":" + (StringUtils.isNotEmpty(property.getLength()) ? property.getLength() : "") + "]");
//                objects.add(sb.toString());
                    listModel.addElement(property);
                }
            }
//        listMethod.setListData(objects);
            listMethod.setModel(listModel);

        } catch (Exception ex) {
            String message = ex.getMessage();
            if (StringUtils.isEmpty(message)) {
                message = ExceptionUtils.getPrintStackTrace(ex);
            }
            JOptionPane.showMessageDialog(mainPanel, message, "错误", JOptionPane.ERROR_MESSAGE);
        }

    }


    {
// GUI initializer generated by IntelliJ IDEA GUI Designer
// >>> IMPORTANT!! <<<
// DO NOT EDIT OR ADD ANY CODE HERE!
        $$$setupUI$$$();
    }

    /**
     * Method generated by IntelliJ IDEA GUI Designer
     * >>> IMPORTANT!! <<<
     * DO NOT edit this method OR call it in your code!
     *
     * @noinspection ALL
     */
    private void $$$setupUI$$$() {
        mainPanel = new JPanel();
        mainPanel.setLayout(new GridLayoutManager(2, 1, new Insets(10, 10, 10, 10), -1, -1));
        mainPanel.setBorder(BorderFactory.createTitledBorder(BorderFactory.createLineBorder(Color.black), "属性选择", TitledBorder.DEFAULT_JUSTIFICATION, TitledBorder.TOP));
        final JScrollPane scrollPane1 = new JScrollPane();
        mainPanel.add(scrollPane1, new GridConstraints(0, 0, 1, 1, GridConstraints.ANCHOR_CENTER, GridConstraints.FILL_BOTH, GridConstraints.SIZEPOLICY_CAN_SHRINK | GridConstraints.SIZEPOLICY_WANT_GROW, GridConstraints.SIZEPOLICY_CAN_SHRINK | GridConstraints.SIZEPOLICY_WANT_GROW, null, null, null, 0, false));
        listMethod = new JList();
        listMethod.setAlignmentX(1.0f);
        listMethod.setAlignmentY(1.0f);
        listMethod.setFont(UIManager.getFont("ColorChooser.font"));
        final DefaultListModel defaultListModel1 = new DefaultListModel();
        defaultListModel1.addElement("111");
        defaultListModel1.addElement("2222");
        listMethod.setModel(defaultListModel1);
        listMethod.setVisibleRowCount(15);
        scrollPane1.setViewportView(listMethod);
        jplButton = new JPanel();
        jplButton.setLayout(new GridLayoutManager(1, 2, new Insets(0, 0, 0, 0), -1, -1));
        mainPanel.add(jplButton, new GridConstraints(1, 0, 1, 1, GridConstraints.ANCHOR_CENTER, GridConstraints.FILL_BOTH, GridConstraints.SIZEPOLICY_CAN_SHRINK | GridConstraints.SIZEPOLICY_CAN_GROW, GridConstraints.SIZEPOLICY_CAN_SHRINK | GridConstraints.SIZEPOLICY_CAN_GROW, null, null, null, 0, false));
        btnExecute = new JButton();
        btnExecute.setText("执行");
        jplButton.add(btnExecute, new GridConstraints(0, 0, 1, 1, GridConstraints.ANCHOR_CENTER, GridConstraints.FILL_HORIZONTAL, GridConstraints.SIZEPOLICY_CAN_SHRINK | GridConstraints.SIZEPOLICY_CAN_GROW, GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
        btnCancel = new JButton();
        btnCancel.setText("取消");
        jplButton.add(btnCancel, new GridConstraints(0, 1, 1, 1, GridConstraints.ANCHOR_CENTER, GridConstraints.FILL_HORIZONTAL, GridConstraints.SIZEPOLICY_CAN_SHRINK | GridConstraints.SIZEPOLICY_CAN_GROW, GridConstraints.SIZEPOLICY_FIXED, null, null, null, 0, false));
    }

    /**
     * @noinspection ALL
     */
    public JComponent $$$getRootComponent$$$() {
        return mainPanel;
    }
}
