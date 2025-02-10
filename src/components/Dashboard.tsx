import React from 'react';
import { DashboardProvider } from '../contexts/DashboardContext';
import { DashboardLayout } from './dashboard/DashboardLayout';

interface DashboardProps {
  language: string;
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
}

export function Dashboard(props: DashboardProps) {
  return (
    <DashboardProvider>
      <DashboardLayout {...props} />
    </DashboardProvider>
  );
}