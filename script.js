// script.js
document.addEventListener('DOMContentLoaded', () => {
    const socket = io(); // Socket.IO 서버에 연결

    const classroomMap = document.getElementById('classroom-map');
    const mapImage = document.getElementById('map-image');
    let recentLocations = []; // 서버로부터 받을 것이므로, 초기값은 빈 배열 또는 서버에서 받은 값

    const MAX_LOCATIONS = 3; // 서버와 동일하게 유지 (서버가 관리 주체)

    function removeAllMarkers() {
        const existingMarkers = classroomMap.querySelectorAll('.marker');
        existingMarkers.forEach(marker => marker.remove());
    }

    function updateMarkers() {
        removeAllMarkers();
        recentLocations.forEach((loc, index) => {
            const marker = document.createElement('div');
            marker.classList.add('marker');
            marker.style.left = `${loc.x}%`;
            marker.style.top = `${loc.y}%`;

            if (index === 0) {
                marker.classList.add('latest');
                marker.title = '가장 최근 위치';
            } else if (index === 1) {
                marker.classList.add('middle');
                marker.title = '두 번째 최근 위치';
            } else {
                marker.classList.add('oldest');
                marker.title = '세 번째 최근 위치';
            }
            classroomMap.appendChild(marker);
        });
    }

    classroomMap.addEventListener('click', (event) => {
        const rect = mapImage.getBoundingClientRect();
        const clickXInViewport = event.clientX;
        const clickYInViewport = event.clientY;

        if (clickXInViewport >= rect.left && clickXInViewport <= rect.right &&
            clickYInViewport >= rect.top && clickYInViewport <= rect.bottom) {
            const x = ((clickXInViewport - rect.left) / rect.width) * 100;
            const y = ((clickYInViewport - rect.top) / rect.height) * 100;

            // 새 위치 정보를 서버로 전송
            socket.emit('newLocation', { x, y });
            console.log(`Sent new location to server: X=${x.toFixed(2)}%, Y=${y.toFixed(2)}%`);
        } else {
            console.log("Clicked outside the map image.");
        }
    });

    // 서버로부터 위치 업데이트 수신
    socket.on('locationUpdate', (updatedLocations) => {
        console.log('Received location update from server:', updatedLocations);
        recentLocations = updatedLocations; // 서버가 보내준 최근 위치들로 교체
        updateMarkers();
    });

    // 서버로부터 초기 접속 시 현재 위치들을 받음
    socket.on('initialLocations', (initialLocs) => {
        console.log('Received initial locations:', initialLocs);
        recentLocations = initialLocs;
        updateMarkers();
    });


    console.log("script.js loaded and initialized. Attempting to connect to Socket.IO server...");

    socket.on('connect', () => {
        console.log('Successfully connected to Socket.IO server with ID:', socket.id);
        // 연결 성공 시, 초기 위치 데이터 요청
        socket.emit('requestInitialLocations');
    });

    socket.on('connect_error', (error) => {
        console.error('Socket.IO connection error:', error);
    });
});
