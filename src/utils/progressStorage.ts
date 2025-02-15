import { get, set } from 'idb-keyval';

interface ProgressData {
  userId: string;
  completedLessons: string[];
  screenTimeToday: number;
  lastScreenTimeUpdate: string;
  rewardPoints: number;
}

const PROGRESS_KEY_PREFIX = 'user_progress_';

export const getProgressData = async (userId: string): Promise<ProgressData | null> => {
  try {
    const data = await get(`${PROGRESS_KEY_PREFIX}${userId}`);
    if (!data) {
      // Initialize with default values if no data exists
      const defaultData: ProgressData = {
        userId,
        completedLessons: [],
        screenTimeToday: 0,
        lastScreenTimeUpdate: new Date().toDateString(),
        rewardPoints: 0
      };
      await set(`${PROGRESS_KEY_PREFIX}${userId}`, defaultData);
      return defaultData;
    }
    return data;
  } catch (error) {
    console.error('Error retrieving progress data:', error);
    return null;
  }
};

export const updateProgressData = async (userId: string, updates: Partial<ProgressData>): Promise<void> => {
  try {
    const currentData = await getProgressData(userId);
    if (currentData) {
      const updatedData = { ...currentData, ...updates };
      await set(`${PROGRESS_KEY_PREFIX}${userId}`, updatedData);
    }
  } catch (error) {
    console.error('Error updating progress data:', error);
    throw error;
  }
};

export const addCompletedLesson = async (userId: string, lessonId: string): Promise<void> => {
  try {
    const currentData = await getProgressData(userId);
    if (currentData && !currentData.completedLessons.includes(lessonId)) {
      const updatedLessons = [...currentData.completedLessons, lessonId];
      const updatedPoints = currentData.rewardPoints + 10; // Add 10 points for completing a lesson
      await updateProgressData(userId, {
        completedLessons: updatedLessons,
        rewardPoints: updatedPoints
      });
    }
  } catch (error) {
    console.error('Error adding completed lesson:', error);
    throw error;
  }
};

export const updateScreenTime = async (userId: string): Promise<void> => {
  try {
    const currentData = await getProgressData(userId);
    if (currentData) {
      const today = new Date().toDateString();
      
      // Reset screen time if it's a new day
      if (currentData.lastScreenTimeUpdate !== today) {
        await updateProgressData(userId, {
          screenTimeToday: 1,
          lastScreenTimeUpdate: today
        });
      } else {
        await updateProgressData(userId, {
          screenTimeToday: currentData.screenTimeToday + 1
        });
      }
    }
  } catch (error) {
    console.error('Error updating screen time:', error);
    throw error;
  }
};
