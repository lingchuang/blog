$('loading').load('/blog/common/loading.html');
$('header').load('/blog/common/header.html');
$('footer').load('/blog/common/footer.html');

var aside = 'asideOthers.html';
var flag = $('aside').attr('data-aside') == 'asideAboutUs';
if(flag){
    aside = 'asideAboutUs.html';
}
$('aside').load('/blog/common/' + aside);

$(window).scroll(function(){if ($(window).scrollTop()>100){$("#totop").fadeIn('slow');}else{$("#totop").fadeOut('slow');}});
$("#totop").click(function(){$('body,html').animate({scrollTop:0},500);return false;});
setTitle();
var title = '';
function setTitle(){
    var href = window.location.href;
    var pageArr = href.split('.')[0].split('/');
    var pageName = pageArr[pageArr.length - 1];
    switch (pageName){
        case  'index':
            title = '首页';
            break;
        case  'aboutUs':
            title = '关于我们';
            break;
        case  'gossip':
            title = '碎言碎语';
            break;
        case  'messBoard':
            title = '留言板';
            break;
        case  'details':
            title = '文章详情';
            break;
        default :
            break;
    }
    //title = title + '--陈君健&陈思宇的情侣博客';
    title = title;
    $('title').text(title);
}

//返回文章Id
function getArticleTag () {
	var href = location.href;
	var articleTag = href.split('=')[1];
	return articleTag;
}

function initData(res,ele){
    res = eval(res);
    var tpHtml = $(ele).html();
    var myTp = Handlebars.compile(tpHtml);
    var dataHtml = myTp(res);
    return dataHtml;
}

//浏览次数 + 1
function addViewCount(articleId) {
    return false;
    //$.get('/blog/manage/func/app/addViewCount.php',{ articleId : articleId });
}