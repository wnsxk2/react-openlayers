import type { ErrorResponseDTO, ResponseDTO } from '@/mocks/user/type';
import { HttpResponse } from 'msw';

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

export function createErrorResponse(message: string, status: number): Response {
  const response: ErrorResponseDTO = {
    success: false,
    error: { code: status, message },
  };
  return HttpResponse.json(response, { status });
}
