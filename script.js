/* Navigation and text are centralized so a future Chinese/English switch can reuse this structure. */
const portfolioData={architecture:{index:'03.01',title:'Architecture',label:'建筑课程作品',description:'本科与硕士阶段建筑课程作业，涵盖大一、大二的课程设计练习：从空间启蒙到场地、结构与公共性的综合推演。',images:['大一 · 空间构成','大二 · 居住单元','硕士 · 公共建筑']},art:{index:'03.02',title:'Art',label:'个人绘画作品',description:'非建筑类个人绘画记录。以纸本、色彩和日常观察为线索，保留不受功能限制的直觉表达。',images:['纸本绘画 01','纸本绘画 02','纸本绘画 03']},product:{index:'03.03',title:'Product',label:'产品设计作品',description:'以使用者的身体尺度和环境氛围为出发点，探索产品从概念、模型到呈现的完整设计过程，包含台灯设计案例。',images:['台灯设计','过程模型','使用场景']},handcraft:{index:'03.04',title:'Handcraft',label:'手作与纤维创作',description:'钩针、刺绣等手作作品。缓慢的制作过程让材料、肌理与时间成为另一种可被阅读的空间。',images:['钩针作品','刺绣作品','材料细节']}};
portfolioData.architecture={index:'03.01',title:'Architecture',label:'建筑课程作品',description:'本科与硕士阶段的建筑课程项目。',images:[{key:'relocatable-corridor',title:'Relocatable Corridor',summary:'在田野之中、新旧农村之间，在原有交通道路处，利用长约 95m 的建构长廊，搭建村庄和城市之间的互动可能性。',src:'Images/研二final.png'},{key:'floating-sound-waves',title:'Floating Sound Waves<br>Civic Center',src:'Images/大五.png'},'Tea Culture Resort and Leisure Center','Experimental Rural Primary School','Mountain and Stone Museum','Mountain and Stone Museum']};
const projectDetails={'relocatable-corridor':{title:'Relocatable Corridor',summary:'在田野之中，新旧农村之间，在原有交通道路处，利用长约 95m 的建构长廊，搭建村庄和城市之间的互动可能性。保留行车道路的初始功能，增设系列公共功能：<br><br>1. 艺术展览、舞台演出。<br>让艺术承担振兴乡村的任务，成为连接过去的途径。发展现有建筑语言文脉，使文村成为一座现当代艺术云集地。<br><br>2. 游学联盟。<br>联合高校进行暑期实践，整个村子就是研学活动区域。<br><br>3. 文村村民文化中心。',hero:'Images/研二final.png',images:['Images/研二final2.png','Images/研二site plan.jpg','Images/研二2Falley.png','Images/研二07.png','Images/研二09.png']},'floating-sound-waves':{title:'Floating Sound Waves Civic Center',summary:'',hero:'Images/大五.png',images:['Images/大五总图.png','Images/大五1f.png','Images/大五爆炸图剖面.png','Images/大五剖轴测1.png','Images/大五剖轴测2.png','Images/大五模型照片 (0).jpg','Images/大五模型照片 (1).jpg']}};
const scenes=document.querySelectorAll('.scene'),navItems=document.querySelectorAll('.nav-item');
const CV_VERIFIED_KEY='fei-cv-verified';
const CV_ACTIVE_KEY='fei-cv-active';
let cvVerifiedThisPage=false;
function hasCvAccess(){
  if(cvVerifiedThisPage)return true;
  try{return sessionStorage.getItem(CV_VERIFIED_KEY)==='true';}catch{return false;}
}
function goTo(id){
  if(id==='cv'&&!hasCvAccess())id='cv-verification';
  scenes.forEach(s=>s.classList.remove('scene-active'));
  document.getElementById(id).classList.add('scene-active');
  document.body.classList.toggle('is-home',id==='home');
  document.body.classList.toggle('is-portfolio-detail',id==='portfolio-detail');
  navItems.forEach(n=>n.classList.toggle('active',n.dataset.go===(id==='cv-verification'?'cv':id)));
  try{
    if(id==='cv')sessionStorage.setItem(CV_ACTIVE_KEY,'true');
    else sessionStorage.removeItem(CV_ACTIVE_KEY);
  }catch{}
}
const cvVerificationForm=document.querySelector('.cv-verification-form');
cvVerificationForm.addEventListener('submit',event=>{
  event.preventDefault();
  const input=cvVerificationForm.querySelector('.cv-verification-input');
  const error=cvVerificationForm.querySelector('.cv-verification-error');
  if(input.value.trim()!=='费芳华'){
    error.textContent='答案不正确，请重新输入';
    input.setAttribute('aria-invalid','true');
    return;
  }
  cvVerifiedThisPage=true;
  try{sessionStorage.setItem(CV_VERIFIED_KEY,'true');}catch{}
  error.textContent='';
  input.removeAttribute('aria-invalid');
  input.value='';
  goTo('cv');
  const cv=document.getElementById('cv');
  cv.scrollTo({top:0,left:0,behavior:'instant'});
  requestAnimationFrame(()=>cv.scrollTo({top:0,left:0,behavior:'instant'}));
});
cvVerificationForm.querySelector('.cv-verification-input').addEventListener('input',event=>{
  event.target.removeAttribute('aria-invalid');
  cvVerificationForm.querySelector('.cv-verification-error').textContent='';
});
try{
  if(sessionStorage.getItem(CV_ACTIVE_KEY)==='true'&&hasCvAccess())goTo('cv');
}catch{}
document.querySelectorAll('#contact [data-contact-copy]').forEach(button=>{
  let feedbackTimer;
  button.addEventListener('click',async()=>{
    const status=button.querySelector('.contact-copy-status');
    let copied=false;
    try{
      if(!navigator.clipboard?.writeText)throw new Error('Clipboard API unavailable');
      await navigator.clipboard.writeText(button.dataset.contactCopy);
      copied=true;
    }catch{
      const field=document.createElement('textarea');
      field.value=button.dataset.contactCopy;
      field.style.cssText='position:fixed;left:-9999px;opacity:0';
      document.body.append(field);
      field.select();
      try{copied=document.execCommand('copy');}catch{}
      field.remove();
      button.focus({preventScroll:true});
    }
    clearTimeout(feedbackTimer);
    status.textContent=copied?'已复制':'复制失败';
    status.classList.add('is-visible');
    feedbackTimer=setTimeout(()=>{
      status.classList.remove('is-visible');
      status.textContent='';
    },1300);
  });
});
function renderPrioritizedImages(container,markup,eagerSelector=''){const template=document.createElement('template');template.innerHTML=markup;const eager=eagerSelector?template.content.querySelector(eagerSelector):null;template.content.querySelectorAll('img').forEach(image=>{image.decoding='async';if(image===eager){image.loading='eager';image.fetchPriority='high';}else{image.loading='lazy';image.fetchPriority='auto';}});container.replaceChildren(template.content);}
function resetMobileScroll(container){if(!window.matchMedia('(max-width: 768px)').matches)return;const reset=()=>{if(container){container.scrollTop=0;container.scrollLeft=0;}window.scrollTo({top:0,left:0,behavior:'auto'});document.documentElement.scrollTop=0;document.body.scrollTop=0;};reset();requestAnimationFrame(()=>requestAnimationFrame(reset));}
function showCategory(key){const d=portfolioData[key],gallery=document.getElementById('gallery');document.getElementById('category-index').textContent=`${d.index} / PORTFOLIO`;document.getElementById('category-kicker').textContent=d.label;document.getElementById('category-title').textContent=d.title;document.getElementById('category-description').textContent=d.description;const markup=d.images.map((entry,i)=>{const x=typeof entry==='string'?entry:entry.title,src=typeof entry==='string'?'':entry.src,project=typeof entry==='string'?'':entry.key||'',summary=typeof entry==='string'?'':entry.summary||'';return `<button class="image-placeholder" type="button" data-image="${src}" data-project="${project}" aria-label="查看 ${x} 项目详情">${src?`<img src="${src}" alt="${x}">`:''}<span>PROJECT ${String(i+1).padStart(2,'0')}</span><div class="project-copy"><strong>${x}</strong>${summary?`<p>${summary}</p>`:''}</div><small>${String(i+1).padStart(2,'0')} / ${String(d.images.length).padStart(2,'0')}</small></button>`}).join('');renderPrioritizedImages(gallery,markup,'.image-placeholder:first-child img');document.querySelector('.project-pager')?.remove();gallery.insertAdjacentHTML('afterend','<div class="project-pager"><span>SCROLL TO EXPLORE ↓</span></div>');goTo('portfolio-detail');resetMobileScroll(gallery);}
const showCategoryWithPrompt=showCategory;
showCategory=key=>{showCategoryWithPrompt(key);const prompt=document.querySelector('.project-pager span');if(prompt)prompt.textContent='CLICK TO EXPLORE';};
const imageLightbox=document.createElement('div');
imageLightbox.className='image-lightbox';
imageLightbox.innerHTML='<button class="lightbox-close" type="button" aria-label="关闭预览">×</button><div class="lightbox-card"><small></small></div>';
document.body.append(imageLightbox);
function openImagePreview(card){const preview=imageLightbox.querySelector('.lightbox-card');preview.querySelector('small').textContent=card.querySelector('small').textContent;preview.style.backgroundImage=card.dataset.image?`url("${card.dataset.image}")`:'';imageLightbox.classList.add('is-open');}
portfolioData.architecture.images[1].title='Floating Sound Waves Civic Center';
projectDetails['floating-sound-waves'].summary='方案设计从声音的角度出发对该场地进行设计，以三种声音类型：声音的引入、声音的缓冲、声音的隔离为基础，延伸出另外两种类型：声音的渗透以及声音的消散。每一种声音类型在建筑设计中对应一种腔体符号：覆土夹层空腔，扇贝开合空腔，双层隔离空腔，双层下沉空腔，以及套娃斜切空腔。通过这些声音类型，营造声音场所，在不特别制定功能区的情况下，打造一个功能区适合特定腔体类型使用的地景设计。该建筑设计通过步行游廊与周边建筑相连接，将新的城市节点叠加到现有的城市结构中，给该场地使用人群打造更多可能性。';
projectDetails['floating-sound-waves'].afterword='设计场地位于香港九龙站，该场地与西九龙站、西九龙文化区、柯士甸站共同构成了西九龙地区的城市主体。建筑设计功能定位为一个连接型的城市走廊。<br><br>所选场地面积 14.4 公顷，南北长 400m，东西长 360m。所选场地被高密度建筑围合，中心为九龙地铁站，地铁站及周边物业一体化组成了一个巨型建筑。';
projectDetails['floating-sound-waves'].summary=projectDetails['floating-sound-waves'].afterword;
projectDetails['floating-sound-waves'].afterword='';
document.head.insertAdjacentHTML('beforeend','<style>.project-overlay[data-project="floating-sound-waves"] .project-intro{display:flex!important;min-height:100dvh;padding:12vh 7vw;background:#111;align-items:center;justify-content:center}.project-overlay[data-project="floating-sound-waves"] .project-intro p{max-width:780px;margin:0;color:#fff;font-size:18px;font-weight:400;line-height:1.9;text-align:center}</style>');
projectDetails['floating-sound-waves'].images=['Images/大五11.png','Images/大五12.png','Images/大五13.png','Images/大五14.png','Images/大五15.png'];
projectDetails['relocatable-corridor'].images=['Images/研二15.png','Images/研二07.png','Images/研二09.png','Images/研二08.png','Images/研二10.png'];
portfolioData.architecture.images[0].summary='';
portfolioData.architecture.images[2]={key:'tea-culture-resort',title:'Tea Culture Resort and Leisure Center',src:'Images/大四1.png'};
projectDetails['tea-culture-resort']={title:'Tea Culture Resort and Leisure Center',summary:'',hero:'Images/大四1.png',images:['Images/大四1.png']};
projectDetails['tea-culture-resort'].images=[];
portfolioData.architecture.images[3]={key:'experimental-rural-primary-school',title:'Experimental Rural Primary School',src:'Images/大四上1.jpg'};
projectDetails['experimental-rural-primary-school']={title:'Experimental Rural Primary School',summary:'',hero:'Images/大四上1.jpg',images:['Images/大四上1.jpg']};
portfolioData.architecture.images[4]={key:'mountain-and-stone-museum',title:'Mountain and Stone Museum',src:'Images/大三1.png'};
projectDetails['mountain-and-stone-museum']={title:'Mountain and Stone Museum',summary:'',hero:'Images/大三1.png',images:[]};
projectDetails['mountain-and-stone-museum'].afterword='中国传统山水画中的山石是画家描摹自然的物象符号，自然山石被进行简化概括，笔墨皴法成为了描绘山石最基础的特征符号。<br><br>建筑形式效法中国南派画论中的山石符号，以描绘低矮丘陵的披麻皴为原型。披麻皴线条形状似麻披散的样子，其基本形状是略带弧度的松软线条，是线皴中的一种。我以此为形式来源，利用犀牛软件中的指令生发出建筑形式的可能性，再结合场地地形对产生的单体形式进行组合堆叠，呈现最终的建筑形式。';
projectDetails['mountain-and-stone-museum'].afterImages=['Images/大三28.png','Images/大三29.png'];
document.addEventListener('click',e=>{if(!e.target.closest('.image-placeholder[data-project="mountain-and-stone-museum"]'))return;setTimeout(()=>{const afterword=projectOverlay.querySelector('.project-afterword');const d=projectDetails['mountain-and-stone-museum'];if(!afterword||afterword.nextElementSibling?.classList.contains('project-after-gallery'))return;afterword.insertAdjacentHTML('afterend',`<div class="project-after-gallery" style="background:#111;padding:0 0 20px">${d.afterImages.map((src,i)=>`<img src="${src}" alt="${d.title} 项目图 ${i+2}" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0 auto 20px">`).join('')}</div>`);},0);});
portfolioData.architecture.images[5]='Nurturing Hive';
portfolioData.handcraft.images[0]={title:'Embroidery',src:'Images/embroidery1.png'};
portfolioData.product.images[0]={key:'kasa-lamp',title:'KASA LAMP',src:'Images/lamp1.PNG'};
portfolioData.product.images.length=1;
projectDetails['kasa-lamp']={title:'KASA LAMP',summary:'',hero:'Images/lamp1.PNG',images:['Images/lamp2.png','Images/lamp3.png','Images/lamp4.png','Images/lamp5.png','Images/lamp6.PNG','Images/lamp7.png','Images/lamp8.png','Images/lamp9.png']};
projectDetails['mountain-and-stone-museum'].images=[];
document.addEventListener('click',e=>{const category=e.target.closest('[data-category]');if(!category||category.dataset.category==='art')return;setTimeout(()=>document.getElementById('gallery')?.classList.remove('art-gallery'),0);});
document.addEventListener('click',e=>{const image=e.target.closest('#gallery.art-gallery figure img');if(!image)return;image.closest('figure').classList.toggle('is-expanded');});
document.addEventListener('click',e=>{if(!e.target.closest('[data-category="art"]'))return;setTimeout(()=>{if(document.getElementById('art-view-behavior'))return;document.head.insertAdjacentHTML('beforeend','<style id="art-view-behavior">#portfolio-detail #gallery.art-gallery h1::after{content:"现象素描";display:block;margin-top:.35em;font:400 20px/1.2 "Noto Sans SC",sans-serif;letter-spacing:.12em}#portfolio-detail #gallery.art-gallery figure{min-height:0!important;background:transparent!important;cursor:zoom-in}#portfolio-detail #gallery.art-gallery figure img{width:100%!important;height:auto!important;object-fit:contain!important}#portfolio-detail #gallery.art-gallery figure.is-expanded{position:fixed!important;inset:0!important;z-index:1000!important;display:grid!important;place-items:center!important;margin:0!important;padding:3vh 3vw!important;background:rgba(10,10,10,.97)!important;cursor:zoom-out!important}#portfolio-detail #gallery.art-gallery figure.is-expanded img{width:auto!important;height:auto!important;max-width:94vw!important;max-height:94vh!important;object-fit:contain!important}</style>');},0);});
document.head.insertAdjacentHTML('beforeend','<style>#portfolio-detail #gallery.art-gallery h1::after{content:"现象素描";display:block;margin-top:.35em;font:400 20px/1.2 "Noto Sans SC",sans-serif;letter-spacing:.12em}#portfolio-detail #gallery.art-gallery figure{min-height:0!important;background:transparent!important;cursor:zoom-in}#portfolio-detail #gallery.art-gallery figure img{width:100%!important;height:auto!important;object-fit:contain!important}#portfolio-detail #gallery.art-gallery figure.is-expanded{position:fixed!important;inset:0!important;z-index:1000!important;display:grid!important;place-items:center!important;margin:0!important;padding:3vh 3vw!important;background:rgba(10,10,10,.97)!important;cursor:zoom-out!important}#portfolio-detail #gallery.art-gallery figure.is-expanded img{width:auto!important;height:auto!important;max-width:94vw!important;max-height:94vh!important;object-fit:contain!important}</style>');
portfolioData.architecture.images[5]={key:'nurturing-hive',title:'Nurturing Hive',src:'Images/大二1.png'};
document.addEventListener('click',e=>{if(!e.target.closest('[data-category="art"]'))return;setTimeout(()=>{if(document.getElementById('art-natural-proportions'))return;document.head.insertAdjacentHTML('beforeend','<style id="art-natural-proportions">#portfolio-detail #gallery.art-gallery figure{height:auto!important;min-height:0!important;overflow:visible!important;align-self:start!important}#portfolio-detail #gallery.art-gallery figure img{display:block!important;width:100%!important;height:auto!important;max-width:100%!important;object-fit:contain!important}</style>');},0);});
projectDetails['nurturing-hive']={title:'Nurturing Hive',summary:'',hero:'Images/大二1.png',images:['Images/大二1.png']};
document.addEventListener('click',e=>{if(!e.target.closest('[data-category="art"]'))return;setTimeout(()=>{if(document.getElementById('art-masonry-layout'))return;document.head.insertAdjacentHTML('beforeend','<style id="art-masonry-layout">#portfolio-detail #gallery.art-gallery{display:block!important;height:100%!important;column-count:3;column-gap:24px;overflow-y:auto!important;overflow-x:hidden!important}#portfolio-detail #gallery.art-gallery h1{display:block!important;margin:0 0 36px!important}#portfolio-detail #gallery.art-gallery figure{display:inline-block!important;width:100%!important;height:auto!important;min-height:0!important;margin:0 0 24px!important;overflow:visible!important;break-inside:avoid!important;background:transparent!important}#portfolio-detail #gallery.art-gallery figure img{display:block!important;width:100%!important;height:auto!important;max-width:100%!important;object-fit:contain!important;transform:none!important}@media(max-width:700px){#portfolio-detail #gallery.art-gallery{column-count:1}}</style>');},0);});
projectDetails['nurturing-hive'].images=[];
document.addEventListener('click',e=>{if(!e.target.closest('[data-category="art"]'))return;setTimeout(()=>{const image=document.querySelectorAll('#gallery.art-gallery figure img')[3];if(image)image.src='Images/ph5.jpg?v=20260921';},0);});
document.addEventListener('click',e=>{if(!e.target.closest('[data-category="art"]'))return;setTimeout(()=>{const gallery=document.getElementById('gallery');if(!gallery?.classList.contains('art-gallery'))return;gallery.style.setProperty('display','block','important');gallery.style.setProperty('column-count','1','important');gallery.style.setProperty('overflow-y','auto','important');gallery.querySelectorAll('figure').forEach(figure=>{figure.style.setProperty('display','block','important');figure.style.setProperty('position','relative','important');figure.style.setProperty('width','100%','important');figure.style.setProperty('height','auto','important');figure.style.setProperty('min-height','0','important');figure.style.setProperty('margin','0 0 28px','important');figure.style.setProperty('overflow','visible','important');const image=figure.querySelector('img');image.style.setProperty('position','static','important');image.style.setProperty('display','block','important');image.style.setProperty('width','100%','important');image.style.setProperty('height','auto','important');image.style.setProperty('object-fit','contain','important');});},0);});
projectDetails['nurturing-hive'].afterword='该社区方案以产后妈妈为主体人群，打造一所一流的符合时代共居理念的月子中心。在经过长时间的备孕到最终生产的过程，对妈妈来说是幸福而又辛苦的，而产后六周的恢复期就显得尤为重要。我们所设想的月子社区不只使她们能够受到一对一的精心照料，同时也希望她们能够在月子期间具备主动享受的意识。而这种主动意识体现在该方案中设置的公共空间中：妈妈们互相分享育儿理念；阅读书籍提升自我价值；通过瑜伽运动主动进行生理修复；咨询心理专家获得心理调节。<br><br>这些事件会发生以六边形为原型的单元中，通过体块组合，生成共享空间和育婴室，打造一所以共同居住为理念的服务性空间；以共同享受为出发点的服务性空间；以共同服务为目标的服务性空间。';
projectDetails['nurturing-hive'].afterImages=['Images/大二30.png','Images/大二31.png'];
document.addEventListener('click',e=>{if(!e.target.closest('.image-placeholder[data-project="nurturing-hive"]'))return;setTimeout(()=>{const afterword=projectOverlay.querySelector('.project-afterword');const d=projectDetails['nurturing-hive'];if(!afterword||afterword.nextElementSibling?.classList.contains('project-after-gallery'))return;afterword.insertAdjacentHTML('afterend',`<div class="project-after-gallery" style="background:#111;padding:0 0 20px">${d.afterImages.map((src,i)=>`<img src="${src}" alt="${d.title} 项目图 ${i+2}" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0 auto 20px">`).join('')}</div>`);},0);});
projectDetails['experimental-rural-primary-school'].images=[];
projectDetails['experimental-rural-primary-school'].summary='以周边茶文化为线索，建筑设计构思为一个度假休闲中心。以木质桁架结构作为支撑结构。其功能包含游客服务中心、餐饮区、民宿区、制茶工坊及文创中心。建筑旨在为游客提供一个既可学习茶艺又可放松身心的场所，给游客独一无二的极致体验。';
projectDetails['experimental-rural-primary-school'].afterImages=['Images/大四上21.png','Images/大四上22.png','Images/大四上23.png','Images/大四上24.png','Images/大四上25.png','Images/大四上26.png','Images/大四上27.png'];
document.head.insertAdjacentHTML('beforeend','<style>.project-overlay[data-project="experimental-rural-primary-school"] .project-intro{display:flex!important;min-height:100dvh;padding:12vh 7vw;background:#111;align-items:center;justify-content:center}.project-overlay[data-project="experimental-rural-primary-school"] .project-intro p{max-width:780px;margin:0;color:#fff;font-size:18px;font-weight:400;line-height:1.9;text-align:center}</style>');
document.addEventListener('click',e=>{if(!e.target.closest('.image-placeholder[data-project="experimental-rural-primary-school"]'))return;setTimeout(()=>{const intro=projectOverlay.querySelector('.project-intro');const d=projectDetails['experimental-rural-primary-school'];if(!intro||intro.nextElementSibling?.classList.contains('project-after-gallery'))return;intro.insertAdjacentHTML('afterend',`<div class="project-after-gallery" style="background:#111;padding:0 0 20px">${d.afterImages.map((src,i)=>`<img src="${src}" alt="${d.title} 项目图 ${i+1}" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0 auto 20px">`).join('')}</div>`);},0);});
projectDetails['tea-culture-resort'].afterword='场地选址为浙江省杭州市黄湖镇青山村。由于原住民家庭搬离，从城市来的“新村民”的小孩面临着受教育问题。我们意指利用当地材料：夯土、木材、竹子，以夯土作为承重结构，打造一个乡村实验小学，为当地儿童提供一个在地的、融于自然的受教育可能性。<br><br>项目利用夯土为主要材料，再结合其他的材料形成合成的材料建造系统。利用夯土的特性与清晰的建构逻辑，来赋予建筑设计在功能、结构、造型等方面的语言。';
projectDetails['tea-culture-resort'].afterImages=['Images/大四16.png','Images/大四17.png','Images/大四18.png','Images/大四19.png','Images/大四20.png'];
document.head.insertAdjacentHTML('beforeend','<style>.project-overlay[data-project="relocatable-corridor"] .project-intro{display:flex!important;min-height:100dvh;padding:12vh 7vw;background:#111;align-items:center;justify-content:center}.project-overlay[data-project="relocatable-corridor"] .project-intro p{max-width:780px;margin:0;color:#fff;font-size:18px;font-weight:400;line-height:1.9;text-align:center}</style>');
document.addEventListener('click',e=>{if(!e.target.closest('.image-placeholder[data-project="tea-culture-resort"]'))return;setTimeout(()=>{const afterword=projectOverlay.querySelector('.project-afterword');const d=projectDetails['tea-culture-resort'];if(!afterword||afterword.nextElementSibling?.classList.contains('project-after-gallery'))return;afterword.insertAdjacentHTML('afterend',`<div class="project-after-gallery" style="background:#111;padding:0 0 20px">${d.afterImages.map((src,i)=>`<img src="${src}" alt="${d.title} 项目图 ${i+2}" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;margin:0 auto 20px">`).join('')}</div>`);},0);});
const projectOverlay=document.createElement('div');projectOverlay.className='project-overlay';document.body.append(projectOverlay);projectOverlay.addEventListener('click',()=>projectOverlay.classList.remove('is-open'));document.addEventListener('click',e=>{if(!e.target.closest('[data-category="art"]'))return;setTimeout(()=>{if(document.getElementById('art-image-proportions'))return;document.head.insertAdjacentHTML('beforeend','<style id="art-image-proportions">#portfolio-detail #gallery.art-gallery figure{min-height:0!important;background:transparent!important}#portfolio-detail #gallery.art-gallery figure img{height:auto!important;object-fit:contain!important}</style>');},0);});
function openProjectDetail(key){const d=projectDetails[key];if(!d)return;projectOverlay.innerHTML=`<button class="project-close" type="button" aria-label="关闭项目详情">×</button><section class="project-detail-hero" style="background-image:url('${d.hero}')"><div><h1>${d.title}</h1></div><span class="project-scroll">PLEASE SCROLL ↓</span></section><section class="project-intro"><p>${d.summary}</p></section><div class="project-detail-gallery">${d.images.map((src,i)=>`<img src="${src}" alt="${d.title} 项目图 ${i+1}">`).join('')}</div>`;projectOverlay.classList.add('is-open');}
function openProjectDetail(key){const d=projectDetails[key];if(!d)return;const columns=[d.images.filter((_,i)=>i%2===0),d.images.filter((_,i)=>i%2===1)];projectOverlay.innerHTML=`<button class="project-close" type="button" aria-label="关闭项目详情">×</button><section class="project-detail-hero" style="background-image:url('${d.hero}')"><div><h1>${d.title}</h1></div><span class="project-scroll">PLEASE SCROLL ↓</span></section><section class="project-intro"><p>${d.summary}</p></section><div class="project-detail-gallery">${columns.map(column=>`<div class="project-gallery-column">${column.map((src,i)=>`<img src="${src}" alt="${d.title} 项目图 ${i+1}">`).join('')}</div>`).join('')}</div>`;projectOverlay.classList.add('is-open');}
document.addEventListener('click',e=>{const n=e.target.closest('[data-go]');if(n)goTo(n.dataset.go);const c=e.target.closest('[data-category]');if(c)showCategory(c.dataset.category);const image=e.target.closest('.image-placeholder');if(image){if(image.dataset.project)openProjectDetail(image.dataset.project);else openImagePreview(image);}const step=e.target.closest('[data-project-step]');if(step)document.getElementById('gallery').scrollBy({left:step.dataset.projectStep*document.getElementById('gallery').clientWidth,behavior:'smooth'});if(e.target===imageLightbox||e.target.closest('.lightbox-close'))imageLightbox.classList.remove('is-open');if(e.target.closest('.project-close'))projectOverlay.classList.remove('is-open');});

/* About: horizontal image drift follows the pointer; photos can be replaced in index.html later. */
const aboutGallery=document.querySelector('.about-gallery');
if(aboutGallery){aboutGallery.addEventListener('mousemove',event=>{const range=aboutGallery.scrollWidth-aboutGallery.clientWidth;const ratio=event.clientX/window.innerWidth;aboutGallery.scrollTo({left:range*ratio,behavior:'smooth'});});}

/* Fine-grained CV timeline grouping. */
const timelineEntries=document.querySelectorAll('.timeline-list article');
document.querySelector('.timeline-title>span')?.remove();
const portfolioIntro=document.querySelector('#portfolio .portfolio-overview>div>p');
if(portfolioIntro) portfolioIntro.textContent='Inspiration';
if(timelineEntries[0]) timelineEntries[0].querySelector('time').textContent='2017';
if(timelineEntries[2]) timelineEntries[2].querySelector('time').textContent='2019';
if(timelineEntries[3]) timelineEntries[3].querySelector('time').textContent='2020';
if(timelineEntries.length>=8){
  timelineEntries[4].querySelector('span:last-child')?.remove();
  const scholarship2022=[...timelineEntries[5].querySelectorAll('span')].find(item=>item.textContent==='中国美术学院学业奖学金');
  if(scholarship2022) timelineEntries[5].querySelector('p').prepend(scholarship2022);
  const asianGames=[...timelineEntries[5].querySelectorAll('span')].find(item=>item.textContent==='入选杭州亚运会志愿者');
  if(asianGames) asianGames.textContent='入选杭州亚运会志愿者｜礼宾接待领域队长';
  timelineEntries[6].outerHTML='<article><time>2023</time><p><span>中国美术学院学业奖学金</span><span>亚运会优秀志愿者</span><span>优秀学生干部</span></p></article><article><time>2024</time><p><span>中国美术学院学业奖学金</span></p></article><article><time>2025</time><p><span>中国美术学院毕业创作暨林风眠创作奖银奖</span></p></article>';
  const competition=document.querySelector('.timeline-list article:last-child p');
  const performance=[...(competition?.querySelectorAll('span')||[])].find(item=>item.textContent==='第三届 SYDF 海峡两岸青年发展论坛嘉年华表演活动');
  if(performance) timelineEntries[4].querySelector('p').append(performance);
  competition?.insertAdjacentHTML('afterbegin','<span>“创青春”第四届全国大学生乡村振兴大赛金奖</span>');
}

openProjectDetail=key=>{const d=projectDetails[key];if(!d)return;projectOverlay.dataset.project=key;const afterword=d.afterword?`<section class="project-afterword" style="max-width:780px;margin:0 auto;padding:12vh 7vw;background:#111;color:#fff"><p style="margin:0;font-size:18px;font-weight:400;line-height:1.9;text-align:center">${d.afterword}</p></section>`:'';const markup=`<button class="project-close" type="button" aria-label="关闭项目详情">×</button><section class="project-detail-hero" style="background-image:url('${d.hero}')"><div><h1>${d.title}</h1></div><span class="project-scroll">PLEASE SCROLL ↓</span></section><section class="project-intro"><p>${d.summary}</p></section><div class="project-detail-gallery">${d.images.map((src,i)=>`<img src="${src}" alt="${d.title} 项目图 ${i+1}">`).join('')}</div>${afterword}`;renderPrioritizedImages(projectOverlay,markup);projectOverlay.classList.add('is-open');resetMobileScroll(projectOverlay);};
document.head.insertAdjacentHTML('beforeend','<style>.project-overlay[data-project="relocatable-corridor"] .project-detail-gallery img{width:90%;height:auto;min-height:0!important;margin:0 auto 20px;object-fit:contain}.project-overlay[data-project="floating-sound-waves"] .project-detail-gallery img{width:90%;height:auto;min-height:0!important;margin:0 auto 20px;object-fit:contain}</style>');
portfolioData.art.images=['Sketches of Phenomena'];
/* ==================================================
   ART / SKETCHES OF PHENOMENA
   单一渲染逻辑，避免页面进入时重复刷新/跳闪
   ================================================== */

{
    const originalShowCategory = showCategory;

    showCategory = key => {

        /* 其他 Portfolio 分类继续使用原来的逻辑 */
        if (key !== 'art') {
            originalShowCategory(key);
            return;
        }

        const d = portfolioData.art;
        const gallery = document.getElementById('gallery');

        /* 页面标题信息 */
        document.getElementById('category-index').textContent =
            `${d.index} / PORTFOLIO`;

        document.getElementById('category-kicker').textContent =
            d.label;

        document.getElementById('category-title').textContent =
            d.title;

        document.getElementById('category-description').textContent =
            d.description;

        /* Art Gallery */
        gallery.className = 'art-gallery';

        const markup = `
            <h1>Sketches of Phenomena</h1>

            ${Array.from({ length: 8 }, (_, i) => `
                <figure>
                    <img
                        src="Images/ph${i + 1}.jpg"
                        alt="Sketches of Phenomena ${i + 1}"
                    >
                </figure>
            `).join('')}
        `;
        renderPrioritizedImages(gallery, markup, 'figure:first-of-type img');

        /* 删除项目翻页 */
        document.querySelector('.project-pager')?.remove();

        /* 进入 Portfolio Detail */
        goTo('portfolio-detail');
        resetMobileScroll(gallery);
    };
}
document.head.insertAdjacentHTML('beforeend', `
<style id="art-final-layout">

#portfolio-detail #gallery.art-gallery {
    display: block !important;
    width: 100% !important;
    height: 100% !important;

    padding: 15vh 7vw 8vh !important;

    overflow-y: auto !important;
    overflow-x: hidden !important;

    background: #111 !important;
    box-sizing: border-box !important;
}


/* 标题 */

#portfolio-detail #gallery.art-gallery h1 {
    display: block;
    margin: 0 0 36px;

    color: #fff;

    font-family: Georgia, serif;
    font-size: 53px;
    font-weight: 400;
    line-height: 1.05;
}


/* 每张图片 */

#portfolio-detail #gallery.art-gallery figure {
    display: block !important;
    position: relative !important;

    width: 100% !important;
    max-width: 100% !important;

    height: auto !important;
    min-height: 0 !important;

    margin: 0 0 32px !important;

    overflow: visible !important;
    background: transparent !important;
}


/* 图片本身 */

#portfolio-detail #gallery.art-gallery figure img {
    position: static !important;
    display: block !important;

    width: 100% !important;
    max-width: 100% !important;

    height: auto !important;

    object-fit: contain !important;
}

</style>
`);
