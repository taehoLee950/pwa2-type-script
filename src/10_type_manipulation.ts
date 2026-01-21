/**
 * --------------------------------------------------
 * 타입 조작: keyof & typeof 연산자
 * --------------------------------------------------
 */

/**
 * [1. keyof 연산자]
 * - 인터페이스나 타입의 '속성 이름(Key)'들만 쏙 뽑아내어 유니온 타입으로 만듦
 * - "상자에 붙은 이름표 리스트"를 만드는 것과 같음
 */
interface User {
  id: number;
  name: string;
  age: number;
}

// UserKeys는 "id" | "name" | "age" 타입이 됨
type UserKeys = keyof User;

const key1: UserKeys = "id"; // 성공
const key2: UserKeys = "name"; // 성공
// const key3: UserKeys = "gender"; // 에러: User 인터페이스에 없는 키임

/**
 * [2. typeof 연산자]
 * - 실제 '데이터(변수)'를 분석해서 그와 똑같이 생긴 '타입'을 추출함
 * - 코드에 이미 선언된 값을 타입으로 재사용하고 싶을 때 사용함
 */
const user = { name: "홍길동", age: 20 };

// User2는 { name: string; age: number; } 타입이 됨
type User2 = typeof user;

const newUser: User2 = {
  name: "임꺽정",
  age: 30,
};

/**
 * --------------------------------------------------
 * [핵심 요약 및 왜 쓰는가?]
 * --------------------------------------------------
 * * 1. 코드 안정성 (Safety):
 * - 객체의 속성에 접근할 때 오타가 나면 즉시 빨간 줄로 알려줌.
 * - 존재하지 않는 키를 사용하려는 시도를 사전에 차단함.
 * * 2. 유지보수성 (Maintenance):
 * - 인터페이스(User)에 새로운 속성(예: address)이 추가되면,
 * keyof를 쓴 타입들은 자동으로 "address"를 포함하도록 갱신됨.
 * - 일일이 수작업으로 유니온 타입을 고칠 필요가 없음.
 * * 3. 중복 제거 (DRY - Don't Repeat Yourself):
 * - 이미 잘 만들어둔 실제 데이터(user 변수)가 있다면,
 * 별도의 인터페이스를 또 만들지 않고 typeof로 바로 타입을 따올 수 있음.
 * * 4. 제네릭과의 조합:
 * - 어떤 객체(T)를 받아서 그 객체의 특정 키(K extends keyof T)를 건드리는
 * 범용적인 함수를 만들 때 필수적으로 사용됨.
 */

// 활용 예시: 객체와 키를 받아 값을 출력하는 안전한 함수
function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // key가 T의 키임을 보장받으므로 안전함
}

const val = getProperty(user, "name"); // 성공: "홍길동"
// const errorVal = getProperty(user, "id"); // 에러: user 객체에는 id가 없음

/**
 * indexed access type
 * 객체, 배열, 튜플의 특정 요소 || 속성의 타입을 추출할 때 사용
 */

// -----------------
// 객체 타입 추출 예시
// -----------------
interface Post {
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    email: string; // 추가됨.
  };
}
// 일반 타입 스크립트 형식: 파라미터의 타입을 미리 정해둠
function printAuthorInfo1(author: { id: number; name: string }): void {
  console.log(`${author.id}: ${author.name}`);
}
// indexed access type: interface의 특정 요소를 구조 분해 할당으로 빼올 수 있다.
// *email등의 key가 추가될 시 그대로 반영해서 사용하면 된다. (동적 확장성/관리가 용이)
function printAuthorInfo2(author: Post["author"]): void {
  console.log(`${author.id}: ${author.name}. 이메일: ${author.email}`);
}

// -----------------
// 배열 요소 타입 추출 예시
// -----------------
const COLORS = ["red", "green", "blue"] as const; // as const: 이 데이터는 절대 안 변하니까, 안에 적힌 값 그대로를 타입으로 넣어라.
type Color = (typeof COLORS)[number]; // 배열값을 유니온 타입으로 한번에 추출. type Color = "red" | "green" | "blue";

// -----------------
// 튜플의 요소 타입 추출
// -----------------
type Tuple = [number, string, boolean];

// 개별로 추출
type Tup1 = Tuple[0]; // type Tup1 = number
type Tup2 = Tuple[1]; // type Tup2 = string

// 전체 추출
type Tup3 = Tuple[number]; // number | string | boolean 모두 가져옴

// Tuple[number]: "0번이든 1번이든 2번이든, 모든 숫자 인덱스에 해당하는 타입을 다 가져와"라는 뜻임.
// 타입스크립트의 대괄호[] 안에는 **"어떤 키(인덱스)의 타입을 볼 것인가?"**를 적어줘야 합니다.
// Tuple[0]: "인덱스가 딱 0번인 칸의 타입을 가져와." (결과: number)
// Tuple[1]: "인덱스가 딱 1번인 칸의 타입을 가져와." (결과: string)
// Tuple[number]: "인덱스가 숫자(number)이기만 하면, 그게 몇 번이든 상관없이 나올 수 있는 모든 타입을 다 긁어와."

// -----------------
// Mapped Type
// 기존의 타입을 기반으로 새로운 타입을 일괄 생성할 때 사용
// -----------------
type User3 = {
  id: number;
  name: string;
  age: number;
};

/**
 * [OptionalUser4 루프 분석]
 * 문법: [K in keyof User3]
 * 1. keyof User3를 통해 "id" | "name" | "age" 유니온 타입을 먼저 뽑아냄.
 * 2. 'in' 키워드가 이 유니온 타입을 하나씩 순회(Loop)함.
 */
type OptionalUser4 = {
  // 1회차: K는 "id" / User3["id"]는 number / 결과 -> id?: number
  // 2회차: K는 "name" / User3["name"]는 string / 결과 -> name?: string
  // 3회차: K는 "age" / User3["age"]는 number / 결과 -> age?: number
  [K in keyof User3]?: User3[K];
};

/**
 * [ReadonlyUser3 루프 분석]
 * 원리는 같으나, 각 속성 앞에 readonly라는 키워드를 강제로 붙여줌.
 */
type ReadonlyUser3 = {
  // 1회차: K는 "id" / readonly id?: number
  // 2회차: K는 "name" / readonly name?: string
  // 3회차: K는 "age" / readonly age?: number
  readonly [K in keyof User3]?: User3[K];
};

// -----------------
// 템플릿 리터럴 타입(Template Literal Types)
// string literal 타입을 조합해서 새로운 string literal 타입을 생성
// -----------------
type Color2 = "red" | "green" | "blue";
type Intensity = "light" | "dark";

/**
 * [ColorTheme 루프 및 조합 분석]
 * 문법: `${Intensity}-${Color2}`
 * * TypeScript는 각 유니온 타입의 모든 경우의 수를 '교차 곱(Cartesian Product)' 방식으로 조합함.
 */
type ColorTheme = `${Intensity}-${Color2}`;

/**
 * [내부 조합 과정 주석]
 * 1. Intensity의 "light"를 먼저 고정하고 Color2의 모든 값을 순회함:
 * - "light" + "-" + "red"   => "light-red"
 * - "light" + "-" + "green" => "light-green"
 * - "light" + "-" + "blue"  => "light-blue"
 * * 2. Intensity의 "dark"를 고정하고 Color2의 모든 값을 순회함:
 * - "dark" + "-" + "red"    => "dark-red"
 * - "dark" + "-" + "green"  => "   dark-green"
 * - "dark" + "-" + "blue"   => "dark-blue"
 * * 최종 결과:
 * "light-red" | "light-green" | "light-blue" | "dark-red" | "dark-green" | "dark-blue"
 */
