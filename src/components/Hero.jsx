import { Button } from "./ui";

function Hero() {
  return (
    
<section className="bg-gradient-to-r from-emerald-500 via-teal-400 to-sky-400 dark:from-slate-950 dark:via-gray-900 dark:to-black text-white text-center py-24 px-6">
      <h1 className="text-5xl md:text-6xl font-bold mb-6">
        Escape Into Nature
      </h1>

      <p className="text-xl mb-8">
        Direct bookings. Zero commission. Pure mountain experience.
      </p>

      

<Button variant="primary" size="lg">
  Book Your Stay
</Button>

    </section>
  );
}

export default Hero;