import AboutCard from "./AboutCard";
import ContactForm from "./ContactForm";
import Title from "./Title";

export default function AboutSection() {
  return (
    <>
      <section className="relative">
        <Title text="Contact" />
        <div className="bg-backDropPink w-full h-[800px] flex flex-col md:flex-row">
          <div className="w-full md:md:w-1/2 pl-4 py-20">
            <ContactForm />
          </div>
          <AboutCard />
        </div>
      </section>
    </>
  );
}
