import { useEffect, useState } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    fetch("https://contact-management-backend-9tet.onrender.com/api/contacts")
      .then(res => res.json())
      .then(data => setContacts(data));
  }, []);

  const addContact = (contact) => {
    setContacts([contact, ...contacts]);
  };

  const deleteContact = async (id) => {
    await fetch(`https://contact-management-backend-9tet.onrender.com/api/contacts/${id}`, {
      method: "DELETE"
    });
    setContacts(contacts.filter(c => c._id !== id));
  };

  return (
    <div>
      <h2>Contact Manager</h2>
      <ContactForm onAdd={addContact} />
      <ContactList contacts={contacts} onDelete={deleteContact} />
    </div>
  );
}

export default App;
