// memberApi.js (Frontend)
const API = "http://localhost:3000/api";

// 3. สร้างฟังก์ชันเรียก API แบบ POST
export const createMember = async (member) => {
  const res = await fetch(`${API}/members`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(member),
  });
  if (!res.ok) {
    throw new Error("เพิ่มสมาชิกไม่สำเร็จ");
  }
  return await res.json();
};

// ดึงข้อมูลสมาชิกทั้งหมด (GET)
export const getAllMembers = async () => {
  const res = await fetch(`${API}/members`);
  if (!res.ok) {
    throw new Error("โหลดข้อมูลสมาชิกล้มเหลว");
  }
  return await res.json();
};

// ลบข้อมูลสมาชิก (DELETE)
export const deleteMember = async (id) => {
  const res = await fetch(`${API}/members/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    throw new Error("ลบสมาชิกไม่สำเร็จ");
  }
  return await res.json();
};
