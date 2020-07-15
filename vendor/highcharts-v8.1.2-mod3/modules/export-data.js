/*
 Highcharts JS v8.1.2 (2020-07-15)

 Exporting module

 (c) 2010-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/modules/export-data",["highcharts","highcharts/modules/exporting"],function(f){a(f);a.Highcharts=f;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function f(a,b,n,d){a.hasOwnProperty(b)||(a[b]=d.apply(null,n))}a=a?a._modules:{};f(a,"mixins/ajax.js",[a["Core/Globals.js"],a["Core/Utilities.js"]],function(a,b){var n=b.merge,d=
b.objectEach;a.ajax=function(b){var a=n(!0,{url:!1,type:"get",dataType:"json",success:!1,error:!1,data:!1,headers:{}},b);b={json:"application/json",xml:"application/xml",text:"text/plain",octet:"application/octet-stream"};var e=new XMLHttpRequest;if(!a.url)return!1;e.open(a.type.toUpperCase(),a.url,!0);a.headers["Content-Type"]||e.setRequestHeader("Content-Type",b[a.dataType]||b.text);d(a.headers,function(a,b){e.setRequestHeader(b,a)});e.onreadystatechange=function(){if(4===e.readyState){if(200===
e.status){var b=e.responseText;if("json"===a.dataType)try{b=JSON.parse(b)}catch(g){a.error&&a.error(e,g);return}return a.success&&a.success(b)}a.error&&a.error(e,e.responseText)}};try{a.data=JSON.stringify(a.data)}catch(c){}e.send(a.data||!0)};a.getJSON=function(b,d){a.ajax({url:b,success:d,dataType:"json",headers:{"Content-Type":"text/plain"}})};return{ajax:a.ajax,getJSON:a.getJSON}});f(a,"mixins/download-url.js",[a["Core/Globals.js"]],function(a){var b=a.win,n=b.navigator,d=b.document,f=b.URL||
b.webkitURL||b,I=/Edge\/\d+/.test(n.userAgent),e=a.dataURLtoBlob=function(a){if((a=a.match(/data:([^;]*)(;base64)?,([0-9A-Za-z+/]+)/))&&3<a.length&&b.atob&&b.ArrayBuffer&&b.Uint8Array&&b.Blob&&f.createObjectURL){var c=b.atob(a[3]),d=new b.ArrayBuffer(c.length);d=new b.Uint8Array(d);for(var e=0;e<d.length;++e)d[e]=c.charCodeAt(e);a=new b.Blob([d],{type:a[1]});return f.createObjectURL(a)}};a=a.downloadURL=function(a,g){var c=d.createElement("a");if("string"===typeof a||a instanceof String||!n.msSaveOrOpenBlob){if(I||
2E6<a.length)if(a=e(a),!a)throw Error("Failed to convert to blob");if("undefined"!==typeof c.download)c.href=a,c.download=g,d.body.appendChild(c),c.click(),d.body.removeChild(c);else try{var f=b.open(a,"chart");if("undefined"===typeof f||null===f)throw Error("Failed to open window");}catch(D){b.location.href=a}}else n.msSaveOrOpenBlob(a,g)};return{dataURLtoBlob:e,downloadURL:a}});f(a,"Extensions/ExportData.js",[a["Core/Axis/Axis.js"],a["Core/Chart/Chart.js"],a["Core/Globals.js"],a["Core/Utilities.js"],
a["mixins/download-url.js"]],function(a,b,f,d,H){function n(a,b){var d=g.navigator,l=-1<d.userAgent.indexOf("WebKit")&&0>d.userAgent.indexOf("Chrome"),e=g.URL||g.webkitURL||g;try{if(d.msSaveOrOpenBlob&&g.MSBlobBuilder){var c=new g.MSBlobBuilder;c.append(a);return c.getBlob("image/svg+xml")}if(!l)return e.createObjectURL(new g.Blob(["\ufeff"+a],{type:b}))}catch(O){}}var e=f.doc,c=f.seriesTypes,g=f.win,J=d.addEvent,K=d.defined;f=d.extend;var D=d.find,z=d.fireEvent,M=d.getOptions,N=d.isNumber,t=d.pick;
d=d.setOptions;var E=H.downloadURL;d({exporting:{csv:{columnHeaderFormatter:null,dateFormat:"%Y-%m-%d %H:%M:%S",decimalPoint:null,itemDelimiter:null,lineDelimiter:"\n"},showTable:!1,useMultiLevelHeaders:!0,useRowspanHeaders:!0},lang:{downloadCSV:"Download CSV",downloadXLS:"Download XLS",exportData:{categoryHeader:"Category",categoryDatetimeHeader:"DateTime"},viewData:"View data table"}});J(b,"render",function(){this.options&&this.options.exporting&&this.options.exporting.showTable&&!this.options.chart.forExport&&
this.viewData()});b.prototype.setUpKeyToAxis=function(){c.arearange&&(c.arearange.prototype.keyToAxis={low:"y",high:"y"});c.gantt&&(c.gantt.prototype.keyToAxis={start:"x",end:"x"})};b.prototype.getDataRows=function(b){var d=this.hasParallelCoordinates,c=this.time,e=this.options.exporting&&this.options.exporting.csv||{},l=this.xAxis,f={},g=[],n=[],A=[],q;var h=this.options.lang.exportData;var w=h.categoryHeader,u=h.categoryDatetimeHeader,F=function(m,d,f){if(e.columnHeaderFormatter){var c=e.columnHeaderFormatter(m,
d,f);if(!1!==c)return c}return m?m instanceof a?m.options.title&&m.options.title.text||(m.dateTime?u:w):b?{columnTitle:1<f?d:m.name,topLevelColumnTitle:m.name}:m.name+(1<f?" ("+d+")":""):w},G=function(a,b,d){var m={},f={};b.forEach(function(b){var c=(a.keyToAxis&&a.keyToAxis[b]||b)+"Axis";c=N(d)?a.chart[c][d]:a[c];m[b]=c&&c.categories||[];f[b]=c&&c.dateTime});return{categoryMap:m,dateTimeValueAxisMap:f}},r=function(a,b){return a.data.filter(function(a){return"undefined"!==typeof a.y&&a.name}).length&&
b&&!b.categories&&!a.keyToAxis?a.pointArrayMap&&a.pointArrayMap.filter(function(a){return"x"===a}).length?(a.pointArrayMap.unshift("x"),a.pointArrayMap):["x","y"]:a.pointArrayMap||["y"]},k=[];var v=0;this.setUpKeyToAxis();this.series.forEach(function(a){var u=a.xAxis,m=a.options.keys||r(a,u),g=m.length,p=!a.requireSorting&&{},w=l.indexOf(u),y=G(a,m),h;if(!1!==a.options.includeInDataExport&&!a.options.isInternal&&!1!==a.visible){D(k,function(a){return a[0]===w})||k.push([w,v]);for(h=0;h<g;)q=F(a,m[h],
m.length),A.push(q.columnTitle||q),b&&n.push(q.topLevelColumnTitle||q),h++;var L={chart:a.chart,autoIncrement:a.autoIncrement,options:a.options,pointArrayMap:a.pointArrayMap};a.options.data.forEach(function(b,l){d&&(y=G(a,m,l));var k={series:L};a.pointClass.prototype.applyOptions.apply(k,[b]);b=k.x;var r=a.data[l]&&a.data[l].name;h=0;if(!u||"name"===a.exportKey||!d&&u&&u.hasNames&&r)b=r;p&&(p[b]&&(b+="|"+l),p[b]=!0);f[b]||(f[b]=[],f[b].xValues=[]);f[b].x=k.x;f[b].name=r;for(f[b].xValues[w]=k.x;h<
g;)l=m[h],r=k[l],f[b][v+h]=t(y.categoryMap[l][r],y.dateTimeValueAxisMap[l]?c.dateFormat(e.dateFormat,r):null,r),h++});v+=h}});for(p in f)Object.hasOwnProperty.call(f,p)&&g.push(f[p]);var p=b?[n,A]:[A];for(v=k.length;v--;){var B=k[v][0];var C=k[v][1];var x=l[B];g.sort(function(a,b){return a.xValues[B]-b.xValues[B]});h=F(x);p[0].splice(C,0,h);b&&p[1]&&p[1].splice(C,0,h);g.forEach(function(a){var b=a.name;x&&!K(b)&&(x.dateTime?(a.x instanceof Date&&(a.x=a.x.getTime()),b=c.dateFormat(e.dateFormat,a.x)):
b=x.categories?t(x.names[a.x],x.categories[a.x],a.x):a.x);a.splice(C,0,b)})}p=p.concat(g);z(this,"exportData",{dataRows:p});return p};b.prototype.getCSV=function(a){var b="",d=this.getDataRows(),c=this.options.exporting.csv,f=t(c.decimalPoint,","!==c.itemDelimiter&&a?(1.1).toLocaleString()[1]:"."),l=t(c.itemDelimiter,","===f?";":","),e=c.lineDelimiter;d.forEach(function(a,c){for(var g,h=a.length;h--;)g=a[h],"string"===typeof g&&(g='"'+g+'"'),"number"===typeof g&&"."!==f&&(g=g.toString().replace(".",
f)),a[h]=g;b+=a.join(l);c<d.length-1&&(b+=e)});return b};b.prototype.getTable=function(a){var b='<table id="highcharts-data-table-'+this.index+'">',c=this.options,d=a?(1.1).toLocaleString()[1]:".",f=t(c.exporting.useMultiLevelHeaders,!0);a=this.getDataRows(f);var e=0,g=f?a.shift():null,l=a.shift(),n=function(a,b,c,f){var e=t(f,"");b="text"+(b?" "+b:"");"number"===typeof e?(e=e.toString(),","===d&&(e=e.replace(".",d)),b="number"):f||(b="empty");return"<"+a+(c?" "+c:"")+' class="'+b+'">'+e+"</"+a+">"};
!1!==c.exporting.tableCaption&&(b+='<caption class="highcharts-table-caption">'+t(c.exporting.tableCaption,c.title.text?c.title.text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;"):"Chart")+"</caption>");for(var q=0,h=a.length;q<h;++q)a[q].length>e&&(e=a[q].length);b+=function(a,b,d){var e="<thead>",g=0;d=d||b&&b.length;var k,l=0;if(k=f&&a&&b){a:if(k=a.length,b.length===k){for(;k--;)if(a[k]!==b[k]){k=!1;break a}k=
!0}else k=!1;k=!k}if(k){for(e+="<tr>";g<d;++g){k=a[g];var h=a[g+1];k===h?++l:l?(e+=n("th","highcharts-table-topheading",'scope="col" colspan="'+(l+1)+'"',k),l=0):(k===b[g]?c.exporting.useRowspanHeaders?(h=2,delete b[g]):(h=1,b[g]=""):h=1,e+=n("th","highcharts-table-topheading",'scope="col"'+(1<h?' valign="top" rowspan="'+h+'"':""),k))}e+="</tr>"}if(b){e+="<tr>";g=0;for(d=b.length;g<d;++g)"undefined"!==typeof b[g]&&(e+=n("th",null,'scope="col"',b[g]));e+="</tr>"}return e+"</thead>"}(g,l,Math.max(e,
l.length));b+="<tbody>";a.forEach(function(a){b+="<tr>";for(var c=0;c<e;c++)b+=n(c?"td":"th",null,c?"":'scope="row"',a[c]);b+="</tr>"});b+="</tbody></table>";a={html:b};z(this,"afterGetTable",a);return a.html};b.prototype.downloadCSV=function(){var a=this.getCSV(!0);E(n(a,"text/csv")||"data:text/csv,\ufeff"+encodeURIComponent(a),this.getFilename()+".csv")};b.prototype.downloadXLS=function(){var a='<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head>\x3c!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>Ark1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--\x3e<style>td{border:none;font-family: Calibri, sans-serif;} .number{mso-number-format:"0.00";} .text{ mso-number-format:"@";}</style><meta name=ProgId content=Excel.Sheet><meta charset=UTF-8></head><body>'+
this.getTable(!0)+"</body></html>";E(n(a,"application/vnd.ms-excel")||"data:application/vnd.ms-excel;base64,"+g.btoa(unescape(encodeURIComponent(a))),this.getFilename()+".xls")};b.prototype.viewData=function(){this.dataTableDiv||(this.dataTableDiv=e.createElement("div"),this.dataTableDiv.className="highcharts-data-table",this.renderTo.parentNode.insertBefore(this.dataTableDiv,this.renderTo.nextSibling));this.dataTableDiv.innerHTML=this.getTable();z(this,"afterViewData",this.dataTableDiv)};if(b=M().exporting)f(b.menuItemDefinitions,
{downloadCSV:{textKey:"downloadCSV",onclick:function(){this.downloadCSV()}},downloadXLS:{textKey:"downloadXLS",onclick:function(){this.downloadXLS()}},viewData:{textKey:"viewData",onclick:function(){this.viewData()}}}),b.buttons&&b.buttons.contextButton.menuItems.push("separator","downloadCSV","downloadXLS","viewData");c.map&&(c.map.prototype.exportKey="name");c.mapbubble&&(c.mapbubble.prototype.exportKey="name");c.treemap&&(c.treemap.prototype.exportKey="name")});f(a,"masters/modules/export-data.src.js",
[],function(){})});
//# sourceMappingURL=export-data.js.map