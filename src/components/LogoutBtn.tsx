"use client";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react'

export default function () {
  const {push, refresh} = useRouter()
  async function handleLogout() {
    try {
      await axios.get("/api/users/logout");
      push("/login")
      refresh();
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
        <button className="btn btn-ascent btn-sm" onClick={handleLogout}>Logout</button>
    </>
  )
}
