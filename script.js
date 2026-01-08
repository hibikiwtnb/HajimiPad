// 定義分組與檔名（以 readme 為準）
const PAD_GROUPS = [
  {
    title: '哈基米原聲大碟',
    files: [
      '私人笑声1.wav','私人笑声2.wav','私人笑声3.wav','哈基米1.wav','哈基米2.wav','南北绿豆.wav','曼波.wav','wow.wav','欧耶.wav'
    ]
  },
  {
    title: '哈基米私人音效',
    files: [
      '哎哟我的妈.wav','阿米诺斯.wav','你哈牛魔啊.wav','你们是小丑吗.wav','干嘛.wav'
    ]
  },
  {
    title: '网络流行私人音效',
    files: [
      '私人音效原版.wav','土拨鼠尖叫.wav','哈？.wav','打呼声.wav','不好1.wav','不好2.wav','哇哦哦哦.wav','你干嘛.wav','钢管.wav'
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
  const headerH = header ? header.offsetHeight : 0;
  const footerH = footer ? footer.offsetHeight : 0;
  const pageHeaderH = pageHeader ? pageHeader.offsetHeight : 0;
  const extra = 48; // paddings / margins buffer

  const availableHeight = Math.max(120, vh - headerH - footerH - pageHeaderH - extra);

  const sizeByHeight = Math.floor((availableHeight - gap * (rows - 1)) / rows);

  const containerWidth = container ? container.clientWidth : Math.floor(window.innerWidth - 40);
  const maxWidth = Math.floor((containerWidth - gap * 2) / 3);

  let size = Math.min(sizeByHeight, maxWidth);
  if(size < 60) size = 60; // reasonable minimum

  document.documentElement.style.setProperty('--pad-size', size + 'px');
}

window.addEventListener('resize', () => {
  adjustPadSize();
});

document.addEventListener('DOMContentLoaded', () => {
  adjustPadSize();
});
