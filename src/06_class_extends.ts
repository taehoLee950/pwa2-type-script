// --------------------------
// 클래스 상속 및 생성자 호출 순서
// --------------------------

/**
 * [부모 클래스: Mammal]
 */
class Mammal {
  constructor(
    protected name: string,
    protected residence: string,
  ) {
    // 필드 초기화 및 부모 생성자 로직 실행
    this.name = name;
    this.residence = residence;
    console.log("마멀마멀");
  }

  public breath(): void {
    console.log(`${this.name}이/가 폐호흡합니다.`);
  }
}

/**
 * [자식 클래스 1: Whale]
 */
class Whale extends Mammal {
  constructor(name: string, residence: string) {
    // 자식 생성자 정의 시 반드시 부모 생성자(super)를 최우선으로 호출해야 함
    // 부모의 속성들이 메모리에 먼저 세팅되어야 하기 때문임
    super(name, residence);
    console.log("자식 고래");
  }

  /**
   * [오버라이딩 (Overriding)]
   * 부모에게 상속받은 메소드를 자식 클래스에서 재정의함
   * v4.3+ 버전부터 `override` 키워드를 붙여 명시적으로 표현함
   */
  override breath(): void {
    console.log(`룰랄라라`);
  }

  public swimming(): void {
    console.log(`${this.name}이/가 헤엄칩니다.`);
  }
}

/**
 * [자식 클래스 2: FlyingSquirrel]
 */
class FlyingSquirrel extends Mammal {
  // 자식 쪽 생성자를 생략하면 자동으로 부모 생성자를 호출하도록 처리됨
  // 추가적인 초기화 로직이 없을 때 생략 가능함

  public flying(): void {
    console.log(`${this.name}이/가 날아갑니다.`);
  }
}

// --- 인스턴스 생성 및 실행 ---

// "마멀마멀" 출력 후 "자식 고래" 출력됨
const whale: Whale = new Whale("라분", "바다");

// 자동으로 부모 생성자가 실행되어 "마멀마멀" 출력됨
const flyingSquirrel: FlyingSquirrel = new FlyingSquirrel("다람이", "산");

// 오버라이딩된 자식의 breath()가 실행됨 (출력: 룰랄라라)
whale.breath();
