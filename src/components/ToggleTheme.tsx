"use client";
import { useTheme } from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function ToggleTheme() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      <label className="flex cursor-pointer gap-2">
        <Sun/>
        <input
          type="checkbox"
          checked={isDarkMode}
          onChange={toggleTheme}
          className="toggle theme-controller"
        />
        <Moon/>
      </label>
    </>
  );
}
