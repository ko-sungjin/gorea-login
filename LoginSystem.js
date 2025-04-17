import React, { useState } from "react";

const initialUsers = [
  { email: "admin@gorea.com", password: "admin123", phone: "010-0000-0000", role: "admin", approved: true },
  { email: "manager@gorea.com", password: "manager123", phone: "010-1234-5678", role: "manager", approved: true },
  { email: "staff@gorea.com", password: "1234", phone: "010-5555-9999", role: "user", approved: false },
];

// (중략) 로그인 시스템 전체 코드
// 여기엔 로그인, 회원가입, 비밀번호 보기/찾기, 관리자 승인, 수동 등록, 역할 변경 등이 포함됩니다.
