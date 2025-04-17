
// 관리자 승인 기반 사용자 시스템 + 권한 부여 기능 + 승인/거부/삭제 버튼 + 전화번호 입력 및 사용자 정보 표시 + 관리자 직접 ID/PW 생성 + 비밀번호 표시 기능 추가
// React + 로컬 상태 기반 예시 + 고급 디자인 적용 + PC 중앙정렬 + 모바일 반응형

import React, { useState } from "react";

const initialUsers = [
  { email: "admin@gorea.com", password: "admin123", phone: "010-0000-0000", role: "admin", approved: true },
  { email: "manager@gorea.com", password: "manager123", phone: "010-1234-5678", role: "manager", approved: true },
  { email: "staff@gorea.com", password: "1234", phone: "010-5555-9999", role: "user", approved: false },
];

export default function LoginSystem() {
  const [users, setUsers] = useState(initialUsers);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [role, setRoleInput] = useState("user");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [mode, setMode] = useState("login"); // "login" | "reset"

  const handleLogin = () => {
    const user = users.find(u => u.email === email && u.password === password);
    if (!user) return setError("이메일 또는 비밀번호가 틀렸습니다.");
    if (!user.approved) return setError("관리자 승인이 필요합니다.");
    setLoggedInUser(user);
    setError("");
  };

  const handleSignup = () => {
    const exists = users.some(u => u.email === email);
    if (exists) return setError("이미 존재하는 이메일입니다.");
    const newUser = { email, password, phone, role: "user", approved: false };
    setUsers(prev => [...prev, newUser]);
    setIsSignup(false);
    setEmail("");
    setPassword("");
    setPhone("");
    setError("회원가입 완료! 관리자 승인 후 로그인 가능합니다.");
  };

  const approveUser = (email, role = "user") => {
    setUsers(prev =>
      prev.map(user =>
        user.email === email ? { ...user, approved: true, role } : user
      )
    );
  };

  const rejectUser = (email) => {
    setUsers(prev => prev.filter(user => user.email !== email));
  };

  const setRole = (email, role) => {
    setUsers(prev =>
      prev.map(user =>
        user.email === email ? { ...user, role } : user
      )
    );
  };

  const createUserByAdmin = () => {
    const exists = users.some(u => u.email === email);
    if (exists) return setError("이미 존재하는 이메일입니다.");
    const newUser = { email, password, phone, role, approved: true };
    setUsers(prev => [...prev, newUser]);
    setEmail("");
    setPassword("");
    setPhone("");
    setRoleInput("user");
    setError("사용자가 생성되었습니다.");
  };

  if (loggedInUser) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
        <div className="w-full max-w-4xl bg-white p-8 shadow-xl rounded-xl">
          <h1 className="text-3xl font-bold text-blue-800 mb-4">환영합니다, {loggedInUser.email}</h1>
          <p className="mb-2 text-gray-700">권한: <strong>{loggedInUser.role}</strong></p>

          {loggedInUser.role === "admin" && (
            <>
              <div className="mt-6 border-t pt-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">승인 대기 사용자</h2>
                <ul className="space-y-2">
                  {users.filter(u => !u.approved).map((u, i) => (
                    <li key={i} className="text-gray-700">
                      이메일: {u.email}, 전화번호: {u.phone}, 권한: {u.role}
                      <select className="ml-2 px-2 py-1 border rounded text-sm" onChange={e => setRole(u.email, e.target.value)} value={u.role}>
                        <option value="user">사용자</option>
                        <option value="manager">매니저</option>
                        <option value="admin">관리자</option>
                      </select>
                      <button className="ml-3 px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600" onClick={() => approveUser(u.email, u.role)}>승인</button>
                      <button className="ml-2 px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600" onClick={() => rejectUser(u.email)}>거부</button>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 border-t pt-6">
                <h2 className="text-xl font-semibold mb-2">관리자 직접 사용자 등록</h2>
                <input placeholder="이메일" className="border rounded p-2 mr-2" value={email} onChange={e => setEmail(e.target.value)} />
                <input placeholder="비밀번호" className="border rounded p-2 mr-2" value={password} onChange={e => setPassword(e.target.value)} />
                <input placeholder="전화번호" className="border rounded p-2 mr-2" value={phone} onChange={e => setPhone(e.target.value)} />
                <select value={role} onChange={e => setRoleInput(e.target.value)} className="border rounded p-2 mr-2">
                  <option value="user">사용자</option>
                  <option value="manager">매니저</option>
                  <option value="admin">관리자</option>
                </select>
                <button onClick={createUserByAdmin} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">생성</button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return null;
}
