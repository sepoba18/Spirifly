// Traducciones de los nodos data-tutorial, en el orden de la plantilla.
const TUTORIAL_I18N = {
 en: [
 'Spirifly','Quick guide','Step 1 of 6','×',
 '1. Welcome','2. Characters & weapons','3. Daily farming','4. Inventory','5. Wishes & pity','6. Accounts & cloud',
 'Your planning toolkit','Welcome to Spirifly!',
 'Spirifly helps you plan your progress and resin in ','Genshin Impact','. Changes are saved in this browser, with optional Google Drive backups.',
 'Character planning','Choose characters and weapons and set your own level and talent goals.',
 'Daily farming','Check available domains and estimate your resin needs.',
 '5★ pity tracker','Check soft pity, hard pity and Capturing Radiance using your wish history.',
 'Multiple accounts','Manage separate accounts with backups to your own Google Drive.',
 'Characters & weapons','Plan your ascensions and talents',
 'Set current and target levels for characters and weapons. Spirifly calculates the gems, talent books, boss materials and Mora you still need.',
 'Furina','Hydro 5★','Lv. 1/20 → 90/90 • Talents: 1/1/1 → 9/10/10',
 'Resin estimate','Talent books','Boss materials: 46','Local specialties: 168','Mora',
 'Smart farming','Organize your resin and domain schedule',
 'Check the weekly domain schedule and the materials needed by your active plans. Filter by day to plan ahead.',
 'Current resin: 160 / 200','Full at 18:42 (~5h 20m)',
 'Talent domain (Tuesday / Friday / Sunday)','Available today • Recommended for your active plans','20 Resin',
 'Your inventory','Count the materials you already own',
 'Record your materials in ','Inventory','. Spirifly subtracts them from your plans to calculate what you still need.',
 'Only what is missing','If you need 46 boss materials and own 20, you only need 26 more.',
 'Alchemy','Account for 3-to-1 crafting of gems and talent books where applicable.',
 'Save resin','Watch your estimated resin cost decrease as you collect materials.',
 'Wish counter','Track 5★ pity and guarantees',
 'Import wishes using the PowerShell script on PC or a compatible Excel / JSON file (.xlsx, .json). You can read this guide on a phone too.',
 'Character event banner','Pity 74 (Soft pity)','Guaranteed','Capturing Radiance','Epitomized Path (1 point)','1,179 recorded wishes',
 'Accounts & Google Drive','Separate progress and cloud backups',
 'Playing on several accounts? Each UID keeps its own characters, inventory, resin and wish history.',
 'Your accounts:','Main account (UID: 600000000)','Second account (UID: 700000000)','+ Add account',
 'Cloud sync: ','Connect your account in ','Sync',' to back up your data to your own Google Drive and keep your devices up to date.',
 'Skip guide','← Back','Next →','Get started!'
 ],
 pt: [
 'Spirifly','Guia rápido','Etapa 1 de 6','×',
 '1. Boas-vindas','2. Personagens e armas','3. Farm diário','4. Inventário','5. Orações e pity','6. Contas e nuvem',
 'Suas ferramentas de planejamento','Boas-vindas ao Spirifly!',
 'O Spirifly ajuda a planejar seu progresso e sua resina em ','Genshin Impact','. As alterações são salvas neste navegador, com backup opcional no Google Drive.',
 'Planejamento de personagens','Escolha personagens e armas e defina metas de nível e talentos.',
 'Farm diário','Confira os domínios disponíveis e estime a resina necessária.',
 'Contador de pity 5★','Consulte soft pity, hard pity e Captura da Radiância usando seu histórico.',
 'Várias contas','Gerencie contas separadas com backup no seu próprio Google Drive.',
 'Personagens e armas','Planeje suas ascensões e talentos',
 'Defina os níveis atuais e desejados dos personagens e armas. O Spirifly calcula as gemas, livros de talento, materiais de chefe e Mora que faltam.',
 'Furina','Hydro 5★','Nv. 1/20 → 90/90 • Talentos: 1/1/1 → 9/10/10',
 'Estimativa de resina','Livros de talento','Materiais de chefe: 46','Especialidades locais: 168','Mora',
 'Farm inteligente','Organize sua resina e seus domínios',
 'Confira o calendário semanal dos domínios e os materiais dos seus planos ativos. Filtre por dia para planejar suas sessões.',
 'Resina atual: 160 / 200','Completa às 18:42 (~5h 20m)',
 'Domínio de talentos (terça / sexta / domingo)','Disponível hoje • Recomendado para seus planos ativos','20 de resina',
 'Seu inventário','Desconte os materiais que você já tem',
 'Registre seus materiais em ','Inventário','. O Spirifly desconta esses materiais dos seus planos para calcular o que falta.',
 'Apenas o que falta','Se precisa de 46 materiais de chefe e já tem 20, faltam apenas 26.',
 'Alquimia','Considere a síntese de gemas e livros na proporção de 3 para 1 quando aplicável.',
 'Economia de resina','Veja a estimativa de resina diminuir à medida que coleta materiais.',
 'Contador de orações','Acompanhe o pity 5★ e suas garantias',
 'Importe orações com o script de PowerShell no PC ou com um arquivo compatível de Excel / JSON (.xlsx, .json). O guia também funciona no celular.',
 'Banner de personagem','Pity 74 (Soft pity)','Garantido','Captura da Radiância','Caminho Divino (1 ponto)','1.179 orações registradas',
 'Contas e Google Drive','Progresso separado e backup na nuvem',
 'Joga em várias contas? Cada UID tem seus próprios personagens, inventário, resina e histórico de orações.',
 'Suas contas:','Conta principal (UID: 600000000)','Conta secundária (UID: 700000000)','+ Adicionar conta',
 'Sincronização na nuvem: ','Conecte sua conta em ','Sincronização',' para fazer backup no seu próprio Google Drive e manter seus dispositivos atualizados.',
 'Pular guia','← Anterior','Próximo →','Começar!'
 ],
 ja: [
 'Spirifly','クイックガイド','1 / 6','×',
 '1. ようこそ','2. キャラと武器','3. 日々の周回','4. 所持素材','5. 祈願と天井','6. アカウントと同期',
 '育成計画ツール','Spiriflyへようこそ！',
 'Spiriflyは','原神','の育成と樹脂の計画に役立つツールです。変更はこのブラウザに保存され、必要に応じてGoogle Driveにもバックアップできます。',
 '育成計画','キャラや武器を選び、レベルと天賦の目標を設定できます。',
 '日々の周回','開放中の秘境と必要な樹脂の目安を確認できます。',
 '星5の天井カウンター','祈願履歴からソフト天井、確定天井、「掴みし明光」を確認できます。',
 '複数アカウント','アカウントを分けて管理し、自分のGoogle Driveにバックアップできます。',
 'キャラと武器','突破と天賦の育成計画を立てる',
 'キャラや武器の現在と目標のレベルを設定すると、不足している宝石、天賦本、ボス素材、モラを計算できます。',
 'フリーナ','水元素 ★5','Lv. 1/20 → 90/90 • 天賦：1/1/1 → 9/10/10',
 '必要樹脂の目安','天賦育成素材','ボス素材：46','地域の特産：168','モラ',
 '効率的な周回','樹脂と秘境の予定を整理する',
 '秘境の週間スケジュールと、有効な計画に必要な素材を確認できます。曜日で絞り込み、周回の予定を立てましょう。',
 '現在の樹脂：160 / 200','18:42に全回復（約5時間20分）',
 '天賦秘境（火曜・金曜・日曜）','本日開放 • 有効な計画におすすめ','樹脂20',
 '所持素材の管理','すでに持っている素材を差し引く',
 '所持している素材を「','所持素材','」に登録すると、計画から差し引いて不足分を計算できます。',
 '不足分だけ計算','必要数が46個、所持数が20個なら、残りは26個です。',
 '合成','対応する宝石や天賦本では、3対1の合成も考慮できます。',
 '樹脂の節約','素材を集めると、必要な樹脂の目安が減っていきます。',
 '祈願カウンター','星5の天井と確定状況を確認する',
 'PC用のPowerShellスクリプト、または対応するExcel・JSONファイル（.xlsx、.json）から履歴を取り込めます。このガイドはスマートフォンでも読めます。',
 'キャラクターイベント祈願','74回（ソフト天井）','ピックアップ確定','掴みし明光','神鋳軌定（命定値1）','記録済みの祈願：1,179回',
 'アカウントとGoogle Drive','進捗を分けてクラウドに保存する',
 '複数のアカウントでプレイしていますか？キャラ、素材、樹脂、祈願履歴をUIDごとに管理できます。',
 'アカウント：','メイン（UID: 600000000）','サブ（UID: 700000000）','＋ アカウントを追加',
 'クラウド同期：','「','同期','」画面から接続すると、自分のGoogle Driveにバックアップし、端末間でデータを引き継げます。',
 'スキップ','← 戻る','次へ →','始める'
 ],
 ko: [
 'Spirifly','빠른 가이드','1 / 6단계','×',
 '1. 환영합니다','2. 캐릭터와 무기','3. 일일 파밍','4. 보유 재료','5. 기원과 천장','6. 계정과 동기화',
 '육성 계획 도구','Spirifly에 오신 것을 환영합니다!',
 'Spirifly는 ','원신','의 육성과 레진 계획을 돕는 도구입니다. 변경 사항은 현재 브라우저에 저장되며 Google Drive에 백업할 수도 있습니다.',
 '캐릭터 육성 계획','캐릭터와 무기를 선택하고 레벨 및 특성 목표를 설정하세요.',
 '일일 파밍','열린 비경과 필요한 레진의 예상치를 확인하세요.',
 '5성 천장 계산','기원 기록으로 소프트 천장, 확정 천장, 포획의 광휘를 확인하세요.',
 '여러 계정 관리','계정별로 관리하고 본인의 Google Drive에 백업하세요.',
 '캐릭터와 무기','돌파와 특성 육성 계획 세우기',
 '캐릭터와 무기의 현재 및 목표 레벨을 설정하면 부족한 보석, 특성 책, 보스 재료와 모라를 계산합니다.',
 '푸리나','물 원소 ★5','Lv. 1/20 → 90/90 • 특성: 1/1/1 → 9/10/10',
 '예상 레진','특성 육성 소재','보스 재료: 46','지역 특산물: 168','모라',
 '효율적인 파밍','레진과 비경 일정 정리하기',
 '비경의 주간 일정과 활성화된 계획에 필요한 재료를 확인하세요. 요일별로 필터링해 파밍 일정을 계획할 수 있습니다.',
 '현재 레진: 160 / 200','18:42에 완충 (약 5시간 20분)',
 '특성 비경 (화 / 금 / 일)','오늘 개방 • 활성화된 계획에 추천','레진 20',
 '보유 재료 관리','이미 보유한 재료 차감하기',
 '보유한 재료를 ','보유 재료',' 탭에 입력하면 계획에서 차감하여 부족한 수량을 계산합니다.',
 '부족한 수량만 계산','46개가 필요하고 20개를 보유했다면 26개가 더 필요합니다.',
 '합성','해당하는 보석과 특성 책은 3대 1 합성을 고려할 수 있습니다.',
 '레진 절약','재료를 모을수록 예상 레진 소모량이 줄어드는 것을 확인하세요.',
 '기원 카운터','5성 천장과 확정 상태 확인하기',
 'PC용 PowerShell 스크립트 또는 지원되는 Excel / JSON 기록 파일(.xlsx, .json)로 기원을 가져오세요. 이 가이드는 휴대폰에서도 볼 수 있습니다.',
 '캐릭터 이벤트 기원','74회 (소프트 천장)','픽업 확정','포획의 광휘','신의 궤도 (운명 포인트 1)','기록된 기원 1,179회',
 '계정과 Google Drive','진행 상황 분리와 클라우드 백업',
 '여러 계정으로 플레이하시나요? UID별로 캐릭터, 재료, 레진, 기원 기록을 독립적으로 관리할 수 있습니다.',
 '내 계정:','주 계정 (UID: 600000000)','보조 계정 (UID: 700000000)','+ 계정 추가',
 '클라우드 동기화: ','','동기화',' 탭에서 계정을 연결하면 본인의 Google Drive에 백업하고 기기 간 데이터를 유지할 수 있습니다.',
 '건너뛰기','← 이전','다음 →','시작하기'
 ]
};

function translateInteractiveTutorial(lang) {
 const modal = document.getElementById('modalInteractiveTutorial');
 if (!modal) return;
 // El español se captura una vez desde la plantilla para conservarlo al cambiar de idioma.
 if (!TUTORIAL_I18N.es) {
  TUTORIAL_I18N.es = [];
  modal.querySelectorAll('[data-tutorial]').forEach(node => {
   TUTORIAL_I18N.es[Number(node.dataset.tutorial)] = node.textContent;
  });
 }
 const copy = TUTORIAL_I18N[lang] || TUTORIAL_I18N.es;
 modal.lang = TUTORIAL_I18N[lang] ? lang : 'es';
 modal.querySelectorAll('[data-tutorial]').forEach(node => {
  node.textContent = copy[Number(node.dataset.tutorial)];
 });
 modal.setAttribute('aria-label', copy[1]);
 const languageLabels = {es:'Idioma', en:'Language', pt:'Idioma', ja:'言語', ko:'언어'};
 document.getElementById('tutorialLangLabel').textContent = languageLabels[lang] || languageLabels.es;
 document.getElementById('tutorialLangSelect').value = modal.lang;

 const closeLabels = {es:'Cerrar guía',en:'Close guide',pt:'Fechar guia',ja:'ガイドを閉じる',ko:'가이드 닫기'};
 const close = document.getElementById('btnCloseTutorialX');
 close.title = closeLabels[lang] || closeLabels.es;
 close.setAttribute('aria-label', close.title);
 const opener = document.getElementById('btnOpenTutorialModal');
 opener.title = copy[1];
 opener.setAttribute('aria-label', copy[1]);
 opener.querySelector('span').textContent = copy[1];
 const step = Number(modal.dataset.step || 0) + 1;
 document.getElementById('tutorialStepCounter').textContent = formatTutorialStep(lang, step, 6);
}

function formatTutorialStep(lang, step, total) {
 switch (lang) {
  case 'en': return `Step ${step} of ${total}`;
  case 'pt': return `Etapa ${step} de ${total}`;
  case 'ja': return `${step} / ${total}`;
  case 'ko': return `${step} / ${total}단계`;
  default: return `Paso ${step} de ${total}`;
 }
}
