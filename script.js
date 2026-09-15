const opportunities=[
 ['Iniciação Científica','Pesquisa','Biotecnologia','Inscrições abertas','🧪'],
 ['Bolsa de Pesquisa','Bolsa','Engenharia','Auxílio disponível','🔬'],
 ['Curso de Computação','Curso','Computação','Gratuito · online','💻'],
 ['Mentoria Acadêmica','Mentoria','Ciências','Vagas abertas','👥'],
 ['Mestrado em Ciências','Pesquisa','Ciências','Processo seletivo','🎓']
];
let currentType='Todas';
let initialRole=localStorage.getItem('soleneRole')||'solenista';
function go(id){
 document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
 document.getElementById(id).classList.add('active');
 document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.page===id));

document.querySelectorAll('.bottom button').forEach(b => {
   b.classList.remove('active');
 });

 const bottomPages = {
   home: 0,
   opps: 1,
   mentorias: 2,
   recursos: 3,
   perfil: 4
 };

 if (bottomPages[id] !== undefined) {
   document.querySelectorAll('.bottom button')[bottomPages[id]].classList.add('active');
 }

 if(id==='opps')renderOpps();
 if(id==='perfil')setRole(localStorage.getItem('soleneRole')||initialRole);
 window.scrollTo({top:0,behavior:'smooth'});
}

window.addEventListener('DOMContentLoaded',()=>setRole(initialRole));

function toggleFavorite(index, button){
  let favorites = JSON.parse(localStorage.getItem('soleneFavorites') || '[]');

  if (favorites.includes(index)) {
    favorites = favorites.filter(i => i !== index);
    button.textContent = '♡';
    toast('Removido dos favoritos.');
  } else {
    favorites.push(index);
    button.textContent = '❤️';
    toast('Salvo nos favoritos! ❤️');
  }

  localStorage.setItem('soleneFavorites', JSON.stringify(favorites));
}

function renderOpps(){
 const area=document.getElementById('area').value;
 const list=opportunities.map((o,index)=>({o,index})).filter(x=>(currentType==='Todas'||x.o[1]===currentType)&&(area==='Todas'||x.o[2]===area));
 document.getElementById('oppList').innerHTML=list.map((x,i)=>{const o=x.o;return `
 <div class="opp"><div class="opp-icon">${o[4]}</div><div class="opp-content"><span class="badge">${o[1]}</span><h3>${o[0]}</h3><p>${o[3]} · ${o[2]}</p><div style="margin-top:7px;font-size:11px;color:var(--muted)">📅 Até 20/09 · ${x.index%2?'Online':'Híbrida'} · ${x.index%2?'Bolsa disponível':'Gratuita'}</div></div><div class="opp-actions"><button class="save" onclick="toggleFavorite(${x.index}, this)">♡</button><button class="secondary" style="color:var(--p);border-color:var(--border);background:var(--white);padding:9px 13px" onclick="detail(${x.index})">Ver detalhes</button></div></div>`}).join('')||'<div class="card">Nenhuma oportunidade encontrada.</div>';
}
function openLive(){openModal(`<button class="modal-close" onclick="closeModal()">×</button><span class="badge">● AO VIVO</span><div class="live-screen" style="height:320px;border-radius:18px;margin-top:10px"><div class="video-frame"><div class="live-speaker"><div class="live-avatar">☼</div><div style="font-weight:800;margin-top:8px">Mulheres na Ciência</div><div style="font-size:12px;opacity:.8;margin-top:5px">Como começar na pesquisa?</div><button class="live-play" onclick="toast('A transmissão está conectada!')">▶</button></div></div></div><div style="padding-top:17px"><h2 class="title" style="font-size:26px">Como começar na pesquisa?</h2><div class="live-meta"><span>🔴 Ao vivo</span><span>•</span><span>19h</span><span>•</span><span>64 pessoas assistindo</span></div><p style="color:var(--muted);line-height:1.5">Conversa com pesquisadoras sobre primeiros projetos, iniciação científica e caminhos para entrar em um laboratório.</p><button class="primary" onclick="toast('Você entrou na live!')">Continuar assistindo</button></div>`)}
function openResearch(type){openModal(`<button class="modal-close" onclick="closeModal()">×</button><span class="badge">PESQUISA</span><h2 class="title" style="font-size:28px;margin-top:10px">Laboratórios parceiros</h2><p style="color:var(--muted);line-height:1.5">Explore ambientes de pesquisa e veja o que cada área oferece.</p><div class="detail-list"><div>🧬 <b>Biotecnologia</b> projetos em genética e biologia molecular</div><div>🔬 <b>Ciências</b> projetos experimentais e iniciação científica</div><div>💻 <b>Computação</b> dados, IA e tecnologia aplicada</div></div><button class="primary" onclick="go('opps');closeModal()">Ver oportunidades de pesquisa</button>`)}
function openMentor(type){const title=type==='carreira'?'Mentoria de carreira':'Monitoria de estudos';openModal(`<button class="modal-close" onclick="closeModal()">×</button><span class="badge">MENTORIA</span><h2 class="title" style="font-size:28px;margin-top:10px">${title}</h2><p style="color:var(--muted);line-height:1.5">Escolha seu objetivo e envie uma solicitação para encontrar uma conexão.</p><div class="form-grid"><div class="form-field"><label>Seu objetivo</label><input placeholder="Ex.: conhecer pesquisa"></div><div class="form-field"><label>Área</label><select><option>Ciência</option><option>Computação</option><option>Engenharia</option><option>Saúde</option></select></div><div class="form-field full"><label>Mensagem</label><textarea placeholder="Conte o que você gostaria de conversar..."></textarea></div></div><button class="primary" style="margin-top:12px" onclick="toast('Solicitação enviada!');closeModal()">Enviar solicitação</button>`)}
function openEvent(type){openModal(`<button class="modal-close" onclick="closeModal()">×</button><span class="badge">OFICINA</span><h2 class="title" style="font-size:28px;margin-top:10px">Primeiros passos na pesquisa</h2><div class="detail-list"><div>📅 <b>12 de setembro</b> · 14h</div><div>💻 <b>Modalidade</b> · online</div><div>🎓 <b>Para quem</b> · estudantes</div></div><p style="color:var(--muted);line-height:1.5">Uma oficina prática para entender como encontrar projetos, escrever para pesquisadores e começar uma trajetória acadêmica.</p><button class="primary" onclick="toast('Inscrição realizada!');closeModal()">Confirmar inscrição</button>`)}
function openResource(type){const data={editais:['Editais','Chamadas, processos seletivos e documentos importantes.'],guias:['Guias','Materiais para estudar, pesquisar e planejar seus próximos passos.'],projetos:['Projetos','Modelos e ideias para organizar projetos acadêmicos.']}[type];openModal(`<button class="modal-close" onclick="closeModal()">×</button><span class="badge">RECURSOS</span><h2 class="title" style="font-size:28px;margin-top:10px">${data[0]}</h2><p style="color:var(--muted);line-height:1.5">${data[1]}</p><div class="detail-list"><div>📄 <b>Material 01</b> · Guia introdutório</div><div>📚 <b>Material 02</b> · Checklist para começar</div><div>✦ <b>Material 03</b> · Modelo para usar</div></div><button class="primary" onclick="toast('Recurso aberto!')">Abrir material</button>`)}
function openProfile(){openModal(`<button class="modal-close" onclick="closeModal()">×</button><span class="badge">MEU PERFIL</span><h2 class="title" style="font-size:28px;margin-top:10px">Editar perfil</h2><div class="form-grid"><div class="form-field"><label>Nome</label><input value="Solenista"></div><div class="form-field"><label>Escolaridade</label><select><option>Ensino médio</option><option>Graduação</option></select></div><div class="form-field full"><label>Áreas de interesse</label><input placeholder="Pesquisa, tecnologia, ciência..."></div></div><button class="primary" style="margin-top:12px" onclick="toast('Perfil atualizado!');closeModal()">Salvar alterações</button>`)}
function detail(i){const o=opportunities[i];openModal(`<button class="modal-close" onclick="closeModal()">×</button><div class="opp-detail"><div><span class="badge">${o[1]}</span><h2 class="title" style="font-size:29px;margin-top:10px">${o[0]}</h2><p style="color:var(--muted);line-height:1.6">Uma oportunidade para estudantes interessadas em ${o[2].toLowerCase()}. Aqui a página mostra as informações principais antes da inscrição.</p><h3 style="color:var(--p)">Sobre a oportunidade</h3><p style="color:var(--muted);font-size:13px;line-height:1.6">Atividades, perfil procurado, etapas do processo seletivo e documentos necessários ficam organizados nesta página.</p><button class="primary" onclick="openForm(${i})">Inscrever-se</button></div><aside class="detail-side"><div class="detail-row"><b>Instituição</b>Instituto Solene</div><div class="detail-row"><b>Prazo</b>20 de setembro</div><div class="detail-row"><b>Modalidade</b>${i%2?'Online':'Híbrida'}</div><div class="detail-row"><b>Local</b>São Paulo</div><div class="detail-row"><b>Vagas</b>24 disponíveis</div></aside></div>`) }
function openForm(i){const o=opportunities[i];openModal(`<button class="modal-close" onclick="closeModal()">×</button><span class="badge">INSCRIÇÃO</span><h2 class="title" style="font-size:28px;margin:10px 0 5px">${o[0]}</h2><p style="color:var(--muted);font-size:13px">Preencha o formulário para demonstrar interesse.</p><div class="form-grid"><div class="form-field"><label>Nome completo</label><input placeholder="Seu nome"></div><div class="form-field"><label>E-mail</label><input type="email" placeholder="voce@email.com"></div><div class="form-field"><label>Idade</label><input type="number" placeholder="Ex.: 16"></div><div class="form-field"><label>Escolaridade</label><select><option>Ensino médio</option><option>Graduação</option><option>Pós-graduação</option></select></div><div class="form-field full"><label>Por que você quer participar?</label><textarea placeholder="Conte brevemente..."></textarea></div></div><div style="margin-top:14px"><button class="primary" onclick="toast('Inscrição enviada!');closeModal()">Enviar inscrição</button> <button class="secondary" style="color:var(--p);border-color:var(--border);background:var(--white)" onclick="closeModal()">Cancelar</button></div>`) }
function setType(el,t){currentType=t;document.querySelectorAll('.chip').forEach(x=>x.classList.remove('active'));el.classList.add('active');renderOpps()}
function toast(t){const x=document.getElementById('toast');x.textContent=t;x.style.display='block';setTimeout(()=>x.style.display='none',2200)}
function openModal(h){document.getElementById('modalbox').innerHTML=h;document.getElementById('modal').classList.add('show')}
function closeModal(){document.getElementById('modal').classList.remove('show')}
function mentor(){openModal(`<button class="modal-close" onclick="closeModal()">×</button><h2 class="title" style="font-size:29px">Seja mentora</h2><p style="color:var(--muted)">Cadastre sua área de atuação.</p><input placeholder="Nome profissional" style="width:100%;padding:11px;border:1px solid var(--border);border-radius:12px;margin:5px 0"><input placeholder="Área" style="width:100%;padding:11px;border:1px solid var(--border);border-radius:12px;margin:5px 0"><br><br><button class="primary" onclick="toast('Cadastro enviado!');closeModal()">Enviar</button> <button class="secondary" style="color:var(--p);border-color:var(--border);background:var(--white)" onclick="closeModal()">Cancelar</button>`) }

function toggleDrawer(){document.getElementById('drawer').classList.add('show');document.getElementById('drawerBackdrop').classList.add('show')}
function closeDrawer(){document.getElementById('drawer').classList.remove('show');document.getElementById('drawerBackdrop').classList.remove('show')}
function goFromDrawer(id){closeDrawer();go(id)}
function openLogin(preselect){
 const choice=preselect||localStorage.getItem('soleneRole')||'';
 if(!preselect && localStorage.getItem('soleneRole')){
   const role=localStorage.getItem('soleneRole');
   const names={solenista:'Solenista',especialista:'Mentora / Especialista',instituicao:'Instituição'};

   openModal(`<button class="modal-close" onclick="closeModal()">×</button><span class="badge">CONTA ATIVA</span><h2 class="title" style="font-size:30px;margin:10px 0 4px">Você está na Solene como ${names[role]}</h2><p style="color:var(--muted);font-size:13px;line-height:1.5">Seu acesso é separado dos demais perfis. Para entrar como outro tipo de conta, saia primeiro.</p><button class="primary" style="width:100%;margin-top:15px" onclick="closeModal();go('perfil')">Abrir meu perfil</button><button class="secondary" style="width:100%;margin-top:8px;color:var(--p);border-color:var(--border);background:var(--white)" onclick="switchAccount()">Sair e entrar com outra conta</button>`);
  
   return;
 }
 openModal(`<button class="modal-close" onclick="closeModal()">×</button><span class="badge">ACESSO SOLENE</span><h2 class="title" style="font-size:30px;margin:10px 0 4px">Entrar na Solene</h2><p style="color:var(--muted);font-size:13px">Escolha o tipo de acesso. Cada conta terá um espaço próprio.</p><div class="login-choice"><button onclick="authForm('solenista')">👩🏻‍🎓 Solenista<small>Seu universo de oportunidades, jornada e conexões.</small></button><button onclick="authForm('especialista')">🎤 Palestrante / mentora<small>Seu palco, comunidade e conteúdos.</small></button><button onclick="authForm('instituicao')">🏛️ Instituição parceira<small>Seu painel de oportunidades, projetos e impacto.</small></button></div>`);
 if(choice)setTimeout(()=>authForm(choice),50);
}
function authForm(role){
 const d={solenista:['Sou Solenista','Encontre oportunidades, eventos e caminhos para sua jornada.'],especialista:['Sou palestrante / mentora','Crie lives, palestras e conexões dentro da Solene.'],instituicao:['Sou instituição','Compartilhe oportunidades e aproxime sua instituição das Solenistas.']}[role];
 openModal(`<button class="modal-close" onclick="closeModal()">×</button><span class="badge">LOGIN · ${role==='solenista'?'SOLENISTA':role==='especialista'?'ESPECIALISTA':'INSTITUIÇÃO'}</span><h2 class="title" style="font-size:29px;margin:10px 0 4px">${d[0]}</h2><p style="color:var(--muted);font-size:13px">${d[1]}</p><div class="auth-form"><label style="font-size:11px;font-weight:800;color:var(--p)">E-mail</label><input type="email" placeholder="voce@email.com"><label style="font-size:11px;font-weight:800;color:var(--p)">Senha</label><input type="password" placeholder="Sua senha"><button class="primary" style="width:100%;margin-top:8px" onclick="finishLogin('${role}')">Entrar</button><button class="secondary" style="width:100%;margin-top:8px;color:var(--p);border-color:var(--border);background:var(--white)" onclick="finishLogin('${role}','Google')">Continuar com Google</button>${role==='solenista'?'<button class="secondary" style="width:100%;margin-top:8px;color:var(--p);border-color:var(--border);background:var(--white)" onclick="openGov()">Entrar com Gov.br</button>':''}<p style="font-size:11px;color:var(--muted);text-align:center;margin:13px 0 0">Ainda não tem conta? <button onclick="toast('Cadastro iniciado!')" style="border:0;background:none;color:var(--p);font-weight:800">Criar conta</button></p></div>`);
}
function openGov(){
 openModal(`<button class="modal-close" onclick="closeModal()">×</button><div class="gov-screen"><div class="gov-logo">gov.br</div><p style="font-size:13px;color:#3f4851">Entrar com sua conta gov.br</p><label style="font-size:11px;font-weight:800;color:#27313a">CPF</label><input placeholder="Digite seu CPF"><button class="gov-btn" onclick="finishLogin('solenista','Gov.br')">Continuar</button><p style="font-size:10px;color:#68727d;line-height:1.5">Tela demonstrativa do fluxo de acesso. Não é a página oficial do gov.br.</p></div>`);
}

function finishLogin(role, provider){
  const names = {
    solenista: 'Solenista',
    especialista: 'Especialista',
    instituicao: 'Instituição'
  };

  const emailTeste = 'SoleneTest_03';
  const senhaTeste = '1234';

  const campos = document.querySelectorAll('.auth-form input');
  const email = campos[0].value.trim();
  const senha = campos[1].value;

  if (email !== emailTeste || senha !== senhaTeste) {
    toast('❌ E-mail ou senha incorretos!');
    return;
  }

  localStorage.setItem('soleneRole', role);

  openModal(`
    <button class="modal-close" onclick="closeModal()">×</button>
    <span class="badge">SEU PERFIL</span>

    <h2 class="title" style="font-size:29px;margin:10px 0 4px">
      Escolha seu nome de usuário ✨
    </h2>

    <p style="color:var(--muted);font-size:13px;line-height:1.5">
      Como você quer aparecer na Solene?
    </p>

    <div class="auth-form">
      <label style="font-size:11px;font-weight:800;color:var(--p)">
        Nome de usuário
      </label>

      <input
        id="usernameInput"
        type="text"
        placeholder="Seu nome"
        maxlength="20"
      >

      <button
        class="primary"
        style="width:100%;margin-top:8px"
        onclick="saveUsername('${role}')"
      >
        Continuar
      </button>
    </div>
  `);
}

function saveUsername(role){
  const input = document.getElementById('usernameInput');
  const username = input.value.trim();

  if (!username) {
    toast('❌ Escolha um nome de usuário!');
    return;
  }

  localStorage.setItem('soleneUsername', username);
  localStorage.setItem('soleneRole', role);

  const accountName = document.getElementById('accountName');

  if (accountName) {
    accountName.textContent = username;
  }

  toast(`✨ Bem-vinda, ${username}!`);
  closeModal();
  setRole(role);
  go('perfil');
}

function openAccountMenu(){
  const username = localStorage.getItem('soleneUsername');

  if (!username) {
    openLogin();
    return;
  }

  openModal(`
    <button class="modal-close" onclick="closeModal()">×</button>

    <span class="badge">MINHA CONTA</span>

    <h2 class="title" style="font-size:29px;margin:10px 0 4px">
      Olá, ${username}! ✨
    </h2>

    <p style="color:var(--muted);font-size:13px">
      O que você gostaria de fazer?
    </p>

    <button class="primary" style="width:100%;margin-top:12px"
      onclick="closeModal();go('perfil')">
      👤 Meu perfil
    </button>

    <button class="secondary" style="width:100%;margin-top:8px;color:var(--p);border-color:var(--border);background:var(--white)"
      onclick="switchAccount()">
      🔄 Trocar de conta
    </button>

    <button class="secondary" style="width:100%;margin-top:8px;color:var(--p);border-color:var(--border);background:var(--white)"
      onclick="logout()">
      🚪 Sair
    </button>
  `);
}

function logout(){
  localStorage.removeItem('soleneUsername');
  localStorage.removeItem('soleneRole');

  const accountName = document.getElementById('accountName');

  if (accountName) {
    accountName.textContent = 'Entrar';
  }

  closeModal();
  toast('Você saiu da sua conta.');
}

function profileMarkup(role){
 const data={
  solenista:{
   cls:'role-solenista',icon:'✦',kicker:'JORNADA DE DESCOBERTA',title:'Seu universo de possibilidades',desc:'Um espaço pensado para explorar ciência, oportunidades e conexões no seu ritmo.',tag:'12+ • Solenista',welcome:'Hoje é um ótimo dia para descobrir algo novo.',cards:[['🎓','Oportunidades para você','Bolsas, cursos, iniciação científica e experiências para começar.'],['🔭','Mapa da jornada','Acompanhe interesses, inscrições e próximos passos.'],['💜','Conexões','Encontre eventos e pessoas que podem inspirar seu caminho.']],metrics:[['08','salvos'],['04','inscrições'],['06','conexões']]},
  especialista:{
   cls:'role-especialista',icon:'🎤',kicker:'ESPAÇO DA MENTORA',title:'Seu palco para inspirar',desc:'Uma área para compartilhar conhecimento, criar encontros e acompanhar sua comunidade.',tag:'Mentora • Especialista',welcome:'Seu conhecimento pode abrir caminhos para outras meninas.',cards:[['🎙️','Criar uma experiência','Monte uma live, palestra ou encontro com a sua identidade.'],['👥','Minha comunidade','Acompanhe conexões, mensagens e participantes.'],['✨','Conteúdo em destaque','Organize materiais e temas para compartilhar.']],metrics:[['12','conexões'],['05','eventos'],['24','participantes']]},
  instituicao:{
   cls:'role-instituicao',icon:'◇',kicker:'ESPAÇO DA INSTITUIÇÃO',title:'Ciência que vira impacto',desc:'Uma área profissional para divulgar oportunidades, projetos e aproximar talentos da sua instituição.',tag:'Parceira • Instituição',welcome:'Sua instituição pode transformar oportunidades em futuros.',cards:[['📣','Publicar oportunidade','Divulgue bolsas, vagas, cursos, projetos e chamadas.'],['🧩','Projetos & parcerias','Apresente iniciativas e encontre conexões estratégicas.'],['📊','Painel de impacto','Veja alcance, inscrições e interesse nas suas ações.']],metrics:[['18','publicações'],['07','parcerias'],['326','visualizações']]}
 }[role]||null;
 if(!data)return '';
 const avatarIcon={solenista:'✦',especialista:'✧',instituicao:'◇'}[role]; const icon=`<div class="profile-avatar-bubble"><span>${avatarIcon}</span><small>Meu perfil</small></div>`;
 return `<div class="${data.cls}">
  <div class="profile-hero"><div class="profile-hero-inner">${icon}<div><span class="profile-kicker">${data.kicker}</span><h2>${data.title}</h2><p>${data.desc}</p><span class="profile-tag">${data.tag}</span></div></div></div>
  <div class="profile-body"><div class="profile-grid">
   <div class="profile-card accent"><span class="badge">PARA VOCÊ</span><h3 style="margin-top:8px">${data.welcome}</h3><p>Escolha uma área para continuar sua experiência personalizada.</p><div class="profile-action-grid">${data.cards.map(c=>`<button class="profile-action" onclick="profileAction('${role}',${JSON.stringify(c[1])})"><span style="font-size:20px">${c[0]}</span> ${c[1]}<small>${c[2]}</small></button>`).join('')}</div></div>
   <div class="profile-card"><h3>Seu movimento</h3><p>Indicadores da sua área dentro da Solene.</p><div class="profile-metrics">${data.metrics.map(m=>`<div class="profile-metric"><b>${m[0]}</b><span>${m[1]}</span></div>`).join('')}</div><button class="primary" style="width:100%;margin-top:13px" onclick="openProfile()">Personalizar meu perfil</button><button class="secondary" style="width:100%;margin-top:8px;color:var(--p);border-color:var(--border);background:var(--white)" onclick="switchAccount()">Sair / trocar tipo de conta</button></div>
  </div></div>
 </div>`;
}
function setRole(role){
 const allowed=['solenista','especialista','instituicao'];
 if(!allowed.includes(role)) role='solenista';
 localStorage.setItem('soleneRole',role);
 const d=document.getElementById('profileDashboard');
 if(d)d.innerHTML=profileMarkup(role);
 const av=document.querySelector('.avatar');
 if(av){
   av.innerHTML=role==='solenista'?'✦':role==='especialista'?'✧':'◇';
   av.title='Perfil: '+({solenista:'Solenista',especialista:'Mentora / Especialista',instituicao:'Instituição'})[role];
 }
 applyRoleAccess(role);
}
function applyRoleAccess(role){
 const labels={solenista:'Solenista',especialista:'Mentora / Especialista',instituicao:'Instituição'};
 document.querySelectorAll('[data-role-only]').forEach(el=>{
   el.classList.toggle('role-only',el.dataset.roleOnly!==role);
 });
 document.querySelectorAll('[data-role-any]').forEach(el=>el.classList.add('role-gate','allowed'));
 const note=document.getElementById('currentRoleNote');
 if(note)note.innerHTML='<b>Acesso exclusivo:</b> '+labels[role]+' · este espaço mostra apenas recursos da sua conta.';
}

function switchAccount(){
 localStorage.removeItem('soleneRole');
 openLogin();
}

function profileAction(role,label){
 const routes={solenista:{'Oportunidades para você':'opps','Mapa da jornada':'perfil','Conexões':'mentorias'},especialista:{'Criar uma experiência':'eventos','Minha comunidade':'mentorias','Conteúdo em destaque':'recursos'},instituicao:{'Publicar oportunidade':'opps','Projetos & parcerias':'pesquisa','Painel de impacto':'perfil'}};
 const r=routes[role]?.[label]; if(r)go(r); else toast(label);
}


function solQuick(text){const i=document.getElementById('solInput');if(i){i.value=text;solSend()}}
function solSend(){const i=document.getElementById('solInput'),m=document.getElementById('solMessages');if(!i||!m||!i.value.trim())return;const v=i.value.trim();m.insertAdjacentHTML('beforeend',`<div class="sol-msg me">${v}</div>`);i.value='';let r='Posso te levar para oportunidades, eventos, pesquisa ou mentorias da Solene. ✦';if(/oportun/i.test(v))r='Vamos encontrar oportunidades para você. Na área de Oportunidades dá para filtrar por tipo, área e outros critérios. 💜';else if(/pesquisa|cient/i.test(v))r='Na área de Pesquisa você encontra projetos e caminhos para começar a explorar a ciência. 🔬';else if(/live|palestra|evento/i.test(v))r='As lives e eventos ficam na agenda da Solene — e as lives anteriores também podem ficar disponíveis. 🎥';else if(/mentor/i.test(v))r='Na área de Mentorias você pode conhecer mentoras e encontrar uma conexão que faça sentido para sua jornada. 👩🏻‍🏫';else if(/bolsa/i.test(v))r='Posso te ajudar a encontrar bolsas e oportunidades gratuitas. 🎓';else if(/jornada|próximo passo/i.test(v))r='Sua jornada reúne seus próximos passos e experiências dentro da Solene. 🌱';setTimeout(()=>{m.insertAdjacentHTML('beforeend',`<div class="sol-msg bot">${r}</div>`);m.scrollTop=m.scrollHeight},260)}
function sendMsg(){const i=document.getElementById('chatInput'),v=i.value.trim();if(!v)return;const m=document.getElementById('messages');m.innerHTML+=`<div class="msg me">${v}</div>`;i.value='';let r='Você pode explorar Oportunidades e usar os filtros para encontrar algo para você.';if(/mentoria/i.test(v))r='Acesse Mentorias para encontrar conexões e apoio acadêmico.';if(/pesquisa|cient/i.test(v))r='Na área Pesquisa você encontra iniciação científica e caminhos acadêmicos.';setTimeout(()=>{m.innerHTML+=`<div class="msg">${r}</div>`;m.scrollTop=m.scrollHeight},300)}
function toggleTheme(){document.body.classList.toggle('dark');localStorage.setItem('soleneTheme',document.body.classList.contains('dark')?'dark':'light');document.querySelector('.theme-toggle').textContent=document.body.classList.contains('dark')?'☀':'☾'}
if(localStorage.getItem('soleneTheme')==='dark'){document.body.classList.add('dark');document.querySelector('.theme-toggle').textContent='☀'}
renderOpps();
