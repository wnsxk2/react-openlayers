import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUpApi } from "../Api/signUpApi";
import type { SignUpRequest } from "../Types/types";

export const useSignUpFormCheck = () => {
  const navigate = useNavigate();

  // Form states
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [tel, setTel] = useState("");

  // Error and loading states
  const [inputErrors, setInputErrors] = useState<{
    id?: string;
    password?: string;
    email?: string;
    username?: string;
    tel?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState<string>("");

  // 이메일 유효성 검사 (재사용을 위해 여기에 포함)
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignUp = async (idCheckResult: { available: boolean } | null) => {
    setServerError("");
    setInputErrors({});

    const requiredFields = [
      { value: id.trim(), name: "아이디", field: "id" },
      { value: password.trim(), name: "비밀번호", field: "password" },
      { value: email.trim(), name: "이메일", field: "email" },
      { value: username.trim(), name: "이름", field: "username" },
      { value: tel.trim(), name: "전화번호", field: "tel" },
    ];

    // 첫 번째 빈 필드 찾기
    for (const field of requiredFields) {
      if (!field.value) {
        setInputErrors({ [field.field]: `${field.name}을(를) 입력해주세요.` });
        return;
      }
    }

    const validations = [
      {
        condition: !idCheckResult?.available,
        field: "id",
        message: "아이디 중복 확인을 해주세요.",
      },
      {
        condition: password.length < 8 || password.length > 20,
        field: "password",
        message: "비밀번호는 8자 이상 20자 이하여야 합니다.",
      },
      {
        condition: password !== passwordCheck,
        field: "password",
        message: "비밀번호가 일치하지 않습니다.",
      },
      {
        condition: !validateEmail(email.trim()),
        field: "email",
        message: "올바른 이메일 양식으로 작성해주세요.",
      },
      {
        condition: username.trim().length < 2 || username.trim().length > 10,
        field: "username",
        message: "사용자명은 2자 이상 10자 이하여야 합니다.",
      },
      {
        condition:
          !/^0(1[0-9]|2|3[1-3]|4[1-4]|5[1-5]|6[1-4])-?\d{3,4}-?\d{4}$/.test(
            tel.trim()
          ), // 서버측 에러처리와 다름 <- 목 api 에서 오류 발생?
        field: "tel",
        message: "올바른 전화번호 형식이 아닙니다.",
      },
    ];

    for (const validation of validations) {
      if (validation.condition) {
        setInputErrors({ [validation.field]: validation.message });
        return;
      }
    }

    // 모든 검증 통과 시 API 호출...
    try {
      setLoading(true);

      const signUpRequest: SignUpRequest = {
        id: id.trim(),
        password: password,
        email: email.trim(),
        username: username.trim(),
        tel: tel.trim(),
      };

      const response = await signUpApi.signUp(signUpRequest);

      alert(`${response.data.username}님, 회원가입이 완료되었습니다!`);
      navigate("/login");
    } catch (error) {
      setServerError("회원가입 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return {
    // formdata
    id,
    setId,
    password,
    setPassword,
    passwordCheck,
    setPasswordCheck,
    email,
    setEmail,
    username,
    setUsername,
    tel,
    setTel,

    // state
    inputErrors,
    loading,
    serverError,

    // handler
    handleSignUp,
  };
};
