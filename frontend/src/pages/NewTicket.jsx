import { useState } from "react";
import { useSelector } from "react-redux";

const NewTicket = () => {
  const { user } = useSelector((state) => state.auth);
  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("iPhone");
  const [model, setModel] = useState("");
  const [description, setDescription] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            id="name"
            disabled
          />
        </div>
        <div className="form-group">
          <label htmlFor="name">Customer Email</label>
          <input
            type="text"
            className="form-control"
            value={email}
            id="email"
            disabled
          />
        </div>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="MacBook">MacBook</option>
              <option value="iPad">iPad</option>
              <option value="iMac">iMac</option>
              <option value="Watch">Watch</option>
              <option value="AirPods">AirPods</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Model of the device</label>
            <input
              type="text"
              name="model"
              id="model"
              className="form-control"
              placeholder="Model"
              value={model}
              onChange={(e) => setDescription(e.target.value)}
            ></input>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              name="description"
              id="description"
              className="form-control"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <button className="btn btn-block">Submit</button>
          </div>
        </form>
      </section>
    </>
  );
};

export default NewTicket;
