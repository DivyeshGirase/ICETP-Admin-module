"use client";

import React from "react";
import styles from "./dashboard.module.css";

interface Card {
  title: string;
  color: string;
}

const Dashboard: React.FC = () => {
  const cards: Card[] = [
    { title: "120 Projects", color: "#00bcd4" },
    { title: "56 Orders", color: "#4caf50" },
    { title: "12 Categories", color: "#ff9800" },
    { title: "32 Users", color: "#f44336" },
  ];

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>
      <div className={styles.cardsContainer}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={styles.card}
            style={{ backgroundColor: card.color }}
          >
            <h3>{card.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
