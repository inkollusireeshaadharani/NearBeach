!function(){"use strict";var e=tinymce.util.Tools.resolve("tinymce.PluginManager");const t=e=>t=>(e=>{const t=typeof e;return null===e?"null":"object"===t&&Array.isArray(e)?"array":"object"===t&&(r=o=e,(a=String).prototype.isPrototypeOf(r)||(null===(s=o.constructor)||void 0===s?void 0:s.name)===a.name)?"string":t;var r,o,a,s})(t)===e,r=t("string"),o=t("object"),a=t("array"),s=e=>!(e=>null==e)(e);class i{constructor(e,t){this.tag=e,this.value=t}static some(e){return new i(!0,e)}static none(){return i.singletonNone}fold(e,t){return this.tag?t(this.value):e()}isSome(){return this.tag}isNone(){return!this.tag}map(e){return this.tag?i.some(e(this.value)):i.none()}bind(e){return this.tag?e(this.value):i.none()}exists(e){return this.tag&&e(this.value)}forall(e){return!this.tag||e(this.value)}filter(e){return!this.tag||e(this.value)?this:i.none()}getOr(e){return this.tag?this.value:e}or(e){return this.tag?this:e}getOrThunk(e){return this.tag?this.value:e()}orThunk(e){return this.tag?this:e()}getOrDie(e){if(this.tag)return this.value;throw new Error(null!=e?e:"Called getOrDie on None")}static from(e){return s(e)?i.some(e):i.none()}getOrNull(){return this.tag?this.value:null}getOrUndefined(){return this.value}each(e){this.tag&&e(this.value)}toArray(){return this.tag?[this.value]:[]}toString(){return this.tag?`some(${this.value})`:"none()"}}i.singletonNone=new i(!1);const n=Array.prototype.push,c=(e,t)=>{for(let r=0,o=e.length;r<o;r++)t(e[r],r)},l=e=>{const t=[];for(let r=0,o=e.length;r<o;++r){if(!a(e[r]))throw new Error("Arr.flatten item "+r+" was not an array, input: "+e);n.apply(t,e[r])}return t},m=Object.keys,u=Object.hasOwnProperty,d=(e,t)=>h(e,t)?i.from(e[t]):i.none(),h=(e,t)=>u.call(e,t),p=e=>t=>t.options.get(e),g=p("audio_template_callback"),b=p("video_template_callback"),w=p("iframe_template_callback"),v=p("media_live_embeds"),y=p("media_filter_html"),f=p("media_url_resolver"),x=p("media_alt_source"),_=p("media_poster"),j=p("media_dimensions");var k=tinymce.util.Tools.resolve("tinymce.util.Tools"),O=tinymce.util.Tools.resolve("tinymce.dom.DOMUtils"),A=tinymce.util.Tools.resolve("tinymce.html.DomParser");const S=O.DOM,$=e=>e.replace(/px$/,""),C=e=>{const t=e.attr("style"),r=t?S.parseStyle(t):{};return{type:"ephox-embed-iri",source:e.attr("data-ephox-embed-iri"),altsource:"",poster:"",width:d(r,"max-width").map($).getOr(""),height:d(r,"max-height").map($).getOr("")}},D=(e,t)=>{let r={};for(let o=A({validate:!1,forced_root_block:!1},t).parse(e);o;o=o.walk())if(1===o.type){const e=o.name;if(o.attr("data-ephox-embed-iri")){r=C(o);break}r.source||"param"!==e||(r.source=o.attr("movie")),"iframe"!==e&&"object"!==e&&"embed"!==e&&"video"!==e&&"audio"!==e||(r.type||(r.type=e),r=k.extend(o.attributes.map,r)),"script"===e&&(r={type:"script",source:o.attr("src")}),"source"===e&&(r.source?r.altsource||(r.altsource=o.attr("src")):r.source=o.attr("src")),"img"!==e||r.poster||(r.poster=o.attr("src"))}return r.source=r.source||r.src||"",r.altsource=r.altsource||"",r.poster=r.poster||"",r},T=e=>{var t;const r=null!==(t=e.toLowerCase().split(".").pop())&&void 0!==t?t:"";return d({mp3:"audio/mpeg",m4a:"audio/x-m4a",wav:"audio/wav",mp4:"video/mp4",webm:"video/webm",ogg:"video/ogg",swf:"application/x-shockwave-flash"},r).getOr("")};var z=tinymce.util.Tools.resolve("tinymce.html.Node"),F=tinymce.util.Tools.resolve("tinymce.html.Serializer");const M=(e,t={})=>A({forced_root_block:!1,validate:!1,allow_conditional_comments:!0,...t},e),N=O.DOM,R=e=>/^[0-9.]+$/.test(e)?e+"px":e,E=(e,t)=>{const r=t.attr("style"),o=r?N.parseStyle(r):{};s(e.width)&&(o["max-width"]=R(e.width)),s(e.height)&&(o["max-height"]=R(e.height)),t.attr("style",N.serializeStyle(o))},U=["source","altsource"],P=(e,t,r,o)=>{let a=0,s=0;const i=M(o);i.addNodeFilter("source",(e=>a=e.length));const n=i.parse(e);for(let e=n;e;e=e.walk())if(1===e.type){const o=e.name;if(e.attr("data-ephox-embed-iri")){E(t,e);break}switch(o){case"video":case"object":case"embed":case"img":case"iframe":void 0!==t.height&&void 0!==t.width&&(e.attr("width",t.width),e.attr("height",t.height))}if(r)switch(o){case"video":e.attr("poster",t.poster),e.attr("src",null);for(let r=a;r<2;r++)if(t[U[r]]){const o=new z("source",1);o.attr("src",t[U[r]]),o.attr("type",t[U[r]+"mime"]||null),e.append(o)}break;case"iframe":e.attr("src",t.source);break;case"object":const r=e.getAll("img").length>0;if(t.poster&&!r){e.attr("src",t.poster);const r=new z("img",1);r.attr("src",t.poster),r.attr("width",t.width),r.attr("height",t.height),e.append(r)}break;case"source":if(s<2&&(e.attr("src",t[U[s]]),e.attr("type",t[U[s]+"mime"]||null),!t[U[s]])){e.remove();continue}s++;break;case"img":t.poster||e.remove()}}return F({},o).serialize(n)},L=[{regex:/youtu\.be\/([\w\-_\?&=.]+)/i,type:"iframe",w:560,h:314,url:"www.youtube.com/embed/$1",allowFullscreen:!0},{regex:/youtube\.com(.+)v=([^&]+)(&([a-z0-9&=\-_]+))?/i,type:"iframe",w:560,h:314,url:"www.youtube.com/embed/$2?$4",allowFullscreen:!0},{regex:/youtube.com\/embed\/([a-z0-9\?&=\-_]+)/i,type:"iframe",w:560,h:314,url:"www.youtube.com/embed/$1",allowFullscreen:!0},{regex:/vimeo\.com\/([0-9]+)\?h=(\w+)/,type:"iframe",w:425,h:350,url:"player.vimeo.com/video/$1?h=$2&title=0&byline=0&portrait=0&color=8dc7dc",allowFullscreen:!0},{regex:/vimeo\.com\/(.*)\/([0-9]+)\?h=(\w+)/,type:"iframe",w:425,h:350,url:"player.vimeo.com/video/$2?h=$3&title=0&amp;byline=0",allowFullscreen:!0},{regex:/vimeo\.com\/([0-9]+)/,type:"iframe",w:425,h:350,url:"player.vimeo.com/video/$1?title=0&byline=0&portrait=0&color=8dc7dc",allowFullscreen:!0},{regex:/vimeo\.com\/(.*)\/([0-9]+)/,type:"iframe",w:425,h:350,url:"player.vimeo.com/video/$2?title=0&amp;byline=0",allowFullscreen:!0},{regex:/maps\.google\.([a-z]{2,3})\/maps\/(.+)msid=(.+)/,type:"iframe",w:425,h:350,url:'maps.google.com/maps/ms?msid=$2&output=embed"',allowFullscreen:!1},{regex:/dailymotion\.com\/video\/([^_]+)/,type:"iframe",w:480,h:270,url:"www.dailymotion.com/embed/video/$1",allowFullscreen:!0},{regex:/dai\.ly\/([^_]+)/,type:"iframe",w:480,h:270,url:"www.dailymotion.com/embed/video/$1",allowFullscreen:!0}],I=(e,t)=>{const r=(e=>{const t=e.match(/^(https?:\/\/|www\.)(.+)$/i);return t&&t.length>1?"www."===t[1]?"https://":t[1]:"https://"})(t),o=e.regex.exec(t);let a=r+e.url;if(s(o))for(let e=0;e<o.length;e++)a=a.replace("$"+e,(()=>o[e]?o[e]:""));return a.replace(/\?$/,"")},B=e=>{const t=L.filter((t=>t.regex.test(e)));return t.length>0?k.extend({},t[0],{url:I(t[0],e)}):null},G=(e,t)=>{var r;const o=k.extend({},t);if(!o.source&&(k.extend(o,D(null!==(r=o.embed)&&void 0!==r?r:"",e.schema)),!o.source))return"";o.altsource||(o.altsource=""),o.poster||(o.poster=""),o.source=e.convertURL(o.source,"source"),o.altsource=e.convertURL(o.altsource,"source"),o.sourcemime=T(o.source),o.altsourcemime=T(o.altsource),o.poster=e.convertURL(o.poster,"poster");const a=B(o.source);if(a&&(o.source=a.url,o.type=a.type,o.allowfullscreen=a.allowFullscreen,o.width=o.width||String(a.w),o.height=o.height||String(a.h)),o.embed)return P(o.embed,o,!0,e.schema);{const t=g(e),r=b(e),a=w(e);return o.width=o.width||"300",o.height=o.height||"150",k.each(o,((t,r)=>{o[r]=e.dom.encode(""+t)})),"iframe"===o.type?((e,t)=>{if(t)return t(e);{const t=e.allowfullscreen?' allowFullscreen="1"':"";return'<iframe src="'+e.source+'" width="'+e.width+'" height="'+e.height+'"'+t+"></iframe>"}})(o,a):"application/x-shockwave-flash"===o.sourcemime?(e=>{let t='<object data="'+e.source+'" width="'+e.width+'" height="'+e.height+'" type="application/x-shockwave-flash">';return e.poster&&(t+='<img src="'+e.poster+'" width="'+e.width+'" height="'+e.height+'" />'),t+="</object>",t})(o):-1!==o.sourcemime.indexOf("audio")?((e,t)=>t?t(e):'<audio controls="controls" src="'+e.source+'">'+(e.altsource?'\n<source src="'+e.altsource+'"'+(e.altsourcemime?' type="'+e.altsourcemime+'"':"")+" />\n":"")+"</audio>")(o,t):"script"===o.type?(e=>'<script src="'+e.source+'"><\/script>')(o):((e,t)=>t?t(e):'<video width="'+e.width+'" height="'+e.height+'"'+(e.poster?' poster="'+e.poster+'"':"")+' controls="controls">\n<source src="'+e.source+'"'+(e.sourcemime?' type="'+e.sourcemime+'"':"")+" />\n"+(e.altsource?'<source src="'+e.altsource+'"'+(e.altsourcemime?' type="'+e.altsourcemime+'"':"")+" />\n":"")+"</video>")(o,r)}},W=e=>e.hasAttribute("data-mce-object")||e.hasAttribute("data-ephox-embed-iri"),q={},H=e=>t=>G(e,t),J=(e,t)=>{const r=f(e);return r?((e,t,r)=>new Promise(((o,a)=>{const s=r=>(r.html&&(q[e.source]=r),o({url:e.source,html:r.html?r.html:t(e)}));q[e.source]?s(q[e.source]):r({url:e.source},s,a)})))(t,H(e),r):((e,t)=>Promise.resolve({html:t(e),url:e.source}))(t,H(e))},K=(e,t)=>{const r={};return d(e,"dimensions").each((e=>{c(["width","height"],(o=>{d(t,o).orThunk((()=>d(e,o))).each((e=>r[o]=e))}))})),r},Q=(e,t)=>{const r=t&&"dimensions"!==t?((e,t)=>d(t,e).bind((e=>d(e,"meta"))))(t,e).getOr({}):{},a=((e,t,r)=>a=>{const s=()=>d(e,a),n=()=>d(t,a),c=e=>d(e,"value").bind((e=>e.length>0?i.some(e):i.none()));return{[a]:(a===r?s().bind((e=>o(e)?c(e).orThunk(n):n().orThunk((()=>i.from(e))))):n().orThunk((()=>s().bind((e=>o(e)?c(e):i.from(e)))))).getOr("")}})(e,r,t);return{...a("source"),...a("altsource"),...a("poster"),...a("embed"),...K(e,r)}},V=e=>{const t={...e,source:{value:d(e,"source").getOr("")},altsource:{value:d(e,"altsource").getOr("")},poster:{value:d(e,"poster").getOr("")}};return c(["width","height"],(r=>{d(e,r).each((e=>{const o=t.dimensions||{};o[r]=e,t.dimensions=o}))})),t},X=e=>t=>{const r=t&&t.msg?"Media embed handler error: "+t.msg:"Media embed handler threw unknown error.";e.notificationManager.open({type:"error",text:r})},Y=(e,t)=>o=>{if(r(o.url)&&o.url.trim().length>0){const r=o.html,a={...D(r,t.schema),source:o.url,embed:r};e.setData(V(a))}},Z=(e,t)=>{const r=e.dom.select("*[data-mce-object]");e.insertContent(t),((e,t)=>{const r=e.dom.select("*[data-mce-object]");for(let e=0;e<t.length;e++)for(let o=r.length-1;o>=0;o--)t[e]===r[o]&&r.splice(o,1);e.selection.select(r[0])})(e,r),e.nodeChanged()},ee=(e,t)=>s(t)&&"ephox-embed-iri"===t&&s(B(e)),te=(e,t)=>((e,t)=>e.width!==t.width||e.height!==t.height)(e,t)&&ee(t.source,e.type),re=e=>{const t=(e=>{const t=e.selection.getNode(),r=W(t)?e.serializer.serialize(t,{selection:!0}):"",o=D(r,e.schema),a=(()=>{if(ee(o.source,o.type)){const r=e.dom.getRect(t);return{width:r.w.toString().replace(/px$/,""),height:r.h.toString().replace(/px$/,"")}}return{}})();return{embed:r,...o,...a}})(e),r=(e=>{let t=e;return{get:()=>t,set:e=>{t=e}}})(t),o=V(t),a=j(e)?[{type:"sizeinput",name:"dimensions",label:"Constrain proportions",constrain:!0}]:[],s={title:"General",name:"general",items:l([[{name:"source",type:"urlinput",filetype:"media",label:"Source"}],a])},i=[];x(e)&&i.push({name:"altsource",type:"urlinput",filetype:"media",label:"Alternative source URL"}),_(e)&&i.push({name:"poster",type:"urlinput",filetype:"image",label:"Media poster (Image URL)"});const n={title:"Advanced",name:"advanced",items:i},c=[s,{title:"Embed",items:[{type:"textarea",name:"embed",label:"Paste your embed code below:"}]}];i.length>0&&c.push(n);const m={type:"tabpanel",tabs:c},u=e.windowManager.open({title:"Insert/Edit Media",size:"normal",body:m,buttons:[{type:"cancel",name:"cancel",text:"Cancel"},{type:"submit",name:"save",text:"Save",primary:!0}],onSubmit:t=>{const o=Q(t.getData());((e,t,r)=>{var o,a;t.embed=te(e,t)&&j(r)?G(r,{...t,embed:""}):P(null!==(o=t.embed)&&void 0!==o?o:"",t,!1,r.schema),t.embed&&(e.source===t.source||(a=t.source,h(q,a)))?Z(r,t.embed):J(r,t).then((e=>{Z(r,e.html)})).catch(X(r))})(r.get(),o,e),t.close()},onChange:(t,o)=>{switch(o.name){case"source":((t,r)=>{const o=Q(r.getData(),"source");t.source!==o.source&&(Y(u,e)({url:o.source,html:""}),J(e,o).then(Y(u,e)).catch(X(e)))})(r.get(),t);break;case"embed":(t=>{var r;const o=Q(t.getData()),a=D(null!==(r=o.embed)&&void 0!==r?r:"",e.schema);t.setData(V(a))})(t);break;case"dimensions":case"altsource":case"poster":((t,r,o)=>{const a=Q(t.getData(),r),s=te(o,a)&&j(e)?{...a,embed:""}:a,i=G(e,s);t.setData(V({...s,embed:i}))})(t,o.name,r.get())}r.set(Q(t.getData()))},initialData:o})};var oe=tinymce.util.Tools.resolve("tinymce.Env");const ae=e=>{const t=e.name;return"iframe"===t||"video"===t||"audio"===t},se=(e,t,r,o=null)=>{const a=e.attr(r);return s(a)?a:h(t,r)?null:o},ie=(e,t,r)=>{const o="img"===t.name||"video"===e.name,a=o?"300":null,s="audio"===e.name?"30":"150",i=o?s:null;t.attr({width:se(e,r,"width",a),height:se(e,r,"height",i)})},ne=(e,t)=>{const r=t.name,o=new z("img",1);return le(e,t,o),ie(t,o,{}),o.attr({style:t.attr("style"),src:oe.transparentSrc,"data-mce-object":r,class:"mce-object mce-object-"+r}),o},ce=(e,t)=>{var r;const o=t.name,a=new z("span",1);a.attr({contentEditable:"false",style:t.attr("style"),"data-mce-object":o,class:"mce-preview-object mce-object-"+o}),le(e,t,a);const i=e.dom.parseStyle(null!==(r=t.attr("style"))&&void 0!==r?r:""),n=new z(o,1);if(ie(t,n,i),n.attr({src:t.attr("src"),style:t.attr("style"),class:t.attr("class")}),"iframe"===o)n.attr({allowfullscreen:t.attr("allowfullscreen"),frameborder:"0"});else{c(["controls","crossorigin","currentTime","loop","muted","poster","preload"],(e=>{n.attr(e,t.attr(e))}));const r=a.attr("data-mce-html");s(r)&&((e,t,r,o)=>{const a=M(e.schema).parse(o,{context:t});for(;a.firstChild;)r.append(a.firstChild)})(e,o,n,unescape(r))}const l=new z("span",1);return l.attr("class","mce-shim"),a.append(n),a.append(l),a},le=(e,t,r)=>{var o;const a=null!==(o=t.attributes)&&void 0!==o?o:[];let s=a.length;for(;s--;){const t=a[s].name;let o=a[s].value;"width"===t||"height"===t||"style"===t||(n="data-mce-",(i=t).length>=9&&i.substr(0,9)===n)||("data"!==t&&"src"!==t||(o=e.convertURL(o,t)),r.attr("data-mce-p-"+t,o))}var i,n;const l=F({inner:!0},e.schema),m=new z("div",1);c(t.children(),(e=>m.append(e)));const u=l.serialize(m);u&&(r.attr("data-mce-html",escape(u)),r.empty())},me=e=>{const t=e.attr("class");return r(t)&&/\btiny-pageembed\b/.test(t)},ue=e=>{let t=e;for(;t=t.parent;)if(t.attr("data-ephox-embed-iri")||me(t))return!0;return!1},de=(e,t,r)=>{const o=(0,e.options.get)("xss_sanitization"),a=y(e);return M(e.schema,{sanitize:o,validate:a}).parse(r,{context:t})},he=e=>t=>{const r=()=>{t.setEnabled(e.selection.isEditable())};return e.on("NodeChange",r),r(),()=>{e.off("NodeChange",r)}};e.add("media",(e=>((e=>{const t=e.options.register;t("audio_template_callback",{processor:"function"}),t("video_template_callback",{processor:"function"}),t("iframe_template_callback",{processor:"function"}),t("media_live_embeds",{processor:"boolean",default:!0}),t("media_filter_html",{processor:"boolean",default:!0}),t("media_url_resolver",{processor:"function"}),t("media_alt_source",{processor:"boolean",default:!0}),t("media_poster",{processor:"boolean",default:!0}),t("media_dimensions",{processor:"boolean",default:!0})})(e),(e=>{e.addCommand("mceMedia",(()=>{re(e)}))})(e),(e=>{const t=()=>e.execCommand("mceMedia");e.ui.registry.addToggleButton("media",{tooltip:"Insert/edit media",icon:"embed",onAction:t,onSetup:t=>{const r=e.selection;t.setActive(W(r.getNode()));const o=r.selectorChangedWithUnbind("img[data-mce-object],span[data-mce-object],div[data-ephox-embed-iri]",t.setActive).unbind,a=he(e)(t);return()=>{o(),a()}}}),e.ui.registry.addMenuItem("media",{icon:"embed",text:"Media...",onAction:t,onSetup:he(e)})})(e),(e=>{e.on("ResolveName",(e=>{let t;1===e.target.nodeType&&(t=e.target.getAttribute("data-mce-object"))&&(e.name=t)}))})(e),(e=>{e.on("PreInit",(()=>{const{schema:t,serializer:r,parser:o}=e,a=t.getBoolAttrs();c("webkitallowfullscreen mozallowfullscreen".split(" "),(e=>{a[e]={}})),((e,t)=>{const r=m(e);for(let o=0,a=r.length;o<a;o++){const a=r[o];t(e[a],a)}})({embed:["wmode"]},((e,r)=>{const o=t.getElementRule(r);o&&c(e,(e=>{o.attributes[e]={},o.attributesOrder.push(e)}))})),o.addNodeFilter("iframe,video,audio,object,embed,script",(e=>t=>{let r,o=t.length;for(;o--;)r=t[o],r.parent&&(r.parent.attr("data-mce-object")||(ae(r)&&v(e)?ue(r)||r.replace(ce(e,r)):ue(r)||r.replace(ne(e,r))))})(e)),r.addAttributeFilter("data-mce-object",((t,r)=>{var o;let a=t.length;for(;a--;){const s=t[a];if(!s.parent)continue;const i=s.attr(r),n=new z(i,1);if("audio"!==i&&"script"!==i){const e=s.attr("class");e&&-1!==e.indexOf("mce-preview-object")&&s.firstChild?n.attr({width:s.firstChild.attr("width"),height:s.firstChild.attr("height")}):n.attr({width:s.attr("width"),height:s.attr("height")})}n.attr({style:s.attr("style")});const l=null!==(o=s.attributes)&&void 0!==o?o:[];let m=l.length;for(;m--;){const e=l[m].name;0===e.indexOf("data-mce-p-")&&n.attr(e.substr(11),l[m].value)}"script"===i&&n.attr("type","text/javascript");const u=s.attr("data-mce-html");if(u){const t=de(e,i,unescape(u));c(t.children(),(e=>n.append(e)))}s.replace(n)}}))})),e.on("SetContent",(()=>{const t=e.dom;c(t.select("span.mce-preview-object"),(e=>{0===t.select("span.mce-shim",e).length&&t.add(e,"span",{class:"mce-shim"})}))}))})(e),(e=>{e.on("click keyup touchend",(()=>{const t=e.selection.getNode();t&&e.dom.hasClass(t,"mce-preview-object")&&e.dom.getAttrib(t,"data-mce-selected")&&t.setAttribute("data-mce-selected","2")})),e.on("ObjectSelected",(e=>{"script"===e.target.getAttribute("data-mce-object")&&e.preventDefault()})),e.on("ObjectResized",(t=>{const r=t.target;if(r.getAttribute("data-mce-object")){let o=r.getAttribute("data-mce-html");o&&(o=unescape(o),r.setAttribute("data-mce-html",escape(P(o,{width:String(t.width),height:String(t.height)},!1,e.schema))))}}))})(e),(e=>({showDialog:()=>{re(e)}}))(e))))}();