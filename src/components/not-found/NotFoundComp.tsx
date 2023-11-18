"use client";

import Link from "next/link";
import * as N from "./Styled";
import Image from "next/image";
import MainLogo from "@/../public/icons/mainLogo.png";

export const NotFoundComp: React.FC = () => {
  return (
    <N.Container>
      <Image
        src={MainLogo}
        width={200}
        alt="esthete-logo"
        loading="lazy"
        placeholder="empty"
      />
      <br />
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <br />
      <N.Button>
        <Link href="/">Return Home</Link>
      </N.Button>
    </N.Container>
  );
};
