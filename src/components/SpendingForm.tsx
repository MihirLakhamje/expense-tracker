"use client";

import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

type Input = {
  title: string;
  amount: number;
  category: string;
};

const spendingSchema = yup.object({
  title: yup.string().required(),
  amount: yup.number().min(0, "Amount cannot be negative").required("Amount is required"),
  category: yup.string().required(),
});

export default function SpendingForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Input>({
    resolver: yupResolver(spendingSchema),
  });

  const { refresh, push } = useRouter();

  async function handleLogin(data: Input) {
    try {
      await axios.post("/api/spendings/add", data);
      push("/");
      refresh();
      reset();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <form className="card-body p-2" onSubmit={handleSubmit(handleLogin)}>
        <Link
          title="back"
          href={"/"}
          className="btn btn-neutral btn-sm  btn-square mb-2"
        >
          <ArrowLeft />
        </Link>
        <h2 className="text-xl font-bold">What you spent on?</h2>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Title</span>
          </label>
          <input
            type="text"
            placeholder="Title"
            className="input input-bordered"
            {...register("title")}
          />
          {errors.title && (
            <div className="label">
              <span className="label-text-alt text-error font-medium">
                {errors.title.message}
              </span>
            </div>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Amount</span>
          </label>
          <input
            type="number"
            min={0}
            placeholder="Amount that you spent"
            className="input input-bordered"
            {...register("amount")}
          />
          {errors.amount && (
            <div className="label">
              <span className="label-text-alt text-error font-medium">
                {"amount is required"}
              </span>
            </div>
          )}
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <input
            type="text"
            placeholder="category (e.g. food, travel, etc.)"
            className="input input-bordered"
            {...register("category")}
          />
        </div>
        <div className="form-control mt-3">
          <button className="btn btn-primary w-full sm:w-fit">Save</button>
        </div>
      </form>
    </>
  );
}
