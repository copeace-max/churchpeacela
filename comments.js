/* =====================================================================
   댓글 (구글 로그인) — 설교 · 목회서신 · 평화서당
   관리자: ADMIN_EMAIL 로 로그인하면 모든 댓글에 삭제 단추가 보이고,
   글마다 '댓글 잠금'을 걸 수 있습니다. 지운 댓글은 trash 에 보관되어
   관리자만 볼 수 있습니다.
   ===================================================================== */
const FB_CONFIG = window.FBCFG || {};
const ADMIN_EMAIL = "copeace@gmail.com";

(function () {
  const S = document.createElement("style");
  S.textContent = `
.cpc{margin:22px 0 4px;border-top:1px solid var(--rule);padding-top:18px;font-family:inherit}
.cpc h3{font-family:var(--serif);font-size:17px;font-weight:600;margin:0 0 14px;letter-spacing:-.01em}
.cpc h3 span{color:var(--ink-3);font-weight:400}
.cpc .row{display:flex;align-items:center;gap:10px;margin-bottom:14px;flex-wrap:wrap}
.cpc button{font-family:inherit;font-size:13px;font-weight:600;padding:8px 16px;border-radius:999px;border:1px solid var(--rule);background:var(--paper);color:var(--ink);cursor:pointer}
.cpc button:hover{border-color:var(--accent);color:var(--accent)}
.cpc button.pri{background:var(--accent);border-color:var(--accent);color:#fff}
.cpc button.pri:hover{opacity:.9;color:#fff}
.cpc button.lnk{border:0;background:none;padding:2px 4px;font-size:12px;font-weight:400;color:var(--ink-3)}
.cpc button.lnk:hover{color:var(--accent-3)}
.cpc textarea{width:100%;min-height:78px;padding:11px 13px;border:1px solid var(--rule);border-radius:6px;background:#fff;font-family:inherit;font-size:14px;line-height:1.65;color:var(--ink);resize:vertical;box-sizing:border-box}
.cpc textarea:focus{outline:none;border-color:var(--accent)}
.cpc .me{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--ink-2)}
.cpc .me img{width:26px;height:26px;border-radius:50%}
.cpc .list{list-style:none;padding:0;margin:16px 0 0}
.cpc .list li{display:grid;grid-template-columns:34px 1fr;gap:11px;padding:13px 0;border-top:1px solid var(--rule)}
.cpc .list li:first-child{border-top:0}
.cpc .av{width:34px;height:34px;border-radius:50%;background:var(--paper);object-fit:cover}
.cpc .who{font-size:13px;font-weight:600}
.cpc .when{font-size:12px;color:var(--ink-3);margin-left:7px;font-weight:400}
.cpc .txt{font-size:14px;line-height:1.7;margin-top:3px;white-space:pre-wrap;word-break:break-word}
.cpc .acts{margin-top:4px}
.cpc .note{font-size:13px;color:var(--ink-3);line-height:1.7}
.cpc .adm{font-size:12px;color:var(--accent-3);font-weight:600}
@media(max-width:600px){.cpc .list li{grid-template-columns:28px 1fr;gap:9px}.cpc .av{width:28px;height:28px}}
`;
  document.head.appendChild(S);

  let app = null, auth = null, db = null, ready = false;
  function init() {
    if (ready) return ready;
    if (typeof firebase === "undefined") return false;
    app = firebase.initializeApp(FB_CONFIG);
    auth = firebase.auth();
    db = firebase.firestore();
    ready = true;
    auth.onAuthStateChanged(() => { if (cur) render(); });
    return true;
  }

  const esc2 = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const isAdmin = () => !!(auth && auth.currentUser && auth.currentUser.email === ADMIN_EMAIL);
  const when = ts => {
    if (!ts || !ts.toDate) return "";
    const d = ts.toDate(), s = (Date.now() - d.getTime()) / 1000;
    if (s < 60) return "방금";
    if (s < 3600) return Math.floor(s / 60) + "분 전";
    if (s < 86400) return Math.floor(s / 3600) + "시간 전";
    if (s < 604800) return Math.floor(s / 86400) + "일 전";
    return d.toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" });
  };

  let cur = null;      /* {pageId, title} */
  let items = [];
  let locked = false;
  let unsub = null;

  function box() { return document.getElementById("cpc-root"); }

  function render() {
    const el = box();
    if (!el || !cur) return;
    const u = auth && auth.currentUser;
    const admin = isAdmin();
    let head = `<h3>댓글 <span>${items.length}</span></h3>`;
    let form;
    if (!u) {
      form = `<div class="row"><button class="pri" onclick="CPC.login()">구글 계정으로 로그인하고 댓글 쓰기</button></div>
              <div class="note">로그인은 댓글을 남길 때만 필요합니다. 이름과 프로필 사진만 사용합니다.</div>`;
    } else if (locked && !admin) {
      form = `<div class="note">이 글은 댓글을 받지 않습니다.</div>`;
    } else {
      form = `<div class="row"><span class="me">${u.photoURL ? `<img src="${esc2(u.photoURL)}" alt="">` : ""}${esc2(u.displayName || u.email)}${admin ? ` <span class="adm">· 관리자</span>` : ""}</span>
                <button class="lnk" onclick="CPC.logout()">로그아웃</button></div>
              <textarea id="cpc-text" placeholder="댓글을 남겨 주세요" maxlength="1500"></textarea>
              <div class="row" style="margin:10px 0 0"><button class="pri" onclick="CPC.send()">등록</button>
                ${admin ? `<button class="lnk" onclick="CPC.toggleLock()">${locked ? "댓글 잠금 풀기" : "이 글 댓글 잠그기"}</button>` : ""}
                <span id="cpc-msg" class="note"></span></div>`;
    }
    const list = items.length
      ? `<ul class="list">${items.map(c => {
          const mine = u && c.uid === u.uid;
          return `<li>
            ${c.photo ? `<img class="av" src="${esc2(c.photo)}" alt="">` : `<span class="av"></span>`}
            <div>
              <div><span class="who">${esc2(c.name || "교우")}</span><span class="when">${when(c.createdAt)}</span></div>
              <div class="txt">${esc2(c.text)}</div>
              ${(mine || admin) ? `<div class="acts"><button class="lnk" onclick="CPC.remove('${c.id}')">삭제</button></div>` : ""}
            </div></li>`;
        }).join("")}</ul>`
      : `<div class="note" style="margin-top:14px">아직 댓글이 없습니다.</div>`;
    el.innerHTML = `<div class="cpc">${head}${form}${list}</div>`;
  }

  function attach(pageId, title) {
    if (!init()) return;
    detach();
    cur = { pageId: String(pageId), title: String(title || "") };
    items = []; locked = false;
    render();
    const ref = db.collection("pages").doc(cur.pageId);
    const u1 = ref.onSnapshot(d => { locked = !!(d.exists && d.data().locked); render(); }, () => {});
    const u2 = ref.collection("comments").orderBy("createdAt", "asc").limit(300)
      .onSnapshot(s => { items = s.docs.map(d => Object.assign({ id: d.id }, d.data())); render(); },
                  e => { const el = box(); if (el) el.innerHTML = `<div class="cpc"><div class="note">댓글을 불러오지 못했습니다. (${esc2(e.code || "")})</div></div>`; });
    unsub = () => { u1(); u2(); };
  }

  function detach() { if (unsub) { try { unsub(); } catch (e) {} unsub = null; } cur = null; items = []; }

  const CPC = {
    attach, detach,
    login() {
      if (!init()) return;
      const p = new firebase.auth.GoogleAuthProvider();
      auth.signInWithPopup(p).catch(e => {
        if (e && e.code === "auth/popup-blocked") auth.signInWithRedirect(p);
        else alert("로그인에 실패했습니다. " + (e && e.code ? e.code : ""));
      });
    },
    logout() { if (auth) auth.signOut(); },
    send() {
      const t = document.getElementById("cpc-text");
      const u = auth && auth.currentUser;
      if (!t || !u || !cur) return;
      const text = t.value.trim();
      if (!text) return;
      const msg = document.getElementById("cpc-msg");
      if (msg) msg.textContent = "올리는 중…";
      t.value = "";
      db.collection("pages").doc(cur.pageId).collection("comments").add({
        uid: u.uid,
        name: u.displayName || "교우",
        photo: u.photoURL || "",
        text: text,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      }).then(() => { if (msg) msg.textContent = ""; })
        .catch(e => { if (msg) msg.textContent = "올리지 못했습니다. (" + (e.code || "") + ")"; t.value = text; });
    },
    remove(id) {
      if (!cur) return;
      const c = items.find(x => x.id === id);
      if (!c) return;
      if (!confirm("이 댓글을 지울까요?")) return;
      const ref = db.collection("pages").doc(cur.pageId).collection("comments").doc(id);
      const done = () => ref.delete().catch(e => alert("지우지 못했습니다. (" + (e.code || "") + ")"));
      if (isAdmin() && c.uid !== auth.currentUser.uid) {
        db.collection("trash").add({
          pageId: cur.pageId, pageTitle: cur.title, uid: c.uid || "", name: c.name || "",
          text: c.text || "", createdAt: c.createdAt || null,
          deletedAt: firebase.firestore.FieldValue.serverTimestamp(),
          deletedBy: auth.currentUser.email,
        }).then(done).catch(done);
      } else done();
    },
    toggleLock() {
      if (!cur || !isAdmin()) return;
      db.collection("pages").doc(cur.pageId).set({ locked: !locked, title: cur.title }, { merge: true })
        .catch(e => alert("바꾸지 못했습니다. (" + (e.code || "") + ")"));
    },
  };
  window.CPC = CPC;
})();
