import React from "react";

const HelpPage = () => {
  const contactNumbers = [
    { name: "Hỗ trợ chung", phone: "1900 1234" },
    { name: "Khiếu nại dịch vụ", phone: "1900 5678" },
    { name: "Hỗ trợ kỹ thuật", phone: "1900 8765" },
  ];

  return (
    <div className="w-full max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-blue-500">Liên hệ hỗ trợ</h1>
      <p className="mb-6 text-gray-700">
        Nếu bạn cần hỗ trợ, vui lòng liên hệ với chúng tôi qua các số điện thoại dưới đây:
      </p>
      <ul className="space-y-4">
        {contactNumbers.map((contact, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 bg-gray-100 rounded-lg hover:bg-blue-50"
          >
            <span className="font-medium">{contact.name}</span>
            <a
              href={`tel:${contact.phone}`}
              className="text-blue-500 font-semibold hover:underline"
            >
              {contact.phone}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HelpPage;
