import { ref, nextTick, onUnmounted, watch } from 'vue';
/** Routing and persistence only. Each specimen owns its entire visual composition. */
export function useSpecimen() {
  const state = ref(location.pathname.split('/')[3] || 'start');
  const sync = () => {
    state.value = location.pathname.split('/')[3] || 'start';
  };
  window.addEventListener('popstate', sync);
  onUnmounted(() => window.removeEventListener('popstate', sync));
  function href(next: string) {
    return `/preview/${location.pathname.split('/')[2]}/${next}`;
  }
  async function go(next: string) {
    history.pushState({}, '', href(next));
    state.value = next;
    await nextTick();
    window.scrollTo(0, 0);
    const h = document.querySelector<HTMLElement>('h1, h2');
    h?.setAttribute('tabindex', '-1');
    h?.focus({ preventScroll: true });
  }
  return { state, go, href };
}
export function useStored<T>(id: string, initial: T) {
  const key = `design-library:${id}`;
  let value = initial;
  try {
    const raw = localStorage.getItem(key);
    if (raw) value = JSON.parse(raw);
  } catch {}
  const data = ref(value) as import('vue').Ref<T>;
  watch(
    data,
    (v) => {
      try {
        localStorage.setItem(key, JSON.stringify(v));
      } catch {}
    },
    { deep: true },
  );
  return data;
}
