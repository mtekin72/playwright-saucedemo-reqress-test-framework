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
        echo 'Installing dependencies...'
        sh 'npm ci'
      }
    }

    stage('Run UI Tests') {
      steps {
        echo 'Running UI Tests...'
        sh "npx playwright test --project='${PLAYWRIGHT_PROJECT_UI}' --config=${PLAYWRIGHT_CONFIG}"
      }
    }

    stage('Run API Tests') {
      steps {
        echo 'Running API Tests...'
        sh "npx playwright test --project='${PLAYWRIGHT_PROJECT_API}' --config=${PLAYWRIGHT_CONFIG}"
      }
    }

    stage('Generate Report') {
      steps {
        sh 'npx playwright show-report'
      }
    }

    stage('Archive Report') {
      steps {
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
