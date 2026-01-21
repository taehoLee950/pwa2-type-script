/**
 * Generics
 */

// any 타입 사용 시 TypeScript의 타입 오류 '미'감지 예시
function fncNormal(val: any) {
  return val;
}

let num1 = fncNormal(10); // 여기서 TypeScript는 num1을 'any' 타입으로 구분함.
num1.toUpperCase(); // number type에서는 사용할 수 없는 uppercase 함수가 동작이 됨. 즉 any일 시 TypeScript에서 오류 감지를 못 함.

// Generics 이용해서 함수를 만들 경우
function fncGeneric<T>(val: T): T {
  // <T>: 외부에서 타입 지정을 한다는 의미. 리턴타입 T: 외부에서 받은 T 타입에 맞춰 반환하는 값도 T의 타입으로 한다는 의미.
  return val;
}
let num2 = fncGeneric(10);
num2.toUpperCase(); // 오류 감지: T에 주입된 외부 값 10(number 타입)에 맞춰 반환한 값이다. number 타입에 toUpperCase를 사용하려고 하니 TypeScript가 오류를 감지함.

/**
 * Generic Interface
 */
interface DropBox1<T> {
  val: T;
  selected: boolean;
}

const dropBox1: DropBox1<number> = { val: 1, selected: false };

// Generic Interface 2
interface DropBox2<T, U> {
  val: T;
  selected: U;
}
const dropBox2: DropBox2<number, boolean> = { val: 1, selected: false };

/**
 * Generic Class
 */

// 일반 클래스 예시
class BoxNormal {
  public kinds: string[] = [];

  public add(val: string): void {
    //val: string = string만 받기로 되어있다.
    this.kinds.push(val);
  }

  public toString(): string {
    return this.kinds.toString();
  }
}
const boxNormal: BoxNormal = new BoxNormal();
boxNormal.add("test");
boxNormal.add(1); // Error: public add(val: string) = string만 받기로 되어있다.

// 위 일반 클래스를 Generic으로 개선
class BoxGeneric<T> {
  public kinds: T[] = [];
  // val: T = 외부에서 받는 타입으로 val의 타입을 지정
  public add(val: T): void {
    this.kinds.push(val);
  }

  public toString(): string {
    return this.kinds.toString();
  }
}
const boxGeneric1: BoxGeneric<number> = new BoxGeneric(); // 외부에서 주입할 타입으로 <number>로 지정하여 인스턴스 한다.
boxGeneric1.add(1); // 외부에서 number가 들어와 val: T -> val: number로 지정이 됨.

const boxGeneric2: BoxGeneric<string> = new BoxGeneric(); // 이번에는 외부에서 주입할 타입을 <string>으로 지정하여 인스턴스
boxGeneric2.add("안녕하세요"); // 외부에서 string이 들어와 val: T -> val: string으로 지정이 됨.

/**
 * Generic Constraint
 * Generic에서 특정 조건을 만족하는 타입만 받도록 제한
 */
interface RequiredLength {
  length: number; // .length 속성이어야 한다. & .length 속성의 타입이 number이어야 한다.
}

// param: any, return: any로 할 시 length가 없는 값이 들어올 때 Error가 나게된다.
function getLength(arg: any): any {
  return arg.length;
}

// T(아직 정해지지않은 타입이지만) extends RequiredLength(RequiredLength 인터페이스 구조를 가져야한다.)를 사용한다.
// 즉, length라는 속성(method)이 있고 그 타입이 number인 데이터만 이 함수의 인자로 들어올 수 있게 됨.
function getGenericLength<T extends RequiredLength>(arg: T): number {
  return arg.length;
}
getGenericLength([1, 2, 3]); // 3을 반환
getGenericLength(1); // Error: number type에는 length가 없음.
