export default function Stats({ items }) {
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
