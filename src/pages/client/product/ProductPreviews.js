import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "antd";
const ratings = [
  { stars: 5, count: 2 },
  { stars: 4, count: 0 },
  { stars: 3, count: 0 },
  { stars: 2, count: 0 },
  { stars: 1, count: 0 },
];

const totalRatings = ratings.reduce((sum, rating) => sum + rating.count, 0);
const averageRating =
  ratings.reduce((sum, rating) => sum + rating.stars * rating.count, 0) /
    totalRatings || 0;
const reviews = [
  {
    id: 1,
    user: {
      name: "Trọng",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 5,
    date: "2024-05-17",
    text: "Hàng tốt, dùng ngon",
    highlights: [
      "Hiệu năng Siêu mạnh mẽ",
      "Thời lượng pin Cực khủng",
      "Chất lượng camera Chụp đẹp, chuyên nghiệp",
    ],
  },
  {
    id: 2,
    user: {
      name: "Ahuan",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    rating: 4,
    date: "2022-11-27",
    text: "Quan tâm sản phẩm S Ultra 23",
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          className={`text-yellow-400 ${
            star <= rating ? "fill-current" : "text-gray-300"
          }`}
          size="sm"
        />
      ))}
    </div>
  );
}

function ReviewHighlights({ highlights }) {
  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {highlights &&
        highlights.map((highlight, index) => (
          <span
            key={index}
            className="bg-gray-100 text-xs px-2 py-1 rounded-lg text-gray-700"
          >
            {highlight}
          </span>
        ))}
    </div>
  );
}

export default function ProductReviews() {
  return (
    <div className="w-full mx-auto p-6 rounded-md border">
      {/*THống kê dánh giá*/}
      <div>
        <div className="mx-auto">
          <h2 className="text-lg font-semibold mb-4">
            Đánh giá & nhận xét TECNO SPARK Go 2024 4GB 64GB
          </h2>
          <div className="flex items-center mb-4">
            <div className="text-4xl font-bold mr-2">
              {averageRating.toFixed(1)}
            </div>
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <FontAwesomeIcon
                  icon={faStar}
                  key={index}
                  className={`w-5 h-5 ${
                    index < Math.round(averageRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500 ml-2">
              {totalRatings} đánh giá
            </div>
          </div>
          <div className="space-y-2">
            {ratings.map((rating) => (
              <div key={rating.stars} className="flex items-center">
                <div className="w-12 text-sm">{rating.stars}</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                  <div
                    className="bg-yellow-400 h-2 rounded-full"
                    style={{ width: `${(rating.count / totalRatings) * 100}%` }}
                  ></div>
                </div>
                <div className="w-12 text-sm text-right min-w-fit">
                  {rating.count} đánh giá
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <hr  className="my-4"/>

      <div>
        <h2 className="text-2xl font-bold mb-4">Đánh giá của khách hàng</h2>

        {/* Bộ lọc */}
        <div className="mb-6">
          <div className="flex space-x-4">
            <button className="px-4 py-2 rounded-full bg-red-500 text-white">
              Tất cả
            </button>
            <button className="px-4 py-2 rounded-full border">
              Có hình ảnh
            </button>
            <button className="px-4 py-2 rounded-full border">
              Đã mua hàng
            </button>
          </div>
          <div className="flex space-x-2 mt-4">
            {[5, 4, 3, 2, 1].map((star) => (
              <button
                key={star}
                className="px-2 py-1 rounded-full border flex items-center space-x-1"
              >
                <FontAwesomeIcon icon={faStar} className="text-yellow-400" />
                <span>{star}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Danh sách đánh giá */}
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <div
              key={review.id}
              className="flex space-x-4 border rounded-md p-4"
            >
              <Avatar
                className="flex items-center justify-center text-white bg-purple-500 w-10 h-10"
                style={{
                  backgroundColor: review.id === 1 ? "#6b46c1" : "#48bb78",
                }}
              >
                {review.user.name[0]}
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{review.user.name}</h3>
                  <p className="text-sm text-gray-500">
                    {new Date(review.date).toLocaleDateString("vi-VN", {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </p>
                </div>
                <StarRating rating={review.rating} />
                <ReviewHighlights highlights={review.highlights} />
                <p className="mt-2 text-gray-700">{review.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
