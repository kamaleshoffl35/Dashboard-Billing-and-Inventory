import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaRegSave } from "react-icons/fa";

const SalesReport = () => {
  const [customers, setCustomers] = useState([])
  const [salesreport, setSalesreport] = useState([])
  const [form, setForm] = useState({
    from_date: "",
    to_date: "",
    customer_id: "",
    invoice_type: "",
    payment_mode: "",
    invoice_no: ""
  })

  useEffect(() => {
    axios.get("http://localhost:5000/api/customers")
      .then(res => setCustomers(res.data))

    axios.get("http://localhost:5000/api/reports/sales")
      .then(res => setSalesreport(res.data))
      .catch(err => console.error(err))
  }, [])
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post("http://localhost:5000/api/reports/sales", form);

      setSalesreport([...salesreport, res.data]);
      setForm({
        from_date: "",
        to_date: "",
        customer_id: "",
        invoice_type: "",
        payment_mode: "",
        invoice_no: ""
      });
    } catch (err) {
      console.error(err.response?.data || err.message);
    }
  }
  return (
    <div className="container mt-4 bg-gradient-warning">


      <form className="row g-3" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">From Date<span className="text-danger">*</span></label>
          <input type="date" className="form-control bg-light" name="from_date" value={form.from_date} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">To Date<span className="text-danger">*</span></label>
          <input type="date" className="form-control bg-light" name="to_date" value={form.to_date} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Customer<span className="text-danger">*</span></label>
          <select className="form-select bg-light" name="customer_id" value={form.customer_id} onChange={handleChange}>
            <option>-- Select Customer --</option>
            {customers.map(c => (<option key={c._id} value={c._id}>{c.name}</option>))}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Invoice Type</label>
          <select className="form-select bg-light" name="invoice_type" value={form.invoice_type} onChange={handleChange}>
            <option>All</option>
            <option>Cash</option>
            <option>Credit</option>
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Invoice No</label>
          <input
            type="text"
            className="form-control bg-light"
            name="invoice_no"
            value={form.invoice_no}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-6">
          <label className="form-label">Payment Mode</label>
          <select
            className="form-select bg-light"
            name="payment_mode"
            value={form.payment_mode}
            onChange={handleChange}
          >
            <option>-- Select Payment Mode --</option>
            <option>Cash</option>
            <option>Card</option>
            <option>UPI</option>
            <option>Credit</option>
          </select>
        </div>

        <div className="col-12">
          <button type="submit" className="btn btn-primary px-4 d-flex align-center justify-center">
            <span className="text-warning me-2 d-flex align-items-center"><FaRegSave />
            </span>Save </button>
        </div>
      </form><br />
      <div className=" card shadow-sm">
        <div className="card-body">
          <h5 className="mb-3">SalesReport Tree</h5>
          <table className="table table-bordered table-striped mt-4">
            <thead className="table-dark">
              <tr>
                <th className="fw-bold">From Date</th>
                <th className="fw-bold">To Date</th>
                <th className="fw-bold">Customer</th>

                <th className="fw-bold">Invoice Type</th>


              </tr>
            </thead>
            <tbody>
              {salesreport.map((s) => (
                <tr key={s._id}>

                  <td>{s.from_date}</td>
                  <td>{s.to_date}</td>
                  <td>{s.customer_id.name}</td>
                  <td>{s.invoice_type}</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;