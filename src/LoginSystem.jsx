// 관리자 승인 기반 사용자 시스템 + 로그인/회원가입 UI 추가
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

  if (!loggedInUser) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-3xl font-bold text-blue-600 text-center mb-4">GOREA 로그인</h1>
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

          <input
            type="email"
            placeholder="이메일"
            className="w-full mb-2 p-2 border rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="비밀번호"
              className="w-full mb-2 p-2 border rounded"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <button
              type="button"
              className="absolute right-2 top-2 text-gray-500 text-sm"
              onClick={() => setShowPassword(!showPassword)}
            >👁️</button>
          </div>

          {isSignup && (
            <input
              type="text"
              placeholder="전화번호"
              className="w-full mb-2 p-2 border rounded"
              value={phone}
              onChange={e => setPhone(e.target.value)}
            />
          )}

          <button
            onClick={isSignup ? handleSignup : handleLogin}
            className="w-full bg-blue-500 text-white p-2 rounded mb-2 hover:bg-blue-600"
          >{isSignup ? "회원가입" : "로그인"}</button>

          <button
            onClick={() => setIsSignup(!isSignup)}
            className="w-full text-sm text-blue-600 hover:underline"
          >{isSignup ? "로그인 화면으로" : "회원가입"}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 font-sans">
      <div className="w-full max-w-4xl bg-white p-8 shadow-xl rounded-xl">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-extrabold text-blue-600">GOREA</h1>
        </div>
        <h2 className="text-2xl font-bold text-blue-800 mb-4">환영합니다, {loggedInUser.email}</h2>
        <p className="mb-2 text-gray-700">권한: <strong>{loggedInUser.role}</strong></p>
      </div>
    </div>
  );
}