package com.augagent

import com.intellij.openapi.project.Project
import com.intellij.openapi.startup.ProjectActivity

class AugAgentStartupActivity : ProjectActivity {
    override suspend fun execute(project: Project) {
        // Bootstraps plugin services and chat tool window registration.
    }
}
