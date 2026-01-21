//  유틸리티 타입
//  Generic, Mapped, Conditional..... 등을 활용해서 타입 스크립트가 미리 만들어둔 유틸리티
//  복잡한 타입 조작을 직접 구현하지않고 선언만으로 타입 변형 가능

interface User {
  id: number;
  name: string;
  email: string;
  gender?: "M" | "F";
  post: {
    id: number;
    title: string;
  };
}

/**
 * Partial<T>: 타입 T의 모든 속성을 optional로 변경
 */
type PartialUser = Partial<User>; // 위 User interface가 모두 optional로 변경 됨.

/**
 * Required<T>: 타입 T의 모든 속성을 필수 속성으로 변경
 */
type RequiredUser = Required<User>; // 위 User interface가 모두 required로 변경 됨.

/**
 * Readonly<T>: 타입 T의 모든 속성을 읽기 전용으로 변경
 */
type ReadonlyUser = Readonly<User>; // 위 User interface가 모두 readonly로 변경 됨.

/**
 * Pick<T, K>: 타입 T에서 특정 속성 K들만 골라 새로운 타입을 작성
 */
type Post = Pick<User, "post" | "name"> & {
  // *주의: 모든 속성을 다 가져오는게 아닌 K에 고른 속성만 가져옴. (기존 + 수정을 합치는게 아님.)
  post: number;
  name: number;
};

/**
 * Omit<T, K>: 타입 T에서 특정 속성 K들만 골라서 제외하고 새로운 타입 작성
 */
type OnlyUser = Omit<User, "post">; // 위 User interface에서 'post' 속성만 제외하고 가져온다.

/**
 * 특정 속성 타입 덮어쓰기 (Override) 공식
 * Pick이랑 Omit은 선택된 것만 가져오고 기존거는 안 갖고온다. 이 점을 보완하려면?
 */

// 공식: type 새타입 = Omit<기존타입, '수정할키'> & { '수정할키': 새로운타입 };
// 요약:
// 1. 기존 속성을 다 가져오고 싶을 땐 Pick이 아니라 Omit을 써야 함.
// 2. Omit으로 '수정할 대상'만 쏙 빼낸 뒤,
// 3. & (인터섹션)을 이용해 새로운 정의를 이어 붙이면 수정 완료.
type FinalUser = Omit<User, "post" | "email"> & {
  post: number; // 객체 -> 숫자로 변경
  email: string[]; // 문자열 -> 문자열 배열로 변경
};

/**
 * Extract<T, U>: 유니온 타입 T에서 U와 겹치는 타입만 추출하여 새로운 타입 작성
 */
type UnionType = string | number | boolean;
type ExtractType = Extract<UnionType, string | number>;

/**
 * ReturnType<T>: 함수 T의 리턴 타입을 추출하여 새로운 타입을 작성
 */
function test() {
  return "test";
}

type FncReturnType = ReturnType<typeof test>; // test()의 return 타입을 보여준다.
