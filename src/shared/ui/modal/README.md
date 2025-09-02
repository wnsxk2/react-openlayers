# Modal 디자인 시스템

프로젝트 전역에서 사용할 수 있는 모달 컴포넌트 시스템입니다.

## 특징

- 🎨 **일관된 디자인**: 프로젝트의 디자인 시스템을 따르는 통일된 스타일
- 📱 **반응형 디자인**: 모바일부터 데스크톱까지 최적화된 UI
- ♿ **접근성 준수**: WCAG 가이드라인을 따르는 키보드 네비게이션과 스크린 리더 지원
- 🔧 **유연한 구성**: 다양한 크기와 변형을 지원하는 컴포넌트
- 🎭 **애니메이션**: 부드러운 페이드인/아웃 효과
- 🎯 **포커스 관리**: 자동 포커스 트랩과 이전 포커스 복원
- 🚀 **TypeScript 완전 지원**: 타입 안전성과 개발자 경험 향상

## 컴포넌트

### 기본 컴포넌트
- `Modal`: 메인 모달 컨테이너
- `ModalHeader`: 모달 헤더 (제목, 닫기 버튼)
- `ModalBody`: 모달 본문 내용
- `ModalFooter`: 모달 푸터 (버튼들)

### 특수 컴포넌트
- `ConfirmModal`: 확인/취소 모달

### 훅
- `useModal`: 모달 상태 관리
- `useKeyboardHandler`: 키보드 이벤트 처리
- `useFocusTrap`: 포커스 트랩 기능

## 설치 및 사용법

### 기본 사용법

```tsx
import { Modal, ModalHeader, ModalBody, ModalFooter, useModal, buttonStyles } from '@/shared/ui/modal';

function MyComponent() {
  const modal = useModal();

  return (
    <>
      <button onClick={modal.open}>모달 열기</button>
      
      <Modal isOpen={modal.isOpen} onClose={modal.close}>
        <ModalHeader>
          <h3>제목</h3>
        </ModalHeader>
        <ModalBody>
          <p>모달 내용</p>
        </ModalBody>
        <ModalFooter>
          <button css={buttonStyles.secondary} onClick={modal.close}>
            취소
          </button>
          <button css={buttonStyles.primary} onClick={modal.close}>
            확인
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

### 크기 변형

```tsx
<Modal size="sm" isOpen={isOpen} onClose={onClose}>
  {/* 작은 모달 */}
</Modal>

<Modal size="lg" isOpen={isOpen} onClose={onClose}>
  {/* 큰 모달 */}
</Modal>

<Modal size="full" isOpen={isOpen} onClose={onClose}>
  {/* 전체화면 모달 */}
</Modal>
```

### 스타일 변형

```tsx
<Modal variant="warning" isOpen={isOpen} onClose={onClose}>
  {/* 경고 모달 */}
</Modal>

<Modal variant="error" isOpen={isOpen} onClose={onClose}>
  {/* 오류 모달 */}
</Modal>

<Modal variant="info" isOpen={isOpen} onClose={onClose}>
  {/* 정보 모달 */}
</Modal>
```

### 확인 모달

```tsx
import { ConfirmModal } from '@/shared/ui/modal';

function DeleteButton() {
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    // 삭제 로직
    console.log('삭제됨');
  };

  return (
    <>
      <button onClick={() => setShowConfirm(true)}>삭제</button>
      
      <ConfirmModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleDelete}
        title="삭제 확인"
        message="정말로 삭제하시겠습니까?"
        variant="error"
        confirmText="삭제"
        cancelText="취소"
      />
    </>
  );
}
```

### 스크롤 가능한 모달

```tsx
<Modal isOpen={isOpen} onClose={onClose} size="lg">
  <ModalHeader>
    <h3>긴 내용</h3>
  </ModalHeader>
  <ModalBody scrollable>
    {/* 긴 내용... */}
  </ModalBody>
  <ModalFooter>
    <button onClick={onClose}>닫기</button>
  </ModalFooter>
</Modal>
```

## API 참조

### Modal Props

| 프로퍼티 | 타입 | 기본값 | 설명 |
|---------|------|--------|------|
| `isOpen` | boolean | - | 모달 열림 상태 |
| `onClose` | () => void | - | 모달 닫기 핸들러 |
| `size` | 'sm' \| 'md' \| 'lg' \| 'xl' \| 'full' | 'md' | 모달 크기 |
| `variant` | 'default' \| 'confirm' \| 'warning' \| 'error' \| 'info' | 'default' | 모달 변형 |
| `closeOnOverlayClick` | boolean | true | 오버레이 클릭시 닫기 |
| `closeOnEscape` | boolean | true | ESC 키로 닫기 |
| `showCloseButton` | boolean | true | 닫기 버튼 표시 |

### ModalHeader Props

| 프로퍼티 | 타입 | 기본값 | 설명 |
|---------|------|--------|------|
| `children` | ReactNode | - | 헤더 내용 |
| `showCloseButton` | boolean | true | 닫기 버튼 표시 |
| `onClose` | () => void | - | 커스텀 닫기 핸들러 |

### ModalBody Props

| 프로퍼티 | 타입 | 기본값 | 설명 |
|---------|------|--------|------|
| `children` | ReactNode | - | 본문 내용 |
| `scrollable` | boolean | false | 스크롤 활성화 |

### ModalFooter Props

| 프로퍼티 | 타입 | 기본값 | 설명 |
|---------|------|--------|------|
| `children` | ReactNode | - | 푸터 내용 |
| `align` | 'left' \| 'center' \| 'right' | 'right' | 정렬 방식 |

### ConfirmModal Props

| 프로퍼티 | 타입 | 기본값 | 설명 |
|---------|------|--------|------|
| `isOpen` | boolean | - | 모달 열림 상태 |
| `onClose` | () => void | - | 모달 닫기 핸들러 |
| `onConfirm` | () => void | - | 확인 버튼 핸들러 |
| `title` | string | - | 모달 제목 |
| `message` | string | - | 확인 메시지 |
| `confirmText` | string | '확인' | 확인 버튼 텍스트 |
| `cancelText` | string | '취소' | 취소 버튼 텍스트 |
| `variant` | 'default' \| 'warning' \| 'error' | 'default' | 모달 변형 |
| `size` | 'sm' \| 'md' | 'sm' | 모달 크기 |

## 접근성 특징

- **키보드 네비게이션**: Tab, Shift+Tab으로 포커스 이동
- **ESC 키 지원**: ESC 키로 모달 닫기
- **포커스 트랩**: 모달 내부에서만 포커스 이동 가능
- **포커스 복원**: 모달 닫기 시 이전 포커스 위치로 복원
- **ARIA 속성**: role="dialog", aria-modal="true" 등 적절한 ARIA 속성 사용
- **스크린 리더 지원**: 적절한 레이블과 설명 제공

## 스타일 커스터마이징

```tsx
import { css } from '@emotion/react';
import { Modal } from '@/shared/ui/modal';

const customModalStyles = css`
  /* 커스텀 스타일 */
`;

<Modal className="custom-modal" css={customModalStyles}>
  {/* 내용 */}
</Modal>
```

## 예제

전체 예제는 `ModalExamples` 컴포넌트를 참고하세요.