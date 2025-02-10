import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import type { PlacementTestResult } from '../utils/placementTestStorage';
import { getPlacementTestResult } from '../utils/placementTestStorage';

interface DashboardContextType {
  user: any;
  isParentMode: boolean;
  selectedChild: string;
  soundEnabled: boolean;
  notificationsEnabled: boolean;
  activeCard: string | null;
  showCelebration: boolean;
  showPlacementTest: boolean;
  placementTestResult: PlacementTestResult | null;
  learningStreak: number;
  progressPercentage: number;
  xpPoints: number;
  nextMilestone: number;
  toggleParentMode: () => void;
  setSelectedChild: (child: string) => void;
  setSoundEnabled: (enabled: boolean) => void;
  setNotificationsEnabled: (enabled: boolean) => void;
  setActiveCard: (card: string | null) => void;
  setShowCelebration: (show: boolean) => void;
  setShowPlacementTest: (show: boolean) => void;
  setPlacementTestResult: (result: PlacementTestResult | null) => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function DashboardProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [isParentMode, setIsParentMode] = useState(false);
  const [selectedChild, setSelectedChild] = useState(user?.displayName || user?.email?.split('@')[0] || 'Guest');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showPlacementTest, setShowPlacementTest] = useState(false);
  const [placementTestResult, setPlacementTestResult] = useState<PlacementTestResult | null>(null);

  // Constants that could later be fetched from an API
  const learningStreak = 5;
  const progressPercentage = 75;
  const xpPoints = 1250;
  const nextMilestone = 1500;

  useEffect(() => {
    const checkPlacementTest = async () => {
      if (user) {
        const result = await getPlacementTestResult(user.uid);
        setPlacementTestResult(result);
        
        if (!result) {
          setShowPlacementTest(true);
        }
      }
    };
    
    checkPlacementTest();
  }, [user]);

  const toggleParentMode = () => setIsParentMode(!isParentMode);

  const value = {
    user,
    isParentMode,
    selectedChild,
    soundEnabled,
    notificationsEnabled,
    activeCard,
    showCelebration,
    showPlacementTest,
    placementTestResult,
    learningStreak,
    progressPercentage,
    xpPoints,
    nextMilestone,
    toggleParentMode,
    setSelectedChild,
    setSoundEnabled,
    setNotificationsEnabled,
    setActiveCard,
    setShowCelebration,
    setShowPlacementTest,
    setPlacementTestResult
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};