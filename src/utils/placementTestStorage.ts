import { get, set } from 'idb-keyval';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  targetSkills: string[];
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced';
  icon: string;
  component: string;
}

export interface PlacementTestResult {
  userId: string;
  chatResponse: string;
  lessons: Lesson[];
  completedAt: string;
}

const PLACEMENT_TEST_KEY_PREFIX = 'placement_test_';

export const getPlacementTestResult = async (userId: string): Promise<PlacementTestResult | null> => {
  try {
    const result = await get(`${PLACEMENT_TEST_KEY_PREFIX}${userId}`);
    return result || null;
  } catch (error) {
    console.error('Error retrieving placement test result:', error);
    return null;
  }
};

export const savePlacementTestResult = async (result: PlacementTestResult): Promise<void> => {
  try {
    await set(`${PLACEMENT_TEST_KEY_PREFIX}${result.userId}`, result);
  } catch (error) {
    console.error('Error saving placement test result:', error);
    throw error;
  }
};