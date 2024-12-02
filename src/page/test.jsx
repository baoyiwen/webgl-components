// import React, { useState } from 'react';
// import './style.css';

// interface LoginProps {
//   onLogin?: (username: string, password: string) => void;
// }

// const Login: React.FC<LoginProps> = ({ onLogin }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onLogin?.(username, password);
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>用户登录</h2>
//         <form onSubmit={handleSubmit}>
//           <div className="form-item">
//             <input
//               type="text"
//               placeholder="用户名"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="form-item">
//             <input
//               type="password"
//               placeholder="密码"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>
//           <button type="submit" className="login-button">
//             登录
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
