export default function Item({ item, onDeleteItems, onUpdateItems }) {
  return (
    <li>
      <input
        id={item.id}
        type="checkbox"
        value={item.packed}
        onChange={() => onUpdateItems(item.id)}
      />
      <label
        htmlFor={item.id}
        style={item.packed ? { textDecoration: "line-through" } : {}}
      >
        {item.quantity} {item.description}
      </label>
      <button onClick={() => onDeleteItems(item.id)}>❌</button>
    </li>
  );
}
