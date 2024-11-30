import { Select } from "antd";
import { useState } from "react";


export default function ProductInformation() {
  const [addressValue, setAddressValue] = useState([]);
  const onChange = (value) => {
    console.log(`selected ${value}`);
    const selectedAddress = address.find(addr => addr.value === value);
    if (selectedAddress) {
      setAddressValue(selectedAddress.details);
    }
  };
  const onSearch = (value) => {
    console.log('search:', value);
  };
  const address = [
    { value: 'HCM', label: 'Hồ Chí Minh', details: [{ value: 'HCM 1', link: '/#' }, { value: 'HCM 2', link: '/#' }] },
    { value: 'DN', label: 'Đồng Nai', details: [{ value: 'ĐN 1', link: '/#' }, { value: 'ĐN 2', link: '/#' }] },
    { value: 'BD', label: 'Bình Dương', details: [{ value: 'BD 1', link: '/#' }, { value: 'BD 2', link: '/#' }] },
  ];
  return (
    <div className="flex">
      <div className="w-1/2 border rounded-lg p-2">
        <div>
          <p className="text-lg font-bold text-text mb-2">Thông tin sản phẩm</p>
        </div>
        <div>
          <div className="flex gap-2">
            <span>
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M21 16V7.2C21 6.0799 21 5.51984 20.782 5.09202C20.5903 4.71569 20.2843 4.40973 19.908 4.21799C19.4802 4 18.9201 4 17.8 4H13M3 16V14M9 4.16667C9 4.16667 8.69411 4.16667 8.62504 4.16667C7.60055 4.16667 6.70766 3.75244 5.99998 3C5.2923 3.75241 4.3995 4.16667 3.37504 4.16667C3.30596 4.16667 3.00004 4.16667 3.00004 4.16667C3.00004 4.16667 3 4.94444 3 5.39793C3 7.61207 4.27477 9.4725 6 10C7.72523 9.4725 9 7.61207 9 5.39793C9 4.94444 9 4.16667 9 4.16667ZM22 16V16.8C22 17.9201 22 18.4802 21.782 18.908C21.5903 19.2843 21.2843 19.5903 20.908 19.782C20.4802 20 19.9201 20 18.8 20H5.2C4.0799 20 3.51984 20 3.09202 19.782C2.71569 19.5903 2.40973 19.2843 2.21799 18.908C2 18.4802 2 17.9201 2 16.8V16H8.33726C8.58185 16 8.70414 16 8.81923 16.0276C8.92127 16.0521 9.01881 16.0925 9.10828 16.1474C9.2092 16.2092 9.29568 16.2957 9.46863 16.4686L9.53137 16.5314C9.70432 16.7043 9.7908 16.7908 9.89172 16.8526C9.98119 16.9075 10.0787 16.9479 10.1808 16.9724C10.2959 17 10.4182 17 10.6627 17H13.3373C13.5818 17 13.7041 17 13.8192 16.9724C13.9213 16.9479 14.0188 16.9075 14.1083 16.8526C14.2092 16.7908 14.2957 16.7043 14.4686 16.5314L14.5314 16.4686C14.7043 16.2957 14.7908 16.2092 14.8917 16.1474C14.9812 16.0925 15.0787 16.0521 15.1808 16.0276C15.2959 16 15.4182 16 15.6627 16H22Z"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
            </span>
            Nguyên hộp, đầy đủ phụ kiện từ nhà sản suất Bảo hành pin 12 tháng
          </div>
          <div className="flex gap-2">
            <span>
              <svg
                width="24px"
                height="24px"
                viewBox="0 -0.5 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M12.75 10.6C12.75 10.1858 12.4142 9.85 12 9.85C11.5858 9.85 11.25 10.1858 11.25 10.6H12.75ZM12 19H11.25C11.25 19.2489 11.3734 19.4815 11.5795 19.6211C11.7856 19.7606 12.0475 19.7888 12.2785 19.6964L12 19ZM19 16.2L19.2785 16.8964C19.5633 16.7825 19.75 16.5067 19.75 16.2H19ZM19.75 10.379C19.75 9.96479 19.4142 9.629 19 9.629C18.5858 9.629 18.25 9.96479 18.25 10.379H19.75ZM12.4538 10.0029C12.124 9.75224 11.6535 9.81641 11.4029 10.1462C11.1522 10.476 11.2164 10.9465 11.5462 11.1971L12.4538 10.0029ZM14.5 12.5L14.0462 13.0971C14.2687 13.2663 14.5669 13.2976 14.8198 13.1784L14.5 12.5ZM19.3198 11.0574C19.6944 10.8808 19.855 10.4339 19.6784 10.0592C19.5018 9.68456 19.0549 9.52398 18.6802 9.70058L19.3198 11.0574ZM11.7215 9.90364C11.3369 10.0575 11.1498 10.494 11.3036 10.8785C11.4575 11.2631 11.894 11.4502 12.2785 11.2964L11.7215 9.90364ZM19.2785 8.49636C19.6631 8.34252 19.8502 7.90604 19.6964 7.52146C19.5425 7.13687 19.106 6.94981 18.7215 7.10364L19.2785 8.49636ZM18.7215 8.49636C19.106 8.65019 19.5425 8.46313 19.6964 8.07854C19.8502 7.69396 19.6631 7.25748 19.2785 7.10364L18.7215 8.49636ZM12.2785 4.30364C11.894 4.14981 11.4575 4.33687 11.3036 4.72146C11.1498 5.10604 11.3369 5.54252 11.7215 5.69636L12.2785 4.30364ZM19.3665 7.14562C19.005 6.94323 18.548 7.07214 18.3456 7.43355C18.1432 7.79495 18.2721 8.25199 18.6335 8.45438L19.3665 7.14562ZM21.5 9.2L21.8199 9.87835C22.0739 9.75855 22.2397 9.50686 22.2495 9.22618C22.2593 8.94549 22.1115 8.68285 21.8665 8.54562L21.5 9.2ZM18.6801 9.70065C18.3054 9.87733 18.145 10.3243 18.3217 10.6989C18.4983 11.0736 18.9453 11.234 19.3199 11.0573L18.6801 9.70065ZM4.72146 7.10364C4.33687 7.25748 4.14981 7.69396 4.30364 8.07854C4.45748 8.46313 4.89396 8.65019 5.27854 8.49636L4.72146 7.10364ZM12.2785 5.69636C12.6631 5.54252 12.8502 5.10604 12.6964 4.72146C12.5425 4.33687 12.106 4.14981 11.7215 4.30364L12.2785 5.69636ZM5.36645 8.45438C5.72786 8.25199 5.85677 7.79495 5.65438 7.43355C5.45199 7.07214 4.99495 6.94323 4.63355 7.14562L5.36645 8.45438ZM2.5 9.2L2.13355 8.54562C1.8885 8.68285 1.74065 8.94549 1.75046 9.22618C1.76026 9.50686 1.92606 9.75855 2.18009 9.87835L2.5 9.2ZM4.68009 11.0573C5.05473 11.234 5.50167 11.0736 5.67835 10.6989C5.85503 10.3243 5.69455 9.87733 5.31991 9.70065L4.68009 11.0573ZM5.27854 7.10364C4.89396 6.94981 4.45748 7.13687 4.30364 7.52146C4.14981 7.90604 4.33687 8.34252 4.72146 8.49636L5.27854 7.10364ZM11.7215 11.2964C12.106 11.4502 12.5425 11.2631 12.6964 10.8785C12.8502 10.494 12.6631 10.0575 12.2785 9.90364L11.7215 11.2964ZM12.75 10.6C12.75 10.1858 12.4142 9.85 12 9.85C11.5858 9.85 11.25 10.1858 11.25 10.6H12.75ZM12 19L11.7215 19.6964C11.9525 19.7888 12.2144 19.7606 12.4205 19.6211C12.6266 19.4815 12.75 19.2489 12.75 19H12ZM5 16.2H4.25C4.25 16.5067 4.43671 16.7825 4.72146 16.8964L5 16.2ZM5.75 10.379C5.75 9.96479 5.41421 9.629 5 9.629C4.58579 9.629 4.25 9.96479 4.25 10.379H5.75ZM12.4538 11.1971C12.7836 10.9465 12.8478 10.476 12.5971 10.1462C12.3465 9.81641 11.876 9.75224 11.5462 10.0029L12.4538 11.1971ZM9.5 12.5L9.18024 13.1784C9.4331 13.2976 9.73125 13.2663 9.95381 13.0971L9.5 12.5ZM5.31976 9.70058C4.94508 9.52398 4.49818 9.68456 4.32158 10.0592C4.14498 10.4339 4.30556 10.8808 4.68024 11.0574L5.31976 9.70058ZM11.25 10.6V19H12.75V10.6H11.25ZM12.2785 19.6964L19.2785 16.8964L18.7215 15.5036L11.7215 18.3036L12.2785 19.6964ZM19.75 16.2V10.379H18.25V16.2H19.75ZM11.5462 11.1971L14.0462 13.0971L14.9538 11.9029L12.4538 10.0029L11.5462 11.1971ZM14.8198 13.1784L19.3198 11.0574L18.6802 9.70058L14.1802 11.8216L14.8198 13.1784ZM12.2785 11.2964L19.2785 8.49636L18.7215 7.10364L11.7215 9.90364L12.2785 11.2964ZM19.2785 7.10364L12.2785 4.30364L11.7215 5.69636L18.7215 8.49636L19.2785 7.10364ZM18.6335 8.45438L21.1335 9.85438L21.8665 8.54562L19.3665 7.14562L18.6335 8.45438ZM21.1801 8.52165L18.6801 9.70065L19.3199 11.0573L21.8199 9.87835L21.1801 8.52165ZM5.27854 8.49636L12.2785 5.69636L11.7215 4.30364L4.72146 7.10364L5.27854 8.49636ZM4.63355 7.14562L2.13355 8.54562L2.86645 9.85438L5.36645 8.45438L4.63355 7.14562ZM2.18009 9.87835L4.68009 11.0573L5.31991 9.70065L2.81991 8.52165L2.18009 9.87835ZM4.72146 8.49636L11.7215 11.2964L12.2785 9.90364L5.27854 7.10364L4.72146 8.49636ZM11.25 10.6V19H12.75V10.6H11.25ZM12.2785 18.3036L5.27854 15.5036L4.72146 16.8964L11.7215 19.6964L12.2785 18.3036ZM5.75 16.2V10.379H4.25V16.2H5.75ZM11.5462 10.0029L9.04619 11.9029L9.95381 13.0971L12.4538 11.1971L11.5462 10.0029ZM9.81976 11.8216L5.31976 9.70058L4.68024 11.0574L9.18024 13.1784L9.81976 11.8216Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
            </span>{" "}
            Máy, sạc, sách hướng dẫn
          </div>
          <div className="flex gap-2">
            <span>
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M9.5 12.4L10.9286 14L14.5 10"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    d="M3 10.4167C3 7.21907 3 5.62028 3.37752 5.08241C3.75503 4.54454 5.25832 4.02996 8.26491 3.00079L8.83772 2.80472C10.405 2.26824 11.1886 2 12 2C12.8114 2 13.595 2.26824 15.1623 2.80472L15.7351 3.00079C18.7417 4.02996 20.245 4.54454 20.6225 5.08241C21 5.62028 21 7.21907 21 10.4167C21 10.8996 21 11.4234 21 11.9914C21 14.4963 20.1632 16.4284 19 17.9041M3.19284 14C4.05026 18.2984 7.57641 20.5129 9.89856 21.5273C10.62 21.8424 10.9807 22 12 22C13.0193 22 13.38 21.8424 14.1014 21.5273C14.6796 21.2747 15.3324 20.9478 16 20.5328"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  ></path>{" "}
                </g>
              </svg>
            </span>
            Bảo hành 12 tháng tại trung tâm bảo hành Chính hãng. 1 đổi 1 trong
            30 ngày nếu có lỗi phần cứng từ nhà sản xuất.
          </div>
          <div className="flex gap-2">
            <span>
              <svg
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M11.7255 17.1019C11.6265 16.8844 11.4215 16.7257 11.1734 16.6975C10.9633 16.6735 10.7576 16.6285 10.562 16.5636C10.4743 16.5341 10.392 16.5019 10.3158 16.4674L10.4424 16.1223C10.5318 16.1622 10.6239 16.1987 10.7182 16.2317L10.7221 16.2331L10.7261 16.2344C11.0287 16.3344 11.3265 16.3851 11.611 16.3851C11.8967 16.3851 12.1038 16.3468 12.2629 16.2647L12.2724 16.2598L12.2817 16.2544C12.5227 16.1161 12.661 15.8784 12.661 15.6021C12.661 15.2955 12.4956 15.041 12.2071 14.9035C12.062 14.8329 11.8559 14.7655 11.559 14.6917C11.2545 14.6147 10.9987 14.533 10.8003 14.4493C10.6553 14.3837 10.5295 14.279 10.4161 14.1293C10.3185 13.9957 10.2691 13.7948 10.2691 13.5319C10.2691 13.2147 10.3584 12.9529 10.5422 12.7315C10.7058 12.5375 10.9381 12.4057 11.2499 12.3318C11.4812 12.277 11.6616 12.1119 11.7427 11.8987C11.8344 12.1148 12.0295 12.2755 12.2723 12.3142C12.4751 12.3465 12.6613 12.398 12.8287 12.4677L12.7122 12.8059C12.3961 12.679 12.085 12.6149 11.7841 12.6149C10.7848 12.6149 10.7342 13.3043 10.7342 13.4425C10.7342 13.7421 10.896 13.9933 11.1781 14.1318L11.186 14.1357L11.194 14.1393C11.3365 14.2029 11.5387 14.2642 11.8305 14.3322C12.1322 14.4004 12.3838 14.4785 12.5815 14.5651L12.5856 14.5669L12.5897 14.5686C12.7365 14.6297 12.8624 14.7317 12.9746 14.8805L12.9764 14.8828L12.9782 14.8852C13.0763 15.012 13.1261 15.2081 13.1261 15.4681C13.1261 15.7682 13.0392 16.0222 12.8604 16.2447C12.7053 16.4377 12.4888 16.5713 12.1983 16.6531C11.974 16.7163 11.8 16.8878 11.7255 17.1019Z"
                    fill="#000000"
                  ></path>{" "}
                  <path
                    d="M11.9785 18H11.497C11.3893 18 11.302 17.9105 11.302 17.8V17.3985C11.302 17.2929 11.2219 17.2061 11.1195 17.1944C10.8757 17.1667 10.6399 17.115 10.412 17.0394C10.1906 16.9648 9.99879 16.8764 9.83657 16.7739C9.76202 16.7268 9.7349 16.6312 9.76572 16.5472L10.096 15.6466C10.1405 15.5254 10.284 15.479 10.3945 15.5417C10.5437 15.6262 10.7041 15.6985 10.8755 15.7585C11.131 15.8429 11.3762 15.8851 11.611 15.8851C11.8129 15.8851 11.9572 15.8628 12.0437 15.8181C12.1302 15.7684 12.1735 15.6964 12.1735 15.6021C12.1735 15.4929 12.1158 15.411 12.0004 15.3564C11.8892 15.3018 11.7037 15.2422 11.4442 15.1777C11.1104 15.0933 10.8323 15.0039 10.6098 14.9096C10.3873 14.8103 10.1936 14.6514 10.0288 14.433C9.86396 14.2096 9.78156 13.9092 9.78156 13.5319C9.78156 13.095 9.91136 12.7202 10.1709 12.4074C10.4049 12.13 10.7279 11.9424 11.1401 11.8447C11.2329 11.8227 11.302 11.7401 11.302 11.6425V11.2C11.302 11.0895 11.3893 11 11.497 11H11.9785C12.0862 11 12.1735 11.0895 12.1735 11.2V11.6172C12.1735 11.7194 12.2487 11.8045 12.3471 11.8202C12.7082 11.8777 13.0255 11.9866 13.2989 12.1469C13.3765 12.1924 13.4073 12.2892 13.3775 12.3756L13.0684 13.2725C13.0275 13.3914 12.891 13.4417 12.7812 13.3849C12.433 13.2049 12.1007 13.1149 11.7841 13.1149C11.4091 13.1149 11.2216 13.2241 11.2216 13.4425C11.2216 13.5468 11.2773 13.6262 11.3885 13.6809C11.4998 13.7305 11.6831 13.7851 11.9386 13.8447C12.2682 13.9192 12.5464 14.006 12.773 14.1053C12.9996 14.1996 13.1953 14.356 13.3602 14.5745C13.5291 14.7929 13.6136 15.0908 13.6136 15.4681C13.6136 15.8851 13.4879 16.25 13.2365 16.5628C13.0176 16.8354 12.7145 17.0262 12.3274 17.1353C12.2384 17.1604 12.1735 17.2412 12.1735 17.3358V17.8C12.1735 17.9105 12.0862 18 11.9785 18Z"
                    fill="#000000"
                  ></path>{" "}
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M9.59235 5H13.8141C14.8954 5 14.3016 6.664 13.8638 7.679L13.3656 8.843L13.2983 9C13.7702 8.97651 14.2369 9.11054 14.6282 9.382C16.0921 10.7558 17.2802 12.4098 18.1256 14.251C18.455 14.9318 18.5857 15.6958 18.5019 16.451C18.4013 18.3759 16.8956 19.9098 15.0182 20H8.38823C6.51033 19.9125 5.0024 18.3802 4.89968 16.455C4.81587 15.6998 4.94656 14.9358 5.27603 14.255C6.12242 12.412 7.31216 10.7565 8.77823 9.382C9.1696 9.11054 9.63622 8.97651 10.1081 9L10.0301 8.819L9.54263 7.679C9.1068 6.664 8.5101 5 9.59235 5Z"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                  <path
                    d="M13.2983 9.75C13.7125 9.75 14.0483 9.41421 14.0483 9C14.0483 8.58579 13.7125 8.25 13.2983 8.25V9.75ZM10.1081 8.25C9.69391 8.25 9.35812 8.58579 9.35812 9C9.35812 9.41421 9.69391 9.75 10.1081 9.75V8.25ZM15.9776 8.64988C16.3365 8.44312 16.4599 7.98455 16.2531 7.62563C16.0463 7.26671 15.5878 7.14336 15.2289 7.35012L15.9776 8.64988ZM13.3656 8.843L13.5103 9.57891L13.5125 9.57848L13.3656 8.843ZM10.0301 8.819L10.1854 8.08521L10.1786 8.08383L10.0301 8.819ZM8.166 7.34357C7.80346 7.14322 7.34715 7.27469 7.1468 7.63722C6.94644 7.99976 7.07791 8.45607 7.44045 8.65643L8.166 7.34357ZM13.2983 8.25H10.1081V9.75H13.2983V8.25ZM15.2289 7.35012C14.6019 7.71128 13.9233 7.96683 13.2187 8.10752L13.5125 9.57848C14.3778 9.40568 15.2101 9.09203 15.9776 8.64988L15.2289 7.35012ZM13.2209 8.10709C12.2175 8.30441 11.1861 8.29699 10.1854 8.08525L9.87486 9.55275C11.0732 9.80631 12.3086 9.81521 13.5103 9.57891L13.2209 8.10709ZM10.1786 8.08383C9.47587 7.94196 8.79745 7.69255 8.166 7.34357L7.44045 8.65643C8.20526 9.0791 9.02818 9.38184 9.88169 9.55417L10.1786 8.08383Z"
                    fill="#000000"
                  ></path>{" "}
                </g>
              </svg>
            </span>
            Giá sản phẩm đã bao gồm VAT
          </div>
        </div>
      </div>

      <div className="w-1/2 ml-2">
        <div className="w-full">
          <div>
            <Select
              showSearch
              placeholder="Chọn tỉnh thành"
              optionFilterProp="label"
              onChange={onChange}
              onSearch={onSearch}
              options={address}
            />
          </div>
          <div className="overflow-y-scroll scroll border h-64 rounded-lg p-2 mt-2">
          {addressValue.map((element) => {
            return (
              <div key={element.value} className="border-b py-1">
                <a href={element.link}>{element.value}</a>
              </div>
            );
          })}
          </div>
        </div>
      </div>
    </div>
  );
}
