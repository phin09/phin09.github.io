'use strict';

const body = document.querySelector("body > div > main");
const CENTER_CLASS = 'alignCenter';
const INPUT_CLASS = 'inputBox';

let baseWord = document.createElement('div'),   // 설명
    baseForm = document.createElement('form'),  // 폼
    feedback = document.createElement('div'),   // 결과
    history = document.createElement('div');   // 기록
baseWord.innerHTML = '<i class="fas fa-lock"></i> 3-digit password';

let bodyArr = [baseWord, baseForm, feedback, history];
for (let i = 0; i < 4; i++) {
    bodyArr[i].classList.add(CENTER_CLASS);
    body.append(bodyArr[i]);
}

let inputBox1 = document.createElement('input'),    // 입력창1
    inputBox2 = document.createElement('input'),    // 입력창2
    inputBox3 = document.createElement('input');    // 입력창3
    
let inputBoxArr = [inputBox1, inputBox2, inputBox3];
for (let i = 0; i < 3; i++) {
    inputBoxArr[i].setAttribute('type', 'text');
    inputBoxArr[i].setAttribute('maxLength', '1');
    inputBoxArr[i].classList.add(INPUT_CLASS);
    baseForm.append(inputBoxArr[i]);
}

let btn = document.createElement('button'); // 버튼
btn.innerHTML = '<i class="fas fa-key"></i>';
baseForm.append(btn);

function clearForm() {
    history.textContent = '';
    inputBox1.value = '';
    inputBox2.value = '';
    inputBox3.value = '';
    inputBox1.focus();
}

function setNum() {
    let arr = []; // 정답 배열
    for (let i = 0; i < 3; i++) {
        let temp = String(Math.floor(Math.random() * 10)); // 뽑은 것(중복 가능)
        arr.push(temp);
    }
    return arr;
}
let arr = setNum(); // 문제 initialize
console.log(`The answer is ${arr}`);

let cnt = 0;    // 도전 횟수 cnt

baseForm.addEventListener('submit', function (e) {
    e.preventDefault();

    let inputArr = [inputBox1.value, inputBox2.value, inputBox3.value]
    let strike = 0,
        ball = 0;
    
    for (let i = 0; i < 3; i++) {
        if (inputArr[i] === arr[i]) {
            strike++;
        } else {
            if (arr.indexOf(inputArr[i]) > -1) {
            ball++;
            }
        }
    }
    
    if (cnt > 5) {  // 도전 횟수 초과
            feedback.textContent = `The answer is ${arr}`;
            clearForm();
            arr = setNum(); // 문제 refresh
            cnt = 0;    // 도전 횟수 refresh
            console.log(`The answer is ${arr}`);
    } else {
        if (strike === 3) { // 정답
            feedback.innerHTML = 'Congratulations<br>You can start a new game now';
            clearForm();
            arr = setNum(); // 문제 refresh
            cnt = 0;    // 도전 횟수 refresh
            console.log(`The answer is ${arr}`);
        } else {    // 실패
            cnt++;
            feedback.textContent = strike + '/' + ball;
            history.innerHTML += `${inputArr} => ${strike}/${ball}<br>`;  // 이전 기록에 지금 결과를 이어붙임
            clearForm();
        }
    }
});
