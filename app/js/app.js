var boardWrapper = document.querySelector('.board-wrapper');
var membersWrapper = document.querySelector('.members-wrapper');

var boardLinkItem = document.querySelector('.board-link-item');
var membersLinkItem = document.querySelector('.members-link-item');

var navLinkWrappers = document.querySelectorAll('.nav-link-wrapper');
var listWrapper = document.querySelector('.lists-wrapper');
var popUpWrapper = document.querySelector('.edit-popUp-wrapper');
var body = document.querySelector('body');


function setView() {
    if (location.hash == '' || location.hash == '#board') {
        boardWrapper.style.display = 'block';
        membersWrapper.style.display = 'none';
        setActiveNavButton('#board');
    } else if (location.hash == '#members') {
        boardWrapper.style.display = 'none';
        membersWrapper.style.display = 'block';
        setActiveNavButton('#members');
    }

}

function setActiveNavButton(hash) {
    // Removing 'active' class from all buttons 
    for (let i = 0; i < navLinkWrappers.length; i++) {
        navLinkWrappers[i].classList.remove('active');
    }

    let navBtn = document.querySelector('[data-href="' + hash + '"]');

    // Set 'active' class on the selected button
    navBtn.classList.add('active');
}

function createList(list) {
    var cards = list.cards;
    var cardsOutput = '';
    for (let card of cards) {
        cardsOutput += createCard(card,list.id);
    }
    var output = `<li>
    <section class="list" data-id="${list.id}">
      <div class="panel panel-default task-column">

        <div class="panel-heading list-heading">
        <input type="text" class="form-control change-list-title" placeholder="List name" data-list-id="${list.id}" value="${list.title}" autofocus>
          <h3 class="panel-title list-title">${list.title}</h3>
          <button type="button" class="btn btn-default dropdown-toggle title-btn" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span class="caret"></span>
          </button>
          <button class="delete-list-btn btn-default btn" data-title="${list.title}" data-list-id="${list.id}">Delete list</button>
        </div>

        <ul class="panel-body cards-list-wrapper">
            ${cardsOutput}
        </ul>

        <div class="panel-footer">
        <button class="add-card" data-list-id="${list.id}">add a card ...</button>
        </div>

      </div>
    </section>
  </li>`;
    return output;
}

function createCard(card,listId) {
    var members = card.members;
    var membersOutput = '';
    for (member of members) {
        membersOutput += createMember(member);
    }
    var output = `
   <li class="panel panel-info card" data-id="${card.id}">
     <div class="panel-body">
       <p>${card.text}</p>
       <div class="person-wrapper">
         ${membersOutput}
       </div>
       <span class="label label-info edit-itm-btn">
         <button class="edit-card" data-list-id="${listId}" data-card-id="${card.id}">edit</button>
       </span>
     </div>
   </li>`;
    return output;

    // var listElement = document.createElement('li');
    // listElement.classList.add('panel');
    // var panelBodyElement = document.createElement('div');
    // var editBtnEl = document.createElement('button');
    // editBtnEl.innerText = 'edit';
    // editBtnEl.dataset.cardId = card.id;
    // editBtnEl.addEventListener('click',editCard);
}


function createPopUp() {
    var membersOutput = '';
    var listsOutput = '';
    for (let member of MODEL.getMembers()) {
        membersOutput += `<li class="single-checkbox">
                             <input class="member-option" type="checkbox" name="member" value="${member.id}">${member.name}
                         </li>`;
    }
    for(let list of MODEL.getBoard()){
        listsOutput += `<option class="list-option" value="${list.id}">${list.title}</option>`;
    }
    var output = `<div class="panel panel-default edit-popUp">
    <form id="edit-card-form" data-list-id="" data-card-id="">
    <div class="panel-heading popUp-heaing">
      <h3 class="panel-title">Edit card</h3>
      <span class="top-close-popup close-pop-up">x</span>
    </div>
    <div class="panel-body">
      
        <div class="form-row">
          <label for="Cardtext">card text:</label>
          <textarea class="card-text" name="text" cols="30" rows="5"></textarea>
        </div>
        <div class="form-row">
          <label for="moveTo">Move To:</label>
          <select class="list-select" name="moveTo">
            ${listsOutput}
          </select>
        </div>
        <div class="form-row">
          <label for="members">Members:</label>
          <div class="checkbox-row">
            <ul class="checkbow-wrapper">
              ${membersOutput}
            </ul>
          </div>
        </div>
        <div class="form-row">
          <button type="button" class="alert alert-danger popUpdelete btn-popUp">Delete Card</button>
        </div>
      
    </div>
    <div class="panel-footer pop-up-footer popUp-footer">
      <button type="submit" class="alert alert-danger  btn-popUp save-changes">Save Changes</button>
      <button type="button" class="alert alert-danger close-pop-up btn-popUp footer-close">Close</button>
    </div>
    </form>
  </div>`;
    popUpWrapper.innerHTML = output;
    registerPopUpevents();

}


function createMember(member) {
    return `<span class="label label-primary task-person">${getInitials(MODEL.getMemberName(member))}</span>`;
}

function createAddListBtn(){
    return ` <li>
    <section class="list">
      <div class="panel panel-default task-column">
        <div class="alert alert-info add-card-list-btn-wrapper" role="alert">
          <button class="add-card-list">Add a list</button>
        </div>
      </div>
    </section>
  </li>`;
}

function getInitials(name) {
    var initials = '';
    if(name){
    var nameArr = name.split(' ');
    for (let word of nameArr) {
        initials += word[0];
    }
}
    return initials;
}

function createBoard() {
    var lists = '';
    for (let list of MODEL.getBoard()) {
        lists += createList(list);
    }
    lists += createAddListBtn();
    listWrapper.innerHTML = lists;

    registerEvents();
}

function createMembers(){
    var membersOutput = '';
    for(let member of MODEL.getMembers()){
        membersOutput += memberItem(member.name,member.id);
    }

    var output = `<div class="panel panel-default members-list-wrapper">
    <!-- List group -->
    <div class="page-header members-title">
        <h1>Taskboard Members</h1>
      </div>
    <ul class="list-group members-list">
      ${membersOutput}
      <li class="list-group-item">
          <div class="input-group add-new-member-wrapper">
              <form class="">
              <input type="text" class="form-control add-new-member-input" placeholder="Add new member">
              <button class="label label-primary add-new-member-btn">Add</button>
              </form>
            </div>
      </li>
    </ul>
  </div>`;
  membersWrapper.innerHTML = output;
  registerMembersEvenets();
}

function memberItem(member,id){
  return `<li class="list-group-item member-item">
   <span class="member-name">${member}</span>
   <form class="edit-member-form" data-member-id="${id}">
  <input name="name" type="text" class="form-control edit-member-input" placeholder="Edit member" value="${member}">
  </form>
  <span class="member-btns-wrapper">
  <button type="button" class="label label-primary edit-member-btn">edit</button>
  <button type="button" class="label label-primary delete-member-btn" data-member-id="${id}">delete</button>
  <button type="button" class="label label-primary cancel-edit-member-btn">cancel</button>
  <button type="submit" class="label label-primary save-member-btn"  data-member-id="${id}">save</button>
  </form>
  </span></li>`;
}

function addMember(){
    var memberName = document.querySelector('.add-new-member-input').value;
    MODEL.addMember(memberName);
    createMembers()
    createPopUp();
};

function addCard(btnElement) {
    var listId = btnElement.dataset.listId;
    // var card = MODEL.addCard(listId, <optional card data>);
    var card = MODEL.addCard(listId);
    // var cardElement = createCard(card);
    createBoard();
}

function addList(){
    MODEL.addList();
    createBoard();
    createPopUp();
}

function showDeleteBtn(btnElement) {
    if (btnElement.classList.contains('show-delete-btn')) {
        btnElement.classList.remove('show-delete-btn');
    } else {
        btnElement.classList.add('show-delete-btn');
    }
}

function removeList(btnElement) {
    var title = btnElement.dataset.title;
    var listId = btnElement.dataset.listId;
    var text = 'Deleting "' + title + '" list. Are you sure?';
    if (confirm(text)) {
        MODEL.removeList(listId);
    }
    createBoard();
    createPopUp();
}

function editCard(btnElement){
    var cardId = btnElement.dataset.cardId;
    var listId =  btnElement.dataset.listId;
    var card = MODEL.getCardData(cardId,listId);
    document.querySelector('#edit-card-form').dataset.listId = listId;
    document.querySelector('#edit-card-form').dataset.cardId = cardId;
    cardText = document.querySelector('.card-text').innerHTML = card.text;
    var popUpLists = document.querySelectorAll('.list-option');
    var popUpMembers = document.querySelectorAll('.member-option');
    for(list of popUpLists){
        if(listId === list.value){
            list.selected = true;
        }
    }
    for(member of popUpMembers){
        if(card.members.indexOf(member.value) != -1 ){
            member.checked = true;
        }
    }
    body.classList.add('show-edit');
}

const formToJSON = elements => [].reduce.call(elements, (data, element) => {
  
    data[element.name] = element.value;
    return data;
  
  }, {});

function saveCard(form){
    var card = formToJSON(form.elements);
  var listId = form.dataset.listId;;
    var popUpMembers = document.querySelectorAll('.member-option');
    var membersArray = [];
    for(member of popUpMembers){
        if(member.checked === true){
            membersArray.push(member.value);
        }
    }
    card['members'] = membersArray;
    card['id'] = form.dataset.cardId;
    MODEL.editCard(card,listId);
    if(card.moveTo != listId){
        MODEL.deleteCard(card.id,listId);
        MODEL.addCard(card.moveTo,card);
    }
    createBoard();
    closePopUp();
    createPopUp();
}
function deleteCard(){
    var listId = document.querySelector('#edit-card-form').dataset.listId;
    var cardId = document.querySelector('#edit-card-form').dataset.cardId;
    MODEL.deleteCard(cardId,listId);
    createBoard();
   closePopUp();
}

function closePopUp(){
    body.classList.remove('show-edit');
}

function showListTitleEdit(title){
     title.parentElement.classList.add('edit-list-title');
}

function editListTitle(input){
    var newTitle = input.value;
    var listId = input.dataset.listId;
    MODEL.editListName(newTitle,listId);
    createBoard();
    createPopUp();
}

function editMemberShow(parent){
    parent.parentElement.classList.add('show-edit-member-form');
}

function cancelEdit(parent){
    parent.parentElement.classList.remove('show-edit-member-form');
}
function editMember(form){
    var member = formToJSON(form);
    member['id'] = form.dataset.memberId;
    MODEL.editMemberName(member);
    createMembers();
    createPopUp();
    form.parent.classList.remove('show-edit-member-form');
}

function deleteMember(btn){
    var memberId = btn.dataset.memberId;
    MODEL.deteteTheMember(memberId);
    createMembers();
    createPopUp();
    createBoard();
}


function registerEvents() {
    var addCardBtns = document.querySelectorAll('.add-card');
    var showDeleteListBtns = document.querySelectorAll('.title-btn');
    var deletListsBtn = document.querySelectorAll('.delete-list-btn');
    var editCardBtnns = document.querySelectorAll('.edit-card');
    var addListBtn = document.querySelector('.add-card-list');
    var listTiltle = document.querySelectorAll('.list-title');
    var editListInput = document.querySelectorAll('.change-list-title');

    for (let i = 0; i < listTiltle.length; i++) {
        editListInput[i].addEventListener('focusout', function () {
            editListTitle(this);
        });
    }

    for (let i = 0; i < listTiltle.length; i++) {
        listTiltle[i].addEventListener('click', function () {
            showListTitleEdit(this);
        });
    }

    for (let i = 0; i < addCardBtns.length; i++) {
        addCardBtns[i].addEventListener('click', function () {
            addCard(this);
        });
    }
    for (let i = 0; i < showDeleteListBtns.length; i++) {
        showDeleteListBtns[i].addEventListener('click', function () {
            showDeleteBtn(this);
        });
    }
    for (let i = 0; i < deletListsBtn.length; i++) {
        deletListsBtn[i].addEventListener('click', function () {
            removeList(this);
        });
    }
    for (let i = 0; i < editCardBtnns.length; i++) {
        editCardBtnns[i].addEventListener('click', function () {
            editCard(this);
        });
    }
    addListBtn.addEventListener('click', function () {
        addList();
    });

}

function registerPopUpevents(){
    var saveCardBtn = document.querySelector('.save-changes');
    var deleteCardBtn = document.querySelector('.popUpdelete');
    var closePopup = document.querySelectorAll('.close-pop-up');
    var myForm = document.querySelector('#edit-card-form');

    deleteCardBtn.addEventListener('click', function (e) {
        e.preventDefault();
        deleteCard();
    });
    for (let i = 0; i < closePopup.length; i++) {
        closePopup[i].addEventListener('click', function () {
            closePopUp();
        });
    }

    myForm.addEventListener('submit',function(e){
        e.preventDefault();
        saveCard(myForm);
    });
}

function registerMembersEvenets(){
    var addMemberBtn = document.querySelector('.add-new-member-btn');
    var editMemberBtn = document.querySelectorAll('.edit-member-btn');
    var cancelEditMemberBtn = document.querySelectorAll('.cancel-edit-member-btn');
    var saveMemberBtn = document.querySelectorAll('.save-member-btn');
    var editMemberForm = document.querySelectorAll('.edit-member-form');
    var deleteMemberBtn = document.querySelectorAll('.delete-member-btn');

    addMemberBtn.addEventListener('click', function () {
        addMember();
    });

    for (let i = 0; i < editMemberBtn.length; i++) {
        editMemberBtn[i].addEventListener('click', function () {
            editMemberShow(this.parentElement);
        });
    }
    for (let i = 0; i < cancelEditMemberBtn.length; i++) {
        cancelEditMemberBtn[i].addEventListener('click', function () {
            cancelEdit(this.parentElement);
        });
    }
    for (let i = 0; i < editMemberForm.length; i++) {
        editMemberForm[i].addEventListener('submit', function (e) {
            e.preventDefault();
            editMember(this);
        });
    }
    for (let i = 0; i < deleteMemberBtn.length; i++) {
        deleteMemberBtn[i].addEventListener('click', function () {
            deleteMember(this);
        });
    }

}

window.addEventListener("hashchange", setView, false);

createPopUp();
setView();
createBoard();
createMembers();



//console.log(uuidv1());