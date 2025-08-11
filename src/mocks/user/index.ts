import { EXIST_IDS as EXIST_USER } from '@/mocks/user/constant';
import {
  createErrorResponse,
  createIdCheckResponse,
  createLoginResponse,
  createSignupResponse,
} from '@/mocks/user/dto';
import type { Login, Signup, Tokens } from '@/mocks/user/type';
import { http } from 'msw';

export const userHandlers = [
  // 아이디 중복확인  API
  http.post('/api/v1/auth/id', async ({ request }) => {
    try {
      const body = await request.json().catch(() => null);

      const { id } = body as { id: string };

      const isAvailable = !EXIST_USER.find(
        (user) => user.id.toLowerCase() === id.toLowerCase()
      );
      const message = isAvailable
        ? '사용 가능한 아이디입니다.'
        : '이미 존재하는 아이디입니다.';

      return createIdCheckResponse(id, message, isAvailable);
    } catch (error) {
      console.error(error);
      return createErrorResponse('서버 내부 오류가 발생했습니다.', 500);
    }
  }),
  // 회원가입 api
  http.post('api/v1/auth/signup', async ({ request }) => {
    try {
      const body = await request.json().catch(() => null);

      if (!body) {
        return createErrorResponse('요청 데이터가 없습니다.', 400);
      }

      const { id, password, email, username, tel } = body as Signup;

      // 필수 필드 검증
      if (!id || !password || !email || !username || !tel) {
        return createErrorResponse('필수 항목이 누락되었습니다.', 400);
      }

      // 아이디 유효성 검사
      if (id.length < 4 || id.length > 20) {
        return createErrorResponse(
          '아이디는 4자 이상 20자 이하여야 합니다.',
          400
        );
      }

      // 비밀번호 유효성 검사
      if (password.length < 8 || password.length > 20) {
        return createErrorResponse(
          '비밀번호는 8자 이상 20자 이하여야 합니다.',
          400
        );
      }

      // 이메일 형식 검증
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return createErrorResponse('올바른 이메일 형식이 아닙니다.', 400);
      }

      // 전화번호 형식 검증 (한국 전화번호)
      const telRegex = /^01[0-9]-?\d{3,4}-?\d{4}$/;
      if (!telRegex.test(tel)) {
        return createErrorResponse('올바른 전화번호 형식이 아닙니다.', 400);
      }

      // 사용자명 길이 검증
      if (username.length < 2 || username.length > 10) {
        return createErrorResponse(
          '사용자명은 2자 이상 10자 이하여야 합니다.',
          400
        );
      }

      const isAvailable = !EXIST_USER.find(
        (user) => user.id.toLowerCase() === id.toLowerCase()
      );

      if (!isAvailable) {
        return createErrorResponse('이미 존재하는 아이디입니다.', 409);
      }

      EXIST_USER.push({
        id,
        password,
      });

      return createSignupResponse(id, username);
    } catch (error) {
      console.error(error);
      return createErrorResponse('서버 내부 오류가 발생했습니다.', 500);
    }
  }),

  // 로그인 api
  http.post('/api/v1/auth/login', async ({ request }) => {
    try {
      const body = await request.json().catch(() => null);

      const { id, password } = body as Login;

      const isSuccess = EXIST_USER.find((user) => {
        return user.id === id && user.password === password;
      });

      if (!isSuccess) {
        return createErrorResponse(
          '아이디 또는 비밀번호가 잘못되었습니다. 다시 시도하세요.',
          401
        );
      }
      const tokens: Tokens = {
        accessToken: 'test-access-token',
        refreshToken: 'test-refresh-token',
      };

      return createLoginResponse(id, tokens);
    } catch (error) {
      console.error(error);
      return createErrorResponse('서버 내부 오류가 발생했습니다.', 500);
    }
  }),
];
