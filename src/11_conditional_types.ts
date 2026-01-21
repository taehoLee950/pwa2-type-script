/**
 * ==================================================
 * 1. 조건부 타입 (Conditional Types)
 * 문법: T extends U ? X : Y
 * 설명: T가 U에 할당 가능한가? 맞으면 X, 아니면 Y
 * ==================================================
 */

// [설계] T가 string이면 true, 아니면 never 반환
type IsString<T> = T extends string ? true : never;

// [실행/분석]
type T1 = IsString<string>; // true  (string은 string 규격에 맞음)
type T2 = IsString<number>; // never (number는 string 규격에 안 맞음)

/**
 * 포인트:
 * - 타입 전용 '삼항 연산자'
 * - extends를 "맞는가?"라는 질문(조건문)으로 사용
 */

// --------------------------------------------------

/**
 * ==================================================
 * 2. 분산적 조건부 타입 (Distributive)
 * 설명: 제네릭에 유니온을 넣으면 낱개씩 쪼개어 검사 후 다시 합침
 * ==================================================
 */

// [설계] T가 U에 포함되면 제거(never), 포함 안 되면 유지(T)
type Exclude<T, U> = T extends U ? never : T;

/**
 * [분석] Exclude<string | number | boolean, number> 처리 과정
 * 1. string  extends number? -> No  -> string
 * 2. number  extends number? -> Yes -> never (필터링됨)
 * 3. boolean extends number? -> No  -> boolean
 * 최종 결과: string | boolean
 */
type Result = Exclude<string | number | boolean, number>;

/**
 * 포인트:
 * - 유니온 타입을 제네릭으로 넘길 때만 발생하는 자동 반복문
 * - never는 유니온 타입 결과물에서 자동으로 제외됨
 */

// --------------------------------------------------

/**
 * ==================================================
 * 3. infer 키워드 (Type Inference)
 * 설명: 조건부 타입 내에서 특정 위치의 타입을 추론하여 변수(R)에 담음
 * ==================================================
 */

// [설계] T가 함수라면 그 리턴 타입을 R에 담아 반환함
type GetReturnType<T> = T extends (...args: any[]) => infer R ? R : any; // 함수가 함수일시만 R을 반환. 아니면 any

function getName() {
  return "홍길동"; // 실제 리턴 타입: string
}

type GetNameReturnType = GetReturnType<typeof getName>;

// 배열 요소의 타입 추출
type UnpackArray<T> = T extends (infer U)[] ? U : never;
type strArr = UnpackArray<string[]>; // string
type numArr = UnpackArray<number[]>; // number
type string1 = UnpackArray<"asdasd">; // never
