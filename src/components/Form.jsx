import { useState } from "react";

export default function FormSection() {
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    const birthday = new Date(formData.birthday);

    const isBirthday =
      birthday.getDate() === today.getDate() &&
      birthday.getMonth() === today.getMonth();

    try {
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbwfM4tCsxiFcgrQfAJDiRShkRHhRRSauC_SWrvoR39wIZ60WOlAJRjSqnMHVM1j7d-BJw/exec",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) throw new Error("Failed to submit");

      if (isBirthday) {
        setMessage(`🎉 Happy Birthday ${formData.name}! May this new year bring divine favor and blessings.`);
      } else {
        setMessage(`🙏 Thank you ${formData.name} for joining Glorious Anchor Life Ministry.`);
      }

      setSubmitted(true);
    } catch (error) {
      console.error(error);
      setMessage("⚠️ Something went wrong. Please try again.");
      setSubmitted(true);
    }
  };

  return (
    <section className="form-section" id="form">
      <h2>Membership Registration</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input name="name" placeholder="Full Name" required onChange={handleChange} />
          <input name="phone" placeholder="Phone Number" required onChange={handleChange} />
          <input name="email" type="email" placeholder="Email Address" required onChange={handleChange} />
          <input name="location" placeholder="Location" required onChange={handleChange} />
          <input name="birthday" type="date" required onChange={handleChange} />

          <div className="checkbox-group">
            <h3>Gender</h3>
            <label>
              <input type="radio" name="gender" value="Male" onChange={handleChange} required /> Male
            </label>
            <label>
              <input type="radio" name="gender" value="Female" onChange={handleChange} required /> Female
            </label>
          </div>

          <button type="submit">Submit</button>
        </form>
      ) : (
        <div className="success">{message}</div>
      )}
    </section>
  );
}