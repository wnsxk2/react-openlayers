import { Outlet } from "react-router-dom";
import { css } from "@emotion/react";

export default function LoginLayout() {
  return (
    <>
      <div css={loginContainer}>
        <Outlet />
      </div>
    </>
  );
}

const loginContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
