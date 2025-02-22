// Нужна логика для неверного ответа с красным окном + чтоб кнопка пересдать отправляла в начало теста (сбрасывала форму)
const testCheck1 = document.querySelector("#checkbox_1");
const testCheck2 = document.querySelector("#checkbox_2");
const testCheck3 = document.querySelector("#checkbox_3");
const testRadio1 = document.querySelector("#radio_1");
const testRadio2 = document.querySelector("#radio_2");
const testRadio3 = document.querySelector("#radio_3");
const testButton = document.querySelector(".content__button");
const testRetake = document.querySelector("#retakeTestButton");
const checkboxLabelFirst = document.querySelector("#checkboxLabelFirst");
const checkboxLabelSecond = document.querySelector("#checkboxLabelSecond");
const checkboxLabelThird = document.querySelector("#checkboxLabelThird");
const radioLabelFirst = document.querySelector("#radioLabelFirst");
const radioLabelSecond = document.querySelector("#radioLabelSecond");
const radioLabelThird = document.querySelector("#radioLabelThird");
const results = document.querySelector("#results");

let count = 0;
testButton.addEventListener("click", () => {
  count++
  if (
    (testCheck1.checked || testCheck2.checked || testCheck3.checked) &&
    (testRadio1.checked || testRadio2.checked || testRadio3.checked) && count <=3
  ) {

    validateAnswers();
    showResultTest();
  }

  if(count >= 3 &&  resultsTitle.textContent === "33%") {
    testRetake.classList.add('content__button_retake-success');
    testRetake.classList.remove('content__button_retake-wrong');
    testRetake.setAttribute('disabled', true)
    btnMvdActive()
  }
});

const showResult = () => {
 testButton.classList.toggle("content__button_active");
};

correctAswers = {
  q1: [1, 1, 1],
  q2: [0, 1, 0],
};

const collectAnswers = (form) => {
  const answerList = [];
  for (const [index, element] of Array.from(form).entries()) {
    answerList.push(element.checked);
  }
  return answerList;
};

const highlightAnswer = (element, highlightType, inputType) => {
  if (inputType === "checkbox") {
    const validTypes = ["success", "correct"];
    if (validTypes.includes(highlightType)) {
      const className = `checkbox__label-${highlightType}`;
      element.classList.add(className);
      element.classList.remove("checkbox__label");
    } else {
      console.warn(`Wrong highlightType ${highlightType}`);
    }
  }
  if (inputType === "radio") {
    const validTypes = [
      "success-answer",
      "cross-answer",
      "correct-answer",
      "wrong-answer",
    ];
    if (validTypes.includes(highlightType)) {
      const className = `radio__label-${highlightType}`;
      element.classList.add(className);
      element.classList.remove("radio__label");
    } else {
      console.warn(`Wrong highlightType ${highlightType}`);
    }
  }
};
answerMapQ1 = {
  0: checkboxLabelFirst,
  1: checkboxLabelSecond,
  2: checkboxLabelThird,
};
answerMapQ2 = {
  0: radioLabelFirst,
  1: radioLabelSecond,
  2: radioLabelThird,
};
function ifCurrect() {
  const q1Answer = collectAnswers(document.forms["testFirst"]);
  const q2Answer = collectAnswers(document.forms["testSecond"]);
  for (let i = 0; i < document.forms["testSecond"].elements.length; i++) {
    if (
      q1Answer.some((x) => x) &&
      document.forms["testSecond"].elements[i].checked
    ) {
      showResult();
    }
  }
}

const checkAnswer = (given_answer, correct_answer) => {
  // correct success wrong cross
  if (correct_answer) {
    if (given_answer) return "success";
    else return "correct";
  } else if (!correct_answer) {
    if (!given_answer) return "cross";
    else return "wrong";
  }
};

const validateAnswers = () => {
  const q1Answer = collectAnswers(document.forms["testFirst"]);
  const q2Answer = collectAnswers(document.forms["testSecond"]);
  for (const [index, answer] of q1Answer.entries()) {
    const response = checkAnswer(
      (given_answer = answer),
      (correct_answer = correctAswers["q1"][index])
    );
    highlightAnswer(
      (element = answerMapQ1[index]),
      (highlightType = `${response}`),
      (inputType = "checkbox")
    );
  }
  for (const [index, answer] of q2Answer.entries()) {
    const response = checkAnswer(
      (given_answer = answer),
      (correct_answer = correctAswers["q2"][index])
    );
    highlightAnswer(
      (element = answerMapQ2[index]),
      (highlightType = `${response}-answer`),
      (inputType = "radio")
    );
  }
};
let resultsTitle = document.querySelector(".results__title");
let resultTextOne = document.querySelector(".results__text_one");
let resultTextTwo = document.querySelector(".results__text_two");
let resultTextThree = document.querySelector(".results__text_three");

const hideButton = function () {
  testButton.classList.add("content__button_hidden");
  testRetake.classList.remove("content__button_hidden");
};

const showButton = function () {
  testButton.classList.remove("content__button_hidden");
  testRetake.classList.add("content__button_hidden");
};
function showResultTest() {
  let x = document.forms["testFirst"]["checkbox1"].checked;
  let y = document.forms["testFirst"]["checkbox2"].checked;
  let z = document.forms["testFirst"]["checkbox3"].checked;
  let rad2 = document.forms["testSecond"].elements[1].checked;
  if (((x && y && z) || (x && y) || (x && z) || (y && z)) && rad2) {
    results.classList.add("results__green");
    hideButton();
    testRetake.classList.add("content__button_retake-success");
    testRetake.classList.remove("content__button_retake-wrong");
    btnMvdActive();
    testRetake.disabled = true;
    resultsTitle.textContent = "83%";
    resultTextOne.textContent = "Отличный результат!";
    resultTextTwo.textContent = "Нажите «Далее» чтобы продолжить.";
    resultTextThree.textContent = "Если считаете, что сможете лучше, нажмите «Пересдать». В случае если результат будет хуже, засчитается наивысший результат.";
    checkboxLabelFirst.classList.remove('checkbox__label_colored');
    checkboxLabelFirst.classList.remove('checkbox__label_selected');
    checkboxLabelSecond.classList.remove('checkbox__label_colored');
    checkboxLabelSecond.classList.remove('checkbox__label_selected');
    checkboxLabelThird.classList.remove('checkbox__label_colored');
    checkboxLabelThird.classList.remove('checkbox__label_selected');
  } else {
    testButton.classList.add("content__button_hidden");
    testRetake.classList.remove("content__button_hidden");
    testRetake.classList.remove("content__button_retake-success");
    testRetake.classList.add("content__button_retake-wrong");
    results.classList.add("results__red");
    resultsTitle.textContent = "33%";
    resultTextOne.textContent =
      "К сожалению, вы не набрали проходной результат.";
    resultTextTwo.textContent = "Нажмите «Пересдать», чтобы попробовать снова.";
    resultTextThree.textContent = ""
    hideButton();
    checkboxLabelFirst.classList.remove('checkbox__label_colored');
    checkboxLabelFirst.classList.remove('checkbox__label_selected');
    checkboxLabelSecond.classList.remove('checkbox__label_colored');
    checkboxLabelSecond.classList.remove('checkbox__label_selected');
    checkboxLabelThird.classList.remove('checkbox__label_colored');
    checkboxLabelThird.classList.remove('checkbox__label_selected');
  }
}

let completedCourseSection = document.querySelector("#block-result");
let completedCourseSubtitle = completedCourseSection.querySelector(
  ".content__subtitle"
);
let completedCourseTextOne = completedCourseSection.querySelector(
  "#completed-course_text_one"
);
let completedCourseTextTwo = completedCourseSection.querySelector(
  "#completed-course_text_two"
);
let completedCourseTextThree = completedCourseSection.querySelector(
  "#completed-course_text_three"
);
let mainContentSection = document.querySelector("#block-main");
let buttonForward = document.querySelector("#button_forward");

function hideResultsShowCompleted() {
  results.classList.add("content_hidden");
  mainContentSection.classList.add("content_hidden");
  completedCourseSection.classList.remove("content_hidden");
}

function showPositiveTextCompletedResult() {
  completedCourseSubtitle.textContent = "Поздравляем!";
  completedCourseTextOne.textContent =
    "Вы успешно завершили курс «Кинологическое направление».";
  completedCourseTextTwo.textContent =
    "Теперь вы можете участвовать в поисково-спасательных мероприятиях со своей собакой.";
}
const video = document.querySelector("#block-video");

buttonForward.addEventListener("click", function () {
  if (
    video.classList.contains("content") &&
    !video.classList.contains("content_hidden")
  ) {
    aboutTest.classList.remove("content_hidden");
    video.classList.add("content_hidden");
    updateBreadCrumps();
    btnMvdDisabled();
    testBlock.classList.add("content_hidden");

  }
  if (results.classList.contains("results__red")&&(testBlock.classList.contains("content_hidden")===false)) {
    hideResultsShowCompleted();
    updateBreadCrumps();
    btnLableChange();
  } else if (results.classList.contains("results__green")&&(testBlock.classList.contains("content_hidden")===false)) {
    completedCourseTextThree.remove();
    hideResultsShowCompleted();
    showPositiveTextCompletedResult();
    updateBreadCrumps();
    btnLableChange();
  } else {
    console.log("Пройдите тест!");
  }
  resetOptionColorIconForward()

});

testRetake.addEventListener("click", function () {
  testButton.classList.remove("content__button_active");
  results.classList.remove("results__green");
  results.classList.remove("results__red");
  checkboxLabelFirst.classList.remove("checkbox__label-success");
  checkboxLabelFirst.classList.remove("checkbox__label-correct");
  checkboxLabelFirst.classList.add("checkbox__label");
  checkboxLabelSecond.classList.remove("checkbox__label-success");
  checkboxLabelSecond.classList.remove("checkbox__label-correct");
  checkboxLabelSecond.classList.add("checkbox__label");
  checkboxLabelThird.classList.remove("checkbox__label-success");
  checkboxLabelThird.classList.remove("checkbox__label-correct");
  checkboxLabelThird.classList.add("checkbox__label");
  radioLabelFirst.classList.remove("radio__label-success-answer");
  radioLabelFirst.classList.remove("radio__label-correct-answer");
  radioLabelFirst.classList.remove("radio__label-cross-answer");
  radioLabelFirst.classList.remove("radio__label-wrong-answer");
  radioLabelFirst.classList.add("radio__label");
  radioLabelSecond.classList.remove("radio__label-success-answer");
  radioLabelSecond.classList.remove("radio__label-correct-answer");
  radioLabelSecond.classList.remove("radio__label-cross-answer");
  radioLabelSecond.classList.remove("radio__label-wrong-answer");
  radioLabelSecond.classList.add("radio__label");
  radioLabelThird.classList.remove("radio__label-success-answer");
  radioLabelThird.classList.remove("radio__label-correct-answer");
  radioLabelThird.classList.remove("radio__label-cross-answer");
  radioLabelThird.classList.remove("radio__label-wrong-answer");
  radioLabelThird.classList.add("radio__label");
  radioLabelSecond.classList.remove('radio__label_colored');
  radioLabelSecond.classList.remove('radio__label_selected');
  radioLabelSecond.classList.remove('radio__label_bordered');
  radioLabelFirst.classList.remove('radio__label_colored');
  radioLabelFirst.classList.remove('radio__label_selected');
  radioLabelFirst.classList.remove('radio__label_bordered');
  radioLabelThird.classList.remove('radio__label_colored');
  radioLabelThird.classList.remove('radio__label_selected');
  radioLabelThird.classList.remove('radio__label_bordered');
  document.forms["testFirst"].reset();
  document.forms["testSecond"].reset();
  showButton();
});

// SideBar //

const iconDropDown = document.querySelectorAll(".sidebar-content__item-icon");
const optionsDropDown = document.querySelectorAll(".sidebar-content__options");
const optionsBox = document.querySelectorAll(".sidebar-content__options");
const dropDownTriggerIcon = document.querySelectorAll(
  ".sidebar-content__item-icon"
);
const dropDownTriggerText = document.querySelectorAll(".sidebar-content__item");
const optionsItem = document.querySelectorAll(".sidebar-content__link");
const course = document.querySelectorAll(".breadcrumbs__link");

//Открытие содержания при клике на иконку
function openOptionsTriggerIcon(el) {
  const options = el.currentTarget.dataset.path;
  optionsBox.forEach(function () {
    const dropDown = document.querySelector(`[data-target=${options}]`);
    dropDown.classList.toggle("sidebar-content__options_active");
    el.target.classList.toggle("sidebar-content__item-icon_active");
  });
}

dropDownTriggerIcon.forEach(function (item) {
  item.addEventListener("click", openOptionsTriggerIcon);
});

//Открытие содежания при клике на название темы
function openOptionsTriggerText(el) {
  const icon = el.target.nextElementSibling;
  const options = el.currentTarget.dataset.path;
  optionsBox.forEach(function () {
    const dropDown = document.querySelector(`[data-target=${options}]`);
    icon.classList.toggle("sidebar-content__item-icon_active");
    dropDown.classList.toggle("sidebar-content__options_active");
  });
}

dropDownTriggerText.forEach(function (item) {
  item.addEventListener("click", openOptionsTriggerText);
});

//Изменение иконок и цвета пунков содержания

const arrCoursesAll = [...optionsItem];
let arrCoursesCompleted;
let arrCoursesNonCompleted;

function resetOptionColorIconForward() {

  arrCoursesAll.forEach(function (item) {
    const optionItemCurrent = item.closest("ul").dataset.target;
    let activeItem;
    if (
      item.lastElementChild.textContent == linkCurrent.textContent &&
      optionItemCurrent === course[2].dataset.path
    ) {
      highlightCurrentOption(item);
      activeItem = arrCoursesAll.indexOf(item);
      arrCoursesCompleted = arrCoursesAll.slice(0, activeItem);
      arrCoursesCompleted.forEach(function (item) {
        changeIconGreen(item)
      })
    }
    if (
      item.lastElementChild.textContent === "Тест" &&
      linkCurrent.textContent === "Курс завершен" &&
      optionItemCurrent === course[2].dataset.path
    ) {
      changeIconGreen(item);
    }
  });
}

resetOptionColorIconForward()

function resetOptionColorIconBackwards() {
  arrCoursesAll.forEach(function (item) {
    const optionItemCurrent = item.closest("ul").dataset.target;
    let activeItem;
    let prevItem;
    if (
      item.lastElementChild.textContent == linkCurrent.textContent &&
      optionItemCurrent === course[2].dataset.path
    ) {
      highlightCurrentOption(item);
      activeItem = arrCoursesAll.indexOf(item);
      prevItem = activeItem - 1;

      arrCoursesCompleted = arrCoursesAll.slice(0, prevItem);
      arrCoursesCompleted.forEach(function (item) {
        changeIconGreen(item)
      })

      arrCoursesNonCompleted = arrCoursesAll.slice(activeItem + 1);
      arrCoursesNonCompleted.forEach(function (item) {
        resetOption(item)
      })
    }
  });
}

function highlightCurrentOption(el) {
  const icon = el.firstElementChild;
  const optionText = el.childNodes[3];
  optionText.classList.add("sidebar-content__option_active");

  if (optionText.textContent === "Тест") {
    icon.classList.add("sidebar-content__option-icon_test_active")
  }
  if (optionText.textContent === "Видео") {
    icon.classList.add("sidebar-content__option-icon_video_active")
  }

}

function resetOption(el) {
  const icon = el.firstElementChild;
  const optionText = el.childNodes[3];
  optionText.classList.remove("sidebar-content__option_active");
  if (optionText.textContent === "Тест") {
    icon.classList.remove("sidebar-content__option-icon_test_active")
    icon.classList.remove("sidebar-content__option-icon_completed")
    icon.classList.add("sidebar-content__option-icon_test")
  }
}

function changeIconGreen(el) {
  const icon = el.childNodes[1];
  const optionText = el.childNodes[3];
  icon.classList.add("sidebar-content__option-icon_completed")
  optionText.classList.remove("sidebar-content__option_active");
  if (optionText.textContent === "Тест") {
    icon.classList.remove("sidebar-content__option-icon_test")
    icon.classList.remove("sidebar-content__option-icon_test_active")
  }
  if (optionText.textContent === "Видео") {
    icon.classList.remove("sidebar-content__option-icon_video")
    icon.classList.remove("sidebar-content__option-icon_video_active")
  }
  if (optionText.textContent === "Вебинар") {
    icon.classList.remove("sidebar-content__option-icon_web")
    icon.classList.remove("sidebar-content__option-icon_web_active")
  }
  if (optionText.textContent === "Урок"
    || optionText.textContent === "Дрессировка поисково-спасательных собак") {
    icon.classList.remove("sidebar-content__option-icon_lesson")
  }
  if (
    el.lastElementChild.textContent === "Тест" &&
    linkCurrent.textContent === "Курс завершен"
  ) {
    icon.classList.remove("sidebar-content__option-icon_test_active")
    icon.classList.add("sidebar-content__option-icon_completed")
  }
}

const aboutTest = document.getElementById("block-about");
const cardButton = aboutTest.querySelector(".content__start-button");
const testBlock = document.getElementById("block-main");
const buttonReturnToTheTest = aboutTest.querySelector(".content__link-button");

function closeAboutTest() {
  aboutTest.classList.add("content_hidden");
}

function openTest() {
  testBlock.classList.remove("content_hidden");
}

cardButton.addEventListener("click", () => {
  startTest();
});

function startTest() {
  closeAboutTest();
  openTest();
  if (results.classList.contains("results__green")) {
    btnMvdActive()
  }
}

buttonReturnToTheTest.addEventListener("click", returnToTheTest);

function returnToTheTest() {
  cardButton.classList.remove("content__link-button_hidden");
  buttonReturnToTheTest.classList.add("content__link-button_hidden");
  mainContentSection.classList.remove("content_hidden");
  aboutTest.classList.add("content_hidden");
  if (results.classList.contains("results__green")) {
    btnMvdActive()
  }
}

// Логика для страницы "О тесте (посмотреть результаты)"

function openAboutTest() {
  aboutTest.classList.remove("content_hidden");
}

function hideStartTestButton() {
  cardButton.classList.add("content__link-button_hidden");
}

function showReturnToTheTestButton() {
  buttonReturnToTheTest.classList.remove("content__link-button_hidden");
}

function showTheClause() {
  openAboutTest();
  hideStartTestButton();
  showReturnToTheTestButton();
}

const testDescription = document.querySelector("#AboutTest");

testDescription.addEventListener("click", () => {
  showTheClause();
  mainContentSection.classList.add("content_hidden");
  btnMvdDisabled();
});

checkboxLabelFirst.addEventListener("click", function () {
  if (!(results.classList.contains("results__green"))&&!(results.classList.contains("results__red"))) {
  checkboxLabelFirst.classList.toggle('checkbox__label_colored');
  checkboxLabelFirst.classList.toggle('checkbox__label_selected');
   } else {
    checkboxLabelFirst.classList.remove('checkbox__label_colored');
    checkboxLabelFirst.classList.remove('checkbox__label_selected');
  }
});

checkboxLabelSecond.addEventListener("click", function () {
  if (!(results.classList.contains("results__green"))&&!(results.classList.contains("results__red")))  {
    checkboxLabelSecond.classList.toggle('checkbox__label_colored');
    checkboxLabelSecond.classList.toggle('checkbox__label_selected');
    } else {
      checkboxLabelSecond.classList.remove('checkbox__label_colored');
      checkboxLabelSecond.classList.remove('checkbox__label_selected');
    }
});

checkboxLabelThird.addEventListener("click", function () {
  if (!(results.classList.contains("results__green"))&&!(results.classList.contains("results__red")))  {
    checkboxLabelThird.classList.toggle('checkbox__label_colored');
    checkboxLabelThird.classList.toggle('checkbox__label_selected');
    } else {
      checkboxLabelThird.classList.remove('checkbox__label_colored');
      checkboxLabelThird.classList.remove('checkbox__label_selected');
    }
});

radioLabelFirst.addEventListener("click", function () {
  radioLabelFirst.classList.add('radio__label_colored');
  radioLabelFirst.classList.add('radio__label_selected');
  radioLabelFirst.classList.add('radio__label_bordered');

  radioLabelSecond.classList.remove('radio__label_colored');
  radioLabelSecond.classList.remove('radio__label_selected');
  radioLabelSecond.classList.remove('radio__label_bordered');

  radioLabelThird.classList.remove('radio__label_colored');
  radioLabelThird.classList.remove('radio__label_selected');
  radioLabelThird.classList.remove('radio__label_bordered');

});

radioLabelSecond.addEventListener("click", function () {
  radioLabelSecond.classList.add('radio__label_colored');
  radioLabelSecond.classList.add('radio__label_selected');
  radioLabelSecond.classList.add('radio__label_bordered');

  radioLabelFirst.classList.remove('radio__label_colored');
  radioLabelFirst.classList.remove('radio__label_selected');
  radioLabelFirst.classList.remove('radio__label_bordered');

  radioLabelThird.classList.remove('radio__label_colored');
  radioLabelThird.classList.remove('radio__label_selected');
  radioLabelThird.classList.remove('radio__label_bordered');

});

radioLabelThird.addEventListener("click", function () {
  radioLabelThird.classList.add('radio__label_colored');
  radioLabelThird.classList.add('radio__label_selected');
  radioLabelThird.classList.add('radio__label_bordered');

  radioLabelSecond.classList.remove('radio__label_colored');
  radioLabelSecond.classList.remove('radio__label_selected');
  radioLabelSecond.classList.remove('radio__label_bordered');

  radioLabelFirst.classList.remove('radio__label_colored');
  radioLabelFirst.classList.remove('radio__label_selected');
  radioLabelFirst.classList.remove('radio__label_bordered');

});
