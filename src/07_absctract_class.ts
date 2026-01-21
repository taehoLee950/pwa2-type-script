//

abstract class Mammal {
  constructor(
    protected name: string,
    protected residence: string,
  ) {
    this.name = name;
    this.residence = residence;
  }

  // 일반 메소드
  public breath(): void {
    console.log(`${this.name}이/가 폐호흡합니다.`);
  }

  // 추상 메소드: 자식 쪽에서 반드시 오버라이딩 해야하는 메소드
  abstract printResidence(): void;
}

// const mammal: Mammal = new Mammal(); // abstract class는 단독으로 인스턴스가 안됨.

class Whale extends Mammal {
  override printResidence(): void {
    console.log("하하");
  } // 부모의 추상메소드를 반드시 override해서 구현해야 오류가 나지 않는다.
}
