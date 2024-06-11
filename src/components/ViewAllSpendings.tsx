"use client";
import axios from "axios";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

export default function ViewAllSpendings() {
  const [spending, setSpendings] = React.useState([]);
  const [totalAmount, setTotalAmount] = React.useState(0);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get("/api/spendings/all");
        setSpendings(data.spendings);
        setTotalAmount(data.totalAmount);
      } catch (error) {
        console.log(error);
      }
    }

    fetchData();
  }, []);

  async function handleDelete(id: string): Promise<void> {
    try {
      await axios.delete(`/api/spendings/${id}/delete`);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="flex items-center gap-4">
        <Link href={"/add"} className="btn btn-primary btn-sm">
          Add Spendings <Plus />
        </Link>
        <span>Total Amount: &#8377; {totalAmount || 0}/-</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-5">
        {spending &&
          spending.map((spending: any) => (
            <div className="card  bg-base-100 border" key={spending._id}>
              <div className="card-body p-4">
                <div className="flex justify-between">
                  <h2 className="card-title">{spending.title}</h2>
                  <div className="flex gap-2">
                    <Link
                      href={`/${spending._id}`}
                      className="btn btn-ascent btn-xs btn-square self-end"
                    >
                      <Pencil size={16} />
                    </Link>
                  </div>
                </div>
                <span className="text-sm">₹ {spending.amount}/-</span>
                <span className="text-xs">{spending.category}</span>
                <div className="flex justify-between mt-5">
                  <button
                    onClick={() => handleDelete(spending._id)}
                    className="btn btn-error btn-xs btn-square self-end"
                  >
                    <Trash2 size={16} />
                  </button>
                  <span className="text-xs self-end text-gray-400">
                    {new Intl.DateTimeFormat("ind", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    }).format(new Date(spending.createdAt))}
                  </span>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}
