import TestImage1 from "@/../public/images/testImage (1).png";
import TestImage2 from "@/../public/images/testImage (2).png";
import TestImage4 from "@/../public/images/testImage (4).png";
import TestImage5 from "@/../public/images/testImage (5).png";
import TestImage6 from "@/../public/images/testImage (6).png";
import TestImage7 from "@/../public/images/testImage (7).png";
import TestImage8 from "@/../public/images/testImage (8).png";
import ProfileImage1 from "@/../public/images/profile1.png";
import ProfileImage2 from "@/../public/images/profile2.png";
import ProfileImage3 from "@/../public/images/profile3.png";
import ProfileImage4 from "@/../public/images/profile4.png";

export const DUMMY_DATA = [
  {
    photo_id: "1",
    photo_title: "Exhibition1",
    photo_description: "Description1",
    photo_url: TestImage1,
    photo_created_at: "2023-01-01",
    photographer_id: "2023010101",
    photographer_nickname: "Asher",
    photographer_profile_img: ProfileImage1,
    photo_abusing_report_count: 5,
    photographer_photo_abusing_report_count: 6,
  },
  {
    photo_id: "2",
    photo_title: "Exhibition2",
    photo_description: "Description2",
    photo_url: TestImage2,
    photo_created_at: "2023-01-02",
    photographer_id: "2023010102",
    photographer_nickname: "Su bin",
    photographer_profile_img: ProfileImage2,
    photo_abusing_report_count: 2,
    photographer_photo_abusing_report_count: 2,
  },
  {
    photo_id: "3",
    photo_title: "Exhibition3",
    photo_description: "Description3",
    photo_url: TestImage4,
    photo_created_at: "2023-01-03",
    photographer_id: "2023010103",
    photographer_nickname: "Je Koo",
    photographer_profile_img: ProfileImage3,
    photo_abusing_report_count: 3,
    photographer_photo_abusing_report_count: 3,
  },
  {
    photo_id: "4",
    photo_title: "Exhibition4",
    photo_description: "Description4",
    photo_url: TestImage5,
    photo_created_at: "2023-01-04",
    photographer_id: "2023010104",
    photographer_nickname: "Han Kyeol",
    photographer_profile_img: ProfileImage4,
    photo_abusing_report_count: 4,
    photographer_photo_abusing_report_count: 4,
  },
  {
    photo_id: "5",
    photo_title: "Exhibition5",
    photo_description: "Description5",
    photo_url: TestImage6,
    photo_created_at: "2023-01-05",
    photographer_id: "2023010105",
    photographer_nickname: "JUN SEO",
    photographer_profile_img: ProfileImage1,
    photo_abusing_report_count: 5,
    photographer_photo_abusing_report_count: 5,
  },
  {
    photo_id: "6",
    photo_title: "Exhibition6",
    photo_description: "Description6",
    photo_url: TestImage7,
    photo_created_at: "2023-01-06",
    photographer_id: "2023010106",
    photographer_nickname: "Asher",
    photographer_profile_img: ProfileImage2,
    photo_abusing_report_count: 6,
    photographer_photo_abusing_report_count: 6,
  },
  {
    photo_id: "7",
    photo_title: "Exhibition7",
    photo_description: "Description7",
    photo_url: TestImage8,
    photo_created_at: "2023-01-07",
    photographer_id: "2023010107",
    photographer_nickname: "Su bin",
    photographer_profile_img: ProfileImage3,
    photo_abusing_report_count: 7,
    photographer_photo_abusing_report_count: 7,
  },
];

export const GUEST_BOOK_DATA = [
  {
    id: 1,
    profile: ProfileImage1,
    name: "JUN SEO",
    guestBook: "Hello World!",
  },
  {
    id: 2,
    profile: ProfileImage2,
    name: "Han Kyeol",
    guestBook: "I'm Sad",
  },
  {
    id: 3,
    profile: ProfileImage3,
    name: "Je Koo",
    guestBook: "I'm Happy",
  },
  {
    id: 4,
    profile: ProfileImage4,
    name: "Su bin",
    guestBook: "I'm Angry",
  },
];

export const BACKGROUND_COLORS = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(255, 206, 86, 0.2)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
];

export const BORDER_COLORS = [
  "rgba(255, 99, 132, 1)",
  "rgba(54, 162, 235, 1)",
  "rgba(255, 206, 86, 1)",
  "rgba(75, 192, 192, 1)",
  "rgba(153, 102, 255, 1)",
  "rgba(255, 159, 64, 1)",
];

export const CHART_DUMMY_OPTIONS1 = {
  labels: [
    "12-01",
    "12-02",
    "12-03",
    "12-04",
    "12-05",
    "12-06",
    "12-07",
    "12-08",
    "12-09",
    "12-10",
  ],
  datasets: [
    {
      label: "",
      data: [12, 19, 3, 5, 2, 3, 12, 19, 3, 5],
      backgroundColor: BACKGROUND_COLORS,
      borderColor: BORDER_COLORS,
      borderWidth: 1,
    },
  ],
};

export const CHART_DUMMY_OPTIONS2 = {
  labels: [
    "12-01",
    "12-02",
    "12-03",
    "12-04",
    "12-05",
    "12-06",
    "12-07",
    "12-08",
    "12-09",
    "12-10",
  ],
  datasets: [
    {
      label: "",
      data: [5, 2, 3, 12, 23, 3, 5, 12, 19, 3],
      backgroundColor: BACKGROUND_COLORS,
      borderColor: BORDER_COLORS,
      borderWidth: 1,
    },
  ],
};

export const CHART_DUMMY_OPTIONS3 = {
  labels: [
    "12-01",
    "12-02",
    "12-03",
    "12-04",
    "12-05",
    "12-06",
    "12-07",
    "12-08",
    "12-09",
    "12-10",
  ],
  datasets: [
    {
      label: "",
      data: [2, 3, 12, 19, 3, 5, 12, 19, 3, 5],
      backgroundColor: BACKGROUND_COLORS,
      borderColor: BORDER_COLORS,
      borderWidth: 1,
    },
  ],
};

export const CHART_DUMMY_OPTIONS4 = {
  labels: [
    "12-01",
    "12-02",
    "12-03",
    "12-04",
    "12-05",
    "12-06",
    "12-07",
    "12-08",
    "12-09",
    "12-10",
  ],
  datasets: [
    {
      label: "",
      data: [24, 12, 19, 3, 5, 2, 3, 12, 19, 3],
      backgroundColor: BACKGROUND_COLORS,
      borderColor: BORDER_COLORS,
      borderWidth: 1,
    },
  ],
};
