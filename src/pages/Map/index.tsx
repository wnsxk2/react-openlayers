import { colors } from "@/shared/styles";
import { css } from "@emotion/react";
import { IoMenuOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function MapPage() {
  const navigate = useNavigate();
  return (
    <div>
      <button
        css={menuBtn}
        onClick={() => {
          console.log("Clicked menu");
          navigate("/login");
        }}
      >
        <IoMenuOutline />
      </button>
      <div>index</div>
    </div>
  );
}

const menuBtn = css`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 100;
  background-color: ${colors.white};
  border: 1px solid ${colors.borderLight};
  border-radius: 50%;
  box-shadow: 2px 0 8px ${colors.shadowLight};
`;
