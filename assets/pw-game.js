'use strict';

// 수정해야 될 것
// inputBox - map을 이용한 동적변수생성으로 바꿔야 됨
// 지금은 중복되지 않는 숫자 조합을 뽑음. 중복 가능하게 바꾸기.
// 정답을 맞춰도 정답 분기로 진입하지 않는 문제가 있음 - 타입문제로 추측됨
// 도전 히스토리 추가
// 해결하고 시간 남으면 알아볼 것: input란의 가운데에 텍스트가 올 수는 없는지. 입력하면 다음 칸으로 커서 옮겨주기.

let body = document.querySelector("body > div > main");

let baseWord = document.createElement('div');   // 단어
baseWord.innerHTML = '<i class="fas fa-lock"></i> 3-digit password';
// 여기서 textContent 쓰면 innerHTML로 준 게 사라짐
baseWord.style = 'text-align:center;';
body.append(baseWord);

let baseForm = document.createElement('form');  // 폼
baseForm.style = 'text-align:center;';
body.append(baseForm);

// inputBox - map을 이용한 동적변수생성으로 바꿔야 됨
let inputBox1 = document.createElement('input'); // 입력창
inputBox1.type = 'text';
inputBox1.maxLength = 1;
inputBox1.style = 'display:inline;text-align:center;width:20pt;background-color:var(--text-color);color:black;letter-spacing:10px;margin-right:10px';
baseForm.append(inputBox1);

let inputBox2 = document.createElement('input'); // 입력창
inputBox2.type = 'text';
inputBox2.maxLength = 1;
inputBox2.style = 'display:inline;text-align:center;width:20pt;background-color:var(--text-color);color:black;letter-spacing:10px;margin-right:10px';
baseForm.append(inputBox2);

let inputBox3 = document.createElement('input'); // 입력창
inputBox3.type = 'text';
inputBox3.maxLength = 1;
inputBox3.style = 'display:inline;text-align:center;width:20pt;background-color:var(--text-color);color:black;letter-spacing:10px;margin-right:10px';
baseForm.append(inputBox3);


let btn = document.createElement('button'); // 버튼
btn.innerHTML = '<i class="fas fa-key"></i>';
// btn.textContent = 'submit';
baseForm.append(btn);

let feedback = document.createElement('div');   // 결과창
feedback.style = 'text-align:center;';
body.append(feedback);

// 지금은 중복되지 않는 숫자 조합을 뽑음. 중복 가능하게 바꿔도 될듯.
let pool = [1, 2, 3, 4, 5, 6, 7, 8 , 9]; // 숫자후보
let arr = []; // 숫자배열
for (let i = 0; i < 3; i++) {
    let temp = pool.splice(Math.floor(Math.random() * (9 - i)), 1)[0]; // 뽑은것
    arr.push(temp);
}

let cnt = 0;

baseForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let answer = `${inputBox1.value}${inputBox2.value}${inputBox3.value}`;
    console.log(answer);

    if (answer == arr.join()) { // 정답을 맞춰도 여기 진입하지 않는 문제가 있음
        feedback.textContent = '정답';
        inputBox1.value = '';
        inputBox2.value = '';
        inputBox3.value = '';
        inputBox1.focus();
        pool = [1, 2, 3, 4, 5, 6, 7, 8 , 9]; // 숫자후보
        arr = []; // 숫자배열
        for (let i = 0; i < 3; i++) {
            let temp = arr.splice(Math.floor(Math.random() * (9 - i)), 1)[0] // 뽑은것
            arr.push(temp);
        }

        cnt = 0;
    } else {
        let ansArr = answer.split(''); // 답배열. inputBox에 들어온 답을 배열로
        console.log(ansArr);
        let strike = 0;
        let ball = 0;
        cnt++;
        if (cnt > 4) {
            feedback.textContent = `The answer is ${arr}`;
            inputBox1.value = '';
            inputBox2.value = '';
            inputBox3.value = '';
            inputBox1.focus();
            pool = [1, 2, 3, 4, 5, 6, 7, 8 , 9]; // 숫자후보
            arr = []; // 숫자배열
            for (let i = 0; i < 3; i++) {
                let temp = arr.splice(Math.floor(Math.random() * (9 - i)), 1)[0] // 뽑은것
                arr.push(temp);
            }

            cnt = 0;
        } else {
            for (let i = 0; i < 3; i++) {
                if (ansArr[i] === Number(arr[i])) {
                    strike++;
                } else {
                    if (arr.indexOf(Number(ansArr[i])) > -1) {
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
        }
    }
});