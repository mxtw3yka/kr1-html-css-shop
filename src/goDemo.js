const assets = import.meta.glob('./generated/go-demo/*', { eager: true, query: '?url', import: 'default' });

export function startGoDemo(sampleProduct) {
  let bridge;
  let resolveReady;
  let rejectReady;
  const ready = new Promise((resolve, reject) => {
    resolveReady = resolve;
    rejectReady = reject;
  });

  globalThis.goDemoReady = () => ready;
  globalThis.goDemo = (product = sampleProduct) => {
    if (!product || typeof product.name !== 'string' || !product.name.trim() ||
        !Number.isSafeInteger(product.price) || product.price < 0 ||
        (product.oldPrice != null && (!Number.isSafeInteger(product.oldPrice) || product.oldPrice < 0)) ||
        typeof product.stock !== 'boolean') {
      throw new TypeError('goDemo expects a product with a name, ruble prices, and boolean stock');
    }
    if (!bridge) throw new Error('Go/WASM is not ready; await goDemoReady()');

    const results = {
      price: bridge.formatPrice(product.price),
      discount: bridge.calculateDiscount(product.price, product.oldPrice ?? 0),
      status: bridge.getProductStatus(product.stock),
      summary: bridge.createProductSummary(product.name, product.price, product.stock),
    };
    console.log('Go/WASM — цена:', results.price);
    console.log('Go/WASM — скидка:', results.discount);
    console.log('Go/WASM — статус:', results.status);
    console.log('Go/WASM — описание:', results.summary);
    return results;
  };
  globalThis.__gearGoReady = (api) => {
    if (!api || ['formatPrice', 'calculateDiscount', 'getProductStatus', 'createProductSummary']
      .some((method) => typeof api[method] !== 'function')) {
      const error = new Error('Go/WASM registered an invalid API');
      console.error('Go/WASM demo failed:', error);
      rejectReady(error);
      return;
    }
    bridge = api;
    resolveReady(globalThis.goDemo);
  };

  ready.then(() => {
    try { globalThis.goDemo(sampleProduct); }
    catch (error) { console.error('Go/WASM demo failed:', error); }
  }, () => {});

  (async () => {
    try {
      const scriptURL = assets['./generated/go-demo/wasm_exec.js'];
      const wasmURL = assets['./generated/go-demo/go-demo.wasm'];
      if (!scriptURL || !wasmURL) throw new Error('Go/WASM build assets are missing');
      await new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = scriptURL;
        script.onload = resolve;
        script.onerror = () => reject(new Error(`Could not load ${scriptURL}`));
        document.head.append(script);
      });
      const go = new globalThis.Go();
      const response = await fetch(wasmURL);
      if (!response.ok) throw new Error(`Could not load ${wasmURL}: HTTP ${response.status}`);
      const { instance } = await WebAssembly.instantiate(await response.arrayBuffer(), go.importObject);
      await go.run(instance);
      if (!bridge) throw new Error('Go/WASM exited without registering its API');
    } catch (error) {
      console.error('Go/WASM demo failed:', error);
      rejectReady(error);
    }
  })();
}
