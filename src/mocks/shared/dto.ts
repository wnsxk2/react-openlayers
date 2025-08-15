import type { ErrorResponseDTO } from '@/mocks/shared/type';
import { HttpResponse } from 'msw';

/**
 * Error DTO
 */
export function createErrorResponse(message: string, status: number): Response {
  const response: ErrorResponseDTO = {
    success: false,
    error: { code: status, message },
  };
  return HttpResponse.json(response, { status });
}
