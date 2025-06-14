(async ()=>{
  const sleep = m => new Promise(r=>setTimeout(r,m));
  const wait  = async sel => {
    for(let i=0;i<40;i++){      // 最大 10 秒
      const el=document.querySelector(sel);
      if(el) return el;
      await sleep(250);
    }
    throw new Error('要素なし:'+sel);
  };

  try{
    /* ── カートボタン押下 ── */
    const btn = await wait('#addCartBtn');
    btn.scrollIntoView({block:'center'});
    ['pointerdown','touchstart','mousedown','touchend','pointerup','click']
      .forEach(ev=>btn.dispatchEvent(new Event(ev,{bubbles:true,cancelable:true})));
    if(typeof cartRegist==='function') cartRegist(1);   // 保険
    await wait('#addedCart,.cartbar');                  // バー確認
    await sleep(700);
    location.href='/cart';                              // カートページへ
  }catch(e){
    alert('カート追加失敗: '+e.message);
  }
})();
