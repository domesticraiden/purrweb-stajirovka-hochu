const body = document.querySelector("body");

const headerMenu = document.querySelector(".header__menu");
const openMenuButton = document.querySelector(".burger");
const closeMenuButton = document.querySelector(".header__close");
openMenuButton.addEventListener("click", openHeaderMenu);
closeMenuButton.addEventListener("click", closeHeaderMenu);

const dialog = document.querySelector(".dialog");
const openDialogButton = document.querySelectorAll(".open");
const closeDialogButton = document.querySelector(".dialog__close");
const field = document.querySelectorAll(".field");
const fieldRequired = document.querySelectorAll(".field-required");
const fieldTitle = document.querySelectorAll(".dialog__form-title");
const dialogRequired = document.querySelector(".dialog__required");
const dialogBtn = document.querySelector(".dialog__btn");
openDialogButton.forEach((item) =>
  item.addEventListener("click", () => {
    dialogBtn.disabled = true;
    checkFieldOnOpen();
    openDialog(dialog);
  })
);
dialog.addEventListener("click", checkBackdrop);
closeDialogButton.addEventListener("click", () => {
  closeDialog(dialog);
  checkFieldOnClose();
});
fieldRequired.forEach((item) => {
  item.addEventListener("blur", () => {
    checkField(item);
    updateDialogBtn();
  });
});
dialogBtn.addEventListener("click", () => {
  closeDialog(dialog);
  checkFieldOnClose();
  openDialog(done);
});
dialog.addEventListener("close", () => {
  closeOnESC(dialog);
  checkFieldOnClose();
});

const done = document.querySelector(".done");
const closeDoneButton = document.querySelector(".done__close");
const doneBtn = document.querySelector(".done__btn");
closeDoneButton.addEventListener("click", () => {
  closeDialog(done);
});
doneBtn.addEventListener("click", () => {
  closeDialog(done);
})
done.addEventListener("close", () => {
  closeOnESC(done);
});

function openHeaderMenu() {
  headerMenu.style.display = "block";
  body.style.overflow = "hidden";
}
function closeHeaderMenu() {
  headerMenu.style.display = "none";
  body.style.overflow = "";
}

function openDialog(item) {
  item.showModal();
  item.style.display = "flex";
  body.style.overflow = "hidden";
}

function checkFieldOnOpen() {
  field.forEach((item) => {
    if (item.disabled == true) {
      fieldTitle.style.color = "var(--form-title-disabled)";
    }
  });
}

function checkBackdrop(event) {
  let rect = event.target.getBoundingClientRect();

  if (
    rect.left > event.clientX ||
    rect.right < event.clientX ||
    rect.top > event.clientY ||
    rect.bottom < event.clientY
  ) {
    closeDialog(dialog);
    checkFieldOnClose();
  }
}
function closeDialog(item) {
  item.close();
  item.style.display = "none";
  body.style.overflow = "";
}
function checkFieldOnClose() {
  field.forEach((item) => {
    item.value = "";
  });

  fieldRequired.forEach((item) => {
    item.style.borderColor = "#f1f1f1";

    const requiredText = item.nextElementSibling;
    requiredText.style.display = "none";
    dialogRequired.style.display = "none";
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
  dialogRequired.style.display = allRed ? "block" : "none";
}
function updateDialogBtn() {
  const anyEmpty = Array.from(fieldRequired).some(
    (field) => field.value.length == 0
  );
  dialogBtn.disabled = anyEmpty;
}

function closeOnESC(event) {
  event.style.display = "none";
}