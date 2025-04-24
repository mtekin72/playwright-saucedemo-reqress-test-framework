pipeline {
    agent any
    
    environment {
        PLAYWRIGHT_PROJECT_UI = 'UI Tests'
        PLAYWRIGHT_PROJECT_API = 'API Tests'
        PLAYWRIGHT_CONFIG = 'playwright.config.ts'
    }
    
    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    echo 'Installing dependencies...'
                    sh 'npm ci'  // Installs dependencies using npm
                }
            }
        }

        stage('Run Playwright UI Tests') {
            steps {
                script {
                    echo 'Running UI Tests...'
                    sh "npx playwright test --project=${PLAYWRIGHT_PROJECT_UI} --config=${PLAYWRIGHT_CONFIG}"
                }
            }
        }

        stage('Run Playwright API Tests') {
            steps {
                script {
                    echo 'Running API Tests...'
                    sh "npx playwright test --project=${PLAYWRIGHT_PROJECT_API} --config=${PLAYWRIGHT_CONFIG}"
                }
            }
        }

        stage('Generate Playwright Report') {
            steps {
                script {
                    echo 'Generating Playwright HTML report...'
                    sh 'npx playwright show-report'  // Generates the HTML report
                }
            }
        }

        stage('Archive Playwright Report') {
            steps {
                script {
                    echo 'Archiving Playwright HTML report...'
                    archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true  // Archives the report
                }
            }
        }
    }
    
    post {
        always {
            echo 'Pipeline execution complete.'
        }
        success {
            echo 'Tests ran successfully.'
        }
        failure {
            echo 'Test run failed.'
        }
    }
}
