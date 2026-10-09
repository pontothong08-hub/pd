// src/screens/ListMember.jsx
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Users, Search, Trash2, UserPlus } from "lucide-react";
import { getAllMembers, deleteMember } from "../api/memberApi";
import "./ListMember.css";

export default function ListMember({ onNavigate }) {
  const [members, setMembers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    loadMembers();
  }, []);

  // ดึงข้อมูลใหม่ (GET) เพื่อแสดงรายการสมาชิกล่าสุด
  async function loadMembers() {
    setIsLoading(true);
    try {
      const data = await getAllMembers();
      setMembers(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("โหลดข้อมูลสมาชิกล้มเหลว:", error);
    } finally {
      setIsLoading(false);
    }
  }

  // ลบสมาชิก
  async function handleDelete(id, name) {
    const isConfirmed = window.confirm(`ต้องการลบ "${name}" ใช่หรือไม่?`);
    if (!isConfirmed) return;

    try {
      await deleteMember(id);
      await loadMembers();
    } catch (err) {
      alert(err.message || "เกิดข้อผิดพลาดในการลบสมาชิก");
    }
  }

  const keyword = searchText.toLowerCase();
  const filteredMembers = members.filter(
    (member) =>
      member.name?.toLowerCase().includes(keyword) ||
      member.email?.toLowerCase().includes(keyword)
  );

  return (
    <div className="pageContainer">
      <div className="headerCard">
        <div className="headerTitle">
          <Users size={28} className="headerIcon" />
          <h2>รายการสมาชิก</h2>
        </div>

        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <div className="searchBox">
            <Search size={18} className="searchIcon" />
            <input
              type="text"
              placeholder="ค้นหาชื่อ หรือ อีเมล..."
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
          </div>

          <Link
            to="/register"
            onClick={(e) => {
              if (onNavigate) {
                e.preventDefault();
                onNavigate("register");
              }
            }}
            className="addMemberButton"
          >
            <UserPlus size={16} />
            + เพิ่มสมาชิกใหม่
          </Link>
        </div>
      </div>

      {isLoading ? (
        <p className="loadingText">กำลังโหลดข้อมูล...</p>
      ) : filteredMembers.length === 0 ? (
        <p className="emptyText">ไม่พบข้อมูลสมาชิก</p>
      ) : (
        <table className="memberTable">
          <thead>
            <tr>
              <th style={{ width: "80px" }}>#</th>
              <th>ชื่อ</th>
              <th>อีเมล</th>
              <th className="actionHeader" style={{ width: "120px" }}>
                จัดการ
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.map((member, index) => (
              <tr key={member.id || index}>
                <td>{index + 1}</td>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td className="actionCell">
                  <button
                    className="deleteButton"
                    onClick={() => handleDelete(member.id, member.name)}
                  >
                    <Trash2 size={14} />
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="footerActions">
        <Link
          to="/register"
          onClick={(e) => {
            if (onNavigate) {
              e.preventDefault();
              onNavigate("register");
            }
          }}
          className="addMemberButton"
        >
          <UserPlus size={16} />
          + เพิ่มสมาชิกใหม่ (ไปหน้า Register)
        </Link>
      </div>
    </div>
  );
}
