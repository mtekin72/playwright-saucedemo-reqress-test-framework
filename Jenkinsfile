pipeline {
  agent any

  tools {
    nodejs 'Node18'
  }

  parameters {
    choice(name: 'PROJECT', choices: ['UI Tests', 'API Tests'], description: 'Choose which project to run')
  }

  environment {
    API_BASE_URL = 'https://reqres.in/'
    UI_BASE_URL = 'https://www.saucedemo.com/'
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
        script {
          echo "Running tests for project: ${params.PROJECT}"

          // Set BASE_URL based on selected project
          env.BASE_URL = (params.PROJECT == 'UI Tests') ? UI_BASE_URL : API_BASE_URL

          echo "Using base URL: ${env.BASE_URL}"

          // Create report directory
          sh 'mkdir -p playwright-report'

          // Run Playwright tests with selected project
          sh "npx playwright test --project='${params.PROJECT}' || true"
        }
      }
    }

    stage('Generate HTML Report') {
      steps {
        echo 'Generating Playwright HTML report...'
        sh 'npx playwright show-report || true'
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
