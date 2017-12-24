var board = [{
        title: 'Backlog',
        id: 'sdfsdfdsf',
        cards: [{
                text: 'Must attend a daily meeting every morning at 10:00',
                members: ['asfsaf', 'lkjl'],
                id: 'sdfdsfdsfds',
            },
            {
                text: 'The daily standup meeting must not be longer then 15-20 minutes. We must use a stopwatch to limit every members update.',
                members: [],
                id: 'sdfdsfdsfafdfgfsgssgsfsdf',
            },
            {
                text: 'This card does not have any members assined to it (: Should we add some members here? Maybe Darth Vadar or some other cool guy?',
                members: [],
                id: 'iuoireu'
            },
            {
                text: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.',
                members: [],
                id: 'sdfdsfdsfasfsdf',
            }
        ]
    },
    {
        title: 'Todo',
        id: 'fsdsdfdfsdfwwww',
        cards: [{
                text: 'Wash the dishes',
                members: ['asfsaf'],
                id: 'sdfdsfdsfetrrtytry',
            },
            {
                text: 'Do the laundry',
                members: ['gfhdfgh', 'asfsaf'],
                id: 'sdfdsfdssdfds',
            }
        ]
    },
    {
        title: 'In Progress',
        id: 'ertretreter',
        cards: [{
            text: 'Practice!',
            members: [],
            id: 'sdfdsfdsfdsfs',
        }]
    },
    {
        title: 'Done',
        id: 'trytyuyuiiu',
        cards: [{
            text: 'Code review',
            members: ['asfsaf'],
            id: 'sdfdsfwkrkfmvj',
        }]
    }
];


var members = [{
        name: 'Dima',
        id: 'asfsaf'
    },
    {
        name: 'Guy Peled',
        id: 'gfhdfgh'
    },
    {
        name: 'Tomer Raz Junior',
        id: 'lkjl'
    }
];


var MODEL = {
    deleteCard(cardId, listId) {
        for (let list of board) {
            if (list.id === listId) {
                for (let index in list.cards) {
                    if (list.cards[index].id === cardId) {
                        list.cards.splice(index, 1);
                        console.log('Deleted card: ', cardId);
                        return;
                    }
                }
            }
        }
        console.log('Card with id: ' + cardId + ' not found');
    },
    getMemberName(memberId) {
        for (let member of members) {
            if (member.id === memberId) {
                return member.name;
            }
        }
        return;
    },
    addCard(listId,cardData = {text:'Empty Card',members: [],id:uuidv1()}) {
        let card = {
            text : cardData.text,
            members : cardData.members,
            id: uuidv1()
        }
        for(let list of board){
            if(list.id === listId){
                list.cards.push(card);
                return card;
            }
        }
    },
    removeList(listId){
        board.forEach(function(list,index){
            if(listId === list.id){
                board.splice(index,1);
            }
        })
    },
    getCardData(cardId,listId){
        for(let list of board){
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
        for(let list of board){
            if(list.id === listId){
                cards = list.cards;
                cards.forEach(function(card,index){
                    if(card.id === cardObj.id){
                        list.cards[index] = cardObj;
                        return;
                    }
                })
            }
        }
    },
    addMember(memberMame){
        member = {
            name:memberMame,
            id:uuidv1()
        }
        members.push(member)
    }
}