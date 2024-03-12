import { useEffect, useMemo, useState } from 'react';

function App() {

  const [number, setNumber] = useState(0);
  const [isKorea, setIsKorea] = useState(true);

  // const location = isKorea? '한국' : '일본';
  const location = useMemo(() => {
    return { 
      country : isKorea ? '한국' : '일본',
    };
  },[isKorea]);
  
  // {country : isKorea? '한국' : '일본'};

  // 맨 처음과 location이 바뀔떄만 실행
  useEffect(() => {
    console.log('useEffect 호출');
    // 뭔가 오래 소요되는 작업.. 꼭 필요할시에만 호출!
  }, [location]);

  return (
    <div>
      <h2>하루에 몇끼 먹어요?</h2>
      <input 
      type="number"
      value = {number}
      onChange={(e) => setNumber(e.target.value)}
      />
      <br />
      <h2>어느 나라에 있어요?</h2>
      <p>나라:{location.country}</p>
      <button onClick={() => setIsKorea(!isKorea)}>비행기 타자</button>
    </div>
  );
} 

export default App;

/*
  useMemo - Memo : 메모이제이션, 자주 쓰이는 값을 Memoization, 즉 캐싱함!
  동일한 값을 리턴하는 함수를 반복적으로 호출 해야 하는 경우, 맨 처음 값을 저장 - 재 선언 하지 않고 꺼내 사용

  ★ 함수형 컴포넌트 

  function Component () {
    const value = calculate();
    return <div>{value}</div>
  }

  function calculate() {
    return 10;
  }
   렌더링 -> Component 함수 호출 -> 모든 내부 변수 초기화

  function Component () {
    const value = useMemo(
      () => calculate(), []
    )
    return <div>{value}</div>
  }

  <Component />

  렌더링 -> Component 함수 호출(Memoization) 
  -> 렌더링 -> Component 함수 호출, Memoization 된 값 재사용 
*/

/*
  const value = useMemo (() => {
    return calculate();
  }, [item]);
  - Memoization 할 값을 계산해 리턴 
  - 해당 콜백함수 return 값 useMemo 리턴 값! 

  콜백 : Memoization 재사용할 함수, 
  item : 의존성 배열, 
  item 안의 요소 값이 Update 될때만
  콜백함수 호출, Memoization 된 값을 Update 해 
  다시 Memoization 함.
  
  만약, item에 빈 배열 넘겨주면, 
  맨 처음 컴포넌트가 Mount 되었을 때만 값을 계산 후
  이후에는 항상 Memoization 된 값을 꺼내와 사용

  ★ useMemo, 꼭 필요할때만 사용.

  App - 함수형 컴포넌트, 함수 - 호출
  함수 호출 -> 함수 내부 변수 초기화, 
  state 의 Update로 인한 재 렌딩! - 현재 hardCalCulate 함수 렌딩 될때마다 호출

  function App() {
  
    const[hardNumber, setHardNumber] = useState(1);
    const[easyNumber, setEasyNumber] = useState(1);

  // const hardSum = hardCalculate(hardNumber);
  const hardSum = useMemo(() => {
    return hardCalculate(hardNumber);
  },[hardNumber]) 
  // hardNumber 가 변경 -> hardCalculate 함수 불러와 hardSum을 초기화 시킴 

  const easySum = easyCalculate(easyNumber);
  
  return (
    <div>
      <h3>어려운 계산기</h3>
      <input type="number"
        value = {hardNumber}
        onChange={(e) => setHardNumber(parseInt(e.target.value))}
      />
      <span> + 10000 = {hardSum} </span>

      <h3>쉬운 계산기</h3>
      <input type="number"
        value = {easyNumber}
        onChange={(e) => setEasyNumber(parseInt(e.target.value))}
      />
      <span> + 1 = {easySum} </span>
    </div>
  );
} 

export default App;

*/
