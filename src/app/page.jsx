import Image from "next/image";
import Form from "@/Components/form";
import BrandNameCard from "@/Components/BrandNameCard";

export default function Login() {
  return (
    <div className="flex flex-col gap-8 h-screen w-screen items-center justify-center bg-transparent">
      <BrandNameCard />
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
  );
}