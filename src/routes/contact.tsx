import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Background } from "@/components/Background";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Ganpati Computers" }] }),
  component: ContactPage,
});

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "PC Inquiry",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields (Name, Email, Message).");
      return;
    }

    setSubmitting(true);

    // Simulate API request
    setTimeout(() => {
      toast.success("Thank you for reaching out! Your message has been sent.", {
        description: "A representative from Ganpati Computers will contact you shortly.",
        duration: 5000,
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "PC Inquiry",
        message: "",
      });
      setSubmitting(false);
    }, 1200);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <motion.main
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative min-h-screen pt-1.5 px-3 pb-3 md:pt-2 md:px-6 md:pb-6 lg:min-h-screen lg:pt-2 lg:px-6 lg:pb-6"
    >
      <Background />
      <div className="mx-auto flex min-h-[calc(100vh-1.5rem)] max-w-[1400px] flex-col rounded-[28px] bg-white/70 backdrop-blur-xl shadow-glass ring-1 ring-white/60 md:rounded-[32px] p-1 md:p-2">
        <Navbar />

        <div className="flex-1 px-4 py-8 md:px-8">
          {/* Header */}
          <div className="mb-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-ink-soft hover:text-ink transition-colors group mb-4"
            >
              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
              Back home
            </Link>
            <h1 className="font-display text-4xl sm:text-5xl font-extrabold tracking-tight text-ink">
              Get in Touch
            </h1>
            <p className="mt-2 text-sm md:text-base text-ink-soft max-w-2xl">
              Have questions about computer specs, availability, custom builds, or repair estimates? Drop us a line below or contact us directly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Contact Details (Left) */}
            <div className="lg:col-span-5 flex flex-col gap-6">
              {/* Quick Contact Info */}
              <div className="bg-white/80 border border-black/5 rounded-2xl p-6 shadow-sm flex flex-col gap-6">
                <h3 className="font-display text-lg font-bold text-ink mb-2">Direct Contact</h3>

                {/* Phone */}
                <a
                  href="tel:+919876543210"
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-black/5 transition-colors group cursor-pointer"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-black text-white shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Call Us</div>
                    <div className="text-sm font-bold text-ink mt-0.5 group-hover:underline">+91 98765 43210</div>
                  </div>
                </a>

                {/* Email */}
                <a
                  href="mailto:support@ganpaticomputers.com"
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-black/5 transition-colors group cursor-pointer"
                >
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-black text-white shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Email Us</div>
                    <div className="text-sm font-bold text-ink mt-0.5 group-hover:underline">support@ganpaticomputers.com</div>
                  </div>
                </a>

                {/* Address */}
                <div className="flex items-start gap-4 p-3 rounded-xl">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-black text-white shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">Visit Store</div>
                    <div className="text-sm font-bold text-ink mt-0.5">
                      Main Market Road, Near City Center, New Delhi, India
                    </div>
                  </div>
                </div>
              </div>

              {/* Opening Hours */}
              <div className="bg-white/80 border border-black/5 rounded-2xl p-6 shadow-sm flex items-start gap-4">
                <div className="grid h-10 w-10 place-items-center rounded-lg bg-black text-white shrink-0">
                  <Clock className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-sm font-bold text-ink">Store Hours</h3>
                  <div className="mt-2 space-y-1.5 text-xs sm:text-sm text-zinc-600">
                    <div className="flex justify-between">
                      <span>Monday - Saturday:</span>
                      <span className="font-semibold text-ink">10:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between border-t border-black/5 pt-1.5">
                      <span>Sunday:</span>
                      <span className="font-semibold text-zinc-400">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form (Right) */}
            <div className="lg:col-span-7 bg-white/80 border border-black/5 rounded-[24px] p-6 sm:p-8 shadow-sm">
              <h3 className="font-display text-lg font-bold text-ink mb-6">Send a Message</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Somil Shekhar"
                      className="w-full h-11 px-4 rounded-xl border border-black/10 bg-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/30 transition-all"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="somil@example.com"
                      className="w-full h-11 px-4 rounded-xl border border-black/10 bg-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/30 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 99999 99999"
                      className="w-full h-11 px-4 rounded-xl border border-black/10 bg-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/30 transition-all"
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label htmlFor="subject" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                      Subject
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl border border-black/10 bg-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 transition-all cursor-pointer"
                    >
                      <option value="PC Inquiry">Custom PC Customization</option>
                      <option value="Product Sourcing">Product Availability</option>
                      <option value="Repair Support">Hardware Diagnostics / Repair</option>
                      <option value="Other">General Question</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us what you're looking for (e.g. specs, budget, or system fault)..."
                    className="w-full p-4 rounded-xl border border-black/10 bg-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black/30 transition-all resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto min-w-[150px] inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-black px-6 text-xs font-semibold uppercase text-white transition-all hover:bg-zinc-800 active:scale-95 disabled:bg-zinc-400 disabled:scale-100 cursor-pointer shadow-sm"
                >
                  {submitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-3.5 w-3.5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </motion.main>
  );
}
