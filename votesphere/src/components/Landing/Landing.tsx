import Contact from './Contact';
import Hero from './Hero';
import Services from './Services/Services';
import Us from './Us';

export default function Landing() {
  return (
    <main className="mx-6 md:mx-16 mt-10 md:mt-40">
      <Hero />
      <Services />
      <Us />
      <Contact />
    </main>
  );
}
