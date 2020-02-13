/*
 Highstock JS v8.0.0 (2020-02-13)

 Advanced Highstock tools

 (c) 2010-2019 Highsoft AS
 Author: Torstein Honsi

 License: www.highcharts.com/license
*/
(function(f){"object"===typeof module&&module.exports?(f["default"]=f,module.exports=f):"function"===typeof define&&define.amd?define("highcharts/modules/stock-tools",["highcharts","highcharts/modules/stock"],function(p){f(p);f.Highcharts=p;return f}):f("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(f){function p(k,r,m,f){k.hasOwnProperty(r)||(k[r]=f.apply(null,m))}f=f?f._modules:{};p(f,"modules/stock-tools-bindings.js",[f["parts/Globals.js"],f["parts/Utilities.js"]],function(k,f){var m=
f.correctFloat,q=f.defined,r=f.extend,p=f.isNumber,h=f.merge,w=f.pick,n=k.fireEvent,d=k.NavigationBindings.prototype.utils;d.addFlagFromForm=function(a){return function(b){var c=this,g=c.chart,e=g.stockTools,l=d.getFieldType;b=d.attractToPoint(b,g);var x={type:"flags",onSeries:b.series.id,shape:a,data:[{x:b.x,y:b.y}],point:{events:{click:function(){var a=this,b=a.options;n(c,"showPopup",{point:a,formType:"annotation-toolbar",options:{langKey:"flags",type:"flags",title:[b.title,l(b.title)],name:[b.name,
l(b.name)]},onSubmit:function(b){"remove"===b.actionType?a.remove():a.update(c.fieldsToOptions(b.fields,{}))}})}}}};e&&e.guiEnabled||g.addSeries(x);n(c,"showPopup",{formType:"flag",options:{langKey:"flags",type:"flags",title:["A",l("A")],name:["Flag A",l("Flag A")]},onSubmit:function(a){c.fieldsToOptions(a.fields,x.data[0]);g.addSeries(x)}})}};d.manageIndicators=function(a){var b=this.chart,c={linkedTo:a.linkedTo,type:a.type},g=["ad","cmf","mfi","vbp","vwap"],e="ad atr cci cmf macd mfi roc rsi ao aroon aroonoscillator trix apo dpo ppo natr williamsr stochastic slowstochastic linearRegression linearRegressionSlope linearRegressionIntercept linearRegressionAngle".split(" ");
if("edit"===a.actionType)this.fieldsToOptions(a.fields,c),(a=b.get(a.seriesId))&&a.update(c,!1);else if("remove"===a.actionType){if(a=b.get(a.seriesId)){var l=a.yAxis;a.linkedSeries&&a.linkedSeries.forEach(function(a){a.remove(!1)});a.remove(!1);0<=e.indexOf(a.type)&&(l.remove(!1),this.resizeYAxes())}}else c.id=k.uniqueKey(),this.fieldsToOptions(a.fields,c),0<=e.indexOf(a.type)?(l=b.addAxis({id:k.uniqueKey(),offset:0,opposite:!0,title:{text:""},tickPixelInterval:40,showLastLabel:!1,labels:{align:"left",
y:-2}},!1,!1),c.yAxis=l.options.id,this.resizeYAxes()):c.yAxis=b.get(a.linkedTo).options.yAxis,0<=g.indexOf(a.type)&&(c.params.volumeSeriesID=b.series.filter(function(a){return"column"===a.options.type})[0].options.id),b.addSeries(c,!1);n(this,"deselectButton",{button:this.selectedButtonElement});b.redraw()};d.updateHeight=function(a,b){b.update({typeOptions:{height:this.chart.pointer.getCoordinates(a).yAxis[0].value-b.options.typeOptions.points[1].y}})};d.attractToPoint=function(a,b){a=b.pointer.getCoordinates(a);
var c=a.xAxis[0].value;a=a.yAxis[0].value;var g=Number.MAX_VALUE,e;b.series.forEach(function(a){a.points.forEach(function(a){a&&g>Math.abs(a.x-c)&&(g=Math.abs(a.x-c),e=a)})});return{x:e.x,y:e.y,below:a<e.y,series:e.series,xAxis:e.series.xAxis.index||0,yAxis:e.series.yAxis.index||0}};d.isNotNavigatorYAxis=function(a){return"highcharts-navigator-yaxis"!==a.userOptions.className};d.updateNthPoint=function(a){return function(b,c){var g=c.options.typeOptions;b=this.chart.pointer.getCoordinates(b);var e=
b.xAxis[0].value,l=b.yAxis[0].value;g.points.forEach(function(b,c){c>=a&&(b.x=e,b.y=l)});c.update({typeOptions:{points:g.points}})}};r(k.NavigationBindings.prototype,{getYAxisPositions:function(a,b,c){function g(a){return q(a)&&!p(a)&&a.match("%")}var e=0;a=a.map(function(a){var l=g(a.options.height)?parseFloat(a.options.height)/100:a.height/b;a=g(a.options.top)?parseFloat(a.options.top)/100:m(a.top-a.chart.plotTop)/b;p(l)||(l=c/100);e=m(e+l);return{height:100*l,top:100*a}});a.allAxesHeight=e;return a},
getYAxisResizers:function(a){var b=[];a.forEach(function(c,g){c=a[g+1];b[g]=c?{enabled:!0,controlledAxis:{next:[w(c.options.id,c.options.index)]}}:{enabled:!1}});return b},resizeYAxes:function(a){a=a||20;var b=this.chart,c=b.yAxis.filter(this.utils.isNotNavigatorYAxis),g=c.length;b=this.getYAxisPositions(c,b.plotHeight,a);var e=this.getYAxisResizers(c),l=b.allAxesHeight,d=a;1<l?(6>g?(b[0].height=m(b[0].height-d),b=this.recalculateYAxisPositions(b,d)):(a=100/g,b=this.recalculateYAxisPositions(b,a/
(g-1),!0,-1)),b[g-1]={top:m(100-a),height:a}):(d=100*m(1-l),5>g?(b[0].height=m(b[0].height+d),b=this.recalculateYAxisPositions(b,d)):b=this.recalculateYAxisPositions(b,d/g,!0,1));b.forEach(function(a,b){c[b].update({height:a.height+"%",top:a.top+"%",resize:e[b]},!1)})},recalculateYAxisPositions:function(a,b,c,g){a.forEach(function(e,l){l=a[l-1];e.top=l?m(l.height+l.top):0;c&&(e.height=m(e.height+g*b))});return a}});f={segment:{className:"highcharts-segment",start:function(a){a=this.chart.pointer.getCoordinates(a);
var b=this.chart.options.navigation;a=h({langKey:"segment",type:"crookedLine",typeOptions:{points:[{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value}]}},b.annotationsOptions,b.bindings.segment.annotationsOptions);return this.chart.addAnnotation(a)},steps:[d.updateNthPoint(1)]},arrowSegment:{className:"highcharts-arrow-segment",start:function(a){a=this.chart.pointer.getCoordinates(a);var b=this.chart.options.navigation;a=h({langKey:"arrowSegment",type:"crookedLine",typeOptions:{line:{markerEnd:"arrow"},
points:[{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value}]}},b.annotationsOptions,b.bindings.arrowSegment.annotationsOptions);return this.chart.addAnnotation(a)},steps:[d.updateNthPoint(1)]},ray:{className:"highcharts-ray",start:function(a){a=this.chart.pointer.getCoordinates(a);var b=this.chart.options.navigation;a=h({langKey:"ray",type:"crookedLine",typeOptions:{type:"ray",points:[{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value}]}},b.annotationsOptions,
b.bindings.ray.annotationsOptions);return this.chart.addAnnotation(a)},steps:[d.updateNthPoint(1)]},arrowRay:{className:"highcharts-arrow-ray",start:function(a){a=this.chart.pointer.getCoordinates(a);var b=this.chart.options.navigation;a=h({langKey:"arrowRay",type:"infinityLine",typeOptions:{type:"ray",line:{markerEnd:"arrow"},points:[{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value}]}},b.annotationsOptions,b.bindings.arrowRay.annotationsOptions);return this.chart.addAnnotation(a)},
steps:[d.updateNthPoint(1)]},infinityLine:{className:"highcharts-infinity-line",start:function(a){a=this.chart.pointer.getCoordinates(a);var b=this.chart.options.navigation;a=h({langKey:"infinityLine",type:"infinityLine",typeOptions:{type:"line",points:[{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value}]}},b.annotationsOptions,b.bindings.infinityLine.annotationsOptions);return this.chart.addAnnotation(a)},steps:[d.updateNthPoint(1)]},arrowInfinityLine:{className:"highcharts-arrow-infinity-line",
start:function(a){a=this.chart.pointer.getCoordinates(a);var b=this.chart.options.navigation;a=h({langKey:"arrowInfinityLine",type:"infinityLine",typeOptions:{type:"line",line:{markerEnd:"arrow"},points:[{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value}]}},b.annotationsOptions,b.bindings.arrowInfinityLine.annotationsOptions);return this.chart.addAnnotation(a)},steps:[d.updateNthPoint(1)]},horizontalLine:{className:"highcharts-horizontal-line",start:function(a){a=this.chart.pointer.getCoordinates(a);
var b=this.chart.options.navigation;a=h({langKey:"horizontalLine",type:"infinityLine",draggable:"y",typeOptions:{type:"horizontalLine",points:[{x:a.xAxis[0].value,y:a.yAxis[0].value}]}},b.annotationsOptions,b.bindings.horizontalLine.annotationsOptions);this.chart.addAnnotation(a)}},verticalLine:{className:"highcharts-vertical-line",start:function(a){a=this.chart.pointer.getCoordinates(a);var b=this.chart.options.navigation;a=h({langKey:"verticalLine",type:"infinityLine",draggable:"x",typeOptions:{type:"verticalLine",
points:[{x:a.xAxis[0].value,y:a.yAxis[0].value}]}},b.annotationsOptions,b.bindings.verticalLine.annotationsOptions);this.chart.addAnnotation(a)}},crooked3:{className:"highcharts-crooked3",start:function(a){a=this.chart.pointer.getCoordinates(a);var b=this.chart.options.navigation;a=h({langKey:"crooked3",type:"crookedLine",typeOptions:{points:[{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value}]}},b.annotationsOptions,b.bindings.crooked3.annotationsOptions);
return this.chart.addAnnotation(a)},steps:[d.updateNthPoint(1),d.updateNthPoint(2)]},crooked5:{className:"highcharts-crooked5",start:function(a){a=this.chart.pointer.getCoordinates(a);var b=this.chart.options.navigation;a=h({langKey:"crookedLine",type:"crookedLine",typeOptions:{points:[{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value}]}},b.annotationsOptions,
b.bindings.crooked5.annotationsOptions);return this.chart.addAnnotation(a)},steps:[d.updateNthPoint(1),d.updateNthPoint(2),d.updateNthPoint(3),d.updateNthPoint(4)]},elliott3:{className:"highcharts-elliott3",start:function(a){a=this.chart.pointer.getCoordinates(a);var b=this.chart.options.navigation;a=h({langKey:"elliott3",type:"elliottWave",typeOptions:{points:[{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,
y:a.yAxis[0].value}]},labelOptions:{style:{color:"#666666"}}},b.annotationsOptions,b.bindings.elliott3.annotationsOptions);return this.chart.addAnnotation(a)},steps:[d.updateNthPoint(1),d.updateNthPoint(2),d.updateNthPoint(3)]},elliott5:{className:"highcharts-elliott5",start:function(a){a=this.chart.pointer.getCoordinates(a);var b=this.chart.options.navigation;a=h({langKey:"elliott5",type:"elliottWave",typeOptions:{points:[{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value},
{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value}]},labelOptions:{style:{color:"#666666"}}},b.annotationsOptions,b.bindings.elliott5.annotationsOptions);return this.chart.addAnnotation(a)},steps:[d.updateNthPoint(1),d.updateNthPoint(2),d.updateNthPoint(3),d.updateNthPoint(4),d.updateNthPoint(5)]},measureX:{className:"highcharts-measure-x",start:function(a){a=this.chart.pointer.getCoordinates(a);
var b=this.chart.options.navigation;a=h({langKey:"measure",type:"measure",typeOptions:{selectType:"x",point:{x:a.xAxis[0].value,y:a.yAxis[0].value,xAxis:0,yAxis:0},crosshairX:{strokeWidth:1,stroke:"#000000"},crosshairY:{enabled:!1,strokeWidth:0,stroke:"#000000"},background:{width:0,height:0,strokeWidth:0,stroke:"#ffffff"}},labelOptions:{style:{color:"#666666"}}},b.annotationsOptions,b.bindings.measureX.annotationsOptions);return this.chart.addAnnotation(a)},steps:[d.updateRectSize]},measureY:{className:"highcharts-measure-y",
start:function(a){a=this.chart.pointer.getCoordinates(a);var b=this.chart.options.navigation;a=h({langKey:"measure",type:"measure",typeOptions:{selectType:"y",point:{x:a.xAxis[0].value,y:a.yAxis[0].value,xAxis:0,yAxis:0},crosshairX:{enabled:!1,strokeWidth:0,stroke:"#000000"},crosshairY:{strokeWidth:1,stroke:"#000000"},background:{width:0,height:0,strokeWidth:0,stroke:"#ffffff"}},labelOptions:{style:{color:"#666666"}}},b.annotationsOptions,b.bindings.measureY.annotationsOptions);return this.chart.addAnnotation(a)},
steps:[d.updateRectSize]},measureXY:{className:"highcharts-measure-xy",start:function(a){a=this.chart.pointer.getCoordinates(a);var b=this.chart.options.navigation;a=h({langKey:"measure",type:"measure",typeOptions:{selectType:"xy",point:{x:a.xAxis[0].value,y:a.yAxis[0].value,xAxis:0,yAxis:0},background:{width:0,height:0,strokeWidth:10},crosshairX:{strokeWidth:1,stroke:"#000000"},crosshairY:{strokeWidth:1,stroke:"#000000"}},labelOptions:{style:{color:"#666666"}}},b.annotationsOptions,b.bindings.measureXY.annotationsOptions);
return this.chart.addAnnotation(a)},steps:[d.updateRectSize]},fibonacci:{className:"highcharts-fibonacci",start:function(a){a=this.chart.pointer.getCoordinates(a);var b=this.chart.options.navigation;a=h({langKey:"fibonacci",type:"fibonacci",typeOptions:{points:[{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value}]},labelOptions:{style:{color:"#666666"}}},b.annotationsOptions,b.bindings.fibonacci.annotationsOptions);return this.chart.addAnnotation(a)},steps:[d.updateNthPoint(1),
d.updateHeight]},parallelChannel:{className:"highcharts-parallel-channel",start:function(a){a=this.chart.pointer.getCoordinates(a);var b=this.chart.options.navigation;a=h({langKey:"parallelChannel",type:"tunnel",typeOptions:{points:[{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value}]}},b.annotationsOptions,b.bindings.parallelChannel.annotationsOptions);return this.chart.addAnnotation(a)},steps:[d.updateNthPoint(1),d.updateHeight]},pitchfork:{className:"highcharts-pitchfork",
start:function(a){a=this.chart.pointer.getCoordinates(a);var b=this.chart.options.navigation;a=h({langKey:"pitchfork",type:"pitchfork",typeOptions:{points:[{x:a.xAxis[0].value,y:a.yAxis[0].value,controlPoint:{style:{fill:"red"}}},{x:a.xAxis[0].value,y:a.yAxis[0].value},{x:a.xAxis[0].value,y:a.yAxis[0].value}],innerBackground:{fill:"rgba(100, 170, 255, 0.8)"}},shapeOptions:{strokeWidth:2}},b.annotationsOptions,b.bindings.pitchfork.annotationsOptions);return this.chart.addAnnotation(a)},steps:[d.updateNthPoint(1),
d.updateNthPoint(2)]},verticalCounter:{className:"highcharts-vertical-counter",start:function(a){a=d.attractToPoint(a,this.chart);var b=this.chart.options.navigation,c=q(this.verticalCounter)?this.verticalCounter:0;a=h({langKey:"verticalCounter",type:"verticalLine",typeOptions:{point:{x:a.x,y:a.y,xAxis:a.xAxis,yAxis:a.yAxis},label:{offset:a.below?40:-40,text:c.toString()}},labelOptions:{style:{color:"#666666",fontSize:"11px"}},shapeOptions:{stroke:"rgba(0, 0, 0, 0.75)",strokeWidth:1}},b.annotationsOptions,
b.bindings.verticalCounter.annotationsOptions);a=this.chart.addAnnotation(a);a.options.events.click.call(a,{})}},verticalLabel:{className:"highcharts-vertical-label",start:function(a){a=d.attractToPoint(a,this.chart);var b=this.chart.options.navigation;a=h({langKey:"verticalLabel",type:"verticalLine",typeOptions:{point:{x:a.x,y:a.y,xAxis:a.xAxis,yAxis:a.yAxis},label:{offset:a.below?40:-40}},labelOptions:{style:{color:"#666666",fontSize:"11px"}},shapeOptions:{stroke:"rgba(0, 0, 0, 0.75)",strokeWidth:1}},
b.annotationsOptions,b.bindings.verticalLabel.annotationsOptions);a=this.chart.addAnnotation(a);a.options.events.click.call(a,{})}},verticalArrow:{className:"highcharts-vertical-arrow",start:function(a){a=d.attractToPoint(a,this.chart);var b=this.chart.options.navigation;a=h({langKey:"verticalArrow",type:"verticalLine",typeOptions:{point:{x:a.x,y:a.y,xAxis:a.xAxis,yAxis:a.yAxis},label:{offset:a.below?40:-40,format:" "},connector:{fill:"none",stroke:a.below?"red":"green"}},shapeOptions:{stroke:"rgba(0, 0, 0, 0.75)",
strokeWidth:1}},b.annotationsOptions,b.bindings.verticalArrow.annotationsOptions);a=this.chart.addAnnotation(a);a.options.events.click.call(a,{})}},flagCirclepin:{className:"highcharts-flag-circlepin",start:d.addFlagFromForm("circlepin")},flagDiamondpin:{className:"highcharts-flag-diamondpin",start:d.addFlagFromForm("flag")},flagSquarepin:{className:"highcharts-flag-squarepin",start:d.addFlagFromForm("squarepin")},flagSimplepin:{className:"highcharts-flag-simplepin",start:d.addFlagFromForm("nopin")},
zoomX:{className:"highcharts-zoom-x",init:function(a){this.chart.update({chart:{zoomType:"x"}});n(this,"deselectButton",{button:a})}},zoomY:{className:"highcharts-zoom-y",init:function(a){this.chart.update({chart:{zoomType:"y"}});n(this,"deselectButton",{button:a})}},zoomXY:{className:"highcharts-zoom-xy",init:function(a){this.chart.update({chart:{zoomType:"xy"}});n(this,"deselectButton",{button:a})}},seriesTypeLine:{className:"highcharts-series-type-line",init:function(a){this.chart.series[0].update({type:"line",
useOhlcData:!0});n(this,"deselectButton",{button:a})}},seriesTypeOhlc:{className:"highcharts-series-type-ohlc",init:function(a){this.chart.series[0].update({type:"ohlc"});n(this,"deselectButton",{button:a})}},seriesTypeCandlestick:{className:"highcharts-series-type-candlestick",init:function(a){this.chart.series[0].update({type:"candlestick"});n(this,"deselectButton",{button:a})}},fullScreen:{className:"highcharts-full-screen",init:function(a){var b=this.chart;b.fullScreen=new k.FullScreen(b.container);
n(this,"deselectButton",{button:a})}},currentPriceIndicator:{className:"highcharts-current-price-indicator",init:function(a){var b=this.chart,c=b.series[0],g=c.options,e=g.lastVisiblePrice&&g.lastVisiblePrice.enabled;g=g.lastPrice&&g.lastPrice.enabled;b=b.stockTools;var l=b.getIconsURL();b&&b.guiEnabled&&(a.firstChild.style["background-image"]=g?'url("'+l+'current-price-show.svg")':'url("'+l+'current-price-hide.svg")');c.update({lastPrice:{enabled:!g,color:"red"},lastVisiblePrice:{enabled:!e,label:{enabled:!0}}});
n(this,"deselectButton",{button:a})}},indicators:{className:"highcharts-indicators",init:function(){var a=this;n(a,"showPopup",{formType:"indicators",options:{},onSubmit:function(b){a.utils.manageIndicators.call(a,b)}})}},toggleAnnotations:{className:"highcharts-toggle-annotations",init:function(a){var b=this.chart,c=b.stockTools,g=c.getIconsURL();this.toggledAnnotations=!this.toggledAnnotations;(b.annotations||[]).forEach(function(a){a.setVisibility(!this.toggledAnnotations)},this);c&&c.guiEnabled&&
(a.firstChild.style["background-image"]=this.toggledAnnotations?'url("'+g+'annotations-hidden.svg")':'url("'+g+'annotations-visible.svg")');n(this,"deselectButton",{button:a})}},saveChart:{className:"highcharts-save-chart",init:function(a){var b=this,c=b.chart,g=[],e=[],l=[],d=[];c.annotations.forEach(function(a,b){g[b]=a.userOptions});c.series.forEach(function(a){a.is("sma")?e.push(a.userOptions):"flags"===a.type&&l.push(a.userOptions)});c.yAxis.forEach(function(a){b.utils.isNotNavigatorYAxis(a)&&
d.push(a.options)});k.win.localStorage.setItem("highcharts-chart",JSON.stringify({annotations:g,indicators:e,flags:l,yAxes:d}));n(this,"deselectButton",{button:a})}}};k.setOptions({navigation:{bindings:f}})});p(f,"modules/stock-tools-gui.js",[f["parts/Globals.js"],f["parts/Utilities.js"]],function(k,f){var m=f.addEvent,q=f.createElement,p=f.css,r=f.extend,h=f.fireEvent,w=f.isArray,n=f.merge,d=f.pick,a=k.getStyle,b=k.win;k.setOptions({lang:{stockTools:{gui:{simpleShapes:"Simple shapes",lines:"Lines",
crookedLines:"Crooked lines",measure:"Measure",advanced:"Advanced",toggleAnnotations:"Toggle annotations",verticalLabels:"Vertical labels",flags:"Flags",zoomChange:"Zoom change",typeChange:"Type change",saveChart:"Save chart",indicators:"Indicators",currentPriceIndicator:"Current Price Indicators",zoomX:"Zoom X",zoomY:"Zoom Y",zoomXY:"Zooom XY",fullScreen:"Fullscreen",typeOHLC:"OHLC",typeLine:"Line",typeCandlestick:"Candlestick",circle:"Circle",label:"Label",rectangle:"Rectangle",flagCirclepin:"Flag circle",
flagDiamondpin:"Flag diamond",flagSquarepin:"Flag square",flagSimplepin:"Flag simple",measureXY:"Measure XY",measureX:"Measure X",measureY:"Measure Y",segment:"Segment",arrowSegment:"Arrow segment",ray:"Ray",arrowRay:"Arrow ray",line:"Line",arrowLine:"Arrow line",horizontalLine:"Horizontal line",verticalLine:"Vertical line",infinityLine:"Infinity line",crooked3:"Crooked 3 line",crooked5:"Crooked 5 line",elliott3:"Elliott 3 line",elliott5:"Elliott 5 line",verticalCounter:"Vertical counter",verticalLabel:"Vertical label",
verticalArrow:"Vertical arrow",fibonacci:"Fibonacci",pitchfork:"Pitchfork",parallelChannel:"Parallel channel"}},navigation:{popup:{circle:"Circle",rectangle:"Rectangle",label:"Label",segment:"Segment",arrowSegment:"Arrow segment",ray:"Ray",arrowRay:"Arrow ray",line:"Line",arrowLine:"Arrow line",horizontalLine:"Horizontal line",verticalLine:"Vertical line",crooked3:"Crooked 3 line",crooked5:"Crooked 5 line",elliott3:"Elliott 3 line",elliott5:"Elliott 5 line",verticalCounter:"Vertical counter",verticalLabel:"Vertical label",
verticalArrow:"Vertical arrow",fibonacci:"Fibonacci",pitchfork:"Pitchfork",parallelChannel:"Parallel channel",infinityLine:"Infinity line",measure:"Measure",measureXY:"Measure XY",measureX:"Measure X",measureY:"Measure Y",flags:"Flags",addButton:"add",saveButton:"save",editButton:"edit",removeButton:"remove",series:"Series",volume:"Volume",connector:"Connector",innerBackground:"Inner background",outerBackground:"Outer background",crosshairX:"Crosshair X",crosshairY:"Crosshair Y",tunnel:"Tunnel",background:"Background"}}},
stockTools:{gui:{enabled:!0,className:"highcharts-bindings-wrapper",toolbarClassName:"stocktools-toolbar",buttons:"indicators separator simpleShapes lines crookedLines measure advanced toggleAnnotations separator verticalLabels flags separator zoomChange fullScreen typeChange separator currentPriceIndicator saveChart".split(" "),definitions:{separator:{symbol:"separator.svg"},simpleShapes:{items:["label","circle","rectangle"],circle:{symbol:"circle.svg"},rectangle:{symbol:"rectangle.svg"},label:{symbol:"label.svg"}},
flags:{items:["flagCirclepin","flagDiamondpin","flagSquarepin","flagSimplepin"],flagSimplepin:{symbol:"flag-basic.svg"},flagDiamondpin:{symbol:"flag-diamond.svg"},flagSquarepin:{symbol:"flag-trapeze.svg"},flagCirclepin:{symbol:"flag-elipse.svg"}},lines:{items:"segment arrowSegment ray arrowRay line arrowLine horizontalLine verticalLine".split(" "),segment:{symbol:"segment.svg"},arrowSegment:{symbol:"arrow-segment.svg"},ray:{symbol:"ray.svg"},arrowRay:{symbol:"arrow-ray.svg"},line:{symbol:"line.svg"},
arrowLine:{symbol:"arrow-line.svg"},verticalLine:{symbol:"vertical-line.svg"},horizontalLine:{symbol:"horizontal-line.svg"}},crookedLines:{items:["elliott3","elliott5","crooked3","crooked5"],crooked3:{symbol:"crooked-3.svg"},crooked5:{symbol:"crooked-5.svg"},elliott3:{symbol:"elliott-3.svg"},elliott5:{symbol:"elliott-5.svg"}},verticalLabels:{items:["verticalCounter","verticalLabel","verticalArrow"],verticalCounter:{symbol:"vertical-counter.svg"},verticalLabel:{symbol:"vertical-label.svg"},verticalArrow:{symbol:"vertical-arrow.svg"}},
advanced:{items:["fibonacci","pitchfork","parallelChannel"],pitchfork:{symbol:"pitchfork.svg"},fibonacci:{symbol:"fibonacci.svg"},parallelChannel:{symbol:"parallel-channel.svg"}},measure:{items:["measureXY","measureX","measureY"],measureX:{symbol:"measure-x.svg"},measureY:{symbol:"measure-y.svg"},measureXY:{symbol:"measure-xy.svg"}},toggleAnnotations:{symbol:"annotations-visible.svg"},currentPriceIndicator:{symbol:"current-price-show.svg"},indicators:{symbol:"indicators.svg"},zoomChange:{items:["zoomX",
"zoomY","zoomXY"],zoomX:{symbol:"zoom-x.svg"},zoomY:{symbol:"zoom-y.svg"},zoomXY:{symbol:"zoom-xy.svg"}},typeChange:{items:["typeOHLC","typeLine","typeCandlestick"],typeOHLC:{symbol:"series-ohlc.svg"},typeLine:{symbol:"series-line.svg"},typeCandlestick:{symbol:"series-candlestick.svg"}},fullScreen:{symbol:"fullscreen.svg"},saveChart:{symbol:"save-chart.svg"}}}}});m(k.Chart,"afterGetContainer",function(){this.setStockTools()});m(k.Chart,"getMargins",function(){var a=this.stockTools&&this.stockTools.listWrapper;
(a=a&&(a.startWidth+k.getStyle(a,"padding-left")+k.getStyle(a,"padding-right")||a.offsetWidth))&&a<this.plotWidth&&(this.plotLeft+=a)});m(k.Chart,"destroy",function(){this.stockTools&&this.stockTools.destroy()});m(k.Chart,"redraw",function(){this.stockTools&&this.stockTools.guiEnabled&&this.stockTools.redraw()});k.Toolbar=function(a,b,e){this.chart=e;this.options=a;this.lang=b;this.iconsURL=this.getIconsURL();this.guiEnabled=a.enabled;this.visible=d(a.visible,!0);this.placed=d(a.placed,!1);this.eventsToUnbind=
[];this.guiEnabled&&(this.createHTML(),this.init(),this.showHideNavigatorion());h(this,"afterInit")};r(k.Chart.prototype,{setStockTools:function(a){var b=this.options,c=b.lang;a=n(b.stockTools&&b.stockTools.gui,a&&a.gui);this.stockTools=new k.Toolbar(a,c.stockTools&&c.stockTools.gui,this);this.stockTools.guiEnabled&&(this.isDirtyBox=!0)}});k.Toolbar.prototype={init:function(){var a=this,b=this.lang,e=this.options,d=this.toolbar,f=a.addSubmenu,k=e.buttons,h=e.definitions,n=d.childNodes,q=this.inIframe(),
p;k.forEach(function(c){p=a.addButton(d,h,c,b);q&&"fullScreen"===c&&(p.buttonWrapper.className+=" highcharts-disabled-btn");a.eventsToUnbind.push(m(p.buttonWrapper,"click",function(){a.eraseActiveButtons(n,p.buttonWrapper)}));w(h[c].items)&&f.call(a,p,h[c])})},addSubmenu:function(b,g){var c=this,d=b.submenuArrow,f=b.buttonWrapper,h=a(f,"width"),n=this.wrapper,u=this.listWrapper,r=this.toolbar.childNodes,v=0,t;this.submenu=t=q("ul",{className:"highcharts-submenu-wrapper"},null,f);this.addSubmenuItems(f,
g);c.eventsToUnbind.push(m(d,"click",function(a){a.stopPropagation();c.eraseActiveButtons(r,f);0<=f.className.indexOf("highcharts-current")?(u.style.width=u.startWidth+"px",f.classList.remove("highcharts-current"),t.style.display="none"):(t.style.display="block",v=t.offsetHeight-f.offsetHeight-3,t.offsetHeight+f.offsetTop>n.offsetHeight&&f.offsetTop>v||(v=0),p(t,{top:-v+"px",left:h+3+"px"}),f.className+=" highcharts-current",u.startWidth=n.offsetWidth,u.style.width=u.startWidth+k.getStyle(u,"padding-left")+
t.offsetWidth+3+"px")}))},addSubmenuItems:function(a,b){var c=this,g=this.submenu,d=this.lang,f=this.listWrapper,k;b.items.forEach(function(e){k=c.addButton(g,b,e,d);c.eventsToUnbind.push(m(k.mainButton,"click",function(){c.switchSymbol(this,a,!0);f.style.width=f.startWidth+"px";g.style.display="none"}))});var h=g.querySelectorAll("li > .highcharts-menu-item-btn")[0];c.switchSymbol(h,!1)},eraseActiveButtons:function(a,b,e){[].forEach.call(a,function(a){a!==b&&(a.classList.remove("highcharts-current"),
a.classList.remove("highcharts-active"),e=a.querySelectorAll(".highcharts-submenu-wrapper"),0<e.length&&(e[0].style.display="none"))})},addButton:function(a,b,e,f){b=b[e];var c=b.items,g=b.className||"";e=q("li",{className:d(k.Toolbar.prototype.classMapping[e],"")+" "+g,title:f[e]||e},null,a);a=q("span",{className:"highcharts-menu-item-btn"},null,e);if(c&&c.length){var l=q("span",{className:"highcharts-submenu-item-arrow highcharts-arrow-right"},null,e);l.style["background-image"]="url("+this.iconsURL+
"arrow-bottom.svg)"}else a.style["background-image"]="url("+this.iconsURL+b.symbol+")";return{buttonWrapper:e,mainButton:a,submenuArrow:l}},addNavigation:function(){var a=this.wrapper;this.arrowWrapper=q("div",{className:"highcharts-arrow-wrapper"});this.arrowUp=q("div",{className:"highcharts-arrow-up"},null,this.arrowWrapper);this.arrowUp.style["background-image"]="url("+this.iconsURL+"arrow-right.svg)";this.arrowDown=q("div",{className:"highcharts-arrow-down"},null,this.arrowWrapper);this.arrowDown.style["background-image"]=
"url("+this.iconsURL+"arrow-right.svg)";a.insertBefore(this.arrowWrapper,a.childNodes[0]);this.scrollButtons()},scrollButtons:function(){var a=0,b=this.wrapper,e=this.toolbar,d=.1*b.offsetHeight;this.eventsToUnbind.push(m(this.arrowUp,"click",function(){0<a&&(a-=d,e.style["margin-top"]=-a+"px")}));this.eventsToUnbind.push(m(this.arrowDown,"click",function(){b.offsetHeight+a<=e.offsetHeight+d&&(a+=d,e.style["margin-top"]=-a+"px")}))},createHTML:function(){var a=this.chart,b=this.options,e=a.container;
a=a.options.navigation;this.wrapper=a=q("div",{className:"highcharts-stocktools-wrapper "+b.className+" "+(a&&a.bindingsClassName)});e.parentNode.insertBefore(a,e);this.toolbar=e=q("ul",{className:"highcharts-stocktools-toolbar "+b.toolbarClassName});this.listWrapper=b=q("div",{className:"highcharts-menu-wrapper"});a.insertBefore(b,a.childNodes[0]);b.insertBefore(e,b.childNodes[0]);this.showHideToolbar();this.addNavigation()},showHideNavigatorion:function(){this.visible&&this.toolbar.offsetHeight>
this.wrapper.offsetHeight-50?this.arrowWrapper.style.display="block":(this.toolbar.style.marginTop="0px",this.arrowWrapper.style.display="none")},showHideToolbar:function(){var a=this.chart,b=this.wrapper,e=this.listWrapper,d=this.submenu,f=this.visible,h;this.showhideBtn=h=q("div",{className:"highcharts-toggle-toolbar highcharts-arrow-left"},null,b);h.style["background-image"]="url("+this.iconsURL+"arrow-right.svg)";f?(b.style.height="100%",h.style.top=k.getStyle(e,"padding-top")+"px",h.style.left=
b.offsetWidth+k.getStyle(e,"padding-left")+"px"):(d&&(d.style.display="none"),h.style.left="0px",this.visible=f=!1,e.classList.add("highcharts-hide"),h.classList.toggle("highcharts-arrow-right"),b.style.height=h.offsetHeight+"px");this.eventsToUnbind.push(m(h,"click",function(){a.update({stockTools:{gui:{visible:!f,placed:!0}}})}))},switchSymbol:function(a,b){var c=a.parentNode,d=c.classList.value;c=c.parentNode.parentNode;c.className="";d&&c.classList.add(d.trim());c.querySelectorAll(".highcharts-menu-item-btn")[0].style["background-image"]=
a.style["background-image"];b&&this.selectButton(c)},selectButton:function(a){0<=a.className.indexOf("highcharts-active")?a.classList.remove("highcharts-active"):a.classList.add("highcharts-active")},unselectAllButtons:function(a){var b=a.parentNode.querySelectorAll(".highcharts-active");[].forEach.call(b,function(b){b!==a&&b.classList.remove("highcharts-active")})},inIframe:function(){try{return b.self!==b.top}catch(c){return!0}},update:function(a){n(!0,this.chart.options.stockTools,a);this.destroy();
this.chart.setStockTools(a);this.chart.navigationBindings&&this.chart.navigationBindings.update()},destroy:function(){var a=this.wrapper,b=a&&a.parentNode;this.eventsToUnbind.forEach(function(a){a()});b&&b.removeChild(a);this.chart.isDirtyBox=!0;this.chart.redraw()},redraw:function(){this.showHideNavigatorion()},getIconsURL:function(){return this.chart.options.navigation.iconsURL||this.options.iconsURL||"https://code.highcharts.com/8.0.0/gfx/stock-icons/"},classMapping:{circle:"highcharts-circle-annotation",
rectangle:"highcharts-rectangle-annotation",label:"highcharts-label-annotation",segment:"highcharts-segment",arrowSegment:"highcharts-arrow-segment",ray:"highcharts-ray",arrowRay:"highcharts-arrow-ray",line:"highcharts-infinity-line",arrowLine:"highcharts-arrow-infinity-line",verticalLine:"highcharts-vertical-line",horizontalLine:"highcharts-horizontal-line",crooked3:"highcharts-crooked3",crooked5:"highcharts-crooked5",elliott3:"highcharts-elliott3",elliott5:"highcharts-elliott5",pitchfork:"highcharts-pitchfork",
fibonacci:"highcharts-fibonacci",parallelChannel:"highcharts-parallel-channel",measureX:"highcharts-measure-x",measureY:"highcharts-measure-y",measureXY:"highcharts-measure-xy",verticalCounter:"highcharts-vertical-counter",verticalLabel:"highcharts-vertical-label",verticalArrow:"highcharts-vertical-arrow",currentPriceIndicator:"highcharts-current-price-indicator",indicators:"highcharts-indicators",flagCirclepin:"highcharts-flag-circlepin",flagDiamondpin:"highcharts-flag-diamondpin",flagSquarepin:"highcharts-flag-squarepin",
flagSimplepin:"highcharts-flag-simplepin",zoomX:"highcharts-zoom-x",zoomY:"highcharts-zoom-y",zoomXY:"highcharts-zoom-xy",typeLine:"highcharts-series-type-line",typeOHLC:"highcharts-series-type-ohlc",typeCandlestick:"highcharts-series-type-candlestick",fullScreen:"highcharts-full-screen",toggleAnnotations:"highcharts-toggle-annotations",saveChart:"highcharts-save-chart",separator:"highcharts-separator"}};m(k.NavigationBindings,"selectButton",function(a){var b=a.button,c=this.chart.stockTools;c&&c.guiEnabled&&
(c.unselectAllButtons(a.button),0<=b.parentNode.className.indexOf("highcharts-submenu-wrapper")&&(b=b.parentNode.parentNode),c.selectButton(b))});m(k.NavigationBindings,"deselectButton",function(a){a=a.button;var b=this.chart.stockTools;b&&b.guiEnabled&&(0<=a.parentNode.className.indexOf("highcharts-submenu-wrapper")&&(a=a.parentNode.parentNode),b.selectButton(a))})});p(f,"masters/modules/stock-tools.src.js",[],function(){})});
//# sourceMappingURL=stock-tools.js.map