const menu = document.querySelector(".header__menu");
const openMenu = document.querySelector(".burger");
const closeMenu = document.querySelector(".header__close");

const enter = document.querySelector(".enter");
const enterBtn = document.querySelector(".enter__btn");
const openEnter = document.querySelectorAll(".open");
const closeEnter = document.querySelector(".enter__close");

const field = document.querySelectorAll(".field");
const fieldRequired = document.querySelectorAll(".field-required");
const fieldTitle = document.querySelectorAll(".enter__form-title");
const enterRequired = document.querySelector(".enter__required");

const done = document.querySelector(".done");
const doneBtn = document.querySelector(".done__btn");
const closeDone = document.querySelector(".done__close");

openMenu.addEventListener("click", () => {
  Visible(menu);
});

closeMenu.addEventListener("click", () => {
  Hidden(menu);
});

enter.addEventListener("cancel", () => {
  closeDialog(enter);
});

enterBtn.addEventListener("click", () => {
  closeDialog(enter);
  openDialog(done);
});

openEnter.forEach((item) => {
  item.addEventListener("click", () => {
    enterBtn.disabled = true;
    checkFieldOnOpen();
    openDialog(enter);
  });
});

closeEnter.addEventListener("click", () => {
  closeDialog(enter);
  checkFieldOnClose();
});

done.addEventListener("cancel", () => {
  closeDialog(done);
});

doneBtn.addEventListener("click", () => {
  closeDialog(done);
});

closeDone.addEventListener("click", () => {
  closeDialog(done);
});

fieldRequired.forEach((item) => {
  item.addEventListener("blur", () => {
    checkField(item);
    updateEnterBtn();
  });
});

enter.addEventListener('click', (event) => {
  if (event.target.nodeName === 'DIALOG') {
    closeDialog(enter);
  }
});

done.addEventListener('click', (event) => {
  if (event.target.nodeName === 'DIALOG') {
    closeDialog(done);
  }
});

function Visible(item) {
  item.style.display = "block";
  document.body.style.overflow = "hidden";
}

function Hidden(item) {
  item.style.display = "none";
  document.body.style.overflow = "";
}

function openDialog(item) {
  item.showModal();
  Visible(item);
}

function closeDialog(item) {
  item.close();
  Hidden(item);
}

function checkFieldOnOpen() {
  field.forEach((item) => {
    if (item.disabled == true) {
      fieldTitle.style.color = "var(--form-title-disabled)";
    }
  });
}

function checkField(item) {
  const requiredText = item.nextElementSibling;
  if (item.value.length == 0) {
    item.style.borderColor = "var(--additional-02)";
    requiredText.style.display = "block";
  } else {
    item.style.borderColor = "#f1f1f1";
    requiredText.style.display = "none";
  }

  const allRed = Array.from(fieldRequired).every(
    (field) => field.style.borderColor === "var(--additional-02)"
  );
  enterRequired.style.display = allRed ? "block" : "none";
}

function updateEnterBtn() {
  const anyEmpty = Array.from(fieldRequired).some(
    (field) => field.value.length == 0
  );
  enterBtn.disabled = anyEmpty;
}

function checkFieldOnClose() {
  field.forEach((item) => {
    item.value = "";
  });

  fieldRequired.forEach((item) => {
    item.style.borderColor = "#f1f1f1";

    const requiredText = item.nextElementSibling;
    requiredText.style.display = "none";
    enterRequired.style.display = "none";
  });
}