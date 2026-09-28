(function(){
  const INSTRUMENTS=[
    {symbol:'RU',name:'天然橡胶',category:'橡胶'},{symbol:'NR',name:'20号胶',category:'橡胶'},
    {symbol:'RB',name:'螺纹钢',category:'黑色'},{symbol:'HC',name:'热轧卷板',category:'黑色'},
    {symbol:'M',name:'豆粕',category:'农产品'},{symbol:'RM',name:'菜籽粕',category:'农产品'},
    {symbol:'TA',name:'PTA',category:'化工'},{symbol:'MA',name:'甲醇',category:'化工'},
    {symbol:'CU',name:'沪铜',category:'有色'},{symbol:'AL',name:'沪铝',category:'有色'},
    {symbol:'J',name:'焦炭',category:'黑色'},{symbol:'JM',name:'焦煤',category:'黑色'}
  ];
  const CONTRACTS=INSTRUMENTS.flatMap(i=>['2601','2605','2609'].map(month=>({symbol:`${i.symbol}${month}`,name:`${i.name}${month}`,variety:i.symbol,category:i.category})));
  const PAIRS=[
    {id:'ru-nr',name:'RU–NR',legA:'天然橡胶',legB:'20号胶',symbolA:'RU',symbolB:'NR',category:'橡胶产业链',note:'观察两类橡胶的相对价格变化',formula:'RU − 1.00 × NR',beta:1,color:'#0059EC',seed:17,phi:.955,vol:.34,cycle:73,recommended:true},
    {id:'rb-hc',name:'RB–HC',legA:'螺纹钢',legB:'热轧卷板',symbolA:'RB',symbolB:'HC',category:'黑色产业链',note:'观察长材与板材的相对强弱',formula:'RB − 1.00 × HC',beta:1,color:'#FF8600',seed:43,phi:.972,vol:.27,cycle:112,recommended:true},
    {id:'m-rm',name:'豆粕–菜粕',legA:'豆粕',legB:'菜籽粕',symbolA:'M',symbolB:'RM',category:'蛋白粕',note:'观察蛋白粕之间的替代关系',formula:'M − 1.00 × RM',beta:1,color:'#05B96A',seed:89,phi:.94,vol:.42,cycle:55,recommended:true},
    {id:'ta-ma',name:'TA–MA',legA:'PTA',legB:'甲醇',symbolA:'TA',symbolB:'MA',category:'化工品',note:'观察化工链相关品种的相对强弱',formula:'TA − 1.00 × MA',beta:1,color:'#805AD5',seed:112,phi:.962,vol:.31,cycle:88,recommended:true},
    {id:'cu-al',name:'CU–AL',legA:'沪铜',legB:'沪铝',symbolA:'CU',symbolB:'AL',category:'有色金属',note:'观察有色板块相对价格变化',formula:'CU − 1.00 × AL',beta:1,color:'#00A3A3',seed:136,phi:.968,vol:.29,cycle:96,recommended:true},
    {id:'j-jm',name:'J–JM',legA:'焦炭',legB:'焦煤',symbolA:'J',symbolB:'JM',category:'煤焦产业链',note:'观察焦化利润相关价差变化',formula:'J − 1.00 × JM',beta:1,color:'#9A6700',seed:151,phi:.95,vol:.38,cycle:68,recommended:true}
  ];
  const palette=['#0059EC','#FF8600','#805AD5','#00A3A3','#9A6700','#667085'];
  function addCustomPair(symbolA,symbolB,operator='−'){
    if(symbolA===symbolB)throw new Error('请选择两个不同品种');
    const a=CONTRACTS.find(x=>x.symbol===symbolA)||INSTRUMENTS.find(x=>x.symbol===symbolA),b=CONTRACTS.find(x=>x.symbol===symbolB)||INSTRUMENTS.find(x=>x.symbol===symbolB);if(!a||!b)throw new Error('合约不存在');
    if(operator==='−'){const sameLegs=PAIRS.find(x=>x.symbolA===symbolA&&x.symbolB===symbolB);if(sameLegs)return sameLegs}
    const opKey={'+':'plus','−':'minus','×':'times','÷':'divide'}[operator]||'minus',id=`custom-${symbolA.toLowerCase()}-${opKey}-${symbolB.toLowerCase()}`,existing=PAIRS.find(x=>x.id===id);if(existing)return existing;
    const seed=[...`${symbolA}${operator}${symbolB}`].reduce((n,c)=>n+c.charCodeAt(0),0),p={id,name:`${symbolA}${operator}${symbolB}`,legA:a.name,legB:b.name,symbolA,symbolB,operator,category:'自由组合',note:'客户临时创建的合约表达式',formula:`${symbolA} ${operator} ${symbolB}`,beta:1,color:palette[PAIRS.length%palette.length],seed,phi:.95+(seed%20)/1000,vol:.28+(seed%14)/100,cycle:60+seed%55,recommended:false};PAIRS.push(p);return p;
  }
  function rng(seed){let s=seed>>>0;return()=>((s=(s*1664525+1013904223)>>>0)/4294967296)}
  function dateStr(d){return d.toISOString().slice(0,10)}
  function weekdays(from,to){const out=[],d=new Date(from+'T00:00:00Z'),end=new Date(to+'T00:00:00Z');while(d<=end){const day=d.getUTCDay();if(day!==0&&day!==6)out.push(dateStr(d));d.setUTCDate(d.getUTCDate()+1)}return out}
  function quantile(a,q){if(!a.length)return null;const x=[...a].sort((m,n)=>m-n),p=(x.length-1)*q,l=Math.floor(p),u=Math.ceil(p);return x[l]+(x[u]-x[l])*(p-l)}
  function mean(a){return a.length?a.reduce((s,x)=>s+x,0)/a.length:0}
  function sampleStd(a){if(a.length<2)return 0;const m=mean(a);return Math.sqrt(a.reduce((s,x)=>s+(x-m)**2,0)/(a.length-1))}
  function metricsFromEquity(equity){
    if(equity.length<2)return{totalReturn:0,annualReturn:0,annualVolatility:0,maxDrawdown:0,sharpe:null,calmar:null,closedTradeCount:0};
    const rs=equity.slice(1).map(x=>x.dailyReturn),n=rs.length,total=equity.at(-1).nav/equity[0].nav-1,annual=(1+total)>0?Math.pow(1+total,252/n)-1:-1,vol=sampleStd(rs)*Math.sqrt(252),sharpe=vol?mean(rs)*252/vol:null,maxDD=Math.min(...equity.map(x=>x.drawdown)),calmar=maxDD?annual/Math.abs(maxDD):null;
    return{totalReturn:total,annualReturn:annual,annualVolatility:vol,maxDrawdown:maxDD,sharpe,calmar,closedTradeCount:0};
  }
  function yearlyStats(equity){
    const groups={};equity.forEach(x=>(groups[x.date.slice(0,4)]??=[]).push(x));
    return Object.entries(groups).map(([year,a])=>{const firstBase=a[0].nav/(1+a[0].dailyReturn||1),ret=a.at(-1).nav/firstBase-1,rs=a.map(x=>x.dailyReturn),vol=sampleStd(rs)*Math.sqrt(252),sharpe=vol?mean(rs)*252/vol:null;let peak=firstBase,maxDD=0;a.forEach(x=>{peak=Math.max(peak,x.nav);maxDD=Math.min(maxDD,x.nav/peak-1)});return{year:+year,throughDate:a.at(-1).date,isPartial:!a.at(-1).date.endsWith('12-31')&&a.at(-1).date.slice(5)<'12-28',return:ret,volatility:vol,maxDrawdown:maxDD,sharpe,calmar:maxDD?ret/Math.abs(maxDD):null}})
  }
  function syntheticSeries(pair,endDate){
    const dates=weekdays('2017-01-02',endDate),r=rng(pair.seed);let x=pair.seed%5-2;return dates.map((date,i)=>{const shock=(r()-.5)*2*pair.vol;x=pair.phi*x+shock+Math.sin(i/pair.cycle)*.045;return{date,spread:x}})
  }
  function mockBacktest(params,pairId){
    const pair=PAIRS.find(p=>p.id===pairId);if(!pair)throw new Error('组合不存在');
    const all=syntheticSeries(pair,params.endDate),startIndex=all.findIndex(x=>x.date>=params.startDate),endIndex=all.findLastIndex(x=>x.date<=params.endDate);
    if(startIndex<params.lookbackDays||endIndex-startIndex<20)throw new Error('历史样本不足，无法完成本次回测');
    let nav=1,peak=1,position=0,pending=null,currentTrade=null;const equity=[],trades=[],market=[];
    for(let i=startIndex;i<=endIndex;i++){
      if(pending){position=pending.position;if(position!==0){currentTrade={entryDate:all[i].date,entryNav:nav,direction:position===1?'longSpread':'shortSpread'}}else if(currentTrade){trades.push({...currentTrade,exitDate:all[i].date,return:nav/currentTrade.entryNav-1,holdingDays:Math.max(1,Math.round((new Date(all[i].date)-new Date(currentTrade.entryDate))/86400000))});currentTrade=null}pending=null}
      const move=i>startIndex?all[i].spread-all[i-1].spread:0,dailyReturn=position*move*.0032*(params.positionPct||.5);nav=Math.max(.2,nav*(1+dailyReturn));peak=Math.max(peak,nav);const drawdown=nav/peak-1;equity.push({date:all[i].date,nav,return:nav-1,dailyReturn,drawdown});if(position!==0&&Math.abs(drawdown)>=(params.drawdownLimit||.03))pending={position:0};
      const hist=all.slice(i-params.lookbackDays,i).map(x=>x.spread),qLow=params.entryMode==='custom'?-Math.abs(params.entryCustomValue):quantile(hist,params.entryLower),qHigh=params.entryMode==='custom'?Math.abs(params.entryCustomValue):quantile(hist,params.entryUpper),qMid=params.exitMode==='custom'?params.exitCustomValue:quantile(hist,params.exitQuantile),s=all[i].spread,spreadMean=mean(hist),spreadStd=sampleStd(hist),t=i-startIndex,baseB=8200+(pair.seed%31)*95+t*.7+Math.sin(i/31)*280,spreadValue=s*620,legB=baseB,legA=baseB*pair.beta+spreadValue;
      market.push({date:all[i].date,legA,legB,spread:spreadValue,mean:spreadMean*620,upper:(spreadMean+2*spreadStd)*620,lower:(spreadMean-2*spreadStd)*620});
      if(position===0){if(s>=qHigh)pending={position:-1};else if(s<=qLow)pending={position:1}}
      else if(position===1&&s>=qMid)pending={position:0};else if(position===-1&&s<=qMid)pending={position:0};
    }
    if(currentTrade)trades.push({...currentTrade,exitDate:null,return:nav/currentTrade.entryNav-1,holdingDays:Math.max(1,Math.round((new Date(params.endDate)-new Date(currentTrade.entryDate))/86400000)),open:true});
    const metrics=metricsFromEquity(equity);metrics.closedTradeCount=trades.filter(t=>!t.open).length;
    return{pairId,status:'success',error:null,metrics,equity,market,yearly:yearlyStats(equity),trades};
  }
  window.StatArb={PAIRS,INSTRUMENTS,CONTRACTS,addCustomPair,mockBacktest};
})();
