import { useState } from "react";

export default function ContactForm({ onAdd }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    if (!form.name) errs.name = "Name required";
    if (!form.phone) errs.phone = "Phone required";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      errs.email = "Invalid email";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = await fetch("http://localhost:5000/api/contacts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    onAdd(data);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Name" value={form.name}
        onChange={e => setForm({ ...form, name: e.target.value })} />
      {errors.name && <p>{errors.name}</p>}

      <input placeholder="Email" value={form.email}
        onChange={e => setForm({ ...form, email: e.target.value })} />
      {errors.email && <p>{errors.email}</p>}

      <input placeholder="Phone" value={form.phone}
        onChange={e => setForm({ ...form, phone: e.target.value })} />
      {errors.phone && <p>{errors.phone}</p>}

      <textarea placeholder="Message"
        onChange={e => setForm({ ...form, message: e.target.value })} />

      <button disabled={!form.name || !form.phone}>Submit</button>
    </form>
  );
}
