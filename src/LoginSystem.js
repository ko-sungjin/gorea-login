
import React, { useState } from "react";

const initialUsers = [
  { email: "admin@gorea.com", password: "admin123", role: "admin", approved: true },
  { email: "staff@gorea.com", password: "1234", role: "user", approved: false },
];

export default function LoginSystem() {
  const [users, setUsers] = useState(initialUsers);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    const newUser = { email, password, role: "user", approved: false };
    setUsers(prev => [...prev, newUser]);
    setIsSignup(false);
    setEmail("");
    setPassword("");
    setError("회원가입 완료! 관리자 승인 후 로그인 가능합니다.");
  };

  const approveUser = (email) => {
    setUsers(prev =>
      prev.map(user =>
        user.email === email ? { ...user, approved: true } : user
      )
    );
  };

  if (loggedInUser) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold">환영합니다, {loggedInUser.email}</h1>
        <p>권한: {loggedInUser.role}</p>
        {loggedInUser.role === "admin" && (
          <div className="mt-4 border-t pt-4">
            <h2 className="text-xl font-semibold">승인 대기 사용자 목록</h2>
            <ul className="mt-2 list-disc list-inside">
              {users.filter(u => !u.approved).map((u, i) => (
                <li key={i} className="mb-1">
                  {u.email} - 승인 필요
                  <button
                    className="ml-2 px-2 py-1 text-sm bg-green-100 border rounded"
                    onClick={() => approveUser(u.email)}
                  >
                    승인하기
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">GOREA {isSignup ? "회원가입" : "로그인"}</h1>
      <input
        type="email"
        placeholder="이메일 입력"
        className="w-full border p-2 mb-2"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호 입력"
        className="w-full border p-2 mb-2"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {isSignup ? (
        <>
          <button
            onClick={handleSignup}
            className="w-full bg-green-600 text-white py-2 rounded mb-2"
          >
            회원가입
          </button>
          <button
            onClick={() => setIsSignup(false)}
            className="w-full border py-2 rounded"
          >
            로그인으로 돌아가기
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded mb-2"
          >
            로그인
          </button>
          <button
            onClick={() => setIsSignup(true)}
            className="w-full border py-2 rounded"
          >
            회원가입 하기
          </button>
        </>
      )}
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
}
