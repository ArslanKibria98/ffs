// 'use client'
// import { signOut } from 'next-auth/react'
// import { LogOut } from 'lucide-react'
// import { useRouter } from 'next/navigation'

// export default function SignOut() {
//   const router = useRouter()

//   const handleSignOut = async () => {
//     console.log('called')
//     await signOut()
//     localStorage.setItem('isLoggedIn', false)

//     router.push('/') // Redirect to the login page after signing out
//   }

//   return (
//     <button
//       className="flex items-center border rounded-xl p-2 w-full hover:bg-white hover:text-red-500 duration-200"
//       onClick={handleSignOut}
//     >
//       <LogOut className="mr-3 rotate-180" fontSize={14} /> Signout
//     </button>
//   )
// }
