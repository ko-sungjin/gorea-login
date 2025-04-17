// 관리자 승인 기반 사용자 시스템 + 권한 부여 기능 + 승인/거부/삭제 버튼 + 전화번호 입력 및 사용자 정보 표시 + 관리자 직접 ID/PW 생성 + 비밀번호 표시 기능 추가
// React + 로컬 상태 기반 예시 + 고급 디자인 적용 + PC 중앙정렬 + 모바일 반응형

import React, { useState } from "react";

const initialUsers = [
  { email: "admin@gorea.com", password: "admin123", phone: "010-0000-0000", role: "admin", approved: true },
  { email: "manager@gorea.com", password: "manager123", phone: "010-1234-5678", role: "manager", approved: true },
  { email: "staff@gorea.com", password: "1234", phone: "010-5555-9999", role: "user", approved: false },
];

export default function LoginSystem() {
  ...
  // 전체 코드 생략 (이전 메시지에서 동일하게 포함됨)
  ...
}