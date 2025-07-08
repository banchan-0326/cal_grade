# Where is Sangchan - 실시간 위치 공유 웹 애플리케이션

이 웹사이트는 폐쇄적인 자습실에서 관리 선생님의 위치를 공유하여 학생들이 관리 선생님의 감시에 대비할 수 있도록 하는 웹입니다.

## 주요 기능

*   자습실의 대략적인 전개도 표시
*   사용자가 웹 속의 자습실 전개도의 특정 부분을 클릭하여 관리 선생님의 위치 업데이트
*   다른 사용자가 다시 클릭하면, 최신 위치로 다시 업데이트
*   최근 3번의 위치까지 지도에 다른 스타일로 표시
*   WebSocket (Socket.IO)을 사용한 실시간 위치 공유

## 기술 스택

*   **프론트엔드:** HTML, CSS, JavaScript
*   **백엔드:** Node.js, Express.js
*   **실시간 통신:** Socket.IO

## 디렉토리 구조

```
.
├── .gitignore
├── index.html                # 메인 HTML 파일
├── package-lock.json         # npm 패키지 잠금 파일
├── package.json              # 프로젝트 메타데이터 및 의존성
├── placeholder_classroom.svg # 자습실 전개도 예시 이미지
├── README.md                 # 프로젝트 설명 및 사용법 (이 파일)
├── script.js                 # 프론트엔드 JavaScript 로직
├── server.js                 # 백엔드 서버 로직
└── style.css                 # CSS 스타일시트
```

## 사용법 (실행 방법)

### 사전 준비

1.  **Node.js 설치:** Node.js (npm 포함)가 시스템에 설치되어 있어야 합니다. [Node.js 공식 웹사이트](https://nodejs.org/)에서 다운로드하여 설치할 수 있습니다.

### 실행 단계

1.  **프로젝트 클론 또는 다운로드:**
    이 프로젝트 코드를 로컬 컴퓨터로 가져옵니다. (예: `git clone <repository_url>`)

2.  **프로젝트 디렉토리로 이동:**
    터미널 또는 명령 프롬프트에서 프로젝트의 루트 디렉토리로 이동합니다.
    ```bash
    cd path/to/where-is-sangchan
    ```

3.  **의존성 패키지 설치:**
    프로젝트에 필요한 라이브러리들 (Express, Socket.IO 등)을 설치합니다.
    ```bash
    npm install
    ```

4.  **서버 실행:**
    다음 명령어를 사용하여 Node.js 서버를 시작합니다.
    ```bash
    npm start
    ```
    또는 직접 `node server.js`를 실행할 수도 있습니다.
    ```bash
    node server.js
    ```
    서버가 성공적으로 시작되면 터미널에 다음과 같은 메시지가 표시됩니다:
    ```
    Server running on port 3000
    Open http://localhost:3000 in your browser.
    ```

5.  **웹 애플리케이션 접속:**
    웹 브라우저를 열고 주소창에 `http://localhost:3000` 을 입력하여 접속합니다.

### 사용

*   웹페이지에 접속하면 자습실 지도가 표시됩니다.
*   지도 위의 특정 지점을 클릭하면 해당 위치에 마커가 표시되고, 이 정보가 다른 모든 접속자에게 실시간으로 공유됩니다.
*   최근 3개의 위치가 다른 스타일의 마커로 표시됩니다.
*   여러 브라우저 창이나 탭을 열어 동시에 테스트해볼 수 있습니다.

## 추가 정보

*   자습실 전개도 (`placeholder_classroom.svg`)는 현재 예시 이미지입니다. 실제 환경에 맞게 이미지를 교체하거나 수정할 수 있습니다.
*   `server.js`의 `PORT` 변수를 수정하여 다른 포트에서 서버를 실행할 수 있습니다.
