// ---------------------------------
// Class: 객체를 정의하기 위한 집합, 타입으로도 사용 가능
// 클래스명은 PascalCase로 작성
// 파일명 = 클래스명 동일하게 작성
// 기본적으로 한 시스템 내에서 클래스명은 중복이 없도록 한다. X

/**
 * 클래스의 필드 구분: 인스턴스(Instance) vs 정적(Static)
 */

class Animal {
  // -------------------------
  // 1. 인스턴스 필드 (Instance Field)
  // -------------------------
  // - 각 객체(인스턴스)가 고유하게 가지는 데이터임.
  // - `new Animal()`을 통해 생성된 개별 객체를 통해서만 접근 가능함.
  // - 메모리의 힙(Heap) 영역에 객체 생성 시마다 독립적으로 할당됨: 인스턴스 하기 전 까지는 할당 X
  public name: string = "동물";

  // -------------------------
  // 2. 정적 필드 (Static Field)
  // -------------------------
  // - 클래스 자체에 귀속되는 데이터임.
  // - 인스턴스 생성 없이 클래스명으로 즉시 접근 가능함.
  // - 모든 인스턴스가 공유하는 공통 데이터나 설정값 정의 시 사용함.
  // - 프로그램 실행 시 메모리의 정적 영역에 단 한 번만 할당됨: 프로그램 실행하면 할당 O
  public static sName: string = "static name";
}

// --- 인스턴스 필드 사용 예 ---
const myDog: Animal = new Animal();
const myCat: Animal = new Animal();

myDog.name = "강아지"; // myDog 인스턴스의 name만 변경됨
myCat.name = "고양이"; // myCat 인스턴스의 name은 독립적으로 존재함
console.log(myDog.name); // "강아지" 출력

// --- 정적 필드 사용 예 ---
// console.log(myDog.sName); // 에러 발생: 인스턴스로는 접근할 수 없음
console.log(Animal.sName); // 정상: 클래스 이름을 통해 직접 접근함

Animal.sName = "전역 동물 이름"; // 모든 곳에서 공유되는 값이 변경됨
console.log(Animal.sName); // "전역 동물 이름" 출력

// -------------------------
// [핵심 차이점 요약]
// -------------------------
// - 인스턴스 필드: 개별 객체의 고유한 상태를 나타냄 (예: 이름, 나이).
// - 정적 필드: 클래스 수준의 공통 정보를 나타냄 (예: 개체 수 카운트, 공통 설정).

/**
 * 클래스 메서드 구분: 인스턴스(Instance) vs 정적(Static)
 */

class Counter {
  // 인스턴스 필드
  public count: number = 0;

  // 정적 필드
  public static totalCalls: number = 0;

  // -------------------------
  // 1. 인스턴스 메서드 (Instance Method)
  // -------------------------
  // - 각 객체(인스턴스)의 데이터를 조작하거나 해당 객체만의 동작을 수행함.
  // - `this` 키워드를 통해 인스턴스 필드(count)에 접근할 수 있음.
  // - 반드시 `new`로 생성한 객체를 통해서만 호출 가능함.
  public increment(): void {
    this.count++;
    console.log(`현재 개별 카운트: ${this.count}`);

    // 인스턴스 메서드 내부에서 정적 메서드 호출은 클래스명으로 가능함
    Counter.addTotalCall();
  }

  // -------------------------
  // 2. 정적 메서드 (Static Method)
  // -------------------------
  // - 클래스 자체의 기능을 수행하며, 인스턴스 데이터와는 독립적임.
  // - `this`를 사용할 수 없음 (어떤 객체의 것인지 알 수 없기 때문).
  // - 클래스명으로 직접 호출하며, 공통 유틸리티 함수를 만들 때 자주 사용함.
  public static addTotalCall(): void {
    this.totalCalls++; // 여기서 this는 클래스(Counter) 자체를 가리킴
    console.log(`전체 호출 횟수 합계: ${this.totalCalls}`);
  }

  // 예: 수학 계산기처럼 인스턴스가 필요 없는 유틸리티 기능
  public static resetTotal(): void {
    Counter.totalCalls = 0;
    console.log("전체 기록이 초기화되었습니다.");
  }
}

// --- 사용 예시 ---

const myCounter = new Counter();
const yourCounter = new Counter();

// 1. 인스턴스 메서드 호출
myCounter.increment(); // 개별 카운트: 1, 전체 합계: 1
myCounter.increment(); // 개별 카운트: 2, 전체 합계: 2
yourCounter.increment(); // 개별 카운트: 1, 전체 합계: 3 (전체 합계는 공유됨)

// 2. 정적 메서드 호출
Counter.addTotalCall(); // 전체 합계: 4 (객체 생성 없이 클래스로 직접 호출)
Counter.resetTotal(); // 전체 기록 초기화

// [에러 케이스]
// myCounter.addTotalCall(); // 에러: 인스턴스에서는 정적 메서드에 접근 불가
// Counter.increment();      // 에러: 클래스명으로 인스턴스 메서드 직접 호출 불가

/**
 * 생성자 메소드: 객체가 생성될 때 자동으로 호출되는 특수한 메소드
 */
class Whale {
  public name: string = "라분";
  // 생성자 메소드
  // 객체 인스턴스 생성 시 기본적으로 실행되어야 하는 작업들을 위해서 사용
  constructor(name: string) {
    this.name = name;
  }
}
// new instance시 constructor() {}가 자동으로 실행된다.
const whale1: Whale = new Whale(); // whale1도 '라분'
const whale2: Whale = new Whale(); // whale2도 '라분' *하지만 모든 고래의 이름이 다 달라야한다면 외부 파라미터를 받아 constructor를 이용해서 다른값을 세팅해줌.

// 그래서 constructor에 파라미터를 받기로 약속해서 외부 값을 받아 그 값을 기반으로 초기화 세팅을 constructor로 한다
const whale3: Whale = new Whale("밍키");

/**
 * instance와 static에서 this. 사용 예시
 */
class Counter {
  public count: number = 0; // 'new' 할 때 메모리에 생기는 녀석

  // 1. 프로그램 실행되자마자 메모리에 올라감 (인스턴스 생성 전)
  public static staticMethod() {
    // 여기서 this는 클래스 그 자체임.
    // 인스턴스가 생성되기 전부터 존재하므로,
    // 나중에 생성될 'count'가 메모리 어디에 생길지 전혀 알 수가 없음.
    // 그래서 this.count는 접근 불가능!
  }

  // 2. 'new'를 해서 인스턴스가 메모리에 생겨야 존재함
  public instanceMethod() {
    // 여기서 this는 이미 메모리에 만들어진 '그 객체'임.
    // 자기 몸 안에 count가 확실히 들어있다는 걸 알고 있음.
    // 그래서 this.count는 접근 가능!
  }
}

/**
 * 접근 제어 지시자
 */
class Cat {
  // public: class 내/외부 어디서나 접근 가능 (기본값 & 생략 가능)
  // private: class 내부에서만 접근 가능
  // protected: class 내부 || 자식 클래스에서만 접근이 가능
  num1: number = 1; // public은 생략 가능
  public num2: number = 2;
  private num3: number = 3;
  protected num4: number = 4;
}
const cat: Cat = new Cat();
cat.num1; // 1
cat.num2; // 1
cat.num3; // cannot access bc 'private'
cat.num4; // cannot access bc 'protected'

class CatChild extends Cat {
  test(): void {
    this.num1; // can access bc inherited
    this.num2; // can access bc inherited
    this.num3; // cannot access bc 'private'
    this.num4; // can access bc 'protected' and Catchild is child of Cat class
  }
}
