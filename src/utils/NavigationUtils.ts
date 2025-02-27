export const navigateToBreakPage = (
  resetAllPages: () => void,
  setActiveView: (view: string) => void,
  setShowBreakPage: (show: boolean) => void
) => {
  resetAllPages();
  setActiveView('break');
  setShowBreakPage((prev) => {
    console.log("Updating showBreakPage to true");
    return true;
  });
};

export const navigateToLearningPath = (
  resetAllPages: () => void,
  setActiveView: (view: string) => void,
  setShowLearningPath: (show: boolean) => void
) => {
  resetAllPages();
  setActiveView('learning');
  setShowLearningPath(true);
};

export const navigateToVideoPage = (
  resetAllPages: () => void,
  setActiveView: (view: string) => void,
  setShowVideoPage: (show: boolean) => void
) => {
  resetAllPages();
  setActiveView('video');
  setShowVideoPage(true);
};

export const navigateToGamesPage = (
  resetAllPages: () => void,
  setActiveView: (view: string) => void,
  setShowGamesPage: (show: boolean) => void
) => {
  resetAllPages();
  setActiveView('games');
  setShowGamesPage(true);
};

export const navigateToHome = (
  resetAllPages: () => void,
  setActiveView: (view: string) => void
) => {
  resetAllPages();
  setActiveView('home');
};

export const navigateToDashboard = (
  resetAllPages: () => void,
  setActiveView: (view: string) => void,
  setShowDashboard: (show: boolean) => void
) => {
  resetAllPages();
  setActiveView('dashboard');
  setShowDashboard(true);
};

export const navigateToContact = (
  resetAllPages: () => void,
  setActiveView: (view: string) => void,
  setShowContactPage: (show: boolean) => void
) => {
  resetAllPages();
  setActiveView('contact');
  setShowContactPage(true);
};

export const navigateToTerms = (
  resetAllPages: () => void,
  setActiveView: (view: string) => void,
  setShowTermsPage: (show: boolean) => void
) => {
  resetAllPages();
  setActiveView('terms');
  setShowTermsPage(true);
};