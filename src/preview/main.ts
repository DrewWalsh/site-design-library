import { createApp, defineAsyncComponent, h } from 'vue';
const modules = import.meta.glob('../designs/*/Demo.vue');
const key = location.pathname.split('/')[2];
const load = modules[`../designs/${key}/Demo.vue`];
if (load) {
  document.title = `${key.replaceAll('-', ' ')} · Design Library specimen`;
  createApp(
    defineAsyncComponent({
      loader: load as any,
      errorComponent: {
        render: () =>
          h('main', { style: 'padding:32px;font-family:system-ui' }, [
            h('h1', 'This specimen could not load'),
            h('a', { href: location.href }, 'Reload specimen'),
          ]),
      },
    }),
  ).mount('#specimen');
} else
  createApp({
    render: () =>
      h('main', { style: 'padding:32px;font-family:system-ui' }, [
        h('h1', 'Specimen not found'),
        h('a', { href: '/' }, 'Browse the design library'),
      ]),
  }).mount('#specimen');
