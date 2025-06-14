(async () => {
  const sleep = ms => new Promise(res => setTimeout(res, ms));
  await sleep(1000);

  const run = async () => {
    const d = document;

    // Step 1: カートに追加
    const cartBtn = d.querySelector('#addCartBtn');
    if (cartBtn) {
      cartBtn.click();
      await sleep(1500);
    }

    // Step 2: カートを確認
    const cartLink = d.querySelector('.cartbar a[href="/cart"]');
    if (cartLink) {
      cartLink.click();
      return;
    }

    // Step 3: レジに進む
    const checkoutBtn = d.querySelector('button.cartBtn[form="cart_information_detail"]');
    if (checkoutBtn) {
      checkoutBtn.click();
    }

    // Step 4: ログイン
    const authId = d.querySelector('#authId');
    if (authId) {
      authId.value = "09089145579";
      const pass = d.querySelector('input[name="password"]');
      if (pass) pass.value = "s2518190";
      alert("ログイン情報を入力しました。reCAPTCHAを手動で通過してください。");
      return;
    }

    // Step 5: 生年月日・職業
    const y = d.querySelector('select[name="birthdayYear"]');
    if (y) y.value = "1980";
    const m = d.querySelector('select[name="birthdayMonth"]');
    if (m) m.value = "01";
    const day = d.querySelector('select[name="birthdayDay"]');
    if (day) day.value = "25";
    const job = d.querySelector('select[name="jobCode"]');
    if (job) job.value = "4";

    await sleep(1000);

    // Step 6: 最終確認
    const confirm = d.querySelector('#submit-btn');
    if (confirm) confirm.click();

    await sleep(1000);

    const finalOrder = d.querySelector('#order_submit');
    if (finalOrder) finalOrder.click();
  };

  run();
})();
