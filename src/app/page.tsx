
import ViewAllSpendings from "@/components/ViewAllSpendings";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Expense Tracker - Home",
  description: "Home Page",
};

export default function Home() {
  return (
    <>
      <ViewAllSpendings/>
    </>
  );
}
