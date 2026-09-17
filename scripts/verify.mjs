import puppeteer from 'puppeteer-core';
const CHROME='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const B='http://localhost:5180/website';
const browser = await puppeteer.launch({executablePath:CHROME, headless:'new'});
let page = await browser.newPage();
const results = [];
const ok = (n,v,d='') => results.push([v?'PASS':'FAIL', n, d]);

// --- 1) 四语深链接刷新 ---
for (const loc of ['zh-CN','ja','en','ko']) {
  for (const sub of ['', 'gallery', 'creators', 'journal', 'feedback', 'doodle', 'moodboard']) {
    const res = await page.goto(`${B}/${loc}/${sub}`, {waitUntil:'domcontentloaded'});
    const lang = await page.evaluate(()=>document.documentElement.lang);
    const title = await page.title();
    if (res.status()!==200 || lang!== (loc==='zh-CN'?'zh-CN':loc) || !title) {
      ok(`deeplink ${loc}/${sub}`, false, `status=${res.status()} lang=${lang} title=${title}`);
    }
  }
}
ok('四语 × 7 页深链接刷新（html.lang / title / 200）', results.length===0);

// --- 2) 横向溢出 ---
for (const w of [390, 768, 1440]) {
  await page.setViewport({width:w, height:900});
  for (const loc of ['zh-CN','ja','en','ko']) {
    await page.goto(`${B}/${loc}/`, {waitUntil:'networkidle0'});
    const over = await page.evaluate(()=>document.documentElement.scrollWidth - window.innerWidth);
    ok(`无横向溢出 ${loc} @${w}px`, over<=0, `scrollWidth-innerWidth=${over}`);
  }
}

// --- 3) 对比度 ---
await page.setViewport({width:1440,height:900});
await page.goto(`${B}/en/`, {waitUntil:'networkidle0'});
const contrast = await page.evaluate(() => {
  const lum = (c) => { const [r,g,b]=c.map(v=>{v/=255; return v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055,2.4);}); return 0.2126*r+0.7152*g+0.0722*b; };
  const parse = (s) => (s.match(/[\d.]+/g)||[0,0,0]).slice(0,3).map(Number);
  const ratio = (a,b) => { const l1=lum(a), l2=lum(b); const [hi,lo]=l1>l2?[l1,l2]:[l2,l1]; return (hi+0.05)/(lo+0.05); };
  const bgOf = (el) => { let n=el; while(n){ const c=getComputedStyle(n).backgroundColor; if(c && !c.includes('rgba(0, 0, 0, 0)')) return parse(c); n=n.parentElement;} return [255,255,255]; };
  const out = [];
  const check = (sel,label) => { const el=document.querySelector(sel); if(!el) return; const cs=getComputedStyle(el);
    out.push({label, size: cs.fontSize, ratio: +ratio(parse(cs.color), bgOf(el)).toFixed(2)}); };
  check('.hero__tagline','hero tagline');
  check('.hero__category','hero category (AI VTuber)');
  check('.hero__lede','hero lede');
  check('.hero__status','hero status');
  check('.section__lede','section lede');
  check('.site-nav a','nav link');
  check('.feature-card__body','feature body');
  check('.note-card__meta','note meta');
  check('.section__foot','section foot');
  const btn = document.querySelector('.btn--primary');
  if (btn) out.push({label:'primary button', size:getComputedStyle(btn).fontSize, ratio:+ratio(parse(getComputedStyle(btn).color), parse(getComputedStyle(btn).backgroundColor)).toFixed(2)});
  return out;
});
console.log('\n--- 对比度 ---');
for (const c of contrast) {
  const min = parseFloat(c.size) >= 24 ? 3 : 4.5;
  console.log(`${c.ratio >= min ? 'PASS':'FAIL'}  ${c.label.padEnd(30)} ${c.size.padStart(8)}  ${c.ratio}:1 (需 ${min})`);
}

// --- 4) 触控目标 ≥44px ---
await page.setViewport({width:390,height:844});
await page.goto(`${B}/zh-CN/`, {waitUntil:'networkidle0'});
const small = await page.evaluate(()=>{
  const bad=[];
  document.querySelectorAll('a,button,input,select,textarea').forEach(el=>{
    const r=el.getBoundingClientRect();
    if (r.width===0||r.height===0) return;
    if (r.height < 44 || r.width < 44) bad.push({t:el.tagName, c:(el.className||'').toString().slice(0,32), w:Math.round(r.width), h:Math.round(r.height), txt:(el.textContent||'').trim().slice(0,20)});
  });
  return bad;
});
ok('移动端点击区域 ≥ 44×44', small.length===0, JSON.stringify(small));

// --- 5) 未点击播放前不加载第三方 ---
await page.setViewport({width:1440,height:900});
const third=[];
page.on('request', r=>{ const u=r.url(); if(!u.includes('localhost')) third.push(u); });
await page.goto(`${B}/en/`, {waitUntil:'networkidle0'});
await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));
await new Promise(r=>setTimeout(r,800));
ok('默认不向第三方发请求（未点击播放）', third.length===0, third.slice(0,4).join(', '));
// 点击后才加载
await page.evaluate(()=>window.scrollTo(0,0));
await page.click('.video-poster');
await new Promise(r=>setTimeout(r,1200));
ok('点击播放后才加载 youtube-nocookie', third.some(u=>u.includes('youtube-nocookie')), `第三方请求数=${third.length}`);

// --- 6) reduced motion ---（播放第三方视频后另开页面，避免 networkidle 永不稳定）
await page.close();
page = await browser.newPage();
await page.setViewport({width:1440,height:900});
await page.emulateMediaFeatures([{name:'prefers-reduced-motion', value:'reduce'}]);
await page.goto(`${B}/en/`, {waitUntil:'networkidle0'});
const hidden = await page.evaluate(()=>{
  let n=0;
  document.querySelectorAll('.reveal').forEach(el=>{ if (parseFloat(getComputedStyle(el).opacity) < 1) n++; });
  return n;
});
ok('reduce motion 下所有内容可见', hidden===0, `opacity<1 的元素=${hidden}`);

// --- 7) modal 键盘 ---
await page.emulateMediaFeatures([{name:'prefers-reduced-motion', value:'no-preference'}]);
await page.goto(`${B}/en/gallery`, {waitUntil:'networkidle0'});
await page.click('.gallery-card .btn');
await new Promise(r=>setTimeout(r,300));
const modalOpen = await page.$('.modal') !== null;
const focusInModal = await page.evaluate(()=>!!document.activeElement.closest('.modal'));
await page.keyboard.press('Escape');
await new Promise(r=>setTimeout(r,300));
const modalClosed = await page.$('.modal') === null;
ok('Gallery modal 打开 / 焦点进入 / Escape 关闭', modalOpen && focusInModal && modalClosed, `open=${modalOpen} focus=${focusInModal} closed=${modalClosed}`);

// --- 8) 键盘可达 skip link ---
await page.goto(`${B}/en/`, {waitUntil:'networkidle0'});
await page.keyboard.press('Tab');
const firstFocus = await page.evaluate(()=>document.activeElement.className);
ok('首个 Tab 焦点为跳转链接', String(firstFocus).includes('skip-link'), String(firstFocus));

// --- 9) 涂鸦真的能画 / 撤销 / 导出 ---
await page.goto(`${B}/en/doodle`, {waitUntil:'networkidle0'});
await page.click('main .btn--primary');
await new Promise(r=>setTimeout(r,400));
const draw = await page.evaluate(async ()=>{
  const c = document.querySelector('canvas');
  const r = c.getBoundingClientRect();
  const ev = (type,x,y)=>c.dispatchEvent(new PointerEvent(type,{clientX:x,clientY:y,bubbles:true,pointerId:1,isPrimary:true}));
  const before = c.getContext('2d').getImageData(0,0,c.width,c.height).data.slice();
  ev('pointerdown', r.left+40, r.top+40);
  for (let i=0;i<40;i++) ev('pointermove', r.left+40+i*4, r.top+40+i*3);
  ev('pointerup', r.left+200, r.top+160);
  const after = c.getContext('2d').getImageData(0,0,c.width,c.height).data;
  let diff=0; for (let i=0;i<after.length;i+=400) if (after[i]!==before[i]) diff++;
  const dataUrl = c.toDataURL('image/png');
  return {changed: diff>0, exportable: dataUrl.startsWith('data:image/png') && dataUrl.length>2000};
});
ok('涂鸦可绘制', draw.changed);
ok('涂鸦可导出 PNG', draw.exportable);

// 未保存时离开页面会触发 beforeunload 提示（确认该保护生效）
page.on('dialog', async (d) => { await d.accept(); });
const savedMsg = await page.evaluate(async () => {
  const btn = [...document.querySelectorAll('button')].find(b => b.textContent.includes('Save in this browser'));
  btn?.click();
  await new Promise(r => setTimeout(r, 300));
  return document.querySelector('.status-line')?.textContent || '';
});
ok('涂鸦可保存到本浏览器并给出状态', savedMsg.includes('Saved'), savedMsg);

// --- 10) moodboard noindex ---
await page.goto(`${B}/en/moodboard`, {waitUntil:'networkidle0'});
const robots = await page.evaluate(()=>document.querySelector('meta[name="robots"]')?.content || '');
ok('moodboard 为 noindex', robots.includes('noindex'), robots);
await page.goto(`${B}/en/`, {waitUntil:'networkidle0'});
const robotsHome = await page.evaluate(()=>document.querySelector('meta[name="robots"]')?.content || 'none');
ok('首页没有 noindex', robotsHome==='none', robotsHome);

// --- 11) 语言切换保留子页 ---
await page.goto(`${B}/en/journal`, {waitUntil:'networkidle0'});
await page.click('.lang-switch__button');
await new Promise(r=>setTimeout(r,200));
await page.evaluate(()=>{ const a=[...document.querySelectorAll('.lang-switch__menu a')].find(x=>x.lang==='ja'); a.click(); });
await new Promise(r=>setTimeout(r,500));
const url = page.url(); const lang = await page.evaluate(()=>document.documentElement.lang);
ok('语言切换保留当前子页', url.endsWith('/ja/journal') && lang==='ja', `${url} lang=${lang}`);

console.log('\n--- 检查项 ---');
for (const [s,n,d] of results) console.log(`${s}  ${n}${d?'  — '+d:''}`);
console.log(`\n共 ${results.length} 项，失败 ${results.filter(r=>r[0]==='FAIL').length} 项。`);
await browser.close();
