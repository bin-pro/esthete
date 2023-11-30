"use client";

import { useRouter } from "next/navigation";

const Detail: React.FC = () => {
  const router = useRouter();
  const { id } = router;
  console.log(id);
  return (
    <>
      <p>GuestBook Detail</p>
    </>
  );
};

export default Detail;
