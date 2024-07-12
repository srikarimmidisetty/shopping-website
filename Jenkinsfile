pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                script {
                    docker.build('backend', './shopping-backend')
                    docker.build('frontend', './shopping-frontend')
                }
            }
        }
        stage('Push to Registry') {
            steps {
                script {
                    docker.withRegistry('https://my-docker-registry.com', 'docker-credentials') {
                        docker.image('backend').push('latest')
                        docker.image('frontend').push('latest')
                    }
                }
            }
        }
        stage('Deploy to Kubernetes') {
            steps {
                kubernetesDeploy(
                    kubeconfigId: 'kubeconfig-credentials-id',
                    configs: 'shopping-backend/k8s/*.yaml, shopping-frontend/k8s/*.yaml'
                )
            }
        }
    }
}

