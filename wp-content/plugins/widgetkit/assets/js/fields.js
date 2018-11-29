!function(e){function t(e,t){var i=jQuery.Deferred(),n=document.createElement("script");return n.async=!0,n.onload=function(){i.resolve(),t&&t(n)},n.onerror=function(){i.reject(e)},n.src=e,document.getElementsByTagName("head")[0].appendChild(n),i.promise()}angular.module("Fields",[]).directive("fieldMedia",["mediaPicker","mediaInfo",function(e,t){function i(i){var a=this;a.selectMedia=function(){e.select().then(function(e){i.media=e.url,i.height=e.height,i.width=e.width,i.title||(i.title=String(e.title).replace(/(-|_)/g," ").replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g,function(e){return e.toUpperCase()}))})},a.selectPoster=function(){e.select().then(function(e){i.options||(i.options={}),i.options.poster=e.url})},a.isVideo=function(e){return!(!e||!(e.match(/\.(mp4|ogv|webm)$/)||e.match(/(\/\/.*?)vimeo\.[a-z]+\/(?:\w*\/)*(\d+)/i)||e.match(/(\/\/.*?youtube\.[a-z]+)\/watch\?v=([^&]+)(.*)/i)||e.match(/(\/\/.*?youtu\.be)\/([^\?]+)(.*)/i)))},i.$watch("media",function(){return i.options&&!angular.isArray(i.options)||(i.options={}),n[i.media]?(i.options.width=n[i.media].width,void(i.options.height=n[i.media].height)):void t(i.media,!0).then(function(e){i.height="",i.width="",Object.keys(n).length>0&&i.options.iframe&&!n[i.media]&&(i.options.iframe.width="",i.options.iframe.height=""),e.type&&(i.options.width=e.width,i.options.height=e.height,i.options.type=e.type,n[i.media]=e)})},!0),i.$watch("options.iframe",function(){i.options.iframe&&(i.options.width=i.options.iframe.width,i.options.height=i.options.iframe.height)},!0)}var n={};return{scope:{media:"=",options:"=?",title:"=?"},restrict:"E",controller:["$scope",i],controllerAs:"vm",template:'<div>                                  <div class="uk-flex">                                      <div class="uk-form-icon uk-flex-item-1 uk-margin-small-right">                                          <i class="uk-icon-photo"></i><input class="uk-width-1-1" ng-model="media">                                      </div>                                      <button class="uk-button" ng-click="vm.selectMedia()">Select</button>                                  </div>                                  <div class="uk-grid uk-margin-top">                                      <div class="uk-width-small-1-2">                                          <div class="uk-overlay">                                              <media-preview src="{{ media }}"></media-preview>                                              <div class="uk-overlay-panel uk-overlay-bottom uk-panel uk-panel-box" ng-show="options.type === \'iframe\'">                                                  <div class="uk-grid uk-grid-small uk-grid-width-1-3 uk-margin-small-top">                                                      <div class="uk-form-icon"><i class="uk-icon-arrows-h"></i><input class="uk-width-1-1" type="text" title="Width" ng-model="options.iframe.width" placeholder="width"></div>                                                      <div class="uk-form-icon"><i class="uk-icon-arrows-v"></i><input class="uk-width-1-1" type="text" title="Height" ng-model="options.iframe.height" placeholder="height"></div>                                                  </div>                                              </div>                                          </div>                                      </div>                                      <div class="uk-width-small-1-2" ng-show="vm.isVideo(media)">                                          <div class="uk-margin-small-bottom" ng-show="options.poster"><media-preview src="{{ options.poster }}"></media-preview></div>                                          <a ng-click="vm.selectPoster()">Select Poster</button>                                          <a class="uk-margin-small-left" ng-show="options.poster" ng-click="(options.poster = \'\')">Reset</a>                                      </div>                                  </div>                               </div>'}}]).directive("fieldWysiwygeditor",["$timeout","mediaPicker","mediaInfo",function(e,t,i){return{restrict:"EA",require:"?ngModel",template:'<div><textarea name="wk_{{id}}" id="wk_{{id}}"></textarea></div>',link:function(i,n,a,o){if(window.tinyMCE){i.id=String(Math.ceil(1e3*Math.random()));var r=jQuery,l="wk_"+i.id,s=function(){var e,n=window.tinyMCE||window.WFEditor;window.WFEditor&&r("#"+l).after('<input type="hidden" id="wf_'+i.id+'_token" value="'+Math.random()+'">');var a=n.settings&&n.settings.toolbar1||"",s=n.settings&&n.settings.toolbar2||"",d=n.settings&&n.settings.plugins||"";!window.wp||a&&s&&d||(d||(d="charmap,colorpicker,hr,lists,media,paste,tabfocus,textcolor,fullscreen,wordpress,wpautoresize,wpeditimage,wpemoji,wpgallery,wplink,wpdialogs,wptextpattern,wpview,wpembed"),a||(a="bold,italic,strikethrough,bullist,numlist,blockquote,hr,alignleft,aligncenter,alignright,link,unlink,wp_more,spellchecker,dfw,wp_adv"),s||(s="formatselect,underline,alignjustify,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo,wp_help")),a.indexOf("wk_media")==-1&&(a+=" wk_media"),window.wp||window.WFEditor||a.indexOf("button-2Article")!=-1||(a+=" button-2Article"),window.wp||window.WFEditor||d.indexOf("jArticleButton")!=-1||(d+=" jArticleButton"),e=r.extend({},n.settings,{menubar:!1,plugins:d,toolbar1:a,toolbar2:s,width:"100%",height:500,relative_urls:!1,setup:function(e){e.addButton("wk_media",{text:"",icon:"image",onclick:function(){window.wp?t.select({editor:l}):t.select().then(function(t){var i=t.href,n=t.title,a=t.width,o=t.height;e.insertContent('<img src="'+i+'" alt="'+n+'" data-mce-src="'+i+'" width="'+a+'" height="'+o+'"></img>')})}}),4==tinyMCE.majorVersion?(e.on("change",function(){o.$setViewValue(tinyMCE.get(l).getContent())}),e.on("input",function(){o.$setViewValue(tinyMCE.get(l).getContent())}),e.on("init",function(){e.setContent(o.$viewValue||"")})):(e.onChange.add(function(){o.$setViewValue(tinyMCE.get(l).getContent())}),e.onKeyUp.add(function(){o.$setViewValue(tinyMCE.get(l).getContent())}),e.onInit.add(function(){e.setContent(o.$viewValue||"")}))}});var c=new tinyMCE.Editor(l,e,tinyMCE.EditorManager);c.render(),o.$render=function(){c.setContent(o.$viewValue||"")},o.$render()};e(s)}}}}]).directive("fieldHtmleditor",["$timeout","$q",function(i,n){function a(){return o||(o=jQuery.Deferred(),t(widgetkit.config.adminBase+"/assets/lib/codemirror/codemirror.js").then(function(){t(widgetkit.config.adminBase+"/src/Framework/assets/uikit/js/components/htmleditor.min.js").then(function(){o.resolve()})})),o.promise()}var o;return{restrict:"EA",require:"?ngModel",link:function(t,n,o,r){a().then(function(){var a,l=jQuery("<textarea></textarea>"),s={mdparser:function(){}};s=jQuery.extend(!0,{},s,t.$eval(o.options)),n.after(l).hide();var d=function(){r.$render=function(){l.data("htmleditor")&&l.data("htmleditor").editor.setValue(r.$viewValue||"")},setTimeout(function(){a=e.htmleditor(l,s),a.editor.on("change",e.Utils.debounce(function(){r.$setViewValue(a.editor.getValue()),t.$root.$$phase||t.$apply()},50)),a.fit(),r.$render()})};i(d)})}}}]).directive("fieldLocation",["$timeout","$q",function(i,n){function a(){return o||(o=jQuery.Deferred(),t(widgetkit.config.adminBase+"/plugins/widgets/map/assets/marker-helper.js").then(function(){o.resolve()})),o.promise()}var o,r=0,l=function(){var e,t=function(){if(!e){e=n.defer();var t=document.createElement("script");t.async=!0,t.onload=function(){google.load("maps","3",{other_params:"libraries=places&key="+(window.GOOGLE_MAPS_API_KEY||""),callback:function(){google&&google.maps.places&&e.resolve()}})},t.onerror=function(){alert("Failed loading google maps api.")},t.src="https://www.google.com/jsapi",document.getElementsByTagName("head")[0].appendChild(t)}return e.promise};return t}();return{restrict:"EA",require:"?ngModel",scope:{latlng:"@"},replace:!0,template:'<div>                                    <div class="uk-alert uk-margin-small-bottom" ng-if="!APIKEY">Please add your custom Google Maps API Key in the <a href="'+widgetkit.config.settingsPage+'">Widgetkit settings</a>!</div>                                    <div class="uk-grid uk-grid-small">                                         <div class="uk-form uk-form-icon uk-margin-small-bottom uk-width-3-5">                                            <i class="uk-icon-search"></i><input class="uk-width-1-1">                                        </div>                                        <div class="uk-form uk-form-horizontal uk-margin-small-bottom uk-width-2-5">                                            <input class="uk-width-1-1" type="text" placeholder="Custom marker: URL or #000" ng-model="latlng.marker">                                        </div>                                    </div>                                    <div class="js-map" style="min-height:300px;">                                     Loading map...                                     </div>                                     <div class="uk-text-small uk-margin-small-top">LAT: <span class="uk-text-muted">{{ latlng.lat }}</span> LNG: <span class="uk-text-muted">{{ latlng.lng }}</span> <span ng-if="latlng.place">PLACE: <span class="uk-text-muted">{{ latlng.place.name }}</span></span></div>                                </div>',link:function(t,n,o,s){function d(e){var n=jQuery.extend({lat:c.getPosition().lat(),lng:c.getPosition().lng(),marker:"",place:!1},s.$viewValue,e);s.$setViewValue(n),t.latlng=n,i(function(){t.$apply()})}var c;a().then(function(){l().then(function(){i(function(){var i,a,o,l="wk-location-"+ ++r,u=new google.maps.LatLng(53.55909862554551,9.998652343749995);t.latlng=s.$viewValue||{lat:u.lat(),lng:u.lng(),marker:"",place:!1},void 0===t.latlng.marker&&(t.latlng.marker=""),n.find(".js-map").attr("id",l),i=new google.maps.Map(document.getElementById(l),{zoom:6,center:u}),c=new google.maps.Marker({position:u,map:i,draggable:!0}),MapsMarkerHelper.setIcon(c,t.latlng.marker),google.maps.event.addListener(c,"dragend",function(){var e=c.getPosition();d({lat:e.lat(),lng:e.lng(),place:!1}),a.value=""}),e.$win.on("resize",function(){google.maps.event.trigger(i,"resize"),i.setCenter(c.getPosition())}),a=n.find("input")[0],o=new google.maps.places.Autocomplete(a),o.bindTo("bounds",i),google.maps.event.addListener(o,"place_changed",function(){var e=o.getPlace();if(e.geometry){e.geometry.viewport?i.fitBounds(e.geometry.viewport):i.setCenter(e.geometry.location),c.setPosition(e.geometry.location),a.value="";var t=c.getPosition();d({lat:t.lat(),lng:t.lng(),place:e})}}),google.maps.event.addDomListener(a,"keydown",function(e){13==e.keyCode&&e.preventDefault()}),t.$watch("latlng.marker",function(e){e&&d({marker:e}),MapsMarkerHelper.setIcon(c,e)}),s.$render=function(){try{if(s.$viewValue&&s.$viewValue.lat&&s.$viewValue.lng){var e=new google.maps.LatLng(s.$viewValue.lat,s.$viewValue.lng);c.setPosition(e),i.setCenter(e),s.$viewValue.marker!==t.latlng.marker&&d({marker:s.$viewValue.marker}),MapsMarkerHelper.setIcon(c,latlng.marker)}else d({lat:c.getPosition().lat(),lng:c.getPosition().lng(),marker:"",place:!1})}catch(n){}},s.$render()})})}),t.APIKEY=window.GOOGLE_MAPS_API_KEY||""}}}]).directive("fieldPathpicker",["mediaPicker","mediaInfo",function(e,t){function i(t){var i=this;i.selectPath=function(){filetypes=/\.*$/i,e.select({allowedFiletypes:filetypes}).then(function(e){t.path=e.url})},t.$watch("path",function(e){t.path=e},!0)}return{scope:{path:"="},restrict:"E",controller:["$scope",i],controllerAs:"vm",template:'<div>                                  <div class="uk-flex">                                      <div class="uk-form-icon uk-flex-item-1 uk-margin-small-right">                                        <i class="uk-icon-paperclip"></i><input class="uk-width-1-1" ng-model="path">                                      </div>                                      <button class="uk-button" ng-click="vm.selectPath()">Select</button>                                  </div>                               </div>'}}]).directive("fieldDate",["$timeout","$q",function(e,i){function n(){return a||(a=jQuery.Deferred(),t(widgetkit.config.adminBase+"/src/Framework/assets/uikit/js/components/datepicker.min.js").then(function(){a.resolve()})),a.promise()}var a;return{restrict:"E",require:"?ngModel",scope:{date:"@"},template:'<div class="uk-form-icon">                                  <i class="uk-icon-calendar"></i>                                  <input type="text" ng-model="date" data-uk-datepicker>                               </div>',link:function(t,i,a,o){n().then(function(){function i(i){o.$setViewValue(i),t.date=i,e(function(){t.$apply()})}t.date=o.$viewValue||"",t.$watch("date",function(e){i(e)}),o.$render=function(){try{i(o.$viewValue)}catch(e){}},o.$render()}),window.MooTools&&(i.find("input")[0].hide=function(){return!1})}}}]).factory("Fields",function(){var e={text:{label:"Text",template:function(e,t){var i=angular.element('<input class="uk-width-1-1" type="text"  ng-model="'+e+'">').attr(t.attributes||{});return t&&t.icon&&(i=i.wrap('<div class="uk-form-icon uk-width-1-1"></div>').before('<i class="uk-icon-'+t.icon+'"></i>').parent()),i}},textarea:{label:"Textarea",template:function(e,t){return angular.element('<textarea id="wk-content" class="uk-width-1-1" ng-model="'+e+'" rows="10"></textarea>').attr(t.attributes||{})}},editor:{label:"Editor",template:function(e,t){var i=window.tinyMCE&&window.WK_SYSTEM_EDITOR?"wysiwygeditor":"htmleditor";return angular.element("<field-"+i+' class="uk-width-1-1" ng-model="'+e+'" rows="10"></field-'+i+">")}},htmleditor:{label:"HTML Editor",template:function(e,t){var i="htmleditor";return angular.element("<field-"+i+' class="uk-width-1-1" ng-model="'+e+'" rows="10"></field-'+i+">")}},tags:{label:"Tags",template:function(e,t){return angular.element('<div class="uk-form-icon uk-width-1-1"><i class="uk-icon-tags"></i><input class="uk-width-1-1" type="text" ng-list ng-model="'+e+'" placeholder="tag, tag, ..."></div><div>').find("input").attr(t.attributes||{}).parent()}},"boolean":{label:"Boolean",template:function(e,t){return angular.element('<input type="checkbox" ng-model="'+e+'">').attr(t.attributes||{})}},media:{label:"Media",template:function(e,t){return'<field-media media="'+e+'"></field-media>'}},pathpicker:{label:"Pathpicker",template:function(e,t){return'<field-pathpicker path="'+e+'"></field-pathpicker>'}},location:{label:"Location",template:function(e,t){return'<field-location  ng-model="'+e+'"></field-location>'}},date:{label:"Date",template:function(e,t){return'<field-date ng-model="'+e+'"></field-date>'}}};return{register:function(t,i){e[t]=angular.extend({label:t,assets:[],template:function(){}},i)},exists:function(t){return!!e[t]},get:function(t){return e[t]},fields:function(){var t=[];return Object.keys(e).forEach(function(i){t.push({name:i,label:e[i].label})}),t}}}).directive("field",["$timeout","$compile","Fields",function(e,t,i){return{require:"?ngModel",restrict:"E",link:function(n,a,o,r){var l=function(){var e=angular.extend({},JSON.parse(o.options||"{}")),r=o.type||"text";if(i.exists(r)){var l,s=i.get(r);l=s.template(o.ngModel,e),l.then?l.then(function(e){t(a.html(e).contents())(n)}):t(a.html(l).contents())(n)}else t(a.html(i.get("text").template(o.ngModel)).contents())(n)};e(l)}}}])}(window.UIkit2);