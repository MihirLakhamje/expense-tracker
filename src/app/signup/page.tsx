import SignupForm from "@/components/SignupForm";


export default function Signup() {
  
  return (
    <>
      <div className="hero min-h-screen flex flex-col justify-center items-center gap-5 ">
        <h1 className="text-2xl font-bold ">Expense Tracker</h1>
        <div className="card shrink-0 w-full max-w-md shadow-xl bg-base-100 ">
          <SignupForm />
        </div>
      </div>
    </>
  );
}
