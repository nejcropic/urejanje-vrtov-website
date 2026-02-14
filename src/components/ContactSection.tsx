import { useState } from "react";
import { motion } from "motion/react";
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import styles from "./ContactSection.module.css";
import contactImg from "../assets/obrezovanje.webp";

export default function ContactSection() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors: any = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Valid email required";
    if (!form.message) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setSuccess(true);
        setForm({ name: "", email: "", phone: "", message: "" });
      } else {
        alert(data.error || "Error sending message.");
      }
    } catch (err) {
      alert("Server error.");
    }

    setLoading(false);
  };

  return (
    <>
      <section className={styles.section}>
        <div className={styles.wrapper}>
          {/* LEFT INFO CARD */}
          <motion.div
            className={styles.infoCard}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className={styles.imageWrapper}>
              <img src={contactImg} alt="Gardening" />
            </div>

            <div className={styles.infoContent}>
              <InfoItem icon={<Clock size={18} />} title="We're Open">
                Monday – Friday 08.00 – 18.00
              </InfoItem>

              <InfoItem icon={<MapPin size={18} />} title="Office Location">
                100 S Main St, New York, NY
              </InfoItem>

              <InfoItem icon={<Phone size={18} />} title="Call Us">
                +1 123 456 789
              </InfoItem>

              <InfoItem icon={<Mail size={18} />} title="Email">
                contact@gardyn.com
              </InfoItem>
            </div>
          </motion.div>

          {/* FORM */}
          <motion.div
            className={styles.formWrapper}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Send Your Message</h2>

            <form className={styles.form} onSubmit={handleSubmit}>
              <FloatingInput
                label="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                error={errors.name}
              />

              <FloatingInput
                label="Your Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                error={errors.email}
              />

              <FloatingInput
                label="Your Phone"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />

              <FloatingTextarea
                label="Your Message"
                name="message"
                value={form.message}
                onChange={handleChange}
                error={errors.message}
              />

              <button disabled={loading}>
                {loading ? "Sending..." : "Send Message"}
              </button>

              {success && <p className={styles.success}>Message sent!</p>}
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}

function InfoItem({ icon, title, children }: any) {
  return (
    <div className={styles.item}>
      <div className={styles.icon}>{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{children}</p>
      </div>
    </div>
  );
}

function FloatingInput({ label, error, ...props }: any) {
  return (
    <div className={`${styles.field} ${error ? styles.error : ""}`}>
      <input {...props} />
      <label>{label}</label>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}

function FloatingTextarea({ label, error, ...props }: any) {
  return (
    <div className={`${styles.field} ${error ? styles.error : ""}`}>
      <textarea {...props} rows={5} />
      <label>{label}</label>
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
