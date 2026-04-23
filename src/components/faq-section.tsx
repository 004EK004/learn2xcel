'use client';

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    question: "How much does each track cost?",
    answer:
      "Pricing is shown at checkout by track and format. You can start with the free preview and choose live or self-paced before payment.",
  },
  {
    question: "How many hours should I plan each week?",
    answer:
      "Most learners spend 4–6 hours weekly. Live sessions are recorded so you can catch up on your schedule.",
  },
  {
    question: "Can I switch between live and self-paced?",
    answer:
      "Yes. Every track supports both formats, so you can adjust if your schedule changes mid-program.",
  },
  {
    question: "Is the certificate useful for my career?",
    answer:
      "You receive a completion certificate plus portfolio artifacts you can share in performance reviews, internal mobility discussions, and interviews.",
  },
  {
    question: "What is the refund policy?",
    answer:
      "If the track is not the right fit, request a refund within the published guarantee window shown at checkout. No questions asked.",
  },
];

export function FAQSection() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-2">
        <div className="h-1 w-10 rounded-full bg-gradient-to-r from-emerald-400 to-green-500" />
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">FAQ</p>
      </div>
      <h2 className="text-2xl font-semibold text-slate-900">
        Frequently asked questions
      </h2>
      <div className="space-y-3">
        {faqs.map((faq) => {
          const isOpen = open === faq.question;
          return (
            <div
              key={faq.question}
              className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm transition hover:border-emerald-200"
            >
              <button
                onClick={() => setOpen(isOpen ? null : faq.question)}
                className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left text-sm font-semibold text-slate-900"
                aria-expanded={isOpen}
              >
                <span>{faq.question}</span>
                <motion.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-emerald-200 text-emerald-700"
                >
                  <Plus className="h-4 w-4" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                  >
                    <p className="border-t border-emerald-50 px-5 pb-4 pt-3 text-sm text-slate-700">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
