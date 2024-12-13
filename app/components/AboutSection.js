import AboutCard from "./AboutCard";
import ContactForm from "./ContactForm";
import Title from "./Title";

export default function AboutSection() {
  return (
    <>
      <section className="">
        <Title text="Contact" />
        <div className="bg-backDropPink w-full flex flex-col md:flex-row md:justify-around">
          <div className="w-full py-20 px-2 md:pl-2 md:md:w-1/2 ">
            <ContactForm />
          </div>
          <AboutCard />
        </div>
      </section>
    </>
  );
}
