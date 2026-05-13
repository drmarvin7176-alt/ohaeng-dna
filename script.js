// ══════════════════════════════════════════════════════════
//  오행 DNA — 사주팔자 기반 본질 코드 분석
// ══════════════════════════════════════════════════════════

// ── 간지 데이터 ───────────────────────────────────────────
const GAN = {
  '甲':{ ko:'갑', idx:0, oh:'목' }, '乙':{ ko:'을', idx:1, oh:'목' },
  '丙':{ ko:'병', idx:2, oh:'화' }, '丁':{ ko:'정', idx:3, oh:'화' },
  '戊':{ ko:'무', idx:4, oh:'토' }, '己':{ ko:'기', idx:5, oh:'토' },
  '庚':{ ko:'경', idx:6, oh:'금' }, '辛':{ ko:'신', idx:7, oh:'금' },
  '壬':{ ko:'임', idx:8, oh:'수' }, '癸':{ ko:'계', idx:9, oh:'수' },
};
const ZHI = {
  '子':{ ko:'자', idx:0,  oh:'수' }, '丑':{ ko:'축', idx:1,  oh:'토' },
  '寅':{ ko:'인', idx:2,  oh:'목' }, '卯':{ ko:'묘', idx:3,  oh:'목' },
  '辰':{ ko:'진', idx:4,  oh:'토' }, '巳':{ ko:'사', idx:5,  oh:'화' },
  '午':{ ko:'오', idx:6,  oh:'화' }, '未':{ ko:'미', idx:7,  oh:'토' },
  '申':{ ko:'신', idx:8,  oh:'금' }, '酉':{ ko:'유', idx:9,  oh:'금' },
  '戌':{ ko:'술', idx:10, oh:'토' }, '亥':{ ko:'해', idx:11, oh:'수' },
};
const GAN_ORDER = ['甲','乙','丙','丁','戊','己','庚','辛','壬','癸'];
const ZHI_ORDER = ['子','丑','寅','卯','辰','巳','午','未','申','酉','戌','亥'];

// ── 오행 색상 ─────────────────────────────────────────────
const OH_COLOR = {
  목:'#5aad5a', 화:'#e06060', 토:'#c09a30', 금:'#9ab0d0', 수:'#5090d0',
};
const OH_SYM = { 목:'木', 화:'火', 토:'土', 금:'金', 수:'水' };
const OH_NAME = { 목:'목(木)', 화:'화(火)', 토:'토(土)', 금:'금(金)', 수:'수(水)' };

// ══════════════════════════════════════════════════════════
//  아키타입 데이터베이스
//  primary × secondary 조합 → 이름 + 수식 문장
// ══════════════════════════════════════════════════════════
const ARCHETYPES = {
  목: {
    base: {
      name: '뻗어나가는 자',
      en: 'THE PIONEER',
      keywords: ['성장', '창조', '선도', '직관', '도전'],
      shadow: ['마무리 부족', '고집'],
      tagline: '당신은 멈추지 않는 성장 그 자체입니다.',
      essence: `목(木)의 기운을 주축으로 타고난 당신은, 본능적으로 앞을 향합니다. 씨앗이 단단한 땅을 뚫고 나오듯, 당신의 에너지는 기존의 경계를 밀어내며 새로운 것을 만들어냅니다. 당신이 서 있는 자리에는 언제나 무언가 자라납니다.

당신의 가장 큰 힘은 '시작'입니다. 남들이 망설이는 곳에서 당신은 첫 발을 내딛고, 아무것도 없는 곳에서 가능성을 봅니다. 이 개척의 본능이 당신을 어디서든 선구자로 만들어왔을 것입니다.

다만 나무가 너무 빠르게 자라면 뿌리가 얕아집니다. 시작을 완성으로 이끄는 힘, 그리고 옆에 선 사람의 속도를 기다리는 여유 — 그것이 당신이 가장 깊이 키워야 할 그늘입니다.`,
    },
    with: {
      화: { name: '타오르는 개척자',      en: 'THE BURNING PIONEER',  mod: '목의 성장 본능에 화의 열정이 더해져, 당신은 행동하는 비전가입니다. 아이디어를 행동으로, 계획을 현실로 전환하는 속도가 탁월합니다. 에너지가 넘칠수록 방향이 중요해집니다.' },
      토: { name: '뿌리 깊은 선구자',     en: 'THE GROUNDED PIONEER', mod: '목의 개척력에 토의 안정감이 더해져, 당신은 무모하지 않은 혁신가입니다. 기반을 단단히 하면서 앞으로 나아가는 균형 — 당신의 성장에는 뿌리가 있습니다.' },
      금: { name: '단련된 개척자',        en: 'THE SHARP PIONEER',    mod: '목의 성장 본능에 금의 결단력이 더해져, 당신은 목표가 명확한 행동가입니다. 가지치기를 두려워하지 않고 본질에 집중할 줄 압니다.' },
      수: { name: '흐름을 읽는 선구자',   en: 'THE SILENT PIONEER',   mod: '목의 성장 본능에 수의 통찰이 더해져, 당신은 섣불리 움직이지 않지만 때가 왔을 때 누구보다 빠르게 전진합니다. 고요 속에 방향이 있습니다.' },
    },
  },
  화: {
    base: {
      name: '타오르는 자',
      en: 'THE IGNITER',
      keywords: ['열정', '표현', '공명', '영감', '직관'],
      shadow: ['충동', '감정 기복'],
      tagline: '당신은 주변에 불을 붙이는 사람입니다.',
      essence: `화(火)의 기운을 주축으로 타고난 당신은, 세상에 빛과 열을 더하는 존재입니다. 불꽃이 주변을 밝히듯, 당신은 사람들에게 에너지와 영감을 전합니다. 당신이 있는 곳에는 온도가 올라갑니다.

당신의 가장 큰 힘은 '공명'입니다. 감정을 표현하고 타인의 마음에 닿는 능력, 분위기를 순식간에 바꾸는 존재감이 당신의 핵심 자산입니다. 사람들은 당신 곁에서 따뜻해집니다.

다만 불은 스스로를 태울 수 있습니다. 감정의 불꽃이 때로는 판단력을 흐리거나, 격렬하게 타올랐다가 순식간에 꺼지는 패턴이 될 수 있습니다. 꾸준히 유지되는 불씨 — 그것이 당신의 과제입니다.`,
    },
    with: {
      목: { name: '불꽃을 키우는 자',     en: 'THE EXPANDING FLAME',  mod: '화의 열정에 목의 성장력이 더해져, 당신은 끊임없이 확장하는 에너지를 가집니다. 영감을 받는 즉시 행동으로 옮기는 속도가 있습니다.' },
      토: { name: '따뜻한 기반자',        en: 'THE WARM ANCHOR',      mod: '화의 열정에 토의 포용력이 더해져, 당신은 사람들을 품는 에너지를 가집니다. 뜨겁지만 흔들리지 않는 중심이 있습니다.' },
      금: { name: '불 속의 날',           en: 'THE BURNING BLADE',    mod: '화의 열정에 금의 결단력이 더해져, 당신은 정확하게 타격하는 에너지를 가집니다. 직관과 원칙이 함께 작동합니다.' },
      수: { name: '불꽃을 품은 현자',     en: 'THE PARADOX',          mod: '화의 열정에 수의 깊이가 더해져, 당신은 뜨겁게 느끼고 차갑게 생각하는 복잡한 본질을 가집니다. 이 긴장이 당신만의 창의적 에너지원입니다.' },
    },
  },
  토: {
    base: {
      name: '버티는 자',
      en: 'THE ANCHOR',
      keywords: ['신뢰', '포용', '중심', '지속', '안정'],
      shadow: ['변화 저항', '과도한 신중함'],
      tagline: '당신은 모든 것의 중심이 되는 땅입니다.',
      essence: `토(土)의 기운을 주축으로 타고난 당신은, 어디서든 중심을 잡는 존재입니다. 대지가 모든 생명을 품듯, 당신은 사람들에게 안정감과 신뢰를 줍니다. 당신 곁에 있으면 사람들은 땅을 밟은 것처럼 든든해집니다.

당신의 가장 큰 힘은 '지속성'입니다. 흔들림 없이 자리를 지키며, 주변 사람들이 당신을 기둥 삼아 기댑니다. 신뢰는 당신이 가진 가장 강력한 자산이며, 그것은 하루아침에 쌓인 것이 아닙니다.

다만 땅이 너무 굳으면 씨앗이 뚫고 나오지 못합니다. 변화를 받아들이는 유연함, 새로운 흐름에 열리는 용기 — 그것이 당신의 성장 열쇠입니다.`,
    },
    with: {
      목: { name: '자라는 대지',          en: 'THE GROWING EARTH',    mod: '토의 안정에 목의 성장력이 더해져, 당신은 기반 위에서 끊임없이 확장합니다. 뿌리는 깊고 가지는 넓게 뻗어나갑니다.' },
      화: { name: '따뜻한 대지',          en: 'THE WARM EARTH',       mod: '토의 포용에 화의 열정이 더해져, 당신은 사람들을 끌어안는 따뜻한 에너지를 가집니다. 안정적이면서도 생기가 넘칩니다.' },
      금: { name: '단단한 기반자',        en: 'THE SOLID FOUNDATION', mod: '토의 안정에 금의 결단력이 더해져, 당신은 원칙 있는 수호자입니다. 흔들림 없는 기준으로 주변을 이끕니다.' },
      수: { name: '고요한 대지',          en: 'THE SILENT EARTH',     mod: '토의 포용에 수의 깊이가 더해져, 당신은 조용하지만 깊은 이해력을 가진 존재입니다. 말보다 존재 자체가 안정감을 줍니다.' },
    },
  },
  금: {
    base: {
      name: '깎아내는 자',
      en: 'THE SCULPTOR',
      keywords: ['결단', '원칙', '정밀', '의지', '순수'],
      shadow: ['완벽주의', '냉혹함'],
      tagline: '당신은 불순물을 제거하고 본질을 드러냅니다.',
      essence: `금(金)의 기운을 주축으로 타고난 당신은, 날카로운 감각으로 본질에 집중합니다. 원석이 조각되어 보석이 되듯, 당신은 불필요한 것을 쳐내고 핵심을 드러내는 사람입니다. 당신이 있는 곳에서는 모호함이 사라집니다.

당신의 가장 큰 힘은 '결단'입니다. 흔들리지 않는 기준과 의지로 자신과 주변을 이끕니다. 당신이 한번 결심하면 무엇도 그 방향을 쉽게 바꾸지 못합니다.

다만 날카로운 것은 가끔 베입니다. 지나친 완벽주의와 원칙이 주변 사람들을 숨막히게 만들 수 있습니다. 때로는 완벽하지 않은 것의 아름다움을 발견하는 여유 — 그것이 당신을 더 깊은 사람으로 만들 것입니다.`,
    },
    with: {
      목: { name: '단련하는 개척자',      en: 'THE DRIVEN PIONEER',   mod: '금의 결단에 목의 성장력이 더해져, 당신은 목표를 향해 거침없이 나아가는 실행가입니다. 계획하고 바로 움직입니다.' },
      화: { name: '불 속의 검',           en: 'THE TEMPERED BLADE',   mod: '금의 원칙에 화의 열정이 더해져, 당신은 강렬한 의지의 소유자입니다. 단련될수록 더 빛나는 본질을 가집니다.' },
      토: { name: '원칙 있는 수호자',     en: 'THE PRINCIPLED GUARD', mod: '금의 결단에 토의 포용이 더해져, 당신은 엄격하지만 따뜻한 기준을 가집니다. 규칙 안에서 사람을 품는 지도자입니다.' },
      수: { name: '냉철한 통찰자',        en: 'THE CLEAR SEER',       mod: '금의 결단에 수의 지혜가 더해져, 당신은 감정에 휘둘리지 않고 상황을 꿰뚫는 능력을 가집니다. 적게 말하고 깊이 생각합니다.' },
    },
  },
  수: {
    base: {
      name: '흐르는 자',
      en: 'THE SAGE',
      keywords: ['지혜', '통찰', '적응', '침투', '순환'],
      shadow: ['과잉사고', '감정 기복'],
      tagline: '당신은 막을 수 없는 흐름입니다.',
      essence: `수(水)의 기운을 주축으로 타고난 당신은, 표면 아래에서 생각하는 존재입니다. 물이 낮은 곳으로 스며들듯, 당신은 남들이 보지 못하는 흐름을 먼저 읽습니다. 당신의 깊이는 쉽게 측정되지 않습니다.

당신의 가장 큰 힘은 '통찰'입니다. 상황의 이면을 꿰뚫어 보는 능력, 필요할 때 유연하게 형태를 바꾸는 적응력이 당신의 핵심입니다. 당신이 조용한 것은 아무 생각이 없어서가 아니라, 너무 많이 생각하고 있기 때문입니다.

다만 물은 너무 깊어지면 스스로를 잠기게 합니다. 머릿속에서만 순환하는 생각들이 때로는 불안과 과잉사고로 이어질 수 있습니다. 생각을 바깥으로 흘려보내는 출구 — 그것이 당신에게 가장 필요한 것입니다.`,
    },
    with: {
      목: { name: '고요한 개척자',        en: 'THE STILL PIONEER',    mod: '수의 통찰에 목의 성장력이 더해져, 당신은 흐름을 읽고 때를 기다려 움직이는 전략가입니다. 겉은 고요하지만 내면에서 끊임없이 자라고 있습니다.' },
      화: { name: '불꽃을 품은 현자',     en: 'THE PARADOX',          mod: '수의 깊이에 화의 열정이 더해져, 당신은 차갑게 분석하고 뜨겁게 실행하는 복잡한 본질을 가집니다. 이 긴장이 당신만의 창의적 에너지원입니다.' },
      토: { name: '깊은 뿌리',            en: 'THE DEEP ROOT',        mod: '수의 유연함에 토의 안정이 더해져, 당신은 쉽게 흔들리지 않는 깊은 안정감을 가집니다. 조용하지만 무게가 있습니다.' },
      금: { name: '냉철한 통찰자',        en: 'THE CLEAR SEER',       mod: '수의 지혜에 금의 결단이 더해져, 당신은 분석하고 바로 실행하는 날카로운 본질을 가집니다. 감정보다 본질이 먼저입니다.' },
    },
  },
};

const BALANCED = {
  name: '오행을 품은 자',
  en: 'THE HARMONIST',
  keywords: ['균형', '다재다능', '포용', '중용', '유연'],
  shadow: ['방향성 부족', '과도한 유연함'],
  tagline: '당신은 다섯 가지 기운 모두를 담고 있습니다.',
  essence: `당신의 사주는 오행이 비교적 고르게 분포되어 있습니다. 이것은 어느 하나에 치우치지 않는 균형과 다재다능함을 의미합니다. 특정 색으로 정의되기를 거부하는 본질입니다.

당신의 가장 큰 힘은 '적응'입니다. 목의 성장력, 화의 열정, 토의 안정, 금의 결단, 수의 지혜를 필요에 따라 꺼내 쓸 수 있는 유연함이 있습니다. 어떤 환경에서도 자신만의 자리를 만들어냅니다.

다만 이 균형이 때로는 뚜렷한 색깔을 가지지 못하는 것처럼 느껴질 수 있습니다. 나만의 중심축 하나를 의식적으로 선택하고 키워가는 것 — 그것이 당신의 과제이자 가장 흥미로운 여정입니다.`,
};

// ── 사주 계산 (lunar-javascript + 폴백) ──────────────────
function parseGZ(gz) {
  if (!gz || gz.length < 2) return null;
  const g = GAN[gz[0]], z = ZHI[gz[1]];
  return (g && z) ? { ganChar: gz[0], zhiChar: gz[1], g, z } : null;
}

function calcBazi(year, month, day, hourBranchIdx) {
  let libraryOk = false;
  let yearGZ, monthGZ, dayGZ;

  try {
    const solar = Solar.fromYmd(year, month, day);
    const lunar  = solar.getLunar();
    yearGZ  = parseGZ(lunar.getYearGanZhi());
    monthGZ = parseGZ(lunar.getMonthGanZhi());
    dayGZ   = parseGZ(lunar.getDayGanZhi());
    if (yearGZ && monthGZ && dayGZ) libraryOk = true;
  } catch (_) {}

  if (!libraryOk) {
    yearGZ  = fallbackYear(year, month, day);
    monthGZ = fallbackMonth(year, month, day, yearGZ.g.idx);
    dayGZ   = fallbackDay(year, month, day);
  }

  const pillars = [
    { label:'년주', ...yearGZ },
    { label:'월주', ...monthGZ },
    { label:'일주', ...dayGZ },
  ];

  if (hourBranchIdx !== null) {
    const starts = [0,2,4,6,8];
    const hi = (starts[dayGZ.g.idx % 5] + hourBranchIdx) % 10;
    const hg = GAN_ORDER[hi], hz = ZHI_ORDER[hourBranchIdx];
    pillars.push({ label:'시주', ganChar:hg, zhiChar:hz, g:GAN[hg], z:ZHI[hz] });
  }

  return { pillars, libraryOk };
}

function fallbackYear(y, m, d) {
  const yr = (m < 2 || (m===2 && d<4)) ? y-1 : y;
  const g = GAN_ORDER[((yr-4)%10+10)%10], z = ZHI_ORDER[((yr-4)%12+12)%12];
  return { ganChar:g, zhiChar:z, g:GAN[g], z:ZHI[z] };
}
function fallbackMonth(y, m, d, yStemIdx) {
  const cum = [0,31,59,90,120,151,181,212,243,273,304,334];
  const doy = cum[m-1] + d;
  let bi;
  if(doy>=341)bi=0; else if(doy>=311)bi=11; else if(doy>=281)bi=10;
  else if(doy>=251)bi=9; else if(doy>=219)bi=8; else if(doy>=188)bi=7;
  else if(doy>=157)bi=6; else if(doy>=126)bi=5; else if(doy>=95)bi=4;
  else if(doy>=65)bi=3; else if(doy>=35)bi=2; else if(doy>=6)bi=1; else bi=0;
  const si = ([2,4,6,8,0,2,4,6,8,0][yStemIdx] + (bi-2+12)%12) % 10;
  const g = GAN_ORDER[si], z = ZHI_ORDER[bi];
  return { ganChar:g, zhiChar:z, g:GAN[g], z:ZHI[z] };
}
function fallbackDay(y, m, d) {
  const a=Math.floor((14-m)/12), y2=y+4800-a, m2=m+12*a-3;
  const jdn=d+Math.floor((153*m2+2)/5)+365*y2+Math.floor(y2/4)-Math.floor(y2/100)+Math.floor(y2/400)-32045;
  const idx=((jdn-2415021+10)%60+60)%60;
  const g=GAN_ORDER[idx%10], z=ZHI_ORDER[idx%12];
  return { ganChar:g, zhiChar:z, g:GAN[g], z:ZHI[z] };
}

// ── 오행 집계 + 아키타입 결정 ─────────────────────────────
function countOH(pillars) {
  const c = { 목:0, 화:0, 토:0, 금:0, 수:0 };
  pillars.forEach(p => { c[p.g.oh]++; c[p.z.oh]++; });
  return c;
}

function getArchetype(counts) {
  const order = ['목','화','토','금','수'];
  const sorted = order.slice().sort((a,b) => counts[b]-counts[a]);
  const total = Object.values(counts).reduce((a,b) => a+b, 0);

  const primary = sorted[0];
  const pCount  = counts[primary];

  // 균형형: 1위 오행이 전체의 28% 이하
  if (pCount / total <= 0.28) return { ...BALANCED, primary: null, secondary: null };

  // 2위 오행: 1위의 65% 이상이면 보조 오행으로 인정
  const secondaryKey = sorted[1];
  const sCount = counts[secondaryKey];
  const secondary = (sCount >= pCount * 0.65 && sCount > 0) ? secondaryKey : null;

  const base = { ...ARCHETYPES[primary].base, primary, secondary };

  if (secondary && ARCHETYPES[primary].with[secondary]) {
    const w = ARCHETYPES[primary].with[secondary];
    base.name = w.name;
    base.en   = w.en;
    // modifier 문장을 essence 앞에 작은 글씨로 추가
    base.modifier = w.mod;
  }

  return base;
}

// ── 렌더: 사주 팔자 ──────────────────────────────────────
function renderPillars(pillars) {
  const t = document.getElementById('pillarTable');
  t.style.gridTemplateColumns = `repeat(${pillars.length}, 1fr)`;
  t.innerHTML = pillars.map(p => `
    <div class="pillar-col">
      <div class="pillar-label">${p.label}</div>
      <div class="p-char" style="color:${OH_COLOR[p.g.oh]}">${p.ganChar}</div>
      <div class="p-hangul">${p.g.ko}</div>
      <div class="p-oh" style="color:${OH_COLOR[p.g.oh]}">${OH_SYM[p.g.oh]}</div>
      <hr class="p-divider"/>
      <div class="p-char" style="color:${OH_COLOR[p.z.oh]}">${p.zhiChar}</div>
      <div class="p-hangul">${p.z.ko}</div>
      <div class="p-oh" style="color:${OH_COLOR[p.z.oh]}">${OH_SYM[p.z.oh]}</div>
    </div>`).join('');
}

// ── 렌더: DNA 카드 ────────────────────────────────────────
function renderDNA(arch, counts, name, dateStr) {
  const order = ['목','화','토','금','수'];
  const total  = Object.values(counts).reduce((a,b) => a+b, 0);
  const max    = Math.max(...Object.values(counts));

  document.getElementById('dnaPersonName').textContent = name;
  document.getElementById('dnaDate').textContent = dateStr;

  // 오행 팔레트
  document.getElementById('ohPalette').innerHTML = order
    .filter(k => counts[k] > 0)
    .map(k => `<div class="oh-palette-seg" style="flex:${counts[k]};background:${OH_COLOR[k]};opacity:.85"></div>`)
    .join('');

  // 코어 심볼
  const coreEls = arch.primary
    ? (arch.secondary
        ? `<span class="core-sym" style="color:${OH_COLOR[arch.primary]}">${OH_SYM[arch.primary]}</span>
           <span style="font-size:1.4rem;color:var(--muted);margin:0 4px">+</span>
           <span class="core-sym" style="color:${OH_COLOR[arch.secondary]}">${OH_SYM[arch.secondary]}</span>`
        : `<span class="core-sym" style="color:${OH_COLOR[arch.primary]}">${OH_SYM[arch.primary]}</span>`)
    : `<span class="core-sym" style="color:var(--gold)">☯</span>`;

  document.getElementById('dnaCore').innerHTML = `
    ${coreEls}
    <div class="core-info">
      <span class="core-label">Core Element</span>
      <span class="core-name">${
        arch.primary
          ? (arch.secondary ? `${OH_NAME[arch.primary]} · ${OH_NAME[arch.secondary]}` : OH_NAME[arch.primary])
          : '오행 균형'
      }</span>
    </div>`;

  // 타입 이름
  document.getElementById('dnaTypeKo').textContent = arch.name;
  document.getElementById('dnaTypeEn').textContent = arch.en;

  // 키워드 + 그림자
  const primaryColor = arch.primary ? OH_COLOR[arch.primary] : 'var(--gold)';
  document.getElementById('dnaAttrs').innerHTML = `
    <div class="attr-group">
      <div class="attr-label">Strength</div>
      <div class="attr-tags">${arch.keywords.map(k =>
        `<span class="attr-tag" style="color:${primaryColor};border-color:${primaryColor}30;background:${primaryColor}10"># ${k}</span>`
      ).join('')}</div>
    </div>
    <div class="attr-group">
      <div class="attr-label">Shadow</div>
      <div class="attr-tags">${arch.shadow.map(k =>
        `<span class="attr-tag" style="color:var(--muted);border-color:var(--border)">${k}</span>`
      ).join('')}</div>
    </div>`;

  // 타이포
  document.getElementById('dnaTagline').textContent = `"${arch.tagline}"`;

  // 카드 배경 글로우
  if (arch.primary) {
    document.getElementById('dnaCard').style.boxShadow =
      `0 0 60px ${OH_COLOR[arch.primary]}18, 0 8px 40px rgba(0,0,0,.6)`;
  }
}

// ── 렌더: 본질 설명문 ────────────────────────────────────
function renderEssence(arch, counts) {
  const order = ['목','화','토','금','수'];
  const total  = Object.values(counts).reduce((a,b) => a+b, 0);
  const max    = Math.max(...Object.values(counts));

  // 본질 텍스트 (modifier가 있으면 italics로 상단 배치)
  let html = '';
  if (arch.modifier) {
    html += `<p style="font-size:.82rem;color:var(--muted);font-style:italic;border-left:2px solid var(--border);padding-left:12px;margin-bottom:20px">${arch.modifier}</p>`;
  }
  arch.essence.split('\n\n').forEach(para => {
    html += `<p>${para}</p>`;
  });
  document.getElementById('essenceText').innerHTML = html;

  // 미니 오행 바
  document.getElementById('ohMiniBars').innerHTML = order.map(k => `
    <div class="oh-mini-row">
      <div class="oh-mini-name" style="color:${OH_COLOR[k]}">${OH_NAME[k]}</div>
      <div class="oh-mini-track">
        <div class="oh-mini-fill" style="width:${max>0?counts[k]/max*100:0}%;background:${OH_COLOR[k]}"></div>
      </div>
      <div class="oh-mini-count">${counts[k]}</div>
    </div>`).join('');
}

// ── 폼 제출 ───────────────────────────────────────────────
document.getElementById('sajuForm').addEventListener('submit', e => {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const gender  = document.querySelector('input[name="gender"]:checked')?.value;
  const dateVal = document.getElementById('birthDate').value;
  const timeVal = document.getElementById('birthTime').value;

  if (!gender) { alert('성별을 선택해주세요.'); return; }

  const [year, month, day] = dateVal.split('-').map(Number);
  const hourBranch = timeVal === '' ? null : parseInt(timeVal, 10);

  // 로딩 화면 표시
  document.getElementById('mainScreen').classList.add('hidden');
  document.getElementById('loadingScreen').classList.remove('hidden');

  // 계산 실행 후 결과 표시 (setTimeout으로 로딩 최소 1.8초 보장)
  setTimeout(() => {
    const { pillars, libraryOk } = calcBazi(year, month, day, hourBranch);
    const counts = countOH(pillars);
    const arch   = getArchetype(counts);

    const timeLabel = timeVal === ''
      ? '시간 모름'
      : document.getElementById('birthTime').selectedOptions[0].text.split(' ')[0];
    const dateStr = `${year}.${String(month).padStart(2,'0')}.${String(day).padStart(2,'0')} · ${gender} · ${timeLabel}`;

    document.getElementById('libraryBadge').textContent = libraryOk ? '만세력 절기 기반' : '자체 계산';

    renderPillars(pillars);
    renderDNA(arch, counts, name, dateStr);
    renderEssence(arch, counts);

    // 로딩 끝, 결과 표시
    document.getElementById('loadingScreen').classList.add('hidden');
    document.getElementById('resultScreen').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1800);
});

// ── 리셋 ─────────────────────────────────────────────────
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('resultScreen').classList.add('hidden');
  document.getElementById('sajuForm').reset();
  document.getElementById('mainScreen').classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
