pipeline {
    agent {
        docker {
            image 'node:lts-bullseye-slim' 
            args '-p 3000:3000' 
        }
    }
    environment{
        CI = 'false'
    }
    stages {
        
        stage('Build') { 
            steps {
                sh 'npm install' 
            }
        }

        stage('Deliver') {
            steps {
                sh 'set -x'
                sh 'npm run build'
                sh 'set +x'
                sh 'set -x'
                sh 'npm start &' 
                sh 'sleep 1'
                sh 'echo $! > .pidfile'
                sh 'set +x'
                sh 'set -x'
                input message: 'Finished using the web site? (Click "Proceed" to continue)'
            }
        }
        stage('zap test'){
            agent{
                docker{
                    image'owasp/zap2docker-stable'
                }
            }
            steps{
            sh 'zap-full-scan.py -t http://localhost:3000'
            }

        }


    }

}
    


