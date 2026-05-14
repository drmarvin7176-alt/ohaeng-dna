// ══════════════════════════════════════════════════════════
//  오행 DNA  ·  script.js
// ══════════════════════════════════════════════════════════

// ── 간지 데이터 ──────────────────────────────────────────
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

// ── 오행 색상/심볼 ───────────────────────────────────────
const OH_COLOR = { 목:'#5aad5a', 화:'#e06060', 토:'#c09a30', 금:'#9ab0d0', 수:'#5090d0' };
const OH_SYM   = { 목:'木', 화:'火', 토:'土', 금:'金', 수:'水' };
const OH_NAME  = { 목:'목(木)', 화:'화(火)', 토:'토(土)', 금:'금(金)', 수:'수(水)' };

// ══════════════════════════════════════════════════════════
//  아키타입 데이터베이스
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
      화: { name: '타오르는 개척자',    en: 'THE BURNING PIONEER',  mod: '목의 성장 본능에 화의 열정이 더해져, 당신은 행동하는 비전가입니다. 아이디어를 행동으로, 계획을 현실로 전환하는 속도가 탁월합니다. 에너지가 넘칠수록 방향이 중요해집니다.' },
      토: { name: '뿌리 깊은 선구자',   en: 'THE GROUNDED PIONEER', mod: '목의 개척력에 토의 안정감이 더해져, 당신은 무모하지 않은 혁신가입니다. 기반을 단단히 하면서 앞으로 나아가는 균형 — 당신의 성장에는 뿌리가 있습니다.' },
      금: { name: '단련된 개척자',      en: 'THE SHARP PIONEER',    mod: '목의 성장 본능에 금의 결단력이 더해져, 당신은 목표가 명확한 행동가입니다. 가지치기를 두려워하지 않고 본질에 집중할 줄 압니다.' },
      수: { name: '흐름을 읽는 선구자', en: 'THE SILENT PIONEER',   mod: '목의 성장 본능에 수의 통찰이 더해져, 당신은 섣불리 움직이지 않지만 때가 왔을 때 누구보다 빠르게 전진합니다. 고요 속에 방향이 있습니다.' },
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
      목: { name: '불꽃을 키우는 자', en: 'THE EXPANDING FLAME', mod: '화의 열정에 목의 성장력이 더해져, 당신은 끊임없이 확장하는 에너지를 가집니다. 영감을 받는 즉시 행동으로 옮기는 속도가 있습니다.' },
      토: { name: '따뜻한 기반자',   en: 'THE WARM ANCHOR',     mod: '화의 열정에 토의 포용력이 더해져, 당신은 사람들을 품는 에너지를 가집니다. 뜨겁지만 흔들리지 않는 중심이 있습니다.' },
      금: { name: '불 속의 날',      en: 'THE BURNING BLADE',   mod: '화의 열정에 금의 결단력이 더해져, 당신은 정확하게 타격하는 에너지를 가집니다. 직관과 원칙이 함께 작동합니다.' },
      수: { name: '불꽃을 품은 현자',en: 'THE PARADOX',         mod: '화의 열정에 수의 깊이가 더해져, 당신은 뜨겁게 느끼고 차갑게 생각하는 복잡한 본질을 가집니다. 이 긴장이 당신만의 창의적 에너지원입니다.' },
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
      목: { name: '자라는 대지',    en: 'THE GROWING EARTH',    mod: '토의 안정에 목의 성장력이 더해져, 당신은 기반 위에서 끊임없이 확장합니다. 뿌리는 깊고 가지는 넓게 뻗어나갑니다.' },
      화: { name: '따뜻한 대지',    en: 'THE WARM EARTH',       mod: '토의 포용에 화의 열정이 더해져, 당신은 사람들을 끌어안는 따뜻한 에너지를 가집니다. 안정적이면서도 생기가 넘칩니다.' },
      금: { name: '단단한 기반자',  en: 'THE SOLID FOUNDATION', mod: '토의 안정에 금의 결단력이 더해져, 당신은 원칙 있는 수호자입니다. 흔들림 없는 기준으로 주변을 이끕니다.' },
      수: { name: '고요한 대지',    en: 'THE SILENT EARTH',     mod: '토의 포용에 수의 깊이가 더해져, 당신은 조용하지만 깊은 이해력을 가진 존재입니다. 말보다 존재 자체가 안정감을 줍니다.' },
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
      목: { name: '단련하는 개척자',  en: 'THE DRIVEN PIONEER',   mod: '금의 결단에 목의 성장력이 더해져, 당신은 목표를 향해 거침없이 나아가는 실행가입니다. 계획하고 바로 움직입니다.' },
      화: { name: '불 속의 검',       en: 'THE TEMPERED BLADE',   mod: '금의 원칙에 화의 열정이 더해져, 당신은 강렬한 의지의 소유자입니다. 단련될수록 더 빛나는 본질을 가집니다.' },
      토: { name: '원칙 있는 수호자', en: 'THE PRINCIPLED GUARD', mod: '금의 결단에 토의 포용이 더해져, 당신은 엄격하지만 따뜻한 기준을 가집니다. 규칙 안에서 사람을 품는 지도자입니다.' },
      수: { name: '냉철한 통찰자',    en: 'THE CLEAR SEER',       mod: '금의 결단에 수의 지혜가 더해져, 당신은 감정에 휘둘리지 않고 상황을 꿰뚫는 능력을 가집니다. 적게 말하고 깊이 생각합니다.' },
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
      목: { name: '고요한 개척자',   en: 'THE STILL PIONEER', mod: '수의 통찰에 목의 성장력이 더해져, 당신은 흐름을 읽고 때를 기다려 움직이는 전략가입니다. 겉은 고요하지만 내면에서 끊임없이 자라고 있습니다.' },
      화: { name: '불꽃을 품은 현자',en: 'THE PARADOX',       mod: '수의 깊이에 화의 열정이 더해져, 당신은 차갑게 분석하고 뜨겁게 실행하는 복잡한 본질을 가집니다. 이 긴장이 당신만의 창의적 에너지원입니다.' },
      토: { name: '깊은 뿌리',       en: 'THE DEEP ROOT',     mod: '수의 유연함에 토의 안정이 더해져, 당신은 쉽게 흔들리지 않는 깊은 안정감을 가집니다. 조용하지만 무게가 있습니다.' },
      금: { name: '냉철한 통찰자',   en: 'THE CLEAR SEER',    mod: '수의 지혜에 금의 결단이 더해져, 당신은 분석하고 바로 실행하는 날카로운 본질을 가집니다. 감정보다 본질이 먼저입니다.' },
    },
  },
};

// ── 풍수지리 데이터 ──────────────────────────────────────
// 근거: 오행 방위론(목=동·화=남·토=중앙·금=서·수=북),
//       형기론(산·건물 형태를 오행으로 분류),
//       배산임수(背山臨水)·장풍득수(藏風得水) 원칙,
//       오행 상생(相生) — 나를 생해주는 기운의 방위를 취함
const PUNGSU = {
  목: {
    summary: '풍수 형기론에서 목형(木形) 지세는 위로 곧게 뻗은 형태입니다. 목의 기운을 가진 사람은 수(水)가 목을 생(生)하는 오행 상생 원리에 따라, 수기운이 흐르는 동쪽 방위와 물이 가까운 환경에서 본래 에너지가 살아납니다. 또한 장풍득수 원칙상 바람이 통하되 기운이 흩어지지 않는 구조가 중요합니다.',
    rows: [
      { label: '주거 형태', text: '단독주택 또는 저층 빌라를 권합니다. 형기론에서 목형 건물은 세로로 길고 곧은 구조를 좋은 형태로 봅니다. 마당이나 정원이 있어 지기(地氣)를 직접 받을 수 있는 구조가 이상적입니다.' },
      { label: '주변 환경', text: '배산임수 원칙에서 앞이 트이고 뒤가 막힌 지형이 기본입니다. 목에게는 수기운이 생기(生氣)가 되므로 하천이나 공원처럼 물이 있거나 초목이 우거진 동쪽 방향이 열린 지형을 선택하는 것이 좋습니다.' },
      { label: '층수', text: '중층(4~10층)이 목형 기운과 잘 맞습니다. 풍수에서 지나치게 높으면 기운이 허(虛)해지고, 너무 낮으면 습기(濕氣)가 차기 쉽습니다. 나무가 자라는 높이처럼 땅에 뿌리를 두되 하늘을 향하는 위치가 적합합니다.' },
      { label: '방향', text: '동향 또는 동남향. 오행 방위론에서 목의 방위는 동쪽(東)으로, 아침 일출 방향에서 생기가 들어옵니다. 목을 생하는 수기운이 흘러드는 방향을 앞으로 두는 배치가 이상적입니다.' },
      { label: '피할 곳', text: '금(金)은 목을 극(克)합니다. 서향으로 완전히 막힌 구조나 금속성 구조물이 과도하게 둘러싼 환경은 목의 기운을 억누릅니다. 또한 지하·반지하는 지기가 과도해 목의 성장 에너지가 막힙니다.' },
      { label: '기운 보완', text: '어쩔 수 없이 금기(金氣)가 강한 환경에 살게 된다면, 나를 생(生)해주는 수(水)의 기운을 공간 안으로 끌어들여 균형을 맞출 수 있습니다. 어항이나 수반처럼 흐르는 물 요소, 짙은 남색·청색 계열 인테리어, 물결·곡선 형태의 오브제가 목의 기운을 지켜줍니다.' },
    ]
  },
  화: {
    summary: '풍수 형기론에서 화형(火形) 지세는 뾰족하고 위로 솟구치는 형태입니다. 화의 기운을 가진 사람은 목(木)이 화를 생하는 상생 원리에 따라, 목기운이 있는 남쪽 방위와 햇빛이 풍부한 환경에서 에너지가 극대화됩니다. 풍수에서 남향은 전주작(前朱雀) 방위로, 열린 기운이 들어오는 가장 활기찬 방향입니다.',
    rows: [
      { label: '주거 형태', text: '채광이 뛰어난 아파트나 고층 주거가 잘 맞습니다. 형기론에서 화형 건물은 위로 솟은 형태를 좋게 봅니다. 시야가 트이고 햇빛이 하루 종일 드는 구조가 화의 기운을 증폭시킵니다.' },
      { label: '주변 환경', text: '풍수에서 남쪽 앞은 전주작(朱雀) 방위로 기운이 모이고 활기가 넘치는 방향입니다. 공원이나 광장처럼 남쪽이 트인 지형, 또는 사람들의 기운이 순환하는 도심 환경이 화의 기운을 살립니다.' },
      { label: '층수', text: '고층일수록 유리합니다. 풍수에서 높은 곳은 양기(陽氣)가 강한 공간으로 봅니다. 화는 양(陽)의 기운이 강한 오행이므로, 햇빛과 하늘이 가까울수록 본래 기운이 살아납니다.' },
      { label: '방향', text: '남향이 최적입니다. 풍수 사신사(四神砂)에서 남쪽은 전주작(前朱雀)으로 밝고 활기찬 기운이 흘러드는 방위입니다. 화의 방위인 남쪽(南)을 정면으로 받아들이는 구조가 이상적입니다.' },
      { label: '피할 곳', text: '수(水)는 화를 극합니다. 북향으로 어둡고 습한 공간, 또는 정북방향에 큰 수기운(강, 저수지 등)이 바로 맞닿아 있는 구조는 화의 기운을 억누릅니다. 지하 공간도 음기(陰氣)가 강해 화와 맞지 않습니다.' },
      { label: '기운 보완', text: '화기(火氣)가 너무 강한 환경(직사광선 과도, 주변에 뾰족한 건물 밀집)에 있다면, 나를 생(生)해주는 목(木)의 기운을 공간에 더해 조절합니다. 초록 식물, 나무 소재 가구, 세로로 뻗은 형태의 오브제가 화의 기운을 부드럽게 받쳐줍니다. 반대로 수기가 너무 강하면 붉은 계열 포인트 색상이나 조명으로 균형을 맞추세요.' },
    ]
  },
  토: {
    summary: '풍수 형기론에서 토형(土形) 지세는 넓고 평평하게 퍼진 형태입니다. 토의 기운을 가진 사람은 화(火)가 토를 생하는 상생 원리와, 토 자체가 중앙(中央)을 방위로 갖는 원칙에 따라, 배산임수의 전형적인 명당 지형에서 가장 안정된 기운을 받습니다.',
    rows: [
      { label: '주거 형태', text: '단독주택이나 저층 아파트(1~4층)가 가장 잘 맞습니다. 풍수에서 토형 지세는 땅에 가깝고 넓게 퍼진 구조를 이상적으로 봅니다. 마당이나 공용 정원처럼 지기(地氣)를 직접 받을 수 있는 공간이 있으면 더욱 좋습니다.' },
      { label: '주변 환경', text: '배산임수 원칙이 가장 잘 적용되는 환경입니다. 뒤에 산이나 높은 건물이 있어 바람을 막아주고, 앞이 트여 기운이 흘러드는 전형적인 명당 지형이 토의 기운에 가장 잘 맞습니다. 오래 정착한 주거 밀집지역도 지기가 안정되어 좋습니다.' },
      { label: '층수', text: '낮은 층(1~3층)이 이상적입니다. 풍수에서 토는 지기(地氣)를 직접 받는 것이 중요하며, 땅과 가까울수록 안정적인 기운을 얻습니다. 지하는 음기가 과도해 피하는 것이 좋습니다.' },
      { label: '방향', text: '남향이 기본이며, 남서향도 좋습니다. 토의 방위는 중앙(中央)으로 특정 방향에 치우치지 않지만, 화(火)가 토를 생하므로 햇빛이 잘 드는 남향 구조가 토의 기운을 활성화합니다.' },
      { label: '피할 곳', text: '목(木)은 토를 극합니다. 사방이 나무나 숲으로 너무 빽빽하게 둘러싸인 환경, 또는 지반이 불안정한 신개발지는 토의 안정 에너지를 흩뜨립니다. 변동이 잦고 공사 중인 지역도 맞지 않습니다.' },
      { label: '기운 보완', text: '목기(木氣)가 강한 환경(녹지 밀집, 목조 건물 주변)에 있다면, 나를 생(生)해주는 화(火)의 기운을 공간에 더해 균형을 맞춥니다. 따뜻한 조명, 붉은색·주황색 포인트 소품, 촛불이나 빛이 모이는 공간이 토의 기운을 단단하게 받쳐줍니다. 황토색·베이지 계열 소재를 기본으로 두는 것도 토의 안정 에너지를 강화합니다.' },
    ]
  },
  금: {
    summary: '풍수 형기론에서 금형(金形) 지세는 둥글고 완만하게 낮아지는 형태입니다. 금의 기운을 가진 사람은 토(土)가 금을 생하는 상생 원리에 따라, 지반이 안정되고 정돈된 서쪽 방위의 환경에서 에너지가 모입니다. 풍수에서 서쪽은 우백호(右白虎) 방위로 질서와 수호의 기운이 있습니다.',
    rows: [
      { label: '주거 형태', text: '구조가 정돈된 아파트나 주상복합이 잘 맞습니다. 형기론에서 금형 건물은 돔이나 반원형처럼 둥글고 단정한 외관을 좋게 봅니다. 관리가 체계적으로 이루어지는 환경에서 금의 기운이 정화됩니다.' },
      { label: '주변 환경', text: '풍수에서 서쪽은 우백호(右白虎) 방위로 기운을 수호하고 가두는 역할을 합니다. 서쪽에 야트막한 산이나 높은 건물이 있어 기운을 잡아주고, 정비된 도로와 건물 배치가 이루어진 환경이 금에게 이상적입니다.' },
      { label: '층수', text: '중층(5~15층)이 적합합니다. 풍수에서 금형 지세는 높지도 낮지도 않은 완만한 형태를 이상으로 봅니다. 너무 높으면 기운이 분산되고, 너무 낮으면 토기운에 눌릴 수 있습니다.' },
      { label: '방향', text: '서향 또는 서남향. 금의 방위는 서쪽(西)으로, 우백호 방위에서 기운이 응축됩니다. 다만 서향은 오후 햇빛이 강할 수 있으므로 서남향으로 약간 틀어 화기(火氣)를 조절하는 것이 좋습니다.' },
      { label: '피할 곳', text: '화(火)는 금을 극합니다. 정남향으로 직사광선이 강하게 내리쬐는 환경이나, 붉은색 계열 건물이 밀집한 지역은 금의 기운을 녹입니다. 소음이 많고 혼잡한 환경도 금의 정밀한 에너지를 흩뜨립니다.' },
      { label: '기운 보완', text: '화기(火氣)가 강한 환경(남향 고층, 붉은 외관 건물 밀집)에 있다면, 나를 생(生)해주는 토(土)의 기운을 공간에 불러들여 완충합니다. 도자기·세라믹 소재, 황토색·아이보리 계열의 차분한 마감, 무게감 있는 돌 소품이 금의 기운을 단단하게 지탱해줍니다. 공간은 군더더기 없이 정돈된 상태가 금의 에너지를 가장 잘 살립니다.' },
    ]
  },
  수: {
    summary: '풍수 형기론에서 수형(水形) 지세는 물결처럼 굴곡지고 낮게 흐르는 형태입니다. 수의 기운을 가진 사람은 금(金)이 수를 생하는 상생 원리에 따라, 서쪽이 막혀 기운을 모아주고 물이 흐르는 북쪽이 열린 환경에서 지혜의 기운이 깊어집니다. 풍수에서 물은 재기(財氣)와 지혜의 기운을 상징합니다.',
    rows: [
      { label: '주거 형태', text: '강변·하천 근처의 아파트나 빌라가 이상적입니다. 풍수에서 득수(得水), 즉 물을 얻는 것은 기운이 모이는 조건 중 하나입니다. 물이 보이거나 흐르는 소리가 들리는 환경에서 수의 기운이 깊어집니다.' },
      { label: '주변 환경', text: '배산임수 원칙에서 물을 앞에 두는 임수(臨水) 환경이 수에게 가장 잘 맞습니다. 한강변, 하천 근처처럼 물이 흘러가는 방향이 보이는 곳이 좋으며, 물이 집을 향해 휘어 들어오는 지형(환포수, 環抱水)이 풍수적으로 가장 이상적입니다.' },
      { label: '층수', text: '중층 이상이 좋으나 특별한 제약은 없습니다. 물이 보이는 전망이 확보될 수 있는 층이면 더욱 이상적입니다. 풍수에서 물을 내려다볼 수 있는 위치는 기운을 관조하는 수의 성질과 잘 맞습니다.' },
      { label: '방향', text: '북향 또는 북동향. 수의 방위는 북쪽(北)으로, 풍수 사신사에서 후현무(後玄武) 방위입니다. 북쪽에 높은 산이나 건물이 뒤를 막아주고 앞이 트여 있는 구조에서 수의 기운이 깊고 안정적으로 흐릅니다.' },
      { label: '피할 곳', text: '토(土)는 수를 극합니다. 사방이 높은 건물로 막혀 물의 흐름이 없고 정체된 환경, 또는 매립지·간척지처럼 토기운이 과도한 지형은 수의 흐름을 가로막습니다. 극도로 건조하고 뜨거운 환경도 수에게 맞지 않습니다.' },
      { label: '기운 보완', text: '토기(土氣)가 강한 환경(고층 콘크리트 밀집, 매립지)에 있다면, 나를 생(生)해주는 금(金)의 기운을 공간에 더합니다. 금속 소재 오브제, 흰색·은색·회색 계열의 차가운 톤 인테리어, 반구형 또는 둥근 형태의 소품이 수의 기운을 보호합니다. 흐르는 물 소리(작은 분수, 수반)를 공간 안에 두는 것도 수기를 직접 끌어들이는 방법입니다.' },
    ]
  },
  balanced: {
    summary: '오행이 고르게 분포된 당신은 풍수에서 중화(中和)의 기운을 가진 드문 경우입니다. 전통 풍수에서 오행이 균형 잡힌 땅을 명당으로 여기듯, 어느 한 기운에 치우치지 않는 환경이 가장 잘 맞습니다. 배산임수와 장풍득수의 기본 원칙을 충족하는 곳이면 어디든 안정적입니다.',
    rows: [
      { label: '주거 형태', text: '어느 형태든 무방하나, 공간의 역할이 명확하게 분리된 구조가 좋습니다. 풍수에서 기운이 방 용도에 따라 자연스럽게 구분되는 구조가 오행 균형을 유지하는 데 도움이 됩니다.' },
      { label: '주변 환경', text: '배산임수의 기본 조건 — 뒤에 산이나 건물이 있어 바람을 막고, 앞이 트여 기운이 흘러드는 — 을 충족하는 곳이면 어디든 이상적입니다. 자연과 도심이 균형 잡힌 환경을 선택하세요.' },
      { label: '층수', text: '특별한 제약 없이 자신이 가장 편안함을 느끼는 높이를 선택하되, 채광과 통풍이 고루 확보되는 층이 좋습니다.' },
      { label: '방향', text: '남향을 기본으로 하되, 동남향도 좋습니다. 풍수에서 채광과 통풍이 고루 이루어지는 방향이 오행의 균형을 자연스럽게 지원합니다.' },
      { label: '피할 곳', text: '어느 한 오행의 기운이 극단적으로 강한 환경입니다. 예를 들어 사방이 금속 구조물로 가득한 환경, 또는 반대로 물이 너무 과도하게 넘치는 지형처럼 기운이 한쪽으로 치우친 곳은 균형을 무너뜨릴 수 있습니다.' },
      { label: '기운 보완', text: '오행이 고른 당신은 어느 한 방향이 아닌, 현재 공간에서 부족하게 느껴지는 기운을 의식적으로 채우는 방식이 효과적입니다. 불안하거나 변동이 많으면 토(土)의 안정 요소(흙 소재, 황토색)를, 에너지가 떨어지면 화(火)의 따뜻한 조명을, 생각이 막히면 수(水)의 흐름(물 소리, 청색)을 공간에 더해보세요.' },
    ]
  },
};

// ── 오행별 수준별 상세 설명 ──────────────────────────────
const OH_DETAIL = {
  목: {
    sym: '木', role: '성장 · 시작 · 창조',
    desc: {
      없음: '목의 기운이 없습니다. 새로운 것을 개척하기보다 이미 있는 것을 다지고 발전시키는 데 강합니다. 시작보다 완성에 에너지가 집중되는 타입으로, 안정적인 환경에서 진가가 드러납니다.',
      약함: '목의 기운이 약한 편입니다. 성장의 씨앗은 있지만 빠르게 자라나지는 않습니다. 조급함 없이 타이밍을 기다리는 편이며, 한 번 방향이 잡히면 꾸준히 이어가는 힘이 있습니다.',
      보통: '목의 기운이 보통입니다. 필요할 때 성장하고, 쉬어야 할 때 안정을 찾는 자연스러운 흐름을 가집니다. 무리하지 않으면서도 꾸준히 앞으로 나아가는 균형 잡힌 성향입니다.',
      강함: '목의 기운이 강합니다. 본능적으로 앞을 향하는 에너지가 있고, 새로운 것을 시작하는 것이 자연스럽습니다. 다만 여러 것을 동시에 벌이다 마무리가 약해지지 않도록 주의가 필요합니다.',
      매우강함: '목의 기운이 매우 강합니다. 한 곳에 머무르는 것이 어렵고, 끊임없이 확장하고 새로운 것을 만들어내려는 충동이 있습니다. 이 강한 에너지의 방향을 의식적으로 잡아줄 때 폭발적인 결과가 나옵니다.',
    }
  },
  화: {
    sym: '火', role: '열정 · 표현 · 공명',
    desc: {
      없음: '화의 기운이 없습니다. 감정을 크게 드러내기보다 차분하게 접근하고, 타오르는 것보다 꺼지지 않는 일관성이 강점입니다. 주변의 분위기를 달구기보다 조용히 깊이 영향을 미치는 타입입니다.',
      약함: '화의 기운이 약합니다. 표현력보다는 내면에서 조용히 타오르는 편이며, 열정을 밖으로 꺼내는 것이 낯설게 느껴질 수 있습니다. 하지만 그 안의 불씨는 생각보다 오래갑니다.',
      보통: '화의 기운이 보통입니다. 표현할 때는 온기 있게, 절제할 때는 차분하게. 감정과 이성 사이의 균형이 자연스럽게 이루어집니다.',
      강함: '화의 기운이 강합니다. 주변에 에너지와 영감을 전달하는 힘이 강하고, 사람들은 당신 곁에서 자연스럽게 따뜻해집니다. 다만 쉽게 소진되지 않도록 내면을 채우는 시간이 필요합니다.',
      매우강함: '화의 기운이 매우 강합니다. 강렬한 감정과 표현 에너지가 끊임없이 흐릅니다. 이 에너지가 주변을 밝히는 빛이 되려면, 방향을 잘 조율하는 것이 핵심입니다.',
    }
  },
  토: {
    sym: '土', role: '신뢰 · 포용 · 안정',
    desc: {
      없음: '토의 기운이 없습니다. 한 곳에 뿌리내리기보다 흐르고 변화하는 데 강합니다. 안정을 원하지만 얽매이는 것은 불편합니다. 이동과 변화 속에서 오히려 자신의 리듬을 찾는 타입입니다.',
      약함: '토의 기운이 약합니다. 중심을 잡는 힘은 있지만 오래 유지하기가 쉽지 않습니다. 안정보다 변화 속에서 자신의 자리를 찾아가며, 고정된 것보다 유동적인 환경에서 빛납니다.',
      보통: '토의 기운이 보통입니다. 필요할 때 중심을 잡고, 변화가 필요할 때는 유연하게 적응합니다. 주변 사람들에게 자연스럽게 신뢰감을 주는 존재입니다.',
      강함: '토의 기운이 강합니다. 흔들림 없는 안정감을 가지고 있으며, 주변 사람들이 자연스럽게 기대고 싶어합니다. 때로는 변화를 받아들이는 것이 더딜 수 있으므로, 유연함을 의식적으로 연습하는 것이 도움이 됩니다.',
      매우강함: '토의 기운이 매우 강합니다. 강력한 포용력과 지속성을 가진 대지 같은 존재입니다. 사람들이 당신 곁에서 안정감을 느낍니다. 다만 지나친 고집이나 변화 저항이 성장의 발목을 잡지 않도록 주의하세요.',
    }
  },
  금: {
    sym: '金', role: '결단 · 원칙 · 정밀',
    desc: {
      없음: '금의 기운이 없습니다. 엄격한 원칙보다는 유연하게 상황을 받아들이는 편이며, 판단을 내리기보다 흐름에 맡기는 것이 자연스럽습니다. 날카롭게 잘라내기보다 감싸안는 방식을 선택합니다.',
      약함: '금의 기운이 약합니다. 결단력은 있지만 마지막 한 발을 내딛는 데 에너지가 필요합니다. 원칙보다는 관계와 맥락을 먼저 보는 경향이 있어, 상황에 따라 유연하게 대응합니다.',
      보통: '금의 기운이 보통입니다. 필요할 때는 단호하게, 유연해야 할 때는 열려 있습니다. 판단력과 포용력이 균형을 이루고 있습니다.',
      강함: '금의 기운이 강합니다. 명확한 기준과 결단력이 탁월하며, 불필요한 것을 쳐내고 본질에 집중하는 능력이 뛰어납니다. 완벽주의가 자신이나 주변을 힘들게 할 수 있다는 점을 인식하는 것이 중요합니다.',
      매우강함: '금의 기운이 매우 강합니다. 강렬한 원칙과 의지로 자신만의 기준을 세우고 지킵니다. 이 힘이 때로 타인에게 경직되게 느껴질 수 있으므로, 유연함을 의식적으로 키워가는 것이 삶의 과제입니다.',
    }
  },
  수: {
    sym: '水', role: '지혜 · 통찰 · 적응',
    desc: {
      없음: '수의 기운이 없습니다. 깊이 사색하기보다 직접 행동하고 경험하는 것이 자연스럽습니다. 분석 전에 움직이고, 결과를 통해 배우는 타입입니다. 직관보다 감각과 경험이 판단의 기준이 됩니다.',
      약함: '수의 기운이 약합니다. 통찰력은 있지만 표면에 집중하는 편이며, 깊이 파고드는 것보다 넓게 보는 것이 편합니다. 빠른 판단과 실행이 강점입니다.',
      보통: '수의 기운이 보통입니다. 생각과 행동의 균형이 잘 잡혀 있습니다. 분석하되 과잉사고에 빠지지 않고, 흐름을 읽되 머뭇거리지 않는 실용적인 통찰력을 가집니다.',
      강함: '수의 기운이 강합니다. 남들이 보지 못하는 흐름을 먼저 읽는 능력이 뛰어납니다. 다만 생각이 너무 많아져 행동이 늦어지거나, 과잉사고로 에너지가 소진되지 않도록 주의가 필요합니다.',
      매우강함: '수의 기운이 매우 강합니다. 극도로 예민하고 깊은 통찰력을 가지고 있습니다. 이 깊이가 당신의 가장 강력한 자산이지만, 생각의 바다에 스스로 잠기지 않으려면 바깥으로 흘려보내는 출구가 반드시 필요합니다.',
    }
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

// ══════════════════════════════════════════════════════════
//  캔버스 별 배경
// ══════════════════════════════════════════════════════════
function initCanvas() {
  const canvas = document.getElementById('cosmos');
  const ctx = canvas.getContext('2d');
  let w, h, stars = [];

  function resize() {
    w = canvas.width  = window.innerWidth;
    h = canvas.height = window.innerHeight;
    stars = Array.from({ length: 220 }, () => ({
      x:     Math.random() * w,
      y:     Math.random() * h,
      r:     Math.random() * 1.3 + 0.3,
      base:  Math.random() * 0.18 + 0.05,
      speed: Math.random() * 0.5 + 0.1,
      phase: Math.random() * Math.PI * 2,
    }));
  }

  let t = 0;
  (function draw() {
    ctx.clearRect(0, 0, w, h);
    t += 0.008;
    stars.forEach(s => {
      const a = s.base * (0.55 + 0.45 * Math.sin(t * s.speed + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(80,80,190,${a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  })();

  resize();
  window.addEventListener('resize', resize);
}

// ══════════════════════════════════════════════════════════
//  인트로
// ══════════════════════════════════════════════════════════
function initIntro() {
  const dot = document.getElementById('originDot');

  setTimeout(() => dot.classList.add('clickable'), 600);

  dot.addEventListener('click', () => {
    document.getElementById('intro').classList.add('hidden');
    startSteps();
  });
}

// ══════════════════════════════════════════════════════════
//  단계별 입력
// ══════════════════════════════════════════════════════════
let currentStep = 0;
const answers = { name: '', gender: '', year: 0, month: 0, day: 0, hourBranchIdx: null };

const HOUR_OPTIONS = [
  { label: '시간 모름',             value: null },
  { label: '子時  23:00 – 01:00', value: 0  },
  { label: '丑時  01:00 – 03:00', value: 1  },
  { label: '寅時  03:00 – 05:00', value: 2  },
  { label: '卯時  05:00 – 07:00', value: 3  },
  { label: '辰時  07:00 – 09:00', value: 4  },
  { label: '巳時  09:00 – 11:00', value: 5  },
  { label: '午時  11:00 – 13:00', value: 6  },
  { label: '未時  13:00 – 15:00', value: 7  },
  { label: '申時  15:00 – 17:00', value: 8  },
  { label: '酉時  17:00 – 19:00', value: 9  },
  { label: '戌時  19:00 – 21:00', value: 10 },
  { label: '亥時  21:00 – 23:00', value: 11 },
];

const elStepQ    = document.getElementById('stepQ');
const elStepArea = document.getElementById('stepInputArea');
const elStepNext = document.getElementById('stepNext');
const elStepDots = document.getElementById('stepDots');

const STEPS = [
  // ── 0: 이름 ──────────────────────────────────────────
  {
    q: '이름을 알려주세요.',
    render() {
      const inp = document.createElement('input');
      inp.type = 'text';
      inp.placeholder = '이름을 알려주세요';
      inp.autocomplete = 'off';
      elStepArea.appendChild(inp);
      setTimeout(() => inp.focus(), 60);
      inp.addEventListener('input', () => {
        inp.value.trim() ? showNext() : hideNext();
      });
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter' && inp.value.trim()) elStepNext.click();
      });
    },
    validate() {
      const v = elStepArea.querySelector('input').value.trim();
      if (!v) return false;
      answers.name = v;
      return true;
    },
  },
  // ── 1: 생년월일 ───────────────────────────────────────
  {
    q: '생년월일을 알려주세요.',
    render() {
      const inp = document.createElement('input');
      inp.type = 'date';
      inp.max = new Date().toISOString().split('T')[0];
      elStepArea.appendChild(inp);
      setTimeout(() => inp.focus(), 60);
      inp.addEventListener('change', () => {
        inp.value ? showNext() : hideNext();
      });
      inp.addEventListener('keydown', e => {
        if (e.key === 'Enter' && inp.value) elStepNext.click();
      });
    },
    validate() {
      const v = elStepArea.querySelector('input').value;
      if (!v) return false;
      [answers.year, answers.month, answers.day] = v.split('-').map(Number);
      return true;
    },
  },
  // ── 2: 성별 (클릭 즉시 다음 단계) ───────────────────
  {
    q: '성별을 선택해주세요.',
    render() {
      const wrap = document.createElement('div');
      wrap.className = 'gender-btns';
      ['남성', '여성'].forEach(label => {
        const btn = document.createElement('button');
        btn.className = 'gender-btn';
        btn.textContent = label;
        btn.addEventListener('click', () => {
          wrap.querySelectorAll('.gender-btn').forEach(b => b.classList.remove('selected'));
          btn.classList.add('selected');
          answers.gender = label;
          setTimeout(() => advanceStep(), 340);
        });
        wrap.appendChild(btn);
      });
      elStepArea.appendChild(wrap);
    },
    validate() {
      return !!answers.gender;
    },
  },
  // ── 3: 태어난 시 ──────────────────────────────────────
  {
    q: '태어난 시간을 선택해주세요.',
    render() {
      const sel = document.createElement('select');
      HOUR_OPTIONS.forEach(({ label, value }) => {
        const opt = document.createElement('option');
        opt.value = value === null ? '' : String(value);
        opt.textContent = label;
        sel.appendChild(opt);
      });
      elStepArea.appendChild(sel);
      setTimeout(() => sel.focus(), 60);
      showNext();
    },
    validate() {
      const v = elStepArea.querySelector('select').value;
      answers.hourBranchIdx = v === '' ? null : parseInt(v, 10);
      return true;
    },
  },
];

function startSteps() {
  currentStep = 0;
  answers.name = '';
  answers.gender = '';

  document.getElementById('stepScreen').classList.remove('hidden');
  renderStep(0);
}

function renderStep(i) {
  elStepQ.textContent = '';
  elStepArea.innerHTML = '';
  elStepNext.textContent = '→';
  elStepNext.classList.add('hidden');

  // 페이드 애니메이션 재트리거
  const box = document.querySelector('.step-box');
  box.style.animation = 'none';
  void box.offsetHeight;
  box.style.animation = '';

  STEPS[i].render();
}

function showNext() { elStepNext.classList.remove('hidden'); }
function hideNext() { elStepNext.classList.add('hidden'); }

function advanceStep() {
  if (!STEPS[currentStep].validate()) return;
  currentStep++;
  if (currentStep >= STEPS.length) {
    startAnalysis();
  } else {
    renderStep(currentStep);
  }
}

elStepNext.addEventListener('click', advanceStep);

// ══════════════════════════════════════════════════════════
//  분석 실행
// ══════════════════════════════════════════════════════════
function startAnalysis() {
  document.getElementById('stepScreen').classList.add('hidden');
  document.getElementById('loadingScreen').classList.remove('hidden');

  setTimeout(() => {
    const { pillars, libraryOk } = calcBazi(
      answers.year, answers.month, answers.day, answers.hourBranchIdx
    );
    const counts = countOH(pillars);
    const arch   = getArchetype(counts);

    const hourOpt   = HOUR_OPTIONS.find(o => o.value === answers.hourBranchIdx);
    const timeLabel = hourOpt
      ? (hourOpt.value === null ? '시간 모름' : hourOpt.label.split(' ')[0])
      : '시간 모름';
    const dateStr = `${answers.year}.${String(answers.month).padStart(2,'0')}.${String(answers.day).padStart(2,'0')} · ${answers.gender} · ${timeLabel}`;

    document.getElementById('libraryBadge').textContent = libraryOk ? '만세력 절기 기반' : '자체 계산';

    renderHero(arch, counts, answers.name, dateStr);
    renderPillars(pillars);
    renderEssence(arch, counts);
    renderCycle(arch, counts);
    renderOhDetail(counts);
    renderPungsu(arch, counts);

    // 상세 뷰 숨기고 더보기 버튼 초기화
    document.getElementById('detailSection').classList.add('hidden');
    const moreBtn = document.getElementById('moreBtn');
    moreBtn.style.display = '';
    moreBtn.onclick = () => {
      document.getElementById('detailSection').classList.remove('hidden');
      moreBtn.style.display = 'none';
      setTimeout(() => {
        document.getElementById('detailSection').scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 80);
    };

    document.getElementById('loadingScreen').classList.add('hidden');
    document.getElementById('resultScreen').classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, 1800);
}

// ══════════════════════════════════════════════════════════
//  사주 계산
// ══════════════════════════════════════════════════════════
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
    { label:'년주', ...yearGZ  },
    { label:'월주', ...monthGZ },
    { label:'일주', ...dayGZ   },
  ];

  if (hourBranchIdx !== null) {
    const starts = [0, 2, 4, 6, 8];
    const hi = (starts[dayGZ.g.idx % 5] + hourBranchIdx) % 10;
    const hg = GAN_ORDER[hi], hz = ZHI_ORDER[hourBranchIdx];
    pillars.push({ label:'시주', ganChar:hg, zhiChar:hz, g:GAN[hg], z:ZHI[hz] });
  }

  return { pillars, libraryOk };
}

function fallbackYear(y, m, d) {
  const yr = (m < 2 || (m === 2 && d < 4)) ? y - 1 : y;
  const g = GAN_ORDER[((yr - 4) % 10 + 10) % 10];
  const z = ZHI_ORDER[((yr - 4) % 12 + 12) % 12];
  return { ganChar:g, zhiChar:z, g:GAN[g], z:ZHI[z] };
}

function fallbackMonth(y, m, d, yStemIdx) {
  const cum = [0,31,59,90,120,151,181,212,243,273,304,334];
  const doy = cum[m - 1] + d;
  let bi;
  if      (doy >= 341) bi = 0;  else if (doy >= 311) bi = 11;
  else if (doy >= 281) bi = 10; else if (doy >= 251) bi = 9;
  else if (doy >= 219) bi = 8;  else if (doy >= 188) bi = 7;
  else if (doy >= 157) bi = 6;  else if (doy >= 126) bi = 5;
  else if (doy >= 95)  bi = 4;  else if (doy >= 65)  bi = 3;
  else if (doy >= 35)  bi = 2;  else if (doy >= 6)   bi = 1;
  else                 bi = 0;
  const si = ([2,4,6,8,0,2,4,6,8,0][yStemIdx] + (bi - 2 + 12) % 12) % 10;
  const g = GAN_ORDER[si], z = ZHI_ORDER[bi];
  return { ganChar:g, zhiChar:z, g:GAN[g], z:ZHI[z] };
}

function fallbackDay(y, m, d) {
  const a   = Math.floor((14 - m) / 12);
  const y2  = y + 4800 - a;
  const m2  = m + 12 * a - 3;
  const jdn = d + Math.floor((153 * m2 + 2) / 5) + 365 * y2
            + Math.floor(y2 / 4) - Math.floor(y2 / 100) + Math.floor(y2 / 400) - 32045;
  const idx = ((jdn - 2415021 + 10) % 60 + 60) % 60;
  const g = GAN_ORDER[idx % 10], z = ZHI_ORDER[idx % 12];
  return { ganChar:g, zhiChar:z, g:GAN[g], z:ZHI[z] };
}

// ── 오행 집계 + 아키타입 결정 ─────────────────────────────
function countOH(pillars) {
  const c = { 목:0, 화:0, 토:0, 금:0, 수:0 };
  pillars.forEach(p => { c[p.g.oh]++; c[p.z.oh]++; });
  return c;
}

function getArchetype(counts) {
  const order  = ['목','화','토','금','수'];
  const sorted = order.slice().sort((a, b) => counts[b] - counts[a]);
  const total  = Object.values(counts).reduce((a, b) => a + b, 0);
  const primary = sorted[0];
  const pCount  = counts[primary];

  if (pCount / total <= 0.28) return { ...BALANCED, primary: null, secondary: null };

  const secondaryKey = sorted[1];
  const sCount = counts[secondaryKey];
  const secondary = (sCount >= pCount * 0.65 && sCount > 0) ? secondaryKey : null;

  const base = { ...ARCHETYPES[primary].base, primary, secondary };

  if (secondary && ARCHETYPES[primary].with[secondary]) {
    const w = ARCHETYPES[primary].with[secondary];
    base.name     = w.name;
    base.en       = w.en;
    base.modifier = w.mod;
  }

  return base;
}

// ══════════════════════════════════════════════════════════
//  렌더 함수
// ══════════════════════════════════════════════════════════

// ── 히어로 (심플 첫 화면) ────────────────────────────────
function renderHero(arch, counts, name, dateStr) {
  const order = ['목','화','토','금','수'];
  const primaryColor = arch.primary ? OH_COLOR[arch.primary] : '#c9a84c';

  document.getElementById('ohHeroMeta').textContent = `${name}  ·  ${dateStr}`;

  const symEl = document.getElementById('ohHeroSym');
  symEl.textContent = arch.primary ? OH_SYM[arch.primary] : '☯';
  symEl.style.color = primaryColor;
  symEl.style.filter =
    `drop-shadow(0 0 36px ${primaryColor}cc) drop-shadow(0 0 80px ${primaryColor}55)`;

  document.getElementById('ohHeroPalette').innerHTML = order
    .filter(k => counts[k] > 0)
    .map(k => `<div class="oh-palette-seg" style="flex:${counts[k]};background:${OH_COLOR[k]};opacity:.8"></div>`)
    .join('');

  // 첫 단락만 간결하게
  const firstPara = arch.essence.split('\n\n')[0];
  document.getElementById('ohHeroTagline').textContent = firstPara;

  // 속성 타이틀
  const ohName = arch.primary ? OH_NAME[arch.primary] : '오행 균형';
  document.getElementById('ohHeroTitle').innerHTML =
    `당신의 속성은 <strong style="color:${primaryColor}">${ohName}</strong> 입니다`;

  document.getElementById('ohHeroKeys').innerHTML = arch.keywords
    .map(k => `<span class="oh-hero-key" style="color:${primaryColor};border-color:${primaryColor}45;background:${primaryColor}0c">${k}</span>`)
    .join('');
}

// 상생: 목→화→토→금→수→목  /  상극: 목克토, 화克금, 토克수, 금克목, 수克화
const CYCLE_REL = {
  목: { 생from:'수', 생to:'화', beats:'토', losesTo:'금' },
  화: { 생from:'목', 생to:'토', beats:'금', losesTo:'수' },
  토: { 생from:'화', 생to:'금', beats:'수', losesTo:'목' },
  금: { 생from:'토', 생to:'수', beats:'목', losesTo:'화' },
  수: { 생from:'금', 생to:'목', beats:'화', losesTo:'토' },
};

function renderCycle(arch, counts) {
  const primary  = arch.primary || null;
  const order    = ['목','화','토','금','수'];
  const maxCount = Math.max(...order.map(k => counts[k] || 0), 1);
  const cx = 130, cy = 130, rp = 85, nodeR = 20;

  const pts = order.map((_, i) => {
    const a = (i * 72 - 90) * Math.PI / 180;
    return { x: cx + rp * Math.cos(a), y: cy + rp * Math.sin(a) };
  });

  function drawEdges() {
    let out = '';
    order.forEach((_, i) => {
      [[(i+1)%5,'mG','rgba(80,170,80,0.45)','1.5',''],
       [(i+2)%5,'mR','rgba(205,70,70,0.38)','1.1','5,3']
      ].forEach(([ti,mid,stroke,sw,dash]) => {
        const f=pts[i], t=pts[ti];
        const dx=t.x-f.x, dy=t.y-f.y, d=Math.sqrt(dx*dx+dy*dy), nx=dx/d, ny=dy/d;
        out += `<line x1="${(f.x+nx*(nodeR+2)).toFixed(1)}" y1="${(f.y+ny*(nodeR+2)).toFixed(1)}" x2="${(t.x-nx*(nodeR+9)).toFixed(1)}" y2="${(t.y-ny*(nodeR+9)).toFixed(1)}" stroke="${stroke}" stroke-width="${sw}" ${dash?`stroke-dasharray="${dash}"`:''}  marker-end="url(#${mid})"/>`;
      });
    });
    return out;
  }

  let svg = `<svg viewBox="-20 -20 300 300" xmlns="http://www.w3.org/2000/svg" class="cycle-svg" style="width:100%;max-width:260px;height:auto;overflow:visible;display:block;margin:0 auto">
    <defs>
      <marker id="mG" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,1 L6,3.5 L0,6 Z" fill="rgba(80,170,80,0.88)"/></marker>
      <marker id="mR" markerWidth="7" markerHeight="7" refX="5" refY="3.5" orient="auto"><path d="M0,1 L6,3.5 L0,6 Z" fill="rgba(205,70,70,0.88)"/></marker>
    </defs>`;

  svg += drawEdges();

  order.forEach((k, i) => {
    const { x, y } = pts[i];
    const col = OH_COLOR[k];
    const cnt = counts[k] || 0;
    const t   = cnt / maxCount;
    const op  = cnt === 0 ? 0.18 : 0.32 + t * 0.68;
    const isp = k === primary;

    if (cnt > 0) {
      svg += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(nodeR+14+t*18).toFixed(1)}" fill="${col}" opacity="${(0.04+t*0.08).toFixed(2)}"/>`;
      svg += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(nodeR+6+t*10).toFixed(1)}"  fill="${col}" opacity="${(0.08+t*0.18).toFixed(2)}"/>`;
    }
    if (isp) svg += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${nodeR+4}" fill="none" stroke="${col}" stroke-width="1.8" opacity="0.7"/>`;
    svg += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${nodeR}" fill="${col}" opacity="${op.toFixed(2)}"/>`;
    svg += `<text x="${x.toFixed(1)}" y="${(y+0.5).toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-size="13" font-weight="700" fill="white" opacity="${Math.max(0.5,op).toFixed(2)}">${OH_SYM[k]}</text>`;
  });

  svg += `</svg>`;

  // 범례
  const legend = `<div class="cycle-legend">
    <span class="cycle-leg-item"><span class="cycle-leg-line cycle-leg-green"></span>상생 (生) — 앞이 뒤를 키운다</span>
    <span class="cycle-leg-item"><span class="cycle-leg-line cycle-leg-red"></span>상극 (克) — 앞이 뒤를 이긴다</span>
  </div>`;

  // 내 오행 관계 요약
  let summary = '';
  if (primary && CYCLE_REL[primary]) {
    const rel = CYCLE_REL[primary];
    const pc  = OH_COLOR[primary];
    summary = `<div class="cycle-summary">
      <div class="cycle-sum-title" style="color:${pc}">${OH_NAME[primary]} 의 관계</div>
      <div class="cycle-sum-grid">
        <div class="cycle-sum-item">
          <div class="cycle-sum-label" style="color:rgba(80,170,80,0.9)">나를 생해주는 것</div>
          <div class="cycle-sum-val"><span class="cycle-chip" style="background:${OH_COLOR[rel.생from]}">${OH_SYM[rel.생from]}</span> ${OH_NAME[rel.생from]}</div>
        </div>
        <div class="cycle-sum-item">
          <div class="cycle-sum-label" style="color:rgba(80,170,80,0.9)">내가 생해주는 것</div>
          <div class="cycle-sum-val"><span class="cycle-chip" style="background:${OH_COLOR[rel.생to]}">${OH_SYM[rel.생to]}</span> ${OH_NAME[rel.생to]}</div>
        </div>
        <div class="cycle-sum-item">
          <div class="cycle-sum-label" style="color:rgba(205,70,70,0.9)">내가 이기는 것</div>
          <div class="cycle-sum-val"><span class="cycle-chip" style="background:${OH_COLOR[rel.beats]}">${OH_SYM[rel.beats]}</span> ${OH_NAME[rel.beats]}</div>
        </div>
        <div class="cycle-sum-item">
          <div class="cycle-sum-label" style="color:rgba(205,70,70,0.9)">나를 이기는 것</div>
          <div class="cycle-sum-val"><span class="cycle-chip" style="background:${OH_COLOR[rel.losesTo]}">${OH_SYM[rel.losesTo]}</span> ${OH_NAME[rel.losesTo]}</div>
        </div>
      </div>
    </div>`;
  }

  document.getElementById('ohCycleCard').innerHTML = svg + legend + summary;
}

const OH_BOOST = {
  목: {
    sym: '木', col: '초록·청록 계열',
    items: '관엽식물, 나무 소재 가구, 세로로 뻗은 조형물, 대나무 소품',
    meaning: '성장과 시작의 기운입니다. 이 기운이 부족하면 새로운 것을 시작하거나 변화를 이끄는 힘이 약해질 수 있습니다.',
    howto: '창가에 식물을 두거나 나무 소재 가구를 배치하면 목의 기운이 살아납니다. 초록·청록 계열의 쿠션, 커튼 포인트도 효과적입니다.',
    envDesc: '숲·공원 밀집, 나무 외장 건물 주변, 목조 건물이 많은 지역',
  },
  화: {
    sym: '火', col: '붉은·주황·밝은 노랑 계열',
    items: '따뜻한 간접 조명, 캔들, 붉은 포인트 소품, 주황색 직물',
    meaning: '열정과 표현의 기운입니다. 이 기운이 부족하면 에너지가 떨어지거나 감정을 표현하는 것이 낯설게 느껴질 수 있습니다.',
    howto: '공간에 따뜻한 색온도의 조명을 더하거나, 붉은색·주황색 포인트 소품을 배치해보세요. 캔들이나 스탠드 조명도 화의 기운을 끌어올립니다.',
    envDesc: '남향 직사광선이 강한 곳, 뾰족한 고층 건물이 밀집한 도심',
  },
  토: {
    sym: '土', col: '황토·베이지·갈색 계열',
    items: '도자기·석재 소품, 황토색 쿠션, 무게감 있는 오브제, 린넨·삼베 소재',
    meaning: '안정과 신뢰의 기운입니다. 이 기운이 부족하면 중심이 잘 흔들리거나, 한 곳에 정착하는 것이 불편하게 느껴질 수 있습니다.',
    howto: '황토색·베이지 계열의 섬유·도자기·석재 소품으로 공간의 무게 중심을 잡아주세요. 낮고 넓게 퍼진 가구 배치도 토의 안정 에너지를 강화합니다.',
    envDesc: '낮은 구릉지, 오래된 주거 밀집지, 황토·흙길이 많은 지역',
  },
  금: {
    sym: '金', col: '흰색·은색·회색 계열',
    items: '금속 소재 오브제, 스테인리스 소품, 유리·크리스탈 소재, 반구형 형태',
    meaning: '결단과 원칙의 기운입니다. 이 기운이 부족하면 선택의 순간에 망설임이 길어지거나, 자신만의 기준을 세우기 어려울 수 있습니다.',
    howto: '깔끔하게 정돈된 공간 자체가 금의 기운을 높입니다. 금속·유리 소재 오브제, 흰색·회색 계열 소품으로 불필요한 것을 줄이고 정밀한 감각을 더해보세요.',
    envDesc: '고층 유리·금속 커튼월 건물이 밀집한 도심',
  },
  수: {
    sym: '水', col: '남색·청색·검정 계열',
    items: '어항·수반, 유리 소재 오브제, 물결·곡선 형태 소품, 짙은 남색 패브릭',
    meaning: '지혜와 통찰의 기운입니다. 이 기운이 부족하면 직관보다 표면적인 것에 집중하게 되거나, 깊이 사색하는 시간이 줄어들 수 있습니다.',
    howto: '수반·어항처럼 물이 보이거나 들리는 요소를 공간에 더하세요. 남색·청색 계열의 패브릭이나 유리 소재 오브제도 수의 기운을 끌어들입니다.',
    envDesc: '강변·하천 근처, 저지대, 습도 높은 환경',
  },
};
// 환경의 기운을 극(克)하는 오행 → 그것으로 보완
const ENV_COUNTER = { 화:'수', 목:'금', 토:'목', 금:'화', 수:'토' };

function genBoostText(counts) {
  const order   = ['목','화','토','금','수'];
  const absent  = order.filter(k => (counts[k] || 0) === 0);
  const low     = order.filter(k => (counts[k] || 0) === 1);
  const lacking = absent.length ? absent : low;

  let html = '';

  // ① 부족한 오행 – 의미 + 보완법
  if (absent.length || low.length) {
    const label = absent.length ? '없습니다' : '약합니다';
    html += `<span class="boost-lead">사주에서 <strong>${lacking.map(k=>`${OH_BOOST[k].sym} ${k}`).join(' · ')}</strong>의 기운이 ${label}.</span>`;
    html += lacking.map(k => {
      const b = OH_BOOST[k];
      return `
        <div class="boost-block">
          <div class="boost-block-title"><span class="boost-chip" style="background:${OH_COLOR[k]}">${b.sym}</span> ${OH_NAME[k]} 기운 보완</div>
          <div class="boost-block-body">
            <p>${b.meaning}</p>
            <p><em>공간 적용 방법</em><br>${b.howto}</p>
            <p><em>색상</em> ${b.col} &nbsp;|&nbsp; <em>소품</em> ${b.items}</p>
          </div>
        </div>`;
    }).join('');
  } else {
    html += `<span class="boost-lead">오행이 고르게 분포되어 있어 특별히 부족한 기운이 없습니다. 아래 환경별 가이드를 참고해 균형을 유지하세요.</span>`;
  }

  // ② 환경별 대응
  const envKeys = ['화','목','토','금','수'];
  html += `<div class="boost-env-title">주변 환경이 특정 기운에 치우칠 때</div>`;
  html += envKeys.map(envKey => {
    const cKey = ENV_COUNTER[envKey];
    const b    = OH_BOOST[cKey];
    const eCol = OH_COLOR[envKey];
    const remedy = `${b.col}, ${b.items.split(',').slice(0,2).join(', ')} 등으로 보완`;
    return `<div class="boost-env-item">
      <div class="boost-env-header">
        <span class="boost-chip" style="background:${eCol}">${OH_BOOST[envKey].sym}</span>
        <span class="boost-env-when">${OH_NAME[envKey]}이 많은 곳일때</span>
      </div>
      <div class="boost-env-desc">${OH_BOOST[envKey].envDesc}</div>
      <div class="boost-env-remedy">${remedy}</div>
    </div>`;
  }).join('');

  return html;
}

function renderPungsu(arch, counts) {
  const key   = arch.primary || 'balanced';
  const data  = PUNGSU[key] || PUNGSU.balanced;
  const color = arch.primary ? OH_COLOR[arch.primary] : '#c9a84c';
  const staticRows = data.rows.slice(0, -1); // 기운 보완 행 제외

  document.getElementById('pungsuContent').innerHTML = `
    <p class="pungsu-summary">${data.summary}</p>
    <div class="pungsu-grid">
      ${staticRows.map(r => `
        <div class="pungsu-row">
          <div class="pungsu-label" style="color:${color}">${r.label}</div>
          <div class="pungsu-text">${r.text}</div>
        </div>`).join('')}
      <div class="pungsu-row pungsu-boost-row">
        <div class="pungsu-label" style="color:#aaa">기운 보완</div>
        <div class="pungsu-text pungsu-boost-body">${genBoostText(counts)}</div>
      </div>
    </div>`;
}

function renderPillars(pillars) {
  const t = document.getElementById('pillarTable');
  t.style.gridTemplateColumns = `repeat(${pillars.length}, 1fr)`;
  t.innerHTML = pillars.map(p => `
    <div class="pillar-col">
      <div class="pillar-label">${p.label}</div>
      <div class="p-char"   style="color:${OH_COLOR[p.g.oh]}">${p.ganChar}</div>
      <div class="p-hangul">${p.g.ko}</div>
      <div class="p-oh"    style="color:${OH_COLOR[p.g.oh]}">${OH_SYM[p.g.oh]}</div>
      <hr class="p-divider"/>
      <div class="p-char"   style="color:${OH_COLOR[p.z.oh]}">${p.zhiChar}</div>
      <div class="p-hangul">${p.z.ko}</div>
      <div class="p-oh"    style="color:${OH_COLOR[p.z.oh]}">${OH_SYM[p.z.oh]}</div>
    </div>`).join('');
}


function renderOhDetail(counts) {
  const order = ['목','화','토','금','수'];
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  const max   = Math.max(...Object.values(counts));

  function getLevel(count) {
    if (count === 0) return '없음';
    if (count === 1) return '약함';
    if (count === 2) return '보통';
    if (count <= 4)  return '강함';
    return '매우강함';
  }

  function getLevelLabel(count) {
    if (count === 0) return '없음';
    if (count === 1) return '약함';
    if (count === 2) return '보통';
    if (count <= 4)  return '강함';
    return '매우 강함';
  }

  document.getElementById('ohDetailList').innerHTML = order.map(k => {
    const d     = OH_DETAIL[k];
    const level = getLevel(counts[k]);
    const label = getLevelLabel(counts[k]);
    const color = OH_COLOR[k];
    const pct   = max > 0 ? (counts[k] / max * 100) : 0;
    const faded = counts[k] === 0;

    return `
      <div class="oh-detail-item" style="opacity:${faded ? 0.45 : 1}">
        <div class="oh-detail-header">
          <span class="oh-detail-sym" style="color:${color}">${d.sym}</span>
          <span class="oh-detail-name" style="color:${color}">${OH_NAME[k]}</span>
          <span class="oh-detail-role">${d.role}</span>
          <span class="oh-detail-badge" style="color:${color};border-color:${color}40;background:${color}0d">${label}</span>
        </div>
        <div class="oh-detail-track">
          <div class="oh-detail-fill" style="width:${pct}%;background:${color}"></div>
        </div>
        <div class="oh-detail-desc">${d.desc[level]}</div>
      </div>`;
  }).join('');
}

function renderEssence(arch, counts) {
  const order = ['목','화','토','금','수'];
  const max   = Math.max(...Object.values(counts));

  let html = '';
  if (arch.modifier) {
    html += `<p style="font-size:.82rem;color:var(--muted);font-style:italic;border-left:2px solid var(--border);padding-left:12px;margin-bottom:20px">${arch.modifier}</p>`;
  }
  arch.essence.split('\n\n').forEach(para => { html += `<p>${para}</p>`; });
  document.getElementById('essenceText').innerHTML = html;

  // 오행 바 — 0개 항목은 낮은 투명도로 표시 (없음 라벨 X)
  document.getElementById('ohMiniBars').innerHTML = order.map(k => {
    const pct     = max > 0 ? (counts[k] / max * 100) : 0;
    const opacity = counts[k] === 0 ? 0.28 : 1;
    return `
      <div class="oh-mini-row" style="opacity:${opacity}">
        <div class="oh-mini-name" style="color:${OH_COLOR[k]}">${OH_NAME[k]}</div>
        <div class="oh-mini-track">
          <div class="oh-mini-fill" style="width:${pct}%;background:${OH_COLOR[k]}"></div>
        </div>
        <div class="oh-mini-count">${counts[k]}</div>
      </div>`;
  }).join('');
}

// ══════════════════════════════════════════════════════════
//  리셋
// ══════════════════════════════════════════════════════════
document.getElementById('resetBtn').addEventListener('click', () => {
  document.getElementById('resultScreen').classList.add('hidden');
  history.replaceState(null, '', location.pathname);
  startSteps();
});

// ══════════════════════════════════════════════════════════
//  공유
// ══════════════════════════════════════════════════════════
document.getElementById('shareBtn').addEventListener('click', () => {
  const p = answers;
  const params = new URLSearchParams({
    n: p.name,
    y: p.year,
    m: p.month,
    d: p.day,
    g: p.gender,
    ...(p.hourBranchIdx !== null ? { h: p.hourBranchIdx } : {}),
  });
  const url = `${location.origin}${location.pathname}?${params}`;

  if (navigator.share) {
    navigator.share({ title: '나의 속성', text: `${p.name}의 오행 속성을 확인해보세요`, url });
  } else {
    navigator.clipboard.writeText(url).then(() => {
      const toast = document.getElementById('shareToast');
      toast.classList.remove('hidden');
      setTimeout(() => toast.classList.add('hidden'), 2000);
    });
  }
});

// ══════════════════════════════════════════════════════════
//  URL 파라미터로 자동 실행
// ══════════════════════════════════════════════════════════
function tryAutoRun() {
  const p = new URLSearchParams(location.search);
  if (!p.get('n') || !p.get('y')) return false;
  answers.name          = p.get('n');
  answers.year          = +p.get('y');
  answers.month         = +p.get('m');
  answers.day           = +p.get('d');
  answers.gender        = p.get('g');
  answers.hourBranchIdx = p.has('h') ? +p.get('h') : null;
  document.getElementById('intro').classList.add('hidden');
  document.getElementById('loadingScreen').classList.remove('hidden');
  startAnalysis();
  return true;
}

// ══════════════════════════════════════════════════════════
//  초기화
// ══════════════════════════════════════════════════════════
initCanvas();
if (!tryAutoRun()) initIntro();
