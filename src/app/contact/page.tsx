import { Metadata } from 'next';

import { ContactForm } from '@/components/forms/contact-form';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with us',
};

export default function ContactPage() {
  return (
    <main className='container mx-auto py-10'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-3xl font-bold mb-8'>Contact Us</h1>
        <ContactForm />
      </div>
    </main>
  );
}
