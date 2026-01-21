// extends가 "부모로부터 성질을 물려받는 것(상속)"이라면, implements는 "약속된 기능을 반드시 구현하는 것(이행)"이다.

// -------------- Interface -----------------
interface Swimming {
  swimming(): void;
}

interface Flight {
  flying(): void;
}
// -------------- Interface -----------------

/**
 * Mammal 관련
 */
abstract class Mammal {
  constructor(protected name: string) {
    this.name = name;
  }
  // 추상 메소드
  // abstract residence(): void;는 "이 클래스를 상속받는 자식들은 residence라는 메서드를 반드시 만들어야 하며, 그 메서드는 아무런 값도 리턴(return)하지 않아야 한다"는 규칙을 정해둔 것임.
  abstract residence(): void; // void: 리턴값(반환값)이 없다는 약속임

  // 일반 메소드
  public breath(): void {
    console.log(`${this.name}폐호흡 합니다.`);
  }
}

class Whale extends Mammal implements Swimming {
  override residence(): void {
    console.log(`${this.name}은 바다에 삽니다`);
  }

  // interface 받아오기
  swimming(): void {
    console.log(`${this.name} 수영한다.`);
  }
}

class FlyingSquirrel extends Mammal {
  override residence(): void {
    console.log(`${this.name} 산에 삽니다.`);
  }
}

/**
 * Fish 관련
 * interface를 생성하여 공통 기능을 추상화 한다.
 */
class Flyingfish implements Swimming, Flight {
  // 수영, 비행, 바다에 산다.
  swimming(): void {
    console.log("날치가 수영한다");
  }

  flying(): void {
    console.log("날치가 날다");
  }
}
