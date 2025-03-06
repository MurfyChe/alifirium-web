import React, { useState } from "react";
import "./Contact.css";

function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    if (!name) {
      alert("Te rog să introduci un nume!");
      return;
    }

    const fileContent = `Nume: ${name}\nEmail: ${email}\nMesaj: ${message}`;
    const blob = new Blob([fileContent], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${name}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="contact-section">
      <h2>Contactează-ne</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nume:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="message">Mesaj:</label>
        <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required />

        <button type="submit">Trimite</button>
      </form>
    </div>
  );
}

export default Contact;
