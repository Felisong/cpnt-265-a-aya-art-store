import { Card } from "@mui/material";
import Cards from "./Cards";
import Header from "../Title";
import Title from "../Title";

export default function ProductSection() {
  return (
    <div className="mt-24 w-full flex flex-col  mx-auto">
      <Title text="Products" />
      <div className="max-w-full grid md:grid-cols-2 lg:grid-cols-4 justify-center items-center gap-6 mt-24 md:mx-8 lg:mx-12">
        <Cards />
        <Cards />
        <Cards />
        <Cards />
      </div>
    </div>
  );
}
