import React, { useState } from 'react';

const initialReviewState = {
  productName: "Samsung Galaxy S23 FE 5G 8GB 128GB",
  overallRating: 0,
  experienceRatings: {
    performance: { rating: 0, description: "Siêu mạnh mẽ" },
    batteryLife: { rating: 0, description: "Cực khủng" },
    cameraQuality: { rating: 0, description: "Chụp đẹp, chuyên nghiệp" }
  },
  comment: "",
  images: []
};

const ratingLabels = ["Rất Tệ", "Tệ", "Bình thường", "Tốt", "Tuyệt vời"];

const ProductReviewForm = () => {
  const [reviewState, setReviewState] = useState(initialReviewState);

  const handleOverallRating = (rating) => {
    setReviewState(prevState => ({ ...prevState, overallRating: rating }));
  };

  const handleExperienceRating = (category, rating) => {
    setReviewState(prevState => ({
      ...prevState,
      experienceRatings: {
        ...prevState.experienceRatings,
        [category]: { ...prevState.experienceRatings[category], rating }
      }
    }));
  };

  const handleCommentChange = (event) => {
    setReviewState(prevState => ({ ...prevState, comment: event.target.value }));
  };

  const handleImageUpload = (event) => {
    const newImages = Array.from(event.target.files);
    setReviewState(prevState => ({
      ...prevState,
      images: [...prevState.images, ...newImages]
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Xử lý gửi đánh giá ở đây
    console.log("Đánh giá đã được gửi:", reviewState);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Đánh giá & nhận xét</h2>
      <div className="mb-4">
        <img src="/placeholder-image.jpg" alt={reviewState.productName} className="w-16 h-16" />
        <p>{reviewState.productName}</p>
      </div>

      <div className="mb-4">
        <h3 className="font-bold">Đánh giá chung</h3>
        <div className="flex justify-between">
          {ratingLabels.map((label, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleOverallRating(index + 1)}
              className={`p-2 ${reviewState.overallRating === index + 1 ? 'bg-yellow-400' : 'bg-gray-200'}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-bold">Theo trải nghiệm</h3>
        {Object.entries(reviewState.experienceRatings).map(([key, { rating, description }]) => (
          <div key={key} className="flex items-center justify-between mb-2">
            <span>{key}: {description}</span>
            <div>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleExperienceRating(key, star)}
                  className={`text-2xl ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <textarea
        value={reviewState.comment}
        onChange={handleCommentChange}
        placeholder="Xin mời chia sẻ một số cảm nhận về sản phẩm (nhập tối thiểu 15 kí tự)"
        className="w-full p-2 border rounded mb-4"
        rows="4"
      />

      <div className="mb-4">
        <label className="block">
          <span className="sr-only">Thêm hình ảnh</span>
          <input type="file" onChange={handleImageUpload} multiple className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
          "/>
        </label>
      </div>

      <button type="submit" className="w-full bg-red-500 text-white py-2 px-4 rounded">
        GỬI ĐÁNH GIÁ
      </button>
    </form>
  );
};

export default ProductReviewForm;