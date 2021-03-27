export default function TodaysFood({ foods, removeFood }) {
  const onRemoveClick = (food) => () => {
    removeFood(food);
  };
  return (
    <div className="column content">
      <h2 className="subtitle">Today's foods</h2>
      <ul>
        {foods
          .filter((food) => food.quantity > 0)
          .map((food) => (
            <li key={food.id}>
              {food.quantity} {food.name} = {food.quantity * food.calories} cal
              <span
                className="ml-2 remove-button"
                onClick={onRemoveClick(food)}
              >
                🗑️
              </span>
            </li>
          ))}
      </ul>
      <strong>
        Total:
        {foods.reduce((accumulator, food) => {
          return accumulator + food.quantity * food.calories;
        }, 0)}
        cal
      </strong>
    </div>
  );
}
