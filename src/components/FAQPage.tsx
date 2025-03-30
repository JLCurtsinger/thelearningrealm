import React from 'react';
import { HelpCircle, ArrowUp, Mail } from 'lucide-react';

interface FAQPageProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
}

interface FAQItem {
  question: string;
  answer: string | string[];
}

export function FAQPage({ isDarkMode, isVibrant, t }: FAQPageProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const faqs: FAQItem[] = [
    {
      question: "What is Lesson Link?",
      answer: "Lesson Link is an interactive learning platform designed to provide engaging educational experiences for children. It offers a variety of AI-powered games, interactive exercises, and relaxation activities to support early learning."
    },
    {
      question: "How do I use Lesson Link?",
      answer: "Users can take a placement test to assess their learning level, and based on the results, Lesson Link will provide personalized learning paths with interactive games and activities tailored to their needs."
    },
    {
      question: "What kind of games and activities does Lesson Link offer?",
      answer: [
        "Lesson Link provides a mix of educational games, interactive exercises, and relaxation activities, including:",
        "• Educational Games: Focused on literacy, math, and problem-solving skills.",
        "• Break Activities: Soothing music, calming scenes, and relaxation exercises.",
        "• Gamified Learning Path: Users earn points and progress through lessons based on their performance."
      ]
    },
    {
      question: "Is Lesson Link free to use?",
      answer: "Yes! Lesson Link is free to use! We may expand and offer premium features, but creating a free educational resource for all will always be a top priority for our team."
    },
    {
      question: "Does Lesson Link offer AI-powered learning?",
      answer: "Yes! Lesson Link uses AI to analyze placement test results and recommend personalized learning paths. It also features AI-powered speech feedback to enhance engagement in the games."
    },
    {
      question: "Can parents track their child's progress?",
      answer: "Yes, Lesson Link provides progress tracking, allowing parents and educators to monitor a child's learning journey and achievements."
    },
    {
      question: "What are the Break Page activities?",
      answer: [
        "Break Page activities (currently under construction) are designed to help children relax between learning sessions. These include:",
        "• Soothing Music: A selection of calming tracks to help kids unwind.",
        "• Calming Scenes: Animated visuals designed to create a peaceful atmosphere.",
        "• Relaxing Doodles: Interactive drawing exercises for creative expression."
      ]
    },
    {
      question: "Is Lesson Link suitable for all ages?",
      answer: "Lesson Link is primarily designed for early learners, but its interactive format makes it accessible and engaging for a range of ages. We plan to expand by offering lessons and personalized learning pathways for all age ranges in the future!"
    },
    {
      question: "How do I contact support?",
      answer: "For any issues, feedback, or support requests, you can reach us through our Contact page or email us directly at Admin@LessonLink.org."
    }
  ];

  // Add FAQ Schema
  React.useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": Array.isArray(faq.answer) ? faq.answer.join(" ") : faq.answer
        }
      }))
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(faqSchema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={`
            text-4xl font-bold mb-6 font-comic
            ${isVibrant
              ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent'
              : isDarkMode
                ? 'text-white'
                : 'text-gray-900'
            }
          `}>
            Frequently Asked Questions
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Find answers to common questions about Lesson Link
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-8">
          {faqs.map((section, index) => (
            <div
              key={index}
              className={`
                p-6 rounded-2xl
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
                shadow-lg
                transform hover:scale-102
                transition-all duration-300
              `}
            >
              <div className="flex items-start gap-4">
                <div className={`
                  p-3 rounded-xl
                  ${isVibrant
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                    : isDarkMode
                      ? 'bg-gray-700'
                      : 'bg-purple-100'
                  }
                `}>
                  <HelpCircle className={`
                    w-6 h-6
                    ${isVibrant ? 'text-white' : isDarkMode ? 'text-purple-400' : 'text-purple-600'}
                  `} />
                </div>
                <div className="flex-1">
                  <h2 className={`
                    text-xl font-bold mb-4
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}>
                    {section.question}
                  </h2>
                  <div className="space-y-3">
                    {Array.isArray(section.answer) ? (
                      section.answer.map((paragraph, pIndex) => (
                        <p
                          key={pIndex}
                          className={`
                            text-base leading-relaxed
                            ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                          `}
                        >
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className={`
                        text-base leading-relaxed
                        ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                      `}>
                        {section.answer}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <p className={`text-lg mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Still have questions?
          </p>
          <a
            href="mailto:Admin@LessonLink.org"
            className={`
              inline-flex items-center gap-2
              px-6 py-3 rounded-xl
              font-bold text-white
              transform hover:scale-105
              transition-all duration-300
              ${isVibrant
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                : 'bg-purple-600 hover:bg-purple-700'
              }
              shadow-lg
            `}
          >
            <Mail className="w-5 h-5" />
            Contact Support
          </a>
        </div>

        {/* Scroll to Top Button */}
        <button
          onClick={scrollToTop}
          className={`
            fixed bottom-8 right-8
            p-4 rounded-full
            ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
            shadow-lg
            transform hover:scale-110
            transition-all duration-300
            z-10
          `}
          aria-label="Scroll to top"
        >
          <ArrowUp className={`
            w-6 h-6
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
          `} />
        </button>
      </div>
    </div>
  );
}