//移动端适配js,须放在head里所有css js 前面
// ! function(w, html) {
// 	var Flexible = function() {
// 		this.init = function() {
// 			var time = +new Date;
// 			var h = html;
// 			var winW = w.screen.width;
// 			var dpr = Math.floor(w.devicePixelRatio);
// 			var scale = 1 / dpr;
// 			document.querySelector('meta[name="viewport"]').setAttribute('content', 'width=device-width,initial-scale=' + scale + ',maximum-scale=' + scale + ',minimum-scale=' + scale + ',user-scalable=no');
// 			this.set(h, {
// 				'data-dpr': dpr,
// 				'data-device-width': winW,
// 				'data-bound-width': h.getBoundingClientRect().width,
// 				'data-style-width': getComputedStyle(document.documentElement, null).width
// 			})
// 			h.style.fontSize = h.getBoundingClientRect().width / 6.4 + 'px';
// 		};
// 		this.set = function(dom, o) {
// 			for(v in o) {
// 				dom.setAttribute(v, o[v]);
// 			}
// 		};
// 		this.init();
//
// 	}
// 	var flexible = new Flexible();
// 	window.addEventListener('onorientationchange' in window ? 'orientationchange' : 'resize', flexible.init.bind(flexible));
//
// }(window, document.documentElement)

(function(win, doc) {
    if(!win.addEventListener) return;
    var html = document.documentElement;

    function setFont() {
        var cliWidth = html.clientWidth;
        html.style.fontSize = 100 * (cliWidth / 750) + 'px';
    }
    win.addEventListener('resize', setFont, false)
    doc.addEventListener('DOMContentLoaded', setFont, false)
})(window, document);
