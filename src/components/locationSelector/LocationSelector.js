import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Select } from 'antd';

const LocationSelector = () => {
  const [tinh, setTinh] = useState([]);      
  const [selectedTinh, setSelectedTinh] = useState(''); 
  const [quan, setQuan] = useState([]);       
  const [selectedQuan, setSelectedQuan] = useState(''); 
  const [phuong, setPhuong] = useState([]); 

  // Lấy danh sách Tỉnh Thành khi component được mount
  useEffect(() => {
    axios.get('https://esgoo.net/api-tinhthanh/1/0.htm')
      .then(response => {
        const { data } = response.data;
        setTinh(data); // Cập nhật state cho danh sách tỉnh
      })
      .catch(error => console.error('Error fetching Tinh:', error));
  }, []);

  // Lấy danh sách Quận Huyện khi một Tỉnh được chọn
  useEffect(() => {
    if (selectedTinh) {
      axios.get(`https://esgoo.net/api-tinhthanh/2/${selectedTinh}.htm`)
        .then(response => {
          const { data } = response.data;
          setQuan(data); // Cập nhật state cho danh sách quận huyện
          setPhuong([]); // Xóa danh sách Phường Xã khi chọn Tỉnh mới
        })
        .catch(error => console.error('Error fetching Quan:', error));
    }
  }, [selectedTinh]);

  // Lấy danh sách Phường Xã khi một Quận/Huyện được chọn
  useEffect(() => {
    if (selectedQuan) {
      axios.get(`https://esgoo.net/api-tinhthanh/3/${selectedQuan}.htm`)
        .then(response => {
          const { data } = response.data;
          setPhuong(data); // Cập nhật state cho danh sách phường xã
        })
        .catch(error => console.error('Error fetching Phuong:', error));
    }
  }, [selectedQuan]);

  return (
    <div className="css_select_div">
      <Select
        className="css_select" 
        id="tinh" 
        name="tinh" 
        defaultValue={"Tỉnh Thành"}
        value={selectedTinh} 
        onChange={e => setSelectedTinh(e.target.value)}
        options={tinh}
      />
        {/* <option value="">Tỉnh Thành</option>
        {tinh.map(t => (
          <option key={t.id} value={t.id}>{t.full_name}</option>
        ))}
      </Select> */}

      <Select
        className="css_select" 
        id="quan" 
        name="quan" 
        defaultValue={"Quận Huyện"}
        value={selectedQuan} 
        onChange={e => setSelectedQuan(e.target.value)} 
        disabled={!selectedTinh}
        options={quan}
      />
        {/* <option value="">Quận Huyện</option>
        {quan.map(q => (
          <option key={q.id} value={q.id}>{q.full_name}</option>
        ))}
      </Select> */}

      <Select
        className="css_select" 
        id="phuong" 
        name="phuong" 
        defaultValue={"Phường Xã"}
        disabled={!selectedQuan}
        options={phuong}
      />
        {/* <option value="">Phường Xã</option>
        {phuong.map(p => (
          <option key={p.id} value={p.id}>{p.full_name}</option>
        ))}
      </Select> */}
    </div>
  );
};

export default LocationSelector;
