import LoginForm from "@/components/LoginForm";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login - Expense Tracker ",
  description: "Login Page",
};

export default function Login() {
  
  return (
    <>
      <div className="hero min-h-screen flex flex-col justify-center items-center gap-5 ">
        <h1 className="text-2xl font-bold ">Expense Tracker</h1>
        <div className="card shrink-0 w-full max-w-md shadow-xl bg-base-100 ">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
