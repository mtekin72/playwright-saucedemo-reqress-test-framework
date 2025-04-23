pipeline {
  agent any

  tools {
    nodejs 'Node18'
  }

  parameters {
    choice(name: 'PROJECT', choices: ['UI Tests', 'API Tests'], description: 'Choose which project to run')
  }

  environment {
    API_BASE_URL = 'https://reqres.in/'  // API Base URL
    UI_BASE_URL = 'https://www.saucedemo.com/'  // UI Base URL
  }

  stages {
    stage('Install Dependencies') {
      steps {
        echo 'Installing Node dependencies using npm ci...'
        sh 'npm ci'
      }
    }

    stage('Run Selected Playwright Tests') {
      steps {
        echo "Running tests for project: ${params.PROJECT}"

        // Set base URL based on selected project
        script {
          if (params.PROJECT == 'UI Tests') {
            env.BASE_URL = UI_BASE_URL
          } else {
            env.BASE_URL = API_BASE_URL
          }
        }

        echo "Using base URL: ${env.BASE_URL}"

        // Running tests
        sh 'mkdir -p playwright-report'
        sh "npx playwright test --project='${params.PROJECT}' || true"
      }
    }

    stage('Generate HTML Report') {
      steps {
        echo 'Generating Playwright HTML report...'
        // Corrected command to show report
        sh 'npx playwright show-report'
      }
    }
  }

  post {
    always {
      echo 'Pipeline execution complete.'
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
    }
  }
}
