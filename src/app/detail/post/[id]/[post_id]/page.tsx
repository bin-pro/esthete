"use client";

import { useParams, useRouter } from "next/navigation";
import * as D from "@/components/detail/Styled";

interface DetailProps {
  params: {
    id: string;
    post_id: string;
    image: string;
    description: string;
  };
}
const Detail: React.FC<DetailProps> = () => {
  const params = useParams();
  console.log(params);

  return (
    <>
      <D.Container>
        <D.DetailBox>
          <D.LeftBox>
            <D.ProfileBox>Profile</D.ProfileBox>
            <D.InfoBox>Info</D.InfoBox>
          </D.LeftBox>
          <D.RightBox>
            <D.PostImageBox>Post Image</D.PostImageBox>
            <D.DescriptionBox>Desc</D.DescriptionBox>
            <D.ActionBox>
              <D.ActionButton $attr="delete">DELETE</D.ActionButton>
              <D.ActionButton $attr="reject">REJECT</D.ActionButton>
            </D.ActionBox>
          </D.RightBox>
        </D.DetailBox>
      </D.Container>
    </>
  );
};

export default Detail;
