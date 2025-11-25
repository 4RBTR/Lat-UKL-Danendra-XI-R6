import { redirect } from "next/navigation";

export default function RootPage() {
  // Langsung arahkan pengguna ke /Main/Home
  redirect("/Main/Home");
}