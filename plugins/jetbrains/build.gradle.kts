plugins {
    kotlin("jvm") version "1.9.25"
    id("org.jetbrains.intellij") version "1.17.4"
}

group = "com.augagent"
version = "0.1.0"

repositories { mavenCentral() }

intellij {
    version.set("2024.2")
    type.set("IC")
}

tasks {
    patchPluginXml {
        sinceBuild.set("242")
        untilBuild.set("251.*")
    }
}
