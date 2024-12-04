import { Card } from "@mui/material";
import Cards from "./Cards";
import Header from "../Title";
import Title from "../Title";

export default function ProductSection() {
  return (
    <div className="mt-24">
      <Title text="Products" />
      <div className="max-w-[100vw] grid md:grid-cols-2 lg:grid-cols-4 justify-center gap-6 mt-24">
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </div>
  );
}
