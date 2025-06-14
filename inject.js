(async () => {
  /* ====== ユーザー設定 ====== */
  const GEO_ID   = "09089145579";
  const GEO_PW   = "s2518190";
  const BIRTH    = { y: "1980", m: "01", d: "25" };
  const JOB_CODE = "4";               // 自営業

  /* ====== 共通関数 ====== */
  const sleep = ms => new Promise(r => setTimeout(r, ms));
  const wait  = async (sel,lim=40) => {              // 最大 10 秒待機
    for (let i=0;i<lim;i++){
      const el=document.querySelector(sel);
      if (el) return el;
      await sleep(250);
    }
    throw new Error("要素なし: "+sel);
  };
  const tap = el => ['pointerdown','touchstart','mousedown',
                     'touchend','pointerup','click']
                   .forEach(ev=>el.dispatchEvent(
                     new Event(ev,{bubbles:true,cancelable:true})
                   ));

  try {
    /* ① 商品ページ → カートイン */
    const cartBtn = await wait("#addCartBtn, button.addCartBtn");
    tap(cartBtn);
    if (typeof cartRegist === "function") cartRegist(1);    // 保険
    await wait("#addedCart, .cartbar");        // バーが出るまで待機
    await sleep(800);
    location.href = "/cart";

    /* ② カートページ → レジに進む */
    await wait("button.cartBtn[form='cart_information_detail']");
    tap(document.querySelector("button.cartBtn[form='cart_information_detail']"));
    await sleep(2500);

    /* ③ ログイン画面なら自動入力（reCAPTCHAは手動） */
    if (document.querySelector("#authId")) {
      document.querySelector("#authId").value = GEO_ID;
      document.querySelector("input[name='password']").value = GEO_PW;
      alert("ID/PASS を入力しました。reCAPTCHA を通過後、[ログインしてレジに進む] を押してください。");
      return;                    // ここで一旦終了（手動認証）
    }

    /* ④ 古物情報入力 */
    document.querySelector("select[name='birthdayYear']") ?.value = BIRTH.y;
    document.querySelector("select[name='birthdayMonth']")?.value = BIRTH.m;
    document.querySelector("select[name='birthdayDay']")  ?.value = BIRTH.d;
    document.querySelector("select[name='jobCode']")      ?.value = JOB_CODE;

    /* ⑤ 最終確認 → 注文確定 */
    await sleep(500);
    tap(document.querySelector("#submit-btn"));       // 最終確認へ
    await sleep(1500);
    tap(document.querySelector("#order_submit"));     // 注文確定
    alert("✅ 自動購入処理が完了しました。");

  } catch (e) {
    console.error(e);
    alert("❌ エラー: "+e.message);
  }
})();
