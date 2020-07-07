/*
 Highstock JS v8.1.2 (2020-07-07)

 Indicator series type for Highstock

 (c) 2010-2019 Pawe Fus

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/stochastic",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,u,e){a.hasOwnProperty(b)||(a[b]=e.apply(null,u))}a=a?a._modules:{};d(a,"mixins/reduce-array.js",[],function(){return{minInArray:function(a,b){return a.reduce(function(a,
e){return Math.min(a,e[b])},Number.MAX_VALUE)},maxInArray:function(a,b){return a.reduce(function(a,e){return Math.max(a,e[b])},-Number.MAX_VALUE)},getArrayExtremes:function(a,b,d){return a.reduce(function(a,m){return[Math.min(a[0],m[b]),Math.max(a[1],m[d])]},[Number.MAX_VALUE,-Number.MAX_VALUE])}}});d(a,"mixins/multipe-lines.js",[a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,b){var d=b.defined,e=b.error,m=b.merge,f=a.seriesTypes.sma;return{pointArrayMap:["top","bottom"],pointValKey:"top",
linesApiNames:["bottomLine"],getTranslatedLinesNames:function(a){var g=[];(this.pointArrayMap||[]).forEach(function(c){c!==a&&g.push("plot"+c.charAt(0).toUpperCase()+c.slice(1))});return g},toYData:function(a){var g=[];(this.pointArrayMap||[]).forEach(function(c){g.push(a[c])});return g},translate:function(){var a=this,b=a.pointArrayMap,c=[],h;c=a.getTranslatedLinesNames();f.prototype.translate.apply(a,arguments);a.points.forEach(function(g){b.forEach(function(b,d){h=g[b];null!==h&&(g[c[d]]=a.yAxis.toPixels(h,
!0))})})},drawGraph:function(){var a=this,b=a.linesApiNames,c=a.points,h=c.length,q=a.options,w=a.graph,x={options:{gapSize:q.gapSize}},r=[],k;a.getTranslatedLinesNames(a.pointValKey).forEach(function(a,b){for(r[b]=[];h--;)k=c[h],r[b].push({x:k.x,plotX:k.plotX,plotY:k[a],isNull:!d(k[a])});h=c.length});b.forEach(function(b,c){r[c]?(a.points=r[c],q[b]?a.options=m(q[b].styles,x):e('Error: "There is no '+b+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names." at mixin/multiple-line.js:34'),
a.graph=a["graph"+b],f.prototype.drawGraph.call(a),a["graph"+b]=a.graph):e('Error: "'+b+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")});a.points=c;a.options=q;a.graph=w;f.prototype.drawGraph.call(a)}}});d(a,"indicators/stochastic.src.js",[a["Core/Globals.js"],a["Core/Utilities.js"],a["mixins/reduce-array.js"],a["mixins/multipe-lines.js"]],function(a,b,d,e){var m=b.isArray,f=b.merge;b=b.seriesType;var g=a.seriesTypes.sma,u=d.getArrayExtremes;
b("stochastic","sma",{params:{periods:[14,3]},marker:{enabled:!1},tooltip:{pointFormat:'<span style="color:{point.color}">\u25cf</span><b> {series.name}</b><br/>%K: {point.y}<br/>%D: {point.smoothed}<br/>'},smoothedLine:{styles:{lineWidth:1,lineColor:void 0}},dataGrouping:{approximation:"averages"}},f(e,{nameComponents:["periods"],nameBase:"Stochastic",pointArrayMap:["y","smoothed"],parallelArrays:["x","y","smoothed"],pointValKey:"y",linesApiNames:["smoothedLine"],init:function(){g.prototype.init.apply(this,
arguments);this.options=f({smoothedLine:{styles:{lineColor:this.color}}},this.options)},getValues:function(a,b){var c=b.periods[0];b=b.periods[1];var d=a.xData,e=(a=a.yData)?a.length:0,h=[],k=[],f=[],p=null,l;if(!(e<c)&&m(a[0])&&4===a[0].length){for(l=c-1;l<e;l++){var n=a.slice(l-c+1,l+1);var v=u(n,2,1);var t=v[0];n=a[l][3]-t;t=v[1]-t;n=n/t*100;k.push(d[l]);f.push([n,null]);l>=c-1+(b-1)&&(p=g.prototype.getValues.call(this,{xData:k.slice(-b),yData:f.slice(-b)},{period:b}),p=p.yData[0]);h.push([d[l],
n,p]);f[f.length-1][1]=p}return{values:h,xData:k,yData:f}}}}));""});d(a,"masters/indicators/stochastic.src.js",[],function(){})});
//# sourceMappingURL=stochastic.js.map