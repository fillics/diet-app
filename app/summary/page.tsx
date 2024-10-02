'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Summary() {
  const [userData, setUserData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      router.push('/');
    }
  }, [router]);

  const calculateBMI = (height: number, weight: number) => {
    const heightInMeters = height / 100;
    return (weight / (heightInMeters * heightInMeters)).toFixed(2);
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi >= 18.5 && bmi < 24.9) return 'Normal weight';
    if (bmi >= 25 && bmi < 29.9) return 'Overweight';
    return 'Obese';
  };

  const estimateTimeToReachGoal = () => {
    if (!userData) return '';
    const { weight, targetWeight, goal } = userData;
    const weightDifference = Math.abs(weight - targetWeight);

    const weeks = Math.ceil(weightDifference / 0.5);
    return `${weeks} weeks to ${goal === 'lose' ? 'lose' : 'gain'} ${weightDifference}kg`;
  };

  const calculateCaloriesAndMacros = () => {
    // Simulazione dei valori
    const dailyCalories = "1,800 - 2,000 kcal";
    const protein = "25-30% (113-150 g)";
    const carbs = "40-45% (180-225 g)";
    const fats = "25-30% (50-67 g)";
    
    return {
      dailyCalories,
      protein,
      carbs,
      fats
    };
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const bmi = calculateBMI(userData.height, userData.weight);
  const bmiCategory = getBMICategory(Number(bmi));
  const { dailyCalories, protein, carbs, fats } = calculateCaloriesAndMacros();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-4 text-center text-indigo-600">Summary</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="text-xl font-semibold text-gray-700">Name</h2>
            <p className="text-2xl font-bold text-gray-800">{userData.name}</p>
          </div>

          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="text-xl font-semibold text-gray-700">BMI</h2>
            <p className="text-2xl font-bold text-gray-800">
              {bmi} ({bmiCategory})
            </p>
          </div>

          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="text-xl font-semibold text-gray-700">Height</h2>
            <p className="text-2xl font-bold text-gray-800">{userData.height} cm</p>
          </div>

          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="text-xl font-semibold text-gray-700">Weight</h2>
            <p className="text-2xl font-bold text-gray-800">{userData.weight} kg</p>
          </div>

          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="text-xl font-semibold text-gray-700">Goal</h2>
            <p className="text-2xl font-bold text-gray-800">
              {userData.goal === 'lose' ? 'Lose weight' : userData.goal === 'maintain' ? 'Maintain weight' : 'Gain weight'}
            </p>
          </div>

          {(userData.goal === 'lose' || userData.goal === 'gain') && (
            <div className="bg-white p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold text-gray-700">Target Weight</h2>
              <p className="text-2xl font-bold text-gray-800">{userData.targetWeight} kg</p>
            </div>
          )}

          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="text-xl font-semibold text-gray-700">Activity Level</h2>
            <p className="text-2xl font-bold text-gray-800">{userData.activityLevel}</p>
          </div>

          <div className="bg-white p-4 rounded-md shadow">
            <h2 className="text-xl font-semibold text-gray-700">Preferred Cuisine</h2>
            <p className="text-2xl font-bold text-gray-800">{userData.preferredCuisine}</p>
          </div>

          {userData.restrictions.length > 0 && (
            <div className="bg-white p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold text-gray-700">Dietary Restrictions</h2>
              <p className="text-2xl font-bold text-gray-800">{userData.restrictions.join(', ')}</p>
            </div>
          )}

          {userData.dislikedFoods.length > 0 && (
            <div className="bg-white p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold text-gray-700">Disliked Foods</h2>
              <p className="text-2xl font-bold text-gray-800">{userData.dislikedFoods.join(', ')}</p>
            </div>
          )}
        </div>

        {/* Sezione Calorie Totali e Macronutrienti */}
        <div className="mt-8 p-6 bg-indigo-100 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-800">Caloric and Macronutrient Distribution</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-4 rounded-md shadow">
              <h4 className="text-xl font-semibold text-gray-700">Daily Calories</h4>
              <p className="text-2xl font-bold text-gray-800">{dailyCalories}</p>
              <p className="text-gray-600">(This provides a moderate caloric deficit for weight loss while maintaining energy for workouts.)</p>
            </div>

            <div className="bg-white p-4 rounded-md shadow">
              <h4 className="text-xl font-semibold text-gray-700">Macronutrient Distribution</h4>
              <ul className="text-gray-800 text-lg">
                <li>Proteins: {protein}</li>
                <li>Carbohydrates: {carbs}</li>
                <li>Fats: {fats}</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 p-6 bg-indigo-100 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-800">Estimated Time to Reach Goal</h3>
          <div className="bg-white p-4 rounded-md shadow">
            <p className="text-2xl font-bold text-gray-800">{estimateTimeToReachGoal()}</p>
          </div>
        </div>

        <button
          onClick={() => router.push('/results')}
          className="mt-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Generate Diet Plan
        </button>
      </div>
    </div>
  );
}
