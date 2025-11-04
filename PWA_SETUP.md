# PWA 설정 가이드

HY-Compass를 PWA로 사용하기 위한 설정 가이드입니다.

## 필요한 파일

1. **manifest.json** ✅ (생성 완료)
2. **sw.js** ✅ (Service Worker 생성 완료)
3. **아이콘 파일들** ⚠️ (수동 생성 필요)

## 아이콘 생성 방법

### 1. 아이콘 폴더 생성
프로젝트 루트에 `icons` 폴더를 생성하세요:
```
캡스톤/
  ├── icons/
  ├── manifest.json
  ├── sw.js
  └── 웹디자인초안.html
```

### 2. 필요한 아이콘 크기
다음 크기의 아이콘을 생성해야 합니다:
- 72x72.png
- 96x96.png
- 128x128.png
- 144x144.png
- 152x152.png
- 180x180.png (Apple Touch Icon)
- 192x192.png
- 384x384.png
- 512x512.png

### 3. 아이콘 생성 도구
다음 도구들을 사용하여 아이콘을 생성할 수 있습니다:
- **온라인 도구**: 
  - https://realfavicongenerator.net/
  - https://www.pwabuilder.com/imageGenerator
  - https://favicon.io/
- **PWA Builder**: https://www.pwabuilder.com/
  - PWA Builder에서 manifest.json을 업로드하면 필요한 모든 아이콘을 생성해줍니다.

### 4. 아이콘 디자인 권장사항
- 배경색: #003c71 (한양대 메인 컬러)
- 로고/텍스트: "HY-Compass" 또는 "HYC"
- 최소 512x512 크기의 원본 이미지 준비
- 투명 배경 또는 단색 배경 사용

## 로컬 테스트 방법

### 1. 로컬 서버 실행
PWA는 HTTPS 또는 localhost에서만 작동합니다. 다음 중 하나를 사용하세요:

**Python (권장):**
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Node.js (http-server):**
```bash
npm install -g http-server
http-server -p 8000
```

**VS Code Live Server 확장 프로그램 사용**

### 2. 브라우저에서 테스트
1. `http://localhost:8000/웹디자인초안.html` 접속
2. Chrome DevTools > Application > Service Workers에서 등록 확인
3. Chrome DevTools > Application > Manifest에서 manifest 확인
4. Application > Storage에서 캐시 확인

### 3. 모바일에서 테스트
1. 컴퓨터와 같은 네트워크에 연결
2. 컴퓨터의 로컬 IP 주소 확인 (예: 192.168.0.100)
3. 모바일 브라우저에서 `http://192.168.0.100:8000/웹디자인초안.html` 접속
4. 모바일에서 "홈 화면에 추가" 기능 테스트

## 배포 시 주의사항

1. **HTTPS 필수**: PWA 기능은 HTTPS 또는 localhost에서만 작동합니다.
2. **Service Worker 경로**: Service Worker는 루트 또는 상위 디렉토리에서만 등록 가능합니다.
3. **아이콘 경로**: 모든 아이콘 파일이 올바른 경로에 있는지 확인하세요.
4. **캐시 전략**: Service Worker의 캐시 전략을 프로덕션에 맞게 조정하세요.

## PWA 기능 확인

### 설치 가능 여부 확인
- Chrome: 주소창 오른쪽에 설치 아이콘 표시
- Safari (iOS): 공유 메뉴에서 "홈 화면에 추가"
- Android: Chrome에서 "홈 화면에 추가" 또는 설치 프롬프트

### 오프라인 테스트
1. Chrome DevTools > Network > Offline 체크
2. 페이지 새로고침
3. 캐시된 콘텐츠가 표시되는지 확인

## 추가 최적화

### 성능 최적화
- 이미지 최적화 (WebP 형식 사용)
- CSS/JS 최소화
- 폰트 최적화
- 지연 로딩 (Lazy Loading)

### 기능 추가 가능
- 푸시 알림
- 백그라운드 동기화
- 오프라인 폼 제출
- 오프라인 맵 지원

## 문제 해결

### Service Worker가 등록되지 않는 경우
- HTTPS 또는 localhost인지 확인
- Service Worker 파일 경로 확인
- 브라우저 콘솔에서 에러 확인

### 아이콘이 표시되지 않는 경우
- 아이콘 파일 경로 확인
- manifest.json의 아이콘 경로 확인
- 파일 크기와 형식 확인 (PNG 권장)

### 모바일에서 설치가 안 되는 경우
- HTTPS 사용 확인
- manifest.json의 display 모드 확인
- Service Worker 등록 확인
- 브라우저 호환성 확인

