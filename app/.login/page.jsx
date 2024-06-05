import Image from 'next/image'
import Form from '@/components/form'
import Link from 'next/link'

export default function Login() {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-50">
      <div className="z-10 w-full max-w-md overflow-hidden rounded-2xl border shadow-xl">
        <div className="flex flex-col items-center justify-center space-y-3 border-b bg-white px-4 py-6 pt-8 text-center sm:px-16">
          <h3 className="text-xl font-semibold text-primary">Sign In</h3>
          <p className="text-sm text-gray-500">
            Use your email and password to sign in
          </p>
        </div>
        <Form type="login" />
      </div>
    </div>
  )
}
// "use client"
// import { useState } from "react";
// import Link from "next/link";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");

//   const validateForm = () => {
//     let isValid = true;

//     // Validate email
//     if (!email || !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(email)) {
//       setEmailError("Enter a valid email address");
//       isValid = false;
//     } else {
//       setEmailError("");
//     }

//     // Validate password (you can add more complex validation)
//     if (!password) {
//       setPasswordError("Password is required");
//       isValid = false;
//     } else {
//       setPasswordError("");
//     }

//     return isValid;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (validateForm()) {
//       // Perform your login logic here
//       console.log("Form submitted:", { email, password });
//     }
//   };

//   return (
//     <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
//       <div className="w-full p-6 bg-white rounded-md shadow-md lg:max-w-xl">
//         <h1 className="text-3xl font-bold text-center text-gray-700">Logo</h1>
//         <form className="mt-6" onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label
//               htmlFor="email"
//               className="block text-sm font-semibold text-gray-800"
//             >
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
//             />
//             {emailError && (
//               <p className="text-red-500 text-sm">{emailError}</p>
//             )}
//           </div>
//           <div className="mb-2">
//             <label
//               htmlFor="password"
//               className="block text-sm font-semibold text-gray-800"
//             >
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md focus:border-gray-400 focus:ring-gray-300 focus:outline-none focus:ring focus:ring-opacity-40"
//             />
//             {passwordError && (
//               <p className="text-red-500 text-sm">{passwordError}</p>
//             )}
//           </div>
//           <Link
//             href="/forget"
//             className="text-xs text-blue-600 hover:underline"
//           >
//             Forget Password?
//           </Link>
//           <div className="mt-2">
//             <button
//               type="submit"
//               className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
//             >
//               Login
//             </button>
//           </div>
//         </form>

//         <p className="mt-4 text-sm text-center text-gray-700">
//           Don't have an account?{" "}
//           <Link
//             href="/signup"
//             className="font-medium text-blue-600 hover:underline"
//           >
//             Sign up
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
