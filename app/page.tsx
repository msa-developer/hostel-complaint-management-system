import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Product from "./components/Product";
import How from "./components/How";
import Social from "./components/Social";
import Closing from "./components/Closing";

export default function Home() {
  return (
    <div className="min-h-full">
      <Navbar />
      <main id="top">
        <Hero />
        <Product />
        <How />
        <Social />
        <Closing />
      </main>
    </div>
  );
}
