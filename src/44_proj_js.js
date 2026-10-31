/* =====================================================================
   PROJECTS · JavaScript ("js") — the HTML and CSS are given in `base`,
   every step adds behaviour with JavaScript.
   ===================================================================== */
(()=>{
const {H,C,J,W_HTML,W_CSS,W_JS,nonDefaultFont,labelLinked,anyHover,hasMedia,grad,transOn,clickThen,noErrors}=PK;

/* ---- helpers for "change your code" steps ---- */
const I=s=>'  '+s.replace(/\n/g,'\n  ');                       /* how a snippet looks once it sits inside <script> */
const swap=pairs=>c=>{let o=c;for(const[f,t]of pairs){if(!o.includes(f))return c;o=o.replace(f,()=>t);}return o;};
const blk=(from,to)=>[I(from),I(to)];                            /* replace a whole block */
const below=(anchor,lines)=>[anchor,anchor+'\n  '+lines.replace(/\n/g,'\n  ')]; /* add top-level lines under a line */
const X=(id,title,pairs,o)=>J(id,title,Object.assign({kind:'edit',apply:swap(pairs)},o));
const P=o=>{const n=o.steps.length,h=Math.ceil(n/2);o.steps.forEach((s,i)=>{s.ch=i<h?'Part 1: Make it work':'Part 2: Make it awesome';});return Object.assign({cat:'js'},o);};

/* ---- helpers for checks ---- */
const T=(a,s)=>a.text(typeof s==='string'?a.$(s):s);
const clicks=(a,s,n)=>{for(let i=0;i<n;i++)a.click(s);};
const val=(a,s)=>{const e=a.$(s);return e?String(e.value):'';};
/* makes the page's timers run 50× faster, so a 1-second tick happens every 20ms */
const fast=a=>{const w=a.win,r=w.setInterval.bind(w);w.setInterval=(f,ms,...x)=>r(f,Math.max(10,(+ms||0)/50),...x);};

/* ---- shared cheerful button look ---- */
const BTN=`button {
    font: inherit;
    border: none;
    border-radius: 999px;
    padding: 10px 18px;
    margin: 4px;
    cursor: pointer;
    background: white;
    color: #333;
    box-shadow: 0 3px 0 rgba(0, 0, 0, 0.12);
  }
  button:active { transform: translateY(2px); box-shadow: none; }
  button:disabled { opacity: 0.45; cursor: not-allowed; }`;

/* =================================================================== 1. LIGHT SWITCH */
const L2=`const room = document.querySelector('#room');
const switchButton = document.querySelector('#switch');

switchButton.addEventListener('click', function () {
  room.classList.toggle('on');
});`;

/* =================================================================== 2. DICE */
const D_F1=`function rollDie() {
  const number = Math.floor(Math.random() * 6) + 1;
  die.textContent = number;
}`;
const D_F2=`function rollDie() {
  const number = Math.floor(Math.random() * 6) + 1;
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  die.textContent = faces[number - 1];
}`;
const D_F3=`function rollDie() {
  const number = Math.floor(Math.random() * 6) + 1;
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  die.textContent = faces[number - 1];
  if (number === 6) {
    message.textContent = 'SIX! Lucky roll! 🎉';
  } else {
    message.textContent = 'You rolled a ' + number;
  }
}`;
const D_F4=`function rollDie() {
  const number = Math.floor(Math.random() * 6) + 1;
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  die.textContent = faces[number - 1];
  if (number === 6) {
    message.textContent = 'SIX! Lucky roll! 🎉';
  } else {
    message.textContent = 'You rolled a ' + number;
  }
  total = total + number;
  totalText.textContent = total;
}`;
const D_F5=`function rollDie() {
  const number = Math.floor(Math.random() * 6) + 1;
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  die.textContent = faces[number - 1];
  if (number === 6) {
    message.textContent = 'SIX! Lucky roll! 🎉';
  } else {
    message.textContent = 'You rolled a ' + number;
  }
  total = total + number;
  totalText.textContent = total;
  const item = document.createElement('li');
  item.textContent = faces[number - 1];
  historyList.prepend(item);
}`;
const D_F6=`function rollDie() {
  const number = Math.floor(Math.random() * 6) + 1;
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  die.textContent = faces[number - 1];
  if (number === 6) {
    message.textContent = 'SIX! Lucky roll! 🎉';
  } else {
    message.textContent = 'You rolled a ' + number;
  }
  total = total + number;
  totalText.textContent = total;
  const item = document.createElement('li');
  item.textContent = faces[number - 1];
  historyList.prepend(item);
  if (historyList.children.length > 5) {
    historyList.lastElementChild.remove();
  }
}`;
const D_F7=`function rollDie() {
  const number = Math.floor(Math.random() * 6) + 1;
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  die.textContent = faces[number - 1];
  if (number === 6) {
    message.textContent = 'SIX! Lucky roll! 🎉';
  } else {
    message.textContent = 'You rolled a ' + number;
  }
  total = total + number;
  totalText.textContent = total;
  const item = document.createElement('li');
  item.textContent = faces[number - 1];
  historyList.prepend(item);
  if (historyList.children.length > 5) {
    historyList.lastElementChild.remove();
  }
  die.classList.add('shake');
  setTimeout(function () {
    die.classList.remove('shake');
  }, 400);
}`;
const FACES=['⚀','⚁','⚂','⚃','⚄','⚅'];
const faceNo=a=>FACES.indexOf(a.$('#die')?a.$('#die').textContent.trim():'')+1;

/* =================================================================== 3. TIP */
const TP_F1=`function calculate() {
  const bill = Number(billInput.value);
  totalText.textContent = bill;
}`;
const TP_F2=`function calculate() {
  const bill = Number(billInput.value);
  const tip = bill * Number(tipInput.value) / 100;
  tipText.textContent = tip;
  totalText.textContent = bill + tip;
}`;
const TP_F3=`function calculate() {
  const bill = Number(billInput.value);
  const tip = bill * Number(tipInput.value) / 100;
  tipText.textContent = tip.toFixed(2);
  totalText.textContent = (bill + tip).toFixed(2);
}`;
const TP_F6=`function calculate() {
  const bill = Number(billInput.value);
  const tip = bill * Number(tipInput.value) / 100;
  let people = Number(peopleInput.value);
  if (people < 1) {
    people = 1;
  }
  tipText.textContent = tip.toFixed(2);
  totalText.textContent = (bill + tip).toFixed(2);
  eachText.textContent = ((bill + tip) / people).toFixed(2);
}`;
const TP_F8=`function calculate() {
  const bill = Number(billInput.value);
  const tip = bill * Number(tipInput.value) / 100;
  let people = Number(peopleInput.value);
  if (people < 1) {
    people = 1;
  }
  tipText.textContent = tip.toFixed(2);
  totalText.textContent = (bill + tip).toFixed(2);
  eachText.textContent = ((bill + tip) / people).toFixed(2);
  if (Number(tipInput.value) >= 20) {
    note.textContent = 'Super generous! 🌟';
  } else {
    note.textContent = '';
  }
}`;

/* =================================================================== 4. TO-DO */
const TD_F1=`function addTask() {
  const item = document.createElement('li');
  item.textContent = taskInput.value;
  list.append(item);
}`;
const TD_F2=`function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    return;
  }
  const item = document.createElement('li');
  item.textContent = text;
  list.append(item);
  taskInput.value = '';
}`;
const TD_U1=`function updateCount() {
  const left = list.querySelectorAll('li:not(.done)').length;
  leftText.textContent = left + ' things to do';
}`;
const TD_F3=`function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    return;
  }
  const item = document.createElement('li');
  item.textContent = text;
  list.append(item);
  taskInput.value = '';
  updateCount();
}`;
const TD_F5=`function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    return;
  }
  const item = document.createElement('li');
  item.textContent = text;
  item.addEventListener('click', function () {
    item.classList.toggle('done');
    updateCount();
  });
  list.append(item);
  taskInput.value = '';
  updateCount();
}`;
const TD_F6=`function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    return;
  }
  const item = document.createElement('li');
  item.textContent = text;
  item.addEventListener('click', function () {
    item.classList.toggle('done');
    updateCount();
  });
  const deleteButton = document.createElement('button');
  deleteButton.textContent = '✖';
  deleteButton.className = 'delete';
  deleteButton.addEventListener('click', function () {
    item.remove();
    updateCount();
  });
  item.append(deleteButton);
  list.append(item);
  taskInput.value = '';
  updateCount();
}`;
const TD_U2=`function updateCount() {
  const left = list.querySelectorAll('li:not(.done)').length;
  if (list.children.length > 0 && left === 0) {
    leftText.textContent = 'All done! 🎉';
  } else if (left === 1) {
    leftText.textContent = '1 thing to do';
  } else {
    leftText.textContent = left + ' things to do';
  }
}`;
const addT=(a,t)=>{a.type('#newTask',t);a.click('#add');};

/* =================================================================== 5. QUIZ */
const QZ_S1=`function showQuestion() {
  const q = questions[current];
  questionText.textContent = q.question;
  progressText.textContent = 'Question ' + (current + 1) + ' of ' + questions.length;
}`;
const QZ_S2=`function showQuestion() {
  const q = questions[current];
  questionText.textContent = q.question;
  progressText.textContent = 'Question ' + (current + 1) + ' of ' + questions.length;
  answersBox.innerHTML = '';
  q.options.forEach(function (option) {
    const button = document.createElement('button');
    button.textContent = option;
    button.className = 'answer';
    answersBox.append(button);
  });
}`;
const QZ_S3=`function showQuestion() {
  const q = questions[current];
  questionText.textContent = q.question;
  progressText.textContent = 'Question ' + (current + 1) + ' of ' + questions.length;
  answersBox.innerHTML = '';
  q.options.forEach(function (option) {
    const button = document.createElement('button');
    button.textContent = option;
    button.className = 'answer';
    button.addEventListener('click', function () {
      checkAnswer(button, option);
    });
    answersBox.append(button);
  });
}`;
const QZ_C1=`function checkAnswer(button, option) {
  const q = questions[current];
  if (option === q.answer) {
    button.classList.add('right');
    feedback.textContent = 'Correct! 🎉';
  } else {
    button.classList.add('wrong');
    feedback.textContent = 'Oops! It was ' + q.answer;
  }
}`;
const QZ_C2=`function checkAnswer(button, option) {
  const q = questions[current];
  if (option === q.answer) {
    button.classList.add('right');
    feedback.textContent = 'Correct! 🎉';
    score = score + 1;
    scoreText.textContent = score;
  } else {
    button.classList.add('wrong');
    feedback.textContent = 'Oops! It was ' + q.answer;
  }
}`;
const QZ_C3=`function checkAnswer(button, option) {
  const q = questions[current];
  if (option === q.answer) {
    button.classList.add('right');
    feedback.textContent = 'Correct! 🎉';
    score = score + 1;
    scoreText.textContent = score;
  } else {
    button.classList.add('wrong');
    feedback.textContent = 'Oops! It was ' + q.answer;
  }
  answersBox.querySelectorAll('button').forEach(function (b) {
    b.disabled = true;
  });
}`;
const QZ_N1=`nextButton.addEventListener('click', function () {
  current = current + 1;
  feedback.textContent = '';
  showQuestion();
});`;
const QZ_N2=`nextButton.addEventListener('click', function () {
  current = current + 1;
  feedback.textContent = '';
  if (current === questions.length) {
    showResult();
  } else {
    showQuestion();
  }
});`;
const QZ_R=`function showResult() {
  questionText.textContent = 'Quiz finished! 🏁';
  progressText.textContent = '';
  answersBox.innerHTML = '';
  feedback.textContent = 'You got ' + score + ' out of ' + questions.length + '!';
  nextButton.textContent = 'Play again';
}`;
const QZ_N3=`nextButton.addEventListener('click', function () {
  if (current >= questions.length) {
    current = 0;
    score = 0;
    scoreText.textContent = score;
    nextButton.textContent = 'Next ➜';
    showQuestion();
    return;
  }
  current = current + 1;
  feedback.textContent = '';
  if (current === questions.length) {
    showResult();
  } else {
    showQuestion();
  }
});`;
const ans=(a,t)=>{const b=a.$$('.answer').find(x=>a.text(x)===t);if(!b)return false;b.click();return true;};
const playAll=a=>{for(const t of ['cow','8','blue whale','honey']){if(!ans(a,t))return false;a.click('#next');}return true;};

/* =================================================================== 6. STOPWATCH */
const SW_T1=`function tick() {
  seconds = seconds + 1;
  display.textContent = seconds;
}`;
const SW_S1=`startButton.addEventListener('click', function () {
  timer = setInterval(tick, 1000);
});`;
const SW_S2=`startButton.addEventListener('click', function () {
  if (timer !== null) {
    return;
  }
  timer = setInterval(tick, 1000);
});`;
const SW_FT=`function formatTime(total) {
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  return String(minutes).padStart(2, '0') + ':' + String(secs).padStart(2, '0');
}`;
const SW_T2=`function tick() {
  seconds = seconds + 1;
  display.textContent = formatTime(seconds);
}`;

/* =================================================================== 7. FACTS */
const FACTS=[
 'An octopus has three hearts. 🐙',
 'Honey never goes bad. People found 3000-year-old honey that was still OK! 🍯',
 'A day on Venus is longer than a whole year on Venus. 🪐',
 'Bananas are berries, but strawberries are not! 🍌',
 'A group of flamingos is called a flamboyance. 🦩',
 'Butterflies taste food with their feet. 🦋',
 'Your nose can remember about 50,000 different smells. 👃',
 'Sea otters hold hands when they sleep so they don\'t drift apart. 🦦'];
const FC_F1=`function showFact() {
  factText.textContent = facts[0];
}`;
const FC_F2=`function showFact() {
  const index = Math.floor(Math.random() * facts.length);
  factText.textContent = facts[index];
}`;
const FC_F3=`function showFact() {
  let index = Math.floor(Math.random() * facts.length);
  while (index === lastIndex) {
    index = Math.floor(Math.random() * facts.length);
  }
  lastIndex = index;
  factText.textContent = facts[index];
}`;
const FC_V1=`const saveButton = document.querySelector('#save');
const favList = document.querySelector('#favs');

saveButton.addEventListener('click', function () {
  const item = document.createElement('li');
  item.textContent = factText.textContent;
  favList.append(item);
});`;
const FC_V2=`const saveButton = document.querySelector('#save');
const favList = document.querySelector('#favs');
const saved = [];

saveButton.addEventListener('click', function () {
  const fact = factText.textContent;
  if (lastIndex === -1 || saved.includes(fact)) {
    return;
  }
  saved.push(fact);
  const item = document.createElement('li');
  item.textContent = fact;
  favList.append(item);
});`;

/* =================================================================== 8. GUESS */
const GS_F1=`function checkGuess() {
  const guess = Number(guessInput.value);
  if (guess === secret) {
    message.textContent = '🎉 You got it! It was ' + secret + '!';
  } else {
    message.textContent = 'Nope! Try again.';
  }
}`;
const GS_F2=`function checkGuess() {
  const guess = Number(guessInput.value);
  if (guess === secret) {
    message.textContent = '🎉 You got it! It was ' + secret + '!';
  } else if (guess > secret) {
    message.textContent = '📉 Too high! Try a smaller number.';
  } else {
    message.textContent = '📈 Too low! Try a bigger number.';
  }
}`;
const GS_F3=`function checkGuess() {
  const guess = Number(guessInput.value);
  attempts = attempts + 1;
  attemptsText.textContent = 'Guesses: ' + attempts;
  if (guess === secret) {
    message.textContent = '🎉 You got it! It was ' + secret + '!';
  } else if (guess > secret) {
    message.textContent = '📉 Too high! Try a smaller number.';
  } else {
    message.textContent = '📈 Too low! Try a bigger number.';
  }
}`;
const GS_F4=`function checkGuess() {
  const guess = Number(guessInput.value);
  attempts = attempts + 1;
  attemptsText.textContent = 'Guesses: ' + attempts;
  pastGuesses.push(guess);
  pastText.textContent = 'Your guesses: ' + pastGuesses.join(', ');
  if (guess === secret) {
    message.textContent = '🎉 You got it! It was ' + secret + '!';
  } else if (guess > secret) {
    message.textContent = '📉 Too high! Try a smaller number.';
  } else {
    message.textContent = '📈 Too low! Try a bigger number.';
  }
}`;
const GS_F5=`function checkGuess() {
  const guess = Number(guessInput.value);
  if (guessInput.value === '' || guess < 1 || guess > 100) {
    message.textContent = '⚠️ Pick a number from 1 to 100!';
    return;
  }
  attempts = attempts + 1;
  attemptsText.textContent = 'Guesses: ' + attempts;
  pastGuesses.push(guess);
  pastText.textContent = 'Your guesses: ' + pastGuesses.join(', ');
  if (guess === secret) {
    message.textContent = '🎉 You got it! It was ' + secret + '!';
  } else if (guess > secret) {
    message.textContent = '📉 Too high! Try a smaller number.';
  } else {
    message.textContent = '📈 Too low! Try a bigger number.';
  }
}`;
const GS_F6=`function checkGuess() {
  const guess = Number(guessInput.value);
  if (guessInput.value === '' || guess < 1 || guess > 100) {
    message.textContent = '⚠️ Pick a number from 1 to 100!';
    return;
  }
  attempts = attempts + 1;
  attemptsText.textContent = 'Guesses: ' + attempts;
  pastGuesses.push(guess);
  pastText.textContent = 'Your guesses: ' + pastGuesses.join(', ');
  if (guess === secret) {
    message.textContent = '🎉 You got it! It was ' + secret + '!';
  } else if (guess > secret) {
    message.textContent = '📉 Too high! Try a smaller number.';
  } else {
    message.textContent = '📈 Too low! Try a bigger number.';
  }
  if (guess !== secret && Math.abs(guess - secret) <= 5) {
    message.textContent = message.textContent + ' 🔥 So close!';
  }
}`;
const GS_F7=`function checkGuess() {
  const guess = Number(guessInput.value);
  if (guessInput.value === '' || guess < 1 || guess > 100) {
    message.textContent = '⚠️ Pick a number from 1 to 100!';
    return;
  }
  attempts = attempts + 1;
  attemptsText.textContent = 'Guesses: ' + attempts;
  pastGuesses.push(guess);
  pastText.textContent = 'Your guesses: ' + pastGuesses.join(', ');
  if (guess === secret) {
    message.textContent = '🎉 You got it! It was ' + secret + '!';
    againButton.classList.remove('hidden');
    checkButton.disabled = true;
  } else if (guess > secret) {
    message.textContent = '📉 Too high! Try a smaller number.';
  } else {
    message.textContent = '📈 Too low! Try a bigger number.';
  }
  if (guess !== secret && Math.abs(guess - secret) <= 5) {
    message.textContent = message.textContent + ' 🔥 So close!';
  }
}`;
const gu=(a,n)=>{a.type('#guess',String(n));a.click('#check');return T(a,'#message');};
/* plays like a clever player: halve the range each time using the "too high / too low" words */
const solve=a=>{let lo=1,hi=100;for(let i=0;i<9;i++){const m=Math.floor((lo+hi)/2),t=gu(a,m);if(t.includes('got it'))return true;if(t.includes('too high'))hi=m-1;else if(t.includes('too low'))lo=m+1;else return false;}return false;};

/* =================================================================== 9. CHARACTER COUNTER */
const CC_U1=`function update() {
  const length = messageBox.value.length;
  countText.textContent = length + ' / ' + LIMIT;
}`;
const CC_U2=`function update() {
  const length = messageBox.value.length;
  countText.textContent = length + ' / ' + LIMIT;
  const left = LIMIT - length;
  leftText.textContent = left + ' characters left';
}`;
const CC_U3=`function update() {
  const length = messageBox.value.length;
  countText.textContent = length + ' / ' + LIMIT;
  const left = LIMIT - length;
  leftText.textContent = left + ' characters left';
  countText.classList.toggle('warning', left < 20);
}`;
const CC_U4=`function update() {
  const length = messageBox.value.length;
  countText.textContent = length + ' / ' + LIMIT;
  const left = LIMIT - length;
  leftText.textContent = left + ' characters left';
  countText.classList.toggle('warning', left < 20);
  countText.classList.toggle('over', left < 0);
  postButton.disabled = left < 0;
}`;
const CC_U5=`function update() {
  const length = messageBox.value.length;
  countText.textContent = length + ' / ' + LIMIT;
  const left = LIMIT - length;
  leftText.textContent = left + ' characters left';
  countText.classList.toggle('warning', left < 20);
  countText.classList.toggle('over', left < 0);
  postButton.disabled = left < 0;
  const percent = Math.min(length / LIMIT * 100, 100);
  fill.style.width = percent + '%';
}`;
const CC_U6=`function update() {
  const length = messageBox.value.length;
  countText.textContent = length + ' / ' + LIMIT;
  const left = LIMIT - length;
  leftText.textContent = left + ' characters left';
  countText.classList.toggle('warning', left < 20);
  countText.classList.toggle('over', left < 0);
  postButton.disabled = left < 0;
  const percent = Math.min(length / LIMIT * 100, 100);
  fill.style.width = percent + '%';
  const words = messageBox.value.split(' ').filter(function (word) {
    return word !== '';
  });
  wordsText.textContent = words.length + ' words';
}`;
const CC_P1=`postButton.addEventListener('click', function () {
  const note = document.createElement('div');
  note.className = 'note';
  note.textContent = messageBox.value;
  board.prepend(note);
  messageBox.value = '';
  update();
});`;
const CC_P2=`postButton.addEventListener('click', function () {
  if (messageBox.value.trim() === '') {
    return;
  }
  const note = document.createElement('div');
  note.className = 'note';
  note.textContent = messageBox.value;
  board.prepend(note);
  messageBox.value = '';
  update();
});`;
const CC_A='const countText = document.querySelector(\'#count\');';

/* =================================================================== 10. TEMPERATURE */
const TC_ROUND=`function round(number) {
  return Math.round(number * 10) / 10;
}`;

/* =================================================================== 11. SLIDESHOW */
const SL=[['🌅','Sunrise over the sea'],['🏔️','Snowy mountains'],['🌵','A sunny desert'],['🌋','A smoky volcano'],['🏝️','A tiny island'],['🌌','Stars at night']];
const SL_S1=`function showSlide() {
  emojiBox.textContent = slides[index].emoji;
  captionText.textContent = slides[index].caption;
}`;
const SL_S2=`function showSlide() {
  emojiBox.textContent = slides[index].emoji;
  captionText.textContent = slides[index].caption;
  numberText.textContent = (index + 1) + ' / ' + slides.length;
}`;
const SL_S3=`function showSlide() {
  emojiBox.textContent = slides[index].emoji;
  captionText.textContent = slides[index].caption;
  numberText.textContent = (index + 1) + ' / ' + slides.length;
  document.querySelectorAll('.dot').forEach(function (dot, i) {
    dot.classList.toggle('active', i === index);
  });
}`;
const SL_N1=`function nextSlide() {
  index = index + 1;
  showSlide();
}`;
const SL_N2=`function nextSlide() {
  index = (index + 1) % slides.length;
  showSlide();
}`;

/* =================================================================== 12. COLOUR MIXER */
const MX_1=`function mix() {
  const r = redSlider.value;
  const g = greenSlider.value;
  const b = blueSlider.value;
  const colour = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  swatch.style.backgroundColor = colour;
}`;
const MX_2=`function mix() {
  const r = redSlider.value;
  const g = greenSlider.value;
  const b = blueSlider.value;
  const colour = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  swatch.style.backgroundColor = colour;
  codeText.textContent = colour;
}`;
const MX_3=`function mix() {
  const r = redSlider.value;
  const g = greenSlider.value;
  const b = blueSlider.value;
  const colour = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  swatch.style.backgroundColor = colour;
  codeText.textContent = colour;
  redValue.textContent = r;
  greenValue.textContent = g;
  blueValue.textContent = b;
}`;
const MX_4=`function mix() {
  const r = redSlider.value;
  const g = greenSlider.value;
  const b = blueSlider.value;
  const colour = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  swatch.style.backgroundColor = colour;
  codeText.textContent = colour;
  redValue.textContent = r;
  greenValue.textContent = g;
  blueValue.textContent = b;
  const hex = '#' + toHex(r) + toHex(g) + toHex(b);
  hexText.textContent = hex;
}`;
const MX_5=`function mix() {
  const r = redSlider.value;
  const g = greenSlider.value;
  const b = blueSlider.value;
  const colour = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  swatch.style.backgroundColor = colour;
  codeText.textContent = colour;
  redValue.textContent = r;
  greenValue.textContent = g;
  blueValue.textContent = b;
  const hex = '#' + toHex(r) + toHex(g) + toHex(b);
  hexText.textContent = hex;
  const brightness = (Number(r) + Number(g) + Number(b)) / 3;
  if (brightness < 128) {
    swatch.style.color = 'white';
  } else {
    swatch.style.color = '#222';
  }
}`;
const MX_6=`function mix() {
  const r = redSlider.value;
  const g = greenSlider.value;
  const b = blueSlider.value;
  const colour = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  swatch.style.backgroundColor = colour;
  codeText.textContent = colour;
  redValue.textContent = r;
  greenValue.textContent = g;
  blueValue.textContent = b;
  const hex = '#' + toHex(r) + toHex(g) + toHex(b);
  hexText.textContent = hex;
  const brightness = (Number(r) + Number(g) + Number(b)) / 3;
  if (brightness < 128) {
    swatch.style.color = 'white';
  } else {
    swatch.style.color = '#222';
  }
  cssLine.value = 'background-color: ' + hex + ';';
}`;
const MX_A="const swatch = document.querySelector('#swatch');";
const bg=(a,s)=>a.css(a.$(s),'backgroundColor');

PK.PROJECTS.push(
/* ------------------------------------------------------------------ 1 */
P({id:'pj_light',emoji:'💡',title:'Light Switch Room',mentor:'Luna, a sleepy night owl',
 blurb:'A dark room with a magic switch: flip the light, change its colour, throw a party.',
 intro:"Luna the owl lives in a dark little room. Help her! You'll write JavaScript that flips the light on and off, changes the words and the lamp, counts every flip, listens to the keyboard, and even starts a disco party. The page is already built — your job is to make it **work**.",
 base:`<div class="room" id="room">
  <div class="lamp" id="lamp">🌙</div>
  <h1 id="status">The light is OFF</h1>
  <button id="switch">Flip the switch</button>
  <p class="count">Flips: <span id="flips">0</span></p>
  <p class="hint">Tip: you can also press the <b>L</b> key</p>
  <div class="colors">
    <button class="color" data-color="#fff3b0">☀️ Sunny</button>
    <button class="color" data-color="#ffd6e8">🌸 Pink</button>
    <button class="color" data-color="#d6f5ff">🌊 Sky</button>
  </div>
  <button id="party">🎉 Party mode</button>
</div>

<style>
  body {
    margin: 0;
    font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;
  }
  .room {
    min-height: 100vh;
    box-sizing: border-box;
    padding: 24px 16px;
    text-align: center;
    background: #c9cfdc;
    color: #3a4150;
  }
  .room.on {
    background: var(--glow, #fff7c2);
    color: #5a4300;
  }
  .lamp { font-size: 72px; }
  h1 { margin: 6px 0 16px; }
  ${BTN}
  #switch { background: #ffd43b; font-size: 20px; font-weight: bold; }
  .hint { font-size: 14px; opacity: 0.7; }
  .room.party { animation: party 1.2s linear infinite; }
  @keyframes party {
    0% { background: #ffd6e8; }
    33% { background: #d6f5ff; }
    66% { background: #e3ffd6; }
    100% { background: #ffd6e8; }
  }
</style>

<script>
</script>`,
 steps:[
 J('l1','Talk to the page',{why:"Hoo! Before we touch the light, let's see JavaScript change something on the page.",
  learn:"`document.querySelector('#status')` is like a **finger that points** at one thing on the page. Here it points at the thing with `id=\"status\"`.\n`.textContent = '...'` swaps the words inside it — like rubbing out a sign and writing a new one.",
  todo:"Point at `#status` and change its words to **Welcome! Find the switch.**",
  job:"Change the big heading's words to **Welcome! Find the switch.** Use `document.querySelector('#status')` and `.textContent`.",
  snippet:`const statusText = document.querySelector('#status');
statusText.textContent = 'Welcome! Find the switch.';`,
  hints:["First line: `const statusText = document.querySelector('#status');` — that saves the heading in a box called `statusText`.","Second line: `statusText.textContent = 'Welcome! Find the switch.';`"],
  tip:"`const` makes a labelled box that holds something. You picked the label — `statusText`.",
  checks:[hasText('#status','welcome',"Change `#status` to say **Welcome! Find the switch.** using `.textContent`.")]}),
 J('l2','Flip the switch',{why:"The big moment: make the switch turn the light on!",
  learn:"`addEventListener('click', function () { ... })` is like a **doorbell**. The code inside the `{ }` waits quietly, and runs every time someone clicks.\n`room.classList.toggle('on')` is a **light switch for a class**: no `on` class → add it. Already has it → take it away. The CSS already knows that `.room.on` is bright yellow.",
  todo:"Point at `#room` and `#switch`. When the switch is clicked, `toggle` the class `on` on the room.",
  job:"When someone clicks `#switch`, toggle the class `on` on `#room`. Use `room.classList.toggle('on')`.",
  snippet:L2,
  hints:["Save both: `const room = document.querySelector('#room');` and `const switchButton = document.querySelector('#switch');`","Then: `switchButton.addEventListener('click', function () { room.classList.toggle('on'); });`"],
  tip:"Click the switch in the preview again and again. On, off, on, off!",
  checks:[clickThen('#switch',a=>a.$('#room').classList.contains('on'),"Clicking `#switch` should add the class `on` to `#room`. Use `room.classList.toggle('on')`."),
   clickThen('#switch',a=>!a.$('#room').classList.contains('on'),"Clicking `#switch` again should take `on` away. Use `toggle`, not `add`.")]}),
 J('l3','Say ON or OFF',{why:"The heading still says 'Welcome'. It should tell Luna if the light is on or off.",
  learn:"`if (...) { } else { }` is a **fork in the road**. If the question is true, go left. If not, go right.\n`room.classList.contains('on')` asks: \"Does the room have the `on` class right now?\" — it answers `true` or `false`.",
  todo:"Add a second click listener on the switch. If the room `contains('on')`, show **The light is ON**, else show **The light is OFF**.",
  job:"When the switch is clicked, make `#status` say **The light is ON** or **The light is OFF**. Use `if` and `classList.contains('on')`.",
  snippet:`switchButton.addEventListener('click', function () {
  if (room.classList.contains('on')) {
    statusText.textContent = 'The light is ON';
  } else {
    statusText.textContent = 'The light is OFF';
  }
});`,
  hints:["You can add MORE than one listener to the same button. They run in order — first the toggle, then this one.","Inside: `if (room.classList.contains('on')) { statusText.textContent = 'The light is ON'; } else { statusText.textContent = 'The light is OFF'; }`"],
  tip:"A button can have many listeners — like two friends both waiting for the same doorbell.",
  checks:[clickThen('#switch',a=>T(a,'#status').includes('the light is on'),"After one click, `#status` should say **The light is ON**."),
   clickThen('#switch',a=>T(a,'#status').includes('the light is off'),"After a second click, `#status` should say **The light is OFF**. Did you add the `else` part?")]}),
 J('l4','Change the lamp',{why:"A moon in a bright room? Silly! Show a light bulb when it's on.",
  learn:"The `? :` is a **quick question**: `question ? yes : no`.\n`room.classList.contains('on') ? '💡' : '🌙'` means \"Is it on? Then 💡. If not, 🌙.\"",
  todo:"Point at `#lamp`. On every click, set its `textContent` to `'💡'` when the room is on, or `'🌙'` when it's off.",
  job:"When the switch is clicked, make `#lamp` show 💡 if the light is on, and 🌙 if it is off.",
  snippet:`const lamp = document.querySelector('#lamp');

switchButton.addEventListener('click', function () {
  lamp.textContent = room.classList.contains('on') ? '💡' : '🌙';
});`,
  hints:["`const lamp = document.querySelector('#lamp');`","`lamp.textContent = room.classList.contains('on') ? '💡' : '🌙';` inside a new click listener."],
  tip:"Emoji are just text! You can put them anywhere text goes.",
  checks:[clickThen('#switch',a=>a.$('#lamp').textContent.includes('💡'),"After one click, `#lamp` should show 💡."),
   clickThen('#switch',a=>a.$('#lamp').textContent.includes('🌙'),"After a second click, `#lamp` should show 🌙 again.")]}),
 J('l5','Count the flips',{why:"Luna wants to know how many times she has flipped the switch tonight.",
  learn:"`let flips = 0;` makes a box that **can change** (with `const`, the box is glued shut).\n`flips = flips + 1;` means \"take what's in the box, add 1, put it back\" — like adding a marble to a jar.",
  todo:"Make `let flips = 0;`. On each click, add 1 and show it in `#flips`.",
  job:"Count every click on the switch. Make `let flips = 0;`, add 1 on each click, and show the number in `#flips`.",
  snippet:`let flips = 0;
const flipsText = document.querySelector('#flips');

switchButton.addEventListener('click', function () {
  flips = flips + 1;
  flipsText.textContent = flips;
});`,
  hints:["`let flips = 0;` and `const flipsText = document.querySelector('#flips');`","In a click listener: `flips = flips + 1;` then `flipsText.textContent = flips;`"],
  tip:"Pros often write `flips++` — it means the same as `flips = flips + 1`.",
  checks:[[a=>{clicks(a,'#switch',3);return T(a,'#flips')==='3';},"After 3 clicks, `#flips` should show **3**. Add 1 on every click and show it."]]}),
 J('l6','Keyboard switch',{why:"Owls are lazy at night. Luna wants to press the **L** key instead of clicking.",
  learn:"`document.addEventListener('keydown', ...)` listens to the **whole page** for key presses.\n`event.key` tells you WHICH key was pressed, like `'l'`.\n`switchButton.click()` pretends to click the button — so all its listeners run!",
  todo:"Listen for `keydown` on `document`. If `event.key` is `'l'` or `'L'`, call `switchButton.click()`.",
  job:"When someone presses the **L** key, flip the switch. Listen for `keydown` and call `switchButton.click()`.",
  snippet:`document.addEventListener('keydown', function (event) {
  if (event.key === 'l' || event.key === 'L') {
    switchButton.click();
  }
});`,
  hints:["`document.addEventListener('keydown', function (event) { ... });`","Inside: `if (event.key === 'l' || event.key === 'L') { switchButton.click(); }` — `||` means \"or\"."],
  tip:"Click inside the preview first, then press L. The page needs to be 'listening'.",
  checks:[[a=>{a.key('body','l');return a.$('#room').classList.contains('on');},"Pressing the **l** key should turn the light on. Check `event.key === 'l'`."],
   [a=>T(a,'#flips')==='1',"Pressing **l** should also count a flip. Use `switchButton.click()` so all the listeners run."]]}),
 J('l7','Pick a colour',{why:"Luna wants pink light on Mondays and sky-blue light on Fridays.",
  learn:"`querySelectorAll('.color')` grabs **all** the colour buttons — a whole bag of them.\n`.forEach(function (button) { ... })` takes them out of the bag **one at a time**.\n`button.dataset.color` reads the `data-color=\"...\"` written on each button in the HTML.\n`room.style.setProperty('--glow', ...)` changes the CSS variable that colours the light.",
  todo:"For each `.color` button, add a click listener that sets the room's `--glow` to `button.dataset.color`.",
  job:"Make the 3 colour buttons work. When one is clicked, run `room.style.setProperty('--glow', button.dataset.color)`.",
  snippet:`const colorButtons = document.querySelectorAll('.color');

colorButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    room.style.setProperty('--glow', button.dataset.color);
  });
});`,
  hints:["`const colorButtons = document.querySelectorAll('.color');` then `colorButtons.forEach(function (button) { ... });`","Inside the forEach: `button.addEventListener('click', function () { room.style.setProperty('--glow', button.dataset.color); });`"],
  tip:"Turn the light on first, then try each colour button!",
  checks:[[a=>{a.click('#switch');a.click('.color[data-color="#ffd6e8"]');return bg(a,'#room')==='rgb(255, 214, 232)';},"With the light on, clicking **🌸 Pink** should make the room pink. Set `--glow` to `button.dataset.color`."],
   [a=>{a.click('.color[data-color="#d6f5ff"]');return bg(a,'#room')==='rgb(214, 245, 255)';},"Clicking **🌊 Sky** should make the room sky blue. Add a listener to EVERY `.color` button with `forEach`."]]}),
 J('l8','Party mode',{why:"It's Luna's birthday! Time for a disco room.",
  learn:"You know everything you need! `toggle` the class `party`, then use `if` to change the button's words.",
  todo:"When `#party` is clicked, toggle the class `party` on the room. If the party is on, the button says **🛑 Stop the party**, else **🎉 Party mode**.",
  job:"When `#party` is clicked, toggle the class `party` on `#room`. Change the button to say **Stop the party** while the party is on.",
  snippet:`const partyButton = document.querySelector('#party');

partyButton.addEventListener('click', function () {
  room.classList.toggle('party');
  if (room.classList.contains('party')) {
    partyButton.textContent = '🛑 Stop the party';
  } else {
    partyButton.textContent = '🎉 Party mode';
  }
});`,
  hints:["`const partyButton = document.querySelector('#party');` then a click listener with `room.classList.toggle('party');`","Then `if (room.classList.contains('party')) { partyButton.textContent = '🛑 Stop the party'; } else { partyButton.textContent = '🎉 Party mode'; }`"],
  tip:"The rainbow is a CSS `@keyframes` animation. JavaScript just switches it on — teamwork!",
  checks:[clickThen('#party',a=>a.$('#room').classList.contains('party'),"Clicking `#party` should add the class `party` to `#room`."),
   [a=>T(a,'#party').includes('stop'),"While the party is on, the button should say **Stop the party**."],
   clickThen('#party',a=>!a.$('#room').classList.contains('party')&&T(a,'#party').includes('party mode'),"Clicking again should stop the party and the button should say **Party mode** again.")]})
 ]}),

/* ------------------------------------------------------------------ 2 */
P({id:'pj_dice',emoji:'🎲',title:'Dice Roller',mentor:'Captain Pip, board-game pirate',
 blurb:'Roll a real-looking die, keep a score and see your last five rolls.',
 intro:"Arr! Captain Pip lost his dice overboard. Build him a dice roller that picks a random number, shows a real dice face, cheers for sixes, adds up a total and remembers the last five rolls. You'll learn how computers pick random numbers!",
 base:`<div class="table">
  <h1>🎲 Dice Roller</h1>
  <div class="die" id="die">?</div>
  <p id="message">Press Roll to start!</p>
  <button id="roll">Roll!</button>
  <p class="total">Total: <b id="total">0</b></p>
  <h2>Last rolls</h2>
  <ul id="history"></ul>
  <button id="clear" class="small">Clear</button>
</div>

<style>
  body {
    margin: 0;
    padding: 20px 16px;
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;
    background: linear-gradient(160deg, #e6fcf5, #fff9db);
    color: #2b3a33;
    text-align: center;
  }
  .table {
    max-width: 380px;
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
  .die {
    width: 110px;
    height: 110px;
    margin: 0 auto;
    font-size: 84px;
    line-height: 110px;
    border-radius: 22px;
    background: #fff;
    border: 4px solid #63e6be;
    color: #087f5b;
  }
  .die.shake { animation: shake 0.4s; }
  @keyframes shake {
    25% { transform: rotate(-15deg); }
    75% { transform: rotate(15deg); }
  }
  ${BTN}
  #roll { background: #20c997; color: white; font-size: 22px; font-weight: bold; padding: 12px 34px; }
  .small { font-size: 14px; }
  #history { list-style: none; padding: 0; display: flex; justify-content: center; gap: 8px; min-height: 40px; }
  #history li { font-size: 34px; color: #087f5b; }
</style>

<script>
</script>`,
 steps:[
 J('d1','Pick a random number',{why:"Every dice game starts with one thing: a surprise number from 1 to 6.",
  learn:"`Math.random()` is a **magic bag** that gives a different decimal each time, like 0.37 or 0.82 — always between 0 and 1.\nTimes 6 → between 0 and 5.99. `Math.floor()` **chops off** the decimal → 0 to 5. Then `+ 1` → **1 to 6**. A real die!",
  todo:"Make a function `rollDie()` that picks a number from 1 to 6 and shows it in `#die`. Run it when `#roll` is clicked.",
  job:"When `#roll` is clicked, show a random number from **1** to **6** in `#die`. Use `Math.floor(Math.random() * 6) + 1`.",
  snippet:`const die = document.querySelector('#die');
const rollButton = document.querySelector('#roll');

${D_F1}

rollButton.addEventListener('click', rollDie);`,
  hints:["Point at `#die` and `#roll` with `document.querySelector`.","`function rollDie() { const number = Math.floor(Math.random() * 6) + 1; die.textContent = number; }`","Last line: `rollButton.addEventListener('click', rollDie);` — no `()` after `rollDie`! You give the button the recipe, not the cake."],
  tip:"Click Roll lots of times. Do you ever get 0 or 7? Never! The maths keeps it 1 to 6.",
  checks:[[a=>{const seen=new Set();for(let i=0;i<40;i++){a.click('#roll');const t=T(a,'#die');if(!/^[1-6]$/.test(t))return false;seen.add(t);}return seen.size>=3;},"Clicking `#roll` should show a random whole number from 1 to 6 in `#die`. Use `Math.floor(Math.random() * 6) + 1`."]]}),
 X('d2','Real dice faces',[blk(D_F1,D_F2)],{why:"Numbers are boring. Pirates want proper dice dots!",
  learn:"An **array** is a row of lockers: `['⚀', '⚁', '⚂', '⚃', '⚄', '⚅']`. Each locker has a number, but counting starts at **0**!\nSo `faces[0]` is ⚀ and `faces[5]` is ⚅. That's why we use `faces[number - 1]`.",
  todo:"Inside `rollDie`, make an array `faces` with the 6 dice faces ⚀ ⚁ ⚂ ⚃ ⚄ ⚅, and show `faces[number - 1]` instead of the number.",
  job:"Show a dice face instead of a number. Make `const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];` and show `faces[number - 1]`.",
  where:"Inside your `rollDie` function. Change the `die.textContent = number;` line — the new function looks like this.",
  snippet:D_F2,
  hints:["Add `const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];` inside the function.","Change the last line to `die.textContent = faces[number - 1];`"],
  tip:"Copy the dice faces from the instructions — they are special text characters, just like emoji.",
  checks:[[a=>{const seen=new Set();for(let i=0;i<30;i++){a.click('#roll');const n=faceNo(a);if(!n)return false;seen.add(n);}return seen.size>=2;},"`#die` should show a dice face like ⚂, not a number. Use `faces[number - 1]`."]]}),
 X('d3','Cheer for sixes',[below("const rollButton = document.querySelector('#roll');","const message = document.querySelector('#message');"),blk(D_F2,D_F3)],{why:"Rolling a six should feel AMAZING. Let's shout about it.",
  learn:"`===` asks \"are these **exactly the same**?\" — `number === 6` is true only for a six.\nOne `=` puts something in a box. Three `===` compares. Don't mix them up!",
  todo:"Point at `#message`. In `rollDie`, if `number === 6` show **SIX! Lucky roll! 🎉**, else show **You rolled a** and the number.",
  job:"After each roll, `#message` says **SIX! Lucky roll! 🎉** for a 6. For other numbers it says **You rolled a 3** (with the real number).",
  where:"Put the `message` line under your other `const` lines at the top. Then add the `if` at the end of `rollDie` (before its last `}`).",
  snippet:`const message = document.querySelector('#message');

${D_F3}`,
  hints:["Top: `const message = document.querySelector('#message');`","At the end of `rollDie`: `if (number === 6) { message.textContent = 'SIX! Lucky roll! 🎉'; } else { message.textContent = 'You rolled a ' + number; }`"],
  tip:"`'You rolled a ' + number` glues words and a number together. Notice the space before the closing quote!",
  checks:[[a=>{for(let i=0;i<30;i++){a.click('#roll');const n=faceNo(a),m=T(a,'#message');if(!n)return false;if(n===6?!m.includes('six'):!m.includes('you rolled a '+n))return false;}return true;},"`#message` should say **SIX! Lucky roll! 🎉** for a six, and **You rolled a** + the number for the others."]]}),
 X('d4','Keep a total',[below("const message = document.querySelector('#message');","let total = 0;\nconst totalText = document.querySelector('#total');"),blk(D_F3,D_F4)],{why:"In Pip's game, you add up all your rolls. First to 50 wins the treasure!",
  learn:"`let total = 0;` lives **outside** the function, so it remembers the score between rolls. A box inside the function would be emptied every roll!",
  todo:"Make `let total = 0;` at the top. In `rollDie`, add the number to `total` and show it in `#total`.",
  job:"Add up every roll. Make `let total = 0;`, then in `rollDie` do `total = total + number;` and show it in `#total`.",
  where:"The two new lines go at the top with your other `const` lines. The adding goes at the end of `rollDie`.",
  snippet:`let total = 0;
const totalText = document.querySelector('#total');

${D_F4}`,
  hints:["Top: `let total = 0;` and `const totalText = document.querySelector('#total');`","End of `rollDie`: `total = total + number;` and `totalText.textContent = total;`"],
  tip:"Use `let` for boxes that change (the total) and `const` for boxes that never change (the page parts).",
  checks:[[a=>{let sum=0;for(let i=0;i<10;i++){a.click('#roll');sum+=faceNo(a);}return T(a,'#total')===String(sum);},"`#total` should show all the rolls added together. Do `total = total + number;` in `rollDie`."]]}),
 X('d5','Roll history',[below("const totalText = document.querySelector('#total');","const historyList = document.querySelector('#history');"),blk(D_F4,D_F5)],{why:"Did I roll a six last time? Pip forgets. Let's show the past rolls.",
  learn:"`document.createElement('li')` **makes a brand-new** list item out of thin air — like printing a new sticker.\n`historyList.prepend(item)` sticks it at the **front** of the list (`append` would stick it at the end).",
  todo:"Point at `#history`. In `rollDie`, create an `li`, put the dice face in it, and `prepend` it to the list.",
  job:"After each roll, add a new `<li>` with the dice face to the front of `#history`. Use `document.createElement('li')` and `prepend`.",
  where:"The `historyList` line goes at the top. The three new lines go at the end of `rollDie`.",
  snippet:`const historyList = document.querySelector('#history');

${D_F5}`,
  hints:["Top: `const historyList = document.querySelector('#history');`","End of `rollDie`: `const item = document.createElement('li'); item.textContent = faces[number - 1]; historyList.prepend(item);`"],
  tip:"`prepend` puts the newest roll first, so you read the history from left (new) to right (old).",
  checks:[[a=>{clicks(a,'#roll',3);return a.$$('#history li').length===3;},"After 3 rolls, `#history` should have 3 `<li>` items. Create one with `document.createElement('li')` each roll."],
   [a=>a.$('#history li')&&a.$('#history li').textContent.trim()===a.$('#die').textContent.trim(),"The FIRST `<li>` should be the newest roll. Use `prepend`, not `append`."]]}),
 X('d6','Only the last five',[blk(D_F5,D_F6)],{why:"After 100 rolls the list is longer than a pirate's beard! Keep only 5.",
  learn:"`historyList.children.length` counts how many items are in the list.\n`historyList.lastElementChild.remove()` throws away the **oldest** one (the last in the line).",
  todo:"At the end of `rollDie`: if the list has more than **5** children, remove the last one.",
  job:"Keep only **5** rolls in `#history`. If there are more than 5, remove the last one with `lastElementChild.remove()`.",
  where:"At the end of your `rollDie` function, just before its last `}`.",
  snippet:D_F6,
  hints:["`if (historyList.children.length > 5) { ... }`","Inside the if: `historyList.lastElementChild.remove();`"],
  tip:"This is how chat apps and game logs stay tidy — they throw away the oldest things.",
  checks:[[a=>{clicks(a,'#roll',8);return a.$$('#history li').length===5;},"After 8 rolls, `#history` should only have **5** items. Remove the last one when there are more than 5."]]}),
 X('d7','Shake the die',[blk(D_F6,D_F7)],{why:"A real die tumbles! Let's give ours a wiggle.",
  learn:"The CSS already has a wiggle for `.die.shake`. We add the class, then take it away later.\n`setTimeout(function () { ... }, 400)` is an **egg timer**: \"do this in 400 milliseconds\" (0.4 seconds).",
  todo:"In `rollDie`, add the class `shake` to the die. Then use `setTimeout` to remove it after **400** milliseconds.",
  job:"Make the die wiggle. In `rollDie` add the class `shake` to `die`, then remove it after **400** ms with `setTimeout`.",
  where:"At the end of your `rollDie` function, just before its last `}`.",
  snippet:D_F7,
  hints:["`die.classList.add('shake');`","`setTimeout(function () { die.classList.remove('shake'); }, 400);`"],
  tip:"Removing the class lets the wiggle play again on the next roll.",
  checks:[clickThen('#roll',a=>a.$('#die').classList.contains('shake'),"Right after a roll, `#die` should have the class `shake`. Use `die.classList.add('shake')`.")]}),
 J('d8','Start a new game',{why:"New game, new treasure! Pip needs a button to wipe everything.",
  learn:"`historyList.innerHTML = ''` empties a box completely — like tipping a bucket upside down.",
  todo:"When `#clear` is clicked: empty the history, set `total` back to 0, show **0** in `#total`, and set the message back to **Press Roll to start!**",
  job:"When `#clear` is clicked, empty `#history`, set `total` to **0**, show **0** in `#total`, and show **Press Roll to start!**",
  snippet:`const clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', function () {
  historyList.innerHTML = '';
  total = 0;
  totalText.textContent = 0;
  message.textContent = 'Press Roll to start!';
});`,
  hints:["`const clearButton = document.querySelector('#clear');` and a click listener.","Inside: `historyList.innerHTML = ''; total = 0; totalText.textContent = 0; message.textContent = 'Press Roll to start!';`"],
  tip:"You built a real game tool! Try a two-player race to 30.",
  checks:[[a=>{clicks(a,'#roll',3);a.click('#clear');return a.$$('#history li').length===0;},"Clicking `#clear` should empty `#history`. Use `historyList.innerHTML = '';`"],
   [a=>T(a,'#total')==='0',"Clicking `#clear` should show **0** in `#total`."],
   [a=>{a.click('#roll');return T(a,'#total')===String(faceNo(a));},"After clearing, the total must really start again from 0. Set `total = 0;` too, not just the words."]]})
 ]}),

/* ------------------------------------------------------------------ 3 */
P({id:'pj_tip',emoji:'🍕',title:'Tip Calculator',mentor:'Rosa, pizza-place waiter',
 blurb:'Type the bill, pick a tip, split it between friends — it updates as you type.',
 intro:"Rosa's customers always ask: \"How much is the tip? How much does each of us pay?\" Build a calculator that does the maths **while you type**. You'll learn how JavaScript reads what people type into boxes, and turns words into numbers.",
 base:`<div class="calc">
  <h1>🍕 Tip Calculator</h1>
  <label for="bill">Bill ($)</label>
  <input id="bill" type="number" placeholder="0.00">
  <label for="tip">Tip (%)</label>
  <input id="tip" type="number" value="15">
  <div class="quick">
    <button class="pick" data-tip="10">10%</button>
    <button class="pick" data-tip="15">15%</button>
    <button class="pick" data-tip="20">20%</button>
  </div>
  <label for="people">People</label>
  <input id="people" type="number" value="1" min="1">
  <div class="results">
    <p>Tip: <b>$<span id="tipAmount">0.00</span></b></p>
    <p>Total: <b>$<span id="total">0.00</span></b></p>
    <p>Each person pays: <b>$<span id="each">0.00</span></b></p>
  </div>
  <p id="note"></p>
  <button id="reset">Start again</button>
</div>

<style>
  body {
    margin: 0;
    padding: 20px 16px;
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;
    background: #fff4e6;
    color: #5c3d1e;
  }
  .calc {
    max-width: 360px;
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 8px 24px rgba(214, 120, 20, 0.15);
  }
  h1 { margin-top: 0; text-align: center; }
  label { display: block; font-weight: bold; margin-top: 12px; }
  input {
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    font-size: 20px;
    padding: 8px 12px;
    border: 2px solid #ffd8a8;
    border-radius: 12px;
  }
  ${BTN}
  .pick { background: #ffe8cc; }
  .results { background: #fff9db; border-radius: 14px; padding: 4px 16px; margin-top: 14px; }
  .results b { color: #e8590c; font-size: 20px; }
  #note { text-align: center; font-weight: bold; color: #2b8a3e; min-height: 1em; }
  #reset { display: block; margin: 0 auto; background: #ff922b; color: white; }
</style>

<script>
</script>`,
 steps:[
 J('t1','Read the bill',{why:"First, the calculator needs to read the bill that someone types.",
  learn:"`billInput.value` is what's typed in the box — but it's **words**, not a number! `'40'` is like a picture of a 4 and a 0.\n`Number(billInput.value)` turns it into a real number you can do maths with.\nThe `'input'` event fires **every time** a key is typed — that's how it updates live.",
  todo:"Make a `calculate()` function that reads `#bill` with `Number(...)` and shows it in `#total`. Run it on every `input` in the bill box.",
  job:"When someone types in `#bill`, show the bill in `#total`, like **40**. Use `Number(billInput.value)` and the `'input'` event.",
  snippet:`const billInput = document.querySelector('#bill');
const totalText = document.querySelector('#total');

${TP_F1}

billInput.addEventListener('input', calculate);`,
  hints:["Point at `#bill` and `#total`.","`function calculate() { const bill = Number(billInput.value); totalText.textContent = bill; }`","`billInput.addEventListener('input', calculate);`"],
  tip:"The `$` sign is already written in the HTML, so JavaScript only needs to show the number.",
  checks:[[a=>{a.type('#bill','40');return T(a,'#total').includes('40');},"Typing **40** in `#bill` should show **$40** in `#total`. Listen for `'input'` on the bill box."]]}),
 X('t2','Work out the tip',[below("const totalText = document.querySelector('#total');","const tipInput = document.querySelector('#tip');\nconst tipText = document.querySelector('#tipAmount');"),blk(TP_F1,TP_F2)],{why:"Now the real maths: how much is the tip?",
  learn:"A 15% tip means \"15 out of every 100\". So the tip is `bill * 15 / 100`.\nIn JavaScript `*` means times and `/` means divided by.",
  todo:"Point at `#tip` and `#tipAmount`. In `calculate`, work out `tip = bill * tip% / 100`. Show the tip in `#tipAmount` and `bill + tip` in `#total`.",
  job:"Work out the tip with `bill * Number(tipInput.value) / 100`. Show it in `#tipAmount`. Show `bill + tip` in `#total`.",
  where:"Put the 2 new `const` lines under your others at the top. Then change your `calculate` function to look like this.",
  snippet:`const tipInput = document.querySelector('#tip');
const tipText = document.querySelector('#tipAmount');

${TP_F2}`,
  hints:["Top: `const tipInput = document.querySelector('#tip');` and `const tipText = document.querySelector('#tipAmount');`","In `calculate`: `const tip = bill * Number(tipInput.value) / 100;` then `tipText.textContent = tip;` and `totalText.textContent = bill + tip;`"],
  tip:"Try a 20% tip in your head: a $40 bill → $8 tip. Does your page agree?",
  checks:[[a=>{a.type('#bill','40');return T(a,'#tipAmount').includes('6');},"With a bill of **40** and a 15% tip, `#tipAmount` should show **$6**."],
   [a=>T(a,'#total').includes('46'),"`#total` should show the bill plus the tip: **$46** for a bill of 40."]]}),
 X('t3','Money has 2 decimals',[blk(TP_F2,TP_F3)],{why:"$1.5 looks weird. Money always has two numbers after the dot: $1.50.",
  learn:"`.toFixed(2)` **rounds** a number to 2 decimals, like a money machine: `1.5.toFixed(2)` → `'1.50'`.",
  todo:"Use `.toFixed(2)` for the tip and for the total.",
  job:"Show money with 2 decimals. Use `tip.toFixed(2)` and `(bill + tip).toFixed(2)`. A bill of 10 shows **$1.50** and **$11.50**.",
  where:"Inside your `calculate` function — change the two lines that show the money.",
  snippet:TP_F3,
  hints:["`tipText.textContent = tip.toFixed(2);`","`totalText.textContent = (bill + tip).toFixed(2);`"],
  tip:"Computers sometimes make tiny maths mistakes like 0.1 + 0.2 = 0.30000000000000004. `toFixed` hides them!",
  checks:[[a=>{a.type('#bill','10');return T(a,'#tipAmount')==='1.50';},"With a bill of **10**, `#tipAmount` should show **$1.50**. Use `tip.toFixed(2)`."],
   [a=>T(a,'#total')==='11.50',"With a bill of **10**, `#total` should show **$11.50**. Use `(bill + tip).toFixed(2)`."]]}),
 J('t4','Live tip box',{why:"If you change the tip from 15 to 20, nothing happens! Let's fix that.",
  learn:"The same function can be used by **many** listeners. Now the tip box also calls `calculate`.",
  todo:"Make the tip box run `calculate` on every `input` too.",
  job:"When someone types in `#tip`, run `calculate` again. Add `tipInput.addEventListener('input', calculate);`",
  snippet:`tipInput.addEventListener('input', calculate);`,
  hints:["It's just one line, like the bill one.","`tipInput.addEventListener('input', calculate);`"],
  tip:"Write a function once, use it everywhere. That's the superpower of functions.",
  checks:[[a=>{a.type('#bill','100');a.type('#tip','20');return T(a,'#total')==='120.00';},"Bill **100**, then typing **20** in `#tip`, should show **$120.00**. Listen for `'input'` on the tip box."]]}),
 J('t5','Quick tip buttons',{why:"Typing is slow. Rosa wants one-tap buttons for 10%, 15% and 20%.",
  learn:"Each button has `data-tip=\"10\"` (or 15, 20) in the HTML. `button.dataset.tip` reads it.\nWe put that number into the tip box, then call `calculate()` ourselves.",
  todo:"For each `.pick` button: on click, set `tipInput.value` to `button.dataset.tip`, then call `calculate()`.",
  job:"Make the **10%**, **15%** and **20%** buttons work. On click, put `button.dataset.tip` into the tip box, then run `calculate()`.",
  snippet:`const pickButtons = document.querySelectorAll('.pick');

pickButtons.forEach(function (button) {
  button.addEventListener('click', function () {
    tipInput.value = button.dataset.tip;
    calculate();
  });
});`,
  hints:["`const pickButtons = document.querySelectorAll('.pick');` then `pickButtons.forEach(function (button) { ... });`","Inside: a click listener with `tipInput.value = button.dataset.tip;` and `calculate();`"],
  tip:"Here `calculate()` HAS brackets — because we want it to run right now.",
  checks:[[a=>{a.type('#bill','50');a.click('.pick[data-tip="10"]');return val(a,'#tip')==='10';},"Clicking the **10%** button should put **10** in the `#tip` box."],
   [a=>T(a,'#total')==='55.00',"After clicking **10%** with a bill of 50, `#total` should show **$55.00**. Call `calculate()` after changing the tip."]]}),
 X('t6','Split the bill',[below("const tipText = document.querySelector('#tipAmount');","const peopleInput = document.querySelector('#people');\nconst eachText = document.querySelector('#each');"),blk(TP_F3,TP_F6)],{why:"Three friends share one pizza. How much does each one pay?",
  learn:"Divide the total by the number of people: `(bill + tip) / people`.\nBut what if someone types 0 people? You can't split a pizza between nobody! So if `people < 1`, we use 1.",
  todo:"Point at `#people` and `#each`. In `calculate`, read the people number (at least 1) and show the total divided by people in `#each`.",
  job:"Show what each person pays in `#each`: `(bill + tip) / people`, with `.toFixed(2)`. If people is less than **1**, use 1.",
  where:"The 2 new `const` lines go at the top. Then change your `calculate` function to look like this.",
  snippet:`const peopleInput = document.querySelector('#people');
const eachText = document.querySelector('#each');

${TP_F6}`,
  hints:["Top: `const peopleInput = document.querySelector('#people');` and `const eachText = document.querySelector('#each');`","In `calculate`: `let people = Number(peopleInput.value); if (people < 1) { people = 1; }`","Then: `eachText.textContent = ((bill + tip) / people).toFixed(2);`"],
  tip:"In the preview, type the people FIRST, then the bill. (Next step makes the people box live too!)",
  checks:[[a=>{a.type('#people','3');a.type('#bill','90');return T(a,'#each')==='34.50';},"With **3** people and a bill of **90**, `#each` should show **$34.50**."],
   [a=>{a.type('#people','0');a.type('#bill','10');return T(a,'#each')==='11.50';},"With **0** people, treat it as 1 person. `#each` should show **$11.50** for a bill of 10."]]}),
 J('t7','Live people box',{why:"Changing the number of people should update straight away too.",
  todo:"Make the people box run `calculate` on every `input`.",
  job:"When someone types in `#people`, run `calculate` again. Add `peopleInput.addEventListener('input', calculate);`",
  snippet:`peopleInput.addEventListener('input', calculate);`,
  hints:["One line again — just like the bill and tip boxes.","`peopleInput.addEventListener('input', calculate);`"],
  tip:"Now ALL three boxes are live. Try changing them in any order.",
  checks:[[a=>{a.type('#bill','90');a.type('#people','3');return T(a,'#each')==='34.50';},"Bill **90**, then typing **3** in `#people`, should show **$34.50** in `#each`. Listen for `'input'` on the people box."]]}),
 X('t8','A thank-you note',[below("const eachText = document.querySelector('#each');","const note = document.querySelector('#note');"),blk(TP_F6,TP_F8)],{why:"Rosa loves big tippers. Let's say thanks when the tip is 20% or more!",
  learn:"`>=` means \"bigger than **or the same as**\". So `20 >= 20` is true.",
  todo:"Point at `#note`. In `calculate`, if the tip is **20** or more, show **Super generous! 🌟**, else show nothing (`''`).",
  job:"If the tip is **20** or more, show **Super generous! 🌟** in `#note`. Otherwise make `#note` empty with `''`.",
  where:"The `note` line goes at the top. The `if` goes at the end of `calculate`, before its last `}`.",
  snippet:`const note = document.querySelector('#note');

${TP_F8}`,
  hints:["Top: `const note = document.querySelector('#note');`","End of `calculate`: `if (Number(tipInput.value) >= 20) { note.textContent = 'Super generous! 🌟'; } else { note.textContent = ''; }`"],
  tip:"Empty quotes `''` mean \"no words at all\" — it clears the note.",
  checks:[[a=>{a.type('#bill','50');a.click('.pick[data-tip="20"]');return T(a,'#note').includes('generous');},"With a **20%** tip, `#note` should say **Super generous! 🌟**."],
   [a=>{a.click('.pick[data-tip="10"]');return T(a,'#note')==='';},"With a **10%** tip, `#note` should be empty. Add the `else` part."]]}),
 J('t9','Start again',{why:"Next table! Rosa needs one button to clear everything.",
  todo:"When `#reset` is clicked: empty the bill box, set tip to **15**, people to **1**, then call `calculate()`.",
  job:"When `#reset` is clicked, set the bill to `''`, the tip to **15**, the people to **1**, then run `calculate()`.",
  snippet:`const resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', function () {
  billInput.value = '';
  tipInput.value = 15;
  peopleInput.value = 1;
  calculate();
});`,
  hints:["`const resetButton = document.querySelector('#reset');` and a click listener.","Inside: `billInput.value = ''; tipInput.value = 15; peopleInput.value = 1; calculate();`"],
  tip:"`Number('')` is 0 — so an empty bill shows $0.00. Neat!",
  checks:[[a=>{a.type('#bill','50');a.type('#people','2');a.click('#reset');return val(a,'#bill')==='';},"Clicking `#reset` should empty the bill box: `billInput.value = '';`"],
   [a=>val(a,'#tip')==='15'&&val(a,'#people')==='1',"Clicking `#reset` should set the tip back to **15** and people to **1**."],
   [a=>T(a,'#total')==='0.00'&&T(a,'#each')==='0.00',"After reset, `#total` and `#each` should show **$0.00**. Call `calculate()` at the end."]]})
 ]}),

/* ------------------------------------------------------------------ 4 */
P({id:'pj_todo',emoji:'📝',title:'To-Do List',mentor:'Benny, a busy beaver',
 blurb:'Add jobs, tick them off with a click, delete them and count what is left.',
 intro:"Benny the beaver has SO many jobs: chew logs, fix the dam, nap. Build him a to-do list that adds new jobs, crosses them out when they're done, deletes them, and counts what's left. You'll learn how JavaScript **makes brand-new things** on the page.",
 base:`<div class="board">
  <h1>📝 My To-Do List</h1>
  <div class="add">
    <input id="newTask" placeholder="What do you need to do?">
    <button id="add">Add</button>
  </div>
  <ul id="list"></ul>
  <p id="left">Nothing to do yet!</p>
  <button id="clearDone" class="small">🧹 Clear finished</button>
</div>

<style>
  body {
    margin: 0;
    padding: 20px 16px;
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;
    background: #e7f5ff;
    color: #1c3d5a;
  }
  .board {
    max-width: 400px;
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 8px 24px rgba(34, 139, 230, 0.15);
  }
  h1 { margin-top: 0; text-align: center; }
  .add { display: flex; gap: 6px; }
  .add input {
    flex: 1;
    min-width: 0;
    font: inherit;
    padding: 10px 14px;
    border: 2px solid #a5d8ff;
    border-radius: 999px;
  }
  ${BTN}
  #add { background: #339af0; color: white; margin: 0; }
  #list { list-style: none; padding: 0; }
  #list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #f1f8ff;
    border-radius: 12px;
    padding: 8px 8px 8px 14px;
    margin: 6px 0;
    cursor: pointer;
  }
  #list li.done { text-decoration: line-through; opacity: 0.5; }
  .delete { background: #ffe3e3; color: #c92a2a; padding: 4px 10px; }
  #left { font-weight: bold; text-align: center; }
  .small { display: block; margin: 0 auto; font-size: 14px; }
</style>

<script>
</script>`,
 steps:[
 J('o1','Add a job',{why:"A to-do list's number one job: put new jobs on the list!",
  learn:"`document.createElement('li')` **makes a new** list item — like taking a fresh sticky note from the pad.\n`list.append(item)` **sticks it** onto the end of the list.",
  todo:"Make a function `addTask()` that creates an `li` with the text from `#newTask` and appends it to `#list`. Run it when `#add` is clicked.",
  job:"When `#add` is clicked, make a new `<li>` with the words from `#newTask` and add it to `#list`. Use `createElement` and `append`.",
  snippet:`const taskInput = document.querySelector('#newTask');
const addButton = document.querySelector('#add');
const list = document.querySelector('#list');

${TD_F1}

addButton.addEventListener('click', addTask);`,
  hints:["Point at `#newTask`, `#add` and `#list`.","`function addTask() { const item = document.createElement('li'); item.textContent = taskInput.value; list.append(item); }`","`addButton.addEventListener('click', addTask);`"],
  tip:"Type a job in the preview and click Add. Your page just grew all by itself!",
  checks:[[a=>{addT(a,'Feed the cat');const li=a.$('#list li');return !!li&&a.text(li).includes('feed the cat');},"Type **Feed the cat** and click Add — a new `<li>` with those words should appear in `#list`."]]}),
 X('o2','Tidy the box',[blk(TD_F1,TD_F2)],{why:"After adding a job the words stay in the box, and an empty click adds a blank job. Messy!",
  learn:"`.trim()` cuts off spaces at the start and end — `'  hi  '` becomes `'hi'`.\n`return` means **\"stop here, go home\"**. If the text is empty, we leave the function before making anything.",
  todo:"In `addTask`: trim the text. If it's empty (`''`), `return`. After adding, empty the box with `taskInput.value = ''`.",
  job:"Don't add empty jobs: if the text is `''`, `return`. After adding a job, empty the box with `taskInput.value = '';`",
  where:"Change your `addTask` function to look like this.",
  snippet:TD_F2,
  hints:["Start with `const text = taskInput.value.trim(); if (text === '') { return; }`","Use `item.textContent = text;` and at the end add `taskInput.value = '';`"],
  tip:"Checking for bad input is called **validation**. Every real app does it.",
  checks:[[a=>{addT(a,'Water plants');return val(a,'#newTask')==='';},"After adding a job, the `#newTask` box should be empty again: `taskInput.value = '';`"],
   [a=>{a.type('#newTask','   ');a.click('#add');return a.$$('#list li').length===1;},"Clicking Add with an empty box (or only spaces) should NOT add a job. Use `.trim()` and `return`."]]}),
 X('o3','Count the jobs',[below("const list = document.querySelector('#list');","const leftText = document.querySelector('#left');"),blk(TD_F2,TD_U1+'\n\n'+TD_F3)],{why:"Benny wants to know how many jobs are still waiting.",
  learn:"`list.querySelectorAll('li:not(.done)')` finds every job that is **not** done yet. `.length` counts them.\nWe put the counting in its own function `updateCount()`, so we can call it from lots of places.",
  todo:"Point at `#left`. Make `updateCount()` that shows **N things to do**. Call it at the end of `addTask`.",
  job:"Show how many jobs are left in `#left`, like **2 things to do**. Make a function `updateCount()` and call it at the end of `addTask`.",
  where:"The `leftText` line goes at the top. Add the new `updateCount` function, and add `updateCount();` at the end of `addTask`.",
  snippet:`const leftText = document.querySelector('#left');

${TD_U1}

${TD_F3}`,
  hints:["Top: `const leftText = document.querySelector('#left');`","`function updateCount() { const left = list.querySelectorAll('li:not(.done)').length; leftText.textContent = left + ' things to do'; }`","Last line of `addTask`: `updateCount();`"],
  tip:"Small functions that do ONE job are easy to reuse. Pros love them.",
  checks:[[a=>{addT(a,'Chew logs');addT(a,'Fix the dam');return T(a,'#left').includes('2 things to do');},"After adding 2 jobs, `#left` should say **2 things to do**. Call `updateCount()` in `addTask`."]]}),
 J('o4','Press Enter',{why:"Clicking Add every time is slow. Pressing **Enter** should add the job too.",
  learn:"`'keydown'` fires when a key goes down. `event.key` tells you which one — `'Enter'` is the big return key.",
  todo:"Listen for `keydown` on the task box. If `event.key === 'Enter'`, call `addTask()`.",
  job:"When someone presses **Enter** in `#newTask`, run `addTask()`. Listen for `'keydown'` and check `event.key === 'Enter'`.",
  snippet:`taskInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    addTask();
  }
});`,
  hints:["`taskInput.addEventListener('keydown', function (event) { ... });`","Inside: `if (event.key === 'Enter') { addTask(); }`"],
  tip:"Capital E! `'enter'` won't match. JavaScript cares about big and small letters.",
  checks:[[a=>{a.type('#newTask','Walk the dog');a.key('#newTask','Enter');return a.$$('#list li').length===1;},"Pressing **Enter** in `#newTask` should add the job. Check `event.key === 'Enter'`."]]}),
 X('o5','Tick it off',[blk(TD_F3,TD_F5)],{why:"The best feeling: crossing a job off! Click a job to mark it done.",
  learn:"We can add a listener to the new `li` **while we make it**. Each job gets its own little doorbell.\nThe CSS already crosses out `li.done`. We just `toggle` the class.",
  todo:"In `addTask`, add a click listener to `item` that toggles the class `done` and then calls `updateCount()`.",
  job:"When a job is clicked, toggle the class `done` on it, then run `updateCount()`. Add the listener inside `addTask`.",
  where:"Inside `addTask`, right after `item.textContent = text;`",
  snippet:TD_F5,
  hints:["`item.addEventListener('click', function () { ... });`","Inside: `item.classList.toggle('done');` and `updateCount();`"],
  tip:"Click it again to un-tick it. That's the magic of `toggle`.",
  checks:[[a=>{addT(a,'Nap');addT(a,'Swim');a.click('#list li');return a.$('#list li').classList.contains('done');},"Clicking a job should add the class `done` to it. Use `item.classList.toggle('done')`."],
   [a=>T(a,'#left').includes('1 '),"After ticking one of 2 jobs, `#left` should show **1** left. Call `updateCount()` after toggling."]]}),
 X('o6','Delete button',[blk(TD_F5,TD_F6)],{why:"Some jobs aren't needed anymore. Give each job a ✖ button to throw it away.",
  learn:"We make a button the same way we make an `li`: `createElement('button')`.\n`item.remove()` takes the whole job off the page — into the bin!",
  todo:"In `addTask`, create a `button` with the text **✖** and class `delete`. On click, remove the item and call `updateCount()`. Append the button to the item.",
  job:"Give every job a **✖** button with class `delete`. Clicking it runs `item.remove()` and `updateCount()`.",
  where:"Inside `addTask`, after the click listener for the item.",
  snippet:TD_F6,
  hints:["`const deleteButton = document.createElement('button'); deleteButton.textContent = '✖'; deleteButton.className = 'delete';`","`deleteButton.addEventListener('click', function () { item.remove(); updateCount(); });` then `item.append(deleteButton);`"],
  tip:"Things can live inside things: the button lives inside the `li`, which lives inside the list.",
  checks:[[a=>{addT(a,'Old job');addT(a,'Keep me');return a.click('#list li .delete')&&a.$$('#list li').length===1;},"Each job needs a `.delete` button. Clicking it should remove that job."],
   [a=>T(a,'#list li').includes('keep me')&&T(a,'#left').includes('1 '),"After deleting, the other job should stay and `#left` should show **1**. Call `updateCount()`."]]}),
 J('o7','Clear finished jobs',{why:"At the end of the day, Benny wants to sweep away all the done jobs at once.",
  learn:"`list.querySelectorAll('.done')` finds every finished job. `.forEach` visits each one and removes it.",
  todo:"When `#clearDone` is clicked, remove every `.done` item, then call `updateCount()`.",
  job:"When `#clearDone` is clicked, remove every job with the class `done`. Then run `updateCount()`.",
  snippet:`const clearButton = document.querySelector('#clearDone');

clearButton.addEventListener('click', function () {
  list.querySelectorAll('.done').forEach(function (item) {
    item.remove();
  });
  updateCount();
});`,
  hints:["`const clearButton = document.querySelector('#clearDone');` and a click listener.","Inside: `list.querySelectorAll('.done').forEach(function (item) { item.remove(); });` then `updateCount();`"],
  tip:"`forEach` is like a teacher going down the line, doing the same thing for every kid.",
  checks:[[a=>{addT(a,'A');addT(a,'B');addT(a,'C');const li=a.$$('#list li');a.click(li[0]);a.click(li[1]);a.click('#clearDone');return a.$$('#list li').length===1;},"Tick 2 of 3 jobs, then click `#clearDone` — only 1 job should be left."],
   [a=>T(a,'#left').includes('1 '),"After clearing, `#left` should show **1**. Call `updateCount()`."]]}),
 X('o8','Nice words',[blk(TD_U1,TD_U2)],{why:"\"1 things to do\" sounds wrong! And when everything is done, Benny deserves a party.",
  learn:"`else if` adds **more roads** to the fork: first check this, else check that, else do the last thing.",
  todo:"Change `updateCount`: if there are jobs but 0 left, show **All done! 🎉**. If 1 is left, show **1 thing to do**. Otherwise **N things to do**.",
  job:"In `updateCount`, show **All done! 🎉** when every job is ticked, and **1 thing to do** (no s) when one is left.",
  where:"Change your `updateCount` function to look like this.",
  snippet:TD_U2,
  hints:["`if (list.children.length > 0 && left === 0) { leftText.textContent = 'All done! 🎉'; }` — `&&` means \"and\".","`else if (left === 1) { leftText.textContent = '1 thing to do'; } else { leftText.textContent = left + ' things to do'; }`"],
  tip:"Getting the little words right (1 thing / 2 things) makes an app feel polished.",
  checks:[[a=>{addT(a,'Only job');return T(a,'#left').includes('1 thing to do');},"With 1 job left, `#left` should say **1 thing to do** (no s)."],
   [a=>{a.click('#list li');return T(a,'#left').includes('all done');},"When every job is ticked, `#left` should say **All done! 🎉**."]]})
 ]}),

/* ------------------------------------------------------------------ 5 */
P({id:'pj_quiz',emoji:'🦉',title:'Quiz App',mentor:'Professor Hoot',
 blurb:'A real quiz: questions, answer buttons, a score and a final result.',
 intro:"Professor Hoot wants an animal quiz for his class. You'll store the questions in a list, show them one at a time with answer buttons, check if the answer is right, keep score, and show the final result. This is how real quiz apps work!",
 base:`<div class="quiz">
  <h1>🦉 Animal Quiz</h1>
  <p id="progress">Get ready…</p>
  <h2 id="question">Loading…</h2>
  <div id="answers"></div>
  <p id="feedback"></p>
  <p class="score">Score: <b id="score">0</b></p>
  <button id="next">Next ➜</button>
</div>

<style>
  body {
    margin: 0;
    padding: 20px 16px;
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;
    background: linear-gradient(160deg, #f3f0ff, #e7f5ff);
    color: #3b2f63;
  }
  .quiz {
    max-width: 400px;
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 8px 24px rgba(112, 72, 232, 0.15);
  }
  h1 { margin-top: 0; }
  #progress { color: #7950f2; font-weight: bold; }
  ${BTN}
  #answers { display: grid; gap: 8px; }
  .answer { background: #f3f0ff; font-size: 18px; margin: 0; }
  .answer.right { background: #b2f2bb; }
  .answer.wrong { background: #ffc9c9; }
  .answer:disabled { opacity: 1; }
  #feedback { font-weight: bold; min-height: 1.2em; }
  #next { background: #7950f2; color: white; }
</style>

<script>
</script>`,
 steps:[
 J('q1','The question list',{why:"A quiz needs questions! We'll keep them all in one list.",
  learn:"An **object** is a lunchbox with labelled sections: `{ question: '...', options: [...], answer: '...' }`.\nAn **array** of objects is a stack of lunchboxes. `questions[0]` is the first one, and `questions[0].question` opens its `question` section.",
  todo:"Make the `questions` array (4 questions), `let current = 0;`, and a `showQuestion()` function that shows the question and **Question 1 of 4** in `#progress`. Call it.",
  job:"Make a `questions` array. Show the first question (**Which animal says moo?**) in `#question` and **Question 1 of 4** in `#progress`.",
  snippet:`const questions = [
  { question: 'Which animal says moo?', options: ['Cow', 'Duck', 'Cat'], answer: 'Cow' },
  { question: 'How many legs does a spider have?', options: ['6', '8', '10'], answer: '8' },
  { question: 'Which is the biggest animal?', options: ['Elephant', 'Blue whale', 'Giraffe'], answer: 'Blue whale' },
  { question: 'What do bees make?', options: ['Milk', 'Jam', 'Honey'], answer: 'Honey' }
];

let current = 0;
const questionText = document.querySelector('#question');
const progressText = document.querySelector('#progress');

${QZ_S1}

showQuestion();`,
  hints:["Copy the `questions` array carefully — every `{ }` needs a comma after it except the last.","`function showQuestion() { const q = questions[current]; questionText.textContent = q.question; ... }`","Progress: `progressText.textContent = 'Question ' + (current + 1) + ' of ' + questions.length;` — then call `showQuestion();`"],
  tip:"`questions.length` counts the questions for you. Add a 5th and it says 'of 5' all by itself!",
  checks:[hasText('#question','moo',"`#question` should show the first question: **Which animal says moo?**"),hasText('#progress','1 of 4',"`#progress` should say **Question 1 of 4**.")]}),
 X('q2','Answer buttons',[below("const progressText = document.querySelector('#progress');","const answersBox = document.querySelector('#answers');"),blk(QZ_S1,QZ_S2)],{why:"Players need buttons to pick an answer.",
  learn:"`q.options.forEach(...)` visits each answer. For each one we **make a button** and stick it in `#answers`.\n`answersBox.innerHTML = ''` empties the old buttons first, so they don't pile up.",
  todo:"Point at `#answers`. In `showQuestion`, empty it, then make a `button` with class `answer` for each option.",
  job:"Show one button for each answer inside `#answers`. Give each button the class `answer`. Use `forEach` and `createElement('button')`.",
  where:"The `answersBox` line goes at the top. Then add the new lines at the end of `showQuestion`.",
  snippet:`const answersBox = document.querySelector('#answers');

${QZ_S2}`,
  hints:["Top: `const answersBox = document.querySelector('#answers');`","In `showQuestion`: `answersBox.innerHTML = '';` then `q.options.forEach(function (option) { ... });`","Inside forEach: `const button = document.createElement('button'); button.textContent = option; button.className = 'answer'; answersBox.append(button);`"],
  tip:"The buttons come from the DATA. Change an option in the array and the button changes too.",
  checks:[[a=>a.$$('#answers .answer').length===3,"`#answers` should have 3 buttons with the class `answer`."],
   [a=>T(a,'.answer')==='cow',"The first answer button should say **Cow**."]]}),
 X('q3','Check the answer',[below("const answersBox = document.querySelector('#answers');","const feedback = document.querySelector('#feedback');"),blk(QZ_S2,QZ_S3+'\n\n'+QZ_C1)],{why:"Click an answer — was it right? Hoot wants to know!",
  learn:"Each button gets a listener that calls `checkAnswer(button, option)`. We **pass** the button and its words into the function, like handing over a parcel.\nInside, we compare `option === q.answer`.",
  todo:"Point at `#feedback`. Give each button a click listener that calls `checkAnswer(button, option)`. Make `checkAnswer`: right → **Correct! 🎉** and class `right`; wrong → **Oops! It was** + the answer and class `wrong`.",
  job:"When an answer is clicked: if right, show **Correct! 🎉** in `#feedback`. If wrong, show **Oops! It was Cow** (the real answer).",
  where:"The `feedback` line goes at the top. Add the listener inside the `forEach` in `showQuestion`, and add the new `checkAnswer` function below it.",
  snippet:`const feedback = document.querySelector('#feedback');

${QZ_S3}

${QZ_C1}`,
  hints:["Inside forEach: `button.addEventListener('click', function () { checkAnswer(button, option); });`","`function checkAnswer(button, option) { const q = questions[current]; if (option === q.answer) { ... } else { ... } }`","Right: `button.classList.add('right'); feedback.textContent = 'Correct! 🎉';` Wrong: `button.classList.add('wrong'); feedback.textContent = 'Oops! It was ' + q.answer;`"],
  tip:"Green for right, red for wrong — the CSS already has `.right` and `.wrong`.",
  checks:[[a=>ans(a,'duck')&&T(a,'#feedback').includes('oops! it was cow'),"Clicking **Duck** should show **Oops! It was Cow** in `#feedback`."],
   [a=>ans(a,'cow')&&T(a,'#feedback').includes('correct'),"Clicking **Cow** should show **Correct! 🎉** in `#feedback`."]]}),
 X('q4','Keep score',[below("const feedback = document.querySelector('#feedback');","let score = 0;\nconst scoreText = document.querySelector('#score');"),blk(QZ_C1,QZ_C2)],{why:"What's a quiz without points?",
  todo:"Make `let score = 0;` and point at `#score`. When the answer is right, add 1 to `score` and show it.",
  job:"Make `let score = 0;`. When the answer is right, add 1 to `score` and show it in `#score`.",
  where:"The 2 new lines go at the top. The adding goes inside the `if` (right answer) part of `checkAnswer`.",
  snippet:`let score = 0;
const scoreText = document.querySelector('#score');

${QZ_C2}`,
  hints:["Top: `let score = 0;` and `const scoreText = document.querySelector('#score');`","In the right-answer part: `score = score + 1; scoreText.textContent = score;`"],
  tip:"Try clicking Cow twice. Uh oh — 2 points! We'll fix that cheat next.",
  checks:[[a=>ans(a,'cow')&&T(a,'#score')==='1',"A right answer should make `#score` show **1**. Add `score = score + 1;` and show it."]]}),
 X('q5','No cheating',[blk(QZ_C2,QZ_C3)],{why:"Clicking the right answer again and again gives free points. Sneaky! Lock the buttons after one click.",
  learn:"`b.disabled = true` **greys out** a button — clicks on it do nothing, like a locked door.",
  todo:"At the end of `checkAnswer`, set `disabled = true` on every button in `#answers`.",
  job:"After one answer is clicked, lock all the answer buttons with `b.disabled = true;` so the score can't go up twice.",
  where:"At the end of `checkAnswer`, before its last `}`.",
  snippet:QZ_C3,
  hints:["`answersBox.querySelectorAll('button').forEach(function (b) { ... });`","Inside: `b.disabled = true;`"],
  tip:"Game makers always think: \"How could a player cheat?\" — and then stop it.",
  checks:[[a=>{ans(a,'cow');ans(a,'cow');ans(a,'duck');return T(a,'#score')==='1'&&T(a,'#feedback').includes('correct');},"After one answer, the buttons should be locked. Clicking again must NOT change the score. Use `b.disabled = true`."]]}),
 J('q6','Next question',{why:"One question is not a quiz. The Next button should move on.",
  todo:"When `#next` is clicked: add 1 to `current`, empty the feedback, and call `showQuestion()`.",
  job:"When `#next` is clicked, add 1 to `current`, clear `#feedback`, and run `showQuestion()`.",
  snippet:`const nextButton = document.querySelector('#next');

${QZ_N1}`,
  hints:["`const nextButton = document.querySelector('#next');` and a click listener.","Inside: `current = current + 1; feedback.textContent = ''; showQuestion();`"],
  tip:"Changing `current` and calling `showQuestion()` again redraws EVERYTHING — question, buttons and progress.",
  checks:[[a=>{ans(a,'cow');a.click('#next');return T(a,'#question').includes('spider');},"Clicking `#next` should show question 2: **How many legs does a spider have?**"],
   [a=>T(a,'#progress').includes('2 of 4')&&T(a,'#feedback')==='',"After Next, `#progress` should say **Question 2 of 4** and `#feedback` should be empty."]]}),
 X('q7','The final result',[blk(QZ_N1,QZ_N2+'\n\n'+QZ_R)],{why:"After the last question the quiz breaks! Let's show the final score instead.",
  learn:"There are only 4 questions (numbers 0 to 3). When `current` becomes **4**, there's no question left — so we show the result.",
  todo:"In the Next listener: if `current === questions.length`, call a new `showResult()` function. Else call `showQuestion()`. `showResult` shows **Quiz finished! 🏁** and **You got 3 out of 4!**",
  job:"After the last question, show **Quiz finished! 🏁** in `#question` and **You got 4 out of 4!** (the real score) in `#feedback`. The Next button says **Play again**.",
  where:"Change your `nextButton` click listener, and add the new `showResult` function under it.",
  snippet:`${QZ_N2}

${QZ_R}`,
  hints:["In the listener: `if (current === questions.length) { showResult(); } else { showQuestion(); }`","`showResult` sets: `questionText.textContent = 'Quiz finished! 🏁';` and `answersBox.innerHTML = '';`","And: `feedback.textContent = 'You got ' + score + ' out of ' + questions.length + '!';` and `nextButton.textContent = 'Play again';`"],
  tip:"Play the whole quiz in the preview. Can you get 4 out of 4?",
  checks:[[a=>playAll(a)&&T(a,'#question').includes('finished'),"After answering all 4 questions and clicking Next, `#question` should say **Quiz finished! 🏁**."],
   [a=>T(a,'#feedback').includes('4 out of 4'),"The result should say **You got 4 out of 4!** in `#feedback` (with the real score)."],
   [a=>T(a,'#next').includes('play again'),"The Next button should now say **Play again**."]]}),
 X('q8','Play again',[blk(QZ_N2,QZ_N3)],{why:"Hoot's class wants to play again (and again)!",
  todo:"At the start of the Next listener: if `current >= questions.length`, set `current` and `score` to 0, show the score, change the button back to **Next ➜**, call `showQuestion()` and `return`.",
  job:"When **Play again** is clicked, set `current = 0` and `score = 0`, show the score, change the button back to **Next ➜**, and run `showQuestion()`.",
  where:"At the very start of your `nextButton` click listener (inside it, before `current = current + 1;`).",
  snippet:QZ_N3,
  hints:["`if (current >= questions.length) { ... return; }` — `return` stops the rest of the listener.","Inside: `current = 0; score = 0; scoreText.textContent = score; nextButton.textContent = 'Next ➜'; showQuestion();`"],
  tip:"Add your own questions to the array — the whole quiz grows by itself!",
  checks:[[a=>{playAll(a);a.click('#next');return T(a,'#question').includes('moo');},"After the quiz, clicking **Play again** should show question 1 again."],
   [a=>T(a,'#score')==='0'&&T(a,'#next').includes('next'),"After Play again, `#score` should show **0** and the button should say **Next ➜**."]]})
 ]}),

/* ------------------------------------------------------------------ 6 */
P({id:'pj_watch',emoji:'⏱️',title:'Stopwatch',mentor:'Coach Zip, running coach',
 blurb:'Start, stop, reset and record laps — with a proper 00:00 clock.',
 intro:"Coach Zip needs a stopwatch for sports day. You'll make JavaScript count every second, stop and reset it, show the time like a real clock (01:05), record laps and even control it with the space bar.",
 base:`<div class="watch">
  <h1>⏱️ Stopwatch</h1>
  <div id="display">00:00</div>
  <div class="buttons">
    <button id="start">▶ Start</button>
    <button id="stop">⏸ Stop</button>
    <button id="reset">↺ Reset</button>
    <button id="lap">🏁 Lap</button>
  </div>
  <p class="hint">Tip: the space bar starts and stops it too</p>
  <ol id="laps"></ol>
</div>

<style>
  body {
    margin: 0;
    padding: 20px 16px;
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;
    background: #ebfbee;
    color: #234d2c;
  }
  .watch {
    max-width: 380px;
    margin: 0 auto;
    background: white;
    border-radius: 24px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 8px 24px rgba(55, 178, 77, 0.18);
  }
  h1 { margin-top: 0; }
  #display {
    font-family: 'Courier New', monospace;
    font-size: 64px;
    font-weight: bold;
    background: #f4fce3;
    border: 4px solid #c0eb75;
    border-radius: 20px;
    padding: 10px;
  }
  #display.running { border-color: #40c057; color: #2b8a3e; }
  ${BTN}
  #start { background: #51cf66; color: white; }
  #stop { background: #ffd43b; }
  #reset { background: #ffc9c9; }
  #lap { background: #d0ebff; }
  .hint { font-size: 14px; opacity: 0.7; }
  #laps { text-align: left; font-family: 'Courier New', monospace; font-size: 18px; }
</style>

<script>
</script>`,
 steps:[
 J('w1','Start counting',{why:"A stopwatch must count up, all by itself, every second.",
  learn:"`setInterval(tick, 1000)` is like a **metronome**: it runs `tick` again and again, every 1000 milliseconds (1 second).\nWe keep the metronome in a box called `timer` so we can stop it later.",
  todo:"Make `let seconds = 0;` and `let timer = null;`. Write `tick()` that adds 1 and shows `seconds` in `#display`. When `#start` is clicked, run `setInterval(tick, 1000)`.",
  job:"When `#start` is clicked, count up every second. Use `timer = setInterval(tick, 1000);` and show `seconds` in `#display`.",
  snippet:`const display = document.querySelector('#display');
const startButton = document.querySelector('#start');
let seconds = 0;
let timer = null;

${SW_T1}

${SW_S1}`,
  hints:["`let seconds = 0;` and `let timer = null;` — `null` means \"nothing here yet\".","`function tick() { seconds = seconds + 1; display.textContent = seconds; }`","`startButton.addEventListener('click', function () { timer = setInterval(tick, 1000); });`"],
  tip:"1000 milliseconds = 1 second. A blink takes about 100 milliseconds!",
  checks:[[async a=>{fast(a);a.click('#start');await a.wait(250);return T(a,'#display')!=='00:00'&&T(a,'#display')!=='0';},"After clicking `#start`, `#display` should count up. Use `setInterval(tick, 1000)` and change `#display` in `tick`."]]}),
 J('w2','Stop',{why:"The race is over! The clock has to stop.",
  learn:"`clearInterval(timer)` **switches off** the metronome inside the `timer` box. Then we put `null` back in the box: \"no timer running\".",
  todo:"When `#stop` is clicked, `clearInterval(timer)` and set `timer = null`.",
  job:"When `#stop` is clicked, stop counting with `clearInterval(timer);` then set `timer = null;`",
  snippet:`const stopButton = document.querySelector('#stop');

stopButton.addEventListener('click', function () {
  clearInterval(timer);
  timer = null;
});`,
  hints:["`const stopButton = document.querySelector('#stop');` and a click listener.","Inside: `clearInterval(timer); timer = null;`"],
  tip:"Every `setInterval` should have a `clearInterval` somewhere — or it runs forever!",
  checks:[[async a=>{fast(a);a.click('#start');await a.wait(150);a.click('#stop');const t=T(a,'#display');await a.wait(150);return t!=='00:00'&&T(a,'#display')===t;},"After clicking `#stop`, the number in `#display` should stop changing. Use `clearInterval(timer)`."]]}),
 X('w3','Only one timer',[blk(SW_S1,SW_S2)],{why:"Click Start three times and you get THREE metronomes — and Stop only stops one! Let's fix that bug.",
  learn:"If `timer` is not `null`, a timer is already running. `!==` means **\"is not\"**. So we `return` (go home) and don't start another one.",
  todo:"At the start of the Start listener: if `timer !== null`, `return`.",
  job:"Don't start a second timer. At the start of the `#start` listener add `if (timer !== null) { return; }`",
  where:"Inside your `startButton` click listener, before `timer = setInterval(...)`.",
  snippet:SW_S2,
  hints:["`if (timer !== null) { ... }`","Inside the if: `return;`"],
  tip:"Finding and fixing bugs like this is what real programmers do all day.",
  checks:[[async a=>{fast(a);a.click('#start');a.click('#start');a.click('#start');await a.wait(120);a.click('#stop');const t=T(a,'#display');await a.wait(150);return t!=='00:00'&&T(a,'#display')===t;},"Click Start 3 times, then Stop once — the clock must stop. Add `if (timer !== null) { return; }` to the Start listener."]]}),
 X('w4','Clock format',[blk(SW_T1,SW_FT+'\n\n'+SW_T2)],{why:"75 seconds should look like **01:15**, like a real clock.",
  learn:"A function can **give back** an answer with `return` — like a vending machine: put in 75, get out `'01:15'`.\n`Math.floor(75 / 60)` → 1 minute. `75 % 60` → 15 (the **leftover** after sharing into 60s).\n`String(5).padStart(2, '0')` → `'05'` — it pads the front with a zero, like a coat lining.",
  todo:"Write `formatTime(total)` that returns minutes and seconds as **mm:ss**. In `tick`, show `formatTime(seconds)`.",
  job:"Write a function `formatTime` so `formatTime(75)` gives **01:15**. Use it in `tick`: `display.textContent = formatTime(seconds);`",
  where:"Add the new `formatTime` function above `tick`, and change the last line of `tick`.",
  snippet:`${SW_FT}

${SW_T2}`,
  hints:["`const minutes = Math.floor(total / 60);` and `const secs = total % 60;`","`return String(minutes).padStart(2, '0') + ':' + String(secs).padStart(2, '0');`","In `tick`: `display.textContent = formatTime(seconds);`"],
  tip:"`%` is called **modulo**. It's the 'leftovers' sign. 7 % 3 = 1, because 7 sweets shared by 3 leaves 1.",
  checks:[[async a=>{fast(a);a.click('#start');await a.wait(150);a.click('#stop');const t=T(a,'#display');return /^\d\d:\d\d$/.test(t)&&t!=='00:00';},"`#display` should look like a clock, e.g. **00:07**. Show `formatTime(seconds)` in `tick`."],
   [a=>typeof a.win.formatTime==='function'&&a.win.formatTime(75)==='01:15'&&a.win.formatTime(5)==='00:05',"`formatTime(75)` should give **01:15**, and `formatTime(5)` should give **00:05**. Check `Math.floor`, `%` and `padStart(2, '0')`."]]}),
 J('w5','Laps',{why:"Coach Zip times each lap of the track. Press Lap to write the time down.",
  todo:"When `#lap` is clicked, create an `li` with `formatTime(seconds)` and append it to `#laps`.",
  job:"When `#lap` is clicked, add a new `<li>` to `#laps` with the time, like **00:12**. Use `formatTime(seconds)`.",
  snippet:`const lapButton = document.querySelector('#lap');
const lapList = document.querySelector('#laps');

lapButton.addEventListener('click', function () {
  const item = document.createElement('li');
  item.textContent = formatTime(seconds);
  lapList.append(item);
});`,
  hints:["Point at `#lap` and `#laps`, then add a click listener.","Inside: `const item = document.createElement('li'); item.textContent = formatTime(seconds); lapList.append(item);`"],
  tip:"Reusing `formatTime` here means laps and the clock always look the same.",
  checks:[[async a=>{fast(a);a.click('#start');await a.wait(80);a.click('#lap');await a.wait(60);a.click('#lap');a.click('#stop');const li=a.$$('#laps li');return li.length===2&&li.every(l=>/^\d\d:\d\d$/.test(a.text(l)));},"Clicking `#lap` twice should add 2 `<li>` times like **00:04** to `#laps`."]]}),
 J('w6','Reset',{why:"Next race! Back to zero.",
  todo:"When `#reset` is clicked: stop the timer, set `timer = null` and `seconds = 0`, show `formatTime(seconds)`, and empty the laps.",
  job:"When `#reset` is clicked, stop the timer, set `seconds = 0`, show **00:00** in `#display`, and empty `#laps`.",
  snippet:`const resetButton = document.querySelector('#reset');

resetButton.addEventListener('click', function () {
  clearInterval(timer);
  timer = null;
  seconds = 0;
  display.textContent = formatTime(seconds);
  lapList.innerHTML = '';
});`,
  hints:["Point at `#reset` and add a click listener.","Inside: `clearInterval(timer); timer = null; seconds = 0; display.textContent = formatTime(seconds); lapList.innerHTML = '';`"],
  tip:"Reset also has to STOP the timer — otherwise it jumps straight back to counting.",
  checks:[[async a=>{fast(a);a.click('#start');await a.wait(100);a.click('#lap');a.click('#reset');await a.wait(80);return T(a,'#display')==='00:00';},"Clicking `#reset` should stop the clock and show **00:00**."],
   [a=>a.$$('#laps li').length===0,"Clicking `#reset` should also empty `#laps`."]]}),
 J('w7','Running glow',{why:"From far away, the coach can't tell if the clock is running. Make it glow green!",
  learn:"The CSS already has `#display.running` with a green border. We **add** the class on Start and **remove** it on Stop and Reset.",
  todo:"Add the class `running` to `#display` when Start is clicked. Remove it when Stop or Reset is clicked.",
  job:"Add the class `running` to `#display` when `#start` is clicked. Remove it when `#stop` or `#reset` is clicked.",
  snippet:`startButton.addEventListener('click', function () {
  display.classList.add('running');
});

stopButton.addEventListener('click', function () {
  display.classList.remove('running');
});

resetButton.addEventListener('click', function () {
  display.classList.remove('running');
});`,
  hints:["Three new listeners — one for each button.","`display.classList.add('running');` for Start, and `display.classList.remove('running');` for Stop and Reset."],
  tip:"Little signals like colours make apps easier to use at a glance.",
  checks:[clickThen('#start',a=>a.$('#display').classList.contains('running'),"Clicking `#start` should add the class `running` to `#display`."),
   clickThen('#stop',a=>!a.$('#display').classList.contains('running'),"Clicking `#stop` should remove the class `running`."),
   [a=>{a.click('#start');a.click('#reset');return !a.$('#display').classList.contains('running');},"Clicking `#reset` should remove the class `running` too."]]}),
 J('w8','Space bar control',{why:"The coach's hands are full of clipboards. One big key is easiest: the space bar!",
  learn:"`event.key === ' '` is the space bar (a space between the quotes).\n`event.preventDefault()` stops the space bar from doing its normal job (scrolling the page).",
  todo:"Listen for `keydown` on `document`. If the key is space: if `timer === null` click Start, else click Stop.",
  job:"Pressing the **space bar** starts the stopwatch if it's stopped, and stops it if it's running. Use `startButton.click()` and `stopButton.click()`.",
  snippet:`document.addEventListener('keydown', function (event) {
  if (event.key === ' ') {
    event.preventDefault();
    if (timer === null) {
      startButton.click();
    } else {
      stopButton.click();
    }
  }
});`,
  hints:["`document.addEventListener('keydown', function (event) { if (event.key === ' ') { ... } });`","Inside: `event.preventDefault(); if (timer === null) { startButton.click(); } else { stopButton.click(); }`"],
  tip:"Click the preview first so it can hear your keyboard, then tap space.",
  checks:[[async a=>{fast(a);a.key('body',' ');await a.wait(120);return T(a,'#display')!=='00:00'&&a.$('#display').classList.contains('running');},"Pressing **space** should start the stopwatch. Use `startButton.click()` when `timer === null`."],
   [async a=>{a.key('body',' ');const t=T(a,'#display');await a.wait(120);return T(a,'#display')===t;},"Pressing **space** again should stop it. Use `stopButton.click()` in the `else`."]]})
 ]}),

/* ------------------------------------------------------------------ 7 */
P({id:'pj_facts',emoji:'🤖',title:'Random Fact Machine',mentor:'Dr. Wonder, curious scientist',
 blurb:'A button that serves amazing facts — never the same one twice in a row.',
 intro:"Dr. Wonder collects amazing facts. Build a machine that picks one at random, never repeats itself twice in a row, counts how many you've seen, tracks how many you've discovered, and saves your favourites.",
 base:`<div class="machine">
  <h1>🤖 Random Fact Machine</h1>
  <div class="screen" id="screen">
    <p id="fact">Press the button for an amazing fact!</p>
  </div>
  <button id="go">✨ Tell me a fact!</button>
  <p id="counter">Facts seen: 0</p>
  <p id="found"></p>
  <button id="save" class="small">⭐ Save this fact</button>
  <h2>My favourite facts</h2>
  <ul id="favs"></ul>
</div>

<style>
  body {
    margin: 0;
    padding: 20px 16px;
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;
    background: linear-gradient(160deg, #fff0f6, #f3f0ff);
    color: #4a2a55;
  }
  .machine {
    max-width: 400px;
    margin: 0 auto;
    background: white;
    border-radius: 24px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 8px 24px rgba(214, 51, 108, 0.15);
  }
  h1 { margin-top: 0; }
  .screen {
    background: white;
    border: 4px dashed #faa2c1;
    border-radius: 18px;
    min-height: 90px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 12px;
    font-size: 19px;
  }
  ${BTN}
  #go { background: #f06595; color: white; font-size: 20px; font-weight: bold; margin-top: 14px; }
  #found { font-weight: bold; color: #7048e8; min-height: 1em; }
  .small { font-size: 14px; background: #fff3bf; }
  h2 { font-size: 18px; }
  #favs { text-align: left; }
</style>

<script>
</script>`,
 steps:[
 J('f1','The fact list',{why:"First the machine needs a memory full of facts.",
  learn:"An **array** is a list in square brackets: `['fact one', 'fact two']`. Each fact has a number, starting at **0**.\n`facts[0]` means \"give me fact number 0\" — the first one.",
  todo:"Make an array `facts` with 8 facts. Write `showFact()` that shows `facts[0]` in `#fact`. Run it when `#go` is clicked.",
  job:"Make an array called `facts`. When `#go` is clicked, show `facts[0]` (the octopus fact) in `#fact`.",
  snippet:`const facts = [
${FACTS.map(f=>"  '"+f.replace(/'/g,"\\'")+"'").join(',\n')}
];
const factText = document.querySelector('#fact');
const goButton = document.querySelector('#go');

${FC_F1}

goButton.addEventListener('click', showFact);`,
  hints:["Each fact is in quotes, with a comma between them. Inside a fact, `don\\'t` needs a backslash before the `'`.","`function showFact() { factText.textContent = facts[0]; }`","`goButton.addEventListener('click', showFact);`"],
  tip:"Swap in your own favourite facts! Just keep the octopus one first for this step.",
  checks:[clickThen('#go',a=>T(a,'#fact').includes('octopus'),"Clicking `#go` should show the first fact — **An octopus has three hearts.** — in `#fact`.")]}),
 X('f2','Pick one at random',[blk(FC_F1,FC_F2)],{why:"Always the octopus! Let's make the machine surprise us.",
  learn:"`Math.random() * facts.length` gives a decimal from 0 up to 8. `Math.floor` chops it to a whole number **0–7** — a perfect locker number!\nUsing `facts.length` (not 8) means it still works if you add more facts.",
  todo:"In `showFact`, pick `index = Math.floor(Math.random() * facts.length)` and show `facts[index]`.",
  job:"Show a random fact. Use `Math.floor(Math.random() * facts.length)` to pick the number, then show `facts[index]`.",
  where:"Change your `showFact` function to look like this.",
  snippet:FC_F2,
  hints:["`const index = Math.floor(Math.random() * facts.length);`","`factText.textContent = facts[index];`"],
  tip:"Click lots of times. Notice anything annoying? Sometimes the SAME fact comes twice!",
  checks:[[a=>{const s=new Set();for(let i=0;i<40;i++){a.click('#go');s.add(T(a,'#fact'));}return s.size>=3;},"Clicking `#go` many times should show different facts. Use `Math.random() * facts.length`."]]}),
 X('f3','Never twice in a row',[below("const goButton = document.querySelector('#go');","let lastIndex = -1;"),blk(FC_F2,FC_F3)],{why:"Getting the same fact twice feels broken. Let's make sure it changes every time!",
  learn:"`while (index === lastIndex) { ... }` means **\"keep trying again while it's the same as last time\"** — like re-rolling a die until you get a new number.\n`lastIndex` remembers the last pick. We start it at `-1` (no fact yet).",
  todo:"Make `let lastIndex = -1;`. In `showFact`, use `let index`, re-pick in a `while` loop while it equals `lastIndex`, then save `lastIndex = index`.",
  job:"Never show the same fact twice in a row. Make `let lastIndex = -1;`, re-pick with `while (index === lastIndex)`, then set `lastIndex = index;`",
  where:"Put `let lastIndex = -1;` at the top under your other lines. Then change your `showFact` function.",
  snippet:`let lastIndex = -1;

${FC_F3}`,
  hints:["Top: `let lastIndex = -1;` — and change `const index` to `let index` (it can change now).","`while (index === lastIndex) { index = Math.floor(Math.random() * facts.length); }`","After the loop: `lastIndex = index;`"],
  tip:"A `while` loop must be able to stop! Here it stops as soon as it picks a different number.",
  checks:[[a=>{let prev=null;for(let i=0;i<60;i++){a.click('#go');const t=T(a,'#fact');if(t===prev)return false;prev=t;}return true;},"The same fact should never show twice in a row. Use a `while` loop with `lastIndex`."]]}),
 J('f4','Count the facts',{why:"Dr. Wonder wants to know how many facts you've read.",
  todo:"Make `let seen = 0;`. On every `#go` click, add 1 and show **Facts seen: N** in `#counter`.",
  job:"Count every click on `#go`. Show **Facts seen: 3** (the real number) in `#counter`.",
  snippet:`let seen = 0;
const counterText = document.querySelector('#counter');

goButton.addEventListener('click', function () {
  seen = seen + 1;
  counterText.textContent = 'Facts seen: ' + seen;
});`,
  hints:["`let seen = 0;` and `const counterText = document.querySelector('#counter');`","A new click listener on `goButton`: `seen = seen + 1; counterText.textContent = 'Facts seen: ' + seen;`"],
  tip:"One button, two listeners: one shows the fact, one counts. Each does one job.",
  checks:[[a=>{clicks(a,'#go',3);return T(a,'#counter').includes('facts seen: 3');},"After 3 clicks, `#counter` should say **Facts seen: 3**."]]}),
 J('f5','Colour splash',{why:"Every new fact deserves a new colour on the screen!",
  learn:"An array can hold anything — even colours! We pick a random one the same way we picked a fact.\n`screenBox.style.backgroundColor = ...` paints the screen with JavaScript.",
  todo:"Make an array `colours` of 5 light colours. On every `#go` click, pick a random one and set it as the `#screen` background.",
  job:"On every `#go` click, paint `#screen` with a random colour from a `colours` array. Use `screenBox.style.backgroundColor`.",
  snippet:`const screenBox = document.querySelector('#screen');
const colours = ['#fff3bf', '#d3f9d8', '#d0ebff', '#ffdeeb', '#e5dbff'];

goButton.addEventListener('click', function () {
  const pick = Math.floor(Math.random() * colours.length);
  screenBox.style.backgroundColor = colours[pick];
});`,
  hints:["`const screenBox = document.querySelector('#screen');` and `const colours = ['#fff3bf', '#d3f9d8', '#d0ebff', '#ffdeeb', '#e5dbff'];`","In a click listener: `const pick = Math.floor(Math.random() * colours.length); screenBox.style.backgroundColor = colours[pick];`"],
  tip:"We named it `screenBox` because `screen` is already a word the browser uses!",
  checks:[[a=>{const s=new Set();for(let i=0;i<25;i++){a.click('#go');s.add(bg(a,'#screen'));}return s.size>=2&&!s.has('rgb(255, 255, 255)');},"Each click on `#go` should paint `#screen` a random colour from your `colours` array."]]}),
 J('f6','Discover them all',{why:"Can you find all 8 facts? Let's track which ones you've discovered.",
  learn:"`discovered.includes(fact)` asks: \"Is this fact already in my list?\" — `true` or `false`.\n`!` means **not**. So `!discovered.includes(fact)` means \"not in the list yet\".\n`discovered.push(fact)` adds it to the end of the list.",
  todo:"Make an empty array `discovered`. On each click, `push` the fact if it's new. Show **Discovered N of 8** in `#found`, or **🏆 You found all 8 facts!** when you have them all.",
  job:"Show **Discovered 1 of 8** (the real numbers) in `#found`. When all are found, show **🏆 You found all 8 facts!**",
  snippet:`const discovered = [];
const foundText = document.querySelector('#found');

goButton.addEventListener('click', function () {
  const fact = factText.textContent;
  if (!discovered.includes(fact)) {
    discovered.push(fact);
  }
  if (discovered.length === facts.length) {
    foundText.textContent = '🏆 You found all ' + facts.length + ' facts!';
  } else {
    foundText.textContent = 'Discovered ' + discovered.length + ' of ' + facts.length;
  }
});`,
  hints:["`const discovered = [];` — empty brackets make an empty list.","`if (!discovered.includes(fact)) { discovered.push(fact); }`","Then: `if (discovered.length === facts.length) { ... 'You found all' ... } else { ... 'Discovered ' + discovered.length + ' of ' + facts.length }`"],
  tip:"Collecting things is what makes games fun. You just made a mini collection game!",
  checks:[clickThen('#go',a=>T(a,'#found').includes('discovered 1 of 8'),"After the first click, `#found` should say **Discovered 1 of 8**."),
   [a=>{clicks(a,'#go',150);return T(a,'#found').includes('found all');},"After seeing every fact, `#found` should say **🏆 You found all 8 facts!**"]]}),
 J('f7','Save favourites',{why:"Some facts are too good to lose. Save them to a list!",
  todo:"When `#save` is clicked, make an `li` with the current fact and append it to `#favs`.",
  job:"When `#save` is clicked, add a new `<li>` with the fact that's on the screen to `#favs`.",
  snippet:FC_V1,
  hints:["Point at `#save` and `#favs`.","In a click listener: `const item = document.createElement('li'); item.textContent = factText.textContent; favList.append(item);`"],
  tip:"Try saving the same fact twice… hmm. We'll fix that next!",
  checks:[[a=>{a.click('#go');a.click('#save');const li=a.$('#favs li');return !!li&&a.text(li)===T(a,'#fact');},"Clicking `#save` should add the current fact as an `<li>` in `#favs`."]]}),
 X('f8','No double saves',[blk(FC_V1,FC_V2)],{why:"Saving the same fact twice (or the 'Press the button' text) is silly. Let's block that.",
  learn:"`return` at the start of a listener is a **bouncer at the door**: if the fact is already saved, or no fact has been shown yet (`lastIndex === -1`), it doesn't get in.",
  todo:"Make an empty array `saved`. In the save listener: if `lastIndex === -1` or `saved.includes(fact)`, `return`. Otherwise `push` it and add the `li`.",
  job:"Don't save a fact twice, and don't save before the first fact. Use `if (lastIndex === -1 || saved.includes(fact)) { return; }`",
  where:"Change your save code (the `saveButton` part) to look like this.",
  snippet:FC_V2,
  hints:["Add `const saved = [];` and at the start of the listener `const fact = factText.textContent;`","`if (lastIndex === -1 || saved.includes(fact)) { return; }` then `saved.push(fact);`"],
  tip:"`||` means \"or\": if EITHER thing is true, the bouncer says no.",
  checks:[clickThen('#save',a=>a.$$('#favs li').length===0,"Before any fact is shown, clicking `#save` should NOT add anything. Check `lastIndex === -1`."),
   [a=>{a.click('#go');a.click('#save');a.click('#save');return a.$$('#favs li').length===1;},"Saving the same fact twice should only add it ONCE. Check `saved.includes(fact)`."]]})
 ]}),

/* ------------------------------------------------------------------ 8 */
P({id:'pj_guess',emoji:'🔮',title:'Guess the Number',mentor:'Wizard Wiggles',
 blurb:'The computer picks a secret number. Can you find it with "too high" and "too low" clues?',
 intro:"Wizard Wiggles has hidden a secret number from 1 to 100 in his crystal ball. Build the game: it gives \"too high\" and \"too low\" clues, counts your guesses, says when you're close, and lets you play again.",
 base:`<div class="game">
  <h1>🔮 Guess the Number</h1>
  <p>I'm thinking of a number from <b>1</b> to <b>100</b>.</p>
  <div class="row">
    <input id="guess" type="number" min="1" max="100" placeholder="?">
    <button id="check">Guess!</button>
  </div>
  <p id="message">Make your first guess!</p>
  <p id="attempts">Guesses: 0</p>
  <p id="past"></p>
  <button id="again" class="hidden">🔁 Play again</button>
</div>

<style>
  body {
    margin: 0;
    padding: 20px 16px;
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;
    background: linear-gradient(160deg, #e5dbff, #d0ebff);
    color: #3b2c6b;
  }
  .game {
    max-width: 380px;
    margin: 0 auto;
    background: white;
    border-radius: 24px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 8px 24px rgba(95, 61, 196, 0.18);
  }
  h1 { margin-top: 0; }
  .row { display: flex; gap: 8px; justify-content: center; }
  #guess {
    width: 110px;
    font: inherit;
    font-size: 26px;
    text-align: center;
    border: 3px solid #b197fc;
    border-radius: 14px;
  }
  ${BTN}
  #check { background: #7950f2; color: white; font-size: 20px; margin: 0; }
  #message { font-size: 20px; font-weight: bold; min-height: 1.2em; }
  #past { color: #868e96; }
  #again { background: #ffd43b; font-weight: bold; }
  .hidden { display: none; }
</style>

<script>
</script>`,
 steps:[
 J('g1','The secret number',{why:"The wizard needs to hide a secret number, and check guesses against it.",
  learn:"`Math.floor(Math.random() * 100) + 1` picks a secret number from **1 to 100**.\n`Number(guessInput.value)` turns what you typed into a real number, so `===` can compare it.",
  todo:"Make `let secret` (1 to 100). Write `checkGuess()`: if the guess `=== secret` show **🎉 You got it!**, else **Nope! Try again.** Run it when `#check` is clicked.",
  job:"Pick a secret number from **1** to **100**. When `#check` is clicked, show **You got it!** if the guess is right, or **Nope! Try again.** if not.",
  snippet:`let secret = Math.floor(Math.random() * 100) + 1;
const guessInput = document.querySelector('#guess');
const checkButton = document.querySelector('#check');
const message = document.querySelector('#message');

${GS_F1}

checkButton.addEventListener('click', checkGuess);`,
  hints:["`let secret = Math.floor(Math.random() * 100) + 1;` and point at `#guess`, `#check` and `#message`.","`function checkGuess() { const guess = Number(guessInput.value); if (guess === secret) { ... } else { ... } }`","`checkButton.addEventListener('click', checkGuess);`"],
  tip:"Without clues this game is really hard. Only 1 in 100 chance! Clues come next.",
  checks:[[a=>{let wins=0;for(let n=1;n<=100;n++){const t=gu(a,n);if(t.includes('got it'))wins++;else if(!t.includes('try again'))return false;}return wins===1;},"Exactly ONE number from 1 to 100 should show **You got it!** — every other guess shows **Nope! Try again.**"]]}),
 X('g2','Too high, too low',[blk(GS_F1,GS_F2)],{why:"Let's be a kind wizard and give clues!",
  learn:"`else if` adds a second question: \"Is it the secret? No? Then is it **bigger** than the secret?\" `>` means \"bigger than\".",
  todo:"Change `checkGuess`: right → **🎉 You got it!** · too big → **📉 Too high!** · too small → **📈 Too low!**",
  job:"Give clues! If the guess is bigger than `secret`, say **Too high!** If it is smaller, say **Too low!**",
  where:"Change your `checkGuess` function to look like this.",
  snippet:GS_F2,
  hints:["`} else if (guess > secret) { message.textContent = '📉 Too high! Try a smaller number.'; }`","`else { message.textContent = '📈 Too low! Try a bigger number.'; }`"],
  tip:"Pro trick: always guess the middle (50, then 25 or 75…). You'll win in 7 guesses or fewer!",
  checks:[[a=>solve(a),"Guesses that are too big should say **Too high!** and guesses that are too small should say **Too low!** — so a clever player can find the secret."]]}),
 X('g3','Count the guesses',[below("const message = document.querySelector('#message');","let attempts = 0;\nconst attemptsText = document.querySelector('#attempts');"),blk(GS_F2,GS_F3)],{why:"How many guesses did you need? Let's keep count.",
  todo:"Make `let attempts = 0;`. In `checkGuess`, add 1 and show **Guesses: N** in `#attempts`.",
  job:"Count every guess. Show **Guesses: 2** (the real number) in `#attempts`.",
  where:"The 2 new lines go at the top. The counting goes at the start of `checkGuess`, under `const guess = ...`.",
  snippet:`let attempts = 0;
const attemptsText = document.querySelector('#attempts');

${GS_F3}`,
  hints:["Top: `let attempts = 0;` and `const attemptsText = document.querySelector('#attempts');`","In `checkGuess`: `attempts = attempts + 1; attemptsText.textContent = 'Guesses: ' + attempts;`"],
  tip:"Challenge a friend: who can find it in the fewest guesses?",
  checks:[[a=>{gu(a,50);gu(a,50);return T(a,'#attempts')==='guesses: 2';},"After 2 guesses, `#attempts` should say **Guesses: 2**."]]}),
 X('g4','Remember the guesses',[below("const attemptsText = document.querySelector('#attempts');","const pastGuesses = [];\nconst pastText = document.querySelector('#past');"),blk(GS_F3,GS_F4)],{why:"Was 30 too high or too low? Let's show every guess so far.",
  learn:"`pastGuesses.push(guess)` adds the guess to the end of the list.\n`pastGuesses.join(', ')` glues the list into one line with commas: `[50, 25]` → `'50, 25'`.",
  todo:"Make an empty array `pastGuesses`. In `checkGuess`, `push` each guess and show **Your guesses: 50, 25** in `#past`.",
  job:"Show all guesses in `#past`, like **Your guesses: 50, 25**. Use `pastGuesses.push(guess)` and `pastGuesses.join(', ')`.",
  where:"The 2 new lines go at the top. The `push` and `join` lines go in `checkGuess`, after the counting.",
  snippet:`const pastGuesses = [];
const pastText = document.querySelector('#past');

${GS_F4}`,
  hints:["Top: `const pastGuesses = [];` and `const pastText = document.querySelector('#past');`","In `checkGuess`: `pastGuesses.push(guess); pastText.textContent = 'Your guesses: ' + pastGuesses.join(', ');`"],
  tip:"`join` is super handy — try `join(' → ')` for arrows instead of commas!",
  checks:[[a=>{gu(a,50);gu(a,25);return T(a,'#past').includes('50, 25');},"After guessing 50 then 25, `#past` should say **Your guesses: 50, 25**."]]}),
 X('g5','Silly guesses',[blk(GS_F4,GS_F5)],{why:"Someone guessed 500! And an empty box counts as 0. Silly guesses shouldn't count.",
  learn:"`||` means **or**. If the box is empty OR the number is below 1 OR above 100, we show a warning and `return` early.",
  todo:"At the start of `checkGuess`: if the box is empty, or the guess is below **1** or above **100**, show **⚠️ Pick a number from 1 to 100!** and `return`.",
  job:"If the guess is empty, below **1** or above **100**, show **Pick a number from 1 to 100!** and `return` — it doesn't count as a guess.",
  where:"In `checkGuess`, right after `const guess = ...` (before the counting).",
  snippet:GS_F5,
  hints:["`if (guessInput.value === '' || guess < 1 || guess > 100) { ... }`","Inside: `message.textContent = '⚠️ Pick a number from 1 to 100!'; return;`"],
  tip:"Putting the check FIRST means silly guesses never reach the counter.",
  checks:[[a=>gu(a,150).includes('from 1 to 100')&&T(a,'#attempts')==='guesses: 0',"Guessing **150** should say **Pick a number from 1 to 100!** and NOT count as a guess."],
   [a=>gu(a,'').includes('from 1 to 100')&&T(a,'#attempts')==='guesses: 0',"An empty box should also say **Pick a number from 1 to 100!**"]]}),
 X('g6','So close!',[blk(GS_F5,GS_F6)],{why:"The wizard feels generous: he'll tell you when you're really close!",
  learn:"`Math.abs()` gives the **distance** between two numbers, without minus signs. `Math.abs(45 - 50)` and `Math.abs(55 - 50)` are both 5.",
  todo:"At the end of `checkGuess`: if the guess is not the secret but `Math.abs(guess - secret) <= 5`, add **🔥 So close!** to the message.",
  job:"If the guess is wrong but 5 or less away from the secret, add **🔥 So close!** to the message. Use `Math.abs(guess - secret) <= 5`.",
  where:"At the end of `checkGuess`, before its last `}`.",
  snippet:GS_F6,
  hints:["`if (guess !== secret && Math.abs(guess - secret) <= 5) { ... }`","Inside: `message.textContent = message.textContent + ' 🔥 So close!';`"],
  tip:"`&&` means \"and\" — BOTH things must be true.",
  checks:[[a=>{const m=[];for(let n=1;n<=100;n++)m.push(gu(a,n));const s=m.findIndex(t=>t.includes('got it'))+1;if(!s)return false;return m.every((t,i)=>{const d=Math.abs(i+1-s);return d===0||(t.includes('so close')===(d<=5));});},"Wrong guesses 5 or less away should add **So close!** — guesses further away should not."]]}),
 X('g7','You win!',[below("const pastText = document.querySelector('#past');","const againButton = document.querySelector('#again');"),blk(GS_F6,GS_F7)],{why:"When you find the number, the game should end — and offer a new round.",
  learn:"`classList.remove('hidden')` shows the Play-again button (the CSS hides `.hidden`).\n`checkButton.disabled = true` locks the Guess button.",
  todo:"Point at `#again`. When the guess is right: remove the class `hidden` from `#again` and set `checkButton.disabled = true`.",
  job:"When you win, show `#again` by removing the class `hidden`, and lock `#check` with `checkButton.disabled = true;`",
  where:"The `againButton` line goes at the top. The 2 new lines go inside the `if (guess === secret)` part.",
  snippet:`const againButton = document.querySelector('#again');

${GS_F7}`,
  hints:["Top: `const againButton = document.querySelector('#again');`","In the win part: `againButton.classList.remove('hidden'); checkButton.disabled = true;`"],
  tip:"Locking the button stops people guessing after they've already won.",
  checks:[[a=>solve(a)&&!a.$('#again').classList.contains('hidden'),"When you win, `#again` should appear. Remove the class `hidden`."],
   [a=>a.$('#check').disabled,"When you win, `#check` should be locked: `checkButton.disabled = true;`"]]}),
 J('g8','Play again',{why:"One more round! The wizard picks a NEW secret.",
  learn:"`pastGuesses.length = 0` empties the list (we can't make a new one, because it's a `const` box).",
  todo:"When `#again` is clicked: pick a new `secret`, set `attempts` to 0, empty `pastGuesses`, reset the words, empty the box, unlock `#check`, and hide `#again`.",
  job:"When `#again` is clicked, pick a new `secret`, show **Guesses: 0**, empty the guesses, unlock `#check`, and add the class `hidden` back to `#again`.",
  snippet:`againButton.addEventListener('click', function () {
  secret = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  pastGuesses.length = 0;
  attemptsText.textContent = 'Guesses: 0';
  pastText.textContent = '';
  message.textContent = 'I picked a new number. Guess!';
  guessInput.value = '';
  checkButton.disabled = false;
  againButton.classList.add('hidden');
});`,
  hints:["`againButton.addEventListener('click', function () { ... });`","Inside: `secret = Math.floor(Math.random() * 100) + 1; attempts = 0; pastGuesses.length = 0;`","Then reset the words, and `checkButton.disabled = false; againButton.classList.add('hidden');`"],
  tip:"This is why `secret` uses `let` — so we can change it for a new game.",
  checks:[[a=>{solve(a);a.click('#again');return T(a,'#attempts')==='guesses: 0'&&!a.$('#check').disabled;},"After clicking `#again`, `#attempts` should say **Guesses: 0** and `#check` should work again."],
   [a=>a.$('#again').classList.contains('hidden')&&T(a,'#past')==='',"After clicking `#again`, hide it again (add the class `hidden`) and empty `#past`."],
   [a=>solve(a),"The new game should work — you should be able to find the new secret."]]}),
 J('g9','Press Enter',{why:"Clicking Guess every time is slow. Let **Enter** do it!",
  learn:"`checkButton.click()` pretends to click the button. If the button is locked (`disabled`), nothing happens — perfect!",
  todo:"Listen for `keydown` on the guess box. If the key is `'Enter'`, call `checkButton.click()`.",
  job:"When someone presses **Enter** in `#guess`, run `checkButton.click()`.",
  snippet:`guessInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    checkButton.click();
  }
});`,
  hints:["`guessInput.addEventListener('keydown', function (event) { ... });`","Inside: `if (event.key === 'Enter') { checkButton.click(); }`"],
  tip:"Now you can play with just the keyboard: type, Enter, type, Enter…",
  checks:[[a=>{a.type('#guess','50');a.key('#guess','Enter');return T(a,'#attempts')==='guesses: 1';},"Typing 50 and pressing **Enter** should make a guess. `#attempts` should say **Guesses: 1**."]]})
 ]}),

/* ------------------------------------------------------------------ 9 */
P({id:'pj_chars',emoji:'💬',title:'Character Counter',mentor:'Pixel, a chatty parrot',
 blurb:'A message box that counts letters and words, warns you near the limit, and posts notes.',
 intro:"Pixel the parrot talks too much! The class noticeboard only allows **100** characters per message. Build a message box that counts every letter as you type, warns you when you're nearly out of room, blocks long messages, counts words, and posts notes to the board.",
 base:`<div class="card">
  <h1>💬 Noticeboard Message</h1>
  <p class="sub">Write a message for the class noticeboard. Keep it under 100 characters!</p>
  <textarea id="message" rows="4" placeholder="Type your message here..."></textarea>
  <div class="bar"><div id="fill"></div></div>
  <div class="stats">
    <span id="count">0 / 100</span>
    <span id="left">100 characters left</span>
    <span id="words">0 words</span>
  </div>
  <button id="post">📌 Post it!</button>
  <button id="clear" class="small">Clear</button>
  <div id="board"></div>
</div>

<style>
  body {
    margin: 0;
    padding: 20px 16px;
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;
    background: #f8f9fa;
    color: #343a40;
  }
  .card {
    max-width: 420px;
    margin: 0 auto;
    background: white;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
  h1 { margin-top: 0; font-size: 26px; }
  .sub { color: #868e96; }
  textarea {
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    font-size: 18px;
    padding: 10px;
    border: 3px solid #b2f2bb;
    border-radius: 14px;
    resize: vertical;
  }
  .bar { height: 10px; background: #e9ecef; border-radius: 99px; overflow: hidden; margin: 8px 0; }
  #fill { height: 100%; width: 0; background: #51cf66; }
  .stats { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 6px; font-size: 14px; color: #495057; }
  #count { font-weight: bold; }
  #count.warning { color: #f08c00; }
  #count.over { color: #e03131; }
  ${BTN}
  #post { background: #40c057; color: white; font-weight: bold; }
  .small { font-size: 14px; }
  #board { display: grid; gap: 8px; margin-top: 12px; }
  .note { background: #fff9db; border-left: 6px solid #fcc419; border-radius: 10px; padding: 10px 12px; }
</style>

<script>
</script>`,
 steps:[
 J('m1','Count every letter',{why:"Squawk! Pixel needs to see how many characters he has typed.",
  learn:"`messageBox.value.length` counts the characters in the box — letters, spaces, everything!\nThe `'input'` event fires **every time** a key is typed, so the count stays up to date.\n`const LIMIT = 100;` — big letters show it's a rule that never changes.",
  todo:"Make `const LIMIT = 100;`. Write `update()` that shows **length / 100** in `#count`. Run it on every `input` in `#message`.",
  job:"As someone types in `#message`, show the count in `#count`, like **5 / 100**. Use `.value.length` and the `'input'` event.",
  snippet:`const LIMIT = 100;
const messageBox = document.querySelector('#message');
${CC_A}

${CC_U1}

messageBox.addEventListener('input', update);`,
  hints:["`const LIMIT = 100;` and point at `#message` and `#count`.","`function update() { const length = messageBox.value.length; countText.textContent = length + ' / ' + LIMIT; }`","`messageBox.addEventListener('input', update);`"],
  tip:"Spaces count as characters too! Try typing just spaces.",
  checks:[[a=>{a.type('#message','hello');return T(a,'#count')==='5 / 100';},"Typing **hello** should show **5 / 100** in `#count`."]]}),
 X('m2','Characters left',[below(CC_A,"const leftText = document.querySelector('#left');"),blk(CC_U1,CC_U2)],{why:"\"How many more can I type?\" is what Pixel really wants to know.",
  todo:"Point at `#left`. In `update`, work out `left = LIMIT - length` and show **N characters left**.",
  job:"Show how many characters are left in `#left`, like **95 characters left**. Use `LIMIT - length`.",
  where:"The `leftText` line goes at the top. The 2 new lines go at the end of `update`.",
  snippet:`const leftText = document.querySelector('#left');

${CC_U2}`,
  hints:["Top: `const leftText = document.querySelector('#left');`","In `update`: `const left = LIMIT - length;` and `leftText.textContent = left + ' characters left';`"],
  tip:"Phones show 'characters left' when you write short messages. Now you know how!",
  checks:[[a=>{a.type('#message','hello');return T(a,'#left')==='95 characters left';},"Typing **hello** should show **95 characters left** in `#left`."]]}),
 X('m3','Warning colour',[blk(CC_U2,CC_U3)],{why:"Pixel never notices when he's nearly out of room. Turn the counter orange!",
  learn:"`classList.toggle('warning', left < 20)` is a toggle with a **rule**: if `left < 20` is true, add the class. If false, remove it.",
  todo:"In `update`, toggle the class `warning` on `#count` when `left < 20`.",
  job:"Turn `#count` orange when fewer than **20** characters are left. Use `countText.classList.toggle('warning', left < 20);`",
  where:"At the end of `update`, before its last `}`.",
  snippet:CC_U3,
  hints:["It's one line at the end of `update`.","`countText.classList.toggle('warning', left < 20);`"],
  tip:"The CSS already has `#count.warning` with an orange colour.",
  checks:[[a=>{a.type('#message','a'.repeat(85));return a.$('#count').classList.contains('warning');},"With 85 characters (15 left), `#count` should have the class `warning`."],
   [a=>{a.type('#message','hi');return !a.$('#count').classList.contains('warning');},"With only 2 characters, the class `warning` should go away."]]}),
 X('m4','Too long!',[below(CC_A,"const postButton = document.querySelector('#post');"),blk(CC_U3,CC_U4)],{why:"Over 100 characters? Turn red and don't let Pixel post it!",
  learn:"`postButton.disabled = left < 0;` — `left < 0` is `true` or `false`, so the button is locked only when the message is too long.",
  todo:"Point at `#post`. In `update`, toggle the class `over` on `#count` when `left < 0`, and set `postButton.disabled = left < 0`.",
  job:"When the message is longer than **100**, add the class `over` to `#count` and lock `#post` with `postButton.disabled = left < 0;`",
  where:"The `postButton` line goes at the top. The 2 new lines go at the end of `update`.",
  snippet:`const postButton = document.querySelector('#post');

${CC_U4}`,
  hints:["Top: `const postButton = document.querySelector('#post');`","In `update`: `countText.classList.toggle('over', left < 0);` and `postButton.disabled = left < 0;`"],
  tip:"Try typing too much in the preview — watch the button go grey.",
  checks:[[a=>{a.type('#message','a'.repeat(110));return a.$('#count').classList.contains('over')&&a.$('#post').disabled;},"With 110 characters, `#count` should get the class `over` and `#post` should be disabled."],
   [a=>{a.type('#message','hi');return !a.$('#post').disabled&&!a.$('#count').classList.contains('over');},"With a short message, `#post` should work again and `over` should go away."]]}),
 X('m5','Fill-up bar',[below(CC_A,"const fill = document.querySelector('#fill');"),blk(CC_U4,CC_U5)],{why:"A bar that fills up is easier to see than numbers.",
  learn:"`length / LIMIT * 100` turns the count into a **percent**: 50 out of 100 → 50%.\n`Math.min(..., 100)` means \"never more than 100\" — so the bar doesn't spill out.",
  todo:"Point at `#fill`. In `update`, set its `style.width` to the percent (max 100) plus `'%'`.",
  job:"Make the green bar `#fill` grow. Set `fill.style.width` to `length / LIMIT * 100` with `'%'` on the end (never more than **100**).",
  where:"The `fill` line goes at the top. The 2 new lines go at the end of `update`.",
  snippet:`const fill = document.querySelector('#fill');

${CC_U5}`,
  hints:["Top: `const fill = document.querySelector('#fill');`","In `update`: `const percent = Math.min(length / LIMIT * 100, 100);` and `fill.style.width = percent + '%';`"],
  tip:"Progress bars are everywhere: downloads, games, battery icons…",
  checks:[[a=>{a.type('#message','a'.repeat(50));const f=a.$('#fill');return !!f&&Math.abs(f.offsetWidth/f.parentElement.clientWidth-0.5)<0.03;},"With 50 characters, `#fill` should be half full (`50%` wide)."],
   [a=>{a.type('#message','a'.repeat(150));const f=a.$('#fill');return Math.abs(f.offsetWidth/f.parentElement.clientWidth-1)<0.03;},"With 150 characters, `#fill` should stop at **100%**. Use `Math.min(..., 100)`."]]}),
 X('m6','Count the words',[below(CC_A,"const wordsText = document.querySelector('#words');"),blk(CC_U5,CC_U6)],{why:"Pixel's teacher asks for \"at least 5 words\". Let's count them!",
  learn:"`.split(' ')` **cuts** the text at every space, like scissors: `'I love code'` → `['I', 'love', 'code']`.\nTwo spaces in a row leave an empty bit `''`, so `.filter(...)` throws empty bits away.",
  todo:"Point at `#words`. In `update`, split the text at spaces, filter out empty bits, and show **N words**.",
  job:"Count the words and show them in `#words`, like **3 words**. Use `.split(' ')` and `.filter` to skip empty bits.",
  where:"The `wordsText` line goes at the top. The new lines go at the end of `update`.",
  snippet:`const wordsText = document.querySelector('#words');

${CC_U6}`,
  hints:["Top: `const wordsText = document.querySelector('#words');`","In `update`: `const words = messageBox.value.split(' ').filter(function (word) { return word !== ''; });`","Then: `wordsText.textContent = words.length + ' words';`"],
  tip:"`filter` keeps only the things where your little function says `true`.",
  checks:[[a=>{a.type('#message','I love  code ');return T(a,'#words')==='3 words';},"Typing **I love  code** (with extra spaces) should show **3 words**."]]}),
 J('m7','Post it!',{why:"Time to stick Pixel's message on the noticeboard!",
  todo:"Point at `#board`. When `#post` is clicked, make a `div` with class `note` and the message, `prepend` it to the board, empty the box, and call `update()`.",
  job:"When `#post` is clicked, add a `<div class=\"note\">` with the message to `#board`. Then empty `#message` and run `update()`.",
  snippet:`const board = document.querySelector('#board');

${CC_P1}`,
  hints:["`const board = document.querySelector('#board');` and a click listener on `postButton`.","Inside: `const note = document.createElement('div'); note.className = 'note'; note.textContent = messageBox.value; board.prepend(note);`","Then: `messageBox.value = ''; update();`"],
  tip:"Calling `update()` makes the counter go back to 0 / 100 after posting.",
  checks:[[a=>{a.type('#message','Hi class');a.click('#post');const n=a.$('#board .note');return !!n&&a.text(n)==='hi class';},"Clicking `#post` should add a `<div class=\"note\">` with the message to `#board`."],
   [a=>val(a,'#message')===''&&T(a,'#count')==='0 / 100',"After posting, `#message` should be empty and `#count` should say **0 / 100**. Call `update()`."]]}),
 X('m8','No empty notes',[blk(CC_P1,CC_P2)],{why:"Clicking Post with nothing typed makes an empty note. Boring!",
  todo:"At the start of the post listener: if the trimmed message is `''`, `return`.",
  job:"Don't post empty messages. At the start of the post listener add `if (messageBox.value.trim() === '') { return; }`",
  where:"At the start of your `postButton` click listener.",
  snippet:CC_P2,
  hints:["`.trim()` removes spaces at both ends.","`if (messageBox.value.trim() === '') { return; }`"],
  tip:"Guard checks at the top of a function keep the rest of your code simple.",
  checks:[[a=>{a.click('#post');a.type('#message','   ');a.click('#post');return a.$$('#board .note').length===0;},"Clicking `#post` with an empty box (or only spaces) should NOT add a note."]]}),
 J('m9','Clear button',{why:"Pixel changed his mind. One click should wipe the message.",
  todo:"When `#clear` is clicked, empty `#message` and call `update()`.",
  job:"When `#clear` is clicked, empty `#message` with `messageBox.value = '';` and run `update()`.",
  snippet:`const clearButton = document.querySelector('#clear');

clearButton.addEventListener('click', function () {
  messageBox.value = '';
  update();
});`,
  hints:["`const clearButton = document.querySelector('#clear');` and a click listener.","Inside: `messageBox.value = ''; update();`"],
  tip:"Changing `.value` with code does NOT fire the `input` event — that's why we call `update()` ourselves.",
  checks:[[a=>{a.type('#message','abc');a.click('#clear');return val(a,'#message')==='';},"Clicking `#clear` should empty `#message`."],
   [a=>T(a,'#left')==='100 characters left',"After clearing, `#left` should say **100 characters left**. Call `update()`."]]})
 ]}),

/* ------------------------------------------------------------------ 10 */
P({id:'pj_temp',emoji:'🌡️',title:'Temperature Converter',mentor:'Sunny, a weather bear',
 blurb:'Type °C or °F and the other box updates — plus a thermometer and a "how it feels" message.',
 intro:"Sunny the bear reads weather reports from all over the world. Some say °C, some say °F! Build a converter where typing in either box updates the other. You'll write your own **functions that give back answers**.",
 base:`<div class="conv">
  <h1>🌡️ Temperature Converter</h1>
  <div class="row">
    <div class="box">
      <label for="c">Celsius °C</label>
      <input id="c" type="number">
    </div>
    <span class="arrows">⇄</span>
    <div class="box">
      <label for="f">Fahrenheit °F</label>
      <input id="f" type="number">
    </div>
  </div>
  <p id="feel">Type a temperature!</p>
  <p id="kelvin"></p>
  <div class="thermo"><div id="mercury"></div></div>
  <div class="presets">
    <button class="preset" data-c="0">🧊 Freezing</button>
    <button class="preset" data-c="37">🤒 Body</button>
    <button class="preset" data-c="100">♨️ Boiling</button>
  </div>
</div>

<style>
  body {
    margin: 0;
    padding: 20px 16px;
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;
    background: linear-gradient(180deg, #e3fafc, #fff9db);
    color: #0b4f5c;
  }
  .conv {
    max-width: 420px;
    margin: 0 auto;
    background: white;
    border-radius: 24px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 8px 24px rgba(21, 170, 191, 0.18);
  }
  h1 { margin-top: 0; font-size: 26px; }
  .row { display: flex; align-items: flex-end; gap: 8px; }
  .box { flex: 1; min-width: 0; }
  label { display: block; font-weight: bold; margin-bottom: 4px; }
  input {
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    font-size: 24px;
    text-align: center;
    padding: 8px;
    border: 3px solid #99e9f2;
    border-radius: 14px;
  }
  .arrows { font-size: 28px; padding-bottom: 8px; }
  #feel { font-size: 22px; font-weight: bold; }
  #kelvin { color: #868e96; min-height: 1em; }
  .thermo {
    width: 34px;
    height: 140px;
    margin: 10px auto;
    background: #f1f3f5;
    border: 3px solid #ced4da;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    align-items: flex-end;
  }
  #mercury { width: 100%; height: 14%; background: linear-gradient(#ff8787, #fa5252); }
  ${BTN}
  .preset { background: #e3fafc; }
</style>

<script>
</script>`,
 steps:[
 J('c1','A function that answers',{why:"Before we touch the boxes, let's teach JavaScript the maths.",
  learn:"A function with `return` is a **vending machine**: you put something in, it gives something back.\n`toFahrenheit(100)` puts in 100, and `return celsius * 9 / 5 + 32;` gives back **212**.\n`console.log(...)` prints a message for programmers to see (in the browser's console).",
  todo:"Write `toFahrenheit(celsius)` that returns `celsius * 9 / 5 + 32`. Then `console.log(toFahrenheit(100));`",
  job:"Write a function `toFahrenheit` that returns `celsius * 9 / 5 + 32`. Test it with `console.log(toFahrenheit(100));` — it should print **212**.",
  snippet:`function toFahrenheit(celsius) {
  return celsius * 9 / 5 + 32;
}

console.log(toFahrenheit(100));`,
  hints:["`function toFahrenheit(celsius) { return celsius * 9 / 5 + 32; }`","Then on its own line: `console.log(toFahrenheit(100));`"],
  tip:"Water boils at 100 °C, which is 212 °F. Your function knows that now!",
  checks:[[a=>a.logs.some(l=>String(l).trim()==='212'),"`console.log(toFahrenheit(100));` should print **212**. Check the maths: `celsius * 9 / 5 + 32`."]]}),
 J('c2','Celsius → Fahrenheit',{why:"Now let's use the function! Typing in the °C box should fill the °F box.",
  learn:"`fInput.value = ...` puts a number **into** a box, like writing in it for you.\nIf the °C box is empty, we empty the °F box too and `return`.",
  todo:"Write `updateFromC()`: if `#c` is empty, empty `#f` and return. Otherwise set `#f` to `toFahrenheit(Number(cInput.value))`. Run it on every `input` in `#c`.",
  job:"When someone types in `#c`, put the answer of `toFahrenheit` into `#f`. Typing **100** shows **212**. If `#c` is empty, empty `#f`.",
  snippet:`const cInput = document.querySelector('#c');
const fInput = document.querySelector('#f');

function updateFromC() {
  if (cInput.value === '') {
    fInput.value = '';
    return;
  }
  fInput.value = toFahrenheit(Number(cInput.value));
}

cInput.addEventListener('input', updateFromC);`,
  hints:["Point at `#c` and `#f`.","`function updateFromC() { if (cInput.value === '') { fInput.value = ''; return; } fInput.value = toFahrenheit(Number(cInput.value)); }`","`cInput.addEventListener('input', updateFromC);`"],
  tip:"One function (the maths) used by another function (the box updater). Functions are LEGO bricks!",
  checks:[[a=>{a.type('#c','100');return val(a,'#f')==='212';},"Typing **100** in `#c` should put **212** in `#f`."],
   [a=>{a.type('#c','0');return val(a,'#f')==='32';},"Typing **0** in `#c` should put **32** in `#f`."],
   [a=>{a.type('#c','');return val(a,'#f')==='';},"Emptying `#c` should empty `#f` too."]]}),
 J('c3','Fahrenheit → Celsius',{why:"Now the other way round — that's what makes it a two-way converter!",
  learn:"The opposite maths: take away 32 first, then times 5 divided by 9. The brackets `( )` make the take-away happen **first**.",
  todo:"Write `toCelsius(fahrenheit)` returning `(fahrenheit - 32) * 5 / 9`, and `updateFromF()` that fills `#c`. Run it on every `input` in `#f`.",
  job:"Write `toCelsius` that returns `(fahrenheit - 32) * 5 / 9`. When someone types in `#f`, fill `#c`. Typing **212** shows **100**.",
  snippet:`function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function updateFromF() {
  if (fInput.value === '') {
    cInput.value = '';
    return;
  }
  cInput.value = toCelsius(Number(fInput.value));
}

fInput.addEventListener('input', updateFromF);`,
  hints:["`function toCelsius(fahrenheit) { return (fahrenheit - 32) * 5 / 9; }`","`updateFromF` is just like `updateFromC`, but with the boxes swapped and `toCelsius`.","`fInput.addEventListener('input', updateFromF);`"],
  tip:"Try typing 50 °F. Ugly decimals! We'll fix that next.",
  checks:[[a=>{a.type('#f','212');return val(a,'#c')==='100';},"Typing **212** in `#f` should put **100** in `#c`."],
   [a=>{a.type('#f','32');return val(a,'#c')==='0';},"Typing **32** in `#f` should put **0** in `#c`."]]}),
 J('c4','Round it',{why:"100 °F shows 37.77777777. Nobody talks like that! Let's round to one decimal.",
  learn:"`Math.round()` rounds to a whole number. To keep **one** decimal: times 10, round, divide by 10.\n37.777 → 377.77 → 378 → **37.8**.",
  todo:"Write `round(number)` that returns `Math.round(number * 10) / 10`. Use it in both `return` lines: `return round(...)`.",
  job:"Write a `round` function: `return Math.round(number * 10) / 10;`. Use it in `toFahrenheit` and `toCelsius`. **100** °F shows **37.8**.",
  kind:'edit',where:"Add the `round` function at the end of your script. Then change the `return` lines in `toFahrenheit` and `toCelsius`.",
  apply:c=>{const d=swap([['return celsius * 9 / 5 + 32;','return round(celsius * 9 / 5 + 32);'],['return (fahrenheit - 32) * 5 / 9;','return round((fahrenheit - 32) * 5 / 9);']])(c);return d===c?c:PK.insJS(d,TC_ROUND);},
  snippet:`${TC_ROUND}

// and change the two return lines:
return round(celsius * 9 / 5 + 32);
return round((fahrenheit - 32) * 5 / 9);`,
  hints:["`function round(number) { return Math.round(number * 10) / 10; }`","Wrap the maths: `return round(celsius * 9 / 5 + 32);` and `return round((fahrenheit - 32) * 5 / 9);`"],
  tip:"You can put a function call INSIDE another one — like boxes inside boxes.",
  checks:[[a=>{a.type('#f','100');return val(a,'#c')==='37.8';},"Typing **100** in `#f` should show **37.8** in `#c`. Use `round` in `toCelsius`."],
   [a=>{a.type('#c','37.77');return val(a,'#f')==='100';},"Typing **37.77** in `#c` should show **100** in `#f`. Use `round` in `toFahrenheit` too."]]}),
 J('c5','How does it feel?',{why:"Numbers are hard for little bears. Tell Sunny if it's cold or hot!",
  learn:"A ladder of `else if` checks goes from cold to hot. JavaScript climbs it and stops at the **first** true one.\nWe listen on **both** boxes. Our new listener comes after the converter, so `#c` is already updated.",
  todo:"Write `showFeel()` reading `#c`: below **0** → **Freezing! 🥶**, below **15** → **Chilly 🧥**, below **25** → **Just right 😊**, below **35** → **Warm ☀️**, else **Super hot! 🔥**. Run it on `input` in both boxes.",
  job:"Show how it feels in `#feel`: below 0 **Freezing!**, below 15 **Chilly**, below 25 **Just right**, below 35 **Warm**, else **Super hot!**. Listen on both boxes.",
  snippet:`const feelText = document.querySelector('#feel');

function showFeel() {
  if (cInput.value === '') {
    feelText.textContent = 'Type a temperature!';
    return;
  }
  const c = Number(cInput.value);
  if (c < 0) {
    feelText.textContent = 'Freezing! 🥶';
  } else if (c < 15) {
    feelText.textContent = 'Chilly 🧥';
  } else if (c < 25) {
    feelText.textContent = 'Just right 😊';
  } else if (c < 35) {
    feelText.textContent = 'Warm ☀️';
  } else {
    feelText.textContent = 'Super hot! 🔥';
  }
}

cInput.addEventListener('input', showFeel);
fInput.addEventListener('input', showFeel);`,
  hints:["`const feelText = document.querySelector('#feel');` then `function showFeel() { const c = Number(cInput.value); ... }`","`if (c < 0) { ... } else if (c < 15) { ... } else if (c < 25) { ... } else if (c < 35) { ... } else { ... }`","Two listeners at the end: `cInput.addEventListener('input', showFeel);` and the same for `fInput`."],
  tip:"Change the words to match where YOU live. 25 °C might be 'cold' for a desert lizard!",
  checks:[[a=>{a.type('#c','30');return T(a,'#feel').includes('warm');},"Typing **30** in `#c` should show **Warm ☀️** in `#feel`."],
   [a=>{a.type('#c','20');return T(a,'#feel').includes('just right');},"Typing **20** in `#c` should show **Just right 😊**."],
   [a=>{a.type('#f','14');return T(a,'#feel').includes('freezing');},"Typing **14** in `#f` (that's -10 °C) should show **Freezing! 🥶**. Listen on `#f` too."]]}),
 J('c6','The thermometer',{why:"Let's make the red thermometer go up and down!",
  learn:"Our thermometer goes from **-20 °C** (empty) to **120 °C** (full). `(c + 20) / 140 * 100` turns a temperature into a percent.\n`Math.max(0, Math.min(100, percent))` keeps it between 0 and 100 — no overflowing!",
  todo:"Write `showMercury()` that sets `#mercury`'s `style.height` to the percent + `'%'`. Run it on `input` in both boxes.",
  job:"Make `#mercury` grow. Set `mercury.style.height` to `(c + 20) / 140 * 100` plus `'%'`, kept between **0** and **100**. **50** °C = half full.",
  snippet:`const mercury = document.querySelector('#mercury');

function showMercury() {
  const c = Number(cInput.value);
  let percent = (c + 20) / 140 * 100;
  percent = Math.max(0, Math.min(100, percent));
  mercury.style.height = percent + '%';
}

cInput.addEventListener('input', showMercury);
fInput.addEventListener('input', showMercury);`,
  hints:["`const mercury = document.querySelector('#mercury');`","`let percent = (c + 20) / 140 * 100; percent = Math.max(0, Math.min(100, percent)); mercury.style.height = percent + '%';`","Listen on both boxes, like `showFeel`."],
  tip:"Type 500 — the mercury stops at the top instead of breaking out!",
  checks:[[a=>{a.type('#c','50');const m=a.$('#mercury');return !!m&&Math.abs(m.offsetHeight/m.parentElement.clientHeight-0.5)<0.03;},"Typing **50** in `#c` should make `#mercury` half full (`50%`)."],
   [a=>{a.type('#c','500');const m=a.$('#mercury');return Math.abs(m.offsetHeight/m.parentElement.clientHeight-1)<0.03;},"Typing **500** should fill it to **100%** and no more. Use `Math.min(100, percent)`."]]}),
 J('c7','Preset buttons',{why:"Sunny wants quick buttons: freezing water, body temperature, boiling water.",
  learn:"`cInput.dispatchEvent(new Event('input'))` **pretends someone typed** in the box. Then ALL the box's listeners run: the converter, the feeling and the thermometer!",
  todo:"For each `.preset` button: on click, set `cInput.value` to `button.dataset.c`, then `cInput.dispatchEvent(new Event('input'))`.",
  job:"Make the 3 preset buttons work. Put `button.dataset.c` into `#c`, then run `cInput.dispatchEvent(new Event('input'));`",
  snippet:`document.querySelectorAll('.preset').forEach(function (button) {
  button.addEventListener('click', function () {
    cInput.value = button.dataset.c;
    cInput.dispatchEvent(new Event('input'));
  });
});`,
  hints:["`document.querySelectorAll('.preset').forEach(function (button) { ... });`","Inside: a click listener with `cInput.value = button.dataset.c;` and `cInput.dispatchEvent(new Event('input'));`"],
  tip:"Body temperature is 37 °C. What is it in °F? Click and see!",
  checks:[[a=>{a.click('.preset[data-c="100"]');return val(a,'#c')==='100'&&val(a,'#f')==='212';},"Clicking **♨️ Boiling** should put **100** in `#c` and **212** in `#f`."],
   [a=>T(a,'#feel').includes('super hot'),"After clicking **Boiling**, `#feel` should say **Super hot! 🔥**. Use `dispatchEvent(new Event('input'))`."]]}),
 J('c8','A third scale',{why:"Scientists use a third scale: **Kelvin**. Let's show that too!",
  learn:"Kelvin is just Celsius **plus 273.15**. 0 °C = 273.15 K. Nothing can ever be colder than 0 K!",
  todo:"Write `showKelvin()`: if `#c` is empty show nothing, else show **That is N Kelvin** with `Number(cInput.value) + 273.15`. Run it on `input` in both boxes.",
  job:"Show the Kelvin temperature in `#kelvin`, like **That is 273.15 Kelvin**. Kelvin = Celsius **+ 273.15**.",
  snippet:`const kelvinText = document.querySelector('#kelvin');

function showKelvin() {
  if (cInput.value === '') {
    kelvinText.textContent = '';
    return;
  }
  kelvinText.textContent = 'That is ' + (Number(cInput.value) + 273.15) + ' Kelvin';
}

cInput.addEventListener('input', showKelvin);
fInput.addEventListener('input', showKelvin);`,
  hints:["`const kelvinText = document.querySelector('#kelvin');`","`kelvinText.textContent = 'That is ' + (Number(cInput.value) + 273.15) + ' Kelvin';`","Don't forget both listeners at the end."],
  tip:"You built a real science tool! Show it to your teacher.",
  checks:[[a=>{a.type('#c','0');return T(a,'#kelvin').includes('273.15');},"Typing **0** in `#c` should show **That is 273.15 Kelvin** in `#kelvin`."],
   [a=>{a.type('#f','212');return T(a,'#kelvin').includes('373.15');},"Typing **212** in `#f` should show **373.15** Kelvin. Listen on `#f` too."]]})
 ]}),

/* ------------------------------------------------------------------ 11 */
P({id:'pj_slides',emoji:'🖼️',title:'Emoji Slideshow',mentor:'Tilly, a travelling turtle',
 blurb:'Flip through emoji postcards with arrows, dots, the keyboard and auto-play.',
 intro:"Tilly the turtle travelled the world and sent back emoji postcards. Build a slideshow to show them off: next and back buttons that loop round, a slide number, little dots you can click, arrow keys and an auto-play button.",
 base:`<div class="show">
  <h1>🖼️ Tilly's Travels</h1>
  <div class="stage">
    <button id="prev" class="arrow" aria-label="Previous">◀</button>
    <div class="slide">
      <div id="emoji">🐢</div>
      <p id="caption">Press the arrows!</p>
    </div>
    <button id="next" class="arrow" aria-label="Next">▶</button>
  </div>
  <p id="number">1 / 6</p>
  <div id="dots"></div>
  <button id="play">▶ Auto-play</button>
</div>

<style>
  body {
    margin: 0;
    padding: 20px 16px;
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;
    background: linear-gradient(160deg, #fff4e6, #e6fcf5);
    color: #3d3021;
  }
  .show {
    max-width: 420px;
    margin: 0 auto;
    background: white;
    border-radius: 24px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
  h1 { margin-top: 0; font-size: 26px; }
  .stage { display: flex; align-items: center; justify-content: space-between; gap: 6px; }
  .slide {
    flex: 1;
    background: #fff9db;
    border-radius: 20px;
    padding: 16px 8px;
  }
  #emoji { font-size: 80px; }
  #caption { font-size: 18px; font-weight: bold; margin: 6px 0 0; }
  ${BTN}
  .arrow { background: #ffd43b; font-size: 20px; padding: 10px 14px; margin: 0; }
  #number { color: #868e96; }
  #dots { display: flex; justify-content: center; gap: 6px; min-height: 16px; }
  .dot { width: 14px; height: 14px; padding: 0; margin: 0; background: #dee2e6; box-shadow: none; }
  .dot.active { background: #fd7e14; }
  #play { background: #38d9a9; color: white; margin-top: 12px; }
</style>

<script>
</script>`,
 steps:[
 J('s1','The postcards',{why:"First, store Tilly's postcards and show the first one.",
  learn:"Each postcard is an **object** with two labelled parts: `{ emoji: '🌅', caption: 'Sunrise over the sea' }`.\n`index` is a **bookmark** — it remembers which postcard we're looking at. 0 = the first.",
  todo:"Make the `slides` array (6 postcards) and `let index = 0;`. Write `showSlide()` that shows `slides[index].emoji` in `#emoji` and `.caption` in `#caption`. Call it.",
  job:"Make a `slides` array. Show the first postcard: 🌅 in `#emoji` and **Sunrise over the sea** in `#caption`.",
  snippet:`const slides = [
${SL.map(([e,c])=>`  { emoji: '${e}', caption: '${c}' }`).join(',\n')}
];
let index = 0;
const emojiBox = document.querySelector('#emoji');
const captionText = document.querySelector('#caption');

${SL_S1}

showSlide();`,
  hints:["Each slide: `{ emoji: '🌅', caption: 'Sunrise over the sea' }` with commas between them.","`function showSlide() { emojiBox.textContent = slides[index].emoji; captionText.textContent = slides[index].caption; }`","Then call it: `showSlide();`"],
  tip:"Swap in places YOU want to visit! Keep the sunrise first for now.",
  checks:[hasText('#caption','sunrise over the sea',"`#caption` should show the first caption: **Sunrise over the sea**."),[a=>a.$('#emoji').textContent.includes('🌅'),"`#emoji` should show the first emoji: 🌅"]]}),
 J('s2','Next button',{why:"Let's flip to the next postcard!",
  todo:"Write `nextSlide()` that adds 1 to `index` and calls `showSlide()`. Run it when `#next` is clicked.",
  job:"When `#next` is clicked, add 1 to `index` and run `showSlide()`. Put it in a function called `nextSlide`.",
  snippet:`const nextButton = document.querySelector('#next');

${SL_N1}

nextButton.addEventListener('click', nextSlide);`,
  hints:["`function nextSlide() { index = index + 1; showSlide(); }`","`nextButton.addEventListener('click', nextSlide);`"],
  tip:"Click ▶ six times in the preview… uh oh. What happens at the end?",
  checks:[clickThen('#next',a=>T(a,'#caption')==='snowy mountains',"Clicking `#next` should show the 2nd postcard: **Snowy mountains**.")]}),
 X('s3','Loop around',[blk(SL_N1,SL_N2)],{why:"After the last postcard it breaks — there is no postcard number 6! Let's loop back to the start.",
  learn:"`%` gives the **leftover** after sharing. Think of a clock: after 12 comes 1 again.\nWith 6 slides: `(5 + 1) % 6` is **0** → back to the first!",
  todo:"In `nextSlide`, change the maths to `index = (index + 1) % slides.length;`",
  job:"Make the slideshow loop. In `nextSlide` use `index = (index + 1) % slides.length;` so after the last postcard comes the first.",
  where:"Inside your `nextSlide` function — change the `index = ...` line.",
  snippet:SL_N2,
  hints:["Only one line changes.","`index = (index + 1) % slides.length;`"],
  tip:"`%` is the secret behind every carousel, clock and looping game level.",
  checks:[[a=>{clicks(a,'#next',6);return T(a,'#caption')==='sunrise over the sea';},"After clicking `#next` 6 times, it should loop back to **Sunrise over the sea**. Use `% slides.length`."]]}),
 J('s4','Back button',{why:"Oops, went too far! Tilly needs a back button too.",
  learn:"Going back from 0 would give -1. Adding `slides.length` first stops that: `(0 - 1 + 6) % 6` = **5** → the last postcard!",
  todo:"Write `prevSlide()` with `index = (index - 1 + slides.length) % slides.length;` then `showSlide()`. Run it when `#prev` is clicked.",
  job:"When `#prev` is clicked, go back one. Use `index = (index - 1 + slides.length) % slides.length;` in a function called `prevSlide`.",
  snippet:`const prevButton = document.querySelector('#prev');

function prevSlide() {
  index = (index - 1 + slides.length) % slides.length;
  showSlide();
}

prevButton.addEventListener('click', prevSlide);`,
  hints:["`function prevSlide() { index = (index - 1 + slides.length) % slides.length; showSlide(); }`","`prevButton.addEventListener('click', prevSlide);`"],
  tip:"From the first postcard, ◀ jumps to the last one. Round and round!",
  checks:[clickThen('#prev',a=>T(a,'#caption')==='stars at night',"Clicking `#prev` on the first postcard should loop to the last one: **Stars at night**.")]}),
 X('s5','Slide number',[below("const captionText = document.querySelector('#caption');","const numberText = document.querySelector('#number');"),blk(SL_S1,SL_S2)],{why:"Where are we? Show **3 / 6** under the postcard.",
  learn:"`index` starts at 0, but people count from 1. So we show `index + 1`.",
  todo:"Point at `#number`. In `showSlide`, show `(index + 1) + ' / ' + slides.length`.",
  job:"Show the slide number in `#number`, like **3 / 6**. Use `(index + 1) + ' / ' + slides.length`.",
  where:"The `numberText` line goes at the top. The new line goes at the end of `showSlide`.",
  snippet:`const numberText = document.querySelector('#number');

${SL_S2}`,
  hints:["Top: `const numberText = document.querySelector('#number');`","In `showSlide`: `numberText.textContent = (index + 1) + ' / ' + slides.length;`"],
  tip:"Because `showSlide` does ALL the showing, both buttons update the number for free.",
  checks:[[a=>{clicks(a,'#next',2);return T(a,'#number')==='3 / 6';},"After 2 clicks on `#next`, `#number` should say **3 / 6**."]]}),
 J('s6','The dots',{why:"Little dots show how many postcards there are.",
  learn:"`slides.forEach(function (slide, i) { ... })` visits each slide. `i` is its number (0, 1, 2…).\nWe make one `button` per slide. The first one starts with the class `active`.",
  todo:"Point at `#dots`. For each slide, create a `button` with class `dot` and append it. Give the first one (`i === index`) the class `active`.",
  job:"Make one dot for every slide inside `#dots`: a `button` with the class `dot`. The first dot also gets the class `active`.",
  snippet:`const dotsBox = document.querySelector('#dots');

slides.forEach(function (slide, i) {
  const dot = document.createElement('button');
  dot.className = 'dot';
  dot.setAttribute('aria-label', 'Slide ' + (i + 1));
  if (i === index) {
    dot.classList.add('active');
  }
  dotsBox.append(dot);
});`,
  hints:["`slides.forEach(function (slide, i) { const dot = document.createElement('button'); dot.className = 'dot'; ... });`","`if (i === index) { dot.classList.add('active'); }` then `dotsBox.append(dot);`"],
  tip:"`aria-label` tells screen readers what the dot is — kind coding for everyone.",
  checks:[[a=>a.$$('#dots .dot').length===6,"`#dots` should have 6 buttons with the class `dot` — one per slide."],
   [a=>{const d=a.$$('#dots .dot');return d.length&&d[0].classList.contains('active');},"The first dot should have the class `active`."]]}),
 X('s7','Light up the dot',[blk(SL_S2,SL_S3)],{why:"The orange dot should follow the postcard.",
  learn:"`dot.classList.toggle('active', i === index)` — add `active` only to the dot whose number matches `index`. All the others lose it.",
  todo:"In `showSlide`, loop over every `.dot` and `toggle('active', i === index)`.",
  job:"In `showSlide`, give only the current dot the class `active`. Use `dot.classList.toggle('active', i === index);`",
  where:"At the end of `showSlide`, before its last `}`.",
  snippet:SL_S3,
  hints:["`document.querySelectorAll('.dot').forEach(function (dot, i) { ... });`","Inside: `dot.classList.toggle('active', i === index);`"],
  tip:"Toggle with a rule is perfect for 'only one is chosen' things.",
  checks:[[a=>{a.click('#next');const d=a.$$('#dots .dot');return d.length===6&&d[1].classList.contains('active')&&!d[0].classList.contains('active');},"After clicking `#next`, ONLY the 2nd dot should have the class `active`."]]}),
 J('s8','Click a dot',{why:"Jump straight to any postcard by clicking its dot!",
  todo:"For each `.dot` (with its number `i`): on click, set `index = i` and call `showSlide()`.",
  job:"When a dot is clicked, jump to that slide: set `index = i;` and run `showSlide()`.",
  snippet:`document.querySelectorAll('.dot').forEach(function (dot, i) {
  dot.addEventListener('click', function () {
    index = i;
    showSlide();
  });
});`,
  hints:["`document.querySelectorAll('.dot').forEach(function (dot, i) { ... });`","Inside: `dot.addEventListener('click', function () { index = i; showSlide(); });`"],
  tip:"The dot remembers its own `i` — every dot has its own little memory.",
  checks:[[a=>{const d=a.$$('#dots .dot');if(d.length<4)return false;a.click(d[3]);return T(a,'#caption')==='a smoky volcano'&&T(a,'#number')==='4 / 6';},"Clicking the 4th dot should jump to slide **4 / 6** (**A smoky volcano**)."]]}),
 J('s9','Auto-play',{why:"Tilly wants to sit back and watch. Let the slides move by themselves!",
  learn:"`setInterval(nextSlide, 2000)` calls `nextSlide` every 2 seconds, like a ticking clock.\n`clearInterval(autoTimer)` stops it. We keep `null` in the box when it's not running.",
  todo:"When `#play` is clicked: if `autoTimer` is `null`, start `setInterval(nextSlide, 2000)` and show **⏸ Pause**. Else `clearInterval`, set it to `null`, and show **▶ Auto-play**.",
  job:"When `#play` is clicked, start moving every **2000** ms with `setInterval(nextSlide, 2000)` and show **Pause**. Click again to stop and show **Auto-play**.",
  snippet:`const playButton = document.querySelector('#play');
let autoTimer = null;

playButton.addEventListener('click', function () {
  if (autoTimer === null) {
    autoTimer = setInterval(nextSlide, 2000);
    playButton.textContent = '⏸ Pause';
  } else {
    clearInterval(autoTimer);
    autoTimer = null;
    playButton.textContent = '▶ Auto-play';
  }
});`,
  hints:["`let autoTimer = null;` then a click listener on `#play`.","Start: `autoTimer = setInterval(nextSlide, 2000); playButton.textContent = '⏸ Pause';`","Stop: `clearInterval(autoTimer); autoTimer = null; playButton.textContent = '▶ Auto-play';`"],
  tip:"Look — we gave `setInterval` the `nextSlide` function. Functions can be passed around like toys!",
  checks:[[async a=>{fast(a);a.click('#play');await a.wait(200);return T(a,'#play').includes('pause')&&T(a,'#caption')!=='sunrise over the sea';},"Clicking `#play` should say **Pause** and move the slides by themselves. Use `setInterval(nextSlide, 2000)`."],
   [async a=>{a.click('#play');const t=T(a,'#caption');await a.wait(150);return T(a,'#play').includes('auto-play')&&T(a,'#caption')===t;},"Clicking `#play` again should stop the slides and say **Auto-play**. Use `clearInterval`."]]}),
 J('s10','Arrow keys',{why:"Real slideshows work with the keyboard arrows.",
  todo:"Listen for `keydown` on `document`. `'ArrowRight'` → `nextSlide()`, `'ArrowLeft'` → `prevSlide()`.",
  job:"Pressing the **→** key runs `nextSlide()`. Pressing the **←** key runs `prevSlide()`. The key names are `'ArrowRight'` and `'ArrowLeft'`.",
  snippet:`document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowRight') {
    nextSlide();
  } else if (event.key === 'ArrowLeft') {
    prevSlide();
  }
});`,
  hints:["`document.addEventListener('keydown', function (event) { ... });`","`if (event.key === 'ArrowRight') { nextSlide(); } else if (event.key === 'ArrowLeft') { prevSlide(); }`"],
  tip:"Click the preview, then use your arrow keys. You built a real carousel!",
  checks:[[a=>{a.key('body','ArrowRight');return T(a,'#number')==='2 / 6';},"Pressing **ArrowRight** should go to slide **2 / 6**."],
   [a=>{a.key('body','ArrowLeft');a.key('body','ArrowLeft');return T(a,'#number')==='6 / 6';},"Pressing **ArrowLeft** should go back (and loop round to **6 / 6**)."]]})
 ]}),

/* ------------------------------------------------------------------ 12 */
P({id:'pj_mixer',emoji:'🎨',title:'Colour Mixer',mentor:'Splodge, a paint-pot artist',
 blurb:'Mix red, green and blue with sliders, see the colour code, and save a palette.',
 intro:"Splodge the paint pot says every colour on a screen is made from just **red, green and blue** light. Build a mixer with three sliders, show the real colour codes (rgb and hex) that web designers use, add a surprise button and save your favourite colours.",
 base:`<div class="mixer">
  <h1>🎨 Colour Mixer</h1>
  <div id="swatch">
    <p id="code">rgb(255, 255, 255)</p>
    <p id="hex">#ffffff</p>
  </div>
  <div class="slider">
    <label for="red">🔴 Red</label>
    <input id="red" type="range" min="0" max="255" value="255">
    <span id="redVal">255</span>
  </div>
  <div class="slider">
    <label for="green">🟢 Green</label>
    <input id="green" type="range" min="0" max="255" value="255">
    <span id="greenVal">255</span>
  </div>
  <div class="slider">
    <label for="blue">🔵 Blue</label>
    <input id="blue" type="range" min="0" max="255" value="255">
    <span id="blueVal">255</span>
  </div>
  <div class="copy">
    <input id="cssLine" readonly value="background-color: #ffffff;">
    <p id="copyNote"></p>
  </div>
  <button id="random">🎲 Surprise me</button>
  <button id="save">💾 Save colour</button>
  <div id="palette"></div>
</div>

<style>
  body {
    margin: 0;
    padding: 20px 16px;
    min-height: 100vh;
    box-sizing: border-box;
    font-family: 'Trebuchet MS', 'Segoe UI', sans-serif;
    background: linear-gradient(135deg, #ffe3e3, #d3f9d8, #d0ebff);
    color: #343a40;
  }
  .mixer {
    max-width: 420px;
    margin: 0 auto;
    background: white;
    border-radius: 24px;
    padding: 20px;
    text-align: center;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  }
  h1 { margin-top: 0; }
  #swatch {
    height: 130px;
    border-radius: 20px;
    border: 3px solid #e9ecef;
    background: white;
    color: #333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-family: 'Courier New', monospace;
    font-weight: bold;
    font-size: 18px;
  }
  #swatch p { margin: 2px; }
  .slider { display: flex; align-items: center; gap: 8px; margin: 10px 0; }
  .slider label { width: 80px; text-align: left; font-weight: bold; }
  .slider input { flex: 1; min-width: 0; }
  .slider span { width: 36px; font-family: 'Courier New', monospace; }
  #cssLine {
    width: 100%;
    box-sizing: border-box;
    font-family: 'Courier New', monospace;
    font-size: 15px;
    padding: 8px;
    border: 2px dashed #ced4da;
    border-radius: 10px;
    text-align: center;
  }
  #copyNote { font-size: 13px; color: #2b8a3e; min-height: 1em; margin: 4px; }
  ${BTN}
  #random { background: #fff3bf; }
  #save { background: #d0ebff; }
  #palette { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin-top: 10px; }
  .chip { width: 34px; height: 34px; padding: 0; margin: 0; border: 3px solid white; }
</style>

<script>
</script>`,
 steps:[
 J('x1','The red slider',{why:"Let's start with one paint pot: red!",
  learn:"Screens mix colours with light: `rgb(red, green, blue)`. Each one goes from **0** (off) to **255** (full blast).\n`rgb(255, 255, 255)` is white, `rgb(0, 0, 0)` is black.\n`redSlider.value` is where the slider is right now.",
  todo:"Write `mix()` that reads all three sliders, builds `'rgb(' + r + ', ' + g + ', ' + b + ')'`, and sets it as `#swatch`'s background. Run it on every `input` of the red slider.",
  job:"When the `#red` slider moves, paint `#swatch` with `rgb(r, g, b)`. Build the colour in a function `mix()` and set `swatch.style.backgroundColor`.",
  snippet:`const redSlider = document.querySelector('#red');
const greenSlider = document.querySelector('#green');
const blueSlider = document.querySelector('#blue');
${MX_A}

${MX_1}

redSlider.addEventListener('input', mix);`,
  hints:["Point at `#red`, `#green`, `#blue` and `#swatch`.","In `mix`: `const r = redSlider.value;` (same for g and b), then `const colour = 'rgb(' + r + ', ' + g + ', ' + b + ')';`","`swatch.style.backgroundColor = colour;` — and `redSlider.addEventListener('input', mix);`"],
  tip:"Slide red all the way down. White minus red = a light blue called cyan!",
  checks:[[a=>{a.type('#red','200');return bg(a,'#swatch')==='rgb(200, 255, 255)';},"Moving `#red` to **200** should paint `#swatch` **rgb(200, 255, 255)**."]]}),
 J('x2','Green and blue',{why:"Now hook up the other two paint pots.",
  learn:"The `mix` function already reads all three sliders. We just need the other two sliders to **call** it.",
  todo:"Run `mix` on every `input` of the green and blue sliders too.",
  job:"Make `#green` and `#blue` call `mix` too. Add `greenSlider.addEventListener('input', mix);` and the same for blue.",
  snippet:`greenSlider.addEventListener('input', mix);
blueSlider.addEventListener('input', mix);`,
  hints:["Two lines, just like the red one.","`greenSlider.addEventListener('input', mix);` and `blueSlider.addEventListener('input', mix);`"],
  tip:"Try red 255, green 165, blue 0. What colour is that?",
  checks:[[a=>{a.type('#green','100');return bg(a,'#swatch')==='rgb(255, 100, 255)';},"Moving `#green` to **100** should paint `#swatch` **rgb(255, 100, 255)**."],
   [a=>{a.type('#blue','0');return bg(a,'#swatch')==='rgb(255, 100, 0)';},"Moving `#blue` to **0** should paint `#swatch` **rgb(255, 100, 0)**."]]}),
 X('x3','Show the code',[below(MX_A,"const codeText = document.querySelector('#code');"),blk(MX_1,MX_2)],{why:"Designers need the colour CODE to use it in their own websites.",
  todo:"Point at `#code`. In `mix`, show the `colour` text in it.",
  job:"Show the colour code in `#code`, like **rgb(10, 255, 255)**. Add `codeText.textContent = colour;` to `mix`.",
  where:"The `codeText` line goes at the top. The new line goes at the end of `mix`.",
  snippet:`const codeText = document.querySelector('#code');

${MX_2}`,
  hints:["Top: `const codeText = document.querySelector('#code');`","End of `mix`: `codeText.textContent = colour;`"],
  tip:"You can paste this code into CSS: `color: rgb(10, 255, 255);` works!",
  checks:[[a=>{a.type('#red','10');return T(a,'#code')==='rgb(10, 255, 255)';},"Moving `#red` to **10** should show **rgb(10, 255, 255)** in `#code`."]]}),
 X('x4','Slider numbers',[below(MX_A,"const redValue = document.querySelector('#redVal');\nconst greenValue = document.querySelector('#greenVal');\nconst blueValue = document.querySelector('#blueVal');"),blk(MX_2,MX_3)],{why:"The little numbers next to the sliders are stuck on 255. Let's make them move!",
  todo:"Point at `#redVal`, `#greenVal` and `#blueVal`. In `mix`, show `r`, `g` and `b` in them.",
  job:"Show each slider's number next to it: `r` in `#redVal`, `g` in `#greenVal`, `b` in `#blueVal`.",
  where:"The 3 new `const` lines go at the top. The 3 new lines go at the end of `mix`.",
  snippet:`const redValue = document.querySelector('#redVal');
const greenValue = document.querySelector('#greenVal');
const blueValue = document.querySelector('#blueVal');

${MX_3}`,
  hints:["Top: three `const ... = document.querySelector('#redVal');` lines (red, green, blue).","End of `mix`: `redValue.textContent = r;` and the same for green and blue."],
  tip:"Three lines that look almost the same? Totally normal. Copy, paste, change one word.",
  checks:[[a=>{a.type('#blue','42');return T(a,'#blueVal')==='42';},"Moving `#blue` to **42** should show **42** in `#blueVal`."],
   [a=>{a.type('#red','7');return T(a,'#redVal')==='7';},"Moving `#red` to **7** should show **7** in `#redVal`."]]}),
 X('x5','Hex code',[below(MX_A,"const hexText = document.querySelector('#hex');"),blk(MX_3,MX_4+'\n\n'+"function toHex(n) {\n  return Number(n).toString(16).padStart(2, '0');\n}")],{why:"Most websites write colours as **hex codes** like `#ff8000`. Let's show that too!",
  learn:"Hex counts in **16s** instead of 10s: after 9 come a, b, c, d, e, f. So 255 is `ff`, and 128 is `80`.\n`Number(n).toString(16)` turns a number into hex. `padStart(2, '0')` makes `f` into `0f`, so every colour has 2 letters.",
  todo:"Point at `#hex`. Write `toHex(n)` returning `Number(n).toString(16).padStart(2, '0')`. In `mix`, build `'#' + toHex(r) + toHex(g) + toHex(b)` and show it.",
  job:"Write a `toHex` function and show the hex code in `#hex`. Red **255**, green **128**, blue **0** shows **#ff8000**.",
  where:"The `hexText` line goes at the top. The 2 new lines go at the end of `mix`. The new `toHex` function goes under `mix`.",
  snippet:`const hexText = document.querySelector('#hex');

${MX_4}

function toHex(n) {
  return Number(n).toString(16).padStart(2, '0');
}`,
  hints:["`function toHex(n) { return Number(n).toString(16).padStart(2, '0'); }`","In `mix`: `const hex = '#' + toHex(r) + toHex(g) + toHex(b);` and `hexText.textContent = hex;`"],
  tip:"Hex has 16 digits: 0 1 2 3 4 5 6 7 8 9 a b c d e f. Computers love it!",
  checks:[[a=>{a.type('#red','255');a.type('#green','128');a.type('#blue','0');return T(a,'#hex')==='#ff8000';},"Red **255**, green **128**, blue **0** should show **#ff8000** in `#hex`."],
   [a=>{a.type('#green','5');return T(a,'#hex')==='#ff0500';},"Small numbers need 2 letters: green **5** should give **#ff0500**. Use `padStart(2, '0')`."]]}),
 X('x6','Readable text',[blk(MX_4,MX_5)],{why:"On a dark colour, the dark code text disappears! Make it white on dark colours.",
  learn:"Add up the three numbers and divide by 3 to get the **brightness** (0 = black, 255 = white).\n`Number(r)` is needed because slider values are text — `'1' + '2'` would make `'12'`!",
  todo:"In `mix`, work out `brightness`. If it's below **128**, set `swatch.style.color = 'white'`, else `'#222'`.",
  job:"If the colour is dark (brightness below **128**), make the swatch text `white`. Otherwise make it `#222`.",
  where:"At the end of `mix`, before its last `}`.",
  snippet:MX_5,
  hints:["`const brightness = (Number(r) + Number(g) + Number(b)) / 3;`","`if (brightness < 128) { swatch.style.color = 'white'; } else { swatch.style.color = '#222'; }`"],
  tip:"Good designers always check that text is easy to read on its background.",
  checks:[[a=>{a.type('#red','0');a.type('#green','0');a.type('#blue','0');return a.css(a.$('#swatch'),'color')===WHITE;},"On black (all sliders at **0**), the swatch text should be **white**."],
   [a=>{a.type('#red','255');a.type('#green','255');a.type('#blue','255');return a.css(a.$('#swatch'),'color')!==WHITE;},"On white (all at **255**), the text should be dark (`#222`)."]]}),
 J('x7','Surprise me',{why:"Can't decide? Let the computer pick a colour!",
  learn:"`Math.floor(Math.random() * 256)` gives a number from **0 to 255** — perfect for one paint pot.\nAfter moving the sliders with code, we call `mix()` ourselves.",
  todo:"Write `randomNumber()` returning `Math.floor(Math.random() * 256)`. When `#random` is clicked, set all three slider values to random numbers, then call `mix()`.",
  job:"When `#random` is clicked, set each slider to a random number from **0** to **255** with `Math.floor(Math.random() * 256)`, then run `mix()`.",
  snippet:`const randomButton = document.querySelector('#random');

function randomNumber() {
  return Math.floor(Math.random() * 256);
}

randomButton.addEventListener('click', function () {
  redSlider.value = randomNumber();
  greenSlider.value = randomNumber();
  blueSlider.value = randomNumber();
  mix();
});`,
  hints:["`function randomNumber() { return Math.floor(Math.random() * 256); }`","In a click listener: `redSlider.value = randomNumber();` (and green, blue) then `mix();`"],
  tip:"256 because there are 256 numbers from 0 to 255. Counting from 0 is tricky!",
  checks:[[a=>{const s=new Set();for(let i=0;i<6;i++){a.click('#random');s.add(T(a,'#code'));}return s.size>=2;},"Clicking `#random` should pick new colours. Set the sliders to random numbers."],
   [a=>bg(a,'#swatch')===`rgb(${val(a,'#red')}, ${val(a,'#green')}, ${val(a,'#blue')})`,"After clicking `#random`, the swatch must match the sliders. Call `mix()` at the end."]]}),
 X('x8','Copy-ready CSS',[below(MX_A,"const cssLine = document.querySelector('#cssLine');"),blk(MX_5,MX_6)],{why:"Splodge wants a ready-made line of CSS to paste straight into a website.",
  todo:"Point at `#cssLine`. In `mix`, set its `value` to **background-color: #xxxxxx;** using `hex`.",
  job:"Put a ready CSS line in the `#cssLine` box, like **background-color: #00ffff;**. Use `cssLine.value = 'background-color: ' + hex + ';';`",
  where:"The `cssLine` line goes at the top. The new line goes at the end of `mix`.",
  snippet:`const cssLine = document.querySelector('#cssLine');

${MX_6}`,
  hints:["Top: `const cssLine = document.querySelector('#cssLine');`","End of `mix`: `cssLine.value = 'background-color: ' + hex + ';';`"],
  tip:"Inputs use `.value`, not `.textContent`. That's how you change what's IN a box.",
  checks:[[a=>{a.type('#red','0');return val(a,'#cssLine')==='background-color: #00ffff;';},"Moving `#red` to **0** should put **background-color: #00ffff;** in `#cssLine`."]]}),
 J('x9','Click to select',{why:"Make copying easy: one click selects the whole line.",
  learn:"`cssLine.select()` highlights all the text in the box, ready to copy with **Ctrl+C** (or **Cmd+C** on a Mac).",
  todo:"Point at `#copyNote`. When `#cssLine` is clicked, call `cssLine.select()` and show **Selected! Press Ctrl+C (or Cmd+C) to copy.**",
  job:"When `#cssLine` is clicked, select all its text with `cssLine.select()` and show **Selected!** in `#copyNote`.",
  snippet:`const copyNote = document.querySelector('#copyNote');

cssLine.addEventListener('click', function () {
  cssLine.select();
  copyNote.textContent = 'Selected! Press Ctrl+C (or Cmd+C) to copy.';
});`,
  hints:["`const copyNote = document.querySelector('#copyNote');` and a click listener on `cssLine`.","Inside: `cssLine.select();` and `copyNote.textContent = 'Selected! Press Ctrl+C (or Cmd+C) to copy.';`"],
  tip:"Little helpers like this make people love using your tools.",
  checks:[clickThen('#cssLine',a=>{const e=a.$('#cssLine');return e.value.length>0&&e.selectionStart===0&&e.selectionEnd===e.value.length;},"Clicking `#cssLine` should select all its text. Use `cssLine.select()`."),
   [a=>T(a,'#copyNote').includes('selected'),"Clicking `#cssLine` should show **Selected!** in `#copyNote`."]]}),
 J('x10','Save a palette',{why:"Splodge wants to keep his favourite colours, and click them to bring them back.",
  learn:"Each saved chip **remembers** its own `r`, `g` and `b` — like a photo of the sliders. Clicking the chip puts the sliders back where they were.",
  todo:"Point at `#save` and `#palette`. When Save is clicked, make a `button` with class `chip` and the current colour as background. Clicking the chip sets the sliders back and calls `mix()`.",
  job:"When `#save` is clicked, add a `button` with the class `chip` to `#palette`, painted the current colour. Clicking a chip puts the sliders back and runs `mix()`.",
  snippet:`const saveButton = document.querySelector('#save');
const palette = document.querySelector('#palette');

saveButton.addEventListener('click', function () {
  const r = redSlider.value;
  const g = greenSlider.value;
  const b = blueSlider.value;
  const chip = document.createElement('button');
  chip.className = 'chip';
  chip.style.backgroundColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';
  chip.addEventListener('click', function () {
    redSlider.value = r;
    greenSlider.value = g;
    blueSlider.value = b;
    mix();
  });
  palette.append(chip);
});`,
  hints:["In the save listener: remember `const r = redSlider.value;` (and g, b), then `const chip = document.createElement('button'); chip.className = 'chip';`","`chip.style.backgroundColor = 'rgb(' + r + ', ' + g + ', ' + b + ')';` then `palette.append(chip);`","Chip click: `redSlider.value = r; greenSlider.value = g; blueSlider.value = b; mix();`"],
  tip:"Make a palette of 5 colours you love — that's how designers pick colours for a website!",
  checks:[[a=>{a.type('#red','10');a.click('#save');const c=a.$('#palette .chip');return !!c&&bg(a,'#palette .chip')==='rgb(10, 255, 255)';},"Clicking `#save` should add a `.chip` to `#palette` painted the current colour."],
   [a=>{a.type('#red','200');a.click('#palette .chip');return val(a,'#red')==='10'&&bg(a,'#swatch')==='rgb(10, 255, 255)';},"Clicking a chip should put the sliders back to its colour and call `mix()`."]]})
 ]})
);
})();
