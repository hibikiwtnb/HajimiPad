// 定義分組與檔名
const PAD_GROUPS = [
  {
    title: '哈基米原聲大碟',
    files: [
      '私人笑声1.m4a','私人笑声2.m4a','私人笑声3.m4a','哈基米1.m4a','哈基米2.m4a','南北绿豆.m4a','曼波.m4a','wow.m4a','欧耶.m4a'
    ]
  },
  {
    title: '哈基米私人音效',
    files: [
      '哎哟我的妈.m4a','你哈牛魔啊.m4a','你们是小丑吗.m4a','阿米诺斯.m4a','干嘛.m4a'
    ]
  },
  {
    title: '网络流行私人音效',
    files: [
      '私人音效原版.m4a','哎哟我的妈原版.m4a','土拨鼠尖叫.m4a','哈？.m4a','打呼声.m4a','不好1.m4a','不好2.m4a','哇哦哦哦.m4a','你干嘛.m4a','钢管.m4a',
      '冰冰冰.m4a','what！.m4a','哇——哦！.m4a','哈啊？.m4a','哦依！.m4a','乌鸦叫声.m4a','众人笑声.m4a','你别笑.m4a','啊哦.m4a'
    ]
  }
];

function makePadLabel(filename){
  return filename.replace(/\.[^/.]+$/, '');
}

function audioPath(filename){
  // 使用 encodeURIComponent 避免特殊字元問題
  return 'audio/' + encodeURIComponent(filename);
}

function createPad(file){
  const btn = document.createElement('button');
  btn.className = 'pad-button';
  const label = document.createElement('div');
  label.className = 'pad-button-label';
  label.textContent = makePadLabel(file);
  btn.appendChild(label);

  btn.addEventListener('click', (e) => {
    const src = audioPath(file);
    const a = new Audio(src);
    a.play().catch((err)=>{console.warn('播放失敗', err)});
  });

  return btn;
}

function renderPads(root){
  PAD_GROUPS.forEach(group=>{
    const section = document.createElement('section');
    section.className = 'pad-group';
    const title = document.createElement('h3');
    title.textContent = group.title;
    section.appendChild(title);
    const grid = document.createElement('div');
    grid.className = 'pad-grid';

    group.files.forEach(f=>{
      const pad = createPad(f);
      grid.appendChild(pad);
    });

    section.appendChild(grid);
    root.appendChild(section);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  const root = document.querySelector('.pads-root');
  renderPads(root);
});

function adjustPadSize(){
  const rows = 3;
  const gap = 10; // must match CSS gap
  const header = document.querySelector('.navbar');
  const footer = document.querySelector('.site-footer');
  const pageHeader = document.querySelector('.page-header');
  const padsRoot = document.querySelector('.pads-root');
  const container = padsRoot ? padsRoot.parentElement : document.querySelector('.container');

  const vh = window.innerHeight;
  const vw = window.innerWidth;
  const headerH = header ? header.offsetHeight : 0;
  const footerH = footer ? footer.offsetHeight : 0;
  const pageHeaderH = pageHeader ? pageHeader.offsetHeight : 0;
  const extra = 48; // paddings / margins buffer

  // 寬螢幕(900px以上)5列，否則3列
  let cols = window.innerWidth >= 900 ? 5 : 3;

  const availableHeight = Math.max(120, vh - headerH - footerH - pageHeaderH - extra);
  const sizeByHeight = Math.floor((availableHeight - gap * (rows - 1)) / rows);

  const containerWidth = container ? container.clientWidth : Math.floor(window.innerWidth - 40);
  const maxWidth = Math.floor((containerWidth - gap * (cols - 1)) / cols);

  let size = Math.min(sizeByHeight, maxWidth);
  if(size < 48) size = 48; // 更小的最小值以適應手機

  document.documentElement.style.setProperty('--pad-size', size + 'px');
}


// 只在載入與螢幕方向改變時調整 pad 大小，避免 iOS Safari 滾動時頻繁 resize
document.addEventListener('DOMContentLoaded', () => {
  adjustPadSize();
});
window.addEventListener('orientationchange', () => {
  setTimeout(adjustPadSize, 300); // 延遲以等待旋轉動畫結束
});
