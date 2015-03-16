(function($) {
    $(document).ready(function() {
        var RankHtml = Backbone.Model.extend({
            dafaults: function() {
                return {
                    'content': '',
                    'url': ''
                }
            },
            initialize: function() {
                this.beginPage = 9,
                this.keywords = '内裤',
                this.url = "",

                //初始化时绑定监听
                this.bind("error", function(model, error) {
                    alert(error);
                });
            },
            setUrl: function(keywords, beginPage) {
                this.keywords = keywords;
                this.beginPage = beginPage;
                           //http://s.1688.com/selloffer/rpc_offer_search.jsonp?
                           //keywords=%C1%AC%D2%C2%C8%B9&n=y&
                           //uniqfield=pic_tag_id&
                           //async=true&
                           //asyncCount=20&
                           //startIndex=20&
                           //qrwRedirectEnabled=false&
                           //offset=4&isWideScreen=false&
                           //controls=_moduleConfig_%5EshopwindowOfferResult%7C_name_%5EofferResult&
                           //token=284448330&callback=jQuery18305260514293331653_1426476776448&_=1426476792171
                /*this.url = "http://s.1688.com/selloffer/rpc_offer_search.jsonp?
                keywords=" + keyword2utf8(keywords) + 
                "&n=y&beginPage=" + beginPage + 
                "&from=marketSearch&uniqfield=pic_tag_id&async=true&asyncCount=60&startIndex=0&qrwRedirectEnabled=false&offset=0&isWideScreen=true&controls=_template_%3Aofferresult%2Cshopwindow%2CshopwindowOfferResult.vm%7CindustryFlag%3A%7C_moduleConfig_%3AshopwindowResultConfig%7CpageSize%3A60%7C_name_%3AofferResult%7Coffset%3A4&token=2497481765&callback=?",*/
                
                this.url = "http://s.1688.com/selloffer/rpc_offer_search.jsonp?"
                           +"keywords="+ keyword2utf8(keywords) + 
                            +"uniqfield=pic_tag_id&"+
                            +"async=true&"+
                           +"asyncCount=20&"+
                           +"startIndex=20&"+
                           +"qrwRedirectEnabled=false&"+
                           +"offset=4&isWideScreen=false&"+
                           +"controls=_moduleConfig_%5EshopwindowOfferResult%7C_name_%5EofferResult&"+
                           +"token=284448330&callback=?";
                this.set("url", this.url);
            }
        });
        var Rank = Backbone.Model.extend({
            dafaults: function() {
                return {
                    'offerid': '',
                    'companyid': '',
                    'companyName': '',
                    'rank': '',
                    'page': ''
                }
            },
            validate: function(attrs, options) {
                if (attrs.offerid == "") {
                    return "offerid不能为空！";
                };
            },

            // 用户搜索的辅助方法
            filter: function(query) {
                if (typeof(query) === 'undefined' || query === null || query === '') return true;
                query = query.toLowerCase();
                return this.get('companyName').toLowerCase().indexOf(query) != -1 || this.get('offerid').toLowerCase().indexOf(query) != -1;
            }
        });

        var Ranks = Backbone.Collection.extend({
            model: Rank
        });

        // 单个搜素排名视图
        var ContactItemView = Backbone.View.extend({
            className: 'item',
            template: _.template($('#tpl-item').html()),
            initialize: function() {
                this.model.bind('reset', this.render, this);
                this.model.bind('change', this.render, this);
                this.model.bind('destroy', this.remove, this);
                if (this.model.view) this.model.view.remove();
                this.model.view = this;
            },

            // 渲染
            render: function() {
                this.$el.html(this.template(this.model.toJSON()));
                return this;
            },

            select: function() {
                appRouter.navigate('ranks/' + this.model.cid, {
                    trigger: true
                });
            },

            active: function() {
                this.$el.addClass('active');
            },

            deactive: function() {
                this.$el.removeClass('active');
            }
        });

        // 
        var SidebarView = Backbone.View.extend({
            className: 'sidebar',
            template: _.template($('#tpl-sidebar').html()),
            events: {
                'click footer button': 'seachByKeyWord',
                'click #search': 'filter',
                'keyup #search': 'filter'
                
            },
            ListHtml: [],
            ranksStr: "",
            pages:5,
            initialize: function() {
                var mythis = this;
                _.bindAll(this, 'create', 'filter');
                this.htmlDataModel = this.model;
                this.model.bind('reset', this.renderAll, this);
                this.model.bind('add', this.add, this);
                this.model.bind('remove', this.remove, this);
                this.options.htmlDataModel.bind('change:content', function() {
                    var str = removeAllSpace(this.get('content').offerResult.html);
                    mythis.ListHtml[this.beginPage-1] = str;
  
                        if (this.beginPage < mythis.pages) {
                            this.setUrl(this.keywords, this.beginPage+1);
                            window.layerid = layer.load("第" + this.beginPage + '页，加载中...');
                        }else {                  
                            window.layerid = layer.load("加载了" + this.beginPage + "页", 2);
                            for(var i=0;i<mythis.ListHtml.length;i++){
                               mythis.ranksStr+=mythis.ListHtml[i];
                            }
                            
                            mythis.model.reset(mythis.addCollection(mythis.ranksStr));
                        }    
                });
                this.options.htmlDataModel.bind('change:url', function() {
                    this.fetch({
                        add: true
                    });
                });

            },
            addCollection: function(result) {
                var ranksList = [];
                var companyid_re = /gotodetail="2"href="http:\/\/([\w-]*?).1688.com/gi; //companyid="b2b-2092343588"是正则表达式元字符之一,它的字面意义须转义 
                var offerid_re = /aofferid="([\d\D]*?)"/g;


                var companyName_re = /showmedal="1"target="_blank"(cindex="[0-9]*"offer-id="[a-zA-Z0-9]*"offer-p4p="com"lc="[0-9]*"rel="nofollow">)*([^\u4e00-\u9fa5])*[\u4e00-\u9fa5\（\）\,\.\s\(\)0-9a-zA-Z]*<\/a>/gim;
                var liStr_re = /<li[.]*<\/li>/gim;

                var companyid = result.match(companyid_re);
                var offerid = result.match(offerid_re);
                var companyName = result.match(companyName_re);
                if (!companyid | !offerid | !companyName) {
                    return null;
                }
                var re = /"([\d\D]*?)"/;
                var re2 = />([^&]*?)</;

                for (var i = 0; i < offerid.length; i++) {
                    var rank = {};
                    rank.offerid = re.exec(offerid[i])[1];
                    rank.companyid = companyid[i].split('"')[3];
                    rank.companyName = re2.exec(companyName[i])[1];
                    rank.rank =  i + 1;
                    rank.page = '第' + parseInt(i/60+1) + '页第' + (i%60+1) + '条';
                    ranksList.push(rank);

                };
                return ranksList;
            },
            // 渲染列表
            render: function() {
                $(this.el).html(this.template());
                this.renderAll();
                return this;
            },

            renderAll: function() {
                this.$(".items").empty();
                this.model.each(this.renderOne, this);
                this.filter();
            },

            renderOne: function(rank) {
                var view = new ContactItemView({
                    model: rank
                });
                this.$(".items").append(view.render().el);
            },

            create: function() {
                var contact = new Contact();
                this.model.add(contact);
                appRouter.navigate('ranks/' + contact.cid + '/edit', {
                    trigger: true
                });
            },

            filter: function() {
                var query = $('input', this.el).val();
                // query ="%E4%B8%9C%E8%8E%9E%E5%B8%82%E5%A4%A9%E5%85%81%E8%B4%B8%E6%98%93%E6%9C%89%E9%99%90%E5%85%AC%E5%8F%B8";//
                this.model.each(function(contact, element, index, list) {
                    contact.view.$el.toggle(contact.filter(query));
                });
            },

            active: function(item) {
                if (this.activeItem) this.activeItem.view.deactive();
                this.activeItem = item;
                if (this.activeItem) this.activeItem.view.active();
            },

            add: function(contact) {
                this.renderOne(contact);
            },

            remove: function(contact) {
                console.log(contact);
            },
            seachByKeyWord: function() {

                if (this.getkeyWord() == "") {
                    layer.tips('请输入关键词', this.$("footer .search_keyword"), {
                        guide: 3,
                        time: 2
                    });
                } else {
                    this.ranksStr = "";
                    this.model.reset();
                    this.options.htmlDataModel.setUrl(this.getkeyWord(), 1);
                }

            },
            getkeyWord: function() {
                return this.$("footer .search_keyword").val();

            },
            viewResize:function(){
                $(".sidebar").css("width",$('body').width());
              //  console.log($(this).width());
            }
        });

  
        // 整个页面的视图，管理SiderbarView
        var AppView = Backbone.View.extend({
            className: 'contacts',
            initialize: function() {
                this.sidebar = new SidebarView({
                    model: this.model,
                    htmlDataModel: this.options.htmlDataModel
                });

                this.vdiv = $('<div />').addClass('vdivide');
                this.render();
                var _this=this;
                $(window).load(function(){
                    _this.sidebar.viewResize();
                });
                $(window).resize(function(){
                    _this.sidebar.viewResize();
                });
            },

            render: function() {
                this.$el.append(this.sidebar.render().el);
                $('#article').append(this.el);
                return this;
            },

            show: function(item) {
                this.sidebar.active(item);
            },

            edit: function(item) {
                this.sidebar.active(item);
                this.main.edit(item);
            }
        });

        // 路由
        var AppRouter = Backbone.Router.extend({
            routes: {
                '': 'show',
                'ranks/:id': 'show',
                'ranks/:id/edit': 'edit'
            },

            show: function(id) {
                if (id != undefined) {
                    appView.show(this.getRank(id));
                } else {
                    appView.show(ranks.first());
                }
            },

            edit: function(id) {
                appView.edit(this.getRank(id));
            },

            getRank: function(id) {
                return ranks.getByCid(id);
            }
        });

        var rankHtml = new RankHtml();
        var ranks = new Ranks();
        window.appView = new AppView({
            model: ranks,
            htmlDataModel: rankHtml
        });
        window.appRouter = new AppRouter();
        Backbone.history.start();

        

    });
})(jQuery);
