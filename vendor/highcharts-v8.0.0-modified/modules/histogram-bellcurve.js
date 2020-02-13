/*
 Highcharts JS v8.0.0 (2020-02-13)

 (c) 2010-2019 Highsoft AS
 Author: Sebastian Domas

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/histogram-bellcurve",["highcharts"],function(e){a(e);a.Highcharts=e;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function e(a,b,g,h){a.hasOwnProperty(b)||(a[b]=h.apply(null,g))}a=a?a._modules:{};e(a,"mixins/derived-series.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){var g=b.addEvent,h=b.defined,
e=a.Series;return{hasDerivedData:!0,init:function(){e.prototype.init.apply(this,arguments);this.initialised=!1;this.baseSeries=null;this.eventRemovers=[];this.addEvents()},setDerivedData:a.noop,setBaseSeries:function(){var a=this.chart,c=this.options.baseSeries;this.baseSeries=h(c)&&(a.series[c]||a.get(c))||null},addEvents:function(){var a=this;var c=g(this.chart,"afterLinkSeries",function(){a.setBaseSeries();a.baseSeries&&!a.initialised&&(a.setDerivedData(),a.addBaseSeriesEvents(),a.initialised=
!0)});this.eventRemovers.push(c)},addBaseSeriesEvents:function(){var a=this;var c=g(a.baseSeries,"updatedData",function(){a.setDerivedData()});var b=g(a.baseSeries,"destroy",function(){a.baseSeries=null;a.initialised=!1});a.eventRemovers.push(c,b)},destroy:function(){this.eventRemovers.forEach(function(a){a()});e.prototype.destroy.apply(this,arguments)}}});e(a,"modules/histogram.src.js",[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/derived-series.js"]],function(a,b,e){function h(a){return function(k){for(var b=
1;a[b]<=k;)b++;return a[--b]}}var g=b.arrayMax,n=b.arrayMin,c=b.correctFloat,m=b.isNumber,f=b.merge,r=b.objectEach;a=a.seriesType;var d={"square-root":function(a){return Math.ceil(Math.sqrt(a.options.data.length))},sturges:function(a){return Math.ceil(Math.log(a.options.data.length)*Math.LOG2E)},rice:function(a){return Math.ceil(2*Math.pow(a.options.data.length,1/3))}};a("histogram","column",{binsNumber:"square-root",binWidth:void 0,pointPadding:0,groupPadding:0,grouping:!1,pointPlacement:"between",
tooltip:{headerFormat:"",pointFormat:'<span style="font-size: 10px">{point.x} - {point.x2}</span><br/><span style="color:{point.color}">\u25cf</span> {series.name} <b>{point.y}</b><br/>'}},f(e,{setDerivedData:function(){var a=this.baseSeries.yData;a.length&&(a=this.derivedData(a,this.binsNumber(),this.options.binWidth),this.setData(a,!1))},derivedData:function(a,b,f){var k=g(a),d=c(n(a)),e=[],l={},p=[];f=this.binWidth=this.options.pointRange=c(m(f)?f||1:(k-d)/b);for(b=d;b<k&&(this.userOptions.binWidth||
c(k-b)>=f||0>=c(d+e.length*f-b));b=c(b+f))e.push(b),l[b]=0;0!==l[d]&&(e.push(c(d)),l[c(d)]=0);var q=h(e.map(function(a){return parseFloat(a)}));a.forEach(function(a){a=c(q(a));l[a]++});r(l,function(a,b){p.push({x:Number(b),y:a,x2:c(Number(b)+f)})});p.sort(function(a,b){return a.x-b.x});return p},binsNumber:function(){var a=this.options.binsNumber,b=d[a]||"function"===typeof a&&a;return Math.ceil(b&&b(this.baseSeries)||(m(a)?a:d["square-root"](this.baseSeries)))}}));""});e(a,"modules/bellcurve.src.js",
[a["parts/Globals.js"],a["parts/Utilities.js"],a["mixins/derived-series.js"]],function(a,b,e){function h(a){var b=a.length;a=a.reduce(function(a,b){return a+b},0);return 0<b&&a/b}function g(a,b){var d=a.length;b=m(b)?b:h(a);a=a.reduce(function(a,d){d-=b;return a+d*d},0);return 1<d&&Math.sqrt(a/(d-1))}function n(a,b,d){a-=b;return Math.exp(-(a*a)/(2*d*d))/(d*Math.sqrt(2*Math.PI))}var c=b.correctFloat,m=b.isNumber;b=b.merge;a=a.seriesType;a("bellcurve","areaspline",{intervals:3,pointsInInterval:3,marker:{enabled:!1}},
b(e,{setMean:function(){this.mean=c(h(this.baseSeries.yData))},setStandardDeviation:function(){this.standardDeviation=c(g(this.baseSeries.yData,this.mean))},setDerivedData:function(){1<this.baseSeries.yData.length&&(this.setMean(),this.setStandardDeviation(),this.setData(this.derivedData(this.mean,this.standardDeviation),!1))},derivedData:function(a,b){var d=this.options.intervals,c=this.options.pointsInInterval,e=a-d*b;d=d*c*2+1;c=b/c;var g=[],f;for(f=0;f<d;f++)g.push([e,n(e,a,b)]),e+=c;return g}}));
""});e(a,"masters/modules/histogram-bellcurve.src.js",[],function(){})});
//# sourceMappingURL=histogram-bellcurve.js.map