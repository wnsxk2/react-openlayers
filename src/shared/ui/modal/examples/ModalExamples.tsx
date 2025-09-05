import React, { useState } from 'react';
import { 
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  ConfirmModal,
  useModal,
  buttonStyles 
} from '../index';
import { css } from '@emotion/react';

export const ModalExamples: React.FC = () => {
  // 기본 모달
  const basicModal = useModal();
  
  // 크기별 모달
  const smallModal = useModal();
  const largeModal = useModal();
  const fullModal = useModal();
  
  // 변형별 모달
  const warningModal = useModal();
  const errorModal = useModal();
  const infoModal = useModal();
  
  // 확인 모달
  const [confirmModal, setConfirmModal] = useState(false);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);

  return (
    <div css={exampleContainer}>
      <h1>모달 디자인 시스템 예제</h1>
      
      {/* 기본 모달 */}
      <section css={sectionStyles}>
        <h2>기본 모달</h2>
        <button css={buttonStyles.primary} onClick={basicModal.open}>
          기본 모달 열기
        </button>
        
        <Modal isOpen={basicModal.isOpen} onClose={basicModal.close}>
          <ModalHeader>
            <h3>기본 모달</h3>
          </ModalHeader>
          <ModalBody>
            <p>이것은 기본 모달입니다. ESC 키를 누르거나 오버레이를 클릭하여 닫을 수 있습니다.</p>
            <p>포커스 트랩이 활성화되어 Tab 키로 요소간 이동이 제한됩니다.</p>
          </ModalBody>
          <ModalFooter>
            <button css={buttonStyles.secondary} onClick={basicModal.close}>
              취소
            </button>
            <button css={buttonStyles.primary} onClick={basicModal.close}>
              확인
            </button>
          </ModalFooter>
        </Modal>
      </section>

      {/* 크기별 모달 */}
      <section css={sectionStyles}>
        <h2>크기별 모달</h2>
        <div css={buttonGroup}>
          <button css={buttonStyles.primary} onClick={smallModal.open}>
            작은 모달 (sm)
          </button>
          <button css={buttonStyles.primary} onClick={largeModal.open}>
            큰 모달 (lg)
          </button>
          <button css={buttonStyles.primary} onClick={fullModal.open}>
            전체화면 모달 (full)
          </button>
        </div>

        <Modal isOpen={smallModal.isOpen} onClose={smallModal.close} size="sm">
          <ModalHeader>
            <h3>작은 모달</h3>
          </ModalHeader>
          <ModalBody>
            <p>작은 크기의 모달입니다.</p>
          </ModalBody>
        </Modal>

        <Modal isOpen={largeModal.isOpen} onClose={largeModal.close} size="lg">
          <ModalHeader>
            <h3>큰 모달</h3>
          </ModalHeader>
          <ModalBody scrollable>
            <p>큰 크기의 모달입니다.</p>
            <p>스크롤 가능한 내용이 많을 때 사용합니다.</p>
            {Array.from({ length: 20 }, (_, i) => (
              <p key={i}>스크롤 테스트를 위한 긴 내용 {i + 1}</p>
            ))}
          </ModalBody>
          <ModalFooter>
            <button css={buttonStyles.primary} onClick={largeModal.close}>
              닫기
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={fullModal.isOpen} onClose={fullModal.close} size="full">
          <ModalHeader>
            <h3>전체화면 모달</h3>
          </ModalHeader>
          <ModalBody>
            <p>전체화면을 차지하는 모달입니다.</p>
          </ModalBody>
          <ModalFooter>
            <button css={buttonStyles.primary} onClick={fullModal.close}>
              닫기
            </button>
          </ModalFooter>
        </Modal>
      </section>

      {/* 변형별 모달 */}
      <section css={sectionStyles}>
        <h2>변형별 모달</h2>
        <div css={buttonGroup}>
          <button css={buttonStyles.primary} onClick={warningModal.open}>
            경고 모달
          </button>
          <button css={buttonStyles.danger} onClick={errorModal.open}>
            오류 모달
          </button>
          <button css={buttonStyles.primary} onClick={infoModal.open}>
            정보 모달
          </button>
        </div>

        <Modal isOpen={warningModal.isOpen} onClose={warningModal.close} variant="warning">
          <ModalHeader>
            <h3>⚠️ 경고</h3>
          </ModalHeader>
          <ModalBody>
            <p>주의가 필요한 상황입니다.</p>
          </ModalBody>
          <ModalFooter>
            <button css={buttonStyles.primary} onClick={warningModal.close}>
              확인
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={errorModal.isOpen} onClose={errorModal.close} variant="error">
          <ModalHeader>
            <h3>❌ 오류</h3>
          </ModalHeader>
          <ModalBody>
            <p>오류가 발생했습니다.</p>
          </ModalBody>
          <ModalFooter>
            <button css={buttonStyles.danger} onClick={errorModal.close}>
              확인
            </button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={infoModal.isOpen} onClose={infoModal.close} variant="info">
          <ModalHeader>
            <h3>ℹ️ 정보</h3>
          </ModalHeader>
          <ModalBody>
            <p>참고할 정보입니다.</p>
          </ModalBody>
          <ModalFooter>
            <button css={buttonStyles.primary} onClick={infoModal.close}>
              확인
            </button>
          </ModalFooter>
        </Modal>
      </section>

      {/* 확인 모달 */}
      <section css={sectionStyles}>
        <h2>확인 모달</h2>
        <div css={buttonGroup}>
          <button css={buttonStyles.primary} onClick={() => setConfirmModal(true)}>
            일반 확인
          </button>
          <button css={buttonStyles.danger} onClick={() => setDeleteConfirmModal(true)}>
            삭제 확인
          </button>
        </div>

        <ConfirmModal
          isOpen={confirmModal}
          onClose={() => setConfirmModal(false)}
          onConfirm={() => alert('확인되었습니다!')}
          title="확인"
          message="이 작업을 계속하시겠습니까?"
        />

        <ConfirmModal
          isOpen={deleteConfirmModal}
          onClose={() => setDeleteConfirmModal(false)}
          onConfirm={() => alert('삭제되었습니다!')}
          title="삭제 확인"
          message="정말로 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다."
          variant="error"
          confirmText="삭제"
        />
      </section>
    </div>
  );
};

const exampleContainer = css`
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  
  h1 {
    margin-bottom: 40px;
    color: #333;
  }
`;

const sectionStyles = css`
  margin-bottom: 40px;
  padding-bottom: 40px;
  border-bottom: 1px solid #e0e0e0;
  
  h2 {
    margin-bottom: 20px;
    color: #555;
  }
`;

const buttonGroup = css`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;