// src/screens/Register.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createMember } from "../api/memberApi";
import "./Register.css";

export default function Register({ onSuccess, onNavigate }) {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      alert("กรุณากรอกชื่อและอีเมลให้ครบถ้วน");
      return;
    }

    setIsSubmitting(true);
    try {
      // 4. ผู้ใช้กรอกข้อมูล แล้วเรียก createMember()
      const data = await createMember(formData);
      alert(data.message); // "เพิ่มสมาชิกสำเร็จ"
      setFormData({ name: "", email: "" });

      if (onSuccess) onSuccess();
      if (onNavigate) {
        onNavigate("list");
      } else {
        // กลับไปหน้า List
        navigate("/");
      }
    } catch (err) {
      alert(err.message || "เกิดข้อผิดพลาดในการเพิ่มสมาชิก");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="registerContainer">
      <div className="registerCard">
        <h2 className="registerTitle">หน้า Register (เพิ่มสมาชิก)</h2>
        <form onSubmit={handleSubmit}>
          <div className="formGroup">
            <label className="formLabel">ชื่อสมาชิก</label>
            <input
              type="text"
              className="formInput"
              placeholder="กรอกชื่อ เช่น สมชาย"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div className="formGroup">
            <label className="formLabel">อีเมล</label>
            <input
              type="email"
              className="formInput"
              placeholder="กรอกอีเมล เช่น somchai@email.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
            />
          </div>

          <button
            type="submit"
            className="submitButton"
            disabled={isSubmitting}
          >
            {isSubmitting ? "กำลังบันทึก..." : "บันทึก"}
          </button>

          <Link to="/" className="backButton">
            กลับหน้ารายการ
          </Link>
        </form>
      </div>
    </div>
  );
}
