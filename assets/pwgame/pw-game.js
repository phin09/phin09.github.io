'use strict';

// 수정해야 될 것
// inputBox - map을 이용한 동적변수생성으로 바꿔야 됨
// (일단 완료)지금은 중복되지 않는 숫자 조합을 뽑음. 중복 가능하게 바꾸기. -> 함수화하기
// 정답을 맞춰도 정답 분기로 진입하지 않는 문제가 있음 - 타입문제로 추측됨
// (일단 완료)도전 히스토리 추가 -> 시뮬돌리고 멘트 가시단계 UX 수정
// 해결하고 시간 남으면 알아볼 것: input란의 가운데에 텍스트가 올 수는 없는지. 입력하면 다음 칸으로 커서 옮겨주기.

const body = document.querySelector("body > div > main");
const CENTER_CLASS = 'alignCenter';
const INPUT_CLASS = 'inputBox';

let baseWord = document.createElement('div');   // 단어
baseWord.innerHTML = '<i class="fas fa-lock"></i> 3-digit password';
// 여기서 textContent 쓰면 innerHTML로 준 게 사라짐
baseWord.classList.add(CENTER_CLASS);
body.append(baseWord);

let baseForm = document.createElement('form');  // 폼
baseForm.classList.add(CENTER_CLASS);
body.append(baseForm);

// inputBox - map을 이용한 동적변수생성으로 바꿔야 됨
let inputBox1 = document.createElement('input'); // 입력창
inputBox1.setAttribute('type', 'text');
inputBox1.setAttribute('maxLength', '1');
inputBox1.classList.add(INPUT_CLASS);
baseForm.append(inputBox1);

let inputBox2 = document.createElement('input'); // 입력창
inputBox2.setAttribute('type', 'text');
inputBox2.setAttribute('maxLength', '1');
inputBox2.classList.add(INPUT_CLASS);
baseForm.append(inputBox2);

let inputBox3 = document.createElement('input'); // 입력창
inputBox3.setAttribute('type', 'text');
inputBox3.setAttribute('maxLength', '1');
inputBox3.classList.add(INPUT_CLASS);
baseForm.append(inputBox3);


let btn = document.createElement('button'); // 버튼
btn.innerHTML = '<i class="fas fa-key"></i>';
baseForm.append(btn);

let feedback = document.createElement('div');   // 결과창
feedback.classList.add(CENTER_CLASS);
body.append(feedback);

let history = document.createElement('div');    // 기록창
history.classList.add(CENTER_CLASS);
body.append(history);

let arr = []; // 정답 숫자배열
for (let i = 0; i < 3; i++) {
    let temp = (Math.floor(Math.random() * 10)); // 뽑은것(중복 가능)
    arr.push(temp);
}
console.log(arr);

let cnt = 0;

baseForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let inputStr = `${inputBox1.value}${inputBox2.value}${inputBox3.value}`;
    console.log(inputStr);

    if (inputStr == arr.join()) { // 정답을 맞춰도 여기 진입하지 않는 문제가 있음
        feedback.textContent = '정답';
        history.textContent = '';
        inputBox1.value = '';
        inputBox2.value = '';
        inputBox3.value = '';
        inputBox1.focus();

        arr = []; // 숫자배열
        for (let i = 0; i < 3; i++) {
            let temp = (Math.floor(Math.random() * 10)); // 뽑은것(중복 가능)
            arr.push(temp);
        }

        cnt = 0;
    } else {
        let inputArr = inputStr.split(''); // 응답배열. inputBox에 들어온 답을 배열로
        console.log(inputArr);
        let strike = 0;
        let ball = 0;
        cnt++;
        if (cnt > 4) {
            feedback.textContent = `The inputStr is ${arr}`;
            history.textContent = '';
            inputBox1.value = '';
            inputBox2.value = '';
            inputBox3.value = '';
            inputBox1.focus();

            arr = []; // 숫자배열
            for (let i = 0; i < 3; i++) {
                let temp = (Math.floor(Math.random() * 10)); // 뽑은것(중복 가능)
                arr.push(temp);
            }

            cnt = 0;
        } else {
            for (let i = 0; i < 3; i++) {
                if (inputArr[i] === Number(arr[i])) {
                    strike++;
                } else {
                    if (arr.indexOf(Number(inputArr[i])) > -1) {
                    ball++;
                    }
                }
                // arr은 [8, 9, 3, 5], ansArr은 ["5", "3", "9", "8"] 이런 식으로 되는데
                // if 조건문은 == 로 하면 가능하지만, else if 조건문은 type이 다르면 -1 나옴.
            }
            feedback.textContent = strike + '/' + ball;
            inputBox1.value = '';
            inputBox2.value = '';
            inputBox3.value = '';
            inputBox1.focus();

            history.innerHTML += `${inputStr} => ${strike} / ${ball}<br>`;  // 이전 기록에 지금 결과를 이어붙임
        }
    }

});