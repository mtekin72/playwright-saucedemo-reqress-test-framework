pipeline {
    agent any
    
    environment {
        // Set the environment variables
        PLAYWRIGHT_PROJECT_UI = 'UI Tests'
        PLAYWRIGHT_PROJECT_API = 'API Tests'
        PLAYWRIGHT_CONFIG = 'playwright.config.ts'
    }
    
    stages {
        stage('Install Dependencies') {
            steps {
                script {
                    // Install node dependencies
                    echo 'Installing dependencies...'
                    sh 'npm ci'
                }
            }
        }

        stage('Run Playwright UI Tests') {
            steps {
                script {
                    // Run Playwright UI tests
                    echo 'Running UI Tests...'
                    sh 'npx playwright test --project="$PLAYWRIGHT_PROJECT_UI" --config="$PLAYWRIGHT_CONFIG"'
                }
            }
        }

        stage('Run Playwright API Tests') {
            steps {
                script {
                    // Run Playwright API tests
                    echo 'Running API Tests...'
                    sh 'npx playwright test --project="$PLAYWRIGHT_PROJECT_API" --config="$PLAYWRIGHT_CONFIG"'
                }
            }
        }

        stage('Generate Playwright Report') {
            steps {
                script {
                    // Generate the HTML report after the tests
                    echo 'Generating Playwright HTML report...'
                    sh 'npx playwright show-report'
                }
            }
        }

        stage('Archive Playwright Report') {
            steps {
                script {
                    // Archive Playwright report as a Jenkins artifact
                    echo 'Archiving Playwright HTML report...'
                    archiveArtifacts artifacts: 'playwright-report/**/*', allowEmptyArchive: true
                }
            }
        }
    }
    
    post {
        always {
            // Clean up or notify if required
            echo 'Pipeline execution complete.'
        }
        success {
            // Notify success if needed
            echo 'Tests ran successfully.'
        }
        failure {
            // Notify failure if needed
            echo 'Test run failed.'
        }
    }
}
