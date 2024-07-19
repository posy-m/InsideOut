module.exports = {
    apps: [
        {
            name: 'InsideOut', // pm2에서 관리하는 어플리케이션의 이름
            script: 'dist/main.js', // pm2 start ./dist/main.js
            instances: 'max', // cpu를 사용해서 어플리케이션 인스턴스를 몇개까지 실행할거냐 ?                                                                                                                    
            exec_mode: 'cluster', // `클러스터` 모드 : 여러 인스턴스가 병렬로 실행될 수 있게한다.
            watch: false, // 파일 변경을 감지할 지 여부
            env: { // 환경 변수 정의할 객체
                NODE_ENV: 'development', // 어플리케이션에 환경 변수를 설정한다.
                PORT: 3000,
            },
            env_production: { // 환경 변수 운영모드에서 정의할 객체
                NODE_ENV: 'production',
                PORT: 3000,
            },
        },
    ],
};