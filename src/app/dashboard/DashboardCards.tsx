import React from 'react';
import Sidebar from "@/components/Sidebar";


// Define the card type to specify the structure of card data
interface Card {
  title: string;
  color: string;
}

// Sample data for the dashboard cards
const cards: Card[] = [
  { title: "120 Projects", color: "bg-blue-500" },
  { title: "56 Orders", color: "bg-green-500" },
  { title: "12 Categories", color: "bg-yellow-500" },
  { title: "32 Users", color: "bg-red-500" },
];

const DashboardCards: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`p-6 text-white rounded-lg shadow-lg ${card.color}`}
        >
          <h3 className="text-xl font-semibold">{card.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
