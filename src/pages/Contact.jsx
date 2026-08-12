import { useState } from "react";
import { Helmet } from "react-helmet-async";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function encodeFormData(data) {
  return Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join("&");
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "", "bot-field": "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  }

  function validate() {
    const next = {};
    if (!form.name.trim()) next.name = "please enter your name";
    if (!form.email.trim()) next.email = "please enter your email";
    else if (!EMAIL_RE.test(form.email.trim())) next.email = "please enter a valid email address";
    if (!form.message.trim()) next.message = "please enter a message";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (status === "submitting") return;
    if (form["bot-field"]) return; // honeypot tripped — silently drop, don't hit the network
    if (!validate()) return;

    setStatus("submitting");

    try {
      const response = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encodeFormData({
          "form-name": "contact",
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
          "bot-field": form["bot-field"],
        }),
      });

      if (!response.ok) throw new Error(`Netlify form submission failed: ${response.status}`);

      setForm({ name: "", email: "", message: "" });
      setErrors({});
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="page page-contact">
      <Helmet>
        <title>Contact - Smart Affirmations</title>
        <meta
          name="description"
          content="questions, feedback, or a bug to report? send the smart affirmations team a message and we'll get back to you."
        />
        <link rel="canonical" href="https://smartaffirmations.com/contact" />
      </Helmet>

      <section className="contact-hero">
        <span className="eyebrow">contact</span>
        <h1>get in touch</h1>
        <p className="tagline">we'd love to hear from you with any comments or questions</p>
      </section>

      <section className="contact-form">
        <p className="contact-intro">
          got a question about affirmations, found a bug, or just want to say hi? drop us a message
          below — we read every one and reply as soon as we can.
        </p>

        <form
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          className="contact-form-box"
          onSubmit={handleSubmit}
          noValidate
        >
          <input type="hidden" name="form-name" value="contact" />

          <p className="honeypot-field" aria-hidden="true">
            <label htmlFor="bot-field">leave this field blank</label>
            <input
              id="bot-field"
              name="bot-field"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              value={form["bot-field"]}
              onChange={handleChange}
            />
          </p>

          <label htmlFor="name">name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="your name"
            value={form.name}
            onChange={handleChange}
            disabled={status === "submitting"}
          />
          {errors.name && <span className="field-error">{errors.name}</span>}

          <label htmlFor="email">email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            disabled={status === "submitting"}
          />
          {errors.email && <span className="field-error">{errors.email}</span>}

          <label htmlFor="message">message</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="what's on your mind?"
            value={form.message}
            onChange={handleChange}
            disabled={status === "submitting"}
          />
          {errors.message && <span className="field-error">{errors.message}</span>}

          <button
            type="submit"
            className="btn btn-primary contact-submit-btn"
            disabled={status === "submitting"}
          >
            {status === "submitting" ? "sending…" : "send message →"}
          </button>

          {status === "success" && (
            <div className="form-status form-status-success">
              <span className="status-stamp">✓ sent</span>
              <p>thanks — your message is in. we'll get back to you soon.</p>
            </div>
          )}

          {status === "error" && (
            <div className="form-status form-status-error">
              <span className="status-stamp">✕ error</span>
              <p>something went wrong sending your message. please try again in a moment.</p>
            </div>
          )}
        </form>
      </section>
    </div>
  );
}
