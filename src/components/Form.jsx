import { useState } from "react";

export default function FormSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    birthday: "",
    gender: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Update formData on input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit form to Google Apps Script
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSubmitted(false);

    const today = new Date();
    const birthday = new Date(formData.birthday);
    const isBirthday =
      birthday.getDate() === today.getDate() &&
      birthday.getMonth() === today.getMonth();

    try {
      // const res = await fetch(
      //   "https://script.google.com/macros/s/AKfycbzvEnwSbaVuLnys2P1FmnjMzVdbkVMPTgJNPOO0hDMBhky45S25BY2nPwca3SEBZ_aHXQ/exec",
      //   {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify(formData),
      //   }
      const res = await fetch(
        "https://script.google.com/macros/s/AKfycbxQgvLF_1hqnmlDAMAiLErAct1kacbTTNVIuqf3TaHtHr7NNteDZs19C1vE6kpWalUgTQ/exec",
        {
          method: "POST",
          // headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      // );

      if (!res.ok) throw new Error("Failed to submit");

      // Show birthday or regular success message
      if (isBirthday) {
        setMessage(
          `🎉 Happy Birthday ${formData.name}! May this new year bring divine favor and blessings.`
        );
      } else {
        setMessage(
          `🙏 Thank you ${formData.name} for joining Glorious Anchor Life Ministry.`
        );
      }

      setSubmitted(true);
      setFormData({
        name: "",
        phone: "",
        email: "",
        location: "",
        birthday: "",
        gender: "",
      }); // reset form
    } catch (err) {
      console.error(err);
      setMessage("⚠️ Something went wrong. Please try again.");
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="form-section" id="form">
      <h2>Membership Registration</h2>

      {!submitted ? (
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <input
            name="phone"
            placeholder="Phone Number"
            required
            onChange={handleChange}
            value={formData.phone}
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            onChange={handleChange}
            value={formData.email}
          />
          <input
            name="location"
            placeholder="Location"
            required
            onChange={handleChange}
            value={formData.location}
          />
          <input
            name="birthday"
            type="date"
            required
            onChange={handleChange}
            value={formData.birthday}
          />

          <div className="checkbox-group">
            <h3>Gender</h3>
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                onChange={handleChange}
                checked={formData.gender === "Male"}
                required
              />{" "}
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                onChange={handleChange}
                checked={formData.gender === "Female"}
                required
              />{" "}
              Female
            </label>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      ) : (
        <div className="success">{message}</div>
      )}
    </section>
  );
}