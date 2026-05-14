import { useState } from "react";
import { Phone, Mail, MapPin, ArrowRight, Leaf, Coffee, Package, Sparkles, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";

import hero from "@/assets/hero.jpg";
import fishSauce from "@/assets/fish-sauce.jpg";
import rice from "@/assets/rice.jpg";
import ricePaper from "@/assets/rice-paper.jpg";
import pho from "@/assets/pho.jpg";
import coffee from "@/assets/coffee.jpg";
import driedFruit from "@/assets/dried-fruit.jpg";
import spices from "@/assets/spices.jpg";

const products = [
  { img: fishSauce, name: "Red Boat Fish Sauce", desc: "Premium Nước Mắm — small-batch, naturally fermented." },
  { img: rice, name: "Three Ladies Jasmine Rice", desc: "Fragrant long-grain jasmine rice from Thailand." },
  { img: ricePaper, name: "Three Ladies Rice Paper", desc: "Soft, pliable bánh tráng for fresh spring rolls." },
  { img: pho, name: "Acecook Hảo Hảo Pho", desc: "Authentic instant pho with rich, savory broth." },
  { img: coffee, name: "Trung Nguyên Coffee", desc: "Bold Vietnamese robusta — strong, smooth, iconic." },
  { img: driedFruit, name: "Vinamit Dried Fruit", desc: "Crispy dried jackfruit & mango snacks." },
  { img: spices, name: "DH Foods Spices", desc: "Traditional chili salt, seasonings & spice blends." },
];

const categories = [
  { icon: Leaf, title: "Grocery Essentials", desc: "Sauces, rice, noodles & pantry staples." },
  { icon: Coffee, title: "Beverages & Coffee", desc: "Vietnamese coffee, teas, and refreshments." },
  { icon: Package, title: "Bulk & Distribution", desc: "Wholesale trading for retailers & restaurants." },
  { icon: Sparkles, title: "Specialty Imports", desc: "Hand-picked authentic regional products." },
];

const sections = [
  { id: "products", label: "Products" },
  { id: "story", label: "Story" },
  { id: "deal", label: "What We Do" },
  { id: "contact", label: "Contact" },
];


export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Replace YOUR_FORM_ID with your Formspree form ID from https://formspree.io
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((v, k) => {
      data[k] = typeof v === "string" ? v : "";
    });

    if (!data.name?.trim() || !data.email?.trim() || !data.message?.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      toast.success("Thank you! We'll be in touch shortly.");
      form.reset();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Toaster position="top-center" />

      {/* Nav */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-background/75 border-b border-border/50">
        <nav className="mx-auto max-w-6xl px-5 py-4 flex items-center justify-between">
          <a href="#top" className="flex flex-col leading-tight">
            <span className="font-serif text-xl font-semibold tracking-tight">Tranh Pham</span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">F&B Trading</span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="text-sm text-foreground/80 hover:text-foreground transition-colors">
                {s.label}
              </a>
            ))}
          </div>
          <button
            className="md:hidden p-2 -mr-2 rounded-full hover:bg-muted"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
        {menuOpen && (
          <div className="md:hidden border-t border-border/50 bg-background/95">
            <div className="px-5 py-3 flex flex-col gap-1">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  onClick={() => setMenuOpen(false)}
                  className="py-3 text-base text-foreground/85"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="top" className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-5 pt-16 pb-20 md:pt-28 md:pb-32 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="font-serif text-7xl sm:text-8xl md:text-9xl font-bold leading-[0.9] tracking-tight">
              Tranh<br />Pham
            </h1>
          </div>
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Authentic Vietnamese Trading
            </span>
            <p className="text-base sm:text-lg text-muted-foreground max-w-md">
              Food & Beverage Trading LLC — bringing the rich, authentic flavors of Vietnam to your table and your business.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Button asChild size="lg" className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-md">
                <a href="#products">
                  Explore Products <ArrowRight className="ml-1.5 h-4 w-4" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full border-foreground/15 bg-card hover:bg-secondary">
                <a href="#contact">Get in Touch</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products carousel */}
      <section id="products" className="py-16 md:py-24 bg-card/60">
        <div className="mx-auto max-w-6xl">
          <div className="px-5 flex items-end justify-between mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-primary font-medium mb-3">Our Selection</p>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold">Featured Products</h2>
            </div>
            <span className="hidden sm:block text-xs text-muted-foreground">← swipe →</span>
          </div>

          <div className="no-scrollbar snap-x-mandatory flex gap-5 overflow-x-auto px-5 pb-4">
            {products.map((p) => (
              <article
                key={p.name}
                className="snap-start shrink-0 w-[78%] sm:w-[46%] md:w-[31%] bg-card rounded-3xl overflow-hidden border border-border/60 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="aspect-square bg-secondary/40 overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.name}
                    loading="lazy"
                    width={768}
                    height={768}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-lg font-semibold mb-1.5">{p.name}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section id="story" className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-5 text-center">
          <p className="text-xs uppercase tracking-[0.22em] text-primary font-medium mb-3">Our Story</p>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">
            Rooted in tradition, built on trust.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Tranh Pham is a trusted Vietnamese food & beverage trading company dedicated to sourcing
            authentic, high-quality products from the heart of Vietnam. From family-run fish sauce
            makers to premium coffee growers, we partner with reliable producers to bring genuine
            flavors to retailers, restaurants, and homes around the world.
          </p>
        </div>
      </section>

      {/* What we deal in */}
      <section id="deal" className="py-16 md:py-24 bg-secondary/40">
        <div className="mx-auto max-w-6xl px-5">
          <div className="text-center mb-12">
            <p className="text-xs uppercase tracking-[0.22em] text-primary font-medium mb-3">What We Deal In</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold">A taste of everything Vietnam</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((c) => (
              <div
                key={c.title}
                className="bg-card rounded-3xl p-7 border border-border/60 shadow-sm hover:shadow-md transition-all"
              >
                <div className="h-12 w-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-5">
                  <c.icon className="h-6 w-6 text-foreground" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-2">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-5 grid md:grid-cols-2 gap-12">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-primary font-medium mb-3">Contact</p>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold mb-6">Let's talk trade.</h2>
            <p className="text-muted-foreground mb-8">
              Whether you're a retailer, restaurateur, or distributor — we'd love to hear from you.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">Phone</div>
                  <a href="tel:+97145759367" className="font-medium hover:text-primary">+971-04-575 9367</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">Email</div>
                  <a href="mailto:info@tranhpham.com" className="font-medium hover:text-primary">info@tranhpham.com</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="text-sm text-muted-foreground">Office</div>
                  <div className="font-medium leading-relaxed">
                    Office 101, 1st Floor, Al Masraf Bank<br />
                    Al Quoz 1, Sheikh Zayed Road<br />
                    Dubai, UAE
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-card rounded-3xl p-7 sm:p-8 border border-border/60 shadow-sm space-y-4"
          >
            <p className="hidden">
              <label>
                Don't fill this out: <input name="_gotcha" />
              </label>
            </p>
            <div>
              <label htmlFor="name" className="text-sm font-medium block mb-1.5">Name</label>
              <Input id="name" name="name" required placeholder="Your name" className="rounded-xl h-11" />
            </div>
            <div>
              <label htmlFor="email" className="text-sm font-medium block mb-1.5">Email</label>
              <Input id="email" name="email" type="email" required placeholder="you@example.com" className="rounded-xl h-11" />
            </div>
            <div>
              <label htmlFor="message" className="text-sm font-medium block mb-1.5">Message</label>
              <Textarea id="message" name="message" required rows={4} placeholder="How can we help?" className="rounded-xl resize-none" />
            </div>
            <Button type="submit" size="lg" disabled={submitting} className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              {submitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>
      </section>

      {/* Map */}
      <section id="map" className="pb-16">
        <div className="mx-auto max-w-6xl px-5">
          <div className="rounded-3xl overflow-hidden border border-border/60 shadow-sm bg-card">
            <iframe
              title="Tranh Pham location — Al Masraf Bank, Al Quoz 1"
              src="https://www.google.com/maps?q=Al+Masraf+Bank+Al+Quoz+1+Sheikh+Zayed+Road+Dubai&output=embed"
              className="w-full h-[320px] md:h-[420px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* Footer banner */}
      <div className="relative mt-8">
        <img
          src={hero}
          alt="Vietnamese grocery products flat lay"
          className="w-full h-[280px] md:h-[420px] object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/20" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="px-5">
            <h2 className="font-serif text-4xl md:text-6xl font-bold text-foreground drop-shadow">Tranh Pham</h2>
            <p className="text-sm md:text-base text-foreground/80 mt-2">Authentic Vietnamese flavors · Reliable trade</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8">
        <div className="mx-auto max-w-6xl px-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <div>© {new Date().getFullYear()} Tranh Pham F&B Trading LLC</div>
          <div>Authentic flavors · Reliable trade</div>
        </div>
      </footer>
    </div>
  );
}
