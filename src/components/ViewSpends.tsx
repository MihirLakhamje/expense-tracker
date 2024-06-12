"use client";

import axios from "axios";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

type Input = {
  title: string;
  amount: number;
  category: string;
};

const spendingSchema = yup.object({
  title: yup.string().required(),
  amount: yup.number().min(0).required(),
  category: yup.string().required(),
});

interface data {
  title: string;
  amount: number;
  category: string;
}

export default function ViewSpends() {
  const { id } = useParams();
  const [oldData, setOldData] = useState<data>();
  const [success, setSuccess] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Input>({
    resolver: yupResolver(spendingSchema),
  });

  async function getData() {
    try {
      const { data } = await axios.get(`/api/spendings/${id}`);
      setOldData(data);
    } catch (error) {
      console.log(error);
    }
  }

  const { refresh, push } = useRouter();

  async function handleUpdate(newData: Input) {
    try {
      await axios.patch(`/api/spendings/${id}/edit`, { newData: newData });
      // push("/");
      await getData();
      setSuccess(true);
      refresh();
      reset();
    } catch (error) {
      console.log(error);
      setSuccess(false);
    }
  }

  async function handleDelete() {
    try {
      await axios.delete(`/api/spendings/${id}/delete`);
      push("/");
      refresh();
    } catch (error: any) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {success && (
        <div className="toast" onClick={() => setSuccess(false)}>
          <div className="alert alert-info">
            <span>Updated Successfully</span>
          </div>
        </div>
      )}
      <form className="card-body p-2" onSubmit={handleSubmit(handleUpdate)}>
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
            defaultValue={oldData?.title}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Amount</span>
          </label>
          <input
            type="text"
            min={0}
            placeholder="Amount that you spent"
            className="input input-bordered"
            {...register("amount")}
            defaultValue={oldData?.amount}
          />
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
            defaultValue={oldData?.category}
          />
        </div>
        <div className="flex gap-5 mt-3 ">
          <button type="submit" className="btn btn-success btn-square ">
            <Save />
          </button>
          <button onClick={handleDelete} className="btn btn-error btn-square">
            <Trash2 />
          </button>
        </div>
      </form>
    </>
  );
}
