import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "Are the documents fully up-to-date with the January 2026 release?",
    answer: "Yes. EpsteinGPT's RAG index was rebuilt from the complete DOJ release under the Epstein Files Transparency Act — 3.5 million+ pages, 180,000 images, and 2,000+ video files. The ingestion was completed in February 2026. Future drops will be indexed within 48-72 hours of release.",
  },
  {
    question: "How accurate is the RAG system? Can I trust the citations?",
    answer: "Our retrieval-augmented generation system cross-references multiple document sources and provides exact page/file citations for every claim. Accuracy benchmarks show 94.7% citation fidelity on legal document retrieval. That said, always verify critical claims against the raw files — we provide direct links to source documents.",
  },
  {
    question: "What about victim privacy and sensitive content?",
    answer: "EpsteinGPT strictly adheres to DOJ redaction guidelines for victim protection. Minor names remain sealed. Explicit imagery is not displayed but can be referenced for investigative context. Users must be 18+ and agree to our Sensitive Content Policy. We do not enable harassment or doxxing.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Absolutely. No contracts, no tricks. Cancel from your account settings at any time. Your access continues until the end of your billing period. We don't believe in trapping users — if we're not providing value, you should leave.",
  },
  {
    question: "Is my search history private?",
    answer: "Yes. We do not store identifiable query logs beyond 30 days. All searches are encrypted in transit and at rest. We will never sell your data or share your research patterns. See our Privacy Policy for full details. For maximum anonymity, consider using VPN + anonymous payment.",
  },
  {
    question: "What's the difference between Debunk Tool and Chat?",
    answer: "The Debunk Tool is purpose-built for verification: paste a tweet, video URL, or claim → get an instant verdict with cited evidence. EpsteinGPT Chat is freeform: ask complex questions, request summaries, explore connections, generate reports. Both are powered by the same RAG index.",
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 7-day refund window for first-time subscribers, no questions asked. Beyond that, we don't provide partial refunds — but you can always downgrade to Free tier and keep Observer access forever.",
  },
];

export const PricingFAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3 fade-in-up" style={{ animationDelay: "0.5s" }}>
      {faqItems.map((item, index) => (
        <div key={index} className="glass-card overflow-hidden group">
          <button
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
            className="w-full p-6 flex items-center justify-between text-left hover:bg-glass transition-colors"
          >
            <span className="font-display text-lg font-medium text-foreground pr-8">
              {item.question}
            </span>
            <ChevronDown
              className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
                openIndex === index ? "rotate-180" : ""
              }`}
            />
          </button>
          
          <div
            className={`overflow-hidden transition-all duration-500 ${
              openIndex === index ? "max-h-96" : "max-h-0"
            }`}
          >
            <div className="px-6 pb-6 border-t border-glass-border/50">
              <p className="font-mono text-sm text-muted-foreground leading-relaxed pt-4">
                {item.answer}
              </p>
            </div>
          </div>

          {/* Drip on hover */}
          <div className="absolute bottom-0 left-1/3 drip text-primary/20 opacity-0 group-hover:opacity-100" style={{ animationDelay: "0.2s" }} />
        </div>
      ))}
    </div>
  );
};
