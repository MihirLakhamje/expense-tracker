"use client";

import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

type Input = {
  email: string;
  password: string;
};

const loginSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: yupResolver(loginSchema),
  });

  const {refresh, push} = useRouter()

  async function handleLogin(data: Input) {
    try {
      await axios.post("/api/users/login", data);
      push("/");
      refresh();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <h2 className="text-xl font-bold">Welcome, back!</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            type="email"
            placeholder="email"
            className="input input-bordered"
            {...register("email")}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            type="password"
            placeholder="password"
            className="input input-bordered"
            {...register("password")}
          />
          <label className="label">
            <Link href={"/signup"} className="label-text-alt link link-hover">
              Create an account?
            </Link>
          </label>
        </div>
        <div className="form-control mt-3">
          <button className="btn btn-primary">Continue</button>
        </div>
      </form>
    </>
  );
}
