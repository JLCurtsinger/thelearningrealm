import React from 'react';
import { Scroll, Shield, Brain, Lock, Clock, Link, RefreshCw } from 'lucide-react';

interface TermsPageProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
}

export function TermsPage({ isDarkMode, isVibrant, t }: TermsPageProps) {
  const sections = [
    {
      icon: Scroll,
      title: "General Use Disclaimer",
      content: [
        "The Learning Realm is an educational platform designed for young children to build literacy skills.",
        "The site is provided as-is, and we do not guarantee uninterrupted or error-free operation."
      ]
    },
    {
      icon: Shield,
      title: "Parental Responsibility & Supervision",
      content: [
        "This website is designed for young children, but it is the parent or guardian's responsibility to ensure safe and appropriate usage.",
        "Parents should supervise screen time and ensure content aligns with their child's needs."
      ]
    },
    {
      icon: Brain,
      title: "AI-Generated Content Warning",
      content: [
        "Some games, activities, and audio elements are generated using AI. While we strive to provide accurate and appropriate content, AI-generated responses may occasionally produce unexpected results.",
        "We encourage parents to review and engage with the content alongside their children."
      ]
    },
    {
      icon: Lock,
      title: "Privacy & Data Collection",
      content: [
        "The Learning Realm does not collect personally identifiable information from children.",
        "Contact forms and other features that require input are intended for parents and guardians only."
      ]
    },
    {
      icon: Clock,
      title: "Screen Time & Health Considerations",
      content: [
        "While we encourage fun and engaging learning, we recommend moderation of screen time in accordance with pediatric guidelines.",
        "We provide \"Take a Break\" features to help balance digital learning with mindful breaks."
      ]
    },
    {
      icon: Link,
      title: "Third-Party Links & External Content",
      content: [
        "The site may include embedded YouTube videos or links to external resources. We are not responsible for third-party content, and parents should review external sites before allowing children to access them."
      ]
    },
    {
      icon: RefreshCw,
      title: "Changes to Terms",
      content: [
        "These Terms & Conditions may be updated periodically. Continued use of the site constitutes acceptance of any updates."
      ]
    }
  ];

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
            Terms & Conditions
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Please read these terms carefully before using The Learning Realm
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
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
                  <section.icon className={`
                    w-6 h-6
                    ${isVibrant ? 'text-white' : isDarkMode ? 'text-purple-400' : 'text-purple-600'}
                  `} />
                </div>
                <div className="flex-1">
                  <h2 className={`
                    text-xl font-bold mb-4
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}>
                    {section.title}
                  </h2>
                  <div className="space-y-3">
                    {section.content.map((paragraph, pIndex) => (
                      <p
                        key={pIndex}
                        className={`
                          text-base leading-relaxed
                          ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                        `}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}