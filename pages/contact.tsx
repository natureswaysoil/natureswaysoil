import Head from "next/head";
import { useState } from "react";

export default function Contact(){
  const [status, setStatus] = useState<string | null>(null);
  const [isError, setIsError] = useState(false);
  
  async function submit(e: any){
    e.preventDefault();
    setStatus(null);
    setIsError(false);
    
    try {
      const data = Object.fromEntries(new FormData(e.currentTarget).entries());
      const r = await fetch("/api/lead", { 
        method: "POST", 
        headers: {"Content-Type":"application/json"}, 
        body: JSON.stringify({ source: "contact", ...data }) 
      });
      
      const result = await r.json();
      
      if (r.ok) {
        setStatus("Thanks! We'll reply shortly.");
      } else {
        setIsError(true);
        if (result.error === "Missing MAKE_WEBHOOK_URL") {
          setStatus("Service temporarily unavailable. Please email us directly at support@natureswaysoil.com or call us for immediate assistance.");
        } else {
          setStatus(`There was a problem submitting your message: ${result.error || 'Unknown error'}. Please try again or contact us directly.`);
        }
      }
    } catch (error) {
      setIsError(true);
      setStatus("Network error. Please check your connection and try again, or contact us directly at support@natureswaysoil.com");
    }
  }
  
  return (
    <main className="min-h-screen max-w-3xl mx-auto px-6 py-16">
      <Head><title>Contact – Nature's Way Soil</title></Head>
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="mt-2 text-gray-700">Questions about products, bulk pricing, or order help? Send a message.</p>
      <form onSubmit={submit} className="mt-6 grid gap-3">
        <input name="name" required placeholder="Your name" className="border rounded-xl px-3 py-2" />
        <input name="email" type="email" required placeholder="you@email.com" className="border rounded-xl px-3 py-2" />
        <input name="phone" placeholder="(optional) Phone" className="border rounded-xl px-3 py-2" />
        <textarea name="message" required placeholder="How can we help?" className="border rounded-xl px-3 py-2 min-h-[120px]" />
        <button className="mt-2 px-5 py-3 rounded-2xl bg-green-700 text-white">Send</button>
      </form>
      {status && (
        <p className={`mt-4 ${isError ? 'text-red-600' : 'text-green-700'}`}>
          {status}
        </p>
      )}
    </main>
  );
}