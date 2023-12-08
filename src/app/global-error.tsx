"use client";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Button = styled.button`
  width: 200px;
  height: 40px;
  font-family: "Syncopate", sans-serif;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <Container>
          <h2>Something went wrong!</h2>
          <br />
          <Button onClick={() => reset()}>Try again</Button>
        </Container>
      </body>
    </html>
  );
}
