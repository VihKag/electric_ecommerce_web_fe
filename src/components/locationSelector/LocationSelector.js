import React, { useState, useEffect } from "react";
import { Select } from "antd";
import axios from "axios";

const { Option } = Select;

const LocationSelector = () => {
  const [tinh, setTinh] = useState([]); // Danh sách Tỉnh
  const [selectedTinh, setSelectedTinh] = useState(""); // Tỉnh được chọn
  const [quan, setQuan] = useState([]); // Danh sách Quận/Huyện
  const [selectedQuan, setSelectedQuan] = useState(""); // Quận/Huyện được chọn
  const [phuong, setPhuong] = useState([]); // Danh sách Phường/Xã

  // Lấy danh sách Tỉnh Thành khi component được mount
  useEffect(() => {
    axios
      .get("https://esgoo.net/api-tinhthanh/1/0.htm")
      .then((response) => {
        const { data } = response.data;
        setTinh(data); // Cập nhật state cho danh sách tỉnh
      })
      .catch((error) => console.error("Error fetching Tinh:", error));
  }, []);

  // Lấy danh sách Quận Huyện khi một Tỉnh được chọn
  useEffect(() => {
    if (selectedTinh) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/2/${selectedTinh}.htm`)
        .then((response) => {
          const { data } = response.data;
          setQuan(data); // Cập nhật state cho danh sách quận huyện
          setPhuong([]); // Xóa danh sách Phường Xã khi chọn Tỉnh mới
        })
        .catch((error) => console.error("Error fetching Quan:", error));
    }
  }, [selectedTinh]);

  // Lấy danh sách Phường Xã khi một Quận/Huyện được chọn
  useEffect(() => {
    if (selectedQuan) {
      axios
        .get(`https://esgoo.net/api-tinhthanh/3/${selectedQuan}.htm`)
        .then((response) => {
          const { data } = response.data;
          setPhuong(data); // Cập nhật state cho danh sách phường xã
        })
        .catch((error) => console.error("Error fetching Phuong:", error));
    }
  }, [selectedQuan]);

  return (
    <div className="flex items-center gap-10">
      <Select
        placeholder="Chọn Tỉnh Thành"
        
        className="css_select"
        value={selectedTinh || undefined} 
        onChange={(value) => setSelectedTinh(value)}
        style={{ width: "160px" }}
      >
        {tinh.map((t) => (
          <Option key={t.id} value={t.id}>
            {t.full_name}
          </Option>
        ))}
      </Select>

      <Select
        className="css_select"
        placeholder="Chọn Quận Huyện"
        value={selectedQuan || undefined}
        onChange={(value) => setSelectedQuan(value)}
        style={{ width: "160px" }}
        // disabled={!selectedTinh}
      >
        {quan.map((q) => (
          <Option key={q.id} value={q.id}>
            {q.full_name}
          </Option>
        ))}
      </Select>

      <Select
        className="css_select"
        placeholder="Chọn Phường Xã"
        style={{ width: "160px" }}
        // disabled={!selectedQuan}
      >
        {phuong.map((p) => (
          <Option key={p.id} value={p.id}>
            {p.full_name}
          </Option>
        ))}
      </Select>
    </div>
  );
};

export default LocationSelector;
