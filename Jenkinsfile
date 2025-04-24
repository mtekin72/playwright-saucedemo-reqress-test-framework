pipeline {
    agent any

    tools {
        nodejs 'Node18'  // Ensure this matches the NodeJS tool name in Jenkins
    }

    parameters {
        choice(name: 'TEST_TYPE', choices: ['UI', 'API', 'Both'], description: 'Select the type of tests to run')
    }

    environment {
        PLAYWRIGHT_PROJECT_UI = 'UI Tests'
        PLAYWRIGHT_PROJECT_API = 'API Tests'
        PLAYWRIGHT_CONFIG = 'playwright.config.ts'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                echo 'Installing dependencies...'
                sh 'npm ci'
            }
        }

        stage('Run UI Tests') {
            when {
                expression { return params.TEST_TYPE == 'UI' || params.TEST_TYPE == 'Both' }
            }
            steps {
                echo 'Running UI Tests...'
                sh "npx playwright test --project='${PLAYWRIGHT_PROJECT_UI}' --config=${PLAYWRIGHT_CONFIG}"
            }
        }

        stage('Run API Tests') {
            when {
                expression { return params.TEST_TYPE == 'API' || params.TEST_TYPE == 'Both' }
            }
            steps {
                echo 'Running API Tests...'
                sh "npx playwright test --project='${PLAYWRIGHT_PROJECT_API}' --config=${PLAYWRIGHT_CONFIG}"
            }
        }

        stage('Generate Report') {
            steps {
                echo 'Generating Playwright report...'
                // Generate the report files (no --output flag)
                sh 'npx playwright show-report'
            }
        }

        stage('Archive Report') {
            steps {
                echo 'Archiving Playwright report...'
                // Archive the report folder as Jenkins artifacts
                archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Pipeline completed!'
        }
        failure {
            echo 'Test run failed!'
        }
    }
}
