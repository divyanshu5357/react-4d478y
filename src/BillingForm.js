import React, { useState } from "react";
import "./billingstyle.css"
const BillingForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [items, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleAddItem = () => {
    setItems([...items, { item: "", quantity: 0, price: 0 }]);
  };

  const handleRemoveItem = (index) => {
    setItems([...items.slice(0, index), ...items.slice(index + 1)]);
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...items];
    updatedItems[index][field] = value;
    setItems(updatedItems);
  };

  const handleCreateBill = () => {
    // Calculate total price
    let totalPrice = 0;
    for (const item of items) {
      totalPrice += item.quantity * item.price;
    }
    setTotalPrice(totalPrice);
  };

  return (
    <div>
      <h1>Billing Form</h1>
      <label>
        Customer Name:
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </label>
      <br />
      <br />
      <h2>Items</h2>
      <button onClick={handleAddItem}>Add More Item</button>
      <br />
      <br />
      {items.map((item, index) => (
        <div key={index}>
          <label>
            Item:
            <input
              type="text"
              value={item.item}
              onChange={(e) => handleItemChange(index, "item", e.target.value)}
            />
          </label>
          <label>
            Quantity:
            <input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", parseInt(e.target.value))
              }
            />
          </label>
          <label>
            Price:
            <input
              type="number"
              value={item.price}
              onChange={(e) =>
                handleItemChange(index, "price", parseFloat(e.target.value))
              }
            />
          </label>
          <button onClick={() => handleRemoveItem(index)}>Remove</button>
        </div>
      ))}
      <br />
      <button onClick={handleCreateBill}>Create Bill</button>
      <br />
      <br />
      {totalPrice > 0 && (
        <div>
          <h2>Overall Bill</h2>
          <table>
            <tbody>
              <tr>
                <td colSpan={5} align="center">
                  Customer Name: {customerName}
                </td>
              </tr>
              <tr>
                <td colSpan={5} align="center">
                  Date: {new Date().toLocaleDateString()}
                </td>
              </tr>
              <tr>
                <td>Sr. Number</td>
                <td>Item</td>
                <td>Quantity</td>
                <td>Price</td>
                <td>Total</td>
              </tr>
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item.item}</td>
                    <td>{item.quantity}</td>
                   
                    <td>{item.price}</td>
                    <td>{item.quantity * item.price}</td>
                  </tr>
                </React.Fragment>
              ))}
              <tr>
                <td colSpan={4} align="right">
                  Total Price:
                </td>
                <td>{totalPrice}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
export default BillingForm;