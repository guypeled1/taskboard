
var MODEL = {
    board: [],
    members:[],
    saveBoard(){    
        localStorage.setItem('board',JSON.stringify(this.board));
    },
    loadBoard(){
        var tempBoard = localStorage.getItem('board');
        if(tempBoard){
            this.board = JSON.parse(tempBoard);
        }
    },
    saveMembers(){
        localStorage.setItem('members',JSON.stringify(this.members));
    },
    loadMembers(){
        var tempMembers = localStorage.getItem('members');
        if(tempMembers){
            this.members = JSON.parse(tempMembers);
        }
    },
    getBoard(){
        this.loadBoard();
        return this.board;
    },
    getMembers(){
        this.loadMembers();
        return this.members;
    },
    deleteCard(cardId, listId) {
        for (let list of this.getBoard()) {
            if (list.id === listId) {
                for (let index in list.cards) {
                    if (list.cards[index].id === cardId) {
                        list.cards.splice(index, 1);
                        console.log('Deleted card: ', cardId);
                        this.saveBoard();
                        return;
                    }
                }
            }
        }
        console.log('Card with id: ' + cardId + ' not found');
    },
    getMemberName(memberId) {
        for (let member of this.getMembers()) {
            if (member.id === memberId) {
                return member.name;
            }
        }
        return;
    },
    addList(){
        var list = {
            title: 'New List',
            id: uuidv1(),
            cards:[]
         };
        this.board.push(list);
        this.saveBoard();
        return list;
    },
    addCard(listId,cardData = {text:'Empty Card',members: [],id:uuidv1()}) {
        let card = {
            text : cardData.text,
            members : cardData.members,
            id: uuidv1()
        }
        for(let list of this.getBoard()){
            if(list.id === listId){
                list.cards.push(card);
                this.saveBoard();
                return card;
            }
        }
    },
    removeList(listId){
        this.getBoard().forEach(function(list,index){
            if(listId === list.id){
                MODEL.getBoard().splice(index,1);
                MODEL.saveBoard();
                return;
            }
        })
    },
    getCardData(cardId,listId){
        for(let list of this.getBoard()){
            if(list.id === listId){
               for(card of list.cards){
                if(card.id === cardId){
                    return card;
                }
               }
            }
        }
        return;
    },
    editCard(cardObj,listId){
        for(let list of this.getBoard()){
            if(list.id === listId){
                cards = list.cards;
                for(let index in cards){
                    if(cards[index].id === cardObj.id){
                        cards[index] = cardObj;
                        this.saveBoard();
                        return;
                    }
                }
            }
        }
    },
    addMember(memberMame){
        member = {
            name:memberMame,
            id:uuidv1()
        }
        this.getMembers().push(member);
        this.saveMembers();
    },
    editListName(title,listId){
        for(let list of this.getBoard()){
            if(list.id === listId){
                list['title'] = title;
                this.saveBoard();
                return;
            }
        }
        return;
    },
    editMemberName(member){
        for (let index in this.getMembers()) {
            if(member.id === this.getMembers()[index].id){
                this.getMembers()[index] = member;
                this.saveMembers();
                return;
            }
        }
        return;
    },
    deteteTheMember(memberId){
        for (let index in this.getMembers()) {
            if(this.getMembers()[index] != undefined){
            if(memberId === this.getMembers()[index].id){
                this.getMembers().splice(index,1);
                this.saveMembers();
            }
        }
        }
        for(let list of this.getBoard()){
            cards = list.cards;
            for(let card of cards){
                if(card.members.indexOf(memberId) != -1){
                    for(let cardIndex in card.members){
                        if(card.members[cardIndex] === memberId){
                            card.members.splice(cardIndex,1);
                            this.saveBoard();
                        }
                    }
                }
            }
        }
    }
}