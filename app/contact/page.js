import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div className="bg-[url('/gemini-generated-background.png')] bg-cover bg-center h-[75vh] flex items-center justify-center relative">
      <div className="w-4/5 md:w-3/5">
        <ContactForm />;
      </div>
    </div>
  );
}
