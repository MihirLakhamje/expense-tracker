"use client";

import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";

type Input = {
  name: string;
  email: string;
  password: string;
};

const loginSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export default function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>({
    resolver: yupResolver(loginSchema),
  });

  const {push} = useRouter()

  async function handleLogin(data: Input) {
    try {
      await axios.post("/api/users/signup", data);
      push("/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form className="card-body" onSubmit={handleSubmit(handleLogin)}>
        <h2 className="text-xl font-bold">Create a new account</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="input input-bordered"
            {...register("name")}
          />
        </div>
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
            <Link href={"/"} className="label-text-alt link link-hover">
              Already have an account?
            </Link>
          </label>
        </div>
        <div className="form-control mt-3">
          <button type="submit" className="btn btn-primary">Continue</button>
        </div>
      </form>
    </>
  );
}
