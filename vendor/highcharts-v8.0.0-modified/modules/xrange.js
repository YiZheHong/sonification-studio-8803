/*
 Highcharts JS v8.0.0 (2020-02-13)

 X-range series

 (c) 2010-2019 Torstein Honsi, Lars A. V. Cabrera

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/xrange",["highcharts"],function(h){b(h);b.Highcharts=h;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function h(b,p,g,h){b.hasOwnProperty(p)||(b[p]=h.apply(null,g))}b=b?b._modules:{};h(b,"modules/xrange.src.js",[b["parts/Globals.js"],b["parts/Color.js"],b["parts/Utilities.js"]],function(b,h,g){var p=h.parse;h=g.addEvent;
var l=g.clamp,z=g.correctFloat,A=g.defined,q=g.isNumber,v=g.isObject,t=g.merge,w=g.pick,x=b.seriesTypes.column,y=b.find;g=b.seriesType;var B=b.Axis,u=b.Point,C=b.Series;g("xrange","column",{colorByPoint:!0,dataLabels:{formatter:function(){var a=this.point.partialFill;v(a)&&(a=a.amount);if(q(a)&&0<a)return z(100*a)+"%"},inside:!0,verticalAlign:"middle"},tooltip:{headerFormat:'<span style="font-size: 10px">{point.x} - {point.x2}</span><br/>',pointFormat:'<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.yCategory}</b><br/>'},
borderRadius:3,pointRange:0},{type:"xrange",parallelArrays:["x","x2","y"],requireSorting:!1,animate:b.seriesTypes.line.prototype.animate,cropShoulder:1,getExtremesFromAll:!0,autoIncrement:b.noop,buildKDTree:b.noop,getColumnMetrics:function(){function a(){f.series.forEach(function(a){var c=a.xAxis;a.xAxis=a.yAxis;a.yAxis=c})}var f=this.chart;a();var d=x.prototype.getColumnMetrics.call(this);a();return d},cropData:function(a,f,d,b){f=C.prototype.cropData.call(this,this.x2Data,f,d,b);f.xData=a.slice(f.start,
f.end);return f},findPointIndex:function(a){var f=this.cropped,d=this.cropStart,b=this.points,c=a.id;if(c)var e=(e=y(b,function(a){return a.id===c}))?e.index:void 0;"undefined"===typeof e&&(e=(e=y(b,function(c){return c.x===a.x&&c.x2===a.x2&&!c.touched}))?e.index:void 0);f&&q(e)&&q(d)&&e>=d&&(e-=d);return e},translatePoint:function(a){var f=this.xAxis,d=this.yAxis,b=this.columnMetrics,c=this.options,e=c.minPointLength||0,n=a.plotX,g=w(a.x2,a.x+(a.len||0)),k=f.translate(g,0,0,0,1);g=Math.abs(k-n);
var h=this.chart.inverted,p=w(c.borderWidth,1)%2/2,m=b.offset,r=Math.round(b.width);e&&(e-=g,0>e&&(e=0),n-=e/2,k+=e/2);n=Math.max(n,-10);k=l(k,-10,f.len+10);A(a.options.pointWidth)&&(m-=(Math.ceil(a.options.pointWidth)-r)/2,r=Math.ceil(a.options.pointWidth));c.pointPlacement&&q(a.plotY)&&d.categories&&(a.plotY=d.translate(a.y,0,1,0,1,c.pointPlacement));a.shapeArgs={x:Math.floor(Math.min(n,k))+p,y:Math.floor(a.plotY+m)+p,width:Math.round(Math.abs(k-n)),height:r,r:this.options.borderRadius};c=a.shapeArgs.x;
e=c+a.shapeArgs.width;0>c||e>f.len?(c=l(c,0,f.len),e=l(e,0,f.len),k=e-c,a.dlBox=t(a.shapeArgs,{x:c,width:e-c,centerX:k?k/2:null})):a.dlBox=null;c=a.tooltipPos;e=h?1:0;k=h?0:1;c[e]=l(c[e]+g/2*(f.reversed?-1:1)*(h?-1:1),0,f.len-1);c[k]=l(c[k]+b.width/2*(h?1:-1),0,d.len-1);if(b=a.partialFill)v(b)&&(b=b.amount),q(b)||(b=0),d=a.shapeArgs,a.partShapeArgs={x:d.x,y:d.y,width:d.width,height:d.height,r:this.options.borderRadius},n=Math.max(Math.round(g*b+a.plotX-n),0),a.clipRectArgs={x:f.reversed?d.x+g-n:d.x,
y:d.y,width:n,height:d.height}},translate:function(){x.prototype.translate.apply(this,arguments);this.points.forEach(function(a){this.translatePoint(a)},this)},drawPoint:function(a,b){var d=this.options,f=this.chart.renderer,c=a.graphic,e=a.shapeType,g=a.shapeArgs,h=a.partShapeArgs,k=a.clipRectArgs,l=a.partialFill,q=d.stacking&&!d.borderRadius,m=a.state,r=d.states[m||"normal"]||{},u="undefined"===typeof m?"attr":b;m=this.pointAttribs(a,m);r=w(this.chart.options.chart.animation,r.animation);if(a.isNull||
!1===a.visible)c&&(a.graphic=c.destroy());else{if(c)c.rect[b](g);else a.graphic=c=f.g("point").addClass(a.getClassName()).add(a.group||this.group),c.rect=f[e](t(g)).addClass(a.getClassName()).addClass("highcharts-partfill-original").add(c);h&&(c.partRect?(c.partRect[b](t(h)),c.partialClipRect[b](t(k))):(c.partialClipRect=f.clipRect(k.x,k.y,k.width,k.height),c.partRect=f[e](h).addClass("highcharts-partfill-overlay").add(c).clip(c.partialClipRect)));this.chart.styledMode||(c.rect[b](m,r).shadow(d.shadow,
null,q),h&&(v(l)||(l={}),v(d.partialFill)&&(l=t(l,d.partialFill)),a=l.fill||p(m.fill).brighten(-.3).get()||p(a.color||this.color).brighten(-.3).get(),m.fill=a,c.partRect[u](m,r).shadow(d.shadow,null,q)))}},drawPoints:function(){var a=this,b=a.getAnimationVerb();a.points.forEach(function(f){a.drawPoint(f,b)})},getAnimationVerb:function(){return this.chart.pointCount<(this.options.animationLimit||250)?"animate":"attr"}},{resolveColor:function(){var a=this.series;if(a.options.colorByPoint&&!this.options.color){var b=
a.options.colors||a.chart.options.colors;var d=this.y%(b?b.length:a.chart.options.chart.colorCount);b=b&&b[d];a.chart.styledMode||(this.color=b);this.options.colorIndex||(this.colorIndex=d)}else this.color||(this.color=a.color)},init:function(){u.prototype.init.apply(this,arguments);this.y||(this.y=0);return this},setState:function(){u.prototype.setState.apply(this,arguments);this.series.drawPoint(this,this.series.getAnimationVerb())},getLabelConfig:function(){var a=u.prototype.getLabelConfig.call(this),
b=this.series.yAxis.categories;a.x2=this.x2;a.yCategory=this.yCategory=b&&b[this.y];return a},tooltipDateKeys:["x","x2"],isValid:function(){return"number"===typeof this.x&&"number"===typeof this.x2}});h(B,"afterGetSeriesExtremes",function(){var a=this.series,b;if(this.isXAxis){var d=w(this.dataMax,-Number.MAX_VALUE);a.forEach(function(a){a.x2Data&&a.x2Data.forEach(function(a){a>d&&(d=a,b=!0)})});b&&(this.dataMax=d)}});""});h(b,"masters/modules/xrange.src.js",[],function(){})});
//# sourceMappingURL=xrange.js.map