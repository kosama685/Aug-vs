package com.augagent

import com.intellij.openapi.project.DumbAware
import com.intellij.openapi.project.Project
import com.intellij.openapi.wm.ToolWindow
import com.intellij.openapi.wm.ToolWindowFactory
import com.intellij.ui.content.ContentFactory
import javax.swing.JLabel
import javax.swing.JPanel

class AgentToolWindowFactory : ToolWindowFactory, DumbAware {
    override fun createToolWindowContent(project: Project, toolWindow: ToolWindow) {
        val panel = JPanel()
        panel.add(JLabel("Aug Agent bridge placeholder. Future release will connect to shared core service."))
        val content = ContentFactory.getInstance().createContent(panel, "Agent", false)
        toolWindow.contentManager.addContent(content)
    }
}
