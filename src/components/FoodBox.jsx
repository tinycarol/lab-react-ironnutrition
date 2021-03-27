export default function FoodBox(props) {
  const { name, calories, image, quantity, onChange } = props;
	const onQuantityChange = (event) => {
    onChange({ ...props, quantity: event.target.value });
  };
  const onClick = () => {
    onChange({ ...props, quantity: Number(quantity) + 1 });
  };
  return (
    <div className="box">
      <article className="media">
        <div className="media-left">
          <figure className="image is-64x64">
            <img src={image} alt="Gnocchi" />
          </figure>
        </div>
        <div className="media-content">
          <div className="content">
            <p>
              <strong>{name}</strong> <br />
              <small>{calories} cal</small>
            </p>
          </div>
        </div>
        <div className="media-right">
          <div className="field has-addons">
            <div className="control">
              <input
                type="number"
                className="input"
                value={quantity}
                onChange={onQuantityChange}
              />
            </div>
            <div className="control">
              <button className="button is-info" onClick={onClick}>
                +
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}
