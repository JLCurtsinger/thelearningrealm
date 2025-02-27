// import React, { useState } from 'react';
// import { Music, Cloud, Palette, Info } from 'lucide-react';
// import { SoothingMusic } from './SoothingMusic';
// import { CalmingScenes } from './CalmingScenes';
// import { RelaxingDoodles } from './RelaxingDoodles';

// interface BreakPageProps {
//   isDarkMode: boolean;
//   isVibrant: boolean;
//   t: any;
// }

// // Main activities data
// const activities = [
//   {
//     id: 'music',
//     title: 'Soothing Music',
//     icon: Music,
//     color: 'from-purple-400 via-pink-400 to-red-400',
//     darkColor: 'from-purple-500/30 via-pink-500/30 to-red-500/30',
//     lightColor: 'from-purple-100 via-pink-50 to-red-50'
//   },
//   {
//     id: 'visual',
//     title: 'Calming Scenes',
//     icon: Cloud,
//     color: 'from-blue-400 via-cyan-400 to-teal-400',
//     darkColor: 'from-blue-500/30 via-cyan-500/30 to-teal-500/30',
//     lightColor: 'from-blue-100 via-cyan-50 to-teal-50'
//   },
//   {
//     id: 'doodle',
//     title: 'Relaxing Doodles',
//     icon: Palette,
//     color: 'from-pink-400 via-rose-400 to-red-400',
//     darkColor: 'from-pink-500/30 via-rose-500/30 to-red-500/30',
//     lightColor: 'from-pink-100 via-rose-50 to-red-50'
//   }
// ];

// console.log("BreakPage from index.tsx is rendering");

// export function BreakPage({ isDarkMode, isVibrant, t }: BreakPageProps) {
//   const [activeActivity, setActiveActivity] = useState<string | null>(null);

//   return (
//     <div className="min-h-screen pt-20 pb-8 px-4">
//       <div className="max-w-7xl mx-auto">
//         {/* Parent Info Banner */}
//         <div className={`
//           mb-8 p-4 rounded-xl
//           ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'}
//           backdrop-blur-md
//         `}>
//           <div className="flex items-center gap-2 text-sm">
//             <Info className="w-4 h-4" />
//             <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
//               {t.breakPage.parentInfo}
//             </p>
//           </div>
//         </div>

//         {activeActivity ? (
//           <div className="relative min-h-[calc(100vh-12rem)]">
//             <button
//               onClick={() => setActiveActivity(null)}
//               className={`
//                 absolute top-4 left-4 z-10
//                 p-2 rounded-full
//                 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
//                 shadow-lg
//                 transition-transform hover:scale-110
//               `}
//             >
//               <ArrowLeft className="w-6 h-6" />
//             </button>

//             {/* Activity Content */}
//             {activeActivity === 'music' && (
//               <SoothingMusic
//                 isDarkMode={isDarkMode}
//                 isVibrant={isVibrant}
//                 t={t}
//               />
//             )}

//             {activeActivity === 'visual' && (
//               <CalmingScenes
//                 isDarkMode={isDarkMode}
//                 isVibrant={isVibrant}
//                 t={t}
//               />
//             )}

//             {activeActivity === 'doodle' && (
//               <RelaxingDoodles
//                 isDarkMode={isDarkMode}
//                 isVibrant={isVibrant}
//                 t={t}
//               />
//             )}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//             {activities.map((activity) => (
//               <button
//                 key={activity.id}
//                 onClick={() => setActiveActivity(activity.id)}
//                 className={`
//                   relative p-8 rounded-3xl
//                   transform hover:scale-105 transition-all duration-500
//                   focus:outline-none focus:ring-4 focus:ring-purple-400
//                   shadow-xl
//                   group
//                   cursor-pointer
//                   overflow-hidden
//                   aspect-square
//                 `}
//               >
//                 {/* Gradient Background */}
//                 <div className={`
//                   absolute inset-0
//                   bg-gradient-to-br
//                   ${isDarkMode ? activity.darkColor : activity.lightColor}
//                   group-hover:opacity-80
//                   transition-opacity
//                 `} />

//                 {/* Glowing Effect */}
//                 <div className={`
//                   absolute inset-0
//                   bg-gradient-to-br ${activity.color}
//                   opacity-0 group-hover:opacity-20
//                   transition-opacity
//                   blur-xl
//                 `} />

//                 {/* Content */}
//                 <div className="relative flex flex-col items-center justify-center h-full space-y-6">
//                   <activity.icon className={`
//                     w-24 h-24
//                     ${isVibrant
//                       ? `text-transparent bg-clip-text bg-gradient-to-r ${activity.color}`
//                       : isDarkMode
//                         ? 'text-white'
//                         : 'text-gray-900'
//                     }
//                     animate-float
//                   `} />

//                   <h3 className={`
//                     text-2xl font-bold text-center font-comic
//                     ${isDarkMode ? 'text-white' : 'text-gray-900'}
//                   `}>
//                     {t.breakPage.activities[activity.id].title}
//                   </h3>
//                 </div>

//                 {/* Sparkle Effect on Hover */}
//                 <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
//                   {Array.from({ length: 3 }).map((_, i) => (
//                     <Sparkles
//                       key={i}
//                       className={`
//                         absolute w-6 h-6
//                         ${isVibrant ? 'text-white' : 'text-yellow-400'}
//                         animate-pulse
//                       `}
//                       style={{
//                         top: `${Math.random() * 100}%`,
//                         left: `${Math.random() * 100}%`,
//                         animationDelay: `${i * 0.2}s`
//                       }}
//                     />
//                   ))}
//                 </div>
//               </button>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }