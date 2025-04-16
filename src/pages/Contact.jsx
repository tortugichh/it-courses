import ContactForm from '../components/contact/ContactForm';
import Faq from '../components/contact/Faq';

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ContactForm />
        <Faq />
      </div>
    </div>
  );
};

export default Contact;