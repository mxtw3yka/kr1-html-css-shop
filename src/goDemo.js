const assets = import.meta.glob('./generated/go-demo/*', { eager: true, query: '?url', import: 'default' });

function assertPrice(value) {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new TypeError('Price must be a non-negative integer number of rubles');
  }
}

export function startGoDemo(sampleProduct) {
  let bridge;
  let resolveReady;
  let rejectReady;
  const ready = new Promise((resolve, reject) => {
    resolveReady = resolve;
    rejectReady = reject;
  });

  globalThis.goDemoReady = ready;
  globalThis.goDemo = undefined;
  globalThis.__gearGoReady = (api) => {
    if (!api || ['formatPrice', 'calculateDiscount', 'getProductStatus', 'createProductSummary']
      .some((method) => typeof api[method] !== 'function')) {
      const error = new Error('Go/WASM registered an invalid API');
      console.error('Go/WASM demo failed:', error);
      rejectReady(error);
      return;
    }
    bridge = api;
    globalThis.goDemo = {
      formatPrice(price) {
        assertPrice(price);
        return api.formatPrice(price);
      },
      calculateDiscount(price, oldPrice) {
        assertPrice(price);
        assertPrice(oldPrice);
        return api.calculateDiscount(price, oldPrice);
      },
      getProductStatus(isAvailable) {
        if (typeof isAvailable !== 'boolean') throw new TypeError('Availability must be a boolean');
        return api.getProductStatus(isAvailable);
      },
      createProductSummary(product) {
        if (!product || typeof product.title !== 'string' || !product.title.trim()) {
          throw new TypeError('Product title must be a non-empty string');
        }
        assertPrice(product.price);
        if (typeof product.isAvailable !== 'boolean') throw new TypeError('Availability must be a boolean');
        return api.createProductSummary(product.title, product.price, product.isAvailable);
      },
      run(product = sampleProduct) {
        if (!product || typeof product.name !== 'string' || !product.name.trim()) {
          throw new TypeError('goDemo.run expects a product with a name');
        }
        const results = {
          price: this.formatPrice(product.price),
          discount: this.calculateDiscount(product.price, product.oldPrice ?? 0),
          status: this.getProductStatus(product.stock),
          summary: this.createProductSummary({
            title: product.name, price: product.price, isAvailable: product.stock,
          }),
        };
        console.log('Go/WASM — цена:', results.price);
        console.log('Go/WASM — скидка:', results.discount);
        console.log('Go/WASM — статус:', results.status);
        console.log('Go/WASM — описание:', results.summary);
        return results;
      },
    };
    resolveReady(globalThis.goDemo);
  };

  ready.then((demo) => {
    try { demo.run(sampleProduct); }
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
