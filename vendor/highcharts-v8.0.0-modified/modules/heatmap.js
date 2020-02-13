/*
 Highmaps JS v8.0.0 (2020-02-13)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/heatmap",["highcharts"],function(p){a(p);a.Highcharts=p;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function p(c,f,a,n){c.hasOwnProperty(f)||(c[f]=n.apply(null,a))}a=a?a._modules:{};p(a,"parts-map/ColorSeriesMixin.js",[a["parts/Globals.js"]],function(c){c.colorPointMixin={setVisible:function(c){var f=this,a=c?"show":
"hide";f.visible=f.options.visible=!!c;["graphic","dataLabel"].forEach(function(c){if(f[c])f[c][a]()})}};c.colorSeriesMixin={optionalAxis:"colorAxis",colorAxis:0,translateColors:function(){var c=this,a=this.options.nullColor,n=this.colorAxis,r=this.colorKey;(this.data.length?this.data:this.points).forEach(function(f){var w=f.getNestedProperty(r);if(w=f.options.color||(f.isNull?a:n&&"undefined"!==typeof w?n.toColor(w,f):f.color||c.color))f.color=w})}}});p(a,"parts-map/ColorAxis.js",[a["parts/Globals.js"],
a["parts/Utilities.js"]],function(c,f){"";var a=f.addEvent,n=f.erase,r=f.extend,p=f.isNumber,u=f.merge,t=f.pick,v=f.splat,l=c.Axis;f=c.Chart;var q=c.Series,k=c.Point,m=c.color,x=c.Legend,B=c.LegendSymbolMixin,C=c.colorPointMixin,A=c.noop;r(q.prototype,c.colorSeriesMixin);r(k.prototype,C);f.prototype.collectionsWithUpdate.push("colorAxis");f.prototype.collectionsWithInit.colorAxis=[f.prototype.addColorAxis];var y=c.ColorAxis=function(){this.init.apply(this,arguments)};r(y.prototype,l.prototype);r(y.prototype,
{defaultColorAxisOptions:{lineWidth:0,minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},width:.01,color:"#999999"},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0},keepProps:["legendGroup","legendItemHeight","legendItemWidth","legendItem","legendSymbol"].concat(l.prototype.keepProps),init:function(b,d){this.coll="colorAxis";var g=this.buildOptions.call(b,this.defaultColorAxisOptions,
d);l.prototype.init.call(this,b,g);d.dataClasses&&this.initDataClasses(d);this.initStops();this.horiz=!g.opposite;this.zoomEnabled=!1;this.defaultLegendLength=200},initDataClasses:function(b){var d=this.chart,g,e=0,h=d.options.chart.colorCount,c=this.options,f=b.dataClasses.length;this.dataClasses=g=[];this.legendItems=[];b.dataClasses.forEach(function(b,a){b=u(b);g.push(b);if(d.styledMode||!b.color)"category"===c.dataClassColor?(d.styledMode||(a=d.options.colors,h=a.length,b.color=a[e]),b.colorIndex=
e,e++,e===h&&(e=0)):b.color=m(c.minColor).tweenTo(m(c.maxColor),2>f?.5:a/(f-1))})},hasData:function(){return!(!this.tickPositions||!this.tickPositions.length)},setTickPositions:function(){if(!this.dataClasses)return l.prototype.setTickPositions.call(this)},initStops:function(){this.stops=this.options.stops||[[0,this.options.minColor],[1,this.options.maxColor]];this.stops.forEach(function(b){b.color=m(b[1])})},buildOptions:function(b,d){var g=this.options.legend,e=d.layout?"vertical"!==d.layout:"vertical"!==
g.layout;return u(b,{side:e?2:1,reversed:!e},d,{opposite:!e,showEmpty:!1,title:null,visible:g.enabled&&(d?!1!==d.visible:!0)})},setOptions:function(b){l.prototype.setOptions.call(this,b);this.options.crosshair=this.options.marker},setAxisSize:function(){var b=this.legendSymbol,d=this.chart,g=d.options.legend||{},e,h;b?(this.left=g=b.attr("x"),this.top=e=b.attr("y"),this.width=h=b.attr("width"),this.height=b=b.attr("height"),this.right=d.chartWidth-g-h,this.bottom=d.chartHeight-e-b,this.len=this.horiz?
h:b,this.pos=this.horiz?g:e):this.len=(this.horiz?g.symbolWidth:g.symbolHeight)||this.defaultLegendLength},normalizedValue:function(b){this.isLog&&(b=this.val2lin(b));return 1-(this.max-b)/(this.max-this.min||1)},toColor:function(b,d){var g=this.stops,e=this.dataClasses,h;if(e)for(h=e.length;h--;){var c=e[h];var a=c.from;g=c.to;if(("undefined"===typeof a||b>=a)&&("undefined"===typeof g||b<=g)){var f=c.color;d&&(d.dataClass=h,d.colorIndex=c.colorIndex);break}}else{b=this.normalizedValue(b);for(h=g.length;h--&&
!(b>g[h][0]););a=g[h]||g[h+1];g=g[h+1]||a;b=1-(g[0]-b)/(g[0]-a[0]||1);f=a.color.tweenTo(g.color,b)}return f},getOffset:function(){var b=this.legendGroup,d=this.chart.axisOffset[this.side];b&&(this.axisParent=b,l.prototype.getOffset.call(this),this.added||(this.added=!0,this.labelLeft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=d)},setLegendColor:function(){var b=this.reversed;var d=b?1:0;b=b?0:1;d=this.horiz?[d,0,b,0]:[0,b,0,d];this.legendColor={linearGradient:{x1:d[0],y1:d[1],
x2:d[2],y2:d[3]},stops:this.stops}},drawLegendSymbol:function(b,d){var g=b.padding,e=b.options,h=this.horiz,c=t(e.symbolWidth,h?this.defaultLegendLength:12),a=t(e.symbolHeight,h?12:this.defaultLegendLength),f=t(e.labelPadding,h?16:30);e=t(e.itemDistance,10);this.setLegendColor();d.legendSymbol=this.chart.renderer.rect(0,b.baseline-11,c,a).attr({zIndex:1}).add(d.legendGroup);this.legendItemWidth=c+g+(h?e:f);this.legendItemHeight=a+g+(h?f:0)},setState:function(b){this.series.forEach(function(d){d.setState(b)})},
visible:!0,setVisible:A,getSeriesExtremes:function(){var b=this.series,d=b.length,g;this.dataMin=Infinity;for(this.dataMax=-Infinity;d--;){var e=b[d];var c=e.colorKey=t(e.options.colorKey,e.colorKey,e.pointValKey,e.zoneAxis,"y");var a=e.pointArrayMap;var f=e[c+"Min"]&&e[c+"Max"];if(e[c+"Data"])var k=e[c+"Data"];else if(a){k=[];a=a.indexOf(c);var m=e.yData;if(0<=a&&m)for(g=0;g<m.length;g++)k.push(t(m[g][a],m[g]))}else k=e.yData;f?(e.minColorValue=e[c+"Min"],e.maxColorValue=e[c+"Max"]):(q.prototype.getExtremes.call(e,
k),e.minColorValue=e.dataMin,e.maxColorValue=e.dataMax);"undefined"!==typeof e.minColorValue&&(this.dataMin=Math.min(this.dataMin,e.minColorValue),this.dataMax=Math.max(this.dataMax,e.maxColorValue));f||q.prototype.getExtremes.call(e)}},drawCrosshair:function(b,d){var c=d&&d.plotX,e=d&&d.plotY,a=this.pos,f=this.len;if(d){var k=this.toPixels(d.getNestedProperty(d.series.colorKey));k<a?k=a-2:k>a+f&&(k=a+f+2);d.plotX=k;d.plotY=this.len-k;l.prototype.drawCrosshair.call(this,b,d);d.plotX=c;d.plotY=e;this.cross&&
!this.cross.addedToColorAxis&&this.legendGroup&&(this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),this.cross.addedToColorAxis=!0,this.chart.styledMode||this.cross.attr({fill:this.crosshair.color}))}},getPlotLinePath:function(b){var d=b.translatedValue;return p(d)?this.horiz?["M",d-4,this.top-6,"L",d+4,this.top-6,d,this.top,"Z"]:["M",this.left,d,"L",this.left-6,d+6,this.left-6,d-6,"Z"]:l.prototype.getPlotLinePath.apply(this,arguments)},update:function(b,d){var c=this.chart,
e=c.legend,a=this.buildOptions.call(c,{},b);this.series.forEach(function(b){b.isDirtyData=!0});(b.dataClasses&&e.allItems||this.dataClasses)&&this.destroyItems();c.options[this.coll]=u(this.userOptions,a);l.prototype.update.call(this,a,d);this.legendItem&&(this.setLegendColor(),e.colorizeItem(this,!0))},destroyItems:function(){var b=this.chart;this.legendItem?b.legend.destroyItem(this):this.legendItems&&this.legendItems.forEach(function(d){b.legend.destroyItem(d)});b.isDirtyLegend=!0},remove:function(b){this.destroyItems();
l.prototype.remove.call(this,b)},getDataClassLegendSymbols:function(){var b=this,d=this.chart,c=this.legendItems,e=d.options.legend,a=e.valueDecimals,f=e.valueSuffix||"",k;c.length||this.dataClasses.forEach(function(e,g){var h=!0,m=e.from,l=e.to,n=d.numberFormatter;k="";"undefined"===typeof m?k="< ":"undefined"===typeof l&&(k="> ");"undefined"!==typeof m&&(k+=n(m,a)+f);"undefined"!==typeof m&&"undefined"!==typeof l&&(k+=" - ");"undefined"!==typeof l&&(k+=n(l,a)+f);c.push(r({chart:d,name:k,options:{},
drawLegendSymbol:B.drawRectangle,visible:!0,setState:A,isDataClass:!0,setVisible:function(){h=this.visible=!h;b.series.forEach(function(b){b.points.forEach(function(b){b.dataClass===g&&b.setVisible(h)})});d.legend.colorizeItem(this,h)}},e))});return c},beforePadding:!1,name:""});["fill","stroke"].forEach(function(b){c.Fx.prototype[b+"Setter"]=function(){this.elem.attr(b,m(this.start).tweenTo(m(this.end),this.pos),null,!0)}});a(f,"afterGetAxes",function(){var b=this,d=b.options;this.colorAxis=[];d.colorAxis&&
(d.colorAxis=v(d.colorAxis),d.colorAxis.forEach(function(d,e){d.index=e;new y(b,d)}))});a(q,"bindAxes",function(){var b=this.axisTypes;b?-1===b.indexOf("colorAxis")&&b.push("colorAxis"):this.axisTypes=["colorAxis"]});a(x,"afterGetAllItems",function(b){var d=[],c,e;(this.chart.colorAxis||[]).forEach(function(e){(c=e.options)&&c.showInLegend&&(c.dataClasses&&c.visible?d=d.concat(e.getDataClassLegendSymbols()):c.visible&&d.push(e),e.series.forEach(function(d){if(!d.options.showInLegend||c.dataClasses)"point"===
d.options.legendType?d.points.forEach(function(d){n(b.allItems,d)}):n(b.allItems,d)}))});for(e=d.length;e--;)b.allItems.unshift(d[e])});a(x,"afterColorizeItem",function(b){b.visible&&b.item.legendColor&&b.item.legendSymbol.attr({fill:b.item.legendColor})});a(x,"afterUpdate",function(){var b=this.chart.colorAxis;b&&b.forEach(function(b,c,e){b.update({},e)})});a(q,"afterTranslate",function(){(this.chart.colorAxis&&this.chart.colorAxis.length||this.colorAttribs)&&this.translateColors()})});p(a,"parts-map/ColorMapSeriesMixin.js",
[a["parts/Globals.js"],a["parts/Utilities.js"]],function(c,a){var f=a.defined;a=c.noop;var n=c.seriesTypes;c.colorMapPointMixin={dataLabelOnNull:!0,isValid:function(){return null!==this.value&&Infinity!==this.value&&-Infinity!==this.value},setState:function(a){c.Point.prototype.setState.call(this,a);this.graphic&&this.graphic.attr({zIndex:"hover"===a?1:0})}};c.colorMapSeriesMixin={pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],trackerGroups:["group","markerGroup","dataLabelsGroup"],
getSymbol:a,parallelArrays:["x","y","value"],colorKey:"value",pointAttribs:n.column.prototype.pointAttribs,colorAttribs:function(c){var a={};f(c.color)&&(a[this.colorProp||"fill"]=c.color);return a}}});p(a,"parts-map/HeatmapSeries.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(c,a){var f=a.clamp,n=a.extend,p=a.merge,z=a.pick;a=c.colorMapPointMixin;var u=c.noop,t=c.fireEvent,v=c.Series,l=c.seriesType,q=c.seriesTypes;l("heatmap","scatter",{animation:!1,borderWidth:0,nullColor:"#f7f7f7",
dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},marker:null,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}<br/>"},states:{hover:{halo:!1,brightness:.2}}},p(c.colorMapSeriesMixin,{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,getExtremesFromAll:!0,directTouch:!0,init:function(){q.scatter.prototype.init.apply(this,arguments);var a=this.options;a.pointRange=z(a.pointRange,a.colsize||1);this.yAxis.axisPointRange=
a.rowsize||1},translate:function(){this.generatePoints();var a=this.options,c=a.colsize,l=a.pointPadding,n=void 0===l?0:l;a=a.rowsize;l=this.points;var p=this.xAxis,q=this.yAxis,r=(void 0===c?1:c)/2,b=(void 0===a?1:a)/2,d=this.pointPlacementToXValue(),g=function(b){return Math.round(f(p.translate(b,!1,!1,!1,!0,d),0,p.len))};l.forEach(function(a){var d=g(a.x-r),c=g(a.x+r),e=Math.round(f(q.translate(a.y-b,!1,!0,!1,!0),0,q.len)),k=Math.round(f(q.translate(a.y+b,!1,!0,!1,!0),0,q.len)),m=z(a.pointPadding,
n);a.plotX=a.clientX=(d+c)/2;a.plotY=(e+k)/2;a.shapeType="rect";a.shapeArgs={x:Math.min(d,c)+m,y:Math.min(e,k)+m,width:Math.max(Math.abs(c-d)-2*m,0),height:Math.max(Math.abs(k-e)-2*m,0)}});t(this,"afterTranslate")},drawPoints:function(){var a=this.chart.styledMode?"css":"animate";q.column.prototype.drawPoints.call(this);this.points.forEach(function(c){c.graphic[a](this.colorAttribs(c))},this)},hasData:function(){return!!this.processedXData.length},getValidPoints:function(a,c){return v.prototype.getValidPoints.call(this,
a,c,!0)},animate:u,getBox:u,drawLegendSymbol:c.LegendSymbolMixin.drawRectangle,alignDataLabel:q.column.prototype.alignDataLabel,getExtremes:function(){v.prototype.getExtremes.call(this,this.valueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;v.prototype.getExtremes.call(this)}}),n({haloPath:function(a){if(!a)return[];var c=this.shapeArgs;return["M",c.x-a,c.y-a,"L",c.x-a,c.y+c.height+a,c.x+c.width+a,c.y+c.height+a,c.x+c.width+a,c.y-a,"Z"]}},a));""});p(a,"masters/modules/heatmap.src.js",
[],function(){})});
//# sourceMappingURL=heatmap.js.map