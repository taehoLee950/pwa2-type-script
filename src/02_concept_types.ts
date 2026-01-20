/**
 * TypeScript 핵심 개념 정리
 * 1. 타입 집합론 & 구조적 타입 시스템
 * 2. 타입 호환성 & 초과 속성 체크
 * 3. 타입 추론
 * 4. 타입 단언 (Assertion)
 * 5. 타입 좁히기 (Type Narrowing)
 */

// ---------------------------
// 1. 타입 집합론 & 구조적 타입 시스템
// ---------------------------
// 타입스크립트는 객체의 '구조'가 같으면 같은 타입으로 간주합니다.
type Animal = {
  name: string;
};

type Human = {
  type: "HUMAN"; // 리터럴 타입
  name: string;
  lang: string;
};

type Dog = {
  type: "DOG";
  name: string;
  age: number;
};

// ---------------------------
// 2. 타입 호환성 (Compatibility)
// ---------------------------
// 작은 타입(Subset)을 큰 타입(Superset)에 담는 것은 'Upcasting'이라 하며 허용됩니다.
let num1: number = 1; // 슈퍼셋 (Number 전체)
let num2: 2 = 2; // 서브셋 (숫자 2 리터럴)

num1 = num2; // OK: 2는 숫자니까요.
// num2 = num1; // Error: 숫자 전체를 '2'라는 칸에 담을 수 없습니다. (Downcasting)

const dog: Dog = { type: "DOG", name: "흰둥이", age: 20 };
const animal: Animal = dog; // OK: Dog는 name이 있으므로 Animal에 포함됩니다.
console.log(animal.name);
// console.log(animal.age); // Error: Animal 타입에는 age가 정의되어 있지 않습니다.

// [초과 속성 체크]
// 객체 리터럴을 '직접' 대입할 때는 선언된 속성 외에 다른 속성이 있으면 에러를 냅니다.
// const animal2: Animal = { name: '검둥이', age: 20 }; // Error: age가 Animal에 없음
const tempDog = { name: "검둥이", age: 20 };
const animal3: Animal = tempDog; // OK: 변수를 통하면 체크를 우회함 (구조적 타이핑)

// ---------------------------
// 3. 타입 추론 (Type Inference)
// ---------------------------
let num3 = 1; // number로 추론
const num4 = 1; // 1(리터럴)로 추론 (const는 변하지 않으므로)

// 객체와 배열의 추론
let userObj = { name: "홍길동", age: 20 }; // { name: string, age: number }
// userObj = { lang: 'ko' }; // Error: 구조가 일치하지 않음

let [num5, str5, bool5] = [1, "문자열", true]; // 각각 number, string, boolean

// 함수의 리턴 타입 추론 (매개변수 타입을 기반으로 계산됨)
function add(a: number, b: number) {
  return a + b; // number 반환 추론
}

// 최적 공통 타입 추론
let mixedArr = [1, "안녕", false]; // (number | string | boolean)[]

// ---------------------------
// 4. 타입 단언 (Type Assertion)
// ---------------------------
// TS보다 개발자가 타입을 더 잘 알고 있을 때 "이건 이 타입이야!"라고 확신을 주는 것

// 4-1. 기본 단언 (as)
let someValue: any = "이것은 문자열입니다";
let strLength: number = (someValue as string).length;

// 4-2. Non-null 단언 (!)
// '맛있는 식당' 매장 정보가 있다고 가정할 때, age가 확실히 있다고 단언
type User = {
  name: string;
  age?: number;
};
const user: User = { name: "이순신" };
// user.age.toString(); // Error: age는 undefined일 수 있음
console.log(user.age!.toString()); // !: "절대 null/undefined 아님"

// 4-3. const 단언 (Readonly)
// 객체의 모든 필드를 읽기 전용으로 만듭니다.
let coffeeShop = {
  name: "별다방",
  location: "서울",
} as const;
// coffeeShop.name = '콩다방'; // Error: 읽기 전용 속성이라 수정 불가

// ---------------------------
// 5. 타입 좁히기 (Type Narrowing)
// ---------------------------

// 5-1. typeof: 기본 타입들을 구분할 때
function printLength(val: number | string | null): void {
  if (typeof val === "number") {
    console.log(val.toFixed(2));
  } else if (typeof val === "string") {
    console.log(val.toUpperCase());
  }
}

// 5-2. in 연산자: 객체의 속성 존재 여부로 구분할 때
function checkPet(pet: Human | Dog) {
  if ("lang" in pet) {
    console.log(`언어: ${pet.lang}`); // 여기서 pet은 Human 타입
  } else {
    console.log(`나이: ${pet.age}`); // 여기서 pet은 Dog 타입
  }
}

// 5-3. instanceof: 클래스 인스턴스인지 확인할 때
class Store {
  owner: string = "김사장";
}
class Office {
  manager: string = "박대리";
}

function visit(place: Store | Office) {
  if (place instanceof Store) {
    console.log(place.owner);
  } else {
    console.log(place.manager);
  }
}

// 5-4. 서로소 유니온 (Discriminated Union): 공통된 'type' 태그로 구분
// 가장 권장되는 방식입니다.
function identify(animal: Dog | Human) {
  if (animal.type === "HUMAN") {
    console.log(`사람입니다. 언어: ${animal.lang}`);
  } else if (animal.type === "DOG") {
    console.log(`강아지입니다. 나이: ${animal.age}`);
  }
}
