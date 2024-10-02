'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface FoodItem {
  name: string;
  quantity: number;
  unit: string;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

interface Meal {
  name: string;
  foods: FoodItem[];
}

interface DayPlan {
  day: string;
  meals: Meal[];
}

export default function Results() {
  const [userData, setUserData] = useState<any>(null);
  const [weeklyDietPlan, setWeeklyDietPlan] = useState<DayPlan[]>([]);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [selectedDay, setSelectedDay] = useState<string>('Monday');
  const router = useRouter();

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    } else {
      router.push('/');
    }
  }, [router]);

  useEffect(() => {
    if (userData) {
      generateWeeklyDietPlan();
    }
  }, [userData]);

  const generateWeeklyDietPlan = () => {
    const weeklyPlan: DayPlan[] = daysOfWeek.map(day => {
      const dayPlan = generateDayPlan(day);
      const totals = calculateDayTotals(dayPlan.meals);
      return {
        day,
        meals: dayPlan.meals,
        ...totals
      };
    });
    setWeeklyDietPlan(weeklyPlan);
  };

  const generateDayPlan = (day: string): { meals: Meal[] } => {
    switch (day) {
      case 'Monday':
        return {
          meals: [
            {
              name: 'Breakfast',
              foods: [
                { name: 'Greek yogurt', quantity: 200, unit: 'g', protein: 20, carbs: 8, fat: 4, calories: 148 },
                { name: 'Mixed berries', quantity: 100, unit: 'g', protein: 1, carbs: 14, fat: 1, calories: 69 },
                { name: 'Honey', quantity: 15, unit: 'g', protein: 0, carbs: 12, fat: 0, calories: 49 }
              ]
            },
            {
              name: 'Lunch',
              foods: [
                { name: 'Grilled chicken breast', quantity: 150, unit: 'g', protein: 31, carbs: 0, fat: 3, calories: 165 },
                { name: 'Quinoa', quantity: 50, unit: 'g', protein: 4, carbs: 20, fat: 2, calories: 111 },
                { name: 'Steamed broccoli', quantity: 100, unit: 'g', protein: 3, carbs: 7, fat: 0, calories: 55 }
              ]
            },
            {
              name: 'Snack',
              foods: [
                { name: 'Apple', quantity: 1, unit: 'medium', protein: 0, carbs: 25, fat: 0, calories: 95 },
                { name: 'Almonds', quantity: 30, unit: 'g', protein: 6, carbs: 6, fat: 14, calories: 164 }
              ]
            },
            {
              name: 'Dinner',
              foods: [
                { name: 'Baked salmon', quantity: 150, unit: 'g', protein: 22, carbs: 0, fat: 12, calories: 206 },
                { name: 'Brown rice', quantity: 50, unit: 'g', protein: 3, carbs: 32, fat: 1, calories: 150 },
                { name: 'Roasted asparagus', quantity: 100, unit: 'g', protein: 2, carbs: 5, fat: 0, calories: 27 }
              ]
            }
          ]
        };
      case 'Tuesday':
        return {
          meals: [
            {
              name: 'Breakfast',
              foods: [
                { name: 'Whole grain toast', quantity: 2, unit: 'slices', protein: 8, carbs: 28, fat: 2, calories: 160 },
                { name: 'Avocado', quantity: 50, unit: 'g', protein: 1, carbs: 4, fat: 8, calories: 80 },
                { name: 'Scrambled eggs', quantity: 2, unit: 'large', protein: 12, carbs: 1, fat: 10, calories: 140 }
              ]
            },
            {
              name: 'Lunch',
              foods: [
                { name: 'Turkey sandwich', quantity: 1, unit: 'sandwich', protein: 20, carbs: 30, fat: 8, calories: 280 },
                { name: 'Carrot sticks', quantity: 100, unit: 'g', protein: 1, carbs: 10, fat: 0, calories: 41 },
                { name: 'Hummus', quantity: 30, unit: 'g', protein: 2, carbs: 4, fat: 5, calories: 70 }
              ]
            },
            {
              name: 'Snack',
              foods: [
                { name: 'Greek yogurt', quantity: 150, unit: 'g', protein: 15, carbs: 6, fat: 5, calories: 135 },
                { name: 'Granola', quantity: 30, unit: 'g', protein: 3, carbs: 20, fat: 6, calories: 140 }
              ]
            },
            {
              name: 'Dinner',
              foods: [
                { name: 'Lean beef steak', quantity: 150, unit: 'g', protein: 26, carbs: 0, fat: 15, calories: 240 },
                { name: 'Sweet potato', quantity: 150, unit: 'g', protein: 2, carbs: 26, fat: 0, calories: 114 },
                { name: 'Green beans', quantity: 100, unit: 'g', protein: 2, carbs: 7, fat: 0, calories: 31 }
              ]
            }
          ]
        };
      case 'Wednesday':
        return {
          meals: [
            {
              name: 'Breakfast',
              foods: [
                { name: 'Oatmeal', quantity: 40, unit: 'g', protein: 6, carbs: 27, fat: 3, calories: 158 },
                { name: 'Banana', quantity: 1, unit: 'medium', protein: 1, carbs: 27, fat: 0, calories: 105 },
                { name: 'Peanut butter', quantity: 15, unit: 'g', protein: 4, carbs: 3, fat: 8, calories: 94 }
              ]
            },
            {
              name: 'Lunch',
              foods: [
                { name: 'Tuna salad', quantity: 150, unit: 'g', protein: 20, carbs: 5, fat: 12, calories: 210 },
                { name: 'Whole grain crackers', quantity: 30, unit: 'g', protein: 3, carbs: 22, fat: 3, calories: 130 },
                { name: 'Cherry tomatoes', quantity: 100, unit: 'g', protein: 1, carbs: 4, fat: 0, calories: 18 }
              ]
            },
            {
              name: 'Snack',
              foods: [
                { name: 'Cottage cheese', quantity: 100, unit: 'g', protein: 11, carbs: 3, fat: 5, calories: 98 },
                { name: 'Pineapple chunks', quantity: 100, unit: 'g', protein: 1, carbs: 13, fat: 0, calories: 50 }
              ]
            },
            {
              name: 'Dinner',
              foods: [
                { name: 'Grilled tofu', quantity: 150, unit: 'g', protein: 18, carbs: 3, fat: 12, calories: 180 },
                { name: 'Stir-fried vegetables', quantity: 200, unit: 'g', protein: 5, carbs: 15, fat: 3, calories: 100 },
                { name: 'Brown rice', quantity: 50, unit: 'g', protein: 3, carbs: 32, fat: 1, calories: 150 }
              ]
            }
          ]
        };
      default:
        // For other days, return the original diet plan
        return {
          meals: [
            {
              name: 'Breakfast',
              foods: [
                { name: 'Oatmeal', quantity: 40, unit: 'g', protein: 6, carbs: 27, fat: 3, calories: 158 },
                { name: 'Berries', quantity: 100, unit: 'g', protein: 1, carbs: 14, fat: 0, calories: 60 },
                { name: 'Protein shake', quantity: 30, unit: 'g', protein: 25, carbs: 3, fat: 2, calories: 130 }
              ]
            },
            {
              name: 'Lunch',
              foods: [
                { name: 'Grilled chicken', quantity: 150, unit: 'g', protein: 31, carbs: 0, fat: 3, calories: 165 },
                { name: 'Mixed salad', quantity: 100, unit: 'g', protein: 2, carbs: 5, fat: 0, calories: 25 },
                { name: 'Olive oil dressing', quantity: 15, unit: 'ml', protein: 0, carbs: 0, fat: 14, calories: 126 }
              ]
            },
            {
              name: 'Snack',
              foods: [
                { name: 'Greek yogurt', quantity: 150, unit: 'g', protein: 15, carbs: 6, fat: 5, calories: 135 },
                { name: 'Almonds', quantity: 30, unit: 'g', protein: 6, carbs: 6, fat: 14, calories: 164 }
              ]
            },
            {
              name: 'Dinner',
              foods: [
                { name: 'Baked salmon', quantity: 150, unit: 'g', protein: 22, carbs: 0, fat: 12, calories: 206 },
                { name: 'Steamed broccoli', quantity: 100, unit: 'g', protein: 4, carbs: 7, fat: 0, calories: 55 },
                { name: 'Quinoa', quantity: 50, unit: 'g', protein: 8, carbs: 39, fat: 4, calories: 222 }
              ]
            }
          ]
        };
    }
  };

  const calculateDayTotals = (meals: Meal[]) => {
    return meals.reduce((totals, meal) => {
      meal.foods.forEach(food => {
        totals.totalCalories += food.calories;
        totals.totalProtein += food.protein;
        totals.totalCarbs += food.carbs;
        totals.totalFat += food.fat;
      });
      return totals;
    }, { totalCalories: 0, totalProtein: 0, totalCarbs: 0, totalFat: 0 });
  };

  const generateShoppingList = () => {
    const shoppingList: Record<string, number> = {};
    weeklyDietPlan.forEach(dayPlan => {
      dayPlan.meals.forEach(meal => {
        meal.foods.forEach(food => {
          if (shoppingList[food.name]) {
            shoppingList[food.name] += food.quantity;
          } else {
            shoppingList[food.name] = food.quantity;
          }
        });
      });
    });
    return shoppingList;
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text('Your Weekly Diet Plan', 14, 22);
    
    doc.setFontSize(12);
    doc.text(`Name: ${userData.name}`, 14, 30);
    doc.text(`Goal: ${userData.goal} weight`, 14, 38);
    
    let yOffset = 50;
    
    weeklyDietPlan.forEach((dayPlan, dayIndex) => {
      doc.setFontSize(16);
      doc.text(dayPlan.day, 14, yOffset);
      yOffset += 10;
      
      dayPlan.meals.forEach((meal, mealIndex) => {
        doc.setFontSize(14);
        doc.text(meal.name, 14, yOffset);
        yOffset += 10;
        
        // @ts-ignore
        doc.autoTable({
          startY: yOffset,
          head: [['Food', 'Quantity', 'Protein (g)', 'Carbs (g)', 'Fat (g)', 'Calories']],
          body: meal.foods.map(food => [
            food.name,
            `${food.quantity} ${food.unit}`,
            food.protein,
            food.carbs,
            food.fat,
            food.calories
          ]),
        });
        
        yOffset = doc.lastAutoTable.finalY + 15;
      });
      
      doc.setFontSize(14);
      doc.text(`Daily Totals:`, 14, yOffset);
      yOffset += 10;
      doc.setFontSize(12);
      doc.text(`Calories: ${dayPlan.totalCalories} kcal`, 14, yOffset);
      yOffset += 6;
      doc.text(`Protein: ${dayPlan.totalProtein} g`, 14, yOffset);
      yOffset += 6;
      doc.text(`Carbs: ${dayPlan.totalCarbs} g`, 14, yOffset);
      yOffset += 6;
      doc.text(`Fat: ${dayPlan.totalFat} g`, 14, yOffset);
      yOffset += 10;
      
      if (dayIndex < weeklyDietPlan.length - 1) {
        doc.addPage();
        yOffset = 20;
      }
    });
    
    // Add shopping list
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Weekly Shopping List', 14, 20);
    yOffset = 30;
    
    const shoppingList = generateShoppingList();
    // @ts-ignore
    doc.autoTable({
      startY: yOffset,
      head: [['Item', 'Quantity']],
      body: Object.entries(shoppingList).map(([item, quantity]) => [item, `${quantity} g`]),
    });
    
    doc.save('weekly_diet_plan.pdf');
  };

  if (!userData || weeklyDietPlan.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Weekly Diet Plan</h1>
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2 text-indigo-600">Hello, {userData.name}!</h2>
          <p className="text-gray-600">Based on your goal to <span className="font-medium">{userData.goal} weight</span>, here's your weekly diet plan:</p>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-medium text-gray-700 mb-2">Select a day:</h3>
          <div className="flex flex-wrap gap-2">
            {daysOfWeek.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2 rounded-full text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  selectedDay === day
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {day.slice(0, 3)}
              </button>
            ))}
          </div>
        </div>
        {weeklyDietPlan.find(dayPlan => dayPlan.day === selectedDay)?.meals.map((meal, index) => (
          <div key={index} className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-indigo-600">{meal.name}</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Food</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Protein (g)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Carbs (g)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fat (g)</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Calories</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {meal.foods.map((food, foodIndex) => (
                  <tr key={foodIndex}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{food.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.quantity} {food.unit}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.protein}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.carbs}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.fat}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{food.calories}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
        <div className="mt-8 p-6 bg-indigo-100 rounded-lg shadow-md">
          <h3 className="text-2xl font-semibold mb-4 text-indigo-800">Daily Totals</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-md shadow">
              <p className="text-lg font-medium text-indigo-600">Total Calories</p>
              <p className="text-2xl font-bold text-gray-800">
                {weeklyDietPlan.find(dayPlan => dayPlan.day === selectedDay)?.totalCalories} kcal
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <p className="text-lg font-medium text-green-600">Total Protein</p>
              <p className="text-2xl font-bold text-gray-800">
                {weeklyDietPlan.find(dayPlan => dayPlan.day === selectedDay)?.totalProtein} g
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <p className="text-lg font-medium text-yellow-600">Total Carbs</p>
              <p className="text-2xl font-bold text-gray-800">
                {weeklyDietPlan.find(dayPlan => dayPlan.day === selectedDay)?.totalCarbs} g
              </p>
            </div>
            <div className="bg-white p-4 rounded-md shadow">
              <p className="text-lg font-medium text-red-600">Total Fat</p>
              <p className="text-2xl font-bold text-gray-800">
                {weeklyDietPlan.find(dayPlan => dayPlan.day === selectedDay)?.totalFat} g
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 space-y-4">
          <button
            onClick={() => setShowShoppingList(!showShoppingList)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
          >
            {showShoppingList ? 'Hide Shopping List' : 'Generate Shopping List'}
          </button>
          
          <button
            onClick={generatePDF}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Download Weekly Diet Plan PDF
          </button>
          
          {showShoppingList && (
            <div className="mt-4 p-6 bg-indigo-100 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold mb-4 text-indigo-800">Weekly Shopping List</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(generateShoppingList()).map(([item, quantity]) => (
                  <div key={item} className="bg-white p-4 rounded-md shadow">
                    <p className="text-lg font-medium text-indigo-600">{item}</p>
                    <p className="text-2xl font-bold text-gray-800">{quantity} g</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <button
          onClick={() => router.push('/')}
          className="mt-8 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Start Over
        </button>
      </div>
    </div>
  );
}