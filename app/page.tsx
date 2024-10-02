'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaWeight, FaBirthdayCake, FaMars, FaVenus, FaCheckCircle } from 'react-icons/fa';
import { IoMdFitness } from 'react-icons/io';
import { MdRestaurantMenu } from 'react-icons/md';

const steps = [
  { name: 'Personal Info', icon: FaUser, fields: ['name', 'age', 'gender'] },
  { name: 'Body Metrics', icon: FaWeight, fields: ['height', 'weight'] },
  { name: 'Goals', icon: IoMdFitness, fields: ['goal', 'activityLevel'] },
  { name: 'Diet Preferences', icon: MdRestaurantMenu, fields: ['dietType', 'restrictions', 'dislikedFoods', 'preferredCuisine'] }
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    goal: '',
    activityLevel: '',
    dietType: '',
    restrictions: [],
    dislikedFoods: [],
    preferredCuisine: ''
  });
  const [newDislikedFood, setNewDislikedFood] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter(item => item !== value)
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem('userData', JSON.stringify(userData));
    router.push('/summary'); // Reindirizza alla pagina di riepilogo
  };

  const handleAddDislikedFood = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newDislikedFood && !userData.dislikedFoods.includes(newDislikedFood)) {
      setUserData(prev => ({
        ...prev,
        dislikedFoods: [...prev.dislikedFoods, newDislikedFood]
      }));
      setNewDislikedFood('');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-2 text-center text-indigo-600">NutriPlan Pro</h1>
        <p className="text-xl text-center text-gray-600 mb-6">Your Personalized Diet Journey</p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {currentStep === 0 && (
            <>
              <div className="flex items-center space-x-2">
                <FaUser className="text-indigo-600" />
                <input
                  className="flex-grow mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={userData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaBirthdayCake className="text-indigo-600" />
                <input
                  className="flex-grow mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  name="age"
                  type="number"
                  placeholder="Your Age"
                  value={userData.age}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 text-gray-700">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={userData.gender === 'male'}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <FaMars className="text-blue-500" />
                  <span>Male</span>
                </label>
                <label className="flex items-center space-x-2 text-gray-700">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={userData.gender === 'female'}
                    onChange={handleChange}
                    className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                  />
                  <FaVenus className="text-pink-500" />
                  <span>Female</span>
                </label>
              </div>
            </>
          )}
          {currentStep === 1 && (
            <>
              <div className="flex items-center space-x-2">
                <FaWeight className="text-indigo-600" />
                <input
                  className="flex-grow mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  name="height"
                  type="number"
                  placeholder="Your Height (cm)"
                  value={userData.height}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <FaWeight className="text-indigo-600" />
                <input
                  className="flex-grow mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-gray-700 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  name="weight"
                  type="number"
                  placeholder="Your Weight (kg)"
                  value={userData.weight}
                  onChange={handleChange}
                  required
                />
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Goal</label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-700"
                  name="goal"
                  value={userData.goal}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select goal</option>
                  <option value="lose">Lose weight</option>
                  <option value="maintain">Maintain weight</option>
                  <option value="gain">Gain weight</option>
                </select>
              </div>

              {/* Campo per inserire il peso target solo se l'obiettivo è perdere o guadagnare peso */}
              {(userData.goal === 'lose' || userData.goal === 'gain') && (
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Target Weight (kg)
                  </label>
                  <input
                    type="number"
                    name="targetWeight"
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-700"
                    placeholder="Enter your target weight"
                    value={userData.targetWeight || ''}
                    onChange={handleChange}
                    required
                  />
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Activity Level</label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-700"
                  name="activityLevel"
                  value={userData.activityLevel}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select activity level</option>
                  <option value="sedentary">Sedentary</option>
                  <option value="light">Lightly Active</option>
                  <option value="moderate">Moderately Active</option>
                  <option value="very">Very Active</option>
                  <option value="extra">Extra Active</option>
                </select>
              </div>

              {/* Numero di allenamenti settimanali */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mt-4">Weekly Workouts</label>
                <input
                  type="range"
                  name="workoutsPerWeek"
                  min="0"
                  max="7"
                  value={userData.workoutsPerWeek || 0}
                  onChange={(e) => setUserData(prev => ({ ...prev, workoutsPerWeek: e.target.value }))}
                  className="w-full mt-2"
                />
                <div className="text-gray-700 mt-1">
                  {userData.workoutsPerWeek ? `${userData.workoutsPerWeek} workouts per week` : "No workouts"}
                </div>
              </div>

              {/* Intensità degli allenamenti */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mt-4">Workout Intensity</label>
                <input
                  type="range"
                  name="workoutIntensity"
                  min="1"
                  max="10"
                  value={userData.workoutIntensity || 5}
                  onChange={(e) => setUserData(prev => ({ ...prev, workoutIntensity: e.target.value }))}
                  className="w-full mt-2"
                />
                <div className="text-gray-700 mt-1">
                  Intensity: {userData.workoutIntensity ? `${userData.workoutIntensity}/10` : "Moderate"}
                </div>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700">Diet Type</label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-700"
                  name="dietType"
                  value={userData.dietType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select diet type</option>
                  <option value="omnivore">Omnivore</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                  <option value="pescatarian">Pescatarian</option>
                  <option value="keto">Keto</option>
                  <option value="paleo">Paleo</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Cuisine</label>
                <select
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md text-gray-700"
                  name="preferredCuisine"
                  value={userData.preferredCuisine}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select cuisine type</option>
                  <option value="italian">Italian</option>
                  <option value="japanese">Japanese</option>
                  <option value="mexican">Mexican</option>
                  <option value="indian">Indian</option>
                  <option value="mediterranean">Mediterranean</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dietary Restrictions</label>
                {['Gluten-free', 'Lactose-free', 'Nut-free', 'Soy-free', 'Low-carb'].map((restriction) => (
                  <label key={restriction} className="flex items-center space-x-2 mb-2 text-gray-700">
                    <input
                      type="checkbox"
                      name="restrictions"
                      value={restriction}
                      checked={userData.restrictions.includes(restriction)}
                      onChange={handleCheckboxChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <span>{restriction}</span>
                  </label>
                ))}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Foods You Dislike</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {userData.dislikedFoods.map((food) => (
                    <span key={food} className="bg-gray-100 px-3 py-1 rounded-full text-gray-700 flex items-center">
                      {food}
                      <button
                        type="button"
                        onClick={() => handleRemoveDislikedFood(food)}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex">
                  <input
                    type="text"
                    value={newDislikedFood}
                    onChange={(e) => setNewDislikedFood(e.target.value)}
                    placeholder="Enter a food you dislike"
                    className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="button"
                    onClick={handleAddDislikedFood}
                    className="px-4 py-2 border border-transparent rounded-r-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Add
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="flex justify-between mt-6">
            {currentStep > 0 && (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev - 1)}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Previous
              </button>
            )}
            {currentStep < steps.length - 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(prev => prev + 1)}
                className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
              </button>
            ) : (
              <button
                type="submit"
                className="ml-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Confirm and Proceed to Summary
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
