/**
 * 1. 기본 타입 정의 (Basic Types)
 */
// 명시적으로 타입을 지정하는 방식 (Type Annotation)임.
let num: number = 1;
let str: string = "1";

/**
 * 2. 숫자 타입 (Number)
 * 정수, 실수, 16진수, NaN, Infinity를 모두 포함하는 타입임.
 */
let decimal: number = 6; // 10진수임.
let hex: number = 0xf00d; // 16진수임.
let nan: number = NaN; // 숫자가 아님을 의미함.
let infinity: number = Infinity; // 무한대를 의미함.
// let bigint: bigint = 100n;  // 아주 큰 정수를 다룰 때 사용함 (ES2020 이상).

// 값 재할당 예시: 동일한 타입 내에서만 가능함.
decimal = 2;
hex = 2;
nan = 1;
infinity = 10;

/**
 * 3. 문자열 타입 (String)
 */
let storeName: string = "카페 늘봄"; // 매장명 데이터임.
storeName = "늘봄 베이커리";

/**
 * 4. 리터럴 타입 (Literal)
 * 특정 '값' 자체를 타입으로 지정하여, 해당 값만 허용하도록 제한함.
 */
let numLiteral: 1 = 1; // 오직 숫자 1만 할당 가능함.
let strLiteral: "카페" = "카페"; // 오직 문자열 "카페"만 할당 가능함.

/**
 * 5. 불리언 타입 (Boolean)
 */
let isOpened: boolean = true;
let isClosed: boolean = false;

/**
 * 6. 배열 타입 (Array)
 */
// 방식 A: 타입[] (가장 일반적으로 권장되는 방식임).
let numList: number[] = [1, 2, 3, 4, 5];
let strList: string[] = ["가", "나"];

// 방식 B: 제너릭 방식 (Array<타입>)으로 선언함.
let numList2: Array<number> = [1, 2, 3, 4, 5];

// 다차원 배열: 배열의 요소가 다시 배열인 형태임.
let dimensionalList: number[][] = [
  [1, 2, 3],
  [5, 6, 7],
];

// 유니온 타입 배열: 여러 종류의 타입을 혼합해서 사용할 때 씀.
let multiList: (number | string)[] = [1, "2"];

/**
 * 7. 튜플 타입 (Tuple)
 * 배열의 서브타입으로, 요소의 개수와 각 위치의 타입이 고정된 형태임.
 */
let userRole: [number, string] = [1, "관리자"]; // 순서와 타입을 엄격히 지켜야 함.
let x2: [number[], number] = [[1, 2, 3], 1];

/**
 * 8. 객체 타입 (Object)
 */
// object 타입: 원시 타입을 제외한 모든 타입(객체, 배열 등)을 허용함.
let obj: object = {};
let obj2: object = []; // 배열도 객체로 간주되어 할당 가능함.

// 객체 리터럴 방식: 속성마다 구체적인 타입을 지정함. 실무에서 가장 권장됨.
let person1: { name: string; age: number } = {
  name: "홍길동",
  age: 20,
};

// 먼저 선언한 후 나중에 값을 할당하는 방식임.
let person2: { name: string; age: number };
person2 = { name: "안성재", age: 43 };

/**
 * 9. 타입 추론 (Type Inference)
 * 선언과 동시에 초기값을 주면 TS가 자동으로 타입을 결정함.
 */
let staff = {
  name: "김철수",
  shop: "카페 늘봄",
  age: 25,
};

/**
 * 10. Optional 프로퍼티 (선택적 속성)
 * 속성명 뒤에 '?'를 붙여서 해당 속성이 있어도 되고 없어도 됨을 나타냄.
 */
let obj7: { name: string; age: number; gender?: string };

// 모든 속성이 다 있는 경우임.
obj7 = { name: "홍길동", age: 20, gender: "M" };

// gender 속성이 없어도 에러가 발생하지 않음.
obj7 = { name: "김갑순", age: 67 };

/**
 * 11. Readonly 프로퍼티 (읽기 전용 속성)
 * 객체 생성 시에만 할당 가능하며, 이후에 값을 수정할 수 없도록 제한함.
 */
let obj8: { readonly name: string; age: number };
obj8 = { name: "카페 늘봄", age: 5 };

// obj8.name = "다른 이름"; // error: 읽기 전용이라 수정 불가능함.
obj8.age = 6; // readonly가 아니므로 수정 가능함.

/**
 * 12. null & undefined 타입
 * 'strict' 모드일 경우: 원시 타입(number, string 등)에 직접 할당 불가능함, 'any', 'unknown', 'null'에만 할당 가능
 * 주로 '유니온 타입(|)'을 사용하여 데이터가 비어있을 수 있음을 명시함.
 */

// 객체가 존재할 수도 있고, 아직 없을 수도(null) 있는 상황임.
let objNull: { name: string; age: number } | null = null;

// 데이터가 로딩된 후 객체를 할당하는 예시임.
objNull = { name: "홍길동", age: 20 };

// 변수가 선언되었으나 값이 아직 정의되지 않았음을 나타낼 때 사용함.
let objUndefined: { name: string; age: number } | undefined = undefined;

/**
 * 13. strict 모드에서의 할당 규칙
 * any, unknown 타입에는 null과 undefined를 자유롭게 할당 가능함.
 */
let anyVal: any = null;
let unknownVal: unknown = undefined;

// 일반 원시 타입에는 할당 시 에러가 발생함. (엄격한 모드 기준)
// let numVal: number = null; // Error: 'null' 형식을 'number' 형식에 할당할 수 없음.

/**
 * 14. Type Alias (타입 별칭)
 * 복잡한 타입 정의에 이름을 붙여서 재사용할 수 있게 만드는 기능임.
 * 관례적으로 첫 글자는 대문자(Pascal Case)로 작성함.
 */
type User = {
  name: string;
  age: number;
};

// 정의된 User 타입을 재사용하여 객체를 생성함.
const obj9: User = { name: "홍길동", age: 20 };
const obj10: User = { name: "둘리", age: 20 };

/**
 * 15. 타입 별칭의 확장성
 * 객체뿐만 아니라 일반 타입, 유니온 타입 등 모든 타입에 이름을 붙일 수 있음.
 */
type Name = string;
type ID = string | number; // 유니온 타입에 별칭을 붙여 코드 가독성을 높임.

let userId: ID = "cafe_neulbom_01";
userId = 101;

/**
 * 16. 객체 타입 정의 (세미콜론 활용)
 * 타입 설계도 내에서는 속성 간 구분을 위해 세미콜론(;)을 사용함.
 * 마지막 속성 뒤의 세미콜론은 생략 가능하나, 유지보수를 위해 붙이는 것을 권장함.
 */
type LangCodes = {
  KOREA: string; // 속성 구분함.
  USA: string; // 속성 구분함.
  JAPAN: string; // 마지막 속성이며, 세미콜론을 붙여 스타일을 통일함.
};

/**
 * 17. Index Signature (인덱스 시그니처)
 * 정해진 속성명 없이, 특정 규칙을 가진 모든 속성을 허용할 때 사용함.
 * '카페 늘봄'의 모든 메뉴와 가격을 담는 객체 등에 유용함.
 */
type MenuPrice = {
  [menuName: string]: number; // 문자열 키에 숫자 값을 가지는 모든 속성을 허용함.
};

const neulbomMenu: MenuPrice = {
  아메리카노: 4500,
  카페라떼: 5000,
  에이드: 5500, // 데이터 객체이므로 콤마(,)를 사용하거나 생략 가능함.
};

/**
 * 18. 실무 활용 (고정 속성 + 인덱스 시그니처)
 * 반드시 있어야 하는 속성과 유연하게 추가될 속성을 함께 정의  가능함.
 */
type UserProfile = {
  readonly id: number; // 고정 및 수정 불가 속성임.
  name: string; // 고정 속성임.
  [key: string]: string | number; // 추가 정보는 문자열이나 숫자로 유연하게 받음.
};

// 앞선 코드와 중복되지 않도록 변수명을 staffMember로 수정함.
const staffMember: UserProfile = {
  id: 1,
  name: "홍길동",
  position: "매니저", // 인덱스 시그니처 덕분에 허용됨.
  hobby: "독서", // 데이터 객체이므로 마지막에 콤마(,)를 붙임.
};

/**
 * 19. 추가 예시 (설정값 관리)
 */
type AppConfig = {
  readonly serverUrl: string;
  timeout: number;
  [settingName: string]: any;
};

const myAppConfig: AppConfig = {
  serverUrl: "https://api.neulbom.com",
  timeout: 5000,
  debugMode: true,
  theme: "dark",
};

/**
 * 20. 인덱스 시그니처 주의사항
 * 인덱스 시그니처가 있으면 다른 고정 속성들도 해당 타입의 범위를 따라야 함.
 */
type VariableObject = {
  [key: string]: string;
  // status: number; // Error: 모든 속성값이 string이어야 하므로 number는 불가능함.
  status: string; // 정상적으로 허용됨.
};

/**
 * 21. Enum 타입 (열거형)
 * 숫자 열거형: 별도의 값을 지정하지 않으면 0부터 시작하여 1씩 증가하며 값이 자동 할당됨.
 * 코드의 가독성을 높이고, 정해진 값 외에 다른 값이 들어오는 것을 방지하는 목적임.
 */
enum Role {
  USER, // 0이 할당됨.
  GUEST, // 1이 할당됨.
  ADMIN, // 2가 할당됨.
}

const user1 = {
  name: "홍길동",
  role: Role.ADMIN, // 숫자 2를 직접 쓰는 것보다 의미 파악이 훨씬 쉬움.
};

/**
 * 22. Enum 값 수동 지정
 * 시작 번호를 지정하거나, 문자열을 직접 할당할 수도 있음.
 */
enum StoreStatus {
  OPEN = "열림",
  CLOSED = "닫힘",
  REPAIR = "수리중",
}

const myStore = {
  name: "카페 늘봄",
  status: StoreStatus.OPEN, // "열림"이라는 문자열 값이 할당됨.
};

/**
 * 23. Enum의 특징
 * - 숫자형 Enum의 경우, 역방향 매핑(Reverse Mapping)을 통해 값으로 이름을 찾을 수도 있음.
 * - 하지만 실무에서는 의도가 명확한 문자열 Enum을 더 선언적으로 많이 사용하는 편임.
 */
console.log(Role[0]); // "USER"가 출력됨.

/**
 * 24. Union 타입 (합집합)
 * 여러 타입 중 하나일 수 있음을 나타낼 때 사용하며, 세로선(|)으로 구분함.
 * 가장 활용도가 높은 타입 합성 방식임.
 */
type StringOrNumber = string | number;

let userId1: StringOrNumber = "staff_01"; // 문자열 허용함.
userId = 101; // 숫자도 허용함.

// '카페 늘봄'의 메뉴 상태를 제한적으로 정의함.
type MenuStatus = "품절" | "판매중" | "준비중";
let americanoStatus: MenuStatus = "판매중";

/**
 * 25. Intersection 타입 (교집합)
 * 여러 타입을 하나로 결합하여 모든 속성을 다 갖게 만드는 타입임.
 * 앰퍼샌드(&)를 사용하며, 주로 여러 객체 타입을 합칠 때 사용함.
 */
type BasicInfo = {
  name: string;
};

type DetailInfo = {
  age: number;
};

// 두 타입을 모두 만족해야 하는 새로운 타입을 만듦.
type FullProfile = BasicInfo & DetailInfo;

const staffMembers: FullProfile = {
  name: "홍길동",
  age: 25, // 두 타입의 모든 속성을 다 적어줘야 함.
};

/**
 * 26. Intersection의 실무 활용
 * 기존 타입에 새로운 속성을 추가하여 확장할 때 유용함.
 */
type BaseUser = {
  readonly id: number;
  name: string;
};

type AdminExtra = {
  accessLevel: number;
};

type AdminUser = BaseUser & AdminExtra;

const manager: AdminUser = {
  id: 1,
  name: "김철수",
  accessLevel: 9, // BaseUser와 AdminExtra의 모든 속성을 가짐.
};
