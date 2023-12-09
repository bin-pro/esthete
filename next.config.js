/** @type {import('next').NextConfig} */

const API_URL = "https://api.esthete.roberniro-projects.xyz/admin";

const nextConfig = {
  compiler: {
    // ssr and displayName are true by default
    // styledComponents: true,
  },

  images: {
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "db3o78f1kbvk.cloudfront.net",
      },
    ],
  },
  assetPrefix:
    process.env.NODE_ENV === "production"
      ? "https://github.com/dgu-web-t3-blackshoe/esthete-cms.git"
      : undefined,

  async rewrites() {
    return [
      // Statistics------------------------------------------------
      {
        // Number of user 통계 정보 불러오기
        source: "/api/v1/statistics/users",
        destination: `${API_URL}/statistics/user/count/daily`,
      },

      {
        // Number of Exhibition Upload 통계 정보 불러오기
        source: "/api/v1/statistics/exhibition",
        destination: `${API_URL}/statistics/exhibition/count/daily`,
      },

      {
        // Number of Photo Infringment 통계 정보 불러오기
        source: "/api/v1/statistics/photos/infringement",
        destination: `${API_URL}/statistics/abusing-reports/photos/count/daily`,
      },

      {
        // Number of Guestbook Infringment 통계 정보 불러오기
        source: "/api/v1/statistics/guestbooks/infringement",
        destination: `${API_URL}/statistics/abusing-reports/guest-books/count/daily`,
      },
      // Management----------------------------------------------
      {
        // abusing-reports photos 리스트 불러오기
        source: "/api/v1/management/photos",
        destination: `${API_URL}/abusing-reports/photos`,
      },
      {
        // abusing-reports photos 디테일 불러오기
        source: "/api/v1/management/photos/details",
        destination: `${API_URL}/abusing-reports/photos/details`,
      },
      {
        // abusing-reports photos 삭제하기
        source: "/api/v1/management/photos/delete/:photoId",
        destination: `${API_URL}/photos/:photoId`,
      },
      {
        // abusing-reports photos 반려하기
        source: "/api/v1/management/photos/reject/:photoId",
        destination: `${API_URL}/abusing-reports/photos/:photoId`,
      },
      {
        // abusing-reports photos detail 삭제하기
        source: "/api/v1/management/photos/details/delete/:photoAbusingReportId",
        destination: `${API_URL}/abusing-reports/photos/details/:photoAbusingReportId`,
      },
      // ---------------------------------------------------------
      {
        // abusing-reports guestbooks 리스트 불러오기
        source: "/api/v1/management/guestbooks",
        destination: `${API_URL}/abusing-reports/guest-books`,
      },
      {
        // abusing-reports guestbooks 디테일 불러오기
        source: "/api/v1/management/guestbooks/details",
        destination: `${API_URL}/abusing-reports/guest-books/details`,
      },
      {
        // abusing-reports guestbooks 삭제하기
        source: "/api/v1/management/guestbooks/delete/:guestBookId",
        destination: `${API_URL}/guest-books/:guestBookId`,
      },
      {
        // abusing-reports guestbooks 반려하기
        source: "/api/v1/management/guestbooks/reject/:guestBookId",
        destination: `${API_URL}/abusing-reports/guest-books/:guestBookId`,
      },
      {
        // abusing-reports guestbooks detail 삭제하기
        source: "/api/v1/management/guestbooks/details/delete/:guestBookAbusingReportId",
        destination: `${API_URL}/abusing-reports/guest-books/details/:guestBookAbusingReportId`,
      },
      // Admin-----------------------------------------------------
      {
        // manager 등록하기
        source: "/api/v1/admin/manager",
        destination: `${API_URL}/managers`,
      },
      {
        // manager 삭제하기
        source: "/api/v1/admin/manager/delete/:userId",
        destination: `${API_URL}/managers/:userId`,
      },
    ];
  },
};

module.exports = nextConfig;
