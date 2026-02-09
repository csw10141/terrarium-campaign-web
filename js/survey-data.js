// 가드너 설문 데이터 정의
// 모든 문항은 사업 1단계 리서치용

export const PHASES = {
  phase1: {
    id: 'phase1',
    title: '1차 탐색',
    subtitle: '3분이면 충분해요',
    icon: '1',
    description: '길거리에서 바로 쓰는 빠른 질문',
    estimatedTime: '약 3분',
    questions: [
      // ── 리서치 질문 ──
      {
        id: 'r1_rhythm',
        category: '지금 내 상태',
        type: 'text',
        question: '요즘 내 생활 리듬은 어떤 쪽에 가까운가요?',
        options: [
          '대체로 괜찮다',
          '들쑥날쑥하지만 버티고 있다',
          '무너진 느낌이 있다'
        ]
      },
      {
        id: 'r1_reflect',
        category: '지금 내 상태',
        type: 'text',
        question: '하루를 돌아보는 시간을 거의 가지지 못한다고 느끼나요?',
        options: [
          '그렇다',
          '가끔 그렇다',
          '아니다'
        ]
      },
      {
        id: 'r1_app_exp',
        category: '앱 경험',
        type: 'text',
        question: '건강·습관·자기관리 앱을 써본 적 있나요?',
        options: [
          '있다',
          '없다'
        ]
      },
      {
        id: 'r1_app_quit',
        category: '앱 경험',
        type: 'text',
        question: '(써본 적 있다면) 그만두게 된 이유와 가장 가까운 것은?',
        options: [
          '귀찮아졌다',
          '효과를 잘 못 느꼈다',
          '나만 못 지키는 느낌이 들었다',
          '재미·보상이 부족했다'
        ],
        optional: true
      },
      {
        id: 'r1_talk_style',
        category: '친근감 & 개입 허용도',
        type: 'text',
        question: '앱이 나에게 말을 건다면 어떤 방식이 덜 부담스러울까요?',
        options: [
          '그냥 기록만',
          '짧은 질문 ("오늘은 어땠어?")',
          '캐릭터가 대신 말해줌'
        ]
      },
      {
        id: 'r1_noti',
        category: '친근감 & 개입 허용도',
        type: 'text',
        question: '앱 알림이 오면 보통 어떤 느낌이 드나요?',
        options: [
          '도움이 된다',
          '무시하게 된다',
          '부담된다'
        ]
      },
      // ── 시장 니즈 질문 ──
      {
        id: 'm1_disrupt',
        category: '시장 크기',
        type: 'text',
        question: '최근 3개월 내, 생활 리듬이 무너졌다고 느낀 적이 있나요?',
        options: [
          '자주 있다',
          '가끔 있다',
          '거의 없다'
        ]
      },
      {
        id: 'm1_gap',
        category: '시장 공백',
        type: 'text',
        question: '생활·마음 관리를 위해 \'의도적으로\' 아무것도 안 하고 있는 상태에 가깝나요?',
        options: [
          '그렇다 (어차피 못 지킬 것 같아서)',
          '부분적으로만 한다',
          '아니다 (잘 관리 중)'
        ]
      },
      {
        id: 'm1_existing',
        category: '시장 한계',
        type: 'text',
        question: '기존 자기관리 앱이나 콘텐츠는 나에게 어떤 느낌에 가까웠나요?',
        options: [
          '의지는 요구하지만 현실은 고려하지 않음',
          '시작은 쉬운데 지속이 어려움',
          '내 상태를 이해해주지 않음'
        ]
      },
      // ── 이미지 선택 세트 ──
      {
        id: 'img_character',
        category: '캐릭터 친밀도',
        type: 'image',
        question: '가장 부담 없이 계속 볼 수 있는 화면은?',
        options: [
          {
            id: 'A',
            label: '2D 귀여운 캐릭터',
            description: '동글, 단순 표정, 파스텔',
            svgType: 'char-2d'
          },
          {
            id: 'B',
            label: '3D 아바타',
            description: '부드러운 질감, 리얼감',
            svgType: 'char-3d'
          },
          {
            id: 'C',
            label: '캐릭터 없음',
            description: '미니멀 UI, 텍스트 중심',
            svgType: 'char-minimal'
          }
        ]
      },
      {
        id: 'img_interaction',
        category: '말 거는 방식',
        type: 'image',
        question: '이 중 가장 거슬리지 않은 방식은?',
        options: [
          {
            id: 'A',
            label: '대화형',
            description: '캐릭터가 말풍선으로 질문',
            svgType: 'talk-bubble'
          },
          {
            id: 'B',
            label: '체크리스트',
            description: '감정 개입 없는 기능 중심',
            svgType: 'talk-checklist'
          },
          {
            id: 'C',
            label: '리워드 알림',
            description: '코인·포인트 시각화',
            svgType: 'talk-reward'
          }
        ]
      },
      {
        id: 'img_relation',
        category: '관계 거리감',
        type: 'image',
        question: '지금 나에게 가장 편한 모습은?',
        options: [
          {
            id: 'A',
            label: '1:1 동행',
            description: '나와 작은 캐릭터만',
            svgType: 'rel-companion'
          },
          {
            id: 'B',
            label: '소규모 그룹',
            description: '익명, 느슨한 연결',
            svgType: 'rel-group'
          },
          {
            id: 'C',
            label: '혼자',
            description: '나만의 공간',
            svgType: 'rel-alone'
          }
        ]
      }
    ]
  },

  phase2: {
    id: 'phase2',
    title: '2차 심층',
    subtitle: '조금 더 깊이',
    icon: '2',
    description: '감정 구조를 이해하는 인터뷰',
    estimatedTime: '약 5분',
    questions: [
      // ── 실패 경험의 감정 구조 ──
      {
        id: 'r2_fail_emotion',
        category: '감정 구조',
        type: 'text',
        question: '습관이 깨졌을 때 가장 먼저 드는 감정은 무엇인가요?',
        options: [
          '짜증',
          '자책',
          '체념'
        ]
      },
      {
        id: 'r2_no_restart',
        category: '감정 구조',
        type: 'text',
        question: '다시 시작하지 않게 되는 이유는 뭐라고 느끼세요?',
        options: [
          '이미 늦은 느낌',
          '또 실패할 것 같아서',
          '에너지가 없어서'
        ]
      },
      // ── '관리'에 대한 저항 ──
      {
        id: 'r2_self_mgmt',
        category: '관리 인식',
        type: 'text',
        question: '\'자기관리\'라는 말을 들으면 어떤 느낌이 더 가까운가요?',
        options: [
          '해야 할 숙제',
          '나랑 먼 이야기',
          '나를 돌보는 말'
        ]
      },
      {
        id: 'r2_check',
        category: '관리 인식',
        type: 'text',
        question: '누군가 나를 체크하거나 물어보는 건 어떤가요?',
        options: [
          '도움이 된다',
          '부담된다',
          '상황에 따라 다르다'
        ]
      },
      // ── 관계 욕구 ──
      {
        id: 'r2_similar',
        category: '관계 방향',
        type: 'text',
        question: '나와 비슷한 상태의 사람을 보면 어떤 감정이 드나요?',
        options: [
          '위로',
          '비교',
          '무관심'
        ]
      },
      {
        id: 'r2_loose_conn',
        category: '관계 방향',
        type: 'text',
        question: '혼자보다 \'느슨한 연결\'이 있다면 도움이 될까요?',
        options: [
          '그렇다',
          '오히려 부담',
          '잘 모르겠다'
        ]
      },
      // ── 시장 니즈 심층 ──
      {
        id: 'm2_fail_reason',
        category: '개발 근거',
        type: 'text',
        question: '습관이 무너질 때, 가장 큰 이유는 무엇이라 느끼나요?',
        options: [
          '생활 에너지 부족',
          '정서적 지침 (번아웃, 무기력)',
          '혼자서 유지해야 한다는 부담'
        ]
      },
      {
        id: 'm2_well_manage',
        category: '개발 근거',
        type: 'text',
        question: '처음부터 \'잘 관리하라\'는 방식은 어떤가요?',
        options: [
          '부담스럽다',
          '시도해도 오래 못 간다',
          '지금 상태와 안 맞는다'
        ]
      },
      {
        id: 'm2_staged',
        category: '개발 근거',
        type: 'text',
        question: '\'회복 → 인식 → 변화\'처럼 단계가 있다면 더 수용 가능할까요?',
        options: [
          '그렇다',
          '잘 모르겠다',
          '크게 상관없다'
        ]
      },
      {
        id: 'm2_group_conn',
        category: '확장 가능성',
        type: 'text',
        question: '나와 비슷한 상태의 사람들과 느슨하게 연결된다면?',
        options: [
          '정서적으로 도움이 될 것 같다',
          '오히려 부담',
          '상황에 따라 다름'
        ]
      }
    ]
  },

  phase3: {
    id: 'phase3',
    title: '3차 피드백',
    subtitle: '마지막 한 걸음',
    icon: '3',
    description: '참여 의사 & 연락처',
    estimatedTime: '약 2분',
    questions: [
      // ── 참여 의사 ──
      {
        id: 'r3_interest',
        category: '참여 의사',
        type: 'text',
        question: '이런 주제의 앱이나 프로젝트가 있다면?',
        options: [
          '한 번 써보고 싶다',
          '인터뷰 정도는 가능',
          '관심 없다'
        ]
      },
      {
        id: 'r3_motive',
        category: '참여 동기',
        type: 'text',
        question: '참여한다면 가장 끌리는 이유는 무엇일까요?',
        options: [
          '나를 돌아보는 계기',
          '소소한 보상',
          '혼자가 아니라는 느낌'
        ]
      },
      {
        id: 'r3_reward',
        category: '혜택',
        type: 'text',
        question: '추후 짧은 인터뷰나 테스트에 참여할 경우 제공되면 좋은 것은?',
        options: [
          '소액 리워드',
          '체험 강의 / 워크숍',
          '결과 리포트 (내 상태 요약)'
        ]
      },
      // ── 시장 니즈 피드백 ──
      {
        id: 'm3_miss',
        category: '수요 지속성',
        type: 'text',
        question: '이런 주제의 서비스가 \'없어지면\' 아쉬울 것 같나요?',
        options: [
          '그렇다',
          '가끔 생각날 듯',
          '크게 상관없다'
        ]
      },
      {
        id: 'm3_sustain',
        category: '지속 동기',
        type: 'text',
        question: '참여의 동기가 된다면 더 유지될 수 있는 것은?',
        options: [
          '소액 리워드',
          '나의 상태에 대한 피드백',
          '함께하고 있다는 느낌'
        ]
      },
      {
        id: 'm3_beta',
        category: '재연락',
        type: 'text',
        question: '추후 테스트나 인터뷰 요청 시 참여 의향은?',
        options: [
          '있다 (연락 가능)',
          '조건부 가능',
          '없다'
        ]
      },
      // ── 연락처 ──
      {
        id: 'contact',
        category: '연락처',
        type: 'contact',
        question: '연락 가능한 수단을 선택해 주세요.',
        options: [
          '전화',
          '문자',
          '카카오톡'
        ]
      }
    ]
  }
};

export function getPhase(phaseId) {
  return PHASES[phaseId] || null;
}

export function getPhaseList() {
  return Object.values(PHASES).map(p => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    icon: p.icon,
    description: p.description,
    estimatedTime: p.estimatedTime,
    questionCount: p.questions.length
  }));
}
