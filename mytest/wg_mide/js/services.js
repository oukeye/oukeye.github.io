angular.module('starter.services', [])

.factory('Chats', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
        }];

        return {
            all: function() {
                return chats;
            },
            remove: function(chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function(chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
    })
    .factory('Gift', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var gifts = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift1.jpg'
        }, {
            id: 1,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift2.jpg'
        }, {
            id: 2,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift3.jpg'
        }, {
            id: 3,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift4.jpg'
        }, {
            id: 4,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift5.jpg'
        }, {
            id: 5,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift6.jpg'
        }, {
            id: 6,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift7.jpg'
        }, {
            id: 7,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift8.jpg'
        }, {
            id: 8,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            img: './img/gift9.jpg'
        }, ];

        return {
            all: function() {
                return gifts;
            },
            remove: function(gift) {
                gifts.splice(Gift.indexOf(gift), 1);
            },
            get: function(giftId) {
                for (var i = 0; i < gifts.length; i++) {
                    if (gifts[i].id === parseInt(giftId)) {
                        return gifts[i];
                    }
                }
                return null;
            }
        };
    });
