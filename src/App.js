import { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToogleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearItems() {
    const confirm = window.confirm(
      "Are you sure you want to delete all items ?"
    );
    if (confirm) setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <From onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItems={handleDeleteItems}
        onUpdateItems={handleToogleItems}
        onClearItems={handleClearItems}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🏝 Far Away 👜</h1>;
}
//
function From({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);

    onAddItems(newItem);

    setDescription(() => "");
    setQuantity(() => 1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip ?</h3>
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
//
function PackingList({ items, onDeleteItems, onUpdateItems, onClearItems }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;
  if (sortBy === "input") sortedItems = items;
  else if (sortBy === "description")
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  else if (sortBy === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems
          .map((item) => (
            <Item
              item={item}
              onDeleteItems={onDeleteItems}
              onUpdateItems={onUpdateItems}
              key={item.id}
            />
          ))
          .sort((a, b) => a[`${sortBy}`] - b[`${sortBy}`])}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sorted by input order</option>
          <option value="description">Sorted by description </option>
          <option value="packed">Sorted by packed status</option>
        </select>
        <button onClick={onClearItems}>Clear list</button>
      </div>
    </div>
  );
}
//
function Item({ item, onDeleteItems, onUpdateItems }) {
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
//
function Stats({ items }) {
  if (!items.length)
    return (
      <footer className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </footer>
    );

  const numItems = items.length;
  const packedItems = items.filter((item) => item.packed).length;
  const packedItemsPrecent = Math.round((packedItems * 100) / numItems) || 0;

  return (
    <footer className="stats">
      {packedItemsPrecent === 100 ? (
        <em>You got everything! Ready to go 🛫</em>
      ) : (
        <em>
          👜 You have {numItems} items on your list , and you already packed
          {` ${packedItems} `}({packedItemsPrecent}%)
        </em>
      )}
    </footer>
  );
}
