import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar } from "antd";
import { useEffect, useState } from "react";
import { commonService } from "../../services/apiService";
import { toast } from "react-toastify";

const initialData = [
  {
    email: "hocnuahocmai2611@gmail.com",
    rating: 5,
    content: "Sản phẩm này tôi đã mua rồi. Hàng rất tốt",
    productId: "6733b0cfb164eceb5bf5d824",
  },
  {
    email: "hocnuahocmai2611@gmail.com",
    rating: 4,
    content: "Sản phẩm này tôi đã mua rồi. Hàng rất tốt",
    productId: "6733b0cfb164eceb5bf5d824",
  },
];
function StarRating({ rating, onChange }) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <FontAwesomeIcon
          key={star}
          icon={faStar}
          size="lg"
          className={`cursor-pointer ${
            star <= rating ? "text-yellow-400" : "text-slate-300"
          }`}
          onClick={() => onChange && onChange(star)}
        />
      ))}
    </div>
  );
}

export default function ProductReviews({ productId }) {
  const [data, setData] = useState(initialData);
  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);
  const [reviews, setReviews] = useState([]);

  const fetchReviews = async () => {
    try {
      const response = await commonService.getReviewsByProductId(productId);
      console.log(response.data);
      setReviews(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || newRating === 0) {
      toast.info("Vui lòng điền đầy đủ thông tin.");
      return;
    }
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user);
    if (!user) {
      {
        toast.info("Vui lòng đăng nhập để đánh giá.");
        return;
      }
    }

    const newReview = {
      userId: user.id, // Dùng email giả cho người dùng không đăng nhập
      rating: newRating,
      content: newComment,
      productId: productId,
    };

    try {
      const response = await commonService.addReviews(newReview);
      console.log(response.data);
      fetchReviews(productId);
      setNewComment("");
      setNewRating(0);
      toast.success("Đã thêm bình luận thành công!");
    } catch (error) {
      // Kiểm tra nếu server trả về lỗi với response
      if (error.response) {
        console.error("Error response:", error.response.data.message);
        toast.error(error.response.data.message || "Đã xảy ra lỗi!");
      } else if (error.request) {
        // Nếu không nhận được phản hồi từ server
        console.error("No response received:", error.request);
        toast.error("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
      } else {
        // Lỗi khác (thường là lỗi logic code)
        console.error("Error:", error.message);
        toast.error("Đã xảy ra lỗi không xác định.");
      }
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  return (
    <div className="w-full mx-auto p-6 rounded-md border">
      {/* Thống kê đánh giá */}
      <div>
        <div className="mx-auto">
          <h2 className="text-lg font-semibold mb-4">
            Đánh giá & nhận xét sản phẩm
          </h2>
        </div>
      </div>

      <hr className="my-4" />

      {/* Form thêm bình luận */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Thêm đánh giá của bạn</h2>
        <div className="flex flex-col space-y-4">
          <div>
            <p className="text-base font-medium mb-2">Đánh giá của bạn:</p>
            <StarRating rating={newRating} onChange={setNewRating} />
          </div>
          <textarea
            className="w-full border rounded-md p-2"
            rows="4"
            placeholder="Nhập nhận xét của bạn..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          ></textarea>
          <button
            onClick={handleAddComment}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Gửi nhận xét
          </button>
        </div>
      </div>

      {/* Danh sách đánh giá */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Đánh giá của khách hàng</h2>

        <div className="space-y-6">
          {reviews?.map((review, index) => (
            <div key={index} className="flex space-x-4 border rounded-md p-4">
              <Avatar className="bg-purple-500">
                {review.email ? review.email[0].toUpperCase() : "U"}
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">
                    {review.email ? review.email : "undefined_user"}
                  </h3>
                  <span className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleDateString("vi-VN", {
                      timeZone: "Asia/Ho_Chi_Minh",
                    })}
                  </span>
                </div>
                <StarRating rating={review.rating} />
                <p className="mt-2 text-gray-700">{review.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
