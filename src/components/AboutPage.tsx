import React from 'react';
import { Mail, ExternalLink, ArrowUp, Sparkles, Brain, Users, Target, Lock, Rocket, Code, TestTube, MessageSquare } from 'lucide-react';

interface AboutPageProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
}

export function AboutPage({ isDarkMode, isVibrant, t }: AboutPageProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const sections = [
    {
      icon: Brain,
      title: "Project Overview",
      content: "Lesson Link is an AI-powered personalized learning platform designed specifically for 3-year-olds. Through our innovative AI-powered placement test, we create tailored educational experiences that adapt to each child's unique learning needs and abilities."
    },
    {
      icon: Target,
      title: "Mission Statement",
      content: "Our mission is to provide a free, high-quality educational resource for underserved children, ensuring that every child has access to engaging early learning opportunities. We believe in creating interactive experiences that promote active learning and development while minimizing passive screen time. Our platform is designed to be intuitive, easy to use, and welcoming—offering a supportive environment that encourages exploration without feeling overwhelming or commercialized."
    },
    {
      icon: Code,
      title: "Technology Stack",
      content: "Lesson Link leverages cutting-edge technologies including the OpenAI API, GitHub, React, Vite, Firebase, IndexedDB, and Netlify to deliver a seamless and engaging learning experience."
    },
    {
      icon: Sparkles,
      title: "Key Features",
      content: [
        "AI-powered Placement Test: Identifies children's learning needs and tailors educational games accordingly",
        "Personalized Learning Paths: AI adapts the content based on the placement test results. Placement tests can be retaken at any time in the parent dashboard.",
        "Parent Dashboard: Helps track children's learning and engagement. The initial placement test is taken here after creating an account and can be retaken from this page thereafter.",
        "Interactive & Ad-Free Learning: Ensures young learners have a distraction-free experience"
      ]
    },
    {
      icon: Rocket,
      title: "Development Journey",
      content: "Lesson Link was developed over five weeks as part of the AI for Social Good course at Arizona State University in early spring 2025. The project aimed to address accessibility gaps in early childhood education using AI-driven solutions."
    },
    {
      icon: TestTube,
      title: "Challenges & Future Plans",
      content: [
        "Improving AI placement test accuracy with expert collaboration",
        "Enhancing multilingual support & offline accessibility",
        "Refining game design based on user feedback",
        "Expanding to offer materials for more age groups"
      ]
    },
    {
      icon: Users,
      title: "Team Members",
      content: [
        {
          name: "Brenna Da-Tokpah",
          // role: "Content Advisor & Lead Author",
          affiliation: "Arizona State University, Education Policy"
        },
        {
          name: "Yash Sanjay Dorshetwar",
          // role: "AI Development Lead",
          affiliation: "Arizona State University, Robotics & AI"
        },
        {
          name: "Justin Curtsinger",
          // role: "UI/UX & Frontend Lead",
          affiliation: "Arizona State University, Media Arts & Sciences",
          link: "https://elev8.dev/"
        }
      ]
    },
    {
      icon: MessageSquare,
      title: "User Testing & Impact",
      content: "Two families participated in our small-scale pilot program. Early feedback has confirmed that Lesson Link is both engaging and effective, while also highlighting areas for further refinement and improvement. We are still in the early stages and feedback is welcome. Please use the contact link below or on the contact page to reach out with any suggestions or considerations."
    },
    {
      icon: Lock,
      title: "Access & Contact",
      content: [
        { type: 'link', text: 'Visit Lesson Link', url: 'https://lessonlink.org/' },
        { type: 'email', text: 'Contact Us', email: 'Admin@LessonLink.org' }
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
            About Lesson Link
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Where Learning is Fun and Personal
          </p>
        </div>

        {/* Content Sections */}
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
                    {typeof section.content === 'string' ? (
                      <p className={`
                        text-base leading-relaxed
                        ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                      `}>
                        {section.content}
                      </p>
                    ) : Array.isArray(section.content) ? (
                      section.content.map((item, i) => {
                        if (typeof item === 'string') {
                          return (
                            <p
                              key={i}
                              className={`
                                text-base leading-relaxed
                                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                              `}
                            >
                              • {item}
                            </p>
                          );
                        } else if ('name' in item) {
                          // Team member
                          return (
                            <div key={i} className="mb-4">
                              {item.link ? (
                                <a
                                  href={item.link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`
                                    inline-flex items-center gap-1
                                    hover:underline
                                    ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}
                                  `}
                                >
                                  {item.name}
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              ) : (
                                <span className={isDarkMode ? 'text-white' : 'text-gray-900'}>
                                  {item.name}
                                </span>
                              )}
                              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {item.role}
                              </p>
                              <p className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                                {item.affiliation}
                              </p>
                            </div>
                          );
                        } else {
                          // Link or email
                          return (
                            <div key={i} className="flex items-center gap-2">
                              {item.type === 'link' ? (
                                <a
                                  href={item.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`
                                    inline-flex items-center gap-1
                                    ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}
                                    hover:underline
                                  `}
                                >
                                  {item.text}
                                  <ExternalLink className="w-4 h-4" />
                                </a>
                              ) : (
                                <a
                                  href={`mailto:${item.email}`}
                                  className={`
                                    inline-flex items-center gap-1
                                    ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}
                                    hover:underline
                                  `}
                                >
                                  {item.text}
                                  <Mail className="w-4 h-4" />
                                </a>
                              )}
                            </div>
                          );
                        }
                      })
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          ))}
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