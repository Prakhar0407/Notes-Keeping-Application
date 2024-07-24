import React from "react"

const EmptyCard = ({ imgSrc, message }) => {
  return (
    <div className="empty-card">

      <p>{message}</p>
    </div>
  );
};

export default EmptyCard
