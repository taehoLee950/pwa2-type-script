/**
 * TypeScript 함수 타입 마스터하기
 * 1. 함수 정의와 선택적 파라미터
 * 2. Rest 파라미터 & 함수 타입 표현식
 * 3. 호출 시그니처 (Call Signature)
 * 4. 함수의 타입 호환성 (리턴/파라미터)
 * 5. 함수 오버로딩
 * 6. 사용자 정의 타입 가드 (is)
 */

// -------------------------
// 1. 함수의 타입 정의 및 선택적 파라미터
// -------------------------
function sum(a: number, b: number): number {
  return a + b;
}

// 선택적 파라미터 (?): 반드시 필수 파라미터 뒤에 위치해야 함
function printInfo(name: string, age?: number): void {
  console.log(`${name}님: ${age ?? "나이 미상"}`);
}
printInfo("홍길동"); // OK
printInfo("성춘향", 20); // OK

/* 에러 예시: 필수 파라미터가 선택적 파라미터보다 뒤에 올 수 없음
function printError(age?: number, name: string) { } 
*/

// -------------------------
// 2. Rest 파라미터 & 함수 타입 표현식
// -------------------------
// 매장 '맛나식당'의 모든 매출 합계를 구할 때처럼 유동적인 인자를 받을 때 사용
function sumAll(...numbers: number[]): number {
  return numbers.reduce((acc, cur) => acc + cur, 0);
}

// 함수 타입 표현식 (Type Alias): 공통된 함수 형태를 재사용
type Oper = (a: number, b: number) => number;

const add: Oper = (a, b) => a + b;
const sub: Oper = (a, b) => a - b;
const mul: Oper = (a, b) => a * b;
const div: Oper = (a, b) => a / b;

// -------------------------
// 3. 호출 시그니처 (Call Signature)
// -------------------------
// 객체가 함수처럼 호출될 수도 있고, 별도의 프로퍼티도 가질 때 정의하는 방식
type AnimalFunc = {
  (name: string): void; // 호출 시그니처
  species: string; // 추가 프로퍼티
};

const dogFunc: AnimalFunc = (name) => {
  console.log(`${name}은(는) 멍멍 짖습니다.`);
};
dogFunc.species = "진돗개";

// -------------------------
// 4. 함수의 타입 호환성
// -------------------------

// 4-1. 리턴 타입 호환성: '업캐스팅' 허용 (더 구체적인 것을 넓은 것에 담기)
type ReturnA = () => number; // 넓은 타입
type ReturnB = () => 10; // 좁은 타입 (리터럴)

let funcA: ReturnA = () => 10;
let funcB: ReturnB = () => 10;

funcA = funcB; // OK (업캐스팅)
// funcB = funcA; // Error (다운캐스팅 불가능)

// 4-2. 파라미터 타입 호환성: '다운캐스팅' 방향이 허용 (특이한 점!)
type ParamC = (value: number) => void;
type ParamD = (value: 10) => void;

let funcC: ParamC = (n) => console.log(n);
let funcD: ParamD = (n) => console.log(n);

// funcC = funcD; // Error: funcC는 모든 숫자를 처리해야 하는데, funcD는 10만 처리 가능함
funcD = funcC; // OK: 10만 처리하면 되는 funcD에 모든 숫자를 처리하는 funcC를 넣어도 안전함

// -------------------------
// 5. 함수 오버로딩 (Function Overloading)
// -------------------------
// 같은 이름의 함수를 매개변수 개수나 타입에 따라 다르게 호출

// [오버로드 시그니처] - 선언부
function addOver(a: number, b: number): number;
function addOver(a: number, b: number, c: number, d: number): number;

// [구현 시그니처] - 실제 로직
function addOver(a: number, b: number, c?: number, d?: number): number {
  if (typeof c === "number" && typeof d === "number") {
    return a + b + c + d;
  }
  return a + b;
}

addOver(1, 2); // OK
// addOver(1, 2, 3); // Error: 선언부에 인자 3개짜리가 없음
addOver(1, 2, 3, 4); // OK

// -------------------------
// 6. 사용자 정의 타입 가드 (Custom Type Guard)
// -------------------------
// 'is' 키워드를 사용하여 함수가 true를 반환하면 해당 타입을 보장함
type Cat = { meow: () => void };
type Dog = { bark: () => void };

function isCat(animal: Cat | Dog): animal is Cat {
  // meow 메서드가 존재한다면 Cat 타입으로 인정
  return (animal as Cat).meow !== undefined;
}

function play(animal: Cat | Dog) {
  if (isCat(animal)) {
    // 이 블록 안에서 animal은 자동으로 Cat 타입이 됨
    animal.meow();
  } else {
    // 여기서는 자동으로 Dog 타입
    animal.bark();
  }
}

// 예시 실행
const myCat: Cat = { meow: () => console.log("야옹") };
play(myCat);
