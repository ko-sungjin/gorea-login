
// 관리자 승인 기반 사용자 시스템 + 권한 부여 기능 + 승인/거부/삭제 버튼 + 전화번호 입력 및 사용자 정보 표시 + 관리자 직접 ID/PW 생성 + 비밀번호 표시 기능 추가
// React + 로컬 상태 기반 예시 + 고급 디자인 적용

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
      <div className="p-8 max-w-3xl mx-auto bg-white shadow-xl rounded-xl font-sans">
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
    );
  }

  return (
    mode === "reset" ? (
      <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-xl font-sans">
        <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">비밀번호 찾기</h1>
        <input type="email" placeholder="가입된 이메일을 입력하세요" className="w-full border rounded-md p-3 mb-4" value={email} onChange={e => setEmail(e.target.value)} />
        <button onClick={() => setError("(예시) 비밀번호는 '1234'입니다.")} className="w-full bg-blue-600 text-white py-3 rounded mb-3">임시 비밀번호 확인</button>
        <button onClick={() => { setError(""); setEmail(""); setMode("login"); }} className="w-full border py-3 rounded">로그인으로 돌아가기</button>
          {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
        </div>
    ) : (
      <div className="p-8 max-w-md mx-auto bg-white shadow-lg rounded-xl font-sans">
        <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">GOREA {isSignup ? "회원가입" : "로그인"}</h1>
        <input type="email" placeholder="이메일 입력" className="w-full border rounded-md p-3 mb-4" value={email} onChange={e => setEmail(e.target.value)} />
        <div className="relative mb-4">
          <input type={showPassword ? "text" : "password"} placeholder="비밀번호 입력" className="w-full border rounded-md p-3 pr-10" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="button" onClick={() => setShowPassword(prev => !prev)} className="absolute right-3 top-3 text-gray-500">👁️</button>
        </div>
        {isSignup && (
          <input type="tel" placeholder="전화번호 입력" className="w-full border rounded-md p-3 mb-4" value={phone} onChange={e => setPhone(e.target.value)} />
        )}
        {isSignup ? (
          <>
            <button onClick={handleSignup} className="w-full bg-green-600 text-white py-3 rounded mb-3">회원가입</button>
            <button onClick={() => setIsSignup(false)} className="w-full border py-3 rounded">로그인으로 돌아가기</button>
          </>
        ) : (
          <>
            <button onClick={handleLogin} className="w-full bg-blue-600 text-white py-3 rounded mb-3">로그인</button>
            <button onClick={() => setIsSignup(true)} className="w-full border py-3 rounded">회원가입 하기</button>
            <button onClick={() => setMode("reset")} className="w-full text-sm text-blue-600 mt-2 underline">비밀번호를 잊으셨나요?</button>
          </>
        )}
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    )
  );
}
