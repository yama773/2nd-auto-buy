(async ()=>{
  const sleep = m => new Promise(r=>setTimeout(r,m));

  /* 1. ページ最下部へスクロールして固定バーを表示 */
  window.scrollTo({top: document.body.scrollHeight, behavior:'smooth'});
  await sleep(800);                              // スクロールが完了する時間を確保

  /* 2. ボタン待機 */
  const waitBtn = async()=>{for(let i=0;i<40;i++){
      const el=document.querySelector('#addCartBtn,button.addCartBtn');
      if(el) return el;
      await sleep(250);
  }throw 'addCartBtn なし'};
  const btn = await waitBtn();

  /* 3. タッチ＆公式関数 */
  ['pointerdown','touchstart','mousedown','touchend','pointerup','click']
    .forEach(ev=>btn.dispatchEvent(new Event(ev,{bubbles:1,cancelable:1})));
  if(typeof cartRegist==='function'){      // goodsId / shopsId / qty は1固定可
      const m=location.href.match(/goodsId\\/(\\d+)\\/shopsId\\/(\\d+)/);
      if(m) cartRegist(m[1],m[2],1);
      else  cartRegist(1);
  }

  /* 4. 追加バー検知 → /cart */
  for(let i=0;i<40;i++){
    if(document.querySelector('#addedCart,.cartbar')) break;
    await sleep(250);
  }
  await sleep(600);
  location.href='/cart';
})();
