import { useState } from "react";
import { motion } from "motion/react";
import { Clock, MapPin, Phone, Mail } from "lucide-react";
import styles from "./ContactSection.module.css";
import contactImg from "../assets/obrezovanje.webp";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

export default function ContactSection() {
  const { t } = useTranslation();
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
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, form, PUBLIC_KEY);

      setSuccess(true);
      setForm({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      console.error(err);
      alert("Failed to send message. Try sending message manually.");
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
              <InfoItem
                icon={<Clock size={18} />}
                title={t("contact_form.main.working_time")}
              >
                {t("contact_form.sub.working_time")}
              </InfoItem>

              <InfoItem
                icon={<MapPin size={18} />}
                title={t("contact_form.main.location")}
              >
                {t("contact_form.sub.location")}
              </InfoItem>

              <InfoItem
                icon={<Phone size={18} />}
                title={t("contact_form.main.call")}
              >
                {t("contact_form.sub.call")}
              </InfoItem>

              <InfoItem icon={<Mail size={18} />} title="Email">
                {t("contact_form.sub.mail")}
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
