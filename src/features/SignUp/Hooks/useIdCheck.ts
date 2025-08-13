import { useState } from "react";
import { signUpApi } from "../Api/signUpApi";

export const useIdCheck = () => {
    const [idCheckResult, setIdCheckResult] = useState<{
      available: boolean;
      message: string;
    } | null>(null);
  
    const handleIdCheck = async (id: string) => {
      if (!id.trim()) {
        setIdCheckResult({
          available: false,
          message: "아이디를 입력해주세요.",
        });
        return;
      }
  
      if (id.trim().length < 4 || id.trim().length > 20) {
        setIdCheckResult({
          available: false,
          message: "아이디는 4자 이상 20자 이하여야 합니다.",
        });
        return;
      }
  
      try {
        const response = await signUpApi.idCheck({ id: id.trim() });
  
        setIdCheckResult({
          available: response.data.available,
          message: response.data.message,
        });
      } catch (error) {
        setIdCheckResult({
          available: false,
          message: "서버 내부 오류가 발생했습니다.",
        });
      }
    };
  
    return {
      idCheckResult,
      setIdCheckResult,
      handleIdCheck,
    };
  };