import React from "react";
import "./Contact.css";

function Contact() {
  return (
    <div className="contact-section">
      <h2>Contactează-ne</h2>
      <form>
        <label htmlFor="name">Nume:</label>
        <input type="text" id="name" name="name" required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="message">Mesaj:</label>
        <textarea id="message" name="message" rows={5} required />
        <button type="submit">Trimite</button>
      </form>
    </div>
  );
}

export default Contact;
