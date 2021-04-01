var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="distlib.data";var REMOTE_PACKAGE_BASE="distlib.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata["remote_package_size"];var PACKAGE_UUID=metadata["package_uuid"];function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.8",true,true);Module["FS_createPath"]("/lib/python3.8","site-packages",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages","distlib",true,true);Module["FS_createPath"]("/lib/python3.8/site-packages/distlib","_backport",true,true);function processPackageData(arrayBuffer){assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:588223,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1110,2315,3651,4974,6262,7506,8693,9977,10957,12038,13285,14257,15612,16637,17679,18690,19896,20681,21551,22480,23479,24819,26042,26976,28156,29370,30594,31590,32734,33966,35193,36427,37511,38720,39941,41202,42467,43667,44617,45837,46916,48120,49199,50303,51576,52556,54037,55125,56356,57549,58660,59863,61032,62236,63398,64538,65999,67341,68638,69776,70979,71829,72965,74044,75222,76398,77636,79074,80329,81548,82742,83898,85056,86098,87305,88369,89504,90504,91679,92854,93971,95112,96527,97819,98373,99310,100661,101849,102996,104295,105375,106770,107546,108515,109777,111140,112255,113356,114458,115387,116565,117804,118978,120056,120930,121969,122985,124096,125158,126141,127464,128614,129640,130720,131822,133340,134617,135889,137042,138216,139262,140405,141571,142722,144107,145868,147709,149487,151354,153216,154852,156657,158369,160173,161896,163735,165590,167189,168951,170643,172517,174365,176111,177733,179369,181195,182745,184375,186114,188007,189600,191117,192200,192916,194289,195439,196436,197039,197750,199422,201085,202449,203763,205172,206586,207472,208944,210293,211633,213569,214130,215341,217114,218937,220823,222632,224533,226347,228136,229981,231735,233493,235201,237065,238947,240783,242645,244508,246280,248036,249855,251730,253389,254836,256557,258384,260110,261930,263729,265582,267062,268237,269348,270119,271200,272585,274081,275511,276054,276784,277769,279437,280834,282495,283988,285284,286773,288154,289280,290446,291940,293301,294218,295577,296348,297474,298355,299477,300832,302051,303381,304416,305600,306589,307771,308978,310342,311677,313009,314008,315043,316199,317363,318644,319642,320898,321907,323214,324061,325334,326470,327668,328868,330046,331255,332523,333718,334251,335404,336755,338008,339259,340496,341594,343329,345128,346977,348789,350638,352482,354204,356027,357766,359633,361397,363053,364853,366701,368460,370223,371918,373588,375174,376925,378633,380458,382300,383845,384954,385839,387007,387931,389503,389928,390669,391828,393567,395093,396420,397868,399234,400414,401510,403049,404385,405930,407203,407773,409508,411277,413132,415001,416817,418667,420474,422199,424013,425790,427699,429445,431292,433079,434900,436711,438463,440256,442062,443616,445348,447201,448917,450637,452545,454409,455584,456579,457794,458447,459894,461397,462884,463812,464238,465002,466787,468086,469812,471524,472692,474067,475474,476760,477741,479273,480534,481785,482914,484069,485149,486186,487384,488572,489633,490939,492226,493431,494286,495306,496119,497192,498218,499276,500476,501608,502555,503695,505005,506232,507346,508723,509941,511219,512390,513650,514914,516118,517461,518710,519898,521051,521790,522985,524151,525512,526634,527800,529179,530371,531612,532602,533940,535279,536469,537584,539261,540327,541373,542680,543879,544995,546108,547241,548360,549384,550570,551600,552726,553698,554890,555877,557029,558138,559370,560560,561809,562908,564146,565399,566359,567448,568629,569737,570876,571852,572821,573897,575123,576204,577189,578310,579565,580615,581830,582825,583926,584778,585720,586869,588099],sizes:[1110,1205,1336,1323,1288,1244,1187,1284,980,1081,1247,972,1355,1025,1042,1011,1206,785,870,929,999,1340,1223,934,1180,1214,1224,996,1144,1232,1227,1234,1084,1209,1221,1261,1265,1200,950,1220,1079,1204,1079,1104,1273,980,1481,1088,1231,1193,1111,1203,1169,1204,1162,1140,1461,1342,1297,1138,1203,850,1136,1079,1178,1176,1238,1438,1255,1219,1194,1156,1158,1042,1207,1064,1135,1e3,1175,1175,1117,1141,1415,1292,554,937,1351,1188,1147,1299,1080,1395,776,969,1262,1363,1115,1101,1102,929,1178,1239,1174,1078,874,1039,1016,1111,1062,983,1323,1150,1026,1080,1102,1518,1277,1272,1153,1174,1046,1143,1166,1151,1385,1761,1841,1778,1867,1862,1636,1805,1712,1804,1723,1839,1855,1599,1762,1692,1874,1848,1746,1622,1636,1826,1550,1630,1739,1893,1593,1517,1083,716,1373,1150,997,603,711,1672,1663,1364,1314,1409,1414,886,1472,1349,1340,1936,561,1211,1773,1823,1886,1809,1901,1814,1789,1845,1754,1758,1708,1864,1882,1836,1862,1863,1772,1756,1819,1875,1659,1447,1721,1827,1726,1820,1799,1853,1480,1175,1111,771,1081,1385,1496,1430,543,730,985,1668,1397,1661,1493,1296,1489,1381,1126,1166,1494,1361,917,1359,771,1126,881,1122,1355,1219,1330,1035,1184,989,1182,1207,1364,1335,1332,999,1035,1156,1164,1281,998,1256,1009,1307,847,1273,1136,1198,1200,1178,1209,1268,1195,533,1153,1351,1253,1251,1237,1098,1735,1799,1849,1812,1849,1844,1722,1823,1739,1867,1764,1656,1800,1848,1759,1763,1695,1670,1586,1751,1708,1825,1842,1545,1109,885,1168,924,1572,425,741,1159,1739,1526,1327,1448,1366,1180,1096,1539,1336,1545,1273,570,1735,1769,1855,1869,1816,1850,1807,1725,1814,1777,1909,1746,1847,1787,1821,1811,1752,1793,1806,1554,1732,1853,1716,1720,1908,1864,1175,995,1215,653,1447,1503,1487,928,426,764,1785,1299,1726,1712,1168,1375,1407,1286,981,1532,1261,1251,1129,1155,1080,1037,1198,1188,1061,1306,1287,1205,855,1020,813,1073,1026,1058,1200,1132,947,1140,1310,1227,1114,1377,1218,1278,1171,1260,1264,1204,1343,1249,1188,1153,739,1195,1166,1361,1122,1166,1379,1192,1241,990,1338,1339,1190,1115,1677,1066,1046,1307,1199,1116,1113,1133,1119,1024,1186,1030,1126,972,1192,987,1152,1109,1232,1190,1249,1099,1238,1253,960,1089,1181,1108,1139,976,969,1076,1226,1081,985,1121,1255,1050,1215,995,1101,852,942,1149,1230,124],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData["data"]=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData},true);Module["removeRunDependency"]("datafile_distlib.data")}Module["addRunDependency"]("datafile_distlib.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.8/site-packages/distlib-0.3.1-py3.8.egg-info",start:0,end:1261,audio:0},{filename:"/lib/python3.8/site-packages/distlib/__init__.py",start:1261,end:1842,audio:0},{filename:"/lib/python3.8/site-packages/distlib/compat.py",start:1842,end:43250,audio:0},{filename:"/lib/python3.8/site-packages/distlib/database.py",start:43250,end:94309,audio:0},{filename:"/lib/python3.8/site-packages/distlib/index.py",start:94309,end:115375,audio:0},{filename:"/lib/python3.8/site-packages/distlib/locators.py",start:115375,end:167475,audio:0},{filename:"/lib/python3.8/site-packages/distlib/manifest.py",start:167475,end:182286,audio:0},{filename:"/lib/python3.8/site-packages/distlib/markers.py",start:182286,end:186673,audio:0},{filename:"/lib/python3.8/site-packages/distlib/metadata.py",start:186673,end:225635,audio:0},{filename:"/lib/python3.8/site-packages/distlib/resources.py",start:225635,end:236401,audio:0},{filename:"/lib/python3.8/site-packages/distlib/scripts.py",start:236401,end:253581,audio:0},{filename:"/lib/python3.8/site-packages/distlib/t32.exe",start:253581,end:350349,audio:0},{filename:"/lib/python3.8/site-packages/distlib/t64.exe",start:350349,end:456333,audio:0},{filename:"/lib/python3.8/site-packages/distlib/util.py",start:456333,end:516178,audio:0},{filename:"/lib/python3.8/site-packages/distlib/version.py",start:516178,end:539569,audio:0},{filename:"/lib/python3.8/site-packages/distlib/w32.exe",start:539569,end:629681,audio:0},{filename:"/lib/python3.8/site-packages/distlib/w64.exe",start:629681,end:729521,audio:0},{filename:"/lib/python3.8/site-packages/distlib/wheel.py",start:729521,end:770665,audio:0},{filename:"/lib/python3.8/site-packages/distlib/_backport/__init__.py",start:770665,end:770939,audio:0},{filename:"/lib/python3.8/site-packages/distlib/_backport/misc.py",start:770939,end:771910,audio:0},{filename:"/lib/python3.8/site-packages/distlib/_backport/shutil.py",start:771910,end:797617,audio:0},{filename:"/lib/python3.8/site-packages/distlib/_backport/sysconfig.cfg",start:797617,end:800234,audio:0},{filename:"/lib/python3.8/site-packages/distlib/_backport/sysconfig.py",start:800234,end:827088,audio:0},{filename:"/lib/python3.8/site-packages/distlib/_backport/tarfile.py",start:827088,end:919716,audio:0}],remote_package_size:592319,package_uuid:"3a0a9ed9-3979-414a-bb0d-8e320e80fc17"})})();