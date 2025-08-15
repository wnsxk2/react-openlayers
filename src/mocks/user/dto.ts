import type { ResponseDTO } from '@/mocks/shared/type';
import type { Tokens } from '@/mocks/user/type';
import { HttpResponse } from 'msw';

/**
 * 아이디 중복 확인 DTO
 */
type IdCheckResponse = {
  id: string;
  message: string;
  available: boolean;
};

export function createIdCheckResponse(
  id: string,
  message: string,
  available: boolean
): Response {
  const response: ResponseDTO<IdCheckResponse> = {
    success: true,
    data: { id, message, available },
  };
  return HttpResponse.json(response);
}

/**
 * 회원가입 DTO
 */
type SignupResponse = {
  id: string;
  username: string;
};

export function createSignupResponse(id: string, username: string): Response {
  const response: ResponseDTO<SignupResponse> = {
    success: true,
    data: { id, username },
  };
  return HttpResponse.json(response);
}

/**
 * 로그인 DTO
 */
type LoginResponse = {
  id: string;
  tokens: Tokens;
};

export function createLoginResponse(id: string, tokens: Tokens): Response {
  const response: ResponseDTO<LoginResponse> = {
    success: true,
    data: { id, tokens },
  };
  return HttpResponse.json(response);
}
